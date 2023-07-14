---
title: "Quick Start"
keywords: [Spring Cloud Alibaba,Sidecar]
description: Sidecar, Quick Start.
---

This section demonstrates how to use Spring Cloud Alibaba Sidecar to access heterogeneous micro-services written in a non-Java language.

## Use requirements

- [Must] Your heterogeneous microservice needs to communicate using HTTP. This is not strictly a requirement because the Spring Cloud itself is based on HTTP;

- [Optional] If sidecar.health-check-url is configured for the micro service, the health check is enabled. In this case, your heterogeneous micro service needs to implement the health check.

## Preparation work

### Download and start Nacos Server

Before adding Sidecar, start the Nacos Server.

1. Download and decompress the Nacos binary file;

2. Start the Nacos Server;

    After downloading and decompressing, we need to enter the bin directory to start nacos service. Do not double-click to start NACos service. By default, double-click to start NACos service will be started in cluster mode.

    ```shell
    $ startup.cmd -m standalone
    ```

3. Log in to Nacos.

    If we go to the browser and type localhost:8848/nacos, we can see that Nacos provides the console interface username and password are both nacos/nacos.

### Introduce dependencies

Introduce the following dependencies into the Spring Boot project that has been created:

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

### Prepare heterogeneous services

> Note:
>
> This example provides a NodeJS service. Node.js needs to be installed in the local environment to start the Node service and experience the Sidecar function!

```javascript
var http = require('http');
var url = require("url");
var path = require('path');

// create server
var server = http.createServer(function(req, res) {
    // Get the path to the request
    var pathname = url.parse(req.url).pathname;
    res.writeHead(200, { 'Content-Type' : 'application/json; charset=utf-8' });
    // Visit http://localhost:8060/ and {"index":" Welcome to Home page "}
    if (pathname === '/') {
        res.end(JSON.stringify({ "index" : "Welcome to the home page" }));
    }
    // Visit http://localhost:8060/health, will return to {" status ":" UP "}
    else if (pathname === '/health.json') {
        res.end(JSON.stringify({ "status" : "UP" }));
    }
    // In other cases, 404 is returned
    else {
        res.end("404");
    }
});
// Create a listener and print a log
server.listen(8060, function() {
    console.log('listening on localhost:8060');
});
```

### Write the relevant configuration

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
  # IP address of the heterogeneous microservice
  ip: 127.0.0.1
  # Port of the heterogeneous microservice
  port: 8060
  # Health check URL for heterogeneous microservices
  health-check-url: http://localhost:8060/health.json
management:
endpoint:
    health:
      show-details: always
```
### Start service and test

View heterogeneous services on the Nacos console:

![nacos-sidecar-service](https://camo.githubusercontent.com/7e83efe854ab9dafc306daea8bc4281e05e2c69e4481a7c474d535ddabc1b621/68747470733a2f2f63646e2e6e6c61726b2e636f6d2f79757175652f302f323032322f706e672f313735323238302f313636323534383332343333372d35363663633832342d346430382d343034312d616338332d3139363863373334376139652e706e67)

Access heterogeneous services:

Browser to access http://127.0.0.1:8070/node-service/health.json to transfer general principles of the integration of success.

Spring Cloud Alibaba Sidecar Example reference: [Spring Cloud Alibaba Sidecar Example](https://github.com/alibaba/spring-cloud-alibaba/tree/2022.x/spring-cloud-alibaba-examples/spring-cloud-alibaba-sidecar-examples/spring-cloud-alibaba-sidecar-nacos-example)

For more advanced Sidecar features and how to use them, see the Sidecar Advanced Guide section!