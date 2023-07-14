---
title: "Advanced Guide"
keywords: [Spring Cloud Alibaba, Sentinel]
description: Advanced Guide, Sentinel.
---

## Sentinel Console
Sentinel provides out-of-the-box consoles:
![Sentinel Dashboard](https://github.com/alibaba/Sentinel/wiki/image/dashboard.png)

There are 3 steps to enable this feature:

### Get console

You can download the latest version of the console jar package from the [Release page](https://github.com/alibaba/Sentinel/releases).

You can also build Sentinel Console yourself from the latest version of the source code:

* Download [Dashboard](https://github.com/alibaba/Sentinel/tree/master/sentinel-dashboard) project.
* Package the code into a fat jar with the following command:

   ```shell
   $ mvn clean package
   ```

### Start the console

The Sentinel console is a standard Spring Boot application, just run the jar package in the Spring Boot way.

```shell
$ java -Dserver.port=8080 -Dcsp.sentinel.dashboard.server=localhost:8080 -Dproject.name=sentinel-dashboard -jar sentinel-dashboard.jar
```

If port 8080 conflicts, use -Dserver.port=new port to set it.

In the application configuration file, add the following console configuration information:

```YML
spring:
   cloud:
     sentinel:
       transport:
         port: 8719
         dashboard: localhost:8080
```

The spring.cloud.sentinel.transport.port port configuration here will start an Http Server on the machine corresponding to the application, which will interact with the Sentinel console. For example, if a current limiting rule is added to the Sentinel console, the rule data will be pushed to the Http Server for reception, and the Http Server will then register the rule in Sentinel.

For more usage and problems of Sentinel console, please refer to [Sentinel Console](https://github.com/alibaba/Sentinel/wiki/%E6%8E%A7%E5%88%B6%E5%8F%B0).

## Client support
The Sentinel-related Starter provided by Spring Cloud Alibaba provides adaptation support for mainstream client components such as OpenFeign and RestTemplate in the Spring Cloud ecosystem.

### OpenFeign
spring-cloud-starter-alibaba-sentinel is adapted to the [OpenFeign](https://github.com/OpenFeign/feign) component. If you want to use it, in addition to introducing the necessary Starter dependencies, you also need to enable sentinel's support for feign in the configuration file: feign.sentinel.enabled=true.

Here is a simple usage example of FeignClient:

```java
@FeignClient(name = "service-provider", fallback = EchoServiceFallback.class, configuration = FeignConfiguration.class)
public interface EchoService {
     @GetMapping(value = "/echo/{str}")
     String echo(@PathVariable("str") String str);
}

class FeignConfiguration {
     @Bean
     public EchoServiceFallback echoServiceFallback() {
         return new EchoServiceFallback();
     }
}

class EchoServiceFallback implements EchoService {
     @Override
     public String echo(@PathVariable("str") String str) {
         return "echo fallback";
     }
}
```

NOTE: The resource name policy definition in the interface corresponding to Feign: httpmethod:protocol://requesturl. All attributes in the @FeignClient annotation are compatible with Sentinel.

The name of the resource corresponding to the method echo in the EchoService interface is GET:http://service-provider/echo/{str}.


### RestTemplate
spring-cloud-starter-alibaba-sentinel supports using Sentinel to protect RestTemplate service calls. When constructing a RestTemplate bean, you need to add the @SentinelRestTemplate annotation.

```java
@Bean
@SentinelRestTemplate(blockHandler = "handleException", blockHandlerClass = ExceptionUtil.class)
public RestTemplate restTemplate() {
     return new RestTemplate();
}
```

The properties of the @SentinelRestTemplate annotation support the processing of current limiting (blockHandler, blockHandlerClass) and degradation (fallback, fallbackClass).

The method corresponding to the blockHandler or fallback attribute must be a static method in the corresponding blockHandlerClass or fallbackClass attribute.

The parameters and return value of this method are consistent with the org.springframework.http.client.ClientHttpRequestInterceptor#interceptor method, and the parameter has an additional BlockException parameter to obtain the exception caught by Sentinel.

For example, the method declaration corresponding to the handleException attribute of ExceptionUtil in the above @SentinelRestTemplate annotation is as follows:

```java
public class ExceptionUtil {
     public static ClientHttpResponse handleException(HttpRequest request, byte[] body, ClientHttpRequestExecution execution, BlockException exception) {
         ...
     }
}
```
NOTE: When the application starts, it will check whether the current limiting or downgrading method corresponding to the @SentinelRestTemplate annotation exists, and an exception will be thrown if it does not exist

The current limiting (blockHandler, blockHandlerClass) and downgrading (fallback, fallbackClass) attributes of the @SentinelRestTemplate annotation are not mandatory.

When the RestTemplate call is broken by Sentinel, it will return the RestTemplate request block by sentinel information, or you can write the corresponding method to process the returned information by yourself. SentinelClientHttpResponse is provided here for constructing return information.

The resource rules of Sentinel RestTemplate current limiting provide two granularities:

* httpmethod:schema://host:port/path: protocol, host, port and path

* httpmethod:schema://host:port: protocol, host and port

NOTE: Take the url https://www.taobao.com/test and use the GET method as an example. The corresponding resource names have two granularities, namely GET:https://www.taobao.com and GET:https://www.taobao.com/test.

## Dynamic data source support

SentinelProperties internally provides the datasource property of TreeMap type for configuring data source information.

For example, configure 4 data sources:

```properties
spring.cloud.sentinel.datasource.ds1.file.file=classpath: degraderule.json
spring.cloud.sentinel.datasource.ds1.file.rule-type=flow

#spring.cloud.sentinel.datasource.ds1.file.file=classpath: flowrule.json
#spring.cloud.sentinel.datasource.ds1.file.data-type=custom
#spring.cloud.sentinel.datasource.ds1.file.converter-class=org.springframework.cloud.alibaba.cloud.examples.JsonFlowRuleListConverter
#spring.cloud.sentinel.datasource.ds1.file.rule-type=flow

spring.cloud.sentinel.datasource.ds2.nacos.server-addr=127.0.0.1:8848
spring.cloud.sentinel.datasource.ds2.nacos.data-id=sentinel
spring.cloud.sentinel.datasource.ds2.nacos.group-id=DEFAULT_GROUP
spring.cloud.sentinel.datasource.ds2.nacos.data-type=json
spring.cloud.sentinel.datasource.ds2.nacos.rule-type=degrade

spring.cloud.sentinel.datasource.ds3.zk.path=/Sentinel-Demo/SYSTEM-CODE-DEMO-FLOW
spring.cloud.sentinel.datasource.ds3.zk.server-addr=localhost:2181
spring.cloud.sentinel.datasource.ds3.zk.rule-type=authority

spring.cloud.sentinel.datasource.ds4.apollo.namespace-name=application
spring.cloud.sentinel.datasource.ds4.apollo.flow-rules-key=sentinel
spring.cloud.sentinel.datasource.ds4.apollo.default-flow-rule-value=test
spring.cloud.sentinel.datasource.ds4.apollo.rule-type=param-flow
```

This configuration method refers to the configuration of Spring Cloud Stream Binder, which uses TreeMap for storage internally, and the comparator is String.CASE_INSENSITIVE_ORDER.

NOTE: d1, ds2, ds3, ds4 are the names of ReadableDataSource and can be freely written. The following file, zk, nacos, and apollo correspond to specific data sources. The configuration behind them is the respective configuration of these specific data sources.

Each data source has two common configuration items: data-type, converter-class and rule-type.

The data-type configuration item indicates the Converter type. Spring Cloud Alibaba Sentinel provides two built-in values by default, namely json and xml (if not filled, the default is json). If you don't want to use the built-in json or xml Converter, you can fill in custom to represent the custom Converter, and then configure the converter-class configuration item, which needs to write the full path name of the class (such as spring.cloud.sentinel.datasource. ds1.file.converter-class=org.springframework.cloud.alibaba.cloud.examples.JsonFlowRuleListConverter).

The rule-type configuration indicates which type of rules the rules in the data source belong to (flow, degrade, authority, system, param-flow, gw-flow, gw-api-group).

NOTE: When a data source rule information fails to load, it will not affect the startup of the application, and an error message will be printed in the log.

NOTE: By default, xml format is not supported. It will take effect automatically after adding jackson-dataformat-xml dependency.

For the implementation principle of Sentinel dynamic data source, refer to: [Dynamic rule extension](https://github.com/alibaba/Sentinel/wiki/%E5%8A%A8%E6%80%81%E8%A7%84% E5%88%99%E6%89%A9%E5%B1%95).

## Spring Cloud Gateway support

Refer to [Sentinel Gateway Current Limiting](https://github.com/alibaba/Sentinel/wiki/%E7%BD%91%E5%85%B3%E9%99%90%E6%B5%81).

If you want to use it with Sentinel Starter, you need to add the spring-cloud-alibaba-sentinel-gateway dependency, and you need to add the spring-cloud-starter-gateway dependency to make the Spring Cloud Gateway in the spring-cloud-alibaba-sentinel-gateway module The automatic configuration class takes effect:

```xml
<dependency>
     <groupId>com.alibaba.cloud</groupId>
     <artifactId>spring-cloud-starter-alibaba-sentinel</artifactId>
</dependency>
<dependency>
     <groupId>com.alibaba.cloud</groupId>
     <artifactId>spring-cloud-alibaba-sentinel-gateway</artifactId>
</dependency>
<dependency>
     <groupId>org.springframework.cloud</groupId>
     <artifactId>spring-cloud-starter-gateway</artifactId>
</dependency>
```

## Externally exposed Endpoint

Sentinel provides an Endpoint internally, and the corresponding endpoint id is sentinel.

The json exposed by Endpoint contains various properties:

1. appName: application name
2. logDir: the directory where the log is located
3. logUsePid: whether to carry the process id in the log file name
4. blockPage: The page to be redirected after the current limiting block
5. metricsFileSize: The size of the metrics file
6. metricsFileCharset: the character set corresponding to the metrics file
7. totalMetricsFileCount: the maximum number of files retained by metrics
8. consoleServer: sentinel dashboard address
9. clientIp: client ip
10. heartbeatIntervalMs: heartbeat interval between client and dashboard
11. clientPort: The port that the client needs to expose to interact with the dashboard
12. coldFactor: cold start factor
13. filter: CommonFilter related attributes, such as order, urlPatterns and enable
14. datasource: the data source information configured by the client
15. rules: rules that take effect on the client side, including flowRules, degradeRules, systemRules, authorityRule, paramFlowRule

Here is an example of json exposed by Endpoint:


```json
{
  "blockPage": null,
  "appName": "sentinel-example",
  "consoleServer": "localhost:8080",
  "coldFactor": "3",
  "rules": {
    "flowRules": [{
      "resource": "GET:http://www.taobao.com",
      "limitApp": "default",
      "grade": 1,
      "count": 0.0,
      "strategy": 0,
      "refResource": null,
      "controlBehavior": 0,
      "warmUpPeriodSec": 10,
      "maxQueueingTimeMs": 500,
      "clusterMode": false,
      "clusterConfig": null
    }, {
      "resource": "/test",
      "limitApp": "default",
      "grade": 1,
      "count": 0.0,
      "strategy": 0,
      "refResource": null,
      "controlBehavior": 0,
      "warmUpPeriodSec": 10,
      "maxQueueingTimeMs": 500,
      "clusterMode": false,
      "clusterConfig": null
    }, {
      "resource": "/hello",
      "limitApp": "default",
      "grade": 1,
      "count": 1.0,
      "strategy": 0,
      "refResource": null,
      "controlBehavior": 0,
      "warmUpPeriodSec": 10,
      "maxQueueingTimeMs": 500,
      "clusterMode": false,
      "clusterConfig": null
    }]
  },
  "metricsFileCharset": "UTF-8",
  "filter": {
    "order": -2147483648,
    "urlPatterns": ["/*"],
    "enabled": true
  },
  "totalMetricsFileCount": 6,
  "datasource": {
    "ds1": {
      "file": {
        "dataType": "json",
        "ruleType": "FLOW",
        "converterClass": null,
        "file": "...",
        "charset": "utf-8",
        "recommendRefreshMs": 3000,
        "bufSize": 1048576
      },
      "nacos": null,
      "zk": null,
      "apollo": null,
      "redis": null
    }
  },
  "clientIp": "30.5.121.91",
  "clientPort": "8719",
  "logUsePid": false,
  "metricsFileSize": 52428800,
  "logDir": "...",
  "heartbeatIntervalMs": 10000
}
```

## More configuration items

The following table shows that when there is a corresponding bean type in the ApplicationContext of the application, automatic settings will be performed:

|Type of Bean |Operation |Function|
|---|---|---|
|UrlCleaner|WebCallbackManager.setUrlCleaner(urlCleaner)|Resource cleaning (resources (for example, all URLs satisfying /foo/:id are grouped under /foo/* resources))|
|UrlBlockHandler|WebCallbackManager.setUrlBlockHandler(urlBlockHandler)|Custom flow limit processing logic|
|RequestOriginParser|WebCallbackManager.setRequestOriginParser(requestOriginParser)|Set source information|

Spring Cloud Alibaba Sentinel provides these configuration options:

|Configuration Item | Meaning |Default Value|
|---|--------------------------------------------- -------------------------------------------------- -----|---|
|spring.application.name or project.name| Sentinel project name |
|spring.cloud.sentinel.enabled| Whether Sentinel automation configuration is effective |true|
|spring.cloud.sentinel.eager| Whether to trigger Sentinel initialization in advance |false|
|spring.cloud.sentinel.transport.port| The port through which the application interacts with the Sentinel console. The application will locally start a HttpServer occupied by this port |8719|
|spring.cloud.sentinel.transport.dashboard| Sentinel console address |
|spring.cloud.sentinel.transport.heartbeat-interval-ms| Heartbeat interval between application and Sentinel console |
|spring.cloud.sentinel.transport.client-ip| The client IP of this configuration will be registered to the Sentinel Server |
|spring.cloud.sentinel.filter.order| Loading order of Servlet Filter. Inside the Starter, this filter |Integer.MIN_VALUE| will be constructed
|spring.cloud.sentinel.filter.url-patterns| The data type is an array. Represents the url pattern collection of Servlet Filter |/*|
|spring.cloud.sentinel.filter.enabled| Enable to instance CommonFilter |true|
|spring.cloud.sentinel.metric.charset| metric file character set |UTF-8|
|spring.cloud.sentinel.metric.file-single-size| Sentinel metric single file size ||
|spring.cloud.sentinel.metric.file-total-count| Sentinel metric total file count ||
|spring.cloud.sentinel.log.dir| Directory where Sentinel log files are located |
|spring.cloud.sentinel.log.switch-pid| Whether the Sentinel log file name needs to carry the pid |false|
|spring.cloud.sentinel.servlet.block-page| Custom jump URL, when the request is limited, it will automatically jump to the set URL ||
|spring.cloud.sentinel.flow.cold-factor| [cold start factor](https://github.com/alibaba/Sentinel/wiki/%E9%99%90%E6%B5%81---%E5 %86%B7%E5%90%AF%E5%8A%A8) ||
|spring.cloud.sentinel.scg.fallback.mode| Response mode after Spring Cloud Gateway fuse (choose redirect or response) ||
|spring.cloud.sentinel.scg.fallback.redirect| The response mode of Spring Cloud Gateway is the redirection URL corresponding to the redirect mode ||
|spring.cloud.sentinel.scg.fallback.response-body| The response mode of Spring Cloud Gateway is the response content corresponding to the response mode ||
|spring.cloud.sentinel.scg.fallback.response-status| The response mode of Spring Cloud Gateway is the response code corresponding to the response mode | 429|
|spring.cloud.sentinel.scg.fallback.content-type| The response mode of Spring Cloud Gateway is the content-type corresponding to the response mode | application/json|


NOTE: Please be careful. These configurations will only take effect in the Servlet environment, and neither RestTemplate nor OpenFeign will take effect for these configurations.