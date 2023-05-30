---
title: 进阶指南
keywords: [Spring Cloud Alibaba]
description: Traffic Management.
---
# 进阶指南
本节将介绍一些流量治理相关的高级配置项。
## 配置项参考
|配置项|key|默认值|说明
|--|--|--|--|
|标签路由采用的负载均衡算法|spring.cloud.governance.routing.rule|ZoneAvoidanceRule|算法可以取以下值：1.RoundRobinRule 2.RandomRule 3.WeightedResponseTimeRule 4.BestAvailableRule 5.RetryRule 6.ZoneAvoidanceRule 7.AvailabilityFilteringRule|
|Istiod的地址| spring.cloud.istio.config.host|127.0.0.1|
|Istiod的端口| spring.cloud.istio.config.port|15012|注：连接15010端口无需TLS，连接15012端口需TLS认证|
|SCA去Istio拉取配置的线程池大小| spring.cloud.istio.config.polling-pool-size|10|
|SCA去Istio拉取配置的间隔时间| spring.cloud.istio.config.polling-time|30|单位为秒
|连接Istio15012端口时使用的JWT token| spring.cloud.istio.config.istiod-token|应用所在pod的`/var/run/secrets/tokens/istio-token`文件的内容|
|是否打印xDS相关日志| spring.cloud.istio.config.log-xds|true|
## 环境变量参考
注意，应用运行在 K8s 环境中，在非默认命名空间下的应用，需要接收 Istiod 下发的规则，需要将运行的应用 K8s 的元信息注入以下环境变量中，具体操作方式可参考 [Kubernetes 文档](https://kubernetes.io/zh-cn/docs/tasks/inject-data-application/environment-variable-expose-pod-information)

|环境变量名|K8s pod metadata name|
|--|--|
|POD_NAME|metadata.name|
|NAMESPACE_NAME|metadata.namespace|