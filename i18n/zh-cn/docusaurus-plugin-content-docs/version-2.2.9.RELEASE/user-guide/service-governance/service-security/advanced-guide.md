---
title: 进阶指南
keywords: [Spring Cloud Alibaba]
description: Service Security.
---

## 进阶指南

本节将介绍一些安全治理相关的高级配置项。

## 配置项参考

| 配置项                                 | key                                         | 默认值                                                         | 说明                                                    |
| -------------------------------------- | ------------------------------------------- | -------------------------------------------------------------- | ------------------------------------------------------- |
| 是否开启鉴权                           | spring.cloud.governance.auth.enabled        | true                                                           |
| 是否连接 Istio 获取鉴权配置            | spring.cloud.istio.config.enabled           | true                                                           |
| Istiod 的地址                          | spring.cloud.istio.config.host              | 127.0.0.1                                                      |
| Istiod 的端口                          | spring.cloud.istio.config.port              | 15012                                                          | 注：连接 15010 端口无需 TLS，连接 15012 端口需 TLS 认证 |
| SCA 去 Istio 拉取配置的线程池大小      | spring.cloud.istio.config.polling-pool-size | 10                                                             |
| SCA 去 Istio 拉取配置的间隔时间        | spring.cloud.istio.config.polling-time      | 30                                                             | 单位为秒                                                |
| 连接 Istio15012 端口时使用的 JWT token | spring.cloud.istio.config.istiod-token      | 应用所在 pod 的`/var/run/secrets/tokens/istio-token`文件的内容 |
| 是否打印 xDS 相关日志                  | spring.cloud.istio.config.log-xds           | true                                                           |

## 环境变量参考

注意，应用运行在 K8s 环境中，在非默认命名空间下的应用，需要接收 Istiod 下发的规则，需要将运行的应用 K8s 的元信息注入以下环境变量中，具体操作方式可参考 [Kubernetes 文档](https://kubernetes.io/zh-cn/docs/tasks/inject-data-application/environment-variable-expose-pod-information)：

| 环境变量名     | K8s pod metadata name |
| -------------- | --------------------- |
| POD_NAME       | metadata.name         |
| NAMESPACE_NAME | metadata.namespace    |
