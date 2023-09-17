---
title: 快速开始
keywords: [Spring Cloud Alibaba]
description: Traffic Management.
---

# 快速开始

本节主要演示如何使用 `spring-cloud-starter-alibaba-governance-routing` 模块完成标签路由功能：

## 组件支持说明

目前，路由模块只支持了部分组件：

远程调用组件：Spring Cloud OpenFeign

负载均衡组件：Ribbon

未来会支持更多的比如 RestTemplate，Spring Cloud LoadBalancer 等组件。

## 示例

### 如何接入

**注意 本章节只是为了便于您理解接入方式，本示例代码中已经完成接入工作，您无需再进行修改。**

1. 首先，修改需要进行路由服务的 pom.xml 文件，引入 `spring-cloud-starter-alibaba-governance-routing` 依赖。

```xml
<dependency>
  <groupId>com.alibaba.cloud</groupId>
  <artifactId>spring-cloud-starter-alibaba-governance-routing</artifactId>
</dependency>
```

2. 配置当没有路由规则时的负载均衡算法（以随机负载均衡算法为例）如果没有配置，使用 Ribbon 默认的负载均衡算法 ZoneAvoidanceRule

```
spring.cloud.governance.routing.rule=RandomRule
```

### 应用启动

启动以下三个模块的启动类，分别为 ConsumerApplication ，两个 ProviderApplication ，将其注入到 Nacos 注册中心中。

### 效果演示

#### 规则说明

实例中设置的规则如下：

```java
@GetMapping("/add")
public void getDataFromControlPlaneTest() {
    List<RouteRule> routeRules = new ArrayList<>();
    List<MatchService> matchServices = new ArrayList<>();
    UnifiedRouteDataStructure unifiedRouteDataStructure = new UntiedRouteDataStructure();
    unifiedRouteDataStructure.setTargetService("service-provider");
    LabelRouteRule labelRouteData = new LabelRouteRule();
    labelRouteData.setDefaultRouteVersion("v1");
    RouteRule routeRule = new HeaderRule();
    routeRule.setType("header");
    routeRule.setCondition("=");
    routeRule.setKey("tag");
    routeRule.setValue("v2");
    RouteRule routeRule1 = new UrlRule.Parameter();
    routeRule1.setType("parameter");
    routeRule1.setCondition(">");
    routeRule1.setKey("id");
    routeRule1.setValue("10");
    RouteRule routeRule2 = new UrlRule.Path();
    routeRule2.setType("path");
    routeRule2.setCondition("=");
    routeRule2.setValue("/router-test");
    routeRules.add(routeRule);
    routeRules.add(routeRule1);
    routeRules.add(routeRule2);
    MatchService matchService = new MatchService();
    matchService.setVersion("v2");
    matchService.setWeight(100);
    matchService.setRuleList(routeRules);
    matchServices.add(matchService);
    labelRouteData.setMatchRouteList(matchServices);
    unifiedRouteDataStructure.setLabelRouteRule(labelRouteData);
    List<UntiedRouteDataStructure> unifiedRouteDataStructureList = new ArrayList<>();
    unifiedRouteDataStructureList.add(unifiedRouteDataStructure);
    controlPlaneConnection.pushRouteData(unifiedRouteDataStructureList);
}
```

代码对应的规则如下：

若同时满足请求参数中含有 `tag=v2` ，请求头中含有 id 且值小于 10，uri 为 `/router-test` 则流量全部路由到 v2 版本中，若有一条不满足，则流量路由到 v1 版本中。

规则也支持动态修改，测试动态修改的规则如下：

```java
@GetMapping("/add")
public void getDataFromControlPlaneTest() {
     List<RouteRule> routeRules = new ArrayList<>();
     List<MatchService> matchServices = new ArrayList<>();
     UntiedRouteDataStructure unifiedRouteDataStructure = new UntiedRouteDataStructure();
     unifiedRouteDataStructure.setTargetService("service-provider");
     LabelRouteRule labelRouteData = new LabelRouteRule();
     labelRouteData.setDefaultRouteVersion("v1");

     RouteRule routeRule = new HeaderRule();
     routeRule.setType("header");
     routeRule.setCondition("=");
     routeRule.setKey("tag");
     routeRule.setValue("v2");
     RouteRule routeRule1 = new UrlRule.Parameter();
     routeRule1.setType("parameter");
     routeRule1.setCondition(">");
     routeRule1.setKey("id");
     routeRule1.setValue("10");

     RouteRule routeRule2 = new UrlRule.Path();
     routeRule2.setType("path");
     routeRule2.setCondition("=");
     routeRule2.setValue("/router-test");
     routeRules.add(routeRule);
     routeRules.add(routeRule1);
     routeRules.add(routeRule2);

     MatchService matchService = new MatchService();
     matchService.setVersion("v2");
     matchService.setWeight(50);
     matchService.setRuleList(routeRules);
     matchServices.add(matchService);
     labelRouteData.setMatchRouteList(matchServices);
     unifiedRouteDataStructure.setLabelRouteRule(labelRouteData);
     List<UntiedRouteDataStructure> unifiedRouteDataStructureList = new ArrayList<>();
     unifiedRouteDataStructureList.add(unifiedRouteDataStructure);
     controlPlaneConnection.pushRouteData(unifiedRouteDataStructureList);
}
```

代码对应的规则如下：

若同时满足请求参数中含有 `tag=v2`，请求头中含有 id 且值小于 10，uri 为 `/router-test`，则 50%流量路由到 v2 版本中，剩下的流量路由到 v1 版本中，若有一条不满足，则流量路由到 v1 版本中。

##### 演示步骤

1. 访问 http://localhost:18083/add 将路由规则由控制面接口推入路由规则仓库中。
   访问 http://localhost:18083/router-test 不满足路由规则，路由到 v1 版本中，v1 版本实例打印返回如下结果：

   ```shell
   Route in 30.221.132.228: 18081,version is v1.
   ```

   访问 http://localhost:18083/router-test?id=11 且请求头设置 tag 值为 v2 满足路由规则，路由到 v2 版本中，v2 版本实例打印返回如下结果：

   ```shell
   Route in 30.221.132.228: 18082,version is v2.
   ```

2. 访问 http://localhost:18083/update 模拟动态修改路由规则。
   访问 http://localhost:18083/router-test 不满足路由规则，路由到 v1 版本中，v1 版本实例打印返回如下结果：

   ```shell
   Route in 30.221.132.228: 18081,version is v1.
   ```

   访问 http://localhost:18083/router-test?id=11 且请求头设置 tag 值为 v2 满足路由规则，50%
   路由到 v2 版本中，v2 版本实例打印返回如下结果：

   ```shell
   Route in 30.221.132.228: 18082,version is v2.
   ```

   50% 路由到 v1 版本中，v1 版本实例打印返回如下结果：

   ```shell
   Route in 30.221.132.228: 18081,version is v1.
   ```

3. 如果不推送规则，走正常路由

## 集成 Istio

**注意 本章节只是为了便于您理解接入方式，本示例代码中已经完成接入工作，您无需再进行修改。**

### 安装 K8s 环境

请参考 K8s 的[安装工具](https://kubernetes.io/zh-cn/docs/tasks/tools/)小节。

### 在 K8s 上安装并启用 Istio

请参考 Istio 官方文档的[安装](https://istio.io/latest/zh/docs/setup/install/)小节。

### Istio 流量治理规则介绍

- [VirtualService](https://istio.io/latest/zh/docs/reference/config/networking/virtual-service/)
- [DestinationRule](https://istio.io/latest/zh/docs/reference/config/networking/destination-rule/)

### 配置

1. 首先，修改 pom.xml 文件，引入 `spring-cloud-starter-alibaba-governance-routing` 依赖。同时引入 Spring Cloud Alibaba 的 `spring-cloud-starter-xds-adapter` 模块

```xml
<dependency>
  <groupId>com.alibaba.cloud</groupId>
  <artifactId>spring-cloud-starter-alibaba-governance-routing</artifactId>
</dependency>
<dependency>
    <groupId>com.alibaba.cloud</groupId>
    <artifactId>spring-cloud-starter-xds-adapter</artifactId>
</dependency>
```

2. 在 `src/main/resources/application.yml` 配置文件中配置 Istio 控制面的相关信息:

```yml
server:
  port: 18084
spring:
  main:
    allow-bean-definition-overriding: true
  application:
    name: service-consumer
  cloud:
    nacos:
      discovery:
        server-addr: 127.0.0.1:8848
        fail-fast: true
        username: nacos
        password: nacos
    governance:
      auth:
        # 是否开启鉴权
        enabled: ${ISTIO_AUTH_ENABLE:false}
    istio:
      config:
        # 是否开启Istio配置转换
        enabled: ${ISTIO_CONFIG_ENABLE:true}
        # Istiod ip
        host: ${ISTIOD_ADDR:127.0.0.1}
        # Istiod 端口
        port: ${ISTIOD_PORT:15010}
        # 轮询Istio线程池大小
        polling-pool-size: ${POLLING_POOL_SIZE:10}
        # 轮询Istio时间间隔
        polling-time: ${POLLING_TIME:10}
        # Istiod鉴权token(访问Istiod 15012端口时可用)
        istiod-token: ${ISTIOD_TOKEN:}
        # 是否打印xds相关日志
        log-xds: ${LOG_XDS:true}
```

#### 应用启动

启动三个模块的启动类，分别为 IstioConsumerApplication，两个 ProviderApplication，将其注入到 Nacos 注册中心中。

#### 下发配置

通过 Istio 控制面下发标签路由规则，首先下发 DestinationRule 规则:

```yml
kubectl apply -f - << EOF
apiVersion: networking.istio.io/v1alpha3
kind: DestinationRule
metadata:
  name: my-destination-rule
spec:
  host: sca-virtual-service
  subsets:
  - name: v1
    labels:
      version: v1
  - name: v2
    labels:
      version: v2
EOF
```

此规则将后端服务拆分为两个版本，label 为 v1 的 pod 被分到 v1 版本，label 为 v2 的 pod 被分到 v2 版本
之后，下发 VirtualService 规则:

```yml
kubectl apply -f - << EOF
apiVersion: networking.istio.io/v1alpha3
kind: VirtualService
metadata:
  name: sca-virtual-service
spec:
  hosts:
    - service-provider
  http:
  - match:
    - headers:
        tag:
          exact: v2
      uri:
        exact: /istio-label-routing
    route:
    - destination:
        host: service-provider
        subset: v2
  - route:
    - destination:
        host: service-provider
        subset: v1
EOF
```

这条 VirtualService 指定了一条最简单的标签路由规则，将请求头 tag 为 v2 ，请求路径为 `/istio-label-routing` 的 HTTP 请求路由到 v2 版本，其余的流量都路由到 v1 版本:

#### 效果演示

发送一条不带请求头的 HTTP 请求至 IstioConsumerApplication:

```shell
$ curl --location --request GET '127.0.0.1:18084/istio-label-routing'
```

因为请求头不为 v2，所以请求将会被路由到 v1 版本，返回如下:

```shell
Route in 30.221.132.228: 18081,version is v1.
```

之后发送一条请求头 tag 为 v2，且请求路径为 `/istio-label-routing` 的 HTTP 请求:

```shell
$ curl --location --request GET '127.0.0.1:18084/istio-label-routing' --header 'tag: v2'
```

因为满足路由规则，所以请求会被路由至 v2 版本:

```shell
Route in 30.221.132.228: 18082,version is v2.
```

最后删除这条标签路由规则:

```shell
$ kubectl delete VirtualService sca-virtual-service
$ kubectl delete DestinationRule my-destination-rule
```

删除规则后，可以看到路由的策略将不由请求头的携带与否来决定，而是完全遵从于负载均衡器的实现。

### 集成 OpenSergo

**注意 本章节只是为了便于您理解接入方式，本示例代码中已经完成接入工作，您无需再进行修改。**

1. 首先，修改 pom.xml 文件，引入 `spring-cloud-starter-alibaba-governance-routing` 依赖。同时引入 Spring Cloud Alibaba 的 `spring-cloud-starter-opensergo-adapter` 模块

```xml
<dependency>
  <groupId>com.alibaba.cloud</groupId>
  <artifactId>spring-cloud-starter-alibaba-governance-routing</artifactId>
</dependency>
<dependency>
  <groupId>com.alibaba.cloud</groupId>
  <artifactId>spring-cloud-starter-opensergo-adapter</artifactId>
</dependency>
```

2. 在 application.properties 配置文件中配置 OpenSergo 控制面的相关信息

```properties
# OpenSergo 控制面 endpoint
spring.cloud.opensergo.endpoint=127.0.0.1:10246
```

#### 应用启动

启动三个模块的启动类，分别为 OpenSergoConsumerApplication，两个 ProviderApplication，将其注入到 Nacos 注册中心中。

#### 下发配置

[启动 OpenSergo 控制面](https://opensergo.io/zh-cn/docs/quick-start/opensergo-control-plane/) ，并通过 OpenSergo 控制面下发流量路由规则。

```yml
kubectl apply -f - << EOF
apiVersion: traffic.opensergo.io/v1alpha1
kind: TrafficRouter
metadata:
  name: service-provider
  namespace: default
  labels:
    app: service-provider
spec:
  hosts:
    - service-provider
  http:
    - match:
        - headers:
            tag:
              exact: v2
      route:
        - destination:
            host: service-provider
            subset: v2
            fallback:
              host: service-provider
              subset: v1
    - route:
        - destination:
            host: service-provider
            subset: v1
EOF
```

这条[TrafficRouter](https://github.com/opensergo/opensergo-specification/blob/main/specification/zh-Hans/traffic-routing.md) 指定了一条最简单的流量路由规则，将请求头 tag 为 v2 的 HTTP 请求路由到 v2 版本，其余的流量都路由到 v1 版本。
如果 v2 版本没有对应的节点，则将流量 fallback 至 v1 版本。

### 效果演示

发送一条不带请求头的 HTTP 请求至 OpenSergoConsumerApplication

```shell
$ curl --location --request GET '127.0.0.1:18083/router-test'
```

因为请求头不为 v2 ，所以请求将会被路由到 v1 版本，返回如下

```shell
Route in 30.221.132.228: 18081,version is v1.
```

之后发送一条请求头 tag 为 v2 的 HTTP 请求

```shell
$ curl --location --request GET '127.0.0.1:18083/router-test' --header 'tag: v2'
```

因为满足路由规则，所以请求会被路由至 v2 版本

```shell
Route in 30.221.132.228: 18082,version is v2.
```

停止 v2 版本的 ProviderApplication 后，继续发送一条请求头 tag 为 v2 的 HTTP 请求

```shell
$ curl --location --request GET '127.0.0.1:18083/router-test' --header 'tag: v2'
```

因为 v2 版本没有服务提供者，因此流量被 fallback 至 v1 版本。

```shell
Route in 30.221.132.228: 18081,version is v1.
```
