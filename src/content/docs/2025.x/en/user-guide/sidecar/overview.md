---
title: Overview
keywords: [Spring Cloud Alibaba, Sidecar]
description: Sidecar.Overview
---

Spring Cloud Alibaba Sidecar is a framework for quickly and perfectly integrating Spring Cloud with heterogeneous microservices, inspired by Spring Cloud Netflix Sidecar.

## Why write Spring Cloud Alibaba Sidecar

There are two reasons:

1. Spring Cloud subproject Spring Cloud Netflix Sidecar can quickly integrate heterogeneous micro services. However, Spring Cloud Netflix Sidecar only supports the use of Eureka for service discovery, not other service discovery components.

2. Spring Cloud Netflix Sidecar is based on Zuul 1.x, and Spring Cloud officially stated that Zuul will be phased out in the future.

## Supported components

Currently supported service discovery components:

- Nacos
- Consul

## Why not use Service Mesh?

- Currently, Service Mesh is mainly used in the field of Kubernetes ( Istio, Linkerd2, etc, most of which support Kubernetes as the First Class, although Istio can also be deployed in non-Kubernetes environments). Spring Cloud applications don't necessarily have a Service Mesh environment;

- A single widget using Spring Cloud Alibaba Sidecar solves the problem (no more than 200 lines of core code) and introduces a complete Mesh solution, which is a bit like killing eel.

For more information please refer to: [Spring Cloud Alibaba Sidecar Docs](https://spring-cloud-alibaba-group.github.io/github-pages/hoxton/zh-cn/index.html#_spring_cloud_alibaba_sidecar)
