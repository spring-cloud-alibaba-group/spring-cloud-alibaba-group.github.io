---
title: Overview
keywords: [Spring Cloud Alibaba, Sentinel]
description: sentinel, overivew.
---

## Current limit downgrade

In a microservice system, an external business function may involve a long service call link. When one of the services is abnormal, if there is no service call protection
The mechanism may cause a large number of servers directly or indirectly called by related services on the service call link to continue to initiate requests, which will eventually lead to the exhaustion of all related service resources and an avalanche effect. As two important means in flow control and service protection, flow limiting and downgrading can effectively deal with such problems.

### Limiting

Current limiting is a policy for service providers that controls access to specific service interfaces or service instances. Its purpose is to protect service providers from excessive request traffic and ensure service stability. Current limiting measures can be implemented at both ends of the service provider or service consumer, by setting traffic thresholds and controlling traffic by queuing, rejecting requests, or returning error messages, thereby protecting services.

### downgrade

Downgrade is a response strategy for service consumers. When the service is abnormal or current is limited, the service call is downgraded to ensure that the consumer can work normally under abnormal circumstances. The purpose of downgrading is to transition to a weak dependency state so that the system can provide basic functions or data when the service is unavailable. This strategy can be implemented on the service consumer side to ensure system availability by returning default values, providing alternative data, or simplifying functions.

Generally speaking, current limiting and degradation are important mechanisms in microservice architecture. Although there may be many ways to implement them, they all focus on protecting service providers and consumers and ensuring stable operation of the system in the face of abnormal situations.  Current limiting focuses on protecting service providers and controlling request traffic; while downgrading focuses on service consumers to ensure that basic functions are provided when services are unavailable or abnormal.

## Sentinel overview

The out-of-the-box current limiting and downgrading solution integrated by Spring Cloud Alibaba comes from [Sentinel](https://github.com/alibaba/Sentinel), which takes traffic as the entry point, from flow control, fuse downgrading, system load protection, etc. This dimension protects the stability of the service.

Sentinel has the following characteristics:

- _Rich application scenarios_: Sentinel has undertaken the core scenarios of Alibaba’s Double Eleven traffic promotion in the past 10 years, such as seckill (that is, burst traffic is controlled within the range that the system capacity can bear), message peak shaving, Real-time fusing of downstream unavailable applications, etc.
- _Complete real-time monitoring_: Sentinel also provides real-time monitoring functions. In the console, you can see the second-level data of a single machine connected to the application, or even the aggregated running status of a cluster with a scale of less than 500.
- _Extensive open source ecosystem_: Sentinel provides out-of-the-box integration modules with other open source frameworks/libraries, such as integration with Spring Cloud, Dubbo, and gRPC. You only need to introduce the corresponding dependencies and perform simple configurations to quickly access Sentinel.
- _Complete SPI extension point_: Sentinel provides an easy-to-use and complete SPI extension point. You can quickly customize logic by implementing extension points. For example, customizing rule management, adapting data sources, etc.
