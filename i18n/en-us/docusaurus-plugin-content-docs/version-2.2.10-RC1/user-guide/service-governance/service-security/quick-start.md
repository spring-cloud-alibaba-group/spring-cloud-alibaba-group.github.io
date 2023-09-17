---
title: Quick Start
keywords: [Spring Cloud Alibaba]
description: Service Security.
---

# Quick Start

This section demonstrates how to use Istio to publish security governance config to Spring Cloud Alibaba application and use the config to do security governance. The Spring Cloud Alibaba security governance module supports security governance of Spring MVC and Spring WebFlux applications.

## Preparation

### Install K8s

Please refer to [tools](https://kubernetes.io/docs/tasks/tools/) chapter of K8s document.

### Enable Istio on K8s

Please refer to [install](https://istio.io/latest/docs/setup/install/) chapter of Istio document.

## Demo

### Connect to Istio

Before launching the example for demonstration, let's look at how a Spring Cloud application accesses Istio and provides security governance. This section is only for you to understand how to use it. The config has been filled in this example and you may not need to modify it.

1. Modify `pom.xml` to introduce Istio resource transform and Spring Cloud Alibaba security governance module:

```xml
<dependency>
    <groupId>com.alibaba.cloud</groupId>
    <artifactId>spring-cloud-starter-alibaba-governance-auth</artifactId>
</dependency>
<dependency>
    <groupId>com.alibaba.cloud</groupId>
    <artifactId>spring-cloud-starter-xds-adapter</artifactId>
</dependency>
```

2. Configure Istio related metadata in the `src/main/resources/application` yml configuration file:

```yml
server:
  port: ${SERVER_PORT:80}
spring:
  cloud:
    governance:
      auth:
        enabled: ${ISTIO_AUTH_ENABLE:true}
    istio:
      config:
        enabled: ${ISTIO_CONFIG_ENABLE:true}
        host: ${ISTIOD_ADDR:127.0.0.1}
        port: ${ISTIOD_PORT:15010}
        polling-pool-size: ${POLLING_POOL_SIZE:10}
        polling-time: ${POLLING_TIMEOUT:10}
        istiod-token: ${ISTIOD_TOKEN:}
        log-xds: ${LOG_XDS:true}
```

**HINT：The POD in which your deployed application does not need to be automatically injected by Istio because the various governance modules of Spring Cloud Alibaba will be used to replace the functions of the Envoy Proxy.**

### Demostration

The following are some simple examples of security governance rule configurations:

#### **IP Blocks**

The following command is used to deliver an security governance rule to the demo application through Istio. This rule restricts the source IP addresses that can access the application:

```yml
kubectl apply -f - << EOF
apiVersion: security.istio.io/v1beta1
kind: AuthorizationPolicy
metadata:
  name: from-ip-allow
  namespace: ${namespace_name}
spec:
  selector:
    matchLabels:
      app: ${app_name}
  action: DENY
  rules:
  - from:
    - source:
        ipBlocks: ["127.0.0.1"]
EOF
```

You can validate the rules by sending request to the auth interface of this demo:

```shell
$ curl --location --request GET '${demo_ip}/auth'
```

In this example, if the source IP of the request is 127.0.0.1, then the application returns:

```
Auth failed, please check the request and auth rule
```

This indicates that the request is denied.
If the source IP of the request is not '127.0.0.1', then the application returns:

```
received request from ${from_ip}, local addr is ${local_ip}, local host is ${local_host}, request path is/auth
```

It indicates that the request has been authenticated by application and some meta data of the request will be returned.

After that, we delete the security governance rule for the IP Blocks:

```shell
$ kubectl delete AuthorizationPolicy from-ip-allow -n ${namespace_name}
```

Then request the auth interface of this demo again, we can find that the application will return the following message because the security governance rule has been deleted:

```
received request from ${from_ip}, local addr is ${local_ip}, local host is ${local_host}, request path is/auth
```

#### **Request Header security governance**

We use the following command to deliver an security governance rule to the demo application through Istio. This rule restricts the request header for accessing the application:

```yml
kubectl apply -f - << EOF
apiVersion: security.istio.io/v1beta1
kind: AuthorizationPolicy
metadata:
  name: http-headers-allow
  namespace: ${namespace_name}
spec:
  selector:
    matchLabels:
      app: ${app_name}
  action: ALLOW
  rules:
  - when:
    - key: request.headers[User-Agent]
      values: ["PostmanRuntime/*"]
EOF
```

Then send a HTTP request with a user-agent header to verify whether the rule is valid:

```shell
$ curl --location --request GET '${demo_ip}/auth' \
--header 'User-Agent: PostmanRuntime/7.29.2'
```

Since this request carries a correct HTTP Header, it will return:

```
received request from ${from_ip}, local addr is ${local_ip}, local host is ${local_host}, request path is/auth
```

Then send a HTTP request without a user-agent header to verify whether the rule is valid:

```shell
$ curl --location --request GET '${demo_ip}/auth'
```

Since this request don't carry a correct HTTP Header, it will return:

```
Auth failed, please check the request and auth rule
```

After that, we remove the rule for requests header security governance:

```shell
$ kubectl delete AuthorizationPolicy http-headers-allow -n ${namespace_name}
```

Then request the auth interface of this demo again, we can find that the application will return the following message because the security governance rule has been deleted:

```
received request from ${from_ip}, local addr is ${local_ip}, local host is ${local_host}, request path is/auth
```

#### JWT security governance

We use the following command to deliver an security governance rule to the demo application through Istio. This rule restricts the JWT token value that must be carried to access the application:

```yml
kubectl apply -f - <<EOF
apiVersion: security.istio.io/v1beta1
kind: Requestsecurity governance
metadata:
  name: jwt-jwks-uri
  namespace: ${namespace_name}
spec:
  selector:
    matchLabels:
      app: ${app_name}
  jwtRules:
  - issuer: testing@secure.istio.io
    jwksUri: https://raw.githubusercontent.com/istio/istio/release-1.5/security/tools/jwt/samples/jwks.json
EOF
```

A Http request with a correct JWT token is then sent to verify that the rule is valid:

```shell
$ curl --location --request GET '${demo_ip}/auth' \
--header 'Authorization: Bearer eyJhbGciOiJSUzI1NiIsImtpZCI6IkRIRmJwb0lVcXJZOHQyenBBMnFYZkNtcjVWTzVaRXI0UnpIVV8tZW52dlEiLCJ0eXAiOiJKV1QifQ.eyJleHAiOjQ2ODU5ODk3MDAsImZvbyI6ImJhciIsImlhdCI6MTUzMjM4OTcwMCwiaXNzIjoidGVzdGluZ0BzZWN1cmUuaXN0aW8uaW8iLCJzdWIiOiJ0ZXN0aW5nQHNlY3VyZS5pc3Rpby5pbyJ9.CfNnxWP2tcnR9q0vxyxweaF3ovQYHYZl82hAUsn21bwQd9zP7c-LS9qd_vpdLG4Tn1A15NxfCjp5f7QNBUo-KC9PJqYpgGbaXhaGx7bEdFWjcwv3nZzvc7M__ZpaCERdwU7igUmJqYGBYQ51vr2njU9ZimyKkfDe3axcyiBZde7G6dabliUosJvvKOPcKIWPccCgefSj_GNfwIip3-SsFdlR7BtbVUcqR-yv-XOxJ3Uc1MI0tz3uMiiZcyPV7sNCU4KRnemRIMHVOfuvHsU60_GhGbiSFzgPTAa9WTltbnarTbxudb_YEOx12JiwYToeX0DCPb43W1tzIBxgm8NxUg'
```

Since this request carries a correct JWT token, it will return:

```
received request from ${from_ip}, local addr is ${local_ip}, local host is ${local_host}, request path is/auth
```

A Http request with an invalid JWT token is then sent to verify that the rule is valid:

```shell
$ curl --location --request GET '${demo_ip}/auth' \
--header 'Authorization: Bearer invalid token'
```

Since this request carries a invalid JWT token, it will return:

```
Auth failed, please check the request and auth rule
```

After that, we remove the rule for JWT security governance:

```shell
$ kubectl delete Requestsecurity governance jwt-jwks-uri -n ${namespace_name}
```

Then request the auth interface of this demo again, we can find that the application will return the following message because the security governance rule has been deleted:

```
received request from ${from_ip}, local addr is ${local_ip}, local host is ${local_host}, request path is/auth
```
