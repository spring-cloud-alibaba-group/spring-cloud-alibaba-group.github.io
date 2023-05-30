---
title: 进阶指南
keywords: [Spring Cloud Alibaba,Sidecar]
description: sidecar.
---

## 原理

- spring-cloud-starter-alibaba-sidecar 根据配置的异构微服务的IP、端口等信息，将异构微服务的IP/端口注册到服务发现组件上。

- spring-cloud-starter-alibaba-sidecar 实现了异构服务的健康检查, spring-cloud-starter-alibaba-sidecar 会定时检测异构微服务是否健康。如果发现异构微服务不健康，Sidecar 会自动将代表异构微服务的 Sidecar 实例下线；如果异构微服务恢复正常，则会自动上线。最长延迟是30秒，详见 `Alibaba SidecarChecker#check`。

## 优缺点分析

spring-cloud-starter-alibaba-sidecar 的设计和 spring-cloud-netflix-sidecar 基本一致，优缺点和 spring-cloud-netflix-sidecar 的优缺点也是一样的。

优点：

- 接入简单，几行代码就可以将异构微服务整合到 Spring Cloud 微服务生态

- 不侵入原代码

缺点：

- 每接入一个异构微服务实例，都需要额外部署一个 spring-cloud-starter-alibaba-sidecar 实例，增加了部署成本（虽然这个成本在 Kubernetes 环境中几乎可以忽略不计（只需将 spring-cloud-starter-alibaba-sidecar 实例和异构微服务作为一个 Pod 部署即可））；

- 异构微服务调用 Spring Cloud 微服务时，本质是把 spring-cloud-starter-alibaba-sidecar 当网关在使用，经过了一层转发，性能有一定下降。

## EndPoint信息

请求 `http://127.0.0.1:8070/actuator/health` 地址可以看到 EndPoint 节点信息

```shell
$ curl http://127.0.0.1:8070/actuator/health
```

响应结果：

```json
{
    "status": "UP",
    "components": {
        "discoveryComposite": {
            "status": "UP",
            "components": {
                "discoveryClient": {
                    "status": "UP",
                    "details": {
                        "services": [
                            "node-service"
                        ]
                    }
                }
            }
        },
        "diskSpace": {
            "status": "UP",
            "details": {
                "total": 107374178304,
                "free": 18797641728,
                "threshold": 10485760,
                "path": "E:\\open_sources\\spring-cloud-alibaba\\.",
                "exists": true
            }
        },
        "nacosDiscovery": {
            "status": "UP"
        },
        "ping": {
            "status": "UP"
        },
        "reactiveDiscoveryClients": {
            "status": "UP",
            "components": {
                "Simple Reactive Discovery Client": {
                    "status": "UP",
                    "details": {
                        "services": []
                    }
                }
            }
        },
        "refreshScope": {
            "status": "UP"
        },
        "sidecar": {
            "status": "UP"
        }
    }
}
```