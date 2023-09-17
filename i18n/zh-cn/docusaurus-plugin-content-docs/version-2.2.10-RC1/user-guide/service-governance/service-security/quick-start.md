---
title: 快速开始
keywords: [Spring Cloud Alibaba]
description: Service Security.
---

# 快速开始

本节主要演示如何使用 Istio 下发安全治理配置到 Spring Cloud Alibaba (下文简称：SCA)并对应用做安全治理。SCA 安全治理模块同时支持对 Spring MVC 以及 Spring WebFlux 两种常用框架做安全治理。

## 准备

### 安装 K8s 环境

请参考 K8s 的[安装工具](https://kubernetes.io/zh-cn/docs/tasks/tools/)小节。

### 在 K8s 上安装并启用 Istio

请参考 Istio 官方文档的[安装](https://istio.io/latest/zh/docs/setup/install/)小节。

## 示例

### 如何接入

在启动示例进行演示之前，先了解一下应用如何接入 Istio 并提供安全治理功能。 注意 本章节只是为了便于理解接入方式，本示例代码中已经完成接入工作，您无需再进行修改。

1. 修改 pom.xml 文件，引入 Istio 规则 Adapter 以及 SCA 安全治理模块:

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

2. 在应用的 `src/main/resources/application.yml` 配置文件中配置 Istio 相关元数据:

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

**注：您部署的应用所在的 pod 不需要被 Istio 执行自动注入，因为 SCA 的各个治理模块将会被用来替代 Envoy Proxy 的各种功能。**

### 效果演示

下面给出几个简单的安全治理规则配置的示例:

#### **IP 黑白名单**

使用如下命令通过 Istio 下发一条安全治理规则至 demo 应用，这条规则限制了访问该应用的来源 IP:

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

可以通过请求本 demo 的 auth 接口来验证规则是否生效:

```shell
$ curl --location --request GET '${demo_ip}/auth'
```

在本例中，若请求的来源 IP 为 `127.0.0.1` ，则本应用返回:

```shell
Auth failed, please check the request and auth rule
```

说明此请求被拒绝。
若请求的来源 IP 不为 `127.0.0.1` ，则本应用返回:

```shell
received request from ${from_ip}, local addr is ${local_ip}, local host is ${local_host}, request path is/auth
```

说明通过了 SCA 的鉴权，将会返回此请求的一些元信息。

在此之后，删除这条 IP 黑白名单的安全治理规则:

```shell
$ kubectl delete AuthorizationPolicy from-ip-allow -n ${namespace_name}
```

之后再次请求本 demo 的 auth 接口，可以发现，因为安全治理规则已被删除，所以本应用将会返回:

```shell
received request from ${from_ip}, local addr is ${local_ip}, local host is ${local_host}, request path is/auth
```

#### **请求头认证**

使用如下命令通过 Istio 下发一条安全治理规则至 demo 应用，这条规则的限制了访问该应用的请求 header:

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

之后发送一个带 User-Agent 头部的 HTTP 请求来验证规则是否生效:

```shell
$ curl --location --request GET '${demo_ip}/auth' \
--header 'User-Agent: PostmanRuntime/7.29.2'
```

由于此请求携带了正确的 HTTP Header 信息，将会返回:

```shell
received request from ${from_ip}, local addr is ${local_ip}, local host is ${local_host}, request path is/auth
```

之后发送一个不带 User-Agent 头部的 HTTP 请求来验证规则是否生效:

```shell
$ curl --location --request GET '${demo_ip}/auth'
```

由于此请求没有携带正确的 HTTP Header 信息，将会返回:

```shell
Auth failed, please check the request and auth rule
```

在此之后，删除这条请求头认证的规则:

```shell
$ kubectl delete AuthorizationPolicy http-headers-allow -n ${namespace_name}
```

之后再次请求本 demo 的 auth 接口，可以发现，因为安全治理规则已被删除，所以本应用将会返回:

```
received request from ${from_ip}, local addr is ${local_ip}, local host is ${local_host}, request path is/auth
```

#### **JWT 认证**

使用如下命令通过 Istio 下发一条安全治理规则至 demo 应用，这条规则限制了访问该应用需要携带的 JWT token value:

```yml
kubectl apply -f - <<EOF
apiVersion: security.istio.io/v1beta1
kind: RequestAuthentication
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

之后发送一个带正确 JWT token 的 HTTP 请求来验证规则是否生效:

```shell
$ curl --location --request GET '${demo_ip}/auth' \
--header 'Authorization: Bearer eyJhbGciOiJSUzI1NiIsImtpZCI6IkRIRmJwb0lVcXJZOHQyenBBMnFYZkNtcjVWTzVaRXI0UnpIVV8tZW52dlEiLCJ0eXAiOiJKV1QifQ.eyJleHAiOjQ2ODU5ODk3MDAsImZvbyI6ImJhciIsImlhdCI6MTUzMjM4OTcwMCwiaXNzIjoidGVzdGluZ0BzZWN1cmUuaXN0aW8uaW8iLCJzdWIiOiJ0ZXN0aW5nQHNlY3VyZS5pc3Rpby5pbyJ9.CfNnxWP2tcnR9q0vxyxweaF3ovQYHYZl82hAUsn21bwQd9zP7c-LS9qd_vpdLG4Tn1A15NxfCjp5f7QNBUo-KC9PJqYpgGbaXhaGx7bEdFWjcwv3nZzvc7M__ZpaCERdwU7igUmJqYGBYQ51vr2njU9ZimyKkfDe3axcyiBZde7G6dabliUosJvvKOPcKIWPccCgefSj_GNfwIip3-SsFdlR7BtbVUcqR-yv-XOxJ3Uc1MI0tz3uMiiZcyPV7sNCU4KRnemRIMHVOfuvHsU60_GhGbiSFzgPTAa9WTltbnarTbxudb_YEOx12JiwYToeX0DCPb43W1tzIBxgm8NxUg'

```

由于此请求由于携带了正确的 JWT token 信息，将会返回:

```shell
received request from ${from_ip}, local addr is ${local_ip}, local host is ${local_host}, request path is/auth
```

之后再发送一个带错误 JWT token 的 HTTP 请求:

```shell
$ curl --location --request GET '${demo_ip}/auth' \
--header 'Authorization: Bearer invalid token'
```

由于此请求没有携带正确的 JWT token 信息，将会返回:

```shell
Auth failed, please check the request and auth rule
```

在此之后，删除这条 JWT 认证的规则:

```shell
$ kubectl delete RequestAuthentication jwt-jwks-uri -n ${namespace_name}
```

之后再次请求本 demo 的 auth 接口，可以发现，因为安全治理规则已被删除，所以本应用将会返回:

```shell
received request from ${from_ip}, local addr is ${local_ip}, local host is ${local_host}, request path is/auth
```
