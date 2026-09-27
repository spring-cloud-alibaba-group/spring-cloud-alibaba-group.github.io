---
title: 快速开始
keywords: [Spring Cloud Alibaba, Sentinel]
description: Quick Start, Sentinel.
---

本章节将演示如何使用 Spring Cloud Alibaba 中提供的开箱即用的 Sentinel 限流降级能力为 Spring Cloud 应用提供高可用防护。

## 接入 Sentinel

在 pom.xml 文件中引入 group ID 为 com.alibaba.cloud 和 artifact ID 为 spring-cloud-starter-alibaba-sentinel 的 starter 依赖：

```xml
<dependency>
    <groupId>com.alibaba.cloud</groupId>
    <artifactId>spring-cloud-starter-alibaba-sentinel</artifactId>
</dependency>
```

下面这个例子就是一个最简单的使用 Sentinel 的例子:

```java
@SpringBootApplication
public class Application {

    public static void main(String[] args) {
        SpringApplication.run(ServiceApplication.class, args);
    }
}
@RestController
public class TestController {

    @GetMapping(value = "/hello")
    @SentinelResource("hello")
    public String hello() {
        return "Hello Sentinel";
    }
}
```

@SentinelResource 注解用来标识资源是否被限流、降级。上述例子上该注解的属性 hello 表示资源名。 @SentinelResource 还提供了其它额外的属性如 blockHandler，blockHandlerClass，fallback 用于表示限流或降级的操作，更多内容可以参考 [Sentinel 注解支持](https://github.com/alibaba/Sentinel/wiki/%E6%B3%A8%E8%A7%A3%E6%94%AF%E6%8C%81)。
