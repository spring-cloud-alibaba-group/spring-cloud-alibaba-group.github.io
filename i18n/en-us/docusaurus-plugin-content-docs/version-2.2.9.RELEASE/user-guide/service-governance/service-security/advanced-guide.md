---
title: "Advanced Guide"
keywords: [Spring Cloud Alibaba]
description: Service Security.
---

## Advanced Guide

This section will introduce some advanced configuration items related to security governance.

## Configuration Refrence

| Configuration Item                                                 | key                                         | Default Value                                                                   | Description                                  |
| ------------------------------------------------------------------ | ------------------------------------------- | ------------------------------------------------------------------------------- | -------------------------------------------- |
| Whether to enable authentication                                   | spring.cloud.governance.auth.enabled        | true                                                                            |
| Whether to connect to Istio to obtain authentication configuration | spring.cloud.istio.config.enabled           | true                                                                            |
| Host of Istiod                                                     | spring.cloud.istio.config.host              | 127.0.0.1                                                                       |
| Port of Istiod                                                     | spring.cloud.istio.config.port              | 15012                                                                           | 15010 port does not need TLS，but 15012 does |
| Thread pool size for application to pull the config                | spring.cloud.istio.config.polling-pool-size | 10                                                                              |
| Time interval for application to pull the config                   | spring.cloud.istio.config.polling-time      | 30                                                                              | The unit is second                           |
| JWT token for application to connect to 15012 port                 | spring.cloud.istio.config.istiod-token      | Content of file `/var/run/secrets/tokens/istio-token` in the pod of application |
| Whether to print logs about xDS                                    | spring.cloud.istio.config.log-xds           | true                                                                            |

## Environment Variable Refrence

Note that the application runs in the K8s environment, and the application in the non-default namespace needs to receive the rules issued by Istiod, and needs to inject the meta information of the running application Kubernetes into the following environment variables. For the specific operation method, please refer to [Kubernetes documentation](https://kubernetes.io/zh-cn/docs/tasks/inject-data-application/environment-variable-expose-pod-information):

| Environment variable name | K8s pod metadata name |
| ------------------------- | --------------------- |
| POD_NAME                  | metadata.name         |
| NAMESPACE_NAME            | metadata.namespace    |
