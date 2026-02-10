---
title: 进阶指南
keywords: [Spring Cloud Alibaba, Nacos]
description: Advanced, Nacos, Guide.
---

本章节展示 spring-cloud-starter-alibaba-nacos-config 和 spring-cloud-starter-alibaba-nacos-discovery 的高级特性和进阶用法。

## Nacos 配置中心进阶指南

### 自定义 Namespace 的配置

Nacos 内部有 [Namespace](https://nacos.io/zh-cn/docs/concepts.html) 的概念:

> 用于进行租户粒度的配置隔离。不同的命名空间下，可以存在相同的 Group 或 Data ID 的配置。Namespace 的常用场景之一是不同环境下配置的区分隔离，
> 例如开发环境和生产环境的资源（如配置、服务）隔离等。
> 在没有明确指定 ${spring.cloud.nacos.config.namespace} 配置的情况下， 默认使用的是 Nacos 中 public 命名空间即默认的命名空间。如果需要使用自定义的命名空间，可以通过以下配置来实现：

```properties
spring.cloud.nacos.config.namespace=YOUR_NAMESPACE_ID
```

### 自定义 Group 的配置

在没有明确指定 ${spring.cloud.nacos.config.group} 配置的情况下， 默认使用的是组 DEFAULT_GROUP 。如果需要自定义 Group，可以通过以下配置来实现：

```properties
spring.cloud.nacos.config.group=YOUR_GROUP_NAME
```

### spring.config.import 引入

在 Spring Cloud Alibaba 2025.x 版本中，接入 Nacos 配置中心**必须**使用 `spring.config.import` 方式导入配置。2025.1.x 版本已明确废弃 Spring Cloud Bootstrap 引导启动方式，不再支持通过 `bootstrap.yml` / `bootstrap.properties` 接入 Nacos。

配置示例如下：

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
      - optional:nacos:test.yml # 监听 DEFAULT_GROUP:test.yml
      - optional:nacos:test01.yml?group=group_01 # 覆盖默认 group，监听 group_01:test01.yml
      - optional:nacos:test02.yml?group=group_02&refreshEnabled=false # 不开启动态刷新
      - nacos:test03.yml # 在拉取 nacos 配置异常时会快速失败，会导致 spring 容器启动失败
```

注意事项：

1. 如果引入了 `spring-cloud-starter-alibaba-nacos-config`，项目启动时会自动检测是否通过 `spring.config.import` 引入了 nacos 条目，如果没有，会出现如下错误：

   ```text
   The spring.config.import property is missing a nacos: entry

   Action:

   Add a spring.config.import=nacos: property to your configuration.
   If configuration is not required add spring.config.import=optional:nacos: instead.
   To disable this check, set spring.cloud.nacos.config.import-check.enabled=false.
   ```

2. 可以通过手动设置 `spring.cloud.nacos.config.import-check.enabled=false` 关闭检测，但不建议这么做，该功能可以帮助检查是否引入多余依赖。

3. 2025.1.x 版本已不再支持 `bootstrap.yml` / `bootstrap.properties` 方式，请勿使用。2025.0.x 版本虽然仍兼容，但同样推荐使用 `spring.config.import` 方式。

### Nacos 健康检查

Spring Cloud Alibaba 提供了两个 Nacos 健康检查指标，分别用于 **Nacos Config（配置中心）** 和 **Nacos Discovery（服务发现）**。它们通过调用 Nacos 客户端的 `getServerStatus()` 方法探测与 Nacos 服务端的连接状态，并将结果上报至 Spring Boot Actuator 的 `/actuator/health` 端点。

**两者默认均为关闭状态**，需要显式开启。

#### 开启方式

**Nacos Config 健康检查：**

```yaml
# application.yml
spring:
  nacos:
    config:
      health-indicator:
        enabled: true
```

**Nacos Discovery 健康检查：**

```yaml
# application.yml
spring:
  cloud:
    nacos:
      discovery:
        health-indicator:
          enabled: true
```

开启后，访问 `/actuator/health` 端点将包含 Nacos 的连接状态。当 Nacos 服务端可达时状态为 `UP`，不可达时为 `DOWN`。


#### 警告：将 `/actuator` 配置为 Kubernetes Liveness Probe 的场景下请勿开启

开启 Nacos 健康检查后，当应用将`/actuator/health` 端点配置为 Kubernetes **Liveness Probe（存活探针）** 时，一旦应用与 Nacos 服务端的连接出现波动或失败（例如网络抖动），`/actuator/health` 状态会变为 `DOWN`。**这会错误地触发 Kubernetes 重启 Pod，即使应用本身的业务逻辑仍然完全正常**。在大规模集群中，网络抖动可能导致大量 Pod 被同时重启，进而引发 **雪崩效应**。

如果你对 Kubernetes 探针机制并不熟悉，**强烈推荐保持默认配置（关闭），请勿开启 Nacos 健康检查**。



### 配置项参考

更多关于 spring-cloud-starter-alibaba-nacos-config 的 starter 配置项如下所示:

| 配置项                    | key                                       | 默认值                     | 说明                                                                             |
| ------------------------- | ----------------------------------------- | -------------------------- | -------------------------------------------------------------------------------- |
| 服务端地址                | spring.cloud.nacos.config.server-addr     |                            | 服务器 ip 和端口                                                                 |
| DataId 前缀               | spring.cloud.nacos.config.prefix          | ${spring.application.name} | DataId 的前缀，默认值为应用名称                                                  |
| Group                     | spring.cloud.nacos.config.group           | DEFAULT_GROUP              |
| DataId 后缀及内容文件格式 | spring.cloud.nacos.config.file-extension  | properties                 | DataId 的后缀，同时也是配置内容的文件格式，目前只支持 properties                 |
| 配置内容的编码方式        | spring.cloud.nacos.config.encode          | UTF-8                      | 配置的编码                                                                       |
| 获取配置的超时时间        | spring.cloud.nacos.config.timeout         | 3000                       | 单位为 ms                                                                        |
| 配置的命名空间            | spring.cloud.nacos.config.namespace       |                            | 常用场景之一是不同环境的配置的区分隔离，例如开发测试环境和生产环境的资源隔离等。 |
| AccessKey                 | spring.cloud.nacos.config.access-key      |                            |
| SecretKey                 | spring.cloud.nacos.config.secret-key      |                            |
| 相对路径                  | spring.cloud.nacos.config.context-path    |                            | 服务端 API 的相对路径                                                            |
| 接入点                    | spring.cloud.nacos.config.endpoint        |                            | 地域的某个服务的入口域名，通过此域名可以动态地拿到服务端地址                     |
| 是否开启监听和自动刷新    | spring.cloud.nacos.config.refresh-enabled | true                       |
| 集群服务名                | spring.cloud.nacos.config.cluster-name    |                            |

### Endpoint 信息

请求 http://127.0.0.1:18083/actuator/nacosconfig 地址，可以看到相关的 EndPoint 节点信息。

```shell
$ curl http://127.0.0.1:18083/actuator/nacosconfig
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

在 Spring Cloud 应用的启动阶段，监听了 WebServerInitializedEvent 事件，当 Web 容器初始化完成后，即收到 WebServerInitializedEvent 事件后，会触发注册的动作，调用 ServiceRegistry 的 register 方法，将服务注册到 Nacos Server。

### IPv4 至 IPv6 地址迁移方案

#### IPv4 和 IPv6 地址双注册

在配置完成 Spring Cloud Loadbalancer 作为负载均衡策略后，应用启动后会默认将微服务的 IPv4 地址和 IPv6 地址注册到注册中心中，其中 IPv4 地址会存放在 Nacos 服务列表中的 IP 字段下， IPv6 地址在 Nacos 的 metadata 字段中，其对应的 Key 为 IPv6 。当服务消费者调用服务提供者时，会根据自身的 IP 地址栈支持情况，选择合适的 IP 地址类型发起服务调用。

具体规则：

1. 服务消费者本身支持 IPv4 和 IPv6 双地址栈或仅支持 IPv6 地址栈的情况下，服务消费者会使用服务提供的 IPv6 地址发起服务调用，IPv6 地址调用失败且服务本身同时支持 IPv4 地址栈时，暂不支持切换到 IPv4 地址发起重试调用；
2. 服务消费者本身仅支持 IPv4 单地址栈的情况下，服务消费者会使用服务提供的 IPv4 地址发起服务调用。

#### 仅注册 IPv4

如果您只想使用 IPv4 地址进行注册，可以在 application.properties 使用如下配置项进行配置：

```properties
spring.cloud.nacos.discovery.ip-type=IPv4
```

#### 仅注册 IPv6

如果您只想使用 IPv6 地址，可以在 application.properties 使用如下配置项进行配置：

```properties
spring.cloud.nacos.discovery.ip-type=IPv6
```

### 配置项参考

更多关于 spring-cloud-starter-alibaba-nacos-discovery 的 starter 配置项如下所示:

| 配置项                | key                                                      | 默认值   | 说明                                                                                                                                                     |
| --------------------- | -------------------------------------------------------- | -------- | -------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 服务端地址            | spring.cloud.nacos.discovery.server-addr                 |          |
| 服务名                | spring.cloud.nacos.discovery.service                     | 应用名   | 注册到 Nacos 上的服务名称，默认值为应用名称                                                                                                              |
| 权重                  | spring.cloud.nacos.discovery.weight                      | 1        | 取值范围 1 到 100，数值越大，权重越大                                                                                                                    |
| 网卡名                | spring.cloud.nacos.discovery.network-interface           |          | 当 IP 未配置时，注册的 IP 为此网卡所对应的 IP 地址，如果此项也未配置，则默认取第一块网卡的地址                                                           |
| 注册的 IP 地址        | spring.cloud.nacos.discovery.ip                          |          | 优先级最高                                                                                                                                               |
| 注册的 IP 地址类型    | spring.cloud.nacos.discovery.ip-type                     | 双栈地址 | 可以配置 IPv4 和 IPv6 两种类型，如果网卡同类型 IP 地址存在多个，希望制定特定网段地址，可使用`spring.cloud.inetutils.preferred-networks`配置筛选地址      |
| 注册的端口            | spring.cloud.nacos.discovery.port                        | -1       | 默认情况下不用配置，会自动探测                                                                                                                           |
| 命名空间              | spring.cloud.nacos.discovery.namespace                   |          | 常用场景之一是不同环境的注册的区分隔离，例如开发测试环境和生产环境的资源（如配置、服务）隔离等。                                                         |
| AccessKey             | spring.cloud.nacos.discovery.access-key                  |          |
| SecretKey             | spring.cloud.nacos.discovery.secret-key                  |          |
| Metadata              | spring.cloud.nacos.discovery.metadata                    |          | 使用 Map 格式配置                                                                                                                                        |
| 日志文件名            | spring.cloud.nacos.discovery.log-name                    |          |
| 集群                  | spring.cloud.nacos.discovery.cluster-name                | DEFAULT  | Nacos 集群名称                                                                                                                                           |
| 接入点                | spring.cloud.nacos.discovery.endpoint                    |          | 地域的某个服务的入口域名，通过此域名可以动态地拿到服务端地址                                                                                             |
| 是否集成 LoadBalancer | spring.cloud.loadbalancer.nacos.enabled                  | false    |
| 是否开启 Nacos Watch  | spring.cloud.nacos.discovery.watch.enabled               | false    | 可以设置成 true 来开启 watch                                                                                                                             |
| 是否启用 Nacos        | spring.cloud.nacos.discovery.register-enabled                     | true     | 默认启动，设置为 false 时会关闭自动向 Nacos 注册的功能                                                                                                   |
| 是否启用容错配置      | `spring.cloud.nacos.discovery.failure-tolerance-enabled` | false    | 开启 nacos 服务发现失败容错能力，该功能会在 nacos 获取实例失败时返回上一次获取的实例，可以在 nacos server 网络不稳定时提供容错能力，不会导致请求全部挂掉 |

### Endpoint 信息

请求 http://127.0.0.1:18083/actuator/nacosdiscovery 地址，可以看到相关的 EndPoint 节点信息。

```shell
$ curl http://127.0.0.1:18083/actuator/nacosdiscovery
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
