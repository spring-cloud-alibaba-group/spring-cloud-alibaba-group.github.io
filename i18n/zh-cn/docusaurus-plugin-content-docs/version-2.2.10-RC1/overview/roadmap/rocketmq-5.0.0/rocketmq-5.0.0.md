---
title: RocketMQ 5.0 适配
keywords: [Spring Cloud Alibaba]
description: Spring Cloud Alibaba, Roadmap Rocket-5.0.0.
---

### RocketMQ 5.0 新版特性

<p align="center">
<img src="https://sca-storage.oss-cn-hangzhou.aliyuncs.com/website/image%20%282%29.png" />
</p>

### 1. 基础架构云原生化

<p align="center">
<img src="https://sca-storage.oss-cn-hangzhou.aliyuncs.com/website/image%20%281%29.png" />
</p>

### 2. 轻量 API 和多语言集成

RocketMQ 5.0 推出了基于 gRPC 全新的多语言 SDK，新的 SDK 化繁为简，更轻量级，也更容易被使用和集成。
在 5.0 版本中，官方推荐的 Java Client 的 maven 坐标为：

```xml
<dependecncies>
    <dependency>
        <groupId>org.apache.rocketmq</groupId>
        <artifactId>rocketmq-client-java</artifactId>
        <version>5.0.0</version>
    </dependency>
</dependecncies>
```

而在 4.9 版本中，maven 坐标为：

```xml
<dependecncies>
    <dependency>
        <groupId>org.apache.rocketmq</groupId>
        <artifactId>rocketmq-client</artifactId>
        <version>4.9.4</version>
    </dependency>
</dependecncies>
```

第一眼可以发现，制品 ID 都发生了变化。稍微研究下，可以发现：
在 RocketMQ 5.0 中，为了统一所有语言的客户端，单独维护了一个 Github 仓库 https://github.com/apache/rocketmq-clients 用于开发多语言客户端，其中包括了 Java，Golang，Cpp、Rust 等语言。

而在 RocketMQ 4.x 版本中，Java 语言还是用的 RocketMQ 主仓库中的 client 模块作为 client。
也就是说在 RocketMQ 5.0 中，Java 客户端发生了非常巨大的变化，达到了化繁为简，轻量级，与其他语言功能统一的目的。
那么在 Spring Cloud Alibaba 中，我们也会考虑使用新版的 Java Client 作为底层实现，对相关代码进行更新。

- **Consumer**

  新版的 Java Client 中，提供了三种 Consumer 类型：

    <p align="center">
    <img src="https://sca-storage.oss-cn-hangzhou.aliyuncs.com/website/image%20%283%29.png" />
    </p>

  其中 SimpleConsumer 是新添加的消费者接口，提供了更灵活的自定义配置。

  我们可以考虑在 Spring Cloud Alibaba 中，接入最新版的 Java Client，并支持相应的 Consumer 类型。
  具体可以参考：https://rocketmq.apache.org/zh/docs/featureBehavior/06consumertype

- **Provider**

  相应的，Producer 的接口也发生了改变，

    <p align="center">
    <img src="https://sca-storage.oss-cn-hangzhou.aliyuncs.com/website/image%20%284%29.png" />
    </p>

  Producer 的实现，也可以根据最新的接口，做出相应的修改。

### 3. 事件、流处理场景集成

在计算框架方面，RocketMQ 5.0 引入了一套轻量级流式处理框架 RSteams。RStreams 依赖少、部署简单，可任意横向扩展，利用 RocketMQ 资源即可完成轻量级的数据处理和计算。
Github: https://github.com/apache/rocketmq-streams
rocketmq-stream 实现了一系列高级的 API，可以让用户很方便的编写流计算的程序，实现自己的业务需求。

我们知道 Spring Cloud Alibaba 中通过 Spring Cloud Stream 来集成 RocketMQ，这里我们可以考虑创建一个新的 binder，对 rocketmq-streams 也进行集成。具体的集成可以参考 Spring Cloud Stream 官方对 kafka-streams 的集成。

<p align="center">
<img src="https://sca-storage.oss-cn-hangzhou.aliyuncs.com/website/image%20%285%29.png" />
</p>

参考：https://github.com/spring-cloud/spring-cloud-stream#apache-kafka-streams-binder

### 适配计划

1. Provider 客户端升级方案需要进一步确定。
2. Consumer 客户端支持 SimpleConsumer 方案需要进一步确定。
3. rocketmq-streams 是否支持流时间处理以及支持的形式需要在兴趣小组和社区核心内部讨论。
