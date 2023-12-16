---
title: Overview
keywords: [Spring Cloud Alibaba, Sentinel]
description: sentinel, overivew.
---

## Current limit downgrade

In a microservice system, an external business function may involve a long service call link. When one of the services is abnormal, if there is no service call protection
The mechanism may cause a large number of servers directly or indirectly called by related services on the service call link to continue to initiate requests, which will eventually lead to the exhaustion of all related service resources and an avalanche effect. As two important means in flow control and service protection, flow limiting and downgrading can effectively deal with such problems.

### Limiting

Current limiting refers to limiting the access volume of a certain interface of a service in the microservice system, so as to avoid excessive traffic from knocking down the service instance. Generally, by setting the traffic threshold for the service, when the threshold of the limit is reached, some strategies can be adopted to deal with it, such as queuing, returning error messages, etc. to respond to the request to protect the service instance. In microservice systems,  current limiting is mainly for service providers.

### downgrade

Downgrading refers to downgrading the invocation of a service when an exception occurs in a service or the flow is limited, such as returning a default value, returning a bottom-up data, and so on. In a microservice system, current limiting targets not only service consumers but also service providers.

## Sentinel overview

The out-of-the-box current limiting and downgrading solution integrated by Spring Cloud Alibaba comes from [Sentinel](https://github.com/alibaba/Sentinel), which takes traffic as the entry point, from flow control, fuse downgrading, system load protection, etc. This dimension protects the stability of the service.

Sentinel has the following characteristics:

- _Rich application scenarios_: Sentinel has undertaken the core scenarios of Alibaba’s Double Eleven traffic promotion in the past 10 years, such as seckill (that is, burst traffic is controlled within the range that the system capacity can bear), message peak shaving, Real-time fusing of downstream unavailable applications, etc.
- _Complete real-time monitoring_: Sentinel also provides real-time monitoring functions. In the console, you can see the second-level data of a single machine connected to the application, or even the aggregated running status of a cluster with a scale of less than 500.
- _Extensive open source ecosystem_: Sentinel provides out-of-the-box integration modules with other open source frameworks/libraries, such as integration with Spring Cloud, Dubbo, and gRPC. You only need to introduce the corresponding dependencies and perform simple configurations to quickly access Sentinel.
- _Complete SPI extension point_: Sentinel provides an easy-to-use and complete SPI extension point. You can quickly customize logic by implementing extension points. For example, customizing rule management, adapting data sources, etc.
