---
title: 快速开始
keywords: [Spring Cloud Alibaba, Nacos Config, Nacos Discovery]
description: Nacos Quick Start.
---

本章节将演示如何使用 spring-cloud-starter-alibaba-nacos-config 和 spring-cloud-starter-alibaba-nacos-discovery 完成 Spring Cloud 应用的配置管理和服务发现。

## Nacos Server

具体启动方式参考 [Nacos](https://nacos.io/zh-cn/docs/quick-start.html) 官网。

Nacos Server 启动成功之后，浏览器地址栏输入 `http://ip:8848/nacos` 查看 Nacos 控制台（默认账号名和密码为 nacos/nacos）：

![nacos-server-start](../../../../../../static/img/user/quickstart/nacos/nacos-config-dashboard.png)

关于更多的 Nacos Server 版本，可以从 Nacos 官方 [release](https://github.com/alibaba/nacos/releases) 页面查看。

## Nacos 配置中心

### 接入 Nacos Config

如果要在您的项目中使用 Nacos 来实现配置管理，需要进行以下操作（确保 Nacos Server 已启动）：

1. 需要在 pom.xml 文件中引入 group ID 为 com.alibaba.cloud 和 artifact ID 为 spring-cloud-starter-alibaba-nacos-config 的 starter：

   ```xml
   <dependency>
       <groupId>com.alibaba.cloud</groupId>
       <artifactId>spring-cloud-starter-alibaba-nacos-config</artifactId>
   </dependency>
   ```

2. 在应用的 /src/main/resources/application.yaml 配置文件中配置 Nacos Config 地址并引入服务配置：

   ```yml
   spring:
     cloud:
       nacos:
         serverAddr: 127.0.0.1:8848
     config:
       import:
         - nacos:nacos-config-example.properties?refreshEnabled=true
   ```

3. 完成上述两步后，应用会从 Nacos Server 中获取相应的配置，并添加在 Spring Environment 的 PropertySources 中。假设我们通过 Nacos 作为配置中心保存应用服务的部分配置，有以下几种方式实现：

   - BeanAutoRefreshConfigExample：通过将配置信息配置为 bean，支持配置变自动刷新；
   - ConfigListenerExample：监听配置信息；
   - DockingInterfaceExample：对接 Nacos 接口，通过接口完成对配置信息增删改查；
   - ValueAnnotationExample：通过 @Value 注解进行配置信息获取。

### 添加 Nacos 配置

1. 命令行方式：

   ```shell
   $ curl -X POST "http://127.0.0.1:8848/nacos/v1/cs/configs?dataId=nacos-config-example.properties&group=DEFAULT_GROUP&content=spring.cloud.nacos.config.serverAddr=127.0.0.1:8848%0Aspring.cloud.nacos.config.prefix=PREFIX%0Aspring.cloud.nacos.config.group=GROUP%0Aspring.cloud.nacos.config.namespace=NAMESPACE"
   ```

2. 控制台方式（推荐使用）：

   ```markdown
   dataId 为：nacos-config-example.properties
   group 为：DEFAULT_GROUP
   ```

   配置内容如下：

   ```properties
   spring.cloud.nacos.config.serveraddr=127.0.0.1:8848
   spring.cloud.nacos.config.prefix=PREFIX
   spring.cloud.nacos.config.group=GROUP
   spring.cloud.nacos.config.namespace=NAMESPACE
   ```

### 启动应用并验证

#### 应用启动

1. 添加其他配置： 在应用的 /src/main/resources/application.yaml 中添加基本配置信息：

   ```yaml
   server:
     port: 18084
   management:
     endpoints:
       web:
         exposure:
           include: "*"
   ```

2. 启动应用，支持 IDE 直接启动和编译打包后启动。

- IDE 直接启动：找到主类 NacosConfigApplication，执行 main 方法启动应用。
- 打包编译后启动：首先执行 mvn clean package 将工程编译打包，然后执行 java -jar nacos-config-example.jar 启动应用。

#### 功能验证

1. 验证自动注入

   请求 http://127.0.0.1:18084/nacos/bean 地址，可以看到成功从 Nacos 配置中心中获取了数据。

   ```shell
   $ curl http://127.0.0.1:18084/nacos/bean
   ```

   响应结果：

   ```json
   {
     "serverAddr": "127.0.0.1:8848",
     "prefix": "PREFIX",
     "namespace": "NAMESPACE",
     "group": "GROUP"
   }
   ```

2. 验证动态刷新

   在命令行终端执行以下命令刷新 Nacos 的配置信息：

   ```shell
   $ curl -X POST "http://127.0.0.1:8848/nacos/v1/cs/configs?dataId=nacos-config-example.properties&group=DEFAULT_GROUP&content=spring.cloud.nacos.config.serveraddr=127.0.0.1:8848%0Aspring.cloud.nacos.config.prefix=PREFIX%0Aspring.cloud.nacos.config.group=DEFAULT_GROUP%0Aspring.cloud.nacos.config.namespace=NAMESPACE"
   ```

   再次请求 http://127.0.0.1:18084/nacos/bean 地址，可以看到应用已经从 Nacos 中获取到了最新的数据。

   ```shell
   $ curl http://127.0.0.1:18084/nacos/bean
   ```

   响应结果：

   ```json
   {
     "serverAddr": "127.0.0.1:8848",
     "prefix": "PREFIX",
     "namespace": "NAMESPACE",
     "group": "DEFAULT_GROUP"
   }
   ```

Nacos 配置管理示例源码参考：[Nacos 配置管理示例](https://github.com/alibaba/spring-cloud-alibaba/tree/2022.x/spring-cloud-alibaba-examples/nacos-example/nacos-config-example)

有关更多 Nacos 配置管理 的高级特性和使用方法，请参看注册配置中心进阶指南章节！

## Nacos 服务注册与发现

### 接入 Nacos Discovery

如果要在您的项目中使用 Nacos 来作为服务发现的组件。需要进行以下操作（确保 Nacos Server 已启动）：

1. 需要在 pom.xml 文件中引入 group ID 为 com.alibaba.cloud 和 artifact ID 为 spring-cloud-starter-alibaba-nacos-discovery 的 starter：

   ```xml
   <dependency>
       <groupId>com.alibaba.cloud</groupId>
       <artifactId>spring-cloud-starter-alibaba-nacos-discovery</artifactId>
   </dependency>
   ```

2. 添加应用配置：在应用的 /src/main/resources/application.properties 配置文件中配置 Nacos Server 地址：

   ```properties
   spring.cloud.nacos.discovery.server-addr=127.0.0.1:8848
   ```

3. 使用 @EnableDiscoveryClient 注解开启服务注册与发现功能：

   ```java
   @SpringBootApplication
   @EnableDiscoveryClient
   public class ProviderApplication {

       public static void main(String[] args) {
           SpringApplication.run(ProviderApplication.class, args);
       }

       @RestController
       class EchoController {
           @GetMapping(value = "/echo/{string}")
           public String echo(@PathVariable String string) {
               return string;
           }
       }
   }
   ```

### 启动应用并验证

#### 应用启动

1. 添加配置：在 [nacos-discovery-provider-example](https://github.com/alibaba/spring-cloud-alibaba/tree/2022.x/spring-cloud-alibaba-examples/nacos-example/nacos-discovery-example/nacos-discovery-provider-example) 项目的 /src/main/resources/application.properties 中添加基本配置信息:

   ```properties
   spring.application.name=service-provider
   server.port=18082
   ```

2. 启动应用，支持 IDE 直接启动和编译打包后启动。

   - IDE 直接启动：找到 [nacos-discovery-provider-example](https://github.com/alibaba/spring-cloud-alibaba/tree/2022.x/spring-cloud-alibaba-examples/nacos-example/nacos-discovery-example/nacos-discovery-provider-example) 项目的主类 ProviderApplication，执行 main 方法启动应用。
   - 打包编译后启动：在 [nacos-discovery-provider-example](https://github.com/alibaba/spring-cloud-alibaba/tree/2022.x/spring-cloud-alibaba-examples/nacos-example/nacos-discovery-example/nacos-discovery-provider-example) 项目中执行 mvn clean package 将工程编译打包，然后执行 java - jar nacos-discovery-provider-example.jar 启动应用。

#### 验证

1. 查询服务

   使用 Shell 终端输入如下命令查询，可以看到服务节点已经成功注册到 Nacos Server。

   ```shell
   $ curl http://127.0.0.1:8848/nacos/v1/ns/catalog/instances?serviceName=service-provider&clusterName=DEFAULT&pageSize=10&pageNo=1&namespaceId=
   ```

   响应结果：

   ```json
   {
     "list": [
       {
         "ip": "192.168.3.19",
         "port": 1000,
         "weight": 1,
         "healthy": true,
         "enabled": true,
         "ephemeral": true,
         "clusterName": "DEFAULT",
         "serviceName": "DEFAULT_GROUP@@service-provider",
         "metadata": {
           "preserved.register.source": "SPRING_CLOUD"
         },
         "instanceHeartBeatInterval": 5000,
         "instanceHeartBeatTimeOut": 15000,
         "ipDeleteTimeout": 30000
       }
     ],
     "count": 1
   }
   ```

2. 服务发现

   在 pom.xml 中加入以下依赖：

   ```xml
   <dependencies>
       <dependency>
           <groupId>org.springframework.cloud</groupId>
           <artifactId>spring-cloud-loadbalancer</artifactId>
       </dependency>
   </dependencies>
   ```

   在配置文件中加入以下配置：

   ```properties
   spring.cloud.loadbalancer.ribbon.enabled=false
   spring.cloud.loadbalancer.nacos.enabled=true
   ```

### 服务消费

#### 应用配置

本章节只是为了便于您理解接入方式，此处只涉及 Ribbon、RestTemplate、FeignClient 相关内容，如果已经使用了其他服务发现组件，可以通过直接替换依赖来接入 spring-cloud-starter-alibaba-nacos-config。

1. 添加 @LoadBlanced 注解，使得 RestTemplate 接入 Ribbon：

   ```java
   @Bean
   @LoadBalanced
   public RestTemplate restTemplate() {
       return new RestTemplate();
   }
   ```

2. FeignClient 已经默认集成了 Ribbon ，此处演示如何配置一个 FeignClient：

   ```java
   @FeignClient(name = "service-provider")
   public interface EchoService {
       @GetMapping(value = "/echo/{str}")
       String echo(@PathVariable("str") String str);
   }
   ```

   使用 @FeignClient 注解将 EchoService 这个接口包装成一个 FeignClient，属性 name 对应服务名 service-provider。

   echo 方法上的 @GetMapping 注解将 echo 方法与 URL "/echo/{str}" 相对应，@PathVariable 注解将 URL 路径中的 {str} 对应成 echo 方法的参数 str。

3. 将两者注入到 Controller 中：

   ```java
   @RestController
    public class TestController {

       @Autowired
       private RestTemplate restTemplate;
       @Autowired
       private EchoService echoService;

       @GetMapping(value = "/echo-rest/{str}")
       public String rest(@PathVariable String str) {
           return restTemplate.getForObject("http://service-provider/echo/" + str, String.class);
       }
       @GetMapping(value = "/echo-feign/{str}")
       public String feign(@PathVariable String str) {
           return echoService.echo(str);
       }
   }
   ```

4. 添加必要的配置：

   在 [nacos-discovery-consumer-example](https://github.com/alibaba/spring-cloud-alibaba/tree/2022.x/spring-cloud-alibaba-examples/nacos-example/nacos-discovery-example/nacos-discovery-consumer-example) 项目的 /src/main/resources/application.properties 中添加基本配置信息：

   ```properties
   spring.application.name=service-consumer
   server.port=18083
   ```

5. 启动应用

   - IDE 直接启动：找到 [nacos-discovery-consumer-example](https://github.com/alibaba/spring-cloud-alibaba/tree/2022.x/spring-cloud-alibaba-examples/nacos-example/nacos-discovery-example/nacos-discovery-consumer-example) 项目的主类 ConsumerApplication，执行 main 方法启动应用。
   - 打包编译后启动：在 [nacos-discovery-consumer-example](https://github.com/alibaba/spring-cloud-alibaba/tree/2022.x/spring-cloud-alibaba-examples/nacos-example/nacos-discovery-example/nacos-discovery-consumer-example) 项目中执行 mvn clean package 将工程编译打包，然后执行 java -jar nacos-discovery-consumer-example.jar 启动应用。

#### 验证

1. 请求 http://127.0.0.1:18083/echo-rest/1234 地址，可以看到响应显示了 nacos-discovery-provider-example 返回的消息 "hello Nacos Discovery 1234"，证明服务发现生效。

   ```shell
   $ curl http://127.0.0.1:18083/echo-rest/1234
   ```

   响应结果：

   ```json
   hello Nacos Discovery 1234
   ```

2. 请求 http://127.0.0.1:18083/echo-feign/12345 地址，可以看到响应显示了 nacos-discovery-provider-example 返回的消息 "hello Nacos Discovery 12345"，证明服务发现生效。

   ```shell
   $ curl http://127.0.0.1:18083/echo-feign/12345
   ```

   响应结果：

   ```json
   hello Nacos Discovery 12345
   ```

Nacos 服务注册与发现示例源码参考：[Nacos 服务注册与发现示例](https://github.com/alibaba/spring-cloud-alibaba/tree/2022.x/spring-cloud-alibaba-examples/nacos-example/nacos-discovery-example)

有关更多 Nacos 服务注册与发现的高级特性和使用方法，请参看注册配置中心进阶指南章节！
