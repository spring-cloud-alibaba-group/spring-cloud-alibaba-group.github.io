---
title: Overview
keywords: [Spring Cloud Alibaba]
description: Service Security.
---

## Overview

In a monolithic architecture, it is simpler to do security protection for a single application because the runtime environment in which it runs is relatively isolated, whereas a microservice architecture gains flexibility by defining distributed features in which the services in the system can be developed and deployed independently in a decentralised manner. However, from a security perspective, microservice architectures provide a wider attack surface for attackers, which makes security governance in microservice systems more complex.

The Spring Cloud Alibaba Security Governance module implements most of the security governance capabilities provided by the istio control plane (mTLS-related security governance capabilities are not currently supported and are under development by the community), and the specific concepts and functionality can be found in the following documentation:

- [istio security concepts](https://istio.io/latest/docs/concepts/security/)
- [istio security tasks](https://istio.io/latest/docs/tasks/security/)
- [istio security config](https://istio.io/latest/docs/reference/config/security/)
