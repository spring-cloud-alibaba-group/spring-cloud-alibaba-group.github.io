---
title: "Advanced Guide"
keywords: [Spring Cloud Alibaba, Sidecar, Advanced Guide]
description: Sidecar, Advanced Guide.
---

## principle

- Spring Cloud Alibaba Sidecar registers the IP address and port of the heterogeneous micro-service with the service discovery component based on the configured IP address and port number of the heterogeneous micro-service.

- Spring Cloud Alibaba Sidecar implements health check for heterogeneous services. Spring Cloud Alibaba Sidecar periodically checks whether heterogeneous micro-services are healthy. If the heterogeneous microservice is found to be unhealthy, Sidecar will automatically take the Sidecar instance representing the heterogeneous microservice offline. If the heterogeneous microservice recovers, it automatically goes online. The maximum delay is 30 seconds, see `Alibaba SidecarChecker#check`.

Analysis of advantages and disadvantages of Spring Cloud Alibaba Sidecar

The design of Spring Cloud Alibaba Sidecar is basically the same as Sidecar, and the advantages and disadvantages of Sidecar are the same.

Advantages:

- Easy access, a few lines of code to integrate heterogeneous microservices into the Spring Cloud microservices ecosystem;

- Do not hack the original code.

Disadvantages:

- For each heterogeneous microservice instance, an additional Alibaba Sidecar instance needs to be deployed, increasing the deployment cost although this cost is almost negligible in the Kubernetes environment (just deploy the Alibaba Sidecar instance and heterogeneous microservice as a Pod);

- Heterogeneous micro-service calls Spring Cloud micro-service, essentially, Spring Cloud Alibaba Sidecar is in use as the gateway. After a layer of forwarding, the performance is degraded to a certain extent.

## Endpoint Infomaration

Request http://127.0.0.1:8070/actuator/health address you can see the EndPoint node information

```shell
curl http://127.0.0.1:8070/actuator/health
```

Response:

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
            "services": ["node-service"]
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
