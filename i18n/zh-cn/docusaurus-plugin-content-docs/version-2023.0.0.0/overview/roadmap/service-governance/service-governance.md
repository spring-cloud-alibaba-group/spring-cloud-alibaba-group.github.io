---
title: 服务治理
keywords: [Spring Cloud Alibaba]
description: Spring Cloud Alibaba, Roadmap Service Governance.
---

## 服务治理能力建设背景

之前 Spring Cloud Alibaba 已经做了一些治理相关的工作，但是只覆盖了 Istio 的部分场景，后续打算将 Istio 中 DestinationRule 以及 VirtualService 中还未接入的治理能力持续接入，让用户可以无缝的衔接进云原生的技术体系中。

## 功能列表（TODO）

1. 支持 Istio first-part jwt

2. GRPC 版本更新与适配

3. TLS

    - mTLS/TLS 通信(包括使用 ISTIO 自带的 mTLS 以及用户自定义的证书)

    - 支持身份验证鉴权(mTLS 前提下)

4. DestinationRule & VirtualService

    - 通过 EDS 的相关信息来获取负载均衡的 endpoints，也就是说服务发现的数据可以直接从控制面获取，无需在云原生这套体系里面额外使用 Nacos 等注册中心

    - 通过 CDS 中指定的负载均衡策略，结合 spring-cloud-loadbalancer 等组件来对不同的 subset 做不同的负载均衡策略

    - 常规负载均衡策略

      > RANDOM,PASSTHROUGH,ROUND_ROBIN,LEAST_REQUEST

    - 一致性哈希
    - 地域负载均衡

    - 通过 DestinationRule 中配置的连接池配置，来配置 Spring Cloud 中 Feign 的连接相关配置

      > 最大重试数
      > 最大闲置时间
      > http2 相关配置

    - 通过 DestinationRule 中的 OutlierDetection，来实现 feign 的离群实例摘除

      > 连续错误次数
      > 错误间隔  
      > 最小摘除百分比
      > 最大摘除百分比

    - 通过 VirtualService 中的请求/响应头操作，来对访问此应用的请求/响应头做响应的修改

    - 通过 virtualService 中的 HTTP 以及 HTTPS 流量的匹配规则，增强标签路由的一些能力

    https://istio.io/latest/zh/docs/reference/config/networking/virtual-service/#HTTPMatchRequest
    https://istio.io/latest/zh/docs/reference/config/networking/virtual-service/#TLSMatchAttributes

    比如做一些取反操作（without headers）的支持，以及根据一些额外的 label 路由

        ○ 通过VirtualService中的重定向,直接返回，实现服务Mock

        ○ 通过VirtualService中的路径重写，实现路径重写

        ○ 通过VirtualService中的故障重试，实现故障重试

        ○ 通过VirtualService中的跨域，实现跨域

        ○ 通过VirtualService中的故障注入，实现故障注入

## TODO：

1. xds-bootstrap 调研

2. mtls 实现并合入

## 服务契约对接

### 效果

- 用户通过添加依赖、指定上报地址后，达成如下能力：

- 用户写 controller，能够在开源控制台上看到 path/method 等请求信息

- 用户写 controller、带上 openapi v3 annotation，能够在开源控制台上看到 path/method/参数说明等信息

### 技术实现

### Spring Cloud Alibaba 新模块

SCA 开启服务治理模块，该模块功能如下：

    1. 应用启动后，扫描所有的controller，收集openapi 信息

    2. 如果配置了上报地址，则将这些信息上报到控制台

### 上报数据格式

目前格式上有两种选择：

    1. 参考OpenAPI格式上报，比如：https://editor.swagger.io/

    2. 扩展dubbo的metadata格式，例如： https://github.com/apache/dubbo/pull/7029#issuecomment-746162196
    为了后续支持k8s部署，同时会将上述格式转化为proto/gRPC定义。

### 上报数据认证

目前上报方式比较倾向于 json 上报，用户名和密码认证。

为了后续支持 k8s 部署，将会支持 mtls 认证+gRPC 上报。

### 控制台

<p align="center">
<img src="https://sca-storage.oss-cn-hangzhou.aliyuncs.com/website/image.png" />
</p>

由于服务治理开源会沿用 Sentinel 控制台，所以会在 Sentinel 控制台上增加一个“服务契约”菜单，来展示服务契约信息。

### 其他

更多微服务治理开源的相关内容可以参考：https://www.yuque.com/ot01yo/thyzgp/rgzqv3
