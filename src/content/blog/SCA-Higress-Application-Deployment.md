---
title: Spring Cloud Alibaba 应用灰度发布实践
keywords: [Higress, 网关, 灰度发布]
description: 介绍如何使用 Higress 来完成 Spring Cloud Alibaba 的应用发布
author: 赵炳堃（秉钧）
date: '2023-08-21'
category: ecosystem
---

## 摘要

Higress 是阿里巴巴开源的一款下一代云原生微服务网关。Higress 可以对接多种注册中心，包括 Nacos/Zookeeper/Eureka 等，能够无缝集成 Spring Cloud 应用，对 Dubbo/Sentinel/OpenSergo 等微服务生态也有着深度的集成。与此同时，Higress 采用 C++ 内核，相比于传统的 Java 网关来说性能更高，更稳定，对比 Spring Cloud Gateway 和 Zuul 来说，性能可以提升至 2-4 倍。另外，Higress 还天然兼容 K8s 的 Ingress/Gateway API 标准，是一款更符合云原生时代标准的微服务网关。

## Higress 无缝对接 Spring Cloud 应用发布实战

在现代软件架构逐渐走向微服务化、云原生化的过程中，应用的更新和迭代的频率变得越来越快，如何在尽可能保证用户体验不受影响的情况下完成应用的迭代发布就显得至关重要。目前业界普遍采用的几种典型的应用发布策略包括蓝绿发布、金丝雀发布、A/B Testing 发布等。接下来本文将介绍如何使用 Higress 来实现 Spring Cloud Alibaba 应用发布的最佳实践。

### 前提条件

1. 安装 Higress，并安装 Istio CRD，参考[Higress 安装部署文档](https://higress.io/zh-cn/docs/ops/deploy-by-helm/#%E6%94%AF%E6%8C%81-istio-crd%E5%8F%AF%E9%80%89)。
2. 安装 Naocs，参考[Nacos 安装部署文档](https://nacos.io/zh-cn/docs/v2/quickstart/quick-start.html)。

Higress 支持将 Nacos，Spring Cloud 应用部署于 K8s 集群内，或者独立于 K8s 进行部署。为了演示方便，本文将 Higress，Nacos，Spring Cloud 应用都部署在本地 K8s 集群。

### 通过 Higress 实现 Spring Cloud 应用的服务发现和路由

### 部署 Spring Cloud Alibaba 应用

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: spring-cloud-demo-v1
spec:
  replicas: 1
  selector:
    matchLabels:
      app: spring-cloud-demo
  template:
    metadata:
      labels:
        app: spring-cloud-demo
    spec:
      containers:
        - name: server
          image: higress-registry.cn-hangzhou.cr.aliyuncs.com/samples/spring-cloud-demo:v1
          imagePullPolicy: IfNotPresent
          env:
            # 注册到的nacos的地址
            - name: NACOS_REGISTRY_ADDRESS
              value: nacos-server.default.svc.cluster.local
            # 注册时携带的version元信息
            - name: SPRING_CLOUD_NACOS_DEMO_VERSION
              value: v1
```

我们在 k8s 集群中部署如上 Deployment，其中通过 NACOS_REGISTRY_ADDRESS 和 SPRING_CLOUD_NACOS_DEMO_VERSION 两个环境变量指定了 Nacos 的地址以及注册时携带的 version 元信息。Spring Cloud 应用的 application.properties 配置会读取这两个环境变量，如下所示：

```yaml
spring.cloud.nacos.discovery.server-addr=${NACOS_REGISTRY_ADDRESS}:8848
spring.cloud.nacos.discovery.metadata.version=${SPRING_CLOUD_NACOS_DEMO_VERSION}
```

### 配置服务来源

Higress 支持多种服务来源，包括 Nacos/Zookeeper/DNS/固定 IP，通过创建 Nacos 服务来源，Higress 就可以发现注册到 Nacos 上的服务，从而完成转发请求到这些服务上。
进入 Higress 控制台（[http://console.higress.io/](http://console.higress.io/)）,点击 **服务来源-创建服务来源 **以创建服务来源。这里选择 Nacos 2.X，然后填写注册中心的地址，端口，命名空间，服务分组等信息。注册中心的地址可以填写 ip 或者域名，本文将 Nacos 部署在本地 K8s 中，通过 K8s service 暴露 Nacos 端口，因此这里填写对应的 service 域名。
![image.png](/img/1728554001427.png)
配置好 Nacos 服务来源后，我们可以在**服务列表**中看到我们刚刚部署好的应用。
![image.png](/img/1728554001750.png)

### 创建域名和路由

在 Higress 控制台上点击**域名管理-创建域名**，创建一条 demo.springcloud.com 域名用于后续的访问。
![image.png](/img/1728554002090.png)
点击路由配置-创建路由，创建一条名为 demo 的路由，域名选择我们刚刚创建好的 demo.springcloud.com，目标服务选择我们在 1.2 中看到的 Spring Cloud 应用，path 配置为/version。
![image.png](/img/1728554002503.png)

### 请求验证

接下来我们就可以用配置好的路由来访问 Spring Cloud 应用了，在请求时需要将 demo.springcloud.com 域名解析到本地 ip，如下所示，可以成功得到返回结果。
![image.png](/img/1728554002730.png)
注：如果您将 Higress 的 80 和 443 端口通过 LoadBalancer 的方式暴露出来，这里需要将本地 ip 替换为对应 LoadBalancer 的 ip，详见[Higress 快速开始文档](https://higress.io/zh-cn/docs/user/quickstart#%E5%9C%BA%E6%99%AF%E4%B8%80%E5%9C%A8%E6%A0%87%E5%87%86-k8s-%E9%9B%86%E7%BE%A4%E4%B8%AD%E4%BD%BF%E7%94%A8)。

## 利用 Higress 进行蓝绿发布

在蓝绿发布中，有两套相同的运行环境，一套是当前正在使用的生产环境（蓝色环境），另一套是新版本的测试环境（绿色环境）。新版本的代码只在绿色环境中运行，测试通过后，直接将流量切换到绿色环境中，从而完成新版本的上线。与此同时蓝色环境作为热备环境，当绿色环境出现问题需要回滚时，也可以直接将流量全部再切换回蓝色环境。
![image.png](/img/1728554003006.png)
![image.png](/img/1728554003246.png)

### 部署新版本应用

在本地 K8s 集群中 apply 如下资源，以部署 v2 版本的 Spring Cloud 应用。

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: spring-cloud-demo-v2
spec:
  replicas: 1
  selector:
    matchLabels:
      app: spring-cloud-demo
  template:
    metadata:
      labels:
        app: spring-cloud-demo
    spec:
      containers:
        - name: server
          image: higress-registry.cn-hangzhou.cr.aliyuncs.com/samples/spring-cloud-demo:v2
          imagePullPolicy: IfNotPresent
          env:
            - name: NACOS_REGISTRY_ADDRESS
              value: nacos-server.default.svc.cluster.local
            - name: SPRING_CLOUD_NACOS_DEMO_VERSION
              value: v2
```

部署完毕后，我们可以在 Higress 控制台的**服务列表**中看到应用已经有两个 endpoint 了，如下图所示：
![image.png](/img/1728554003535.png)

### 为服务划分子集

部署完 v2 版本的应用后，我们可以在 Nacos 控制台（ http://localhost:8848/nacos ） 上看到 service-provider 这个服务有两个 ip，它们的 metadata 中的 version 字段分别为 v1 和 v2。Higress 可以根据服务的元信息将服务划分为不同的子集（subset），从而将请求转发到新版本或者老版本的应用中去。
![image.png](/img/1728554003930.png)
在本地 K8s 集群中 apply 如下资源，从而根据应用元信息中的 version 字段将服务划分为 v1 和 v2 两个子集。

```yaml
apiVersion: networking.istio.io/v1alpha3
kind: DestinationRule
metadata:
  name: demo
  namespace: higress-system
spec:
  host: service-provider.DEFAULT-GROUP.public.nacos
  subsets:
    - name: v1
      labels:
        version: v1
    - name: v2
      labels:
        version: v2
```

### 修改 ingress 路由规则

新版本应用上线后，我们需要把流量全部切到新版本应用中去，这时只需要简单地修改一下我们在 1.3 中创建的路由即可。我们可以在本地 K8s 集群中找到如下 ingress 资源，这对应了我们在 1.3 中创建的那条路由。
![image.png](/img/1728554004176.png)
我们直接编辑这条 ingress 资源，将 `higress.io/destination` 这条 annotation 的 value 改为 `service-provider.DEFAULT-GROUP.public.nacos v2`，即可将路由的目标服务修改为 v2 子集。

```yaml
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  annotations:
    higress.io/destination: service-provider.DEFAULT-GROUP.public.nacos v2
    higress.io/ignore-path-case: "false"
  labels:
    higress.io/domain_demo.springcloud.com: "true"
    higress.io/resource-definer: higress
  name: demo
  namespace: higress-system
spec:
  ingressClassName: higress
  rules:
    - host: demo.springcloud.com
      http:
        paths:
          - backend:
              resource:
                apiGroup: networking.higress.io
                kind: McpBridge
                name: default
            path: /version
            pathType: Prefix
```

### 请求验证

我们再发送请求，可以看到此时得到的是 v2 版本应用的返回结果，如此便实现了新版本的上线发布。
![image.png](/img/1728554004391.png)
如果发现已上线的新版本出现问题需要回滚，只需要修改 ingress 路由中的 `higress.io/destination`，将值更改为 `service-provider.DEFAULT-GROUP.public.nacos v1` 即可完成回滚。

## 利用 Higress 进行金丝雀发布

金丝雀发布是将少量的请求引流到新版本上，因此部署新版本服务只需极小数的实例。验证新版本符合预期后，逐步调整流量权重比例，使得流量慢慢从老版本迁移至新版本，期间可以根据设置的流量比例，对新版本服务进行扩容，同时对老版本服务进行缩容，使得底层资源得到最大化利用。
![image.png](/img/1728554004656.png)

### 修改 ingress 路由规则

Higress 可以通过一条 Ingress 注解轻松完成应用的金丝雀发布。我们编辑 2.3 中的 ingress 资源，将 ingress 中的 `higress.io/destination` 注解按如下方式进行修改：

```yaml
metadata:
  annotations:
    higress.io/destination: |
      80% service-provider.DEFAULT-GROUP.public.nacos v1
      20% service-provider.DEFAULT-GROUP.public.nacos v2
```

这样 Higress 就可以把 80%的流量转发到 v1 版本的应用，将 20%的流量转发到 v2 版本的应用。

### 请求验证

连续发送 20 条请求，可以看到 v1 和 v2 的比例符合我们在 ingress 中配置的比例。随着灰度的进行，可以逐渐调大 v2 版本的流量比例，最终完成新版本的平滑上线。
![image.png](/img/1728554005107.png)

## 利用 Higress 进行 A/B Testing 发布

A/B 测试基于用户请求的元信息将流量路由到新版本，这是一种基于请求内容匹配的灰度发布策略。只有匹配特定规则的请求才会被引流到新版本，常见的做法包括基于 HTTP Header 和 Cookie 。基于 HTTP Header 方式，例如 User-Agent 的值为 Android 的请求 （来自 Android 系统的请求）可以访问新版本，其他系统仍然访问旧版本。基于 Cookie 方式，Cookie 中通常包含具有业务语义的用户信息，例如普通用户可以访问新版本，VIP 用户仍然访问旧版本。
![image.png](/img/1728554005363.png)
![image.png](/img/1728554005538.png)

### 修改 ingress 路由规则

在本示例中，我们通过 HTTP header 中的 User-Agent 对流量进行区分，将 Android 系统的流量转发到 v2 版本，其他系统的流量仍保持 v1 版本。首先修改 2.3 中名叫 demo 的 ingress 资源，将 `higress.io/destination` 修改为 v1 版本，代表目前线上的流量全部会打到原来的 v1 版本：

```yaml
metadata:
  annotations:
    higress.io/destination: service-provider.DEFAULT-GROUP.public.nacos v1
```

当新版本部署完成后，再新建一条如下所示的 ingress 路由。这里采用正则匹配的方式，当 User-Agent 中含有 Android 时，将请求转发到 v2 版本的服务。

```yaml
kind: Ingress
metadata:
  annotations:
    higress.io/destination: service-provider.DEFAULT-GROUP.public.nacos v2
    higress.io/canary: "true"
    higress.io/canary-by-header: "User-Agent"
    higress.io/canary-by-header-pattern: ".*Android.*"
    higress.io/ignore-path-case: "false"
  labels:
    higress.io/domain_demo.springcloud.com: "true"
    higress.io/resource-definer: higress
  name: demo-ab
  namespace: higress-system
spec:
  ingressClassName: higress
  rules:
    - host: demo.springcloud.com
      http:
        paths:
          - backend:
              resource:
                apiGroup: networking.higress.io
                kind: McpBridge
                name: default
            path: /version
            pathType: Prefix
```

### 请求验证

可以看到来自 Android 系统的请求被转发到了 v2 版本，其余系统仍访问 v1 版本。
![image.png](/img/1728554005783.png)
当新版本验证完毕需要全量上线时，只需要将 demo 路由的 `higress.io/destination` 注解修改为 v2 版本，并删除 demo-ab 路由，这样所有流量就都会访问 v2 版本了。

## 加入 Higress 和 Spring Cloud Aliaba 社区

Spring Cloud Alibaba 社区交流群：钉钉群号 2415000986

Higress 社区交流群：

![higress-comm.png](/img/1728554006079.png)

Higress 社区交流钉钉群中有历次 Higress 社区周会录屏，包括本文中提到的结合 Spring Cloud 应用发布的完整实操视频。
