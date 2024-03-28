---
title: "Quick Start"
keywords: [Spring Cloud Alibaba]
description: Nacos.
---

This chapter will demonstrate how to use spring-cloud-starter-alibaba-nacos-config and spring-cloud-starter-alibaba-nacos-discovery to complete the configuration management and service discovery of Spring Cloud applications.

## Nacos Server 2.2.x is properly configured and started

In Nacos 2.2.x, functions related to user authentication are added. When starting Nacos Server for the first time, it needs to be configured correctly to avoid the problem of startup failure.

### Download Nacos Server

> The Nacos serv version used in this example is 2.2.3!

Nacos supports both direct download and source code construction. **Nacos Server version 2.2.3 is recommended for Spring Cloud Alibaba 2022.x.**

1. Direct download: [Nacos Server download page](https://github.com/alibaba/nacos/releases)
2. Source code construction: Enter Nacos [Github project page](https://github.com/alibaba/nacos), git clone the code to the local compilation and packaging [参考文档](https://nacos.io/zh-cn/docs/quick-start.html).

### Configure the Nacos Server

Open the `\nacos-server-2.2.3\conf\application.properties` configuration file and modify the following configuration items:

#### Configure the data source

Take the MySQL database as an example here, and use the `nacos-server-2.2.3\conf\mysql-schema.sql` initialization database table file. Modify the following configuration as well

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

#### Turn on authentication

**Note: If it is not enabled, login failure exception will occur in 2.2.x!**

```properties
### The auth system to use, currently only 'nacos' and 'ldap' is supported:
nacos.core.auth.system.type=nacos

### If turn on auth system:
nacos.core.auth.enabled=true
```

#### Set the server authentication key

```properties
nacos.core.auth.server.identity.key=test
nacos.core.auth.server.identity.value=test
```

#### Set the default token

```properties
### The default token (Base64 String):
nacos.core.auth.plugin.nacos.token.secret.key=SecretKey012345678901234567890123456789012345678901234567890123456789
```

** When using the Nacos service discovery and configuration function, be sure to configure `username` and `password` attribute, otherwise the user will not be found! **

#### Open API authentication

Authentication is required when using the Open api interface in nacos server 2.2.x: For more details, please refer to: [Nacos api authentication](https://nacos.io/zh-cn/docs/auth.html)

1. Obtain accessToken: Use username and password to log in to the nacos server:

   `curl -X POST '127.0.0.1:8848/nacos/v1/auth/login' -d 'username=nacos&password=nacos'`

   If the username and password are correct, the returned information is as follows:

   `{"accessToken":"eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJuYWNvcyIsImV4cCI6MTYwNTYyOTE2Nn0.2TogGhhr11_vLEjqKko1HJHUJEmsPuCxkur-CfNojDo", "tokenTtl": 18000, "globalAdmin": true}`

2. Use accessToken to request the nacos api interface:

  `curl -X GET '127.0.0.1:8848/nacos/v1/cs/configs?accessToken=eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJuYWNvcyIsImV4cCI6MTYwNTYyMzkyM30.O-s2yWfDSUZ7Svd3Vs7jy9tsfDNHs1SuebJB4KlNY8Q&dataId=nacos.example.1&group=nacos_group'`

### Start the Nacos Server

1. Start Nacos Server, enter the folder after downloading to the local and decompressing (enter the folder after compiling and packaging by using the source code construction method), then enter its relative folder `nacos/bin`, and execute the following command according to the actual situation of the operating system. [详情参考此文档](https://nacos.io/zh-cn/docs/quick-start.html).

  1. Linux/Unix/Mac operating system, execute the command

   `sh startup.sh -m standalone`

  2. Windows operating system, executing command

   `cmd startup.cmd`

2. Access Nacos Server Console.

   The browser enters the address http://127.0.0.1:8848/nacos , **The first login needs to bind the nacos user, because the new version adds authentication, and the user name and password need to be configured during application registration and configuration binding.**

## Nacos configuration center

### Access Nacos Config

If you want to use Nacos for configuration management in your project. You need to do the following (ensure that Nacos Server is started)

1. Add a starter whose group ID is com.alibaba.cloud and artifact ID is spring-cloud-starter-alibaba-nacos-config to the pom.xml file:

   ```xml
   <dependency>
       <groupId>com.alibaba.cloud</groupId>
       <artifactId>spring-cloud-starter-alibaba-nacos-config</artifactId>
   </dependency>
   ```

2. The application/src/main/resources/application. The yaml configuration file configuration Nacos Config address and introduce the service configuration:

   ```yml
   spring:
     cloud:
       nacos:
         serverAddr: 127.0.0.1:8848
     config:
       import:
         - nacos:nacos-config-example.properties?refreshEnabled=true
   ```

3. After completing the preceding two steps, the application will obtain the corresponding configuration from Nacos Config and add it to PropertySources in the Spring Environment. Suppose we save part of the Nacos configuration through the Nacos configuration center. There are four examples as follows:

   - BeanAutoRefreshConfigExample: through the configuration information for the configuration bean, supporting configuration changes automatically refresh;
   - ConfigListenerExample: indicates the listening configuration;
   - DockingInterfaceExample: Interconnects with Nacos interface to add, delete, modify and check configuration information through the interface;
   - ValueAnnotationExample: Obtain configuration information using the @Value annotation.

### Add Nacos configuration

1. Use the CLI

   ```shell
   $ curl -X POST "http://127.0.0.1:8848/nacos/v1/cs/configs?accessToken=XXXXXXXXXXXXXXXXXXXXXXXXXXX&dataId=nacos-config-example.properties&group=DEFAULT_GROUP&content=spring.cloud.nacos.config.serverAddr=127.0.0.1:8848%0Aspring.cloud.nacos.config.prefix=PREFIX%0Aspring.cloud.nacos.config.group=GROUP%0Aspring.cloud.nacos.config.namespace=NAMESPACE"
   ```

2. Console Mode (recommended)

   ```markdown
   The dataId is nacos-config-example.properties
   group is DEFAULT_GROUP
   ```

   The configuration content is as follows:

   ```properties
   Spring.cloud.nacos.config.serveraddr=127.0.0.1:8848
   spring.cloud.nacos.config.prefix=PREFIX
   spring.cloud.nacos.config.group=GROUP
   spring.cloud.nacos.config.namespace=NAMESPACE
   ```

### Start the application and validate

#### Application startup

1. Add other configuration: in application /src/main/resources/application. The yaml add basic configuration information:

   ```yaml
   server:
     port: 18084
   management:
     endpoints:
       web:
         exposure:
           include: "*"
   ```

2. Start the application, support IDE directly start, compile and package start:

   - IDE Direct startup: Find the main class NacosConfigApplication and run the main method to start the application.
   - package and compile startup: First run mvn clean package to compile and package the project, and then run java -jar nacos-config-example.jar to start the application.

#### Function verification

1. Verify automatic injection

   Request http://127.0.0.1:18084/nacos/bean address, it can be seen that the data is successfully obtained from the Nacos collocation center.

   ```shell
   $ curl http://127.0.0.1:18084/nacos/bean
   ```

   Response:

   ```json
   {
     "serverAddr": "127.0.0.1:8848",
     "prefix": "PREFIX",
     "namespace": "NAMESPACE",
     "group": "GROUP"
   }
   ```

2. Verify dynamic refresh

   Execute the following command in the command line terminal to refresh the Nacos configuration information:

   ```shell
   $ curl -X POST "http://127.0.0.1:8848/nacos/v1/cs/configs?accessToken=XXXXXXXXXXXXXXXXXXXXXXXXXXXX&dataId=nacos-config-example.properties&group=DEFAULT_GROUP&content=spring.cloud.nacos.config.serveraddr=127.0. 0.1:8848%0Aspring.cloud.nacos.config.prefix=PREFIX%0Aspring.cloud.nacos.config.group=DEFAULT_GROUP%0Aspring.cloud.nacos.config.namespace=NAMESPACE"
   ```

   Request the http://127.0.0.1:18084/nacos/bean address again. You can see that the application has obtained the latest data from Nacos.

   ```shell
   $ curl http://127.0.0.1:18084/nacos/bean
   ```

   Response result:

   ```json
   {
     "serverAddr": "127.0.0.1:8848",
     "prefix": "PREFIX",
     "namespace": "NAMESPACE",
     "group": "DEFAULT_GROUP"
   }
   ```

Nacos configuration management example source code reference: [Nacos configuration management example](https://github.com/alibaba/spring-cloud-alibaba/tree/2022.x/spring-cloud-alibaba-examples/nacos-example/nacos-config-example)

For more information about Spring Cloud Alibaba Nacos Config's advanced features and how to use them, see the Advanced Guide to Registering the Configuration Center section!

## Nacos Service Registration and Discovery

### Access Nacos Discovery

If you want to use Nacos for service discovery in your project. You need to do the following (ensure that Nacos Server is started).

1. Add a starter with group ID com.alibaba.cloud and artifact ID spring-cloud-starter-alibaba-nacos-discovery to the pom.xml file:

   ```xml
   <dependency>
       <groupId>com.alibaba.cloud</groupId>
       <artifactId>spring-cloud-starter-alibaba-nacos-discovery</artifactId>
   </dependency>
   ```

2. Add application configuration: in application /src/main/resources/application properties Nacos Server address that is configured in the configuration file:

   ```properties
   spring.cloud.nacos.discovery.server-addr=127.0.0.1:8848
   ```

3. Use the @EnableDiscoveryClient annotation to enable service registration and discovery:

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

### Start the application and validate

#### Application startup

1. Add configuration: in [nacos-discovery-provider-example](https://github.com/alibaba/spring-cloud-alibaba/tree/2022.x/spring-cloud-alibaba-examples/nacos-example/nacos-discovery-example/nacos-discovery-provider-example) project /src/main/resources/application.properties. The basic configuration information added to the properties

   ```properties
   spring.application.name=service-provider
   server.port=18082
   ```

2. Start the application, support IDE directly start, compile and package start.

   - IDE Direct startup: Find ProviderApplication, the main class of [nacos-discovery-provider-example](https://github.com/alibaba/spring-cloud-alibaba/tree/2022.x/spring-cloud-alibaba-examples/nacos-example/nacos-discovery-example/nacos-discovery-provider-example) project, and run main to start the application.
   - Start after packaging and compiling: Execute mvn clean package in [nacos-discovery-provider-example](https://github.com/alibaba/spring-cloud-alibaba/tree/2022.x/spring-cloud-alibaba-examples/nacos-example/nacos-discovery-example/nacos-discovery-provider-example) project to compile and package the project. Then run the java -jar nacos-discovery-provider-example.jar command to start the application.

#### verification

1. Query services

   Enter the following command to query the Nacos Server. You can see that the service node has successfully registered with Nacos Server.

   ```shell
   curl http://127.0.0.1:8848/nacos/v1/ns/catalog/instances? serviceName=service-provider&clusterName=DEFAULT&pageSize=10&pageNo=1&namespaceId=
   ```

   Response:

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

2. Service discovery

   Add the following dependencies in pom.xml:

   ```xml
   <dependencies>
       <dependency>
           <groupId>org.springframework.cloud</groupId>
           <artifactId>spring-cloud-loadbalancer</artifactId>
       </dependency>
   </dependencies>
   ```

   Add the following configurations to the configuration file:

   ```properties
   spring.cloud.loadbalancer.ribbon.enabled=false
   spring.cloud.loadbalancer.nacos.enabled=true
   ```

### Service consumption

#### Application Configuration

This section only covers the Ribbon, RestTemplate, and FeignClient for your understanding of access methods. If other service Discovery components have been used, you can directly replace dependencies to access Nacos Discovery.

1. Add @LoadBlanced annotations to connect the RestTemplate to the Ribbon:

   ```java
   @Bean
   @LoadBalanced
   public RestTemplate restTemplate() {
       return new RestTemplate();
   }
   ```

2. The FeignClient is integrated with the Ribbon by default. Here is how to configure a FeignClient:

   ```java
   @FeignClient(name = "service-provider")
   public interface EchoService {
       @GetMapping(value = "/echo/{str}")
       String echo(@PathVariable("str") String str);
   }
   ```

   Wrap the EchoService interface as a FeignClient using the @FeignClient annotation, with the attribute name corresponding to the service name service-provider.

   The @RequestMapping annotation on the echo method maps the echo method to the URL "/echo/{str}", and the @PathVariable annotation maps {str} in the URL path to the echo method parameter str.

3. Inject both into the Controller:

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

4. Add necessary configurations:

   In nacos-discovery-consumer-example project /src/main/resources/application. The basic configuration information added to the properties:

   ```properties
   spring.application.name=service-consumer
   server.port=18083
   ```

5. Start the application

   - IDE direct startup: Find the main class of [nacos-discovery-consumer-example](https://github.com/alibaba/spring-cloud-alibaba/tree/2022.x/spring-cloud-alibaba-examples/nacos-example/nacos-discovery-example/nacos-discovery-consumer-example) project ConsumerApplication and execute the main method to start the application.
   - Start after packaging and compiling: Execute mvn clean package in [nacos-discovery-consumer-example](https://github.com/alibaba/spring-cloud-alibaba/tree/2022.x/spring-cloud-alibaba-examples/nacos-example/nacos-discovery-example/nacos-discovery-consumer-example) project to compile and package the project. Then run the java -jar nacos-discovery-consumer-example.jar command to start the application.

#### verification

1. Request http://127.0.0.1:18083/echo-rest/1234 address, You can see that the response displays the message "hello Nacos Discovery 1234" returned by Nacos-discovery-provider-example, proving that the service Discovery is valid.

   ```shell
   curl http://127.0.0.1:18083/echo-rest/1234
   ```

   Response:

   ```json
   hello Nacos Discovery 1234
   ```

2. Request http://127.0.0.1:18083/echo-feign/12345 address, You can see that the response shows the message "hello Nacos Discovery 12345" returned by Nacos-discovery-provider-example, proving that the service Discovery is valid.

   ```shell
   $ curl http://127.0.0.1:18083/echo-feign/12345
   ```

   Response:

   ```json
   hello Nacos Discovery 12345
   ```

Nacos service registration and discovery sample source code reference: [Nacos service registration and discovery example](https://github.com/alibaba/spring-cloud-alibaba/tree/2022.x/spring-cloud-alibaba-examples/nacos-example/nacos-discovery-example)

For more advanced features and usage methods of Nacos service registration and discovery, please refer to the registration configuration center advanced guide chapter!
