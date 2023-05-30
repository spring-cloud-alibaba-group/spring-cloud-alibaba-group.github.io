---
title: Overview
keywords: [Spring Cloud Alibaba]
description: Traffic Management.
---
# Overview
Traffic governance is a network traffic-based management and control method for optimising and guaranteeing the availability and stability of network services. Through traffic governance, network traffic can be restricted, allocated, controlled and monitored to ensure the proper use of network resources and quality of service. Traffic governance techniques include, but are not limited to, load balancing, flow limiting, degradation, fault tolerance and other means, which can effectively solve the problems of high traffic, high concurrency and failure in the network and improve business stability and reliability.

Spring Cloud Alibaba implements traffic governance capabilities such as label routing by interacting with control planes such as Istio, OpenSergo, etc. The specific concepts and features can be found in the following documents:
- [istio traffic management concepts](https://istio.io/latest/docs/concepts/traffic-management/)
- [istio traffic management tasks](https://istio.io/latest/docs/tasks/traffic-management/)
- [istio traffic management configuration](https://istio.io/latest/docs/reference/config/networking/)
- [OpenSergo traffic routing specification](https://github.com/opensergo/opensergo-specification/blob/main/specification/en/traffic-routing.md)