---
title: 进阶指南
keywords: [Spring Cloud Alibaba, Nacos]
description: Advanced, Nacos, Guide.
---

本章节展示 spring-cloud-starter-alibaba-nacos-config 和 spring-cloud-starter-alibaba-nacos-discovery 的高级特性和进阶用法。
 
## Nacos 配置中心进阶指南

### profile 粒度的配置

spring-cloud-starter-alibaba-nacos-config 在加载服务配置时：

不仅仅加载了以 dataId 为 `${spring.application.name}.${file-extension:properties}` 为前缀的基础配置，

还加载了dataId为 `${spring.application.name}-${profile}.${file-extension:properties}` 的基础配置。

在日常开发中如果遇到多套环境下的不同配置，可以通过 Spring 提供的 `${spring.profiles.active}` 这个配置项选择不同情况下的配置。

```properties
spring.profiles.active=develop
```

Nacos 上新增一个dataId为：nacos-config-develop.yaml 的基础配置，如下所示：

```properties
Data ID: nacos-config-develop.yaml
Group: DEFAULT_GROUP
配置格式: YAML
配置内容: current.env: develop-env
```

启动 Spring Boot 应用测试的代码如下：

```java
@SpringBootApplication
public class ProviderApplication {

    public static void main(String[] args) {
        ConfigurableApplicationContext applicationContext = SpringApplication.run(ProviderApplication.class, args);
        while(true) {
            String userName = applicationContext.getEnvironment().getProperty("user.name");
            String userAge = applicationContext.getEnvironment().getProperty("user.age");
            //获取当前部署的环境
            String currentEnv = applicationContext.getEnvironment().getProperty("current.env");
            System.err.println("in "+currentEnv+" enviroment; "+"user name :" + userName + "; age: " + userAge);
            TimeUnit.SECONDS.sleep(1);
        }
    }
}
```
控制台输出结果如下：
```markdown
in develop-env enviroment; user name :nacos-config-yaml-update; age: 68
2018-11-02 15:34:25.013  INFO 33014 --- [ Thread-11] ConfigServletWebServerApplicationContext : Closing org.springframework.boot.web.servlet.context.AnnotationConfigServletWebServerApplicationContext@6f1c29b7: startup date [Fri Nov 02 15:33:57 CST 2018]; parent: org.springframework.context.annotation.AnnotationConfigApplicationContext@63355449
```

如果需要切换到生产环境，只需要更改 `${spring.profiles.active}` 参数配置即可。如下所示：

```properties
spring.profiles.active=product
```

同时生产环境上 Nacos 需要添加对应 dataId 的基础配置。例如，在生成环境下的 Nacos 添加了 dataId 为：nacos-config-product.yaml 的配置：

```markdown
Data ID: nacos-config-product.yaml
Group: DEFAULT_GROUP
配置格式: YAML
配置内容: current.env: product-env
```

启动测试程序，输出结果如下：

```markdown
in product-env enviroment; user name :nacos-config-yaml-update; age: 68
2018-11-02 15:42:14.628  INFO 33024 --- [Thread-11] ConfigServletWebServerApplicationContext : Closing org.springframework.boot.web.servlet.context.AnnotationConfigServletWebServerApplicationContext@6aa8e115: startup date [Fri Nov 02 15:42:03 CST 2018]; parent: org.springframework.context.annotation.AnnotationConfigApplicationContext@19bb07ed
```

> Note:
>
> 此案例中我们通过 `spring.profiles.active=<profilename>` 的方式写死在配置文件中，而在真正的项目实施过程中这个变量的值是需要不同环境而有不同的值。这个时候通常的做法是通过 `-Dspring.profiles.active=<profile>` 参数指定其配置来达到环境间灵活的切换。

### 自定义 Namespace 的配置

Nacos 内部有 [Namespace](https://nacos.io/zh-cn/docs/concepts.html) 的概念:

> 用于进行租户粒度的配置隔离。不同的命名空间下，可以存在相同的 Group 或 Data ID 的配置。Namespace 的常用场景之一是不同环境的配置的区分隔离，
> 例如开发测试环境和生产环境的资源（如配置、服务）隔离等。
> 在没有明确指定 ${spring.cloud.nacos.config.namespace} 配置的情况下， 默认使用的是 Nacos 中 public 命名空间即默认的命名空间。如果需要使用自定义的命名空间，可以通过以下配置来实现：

```properties
spring.cloud.nacos.config.namespace=YOUR_NAMESPACE_ID
```

> NOTE: 
> 
> **该配置必须放在 bootstrap.properties 文件中**。此外 spring.cloud.nacos.config.namespace 的值是 namespace 对应的 id，id 值可以在 Nacos 的控制台获取。并且在添加配置时注意不要选择其他的 namespace，否则将会导致读取不到正确的配置。

### 自定义 Group 的配置

在没有明确指定 ${spring.cloud.nacos.config.group} 配置的情况下， 默认使用的是组 DEFAULT_GROUP 。如果需要自定义 Group，可以通过以下配置来实现：

```properties
spring.cloud.nacos.config.group=YOUR_GROUP_NAME
```

> NOTE:
> 
> **该配置必须放在 bootstrap.properties 文件中。**并且在添加配置时 Group 的值一定要和 spring.cloud.nacos.config.group 的配置值一致。

### 配置的优先级

Nacos Config 目前提供了三种配置能力从 Nacos 拉取相关的配置：

- A: 通过 `spring.cloud.nacos.config.shared-dataids` 支持多个共享 Data Id 的配置

- B: 通过 `spring.cloud.nacos.config.ext-config[n].data-id` 的方式支持多个扩展 Data Id 的配置

- C: 通过内部相关规则(应用名、应用名+ Profile )自动生成相关的 Data Id 配置

当三种方式共同使用时，他们的一个优先级关系是: ***A < B < C***

### springc.config.import 引入

这里假设有一个配置文件 bootstrap.yml，升级到 2021.0.1.0 以上的版本应该怎么配置呢？

```yml
# bootstrap.yml
spring:
  cloud:
    nacos:
      config:
        name: test.yml
        group: DEFAULT_GROUP
        server-addr: 127.0.0.1:8848
        extension-configs:
          - dataId: test01.yml
            group: group_01
          - dataId: test02.yml
            group: group_02
            refresh: false
```

**注意：上面的配置和下面的配置是等价的！**

```yml
# application.yml
spring:
  cloud:
    nacos:
      config:
        group: DEFAULT_GROUP
        server-addr: 127.0.0.1:8848
  config:
    import:
      - optional:nacos:test.yml  # 监听 DEFAULT_GROUP:test.yml
      - optional:nacos:test01.yml?group=group_01 # 覆盖默认 group，监听 group_01:test01.yml
      - optional:nacos:test02.yml?group=group_02&refreshEnabled=false # 不开启动态刷新
      - nacos:test03.yml # 在拉取nacos配置异常时会快速失败，会导致 spring 容器启动失败
```

使用 spring.config.import 引入配置时的注意事项如下：

1. 如果使用 spring.config.import 就不能使用 bootstrap.yml/properties 引入配置的方式了；
2. 如果引入了 spring-cloud-starter-alibaba-nacos-config，并且使用 import 方式导入配置, 项目启动时会自动检测是否引入了 nacos 条目，如果没有 import nacos 条目，会出现如下错误：

  ```markdown
  The spring.config.import property is missing a nacos: entry

  Action:

  Add a spring.config.import=nacos: property to your configuration.
	If configuration is not required add spring.config.import=optional:nacos: instead.
	To disable this check, set spring.cloud.nacos.config.import-check.enabled=false.
  ```

  可以通过手动设置 spring.cloud.nacos.config.import-check.enabled=false 关闭它，但是不建议这么做，这个功能可以帮助你检查是否引入多余依赖

假如想保留以前的使用方式 ( bootstrap 引入配置)，你只需要添加依赖 spring-cloud-starter-bootstrap 依赖，不需要修改一行代码即可完成配置方式的切换！

### 配置项参考

更多关于 spring-cloud-starter-alibaba-nacos-config 的 starter 配置项如下所示:

配置项|key|默认值|说明
----|----|-----|-----
服务端地址|spring.cloud.nacos.config.server-addr||服务器ip和端口
DataId前缀|spring.cloud.nacos.config.prefix|${spring.application.name}|DataId的前缀，默认值为应用名称
Group|spring.cloud.nacos.config.group|DEFAULT_GROUP|
DataId后缀及内容文件格式|spring.cloud.nacos.config.file-extension|properties|DataId的后缀，同时也是配置内容的文件格式，目前只支持 properties
配置内容的编码方式|spring.cloud.nacos.config.encode|UTF-8|配置的编码
获取配置的超时时间|spring.cloud.nacos.config.timeout|3000|单位为 ms
配置的命名空间|spring.cloud.nacos.config.namespace||常用场景之一是不同环境的配置的区分隔离，例如开发测试环境和生产环境的资源隔离等。
AccessKey|spring.cloud.nacos.config.access-key||
SecretKey|spring.cloud.nacos.config.secret-key||
相对路径|spring.cloud.nacos.config.context-path||服务端 API 的相对路径
接入点|spring.cloud.nacos.config.endpoint||地域的某个服务的入口域名，通过此域名可以动态地拿到服务端地址
是否开启监听和自动刷新|spring.cloud.nacos.config.refresh-enabled|true|
集群服务名|spring.cloud.nacos.config.cluster-name||

### Endpoint 信息

请求 `127.0.0.1:18083/actuator/nacosconfig` 地址，可以看到相关的 EndPoint 节点信息。

```shell
$ curl 127.0.0.1:18084/actuator/nacosconfig 
```

响应结果：

```json
{
  "NacosConfigProperties": {
    "serverAddr": "127.0.0.1:8848",
    "username": "",
    "password": "",
    "encode": null,
    "group": "DEFAULT_GROUP",
    "prefix": "PREFIX",
    "fileExtension": "properties",
    "timeout": 3000,
    "maxRetry": null,
    "configLongPollTimeout": null,
    "configRetryTime": null,
    "enableRemoteSyncConfig": false,
    "endpoint": null,
    "namespace": "NAMESPACE",
    "accessKey": null,
    "secretKey": null,
    "ramRoleName": null,
    "contextPath": null,
    "clusterName": null,
    "name": null,
    "sharedConfigs": null,
    "extensionConfigs": null,
    "refreshEnabled": true,
    "configServiceProperties": {
      "encode": "",
      "secretKey": "",
      "serveraddr": "127.0.0.1:8848",
      "prefix": "PREFIX",
      "configLongPollTimeout": "",
      "maxRetry": "",
      "password": "",
      "configRetryTime": "",
      "endpoint": "",
      "serverAddr": "127.0.0.1:8848",
      "accessKey": "",
      "enableRemoteSyncConfig": "false",
      "clusterName": "",
      "namespace": "NAMESPACE",
      "ramRoleName": "",
      "username": "",
      "group": "DEFAULT_GROUP"
    },
    "refreshableDataids": null,
    "extConfig": null,
    "sharedDataids": null
  },
  "RefreshHistory": [],
  "Sources": [
    {
      "lastSynced": "2023-05-10 09:35:50",
      "dataId": "nacos-config-example.properties"
    }
  ]
}
```

## Nacos 服务注册与发现进阶指南

### 原理

spring-cloud-starter-alibaba-nacos-discovery 遵循了 Spring Cloud Common 标准，实现了 AutoServiceRegistration、ServiceRegistry、Registration 这三个接口。

在 Spring Cloud 应用的启动阶段，监听了 WebServerInitializedEvent 事件，当Web容器初始化完成后，即收到 WebServerInitializedEvent 事件后，会触发注册的动作，调用 ServiceRegistry 的 register 方法，将服务注册到 Nacos Server。

### IPv4至IPv6地址迁移方案

#### IPv4和IPv6地址双注册

在配置完成 Spring Cloud Loadbalancer 作为负载均衡策略后，应用启动后会默认将微服务的 IPv4 地址和 IPv6 地址注册到注册中心中，其中 IPv4 地址会存放在 Nacos 服务列表中的IP字段下， IPv6 地址在 Nacos 的 metadata 字段中，其对应的 Key 为 IPv6 。当服务消费者调用服务提供者时，会根据自身的IP地址栈支持情况，选择合适的IP地址类型发起服务调用。

具体规则： 
1. 服务消费者本身支持 IPv4 和 IPv6 双地址栈或仅支持 IPv6 地址栈的情况下，服务消费者会使用服务提供的 IPv6 地址发起服务调用，IPv6 地址调用失败且服务本身同时支持 IPv4 地址栈时，暂不支持切换到 IPv4 地址发起重试调用； 
2. 服务消费者本身仅支持 IPv4 单地址栈的情况下，服务消费者会使用服务提供的 IPv4 地址发起服务调用。

#### 仅注册IPv4

如果您只想使用 IPv4 地址进行注册，可以在 application.properties 使用如下配置项进行配置：

```properties
spring.cloud.nacos.discovery.ip-type=IPv4
```

#### 仅注册IPv6

如果您只想使用 IPv6 地址，可以在 application.properties 使用如下配置项进行配置：

```properties
spring.cloud.nacos.discovery.ip-type=IPv6
```

### 配置项参考

更多关于 spring-cloud-starter-alibaba-nacos-discovery 的 starter 配置项如下所示:

配置项|key|默认值|说明
----|----|-----|-----
服务端地址|spring.cloud.nacos.discovery.server-addr||
服务名|spring.cloud.nacos.discovery.service|应用名|注册到Nacos上的服务名称，默认值为应用名称
权重|spring.cloud.nacos.discovery.weight|1|取值范围 1 到 100，数值越大，权重越大
网卡名|spring.cloud.nacos.discovery.network-interface||当IP未配置时，注册的IP为此网卡所对应的IP地址，如果此项也未配置，则默认取第一块网卡的地址
注册的IP地址|spring.cloud.nacos.discovery.ip||优先级最高
注册的IP地址类型|spring.cloud.nacos.discovery.ip-type|双栈地址|可以配置IPv4和IPv6两种类型，如果网卡同类型IP地址存在多个，希望制定特定网段地址，可使用`spring.cloud.inetutils.preferred-networks`配置筛选地址
注册的端口|spring.cloud.nacos.discovery.port|-1|默认情况下不用配置，会自动探测
命名空间|spring.cloud.nacos.discovery.namespace||常用场景之一是不同环境的注册的区分隔离，例如开发测试环境和生产环境的资源（如配置、服务）隔离等。
AccessKey|spring.cloud.nacos.discovery.access-key||
SecretKey|spring.cloud.nacos.discovery.secret-key||
Metadata|spring.cloud.nacos.discovery.metadata||使用Map格式配置
日志文件名|spring.cloud.nacos.discovery.log-name||
集群|spring.cloud.nacos.discovery.cluster-name|DEFAULT|Nacos集群名称
接入点|spring.cloud.nacos.discovery.endpoint||地域的某个服务的入口域名，通过此域名可以动态地拿到服务端地址
是否集成LoadBalancer|spring.cloud.loadbalancer.nacos.enabled|false|
是否开启Nacos Watch|spring.cloud.nacos.discovery.watch.enabled|false|可以设置成true来开启 watch
是否启用Nacos|spring.cloud.nacos.discovery.enabled|true|默认启动，设置为false时会关闭自动向Nacos注册的功能
是否启用容错配置|`spring.cloud.nacos.discovery.failure-tolerance-enabled`|false|开启 nacos 服务发现失败容错能力，该功能会在 nacos 获取实例失败时返回上一次获取的实例，可以在 nacos server 网络不稳定时提供容错能力，不会导致请求全部挂掉


### Endpoint 信息

请求 `127.0.0.1:18083/actuator/nacosdiscovery` 地址，可以看到相关的 EndPoint 节点信息。

```shell
$ curl 127.0.0.1:18083/actuator/nacosdiscovery
```

响应结果：

```json
{
  "subscribe": [],
  "NacosDiscoveryProperties": {
    "serverAddr": "127.0.0.1:8848",
    "username": "nacos",
    "password": "nacos",
    "endpoint": "",
    "namespace": "",
    "watchDelay": 30000,
    "logName": "",
    "service": "service-consumer",
    "weight": 1,
    "clusterName": "DEFAULT",
    "group": "DEFAULT_GROUP",
    "namingLoadCacheAtStart": "false",
    "metadata": {
      "IPv6": null,
      "preserved.register.source": "SPRING_CLOUD"
    },
    "registerEnabled": true,
    "ip": "192.168.3.19",
    "networkInterface": "",
    "ipType": null,
    "port": 18083,
    "secure": false,
    "accessKey": "",
    "secretKey": "",
    "heartBeatInterval": null,
    "heartBeatTimeout": null,
    "ipDeleteTimeout": null,
    "instanceEnabled": true,
    "ephemeral": true,
    "failureToleranceEnabled": false,
    "failFast": true,
    "nacosProperties": {
      "password": "nacos",
      "endpoint": "",
      "secretKey": "",
      "serverAddr": "127.0.0.1:8848",
      "accessKey": "",
      "clusterName": "DEFAULT",
      "namespace": "",
      "com.alibaba.nacos.naming.log.filename": "",
      "namingLoadCacheAtStart": "false",
      "failFast": "true",
      "username": "nacos"
    }
  }
}
```