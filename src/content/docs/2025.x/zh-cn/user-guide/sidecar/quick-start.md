---
title: 快速开始
keywords: [Spring Cloud Alibaba, Sidecar]
description: Sidecar,Quick Start.
---

本章节演示如何使用 spring-cloud-starter-alibaba-sidecar 来接入非 Java 语言编写的异构微服务。

## 使用要求

- 【必须】异构微服务需使用 HTTP 通信。这一点严格来说不算要求，因为 Spring Cloud 本身就是基于 HTTP 的。

- 【可选】如果微服务配置了 sidecar.health-check-url ，则表示开启健康检查，此时，异构微服务需实现健康检查（可以是空实现，只要暴露一个端点，返回类似 {"status": "UP"} 的字符串即可）。

## 准备工作

### 启动 Nacos Server

在接入 spring-cloud-starter-alibaba-sidecar 之前，首先需要启动 Nacos Server。

1. 下载 Nacos 二进制文件 并解压；

2. 启动 Nacos Server；

   下载解压后 我们需要进入到 bin 目录启动 Nacos 服务，一定不要双击启动，双击默认会以集群方式启动，示例只需以单机方式启动即可。

   ```shell
   $ startup.cmd -m standalone
   ```

3. 登录 Nacos。

在浏览器地址栏中输入 localhost:8848/nacos 可以看到 Nacos 提供的控制台界面 **（用户名和密码都是 nacos/nacos）**。

### 引入依赖

在已经创建的 Spring Boot 项目中引入如下依赖：

```xml
<dependency>
    <groupId>org.springframework.cloud</groupId>
    <artifactId>spring-cloud-starter-gateway</artifactId>
</dependency>

<dependency>
    <groupId>com.alibaba.cloud</groupId>
    <artifactId>spring-cloud-starter-alibaba-sidecar</artifactId>
</dependency>

<dependency>
    <groupId>com.alibaba.cloud</groupId>
    <artifactId>spring-cloud-starter-alibaba-nacos-discovery</artifactId>
</dependency>
```

### 准备异构服务

> Note:
>
> 本示例提供一个 NodeJS 服务。本地环境需要安装 Node.js 以正常启动 Node 服务，体验 spring-cloud-starter-alibaba-sidecar 功能！

```javascript title="异构微服务代码"
var http = require("http");
var url = require("url");
var path = require("path");

// 创建server
var server = http.createServer(function (req, res) {
  // 获得请求的路径
  var pathname = url.parse(req.url).pathname;
  res.writeHead(200, { "Content-Type": "application/json; charset=utf-8" });
  // 访问http://localhost:8060/，将会返回{"index":"欢迎来到首页"}
  if (pathname === "/") {
    res.end(JSON.stringify({ index: "欢迎来到首页" }));
  }
  // 访问http://localhost:8060/health，将会返回{"status":"UP"}
  else if (pathname === "/health.json") {
    res.end(JSON.stringify({ status: "UP" }));
  }
  // 其他情况返回404
  else {
    res.end("404");
  }
});
// 创建监听，并打印日志
server.listen(8060, function () {
  console.log("listening on localhost:8060");
});
```

### 编写相关配置

```yaml
server:
  port: 8070
spring:
  cloud:
    nacos:
      discovery:
        server-addr: localhost:8848
    gateway:
      discovery:
        locator:
          enabled: true
  application:
    name: node-service
sidecar:
  # 异构微服务的IP
  ip: 127.0.0.1
  # 异构微服务的端口
  port: 8060
  # 异构微服务的健康检查URL
  health-check-url: http://localhost:8060/health.json
management:
endpoint:
  health:
    show-details: always
```

### 启动服务并测试

在 Nacos 控制台上查看异构服务：

![nacos-sidecar-service](https://camo.githubusercontent.com/7e83efe854ab9dafc306daea8bc4281e05e2c69e4481a7c474d535ddabc1b621/68747470733a2f2f63646e2e6e6c61726b2e636f6d2f79757175652f302f323032322f706e672f313735323238302f313636323534383332343333372d35363663633832342d346430382d343034312d616338332d3139363863373334376139652e706e67)

访问异构服务：

请求 http://127.0.0.1:8070/node-service/health.json 地址，显示服务健康检查信息则说明整合成功。

```shell
$ curl http://127.0.0.1:8070/node-service/health.json
```

响应结果：

```json
{
  "status": "UP"
}
```

spring-cloud-starter-alibaba-sidecar 示例项目源码参考：[示例项目](https://github.com/alibaba/spring-cloud-alibaba/tree/2022.x/spring-cloud-alibaba-examples/spring-cloud-alibaba-sidecar-examples/spring-cloud-alibaba-sidecar-nacos-example)

有关更多 spring-cloud-starter-alibaba-sidecar 高级特性和使用方法，请参看异构服务进阶指南章节
