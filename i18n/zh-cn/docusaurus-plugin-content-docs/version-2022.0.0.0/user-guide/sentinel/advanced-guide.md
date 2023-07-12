---
title: 进阶指南
keywords: [Spring Cloud Alibaba]
description: sentinel.
---

## Sentinel 控制台
Sentinel 提供了开箱即用的控制台：
![Sentinel Dashboard](https://github.com/alibaba/Sentinel/wiki/image/dashboard.png)

开启该功能需要3个步骤：

### 获取控制台

您可以从 [Release 页面](https://github.com/alibaba/Sentinel/releases) 下载最新版本的控制台 jar 包。

您也可以从最新版本的源码自行构建 Sentinel 控制台：

* 下载 [控制台](https://github.com/alibaba/Sentinel/tree/master/sentinel-dashboard) 工程。
* 使用以下命令将代码打包成一个 fat jar: 

```shell
$ mvn clean package
```

### 启动控制台

Sentinel 控制台是一个标准的 Spring Boot 应用，以 Spring Boot 的方式运行 jar 包即可。

```shell
$ java -Dserver.port=8080 -Dcsp.sentinel.dashboard.server=localhost:8080 -Dproject.name=sentinel-dashboard -jar sentinel-dashboard.jar
```

如若8080端口冲突，可使用 `-Dserver.port=新端口` 进行设置。

在应用的配置文件中，增加如下控制台配置信息：

```YML
spring:
  cloud:
    sentinel:
      transport:
        port: 8719
        dashboard: localhost:8080
```

这里的 `spring.cloud.sentinel.transport.port` 端口配置会在应用对应的机器上启动一个 Http Server，该 Server 会与 Sentinel 控制台做交互。比如 Sentinel 控制台添加了1个限流规则，会把规则数据 push 给这个 Http Server 接收，Http Server 再将规则注册到 Sentinel 中。

更多 Sentinel 控制台的使用及问题参考 [Sentinel控制台](https://github.com/alibaba/Sentinel/wiki/%E6%8E%A7%E5%88%B6%E5%8F%B0)。

## 客户端支持
Spring Cloud Alibaba 提供的 Sentinel 有关 Starter 提供了对 Spring Cloud 生态中如 OpenFeign、RestTemplate 等主流的客户端组件的适配支持。

### OpenFeign
spring-cloud-starter-alibaba-sentinel 适配了 [OpenFeign](https://github.com/OpenFeign/feign) 组件。如果想使用，除了引入必要的 Starter 依赖外还需要在配置文件打开 sentinel 对 feign 的支持：`feign.sentinel.enabled=true`。

这是一个 `FeignClient` 的简单使用示例：

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

NOTE: Feign 对应的接口中的资源名策略定义：httpmethod:protocol://requesturl。`@FeignClient` 注解中的所有属性，Sentinel 都做了兼容。

`EchoService` 接口中方法 `echo` 对应的资源名为 `GET:http://service-provider/echo/{str}`。


### RestTemplate
spring-cloud-starter-alibaba-sentinel 支持对 `RestTemplate` 的服务调用使用 Sentinel 进行保护，在构造 `RestTemplate` bean的时候需要加上 `@SentinelRestTemplate` 注解。

```java
@Bean
@SentinelRestTemplate(blockHandler = "handleException", blockHandlerClass = ExceptionUtil.class)
public RestTemplate restTemplate() {
    return new RestTemplate();
}
```

`@SentinelRestTemplate` 注解的属性支持限流(blockHandler, blockHandlerClass)和降级(fallback, fallbackClass)的处理。

其中 blockHandler 或 fallback 属性对应的方法必须是对应 blockHandlerClass 或 fallbackClass 属性中的静态方法。

该方法的参数跟返回值跟 org.springframework.http.client.ClientHttpRequestInterceptor#interceptor 方法一致，其中参数多出了一个 BlockException 参数用于获取 Sentinel 捕获的异常。

比如上述 `@SentinelRestTemplate` 注解中 ExceptionUtil 的 handleException 属性对应的方法声明如下：

```java
public class ExceptionUtil {
    public static ClientHttpResponse handleException(HttpRequest request, byte[] body, ClientHttpRequestExecution execution, BlockException exception) {
        ...
    }
}
```

NOTE: 应用启动的时候会检查 `@SentinelRestTemplate` 注解对应的限流或降级方法是否存在，如不存在会抛出异常

`@SentinelRestTemplate` 注解的限流(blockHandler, blockHandlerClass)和降级(fallback, fallbackClass)属性不强制填写。

当使用 `RestTemplate` 调用被 Sentinel 熔断后，会返回 `RestTemplate request block by sentinel` 信息，或者也可以编写对应的方法自行处理返回信息。这里提供了 `SentinelClientHttpResponse` 用于构造返回信息。

Sentinel RestTemplate 限流的资源规则提供两种粒度：

* `httpmethod:schema://host:port/path`：协议、主机、端口和路径

* `httpmethod:schema://host:port`：协议、主机和端口

NOTE: 以 `https://www.taobao.com/test` 这个 url 并使用 GET 方法为例。对应的资源名有两种粒度，分别是 `GET:https://www.taobao.com` 以及 `GET:https://www.taobao.com/test`。

## 动态数据源支持

`SentinelProperties` 内部提供了 `TreeMap` 类型的 `datasource` 属性用于配置数据源信息。

比如配置 4 个数据源：

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

spring.cloud.sentinel.datasource.ds3.zk.path = /Sentinel-Demo/SYSTEM-CODE-DEMO-FLOW
spring.cloud.sentinel.datasource.ds3.zk.server-addr = localhost:2181
spring.cloud.sentinel.datasource.ds3.zk.rule-type=authority

spring.cloud.sentinel.datasource.ds4.apollo.namespace-name = application
spring.cloud.sentinel.datasource.ds4.apollo.flow-rules-key = sentinel
spring.cloud.sentinel.datasource.ds4.apollo.default-flow-rule-value = test
spring.cloud.sentinel.datasource.ds4.apollo.rule-type=param-flow
```

这种配置方式参考了 Spring Cloud Stream Binder 的配置，内部使用了 `TreeMap` 进行存储，comparator 为 `String.CASE_INSENSITIVE_ORDER` 。

NOTE: d1, ds2, ds3, ds4 是 `ReadableDataSource` 的名字，可随意编写。后面的 `file` ，`zk` ，`nacos` , `apollo` 就是对应具体的数据源。 它们后面的配置就是这些具体数据源各自的配置。

每种数据源都有两个共同的配置项： `data-type`、 `converter-class` 以及 `rule-type`。

`data-type` 配置项表示 `Converter` 类型，Spring Cloud Alibaba Sentinel 默认提供两种内置的值，分别是 `json` 和 `xml` (不填默认是json)。 如果不想使用内置的 `json` 或 `xml` 这两种 `Converter`，可以填写 `custom` 表示自定义 `Converter`，然后再配置 `converter-class` 配置项，该配置项需要写类的全路径名(比如 `spring.cloud.sentinel.datasource.ds1.file.converter-class=org.springframework.cloud.alibaba.cloud.examples.JsonFlowRuleListConverter`)。

`rule-type` 配置表示该数据源中的规则属于哪种类型的规则(`flow`，`degrade`，`authority`，`system`, `param-flow`, `gw-flow`, `gw-api-group`)。

NOTE: 当某个数据源规则信息加载失败的情况下，不会影响应用的启动，会在日志中打印出错误信息。

NOTE: 默认情况下，xml 格式是不支持的。需要添加 `jackson-dataformat-xml` 依赖后才会自动生效。

关于 Sentinel 动态数据源的实现原理，参考： [动态规则扩展](https://github.com/alibaba/Sentinel/wiki/%E5%8A%A8%E6%80%81%E8%A7%84%E5%88%99%E6%89%A9%E5%B1%95)。

## Spring Cloud Gateway 支持

参考 [Sentinel 网关限流](https://github.com/alibaba/Sentinel/wiki/%E7%BD%91%E5%85%B3%E9%99%90%E6%B5%81)。

若想跟 Sentinel Starter 配合使用，需要加上 `spring-cloud-alibaba-sentinel-gateway` 依赖，同时需要添加 `spring-cloud-starter-gateway` 依赖来让 `spring-cloud-alibaba-sentinel-gateway` 模块里的 Spring Cloud Gateway 自动化配置类生效：

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

## 对外暴露的 Endpoint

Sentinel 内部提供了一个 Endpoint, 对应的 endpoint id 为 `sentinel`。

Endpoint 暴露的 json 中包含了多种属性:

1. appName: 应用名
2. logDir: 日志所在目录
3. logUsePid: 日志文件名是否带上进程id
4. blockPage: 限流 block 之后跳转的页面
5. metricsFileSize: metrics 文件的大小
6. metricsFileCharset: metrics 文件对应的字符集
7. totalMetricsFileCount: metrics 最多保留的文件数
8. consoleServer: sentinel dashboard 地址
9. clientIp: 客户端 ip
10. heartbeatIntervalMs: 客户端跟 dashboard 的心跳间隔时间
11. clientPort: 客户端需要暴露的端口跟 dashboard 进行交互
12. coldFactor: 冷启动因子
13. filter: CommonFilter 相关的属性， 比如 order, urlPatterns 以及 enable
14. datasource: 客户端配置的数据源信息
15. rules: 客户端生效的规则，内部含有 flowRules, degradeRules, systemRules, authorityRule, paramFlowRule

这是 Endpoint 暴露的 json 示例:

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

## 更多配置项

下表显示当应用的 `ApplicationContext` 中存在对应的Bean的类型时，会进行自动化设置：

|存在Bean的类型 |操作 |作用|
|---|---|---|
|UrlCleaner|WebCallbackManager.setUrlCleaner(urlCleaner)|资源清理(资源（比如将满足 /foo/:id 的 URL 都归到 /foo/* 资源下）)|
|UrlBlockHandler|WebCallbackManager.setUrlBlockHandler(urlBlockHandler)|自定义限流处理逻辑|
|RequestOriginParser|WebCallbackManager.setRequestOriginParser(requestOriginParser)|设置来源信息|

Spring Cloud Alibaba Sentinel 提供了这些配置选项：

|配置项 | 含义                                                                                                 |默认值|
|---|----------------------------------------------------------------------------------------------------|---|
|`spring.application.name` or `project.name`| Sentinel项目名                                                                                        |
|`spring.cloud.sentinel.enabled`| Sentinel自动化配置是否生效                                                                                  |true|
|`spring.cloud.sentinel.eager`| 是否提前触发 Sentinel 初始化                                                                                |false|
|`spring.cloud.sentinel.transport.port`| 应用与Sentinel控制台交互的端口，应用本地会起一个该端口占用的HttpServer                                                       |8719|
|`spring.cloud.sentinel.transport.dashboard`| Sentinel 控制台地址                                                                                     |
|`spring.cloud.sentinel.transport.heartbeat-interval-ms`| 应用与Sentinel控制台的心跳间隔时间                                                                              |
|`spring.cloud.sentinel.transport.client-ip`| 此配置的客户端IP将被注册到 Sentinel Server 端                                                                   |
|`spring.cloud.sentinel.filter.order`| Servlet Filter的加载顺序。Starter内部会构造这个filter                                                           |Integer.MIN_VALUE|
|`spring.cloud.sentinel.filter.url-patterns`| 数据类型是数组。表示Servlet Filter的url pattern集合                                                             |/*|
|`spring.cloud.sentinel.filter.enabled`| Enable to instance CommonFilter                                                                    |true|
|`spring.cloud.sentinel.metric.charset`| metric文件字符集                                                                                        |UTF-8|
|`spring.cloud.sentinel.metric.file-single-size`| Sentinel metric 单个文件的大小                                                                            ||
|`spring.cloud.sentinel.metric.file-total-count`| Sentinel metric 总文件数量                                                                              ||
|`spring.cloud.sentinel.log.dir`| Sentinel 日志文件所在的目录                                                                                 |
|`spring.cloud.sentinel.log.switch-pid`| Sentinel 日志文件名是否需要带上pid                                                                            |false|
|spring.cloud.sentinel.servlet.block-page| 自定义的跳转 URL，当请求被限流时会自动跳转至设定好的 URL                                                                   ||
|spring.cloud.sentinel.flow.cold-factor| [冷启动因子](https://github.com/alibaba/Sentinel/wiki/%E9%99%90%E6%B5%81---%E5%86%B7%E5%90%AF%E5%8A%A8) ||
|spring.cloud.sentinel.scg.fallback.mode| Spring Cloud Gateway 熔断后的响应模式(选择 `redirect` or `response`)                                         ||
|spring.cloud.sentinel.scg.fallback.redirect| Spring Cloud Gateway 响应模式为 `redirect` 模式对应的重定向 URL                                                 ||
|spring.cloud.sentinel.scg.fallback.response-body| Spring Cloud Gateway 响应模式为 `response` 模式对应的响应内容                                                    ||
|spring.cloud.sentinel.scg.fallback.response-status| Spring Cloud Gateway 响应模式为 `response` 模式对应的响应码                                                     | 429|
|spring.cloud.sentinel.scg.fallback.content-type| Spring Cloud Gateway 响应模式为 `response` 模式对应的 content-type                                           | application/json|


NOTE: 请注意。这些配置只有在 Servlet 环境下才会生效，RestTemplate 和 OpenFeign 针对这些配置都无法生效。