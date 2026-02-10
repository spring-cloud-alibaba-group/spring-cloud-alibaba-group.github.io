---
title: 概述
keywords: [Spring Cloud Alibaba]
description: RocketMQ, overview.
---

## RocketMQ 介绍

[RocketMQ](https://rocketmq.apache.org/) 是一款开源的分布式消息系统，**基于高可用分布式集群技术，提供低延时的、高可靠的消息发布与订阅服务**。同时，广泛应用于多个领域，包括异步通信解耦、企业解决方案、金融支付、电信、电子商务、快递物流、广告营销、社交、即时通信、移动应用、手游、视频、物联网、车联网等。

具有以下特点：

- 能够保证严格的消息顺序；

- 提供丰富的消息拉取模式；

- 高效的订阅者水平扩展能力；

- 实时的消息订阅机制；

- 亿级消息堆积能力。

在介绍 spring-cloud-starter-stream-rocketmq 之前，先了解一下 Spring Cloud Stream。

## Spring Cloud Stream 介绍

Spring Cloud Stream 是一个用于构建基于消息的微服务应用框架。它基于 Spring Boot 来创建具有生产级别的单机 Spring 应用，并且使用 Spring Integration 与 Broker 进行连接。

Spring Cloud Stream 提供了消息中间件配置的统一抽象，推出了 publish-subscribe、consumer groups、partition 这些统一的概念。

Spring Cloud Stream 内部有两个概念：Binder 和 Binding。

- Binder： 跟外部消息中间件集成的组件，用来创建 Binding，各消息中间件都有自己的 Binder 实现。

  比如 Kafka 的实现 KafkaMessageChannelBinde，RabbitMQ 的实现 RabbitMessageChannelBinder 以及 RocketMQ 的实现 RocketMQMessageChannelBinder。

- Binding： 包括 Input Binding 和 Output Binding。

Binding 在消息中间件与应用程序提供的 Provider 和 Consumer 之间提供了一个桥梁，实现了开发者只需使用应用程序的 Provider 或 Consumer 生产或消费数据即可，屏蔽了开发者与底层消息中间件的接触。

下图是 Spring Cloud Stream 的架构设计:

<p align="center">
  <img src="/img/user/rocketmq/mq-1.png" />
</p>
