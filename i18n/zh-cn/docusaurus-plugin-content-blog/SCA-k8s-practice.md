---
title: Spring Cloud Alibaba 在 K8s 环境下的最佳实践
keywords: [Spring Cloud Alibaba, Kubernetes, Container, Cloud Native]
description: Spring Cloud Alibaba 在 K8s 环境下的最佳实践，通过使用 OpenFeign 组件演示服务调用。
author: 牧生
date: 2023-04.02
---

## 环境准备

Nacos: v2.3.0

Spring Boot: 3.2.0

Spring Cloud:  2023.0.0

Spring Cloud Alibaba Version: 2023.0.0.0-RC1

## 项目编写

github 地址：https://github.com/yuluo-yx/sca-k8s-demo/tree/openfeign

### 项目结构

```shell
├─docker-compose                  # Docker compose 部署文件
├─kubernetes                      # Kubernetes 部署文件
   └─docker-images
    ├─consumer
    	├─ application-k8s.yaml     # k8s 环境的配置文件
    	├─ app.jar                  # 应用 jar 包
    	└─ Dockerfile               # 打包的 Dockerfile
    └─provider
├─sca-k8s-service-consumer        # sca 服务消费者模块 
├─sca-k8s-service-provider        # sca 服务提供者模块
```

父 pom.xml 文件：

```xml
<modules>
    <module>sca-k8s-service-provider</module>
    <module>sca-k8s-service-consumer</module>
</modules>

<properties>
    <maven.compiler.source>17</maven.compiler.source>
    <maven.compiler.target>17</maven.compiler.target>
    <project.build.sourceEncoding>UTF-8</project.build.sourceEncoding>
    <spring-cloud-alibaba.version>2023.0.0.0-RC1</spring-cloud-alibaba.version>
    <spring-cloud.version>2023.0.0</spring-cloud.version>
    <spring-boot.version>3.2.0</spring-boot.version>
</properties>

<dependencies>
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-web</artifactId>
    </dependency>

    <dependency>
        <groupId>com.alibaba.cloud</groupId>
        <artifactId>spring-cloud-starter-alibaba-nacos-discovery</artifactId>
    </dependency>
</dependencies>

<dependencyManagement>
    <dependencies>
        <dependency>
            <groupId>org.springframework.cloud</groupId>
            <artifactId>spring-cloud-dependencies</artifactId>
            <version>${spring-cloud.version}</version>
            <type>pom</type>
            <scope>import</scope>
        </dependency>
        <dependency>
            <groupId>com.alibaba.cloud</groupId>
            <artifactId>spring-cloud-alibaba-dependencies</artifactId>
            <version>${spring-cloud-alibaba.version}</version>
            <type>pom</type>
            <scope>import</scope>
        </dependency>
    </dependencies>
</dependencyManagement>

<!--spring boot 打包插件-->
<build>
    <plugins>
        <plugin>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-maven-plugin</artifactId>
        </plugin>
    </plugins>
</build>
```

### provider 模块

provider pom.xml 文件

```xml
<dependencies>

  <dependency>
    <groupId>com.alibaba.cloud</groupId>
    <artifactId>spring-cloud-starter-alibaba-nacos-discovery</artifactId>
  </dependency>

  <dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-actuator</artifactId>
  </dependency>

</dependencies>
```

provider controller java 文件

```java
@RestController
@RequestMapping("/provider")
public class ProviderController {

    @Resource
    private ProviderService providerService;


    @GetMapping("/a")
    public String providerA() {

        return providerService.providerA();
    }

    @GetMapping("/b")
    public String providerB() {

        return providerService.providerB();
    }

}
```

provider service java 文件

```java
@Service
public class ProviderServiceImpl implements ProviderService {

	@Override
	public String providerA() {

		return "This response from provider A!";
	}

	@Override
	public String providerB() {

		return "This response from provider B!";
	}
}
```

provider application.yml 配置

```yml
server:
  port: 8082
  
spring:
  application:
    name: sca-k8s-provider

  cloud:
    nacos:
      discovery:
        # nacos 服务发现地址
        server-addr: 127.0.0.1:8848
        username: 'nacos'
        password: 'nacos'

# actuator 健康检查配置，用于做 kubernetes pod 的 liveness 探针接口使用
management:
  server:
    port: 30001
  endpoint:
    health:
      probes:
        enabled: true
  endpoints:
    web:
      exposure:
        include: health
```

### consumer 模块

> Consumer 模块使用 `spring-cloud-openfeign` 作为 rpc 组件。

consumer pom.xml 文件

```xml
<dependencies>

  <dependency>
    <groupId>com.alibaba.cloud</groupId>
    <artifactId>spring-cloud-starter-alibaba-nacos-discovery</artifactId>
  </dependency>

  <dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-actuator</artifactId>
  </dependency>

  <dependency>
    <groupId>org.springframework.cloud</groupId>
    <artifactId>spring-cloud-starter-openfeign</artifactId>
  </dependency>

  <dependency>
    <groupId>org.springframework.cloud</groupId>
    <artifactId>spring-cloud-starter-loadbalancer</artifactId>
  </dependency>

  <dependency>
    <groupId>com.alibaba.cloud</groupId>
    <artifactId>spring-cloud-starter-alibaba-sentinel</artifactId>
  </dependency>
</dependencies>
```

consumer feign client java 文件

```java
@FeignClient(
        name = "sca-k8s-provider",
        fallback = K8sFeignCallback.class,
        configuration = K8sFeignConfig.class,
        contextId = "sca-k8s-provider"
)
public interface K8sFeignClient {

    @GetMapping("/provider/a")
    String providerA();

    @GetMapping("/provider/b")
    String providerB();

}
```

consumer feign config java 文件

```java
public class K8sFeignConfig {

    @Bean
    public K8sFeignCallback feignCallback() {

        return new K8sFeignCallback();
    }

}
```

Consumer feign fallback java 文件

```java
public class K8sFeignCallback implements K8sFeignClient{

    @Override
    public String providerA() {

        return "call provider A interface failed, fallback";
    }

    @Override
    public String providerB() {

        return "call provider B interface failed, fallback";
    }
}
```

Consumer controller java

```java
@RestController
@RequestMapping("/consumer")
public class ConsumerController {

	@Autowired
	private ConsumerService consumerService;

	@GetMapping("/a")
	public String consumerA() {

		return consumerService.consumerA();
	}

	@GetMapping("/b")
	public String consumerB() {

		return consumerService.consumerB();
	}

}
```

Consumer service java 文件

```java
@Service
public class ConsumerServiceImpl implements ConsumerService {

	@Autowired
	private K8sFeignClient feignClient;

	@Override
	public String consumerA() {

		return feignClient.providerA();
	}

	@Override
	public String consumerB() {

		return feignClient.providerB();
	}
}
```

Consumer application 主类 java 文件

```java
@EnableFeignClients
@EnableDiscoveryClient
@SpringBootApplication
@LoadBalancerClients({
		@LoadBalancerClient("sca-k8s-provider")
})
public class SCAK8sConsumerApplication {

	public static void main(String[] args) {

		SpringApplication.run(SCAK8sConsumerApplication.class, args);
	}

}
```

consumer application.yml 配置

```yml
server:
  port: 8080

spring:
  application:
    name: sca-k8s-consumer
  cloud:
    nacos:
      discovery:
        server-addr: 127.0.0.1:8848
        username: 'nacos'
        password: 'nacos'

management:
  server:
    port: 30002
  endpoint:
    health:
      probes:
        enabled: true
  endpoints:
    web:
      exposure:
        include: health

feign:
  sentinel:
    enabled: true
```

## 部署效果展示

> 本项目提供了 Docker compose 和 Kubernetes 部署两种方式。
>
> Docker compose 运行方式参考 `docker-compose` 目录下的 README.md 文件。本节中主要以 k8s 部署方式演示为主。
>
> 本地运行需要准备 2.3.0 版本的 nacos。

### 环境准备

准备 k8s 集群，此处为了演示方便，使用 kind 模拟 k8s cluster。

![image-20240225175008463](images/image-20240225175008463.png)

### 部署流程

#### 部署单节点 Nacos

执行 `kubectl create -f sca-k8s-demo-mysql.yaml` 创建 nacos 需要的 mysql 服务：

![image-20240225175920425](images/image-20240225175920425.png)

创建成功如下所示：

![image-20240225180004647](images/image-20240225180004647.png)

执行 `kubectl create -f sca-k8s-demo-nacos.yaml` 创建 nacos 需要的 mysql 服务：

![image-20240225180104329](images/image-20240225180104329.png)

创建成功如下所示：

![image-20240225180603568](images/image-20240225180603568.png)

> 这里没有使用 ingress 暴露 nacos 服务，使用端口转发的方式将 nacos 暴露出来。
>
> **nacos 被设计成在内网使用的中间件，在生产环境中应注意网络隔离策略。**

暴露 nacos server：`kubectl port-forward --address localhost,192.168.20.129 svc/sca-k8s-demo-nacos-standalone 8848:8848 9848:9848`

这里的地址是虚拟机的 ip 地址，实际操作时注意 ip 地址的变化。

浏览器访问 nacos console：

![image-20240225182956824](images/image-20240225182956824.png)

#### 打包 Docker Images

修改应用配置文件中的 nacos server 地址为端口转发时使用的虚拟机地址，确保服务成功注册。consumer 和 provider 同时修改。

![image-20240225183636922](images/image-20240225183636922.png)

为了使用方便，此处使用阿里云容器镜像服务。执行下述命令之前先使用 `docker login` 命令登陆 docker hub，确保 `push` 镜像成功！

修改 docker images 的 tag 为自己的阿里云镜像仓库用户名地址。之后执行 `./kubernetes/docker-images/build.sh` 脚本

#### 部署 Provider 和 Consumer 服务

##### k8s 部署资源文件解析

configMap 资源文件：用于设置一些 jvm 调优参数和指定激活的配置文件。

> 通常情况下：应用的配置文件为
>
> ```shell
> application.yml	   # 通用配置项
> application-dev.yml	   # 开发环境配置
> application-test.yml	   # 测试环境配置
> application-prod.yml	   # 生产环境配置
> ```
>
> 在此 demo 设置应用配置文件为 k8s，如上文项目结构所示！

```yaml
apiVersion: v1
data:
  spring-profiles-active: 'k8s'
kind: ConfigMap
metadata:
  name: sca-k8s-demo-spring-profile-cm
```

provider deployment 资源文件：

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  labels:
    app: sca-k8s-demo-provider-service
  name: sca-k8s-demo-provider-service
spec:
  replicas: 1
  selector:
    matchLabels:
      app: sca-k8s-demo-provider-service
  template:
    metadata:
      labels:
        app: sca-k8s-demo-provider-service
    spec:
      containers:
        - env:
            - name: SPRING_PROFILES_ACTIVE
              valueFrom:
                # 引用 cm 中的配置
                configMapKeyRef:
                  name: sca-k8s-demo-spring-profile-cm
                  key: spring-profiles-active
            # jvm arguments
            # - name: JAVA_OPTION
            #  value: "-Dfile.encoding=UTF-8 -XX:+UseParallelGC -XX:+PrintGCDetails -Xloggc:/var/log/devops-example.gc.log -XX:+HeapDumpOnOutOfMemoryError -XX:+DisableExplicitGC"
            # - name: XMX
            # value: "128m"
            # - name: XMS
            # value: "128m"
            # - name: XMN
            # value: "64m"
          name: sca-k8s-demo-provider-service
          image: registry.cn-hangzhou.aliyuncs.com/yuluo-yx/sca-k8s-demo-provider-service:latest
          ports:
            - containerPort: 9000
          # liveness 探针
          livenessProbe:
            httpGet:
              path: /actuator/health/liveness
              port: 30001
              scheme: HTTP
            initialDelaySeconds: 20
            periodSeconds: 10

```

consumer 对比 provider 多了一个 svc 配置，其他相同。之后需要做端口转发，提供外部访问，同样也可以使用 ingress 暴露服务出去。

##### 部署

修改完成所有配置之后，执行 `kubectl create -f sca-k8s-demo-cm.yaml` 部署 provider 和 consumer 需要的 configMap 资源，

之后部署 provider service `ukbectl create -f sca-k8s-demo-provider.yaml`：

![image-20240225210717202](images/image-20240225210717202.png)

执行 `kubectl logs sca-k8s-demo-provider-service-xxxx` 查看 pod 日志，发现激活的配置文件为 `k8s`：

![image-20240225210541866](images/image-20240225210541866.png)

查看 nacos 控制台，发现 provider 已经注册：

![image-20240225210515801](images/image-20240225210515801.png)

尝试访问 provider service 接口服务：

转发 provider service pod：`kubectl port-forward pod-name 8082:8082`

![image-20240228111846689](images/image-20240228111846689.png)

consumer 部署方式相同，执行 `kubectl create -f sca-k8s-demo-consumer.yaml` 即可部署。

最终部署所有的 k8s pod 如下图：

![image-20240225210835325](images/image-20240225210835325.png)

### 访问

转发 consumer 服务：`kubectl port-forward --address localhost,192.168.20.129 svc/sca-k8s-demo-consumer-service-svc 8080:8080 `

![image-20240228112917449](images/image-20240228112917449.png)

本文章主要介绍如何在 Kubernetes 环境中部署 Spring Cloud Alibaba 应用。在部署的同时，使用 liveness 探针确保 pod 正常启动可对外提供服务，使用 configMap 配置以启动正确的配置文件。
