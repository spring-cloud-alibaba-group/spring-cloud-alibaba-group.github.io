---
title: "Quick Start"
keywords: [Spring Cloud Alibaba, Sentinel]
description: Quick Start, Sentinel.
---

This chapter will demonstrate how to use the out-of-the-box Sentinel current limiting and downgrading capabilities provided by Spring Cloud Alibaba to provide high-availability protection for Spring Cloud applications.

## Access Sentinel

Introduce the starter dependency whose group ID is com.alibaba.cloud and artifact ID is spring-cloud-starter-alibaba-sentinel in the pom.xml file:

```xml
<dependency>
     <groupId>com.alibaba.cloud</groupId>
     <artifactId>spring-cloud-starter-alibaba-sentinel</artifactId>
</dependency>
```

The following example is the simplest example of using Sentinel:

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

The @SentinelResource annotation is used to identify whether the resource is limited or downgraded. The attribute hello of the annotation in the above example represents the resource name. @SentinelResource also provides other additional attributes such as blockHandler, blockHandlerClass, and fallback to represent current limiting or downgrading operations. For more information, please refer to [Sentinel Annotation Support](https://github.com/alibaba/Sentinel/wiki/%E6%B3%A8%E8%A7%A3%E6%94%AF%E6%8C%81).