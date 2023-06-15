---
title: 概述
keywords: [Spring Cloud Alibaba,Sidecar]
description: sidecar,overivew.
---

spring-cloud-starter-alibaba-sidecar 是一个用来快速完美整合 Spring Cloud 与异构微服务的框架，灵感来自 spring-cloud-netflix-sidecar。

## 为什么要编写 Spring Cloud Alibaba Sidecar

原因有两点：

1. Spring Cloud 子项目 spring-cloud-netflix-sidecar 是可以快速整合异构微服务的。然而， 其只支持使用 Eureka 作为服务发现组件，不支持其他服务发现组件。

2. 另外，其基于 Zuul 1.x ，Spring Cloud 官方明确声明，未来将会逐步淘汰 Zuul 。

## 支持的组件

spring-cloud-starter-alibaba-sidecar 目前支持的服务发现组件：
- Nacos
- Consul 

## 为什么不使用 Service Mesh？

- 目前 Service Mesh 主要使用场景在 Kubernetes 领域（Istio、Linkerd2 等，大多将 Kubernetes 作为 First Class 支持，虽然 Istio 也可部署在非 Kubernetes 环境），而目前业界，Spring Cloud 应用未必有 Service Mesh 的环境；

- 使用 spring-cloud-starter-alibaba-sidecar 一个小组件就能解决问题了（核心代码不超过200行），引入整套 Service Mesh 方案，颇有点屠龙刀杀黄鳝的意思。

更多信息请参考：[异构服务 Docs](https://spring-cloud-alibaba-group.github.io/github-pages/hoxton/zh-cn/index.html#_spring_cloud_alibaba_sidecar)

