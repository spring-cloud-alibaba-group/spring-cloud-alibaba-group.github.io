---
title: 概述
keywords: [Spring Cloud Alibaba]
description: Traffic Management.
---

# 概述

流量治理是一种基于网络流量的管理和控制方法，用于优化和保障网络服务的可用性和稳定性。通过流量治理，可以实现对网络流量的限制、分配、控制和监控，以确保网络资源的合理使用和服务质量的提升。流量治理技术包括但不限于负载均衡、限流、熔断、降级、容错等手段，可以有效地解决网络中大流量、高并发、故障等问题，提高业务稳定性和可靠性。

Spring Cloud Alibaba 通过对接 Istio，OpenSergo 等控制平面，实现了例如标签路由等流量治理的能力，具体的概念与功能可以参考以下文档：

- [Istio 流量治理概述](https://istio.io/latest/zh/docs/concepts/traffic-management/)
- [Istio 流量管理最佳实践](https://istio.io/latest/zh/docs/tasks/traffic-management/)
- [Istio 流量管理配置](https://istio.io/latest/zh/docs/reference/config/networking/)
- [OpenSergo 流量治理](https://github.com/opensergo/opensergo-specification/blob/main/specification/zh-Hans/traffic-routing.md)
