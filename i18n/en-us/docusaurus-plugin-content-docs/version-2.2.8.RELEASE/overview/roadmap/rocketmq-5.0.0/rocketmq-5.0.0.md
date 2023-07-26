---
title: RocketMQ 5.0 adaptation
keywords: [Spring Cloud Alibaba]
description: Spring Cloud Alibaba, Roadmap Rocket-5.0.0.
---

### New features of RocketMQ 5.0

<p align="center">
<img src="https://sca-storage.oss-cn-hangzhou.aliyuncs.com/website/image%20%282%29.png" />
</p>

### 1. Cloud-native infrastructure

<p align="center">
<img src="https://sca-storage.oss-cn-hangzhou.aliyuncs.com/website/image%20%281%29.png" />
</p>

### 2. Lightweight API and multilingual integration

RocketMQ 5.0 launched a new multi-language SDK based on gRPC. The new SDK simplifies complexity, is lighter, and is easier to use and integrate.
In version 5.0, the maven coordinates of the officially recommended Java Client are:

```xml
<dependencies>
     <dependency>
         <groupId>org.apache.rocketmq</groupId>
         <artifactId>rocketmq-client-java</artifactId>
         <version>5.0.0</version>
     </dependency>
</dependencies>
```

In version 4.9, the maven coordinates are:

```xml
<dependencies>
     <dependency>
         <groupId>org.apache.rocketmq</groupId>
         <artifactId>rocketmq-client</artifactId>
         <version>4.9.4</version>
     </dependency>
</dependencies>
```

At first glance, it can be seen that the artifact ID has changed. After a little research, you can find:
In RocketMQ 5.0, in order to unify clients in all languages, a Github repository https://github.com/apache/rocketmq-clients is maintained separately for developing multilingual clients, including Java, Golang, Cpp, Rust and other languages.


In the RocketMQ 4.x version, the Java language still uses the client module in the RocketMQ main warehouse as the client.
That is to say, in RocketMQ 5.0, the Java client has undergone tremendous changes, achieving the purpose of simplifying, lightweight, and unifying with other language functions.
Then in Spring Cloud Alibaba, we will also consider using the new version of Java Client as the underlying implementation to update the relevant code.

- **Consumer**

     In the new version of Java Client, three Consumer types are provided:

     <p align="center">
     <img src="https://sca-storage.oss-cn-hangzhou.aliyuncs.com/website/image%20%283%29.png" />
     </p>

     Among them, SimpleConsumer is a newly added consumer interface, which provides more flexible custom configuration.

     We can consider connecting the latest version of Java Client in Spring Cloud Alibaba and supporting the corresponding Consumer type.
     For details, please refer to: https://rocketmq.apache.org/zh/docs/featureBehavior/06consumertype

- **Provider**

     Correspondingly, the interface of Producer has also changed,

     <p align="center">
     <img src="https://sca-storage.oss-cn-hangzhou.aliyuncs.com/website/image%20%284%29.png" />
     </p>

     The implementation of Producer can also be modified according to the latest interface.


### 3. Event and stream processing scene integration

In terms of computing framework, RocketMQ 5.0 introduces a set of lightweight stream processing framework RSteams. RStreams has less dependencies, is easy to deploy, and can be scaled out arbitrarily. It can use RocketMQ resources to complete lightweight data processing and calculations.
Github: https://github.com/apache/rocketmq-streams
rocketmq-stream implements a series of advanced APIs, allowing users to easily write stream computing programs to meet their business needs.

We know that Spring Cloud Alibaba integrates RocketMQ through Spring Cloud Stream. Here we can consider creating a new binder to integrate rocketmq-streams. For specific integration, please refer to Spring Cloud Stream's official integration of kafka-streams.

<p align="center">
<img src="https://sca-storage.oss-cn-hangzhou.aliyuncs.com/website/image%20%285%29.png" />
</p>

Reference: https://github.com/spring-cloud/spring-cloud-stream#apache-kafka-streams-binder

### Adaptation plan

1. The provider client upgrade plan needs to be further determined.
2. It needs to be further confirmed that the Consumer client supports the SimpleConsumer solution.
3. Whether rocketmq-streams supports stream time processing and the form of support needs to be discussed within the interest group and community core.