---
title: 快速开始
keywords: [Spring Cloud Alibaba, Nacos Config, Nacos Discovery]
description: Nacos Quick Start.
---

本章节将演示如何使用 spring-cloud-starter-alibaba-nacos-config 和 spring-cloud-starter-alibaba-nacos-discovery 完成 Spring Cloud 应用的配置管理和服务发现。

## 正确配置并启动 Nacos Server 2.2.x

在 Nacos 2.2.x 中，加入了用户鉴权相关的功能，在首次启动 Nacos Server 时，需要正确配置，避免出现启动失败的问题。

### 下载 Nacos Server

> 本示例中使用 Nacos Server 版本为 2.2.3！

Nacos 支持直接下载和源码构建两种方式。**推荐在 Spring Cloud Alibaba 2022.x 中使用 Nacos Server 2.2.3 版本。**

1. 直接下载：[Nacos Server 下载页](https://github.com/alibaba/nacos/releases)
2. 源码构建：进入 Nacos [Github 项目页面](https://github.com/alibaba/nacos)，将代码 git clone 到本地自行编译打包，[参考文档](https://nacos.io/zh-cn/docs/quick-start.html)。

### 配置 Nacos Server

打开 `\nacos-server-2.2.3\conf\application.properties` 配置文件，修改以下配置项：

#### 配置数据源

此处以 MySQL 数据库为例，使用 `nacos-server-2.2.3\conf\mysql-schema.sql` 初始化数据库表文件。同时修改以下配置

```properties
#*************** Config Module Related Configurations ***************#
### If use MySQL as datasource:
spring.datasource.platform=mysql

### Count of DB:
db.num=1

### Connect URL of DB:
db.url.0=jdbc:mysql://127.0.0.1:3306/nacos?characterEncoding=utf8&connectTimeout=1000&socketTimeout=3000&autoReconnect=true&useUnicode=true&useSSL=false&serverTimezone=UTC&allowPublicKeyRetrieval=true
db.user.0=root
db.password.0=root

### Connection pool configuration: hikariCP
db.pool.config.connectionTimeout=30000
db.pool.config.validationTimeout=10000
db.pool.config.maximumPoolSize=20
db.pool.config.minimumIdle=2
```

#### 开启鉴权

**注意：不开启在 2.2.x 中会出现登陆失败异常！**

```properties
### The auth system to use, currently only 'nacos' and 'ldap' is supported:
nacos.core.auth.system.type=nacos

### If turn on auth system:
nacos.core.auth.enabled=true
```

#### 设置服务端验证 key

```properties
nacos.core.auth.server.identity.key=test
nacos.core.auth.server.identity.value=test
```

#### 设置默认 token

```properties
### The default token (Base64 String):
nacos.core.auth.plugin.nacos.token.secret.key=SecretKey012345678901234567890123456789012345678901234567890123456789
```

**在使用 Nacos 服务发现和配置功能时，一定要配置 `username` 和 `password` 属性，否则会出现用户未找到异常！**

#### Open API 鉴权

在 nacos server 2.2.x 中使用 Open api 接口时需要鉴权：更多细节请参考：[Nacos api 鉴权](https://nacos.io/zh-cn/docs/auth.html)

1. 获取 accessToken：使用用户名和密码登陆 nacos server：

   `curl -X POST '127.0.0.1:8848/nacos/v1/auth/login' -d 'username=nacos&password=nacos'`

   若用户名和密码正确,返回信息如下:

   `{"accessToken":"eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJuYWNvcyIsImV4cCI6MTYwNTYyOTE2Nn0.2TogGhhr11_vLEjqKko1HJHUJEmsPuCxkur-CfNojDo","tokenTtl":18000,"globalAdmin":true}`

2. 使用 accessToken 请求 nacos api 接口：
   
   `curl -X GET '127.0.0.1:8848/nacos/v1/cs/configs?accessToken=eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJuYWNvcyIsImV4cCI6MTYwNTYyMzkyM30.O-s2yWfDSUZ7Svd3Vs7jy9tsfDNHs1SuebJB4KlNY8Q&dataId=nacos.example.1&group=nacos_group'`

### 启动 Nacos Server

1. 启动 Nacos Server，进入下载到本地并解压完成后的文件夹(使用源码构建的方式则进入编译打包好的文件夹)，再进去其相对文件夹 `nacos/bin`，并对照操作系统实际情况执行如下命令。[详情参考此文档](https://nacos.io/zh-cn/docs/quick-start.html)。

   1. Linux/Unix/Mac 操作系统，执行命令 

      `sh startup.sh -m standalone`

   2. Windows 操作系统，执行命令 

      `cmd startup.cmd`

2. 访问 Nacos Server Console

   浏览器输入地址 http://127.0.0.1:8848/nacos ，**首次登陆需要绑定 nacos 用户，因为新版本增加了鉴权，需要应用注册和配置绑定时配置用户名和密码。**

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
         - nacos:nacos-config-example.properties?refresh=true
   ```

3. 完成上述两步后，应用会从 Nacos Server 中获取相应的配置，并添加在 Spring Environment 的 PropertySources 中。假设我们通过 Nacos 作为配置中心保存应用服务的部分配置，有以下几种方式实现：

   - BeanAutoRefreshConfigExample：通过将配置信息配置为 bean，支持配置变自动刷新；
   - ConfigListenerExample：监听配置信息；
   - DockingInterfaceExample：对接 Nacos 接口，通过接口完成对配置信息增删改查；
   - ValueAnnotationExample：通过 @Value 注解进行配置信息获取。

### 添加 Nacos 配置

1. 命令行方式：

   > **注意：需要替换 accessToken。**

   ```shell
   $ curl -X POST "http://127.0.0.1:8848/nacos/v1/cs/configs?accessToken=XXXXXXXXXXXXXXXXXXXXXXXX&dataId=nacos-config-example.properties&group=DEFAULT_GROUP&content=spring.cloud.nacos.config.serverAddr=127.0.0.1:8848%0Aspring.cloud.nacos.config.prefix=PREFIX%0Aspring.cloud.nacos.config.group=GROUP%0Aspring.cloud.nacos.config.namespace=NAMESPACE"
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
   $ curl -X POST "http://127.0.0.1:8848/nacos/v1/cs/configs?accessToken=XXXXXXXXXXXXXXXXXXXXXXXXXXX&dataId=nacos-config-example.properties&group=DEFAULT_GROUP&content=spring.cloud.nacos.config.serveraddr=127.0.0.1:8848%0Aspring.cloud.nacos.config.prefix=PREFIX%0Aspring.cloud.nacos.config.group=DEFAULT_GROUP%0Aspring.cloud.nacos.config.namespace=NAMESPACE"
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
