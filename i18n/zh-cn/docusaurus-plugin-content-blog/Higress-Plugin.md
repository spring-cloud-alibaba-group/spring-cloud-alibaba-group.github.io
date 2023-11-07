---
title: 通过 Higress Wasm 插件 3 倍性能实现 Spring-cloud-gateway 功能
keywords: [Higress, 网关, WASM]
description: Spring Cloud Gateway 是如何满足 HTTP 请求/响应转换需求场景的，在这种场景如何使用 Higress 云原生网关的解决方案，并对比两者的性能差异。
author: 韦鑫
date: 2023-10-27
---

## SCG 修改请求/响应

在 [Spring Cloud Gateway](https://cloud.spring.io/spring-cloud-gateway/reference/html/)(以下简称为 SCG) 中，当我们需要对 HTTP 请求或响应进行修改时，SCG 提供了许多内置的 [GatewayFilter](https://cloud.spring.io/spring-cloud-gateway/reference/html/#gatewayfilter-factories) 来满足我们对这种应用场景的需求，例如 AddRequestHeader,AddRequestParameter, DedupeResponseHeader,MapRequestHeader, ModifyRequestBody 等。
考虑以下简单用例：

- 添加请求头部 X-First，值从请求路径中获取，例如从 /response-headers?testKey=testValue 中获取 "response-headers"；
- 将请求头部 X-First 的值映射给 X-Second；
- 添加请求查询参数 k1=v1；
- 剔除重复的响应头部 X-Dedupe。

在 SCG 中使用 GatewayFilter 我们可以这样配置：

```yaml
# application.yaml:

spring:
  cloud:
    gateway:
      routes:
        - id: test_route
          uri: lb://httpbin-svc
          predicates:
            - Path=/{api}/**
          filters:
            - AddRequestHeader=X-First, {api}
            - MapRequestHeader=X-First, X-Second
            - AddRequestParameter=k1, v1
            - DedupeResponseHeader=X-Dedupe, RETAIN_FIRST
```

相信拥有 SCG 使用经验的同学对上述配置一定不陌生，那么本文将重点给出另一种能够满足上述需求并且性能更加优越的解决方案——使用 Higress 云原生网关的 Transformer 插件。

## Higress 插件与 SCG 性能比较

我们在同一吞吐量水平（QPS）上，开启/关闭 [Higress Transformer 插件](https://github.com/alibaba/higress/tree/main/plugins/wasm-go/extensions/transformer)和 SCG 相应 GatewayFilters，统计两者在 CPU 和内存资源上的开销。
经过[测试](https://gist.github.com/WeixinX/c24f4ded37832dd7e753b2d27470f0fc)，我们得到的结论是：

- 在 Higress 未启用 Transformer 插件，SCG 未启用 GatewayFilters 的条件下，SCG 的 CPU, 内存资源开销分别约为 Higress的 3.30, 4.88倍；
- 在 Higress 启用 Transformer 插件，SCG 启用相应 GatewayFilters 的条件下，SCG 的 CPU,内存资源开销分别约为 Higress 的 2.98, 3.19倍。

![image](https://github.com/spring-cloud-alibaba-group/spring-cloud-alibaba-group.github.io/assets/6763318/3f08813c-b579-4852-839e-0a943e5e18cc)
![image](https://github.com/spring-cloud-alibaba-group/spring-cloud-alibaba-group.github.io/assets/6763318/dc14ce07-fdd9-40df-aa5e-97c923b546aa)

**可见 Higress Transformer 相比于 SCG GatewayFilter 有着相当不错的性能表现！**

接下来我们将进一步为大家介绍 Higress 云原生网关以及上述提到的 Higress Transformer 插件。

## Higress 简介

[Higress](https://higress.io/zh-cn/)是基于阿里内部的 Envoy Gateway 实践沉淀、以开源 Istio + Envoy 为核心构建的下一代云原生网关，实现了流量网关+微服务网关+安全网关三合一的高集成能力，深度集成 Dubbo、Nacos、Sentinel 等微服务技术栈，能够帮助用户极大地降低网关的部署及运维成本且能力不打折；在标准上全面支持 Ingress 与 Gateway API，积极拥抱云原生下的标准 API 规范；同时，Higress Controller 也支持 Nginx Ingress 平滑迁移，帮助用户零成本快速迁移到 Higress。
Higress 提供了一套 Wasm (WebAssembly) [SDK](https://github.com/alibaba/higress/tree/main/plugins)，使得开发者能够轻松使用 C++，Golang，Rust 开发 Wasm 插件增强网关能力。下面将为大家介绍 Higress Transformer 插件的基本功能，最后简单说明 Transformer 插件的核心代码逻辑。

![image](https://github.com/spring-cloud-alibaba-group/spring-cloud-alibaba-group.github.io/assets/6763318/91759ea4-a295-4eb0-9fb6-9104d69ba8e3)

## Transformer 插件介绍

Higress Transformer 插件可以对请求/响应头部、请求查询参数、请求/响应体参数进行转换，支持的转换操作类型包括删除（remove）、重命名（rename）、更新（replace）、添加（add）、追加（append）、映射（map）和去重（dedupe）。
接下来我们复现最开始提到的 SCG GatewayFilter 简单用例，来演示如何使用该插件（以下使用 Higress 控制台可以很方便地部署插件，当然也可以使用 [K8s YAML Manifests](https://github.com/higress-group/higress-demo/tree/main/wasm-demo/wasm-demo-go/wasm-plugin-transformer) 的方式）：

1. 首先根据[官方文档](https://higress.io/zh-cn/docs/user/quickstart)快速安装 Higress，结果如下：

```bash
$ kubectl -n higress-system get deploy
NAME                         READY   UP-TO-DATE   AVAILABLE   AGE
higress-console              1/1     1            1           1d
higress-console-grafana      1/1     1            1           1d
higress-console-prometheus   1/1     1            1           1d
higress-controller           1/1     1            1           1d
higress-gateway              1/1     1            1           1d
```

2. 通过 Higress 控制台添加域名（foo.bar.com）、路由配置（foo），将流量转发至后端的 [httpbin](https://httpbin.org/) 服务：

![image](https://github.com/spring-cloud-alibaba-group/spring-cloud-alibaba-group.github.io/assets/6763318/30d4667b-8b81-4577-8ea4-39f1cbc1b849)
![image](https://github.com/spring-cloud-alibaba-group/spring-cloud-alibaba-group.github.io/assets/6763318/eba02753-1823-4b26-b7f8-f5b4dd44fb15)

3. 为 foo 路由添加 Transformer 插件（当前未推送插件至官方镜像仓库，可以先使用 docker.io/weixinx/transformer:v0.1.0，或到代码仓库自行构建）：

![image](https://github.com/spring-cloud-alibaba-group/spring-cloud-alibaba-group.github.io/assets/6763318/6361c795-2c7b-43e0-9b86-7cd7cf7e39fa)

注：为了能够同时完成请求和响应转换的需求，我们需要为 foo 路由再添加一个 Transformer 插件，命名为 transformer-resp，用于处理响应方向。

4. 添加 Transformer 配置并开启该插件：

- 添加请求头部 X-First，值从请求路径中获取，例如从 /response-headers?testKey=testValue 中获取 "response-headers"；
- 将请求头部 X-First 的值映射给 X-Second；
- 添加请求查询参数 k1=v1；
- 剔除重复的响应头部 X-Dedupe。

```yaml
# transformer:
type: request  # 指定 Transformer 类型
rules:         # 指定转换规则
- operate: add # 指定转换操作类型
  headers:     # 指定头部转换规则
  - key: X-First
    value: $1  # 正则表达式捕获组 $1，支持 RE2 语法
    path_pattern: ^\/(\w+)[\?]{0,1}.*$
  querys:      # 指定查询参数转换规则
  - key: k1
    value: v1
- operate: map
  headers:
  - key: X-First
    value: X-Second
---
# transformer-resp:
type: response
rules:
- operate: dedupe
  headers:
  - key: X-Dedupe
    value: RETAIN_FIRST
```

5. 发送请求进行测试：

```bash
# 验证请求方向转换
$ curl -v -H "host: foo.bar.com" "console.higress.io/get"
...
>
< HTTP/1.1 200 OK
...
<
{
  "args": {
    # 添加了查询参数 k1=v1
    "k1": "v1"
  },
  "headers": {
    ...
    "X-First": "get", # 添加了请求头部 X-First，值 "get" 来自请求路径
    "X-Second": "get" # 映射了请求头部 X-Second
  },
  ...
  # 添加了查询参数 k1=v1
  "url": "http://foo.bar.com/get?k1=v1"
}


# 验证响应方向转换
$ curl -v -H "host: foo.bar.com" \
"console.higress.io/response-headers?X-Dedupe=1&X-Dedupe=2&X-Dedupe=3"
...
>
< HTTP/1.1 200 OK
< x-dedupe: 1 # 保留了响应头部 X-Dedupe 的第一个值
...
<
{
  ...
  # 通过查询参数传给 httpbin 的自定义响应头部
  "X-Dedupe": [
    "1",
    "2",
    "3"
  ],
  ...
}
```

❗️需要注意的是：

- 与上述例子相同，若有同时处理请求和响应转换的需求，则需要为相应路由添加两个 Transformer 插件，分别处理请求方向和响应方向（正在优化）；
- 请求体支持的 Content-Type 有：application/json,application/x-www-form-urlencoded,multipart/form-data；而响应体仅支持 application/json；
- 更多说明详见插件文档[3]。

## Transformer 逻辑

本节将简单说明 Higress Transformer 插件的核心代码逻辑，希望可以为有兴趣优化该插件或进行二次开发的同学提供一些帮助。

首先该插件代码位于Higress 仓库的 plugins/wasm-go/extensions/transformer 目录下，使用 Higress 提供的 Wasm SDK[5]进行开发（关于如何开发 Wasm 插件详见[官方文档](https://higress.io/zh-cn/docs/user/wasm-go)）。

插件的配置模型 TransformerConfig：

```go

# 模型以插件配置的形式暴露给用户
type TransformerConfig struct {
  typ   string          # Transformer 类型，[request, response]
  rules []TransformRule # 转换规则
  
  trans Transformer # Transformer 实例，不对用户暴露配置，用于实际的转换操作
}

type TransformRule struct {
  operate string   # 转换操作类型
  headers []Param  # header 参数
  querys  []Param  # query 参数
  body    []Param  # body 参数
}

type Param struct {
  key         string # 表示字段的 key
  value       string # 表示字段的 value 或 key (map) 或 strategy (dedupe)
  valueType   string # 为 application/json body 指定 value 的数据类型
  hostPattern string # host 正则匹配模式
  pathPattern string # path 正则匹配模式
}
```

其中 Transformer 作为接口分别有请求和响应两个实现（requestTransformer, responseTransformer），主要实现了 3 个接口方法 TransformHeaders,TransformerQuerys 和 TransformBody：

```go

type Transformer interface {
 TransformHeaders(host, path string, hs map[string][]string) error
 TransformQuerys(host, path string, qs map[string][]string) error
 TransformBody(host, path string, body interface{}) error
 ...
}

var _ Transformer = (*requestTransformer)(nil)
var _ Transformer = (*responseTransformer)(nil)
```

由于头部（Headers）和查询参数（Querys）都是以 key-value 的形式存在，因此通过 kvHandler 对两者采用统一的处理逻辑；而 Body 由于请求、响应支持不同的 Content-Type，因此分别通过 requestBodyHandler (kvHandler,jsonHandler 组合)和 responseBodyHandler (jsonHandler) 进行处理。综上，在修改该插件逻辑时，主要对kvHandler 和 jsonHandler 进行修改即可，其中 jsonHandler 依赖 [GJSON](https://github.com/tidwall/gjson) 和 [SJSON](https://github.com/tidwall/sjson) 工具库。

![image](https://github.com/spring-cloud-alibaba-group/spring-cloud-alibaba-group.github.io/assets/6763318/1e993fb1-6674-4cb3-a301-e8ad1d48f422)

目前 handler 中的转换顺序是被硬编码的（remove -> rename -> replace -> add -> append -> map -> dedupe），我们对此有优化的打算，也欢迎感兴趣的同学参与进来 ~

## 总结

本文带大家了解了 Higress Transformer 插件，并与 Spring Cloud Gateway 进行了性能比较，在文章的最后还说明了该插件的核心代码逻辑，希望能够为大家从 Spring Cloud Gateway 迁移至 Higress 提供帮助！

![image](https://github.com/spring-cloud-alibaba-group/spring-cloud-alibaba-group.github.io/assets/6763318/648393a5-8495-4cf2-af15-9a812f8dd5e8)

如果您觉得 Higress 对您有帮助，欢迎前往 Github: [Higress](https://github.com/alibaba/higress)为我们 star⭐️ 一下！期待与您在 Higress 社区相遇 ~
