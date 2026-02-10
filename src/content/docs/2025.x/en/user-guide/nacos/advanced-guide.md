---
title: "Advanced Guide"
keywords: [Spring Cloud Alibaba, Nacos]
description: Advanced,Nacos,Guide.
---

This chapter shows the advanced features and advanced usage of spring-cloud-starter-alibaba-nacos-config and spring-cloud-starter-alibaba-nacos-discovery.

## Nacos Configuration Center Advanced Guide

### User-defined namespace configurations

Inside Nacos there is the concept of [Namespace](https://nacos.io/zh-cn/docs/concepts.html):

> For tenant granularity configuration isolation. The same Group or Data ID can be configured in different namespaces. A common scenario of Namespace is to separate and isolate configurations of different environments. For example, isolation of resources (such as configurations and services) between the development and test environments and production environments.
> without explicitly specify ${spring.cloud.nacos.config.namespace} configuration, the default is used on Public nacos this namespace. If you want to use a custom defined namespace, you can use the following configuration:

```properties
spring.cloud.nacos.config.namespace=YOUR_NAMESPACE_ID
```

### User-defined Group configuration

Without explicitly specify ${spring.cloud.nacos.config.group} configuration, use DEFAULT_GROUP by default. To customize your own Group, perform the following configurations:

```properties
spring.cloud.nacos.config.group=YOUR_GROUP_NAME
```

### spring.config.import

In Spring Cloud Alibaba 2025.x, you **must** use `spring.config.import` to import Nacos configurations. The 2025.1.x version has officially deprecated Spring Cloud Bootstrap, and no longer supports connecting to Nacos via `bootstrap.yml` / `bootstrap.properties`.

Configuration example:

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
      - optional:nacos:test.yml # monitor DEFAULT_GROUP:test.yml
      - optional:nacos:test01.yml?group=group_01 # Override the default group, monitor group_01:test01.yml
      - optional:nacos:test02.yml?group=group_02&refreshEnabled=false # Do not enable dynamic refresh
      - nacos:test03.yml # It will fail quickly when pulling nacos configuration exceptions, which will cause the spring container to fail to start
```

Notes:

1. If `spring-cloud-starter-alibaba-nacos-config` is introduced, the project will automatically detect whether a nacos entry has been imported via `spring.config.import` at startup. If not, the following error will appear:

   ```text
   The spring.config.import property is missing a nacos: entry

   Action:

   Add a spring.config.import=nacos: property to your configuration.
   If configuration is not required add spring.config.import=optional:nacos: instead.
   To disable this check, set spring.cloud.nacos.config.import-check.enabled=false.
   ```

2. You can disable this check by setting `spring.cloud.nacos.config.import-check.enabled=false`, but this is not recommended as it helps detect redundant dependencies.

3. The 2025.1.x version no longer supports `bootstrap.yml` / `bootstrap.properties`. Do not use them. While the 2025.0.x version still provides compatibility, using `spring.config.import` is also recommended.

### Nacos Health Check

Spring Cloud Alibaba provides two Nacos health check indicators, for **Nacos Config** and **Nacos Discovery** respectively. They detect the connection status with the Nacos server by calling the `getServerStatus()` method of the Nacos client, and report the result to Spring Boot Actuator's `/actuator/health` endpoint.

**Both are disabled by default** and need to be explicitly enabled.

#### How to Enable

**Nacos Config Health Check:**

```yaml
# application.yml
spring:
  nacos:
    config:
      health-indicator:
        enabled: true
```

**Nacos Discovery Health Check:**

```yaml
# application.yml
spring:
  cloud:
    nacos:
      discovery:
        health-indicator:
          enabled: true
```

Once enabled, the `/actuator/health` endpoint will include the Nacos connection status. The status is `UP` when the Nacos server is reachable, and `DOWN` when it is not.


#### Warning: Do Not Enable When `/actuator` Is Configured as a Kubernetes Liveness Probe

After enabling Nacos health checks, if the application has `/actuator/health` endpoint configured as a Kubernetes **Liveness Probe**, any fluctuation or failure in the connection between the application and the Nacos server (e.g., network jitter) will cause `/actuator/health` to report `DOWN`. **This will incorrectly trigger Kubernetes to restart the Pod, even if the application's business logic is perfectly normal**. In large-scale clusters, network jitter could cause a large number of Pods to be restarted simultaneously, potentially triggering a **cascading failure**.

If you are not familiar with Kubernetes probe mechanisms, **it is strongly recommended to keep the default configuration (disabled) and not enable Nacos health checks**.

### Configuration items

More configuration items for Nacos Config Starter are as follows:

| Configuration item                                | key                                       | Default value              | Description                                                                                                                                                                          |
| ------------------------------------------------- | ----------------------------------------- | -------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Server address                                    | spring.cloud.nacos.config.server-addr     |                            | ip address and port number of the server                                                                                                                                             |
| DataId prefix                                     | spring.cloud.nacos.config.prefix          | ${spring.application.name} | The prefix of the DataId. The default value is the application name                                                                                                                  |
| Group                                             | spring.cloud.nacos.config.group           | DEFAULT_GROUP              |
| DataId suffix and content file format             | spring.cloud.nacos.config.file-extension  | properties                 | The DataId suffix, which is also the configuration content file format, currently supports only properties                                                                           |
| Configure the encoding mode of the content        | spring.cloud.nacos.config.encode          | UTF-8                      | Configured coding                                                                                                                                                                    |
| Gets the configured timeout period                | spring.cloud.nacos.config.timeout         | 3000                       | Unit: ms                                                                                                                                                                             |
| The configured namespace                          | spring.cloud.nacos.config.namespace       |                            | One common scenario is the separation and isolation of different environments, such as resource isolation between the development and test environments and production environments. |
| AccessKey                                         | spring.cloud.nacos.config.access-key      |                            |
| SecretKey                                         | spring.cloud.nacos.config.secret-key      |                            |
| Relative path                                     | spring.cloud.nacos.config.context-path    |                            | The relative path of the server API                                                                                                                                                  |
| Access point                                      | spring.cloud.nacos.config.endpoint        |                            | Domain name of a service in a region. Through this domain name, the server address can be dynamically obtained                                                                       |
| Whether to enable listening and automatic refresh | spring.cloud.nacos.config.refresh-enabled | true                       |
| Cluster service name                              | spring.cloud.nacos.config.cluster-name    |                            |

### Endpoint information

Request http://127.0.0.1:18084/actuator/nacosconfig address, you can see related EndPoint node information:

```shell
$ curl http://127.0.0.1:18084/actuator/nacosconfig
```

Response:

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

## Nacos Service Registration and Discovery Advanced Guide

### Principle

Spring Cloud Nacos Discovery complies with Spring Cloud Common standards and implements three interfaces: AutoServiceRegistration, ServiceRegistry and Registration.

In Spring Cloud application startup phase, monitor the WebServerInitializedEvent event, when the Web container initialization complete, namely receive WebServerInitializedEvent incident, will trigger action, register the service with Nacos Server by calling the register method of ServiceRegistry.

### IPv4 to IPv6 address migration scheme

#### Dual registration of IPv4 and IPv6 addresses

After Spring Cloud Loadbalancer is configured as a load balancing policy, IPv4 and IPv6 addresses of micro-services are registered with the registry by default after the application starts. IPv4 addresses are stored under the IP field in the Nacos service list. IPv6 address In the metadata field of Nacos, the corresponding Key is IPv6. When a service consumer invokes a service provider, it selects the appropriate IP address type to initiate the service invocation based on its own IP address stack support.

Specific rules:

1. If the service consumer supports dual IPv4 and IPv6 address stacks or only supports IPv6 address stacks, the service consumer will use the IPv6 address provided by the service to initiate service invocation. If the IPv6 address invocation fails, the service consumer cannot switch to IPv4 address stacks and initiate retry invocation.
2. If the service consumer supports only IPv4 single-address stack, the service consumer invokes the service using the IPv4 address provided by the service.

#### Only IPv4 is registered

If you only want to register using IPv4 addresses, you can use the following configuration in application.properties:

```properties
spring.cloud.nacos.discovery.ip-type=IPv4
```

#### Only IPv6 is registered

If you only want to use IPv6 addresses, you can use the following configuration in application.properties:

```properties
spring.cloud.nacos.discovery.ip-type=IPv6
```

### Configuration items

For more information about the starter configuration items of spring-cloud-starter-alibaba-nacos-discovery, see the following:

| Configuration item                | key                                            | Default value              | Description                                                                                                                                                                                                                                                       |
| --------------------------------- | ---------------------------------------------- | -------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Server address                    | spring.cloud.nacos.discovery.server-addr       |                            |
| Service name                      | spring.cloud.nacos.discovery.service           | ${spring.application.name} | The name of the service registered with Nacos, which defaults to the application name                                                                                                                                                                             |
| Weight                            | spring.cloud.nacos.discovery.weight            | 1                          | The value ranges from 1 to 100. A larger value indicates a larger weight                                                                                                                                                                                          |
| Nic name                          | spring.cloud.nacos.discovery.network-interface |                            | If no IP address is configured, the registered IP address is the IP address of the NIC. If this parameter is not configured, the IP address of the first NIC is used by default                                                                                   |
| Registered IP address             | spring.cloud.nacos.discovery.ip                |                            | Highest priority                                                                                                                                                                                                                                                  |
| Type of the registered IP address | spring.cloud.nacos.discovery.ip-type           | Double-stack address       | You can configure the IPv4 and IPv6 two types, if the network card IP address multiple same type, hope to develop a specific network segment address, can use `spring. Cloud. Inetutils. Preferred - networks` address configuration screen                       |
| Registered port                   | spring.cloud.nacos.discovery.port              | -1                         | By default, you do not need to configure this parameter                                                                                                                                                                                                           |
| namespace                         | spring.cloud.nacos.discovery.namespace         |                            | One of the most common scenarios is the separation and isolation of the registration of different environments, such as the isolation of resources (such as configurations and services) between the development test environment and the production environment. |
| AccessKey                         | spring.cloud.nacos.discovery.access-key        |                            |
| SecretKey                         | spring.cloud.nacos.discovery.secret-key        |                            |
| Metadata                          | spring.cloud.nacos.discovery.metadata          |                            | The configuration is in Map format                                                                                                                                                                                                                                |
| Log file name                     | spring.cloud.nacos.discovery.log-name          |                            |
| cluster                           | spring.cloud.nacos.discovery.cluster-name      | DEFAULT                    | Nacos Cluster name                                                                                                                                                                                                                                                |
| Access point                      | spring.cloud.nacos.discovery.endpoint          |                            | Domain name of a service in a region. Through this domain name, the server address can be dynamically obtained                                                                                                                                                    |
| Whether to integrate LoadBalancer | spring.cloud.loadbalancer.nacos.enabled        | false                      |
| Whether to enable Nacos Watch     | spring.cloud.nacos.discovery.watch.enabled     | false                      | You can set it to true to enable watch                                                                                                                                                                                                                            |
| Whether to enable Nacos           | spring.cloud.nacos.discovery.register-enabled           | true                       | Start by default. If set to false, automatic registration with Nacos is disabled                                                                                                                                                                                  |

### Endpoint Information

Request http://127.0.0.1:18083/actuator/nacosdiscovery Address，You can view information about the EndPoint node

```shell
$ curl http://127.0.0.1:18083/actuator/nacosdiscovery
```

Response:

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
