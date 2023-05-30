---
title: 概述
keywords: [Spring Cloud Alibaba]
description: Service Security.
---

# 概述

在整体式架构中，由于运行应用程序的运行时环境相对隔离，所以对单体应用做安全保护比较简单，而微服务架构通过定义分布式特征来获得灵活性，系统中的服务能够以分散方式独立开发和部署。但是从安全角度来看，微服务架构为攻击者提供了更加宽广的攻击面，这让微服务体系中的安全治理变得更加复杂。

Spring Cloud Alibaba 安全治理模块通过对接 Istio 控制面，实现了 Istio 控制面提供的绝大部分的安全治理能力(目前还不支持 mTLS 相关的安全治理能力，社区正在开发中)，具体的概念与功能可以参考以下文档：

- [Istio 安全概述](https://istio.io/latest/zh/docs/concepts/security/#authorization)
- [Istio 安全最佳实践](https://istio.io/latest/zh/docs/tasks/security/)
- [Istio 安全配置](https://istio.io/latest/zh/docs/reference/config/security/)