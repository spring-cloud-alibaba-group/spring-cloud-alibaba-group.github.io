---
title: "Advanced Guide"
keywords: [Spring Cloud Alibaba,Nacos]
description: Advanced,Nacos,Guide.
---

This chapter shows the advanced features and advanced usage of spring-cloud-starter-alibaba-nacos-config and spring-cloud-starter-alibaba-nacos-discovery.

## Nacos Configuration Center Advanced Guide

### profile granularity configration

spring-cloud-starter-alibaba-nacos-config When loading the service configuration:

Not only is the base configuration prefixed with dataId ${spring.application.name}.${file-extension:properties} loaded,

The base configuration with dataId of ${spring.application.name}-${profile}.${file-extension:properties} is also loaded.

In daily development, if you encounter different configurations in multiple environments, you can select different configurations through the ${spring.Profiles.active} configuration item provided by spring.

```properties
spring.profiles.active=develop
```

> Note:
>
> spring.profiles.active=develop

A new dataId on nacos is: basic configuration of nacos-config-develop.yaml, as shown below:

```properties
Data ID: nacos-config-develop.yaml
Group: DEFAULT_GROUP
configuratioon style: YAML
configuration content: current.env: develop-env
```

The code to start the Spring Boot application test is as follows:

```java
@SpringBootApplication
public class ProviderApplication {

    public static void main(String[] args) {
        ConfigurableApplicationContext applicationContext = SpringApplication.run(ProviderApplication.class, args);
        while(true) {
            String userName = applicationContext.getEnvironment().getProperty("user.name");
            String userAge = applicationContext.getEnvironment().getProperty("user.age");
            // Gets the currently deployed environment
            String currentEnv = applicationContext.getEnvironment().getProperty("current.env");
            System.err.println("in "+currentEnv+" enviroment; "+"user name :" + userName + "; age: " + userAge);
            TimeUnit.SECONDS.sleep(1);
        }
    }
}
```

The console output is as follows:

```markdown
in develop-env enviroment;  user name :nacos-config-yaml-update;  age: 68
The 2018-11-02 15:34:25. 33014-013 the INFO/Thread - 11 ConfigServletWebServerApplicationContext: Closing org.springframework.boot.web.servlet.context.AnnotationConfigServletWebServerApplicationContext@6f1c29b7:  startup date [Fri Nov 02 15:33:57 CST 2018];  parent: org.springframework.context.annotation.AnnotationConfigApplicationContext@63355449
```

If you need to switch to production, just change the ${spring.profiles.active} parameter configuration. As follows:

```properties
spring.profiles.active=product
```

At the same time, basic configuration of corresponding dataId needs to be added to Nacos in the production environment. For example, nacos in the generation environment adds a configuration with dataId of: nacos-config-product.yaml:

```properties
Data ID: nacos-config-develop.yaml
Group: DEFAULT_GROUP
configuratioon style: YAML
configuration content: current.env: develop-env
```

Start the test program, and the output is as follows:

```markdown
in product-env enviroment;  user name :nacos-config-yaml-update;  age: 68
The 2018-11-02 15:42:14. 33024-628 the INFO/Thread - 11 ConfigServletWebServerApplicationContext: Closing org.springframework.boot.web.servlet.context.AnnotationConfigServletWebServerApplicationContext@6aa8e115:  startup date [Fri Nov 02 15:42:03 CST 2018];  parent: org.springframework.context.annotation.AnnotationConfigApplicationContext@19bb07ed
```

> Note:
>
> In this case, we wrote spring.profilename.active=profilename to the configuration file, but in real project implementation, the value of this variable will vary depending on the environment. It is common practice at this point to specify its configuration via the spring.profes.active=profile parameter to achieve flexible switching between environments.

### User-defined namespace configurations

Inside Nacos there is the concept of [Namespace](https://nacos.io/zh-cn/docs/concepts.html):

> For tenant granularity configuration isolation. The same Group or Data ID can be configured in different namespaces. A common scenario of Namespace is to separate and isolate configurations of different environments. For example, isolation of resources (such as configurations and services) between the development and test environments and production environments.
> without explicitly specify ${spring.cloud.nacos.config.namespace} configuration, the default is used on Public nacos this namespace. If you want to use a custom defined namespace, you can use the following configuration:

```properties
spring.cloud.nacos.config.namespace=YOUR_NAMESPACE_ID
```

> NOTE:
>
> **This configuration must be placed in the bootstrap.properties file**. Besides spring.cloud.nacos.config.namespace. The value of the namespace is namespace corresponding id, id value can be > nacos console access. Do not select any other namespae when adding the configuration. Otherwise, the correct configuration will not be read.

### User-defined Group configuration

Without explicitly specify ${spring.cloud.nacos.config.group} configuration, use DEFAULT_GROUP by default. To customize your own Group, perform the following configurations:

```properties
spring.cloud.nacos.config.group=YOUR_GROUP_NAME
```

> NOTE:
>
> **This configuration must be placed in the bootstrap.properties file**. And the value of the Group when add configuration must and spring.cloud.nacos.config.group The Group's configuration values.

### The priority of the configuration

Nacos Config currently offers three configuration capabilities to pull relevant configurations from Nacos.

- A: through spring.cloud.nacos.config.shared-dataids support multiple Shared Data Id configuration;

- B: through spring.cloud.nacos.config.ext-config[n].data-id The data -id way to support multiple extended data id configuration;

- C: Automatically generates related Data ids based on internal rules (application name, application name + Profile).

When the three methods are used together, one of their priority relationships is: ***A < B < C***

### springc.config.import import

It is assumed here that there is a configuration file bootstrap.yml, how should it be configured after upgrading to a version above 2021.0.1.0?

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

**Note: The configuration above is equivalent to the configuration below!**

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
      - optional:nacos:test.yml  # monitor DEFAULT_GROUP:test.yml
      - optional:nacos:test01.yml?group=group_01 # Override the default group, monitor group_01:test01.yml
      - optional:nacos:test02.yml?group=group_02&refreshEnabled=false # Do not enable dynamic refresh
      - nacos:test03.yml # It will fail quickly when pulling nacos configuration exceptions, which will cause the spring container to fail to start
```

The precautions when using spring.config.import to introduce configuration are as follows:

1. If you use spring.config.import, you cannot use bootstrap.yml/properties to import configuration;
2. If spring-cloud-starter-alibaba-nacos-config is introduced, and the configuration is imported using the import method, it will automatically detect whether the nacos entry is introduced when the project starts. If there is no import nacos entry, the following error will appear:

  ```markdown
  The spring.config.import property is missing a nacos: entry

  Action:

  Add a spring.config.import=nacos: property to your configuration.
	If configuration is not required add spring.config.import=optional:nacos: instead.
	To disable this check, set spring.cloud.nacos.config.import-check.enabled=false.
  ```

  It can be turned off by manually setting spring.cloud.nacos.config.import-check.enabled=false, but this is not recommended. This feature can help you check whether redundant dependencies are introduced

If you want to keep the previous usage method (bootstrap introduces configuration), you only need to add the dependency spring-cloud-starter-bootstrap dependency, and you can complete the configuration switch without modifying a single line of code!

### Configuration items

More configuration items for Nacos Config Starter are as follows:

Configuration item|key|Default value|Description
----|----|-----|-----
Server address|spring.cloud.nacos.config.server-addr||ip address and port number of the server
DataId prefix|spring.cloud.nacos.config.prefix|${spring.application.name}|The prefix of the DataId. The default value is the application name
Group|spring.cloud.nacos.config.group|DEFAULT_GROUP|
DataId suffix and content file format|spring.cloud.nacos.config.file-extension|properties|The DataId suffix, which is also the configuration content file format, currently supports only properties
Configure the encoding mode of the content|spring.cloud.nacos.config.encode|UTF-8|Configured coding
Gets the configured timeout period|spring.cloud.nacos.config.timeout|3000|Unit: ms
The configured namespace|spring.cloud.nacos.config.namespace||One common scenario is the separation and isolation of different environments, such as resource isolation between the development and test environments and production environments.
AccessKey|spring.cloud.nacos.config.access-key||
SecretKey|spring.cloud.nacos.config.secret-key||
Relative path|spring.cloud.nacos.config.context-path||The relative path of the server API
Access point|spring.cloud.nacos.config.endpoint||Domain name of a service in a region. Through this domain name, the server address can be dynamically obtained
Whether to enable listening and automatic refresh|spring.cloud.nacos.config.refresh-enabled|true|
Cluster service name|spring.cloud.nacos.config.cluster-name||

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


Configuration item|key|Default value|Description
----|----|-----|-----
Server address|spring.cloud.nacos.discovery.server-addr||
Service name|spring.cloud.nacos.discovery.service|${spring.application.name}|The name of the service registered with Nacos, which defaults to the application name
Weight|spring.cloud.nacos.discovery.weight|1|The value ranges from 1 to 100. A larger value indicates a larger weight
Nic name|spring.cloud.nacos.discovery.network-interface||If no IP address is configured, the registered IP address is the IP address of the NIC. If this parameter is not configured, the IP address of the first NIC is used by default
Registered IP address|spring.cloud.nacos.discovery.ip||Highest priority
Type of the registered IP address|spring.cloud.nacos.discovery.ip-type|Double-stack address|You can configure the IPv4 and IPv6 two types, if the network card IP address multiple same type, hope to develop a specific network segment address, can use ` spring. Cloud. Inetutils. Preferred - networks ` address configuration screen
Registered port|spring.cloud.nacos.discovery.port|-1|By default, you do not need to configure this parameter
namespace|spring.cloud.nacos.discovery.namespace||One of the most common scenarios is the separation and isolation of the registration of different environments, such as the isolation of resources (such as configurations and services) between the development test environment and the production environment.
AccessKey|spring.cloud.nacos.discovery.access-key||
SecretKey|spring.cloud.nacos.discovery.secret-key||
Metadata|spring.cloud.nacos.discovery.metadata||The configuration is in Map format
Log file name|spring.cloud.nacos.discovery.log-name||
cluster|spring.cloud.nacos.discovery.cluster-name|DEFAULT|Nacos Cluster name
Access point|spring.cloud.nacos.discovery.endpoint||Domain name of a service in a region. Through this domain name, the server address can be dynamically obtained
Whether to integrate LoadBalancer|spring.cloud.loadbalancer.nacos.enabled|false|
Whether to enable Nacos Watch|spring.cloud.nacos.discovery.watch.enabled|false|You can set it to true to enable watch
Whether to enable Nacos|spring.cloud.nacos.discovery.enabled|true|Start by default. If set to false, automatic registration with Nacos is disabled


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