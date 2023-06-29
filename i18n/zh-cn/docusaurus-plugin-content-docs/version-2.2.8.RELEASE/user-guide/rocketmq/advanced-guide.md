---
title: 进阶指南
keywords: [Spring Cloud Alibaba]
description: Advanced, rocketmq, Guide.
---

本章节展示 Spring Cloud Alibaba RocketMQ Binder 的实现和 RocketMQ 相关配置的高级特性和进阶用法。

## Spring Cloud Alibaba RocketMQ Binder 实现
### Spring Cloud Stream RocketMQ Binder 的实现架构:
![](https://img.alicdn.com/tfs/TB1v8rcbUY1gK0jSZFCXXcwqXXa-1236-773.png)

RocketMQ Binder 的重构优化去除了对 [RocketMQ-Spring](https://github.com/apache/rocketmq-spring) 框架的依赖 。 RocketMQ Binder 核心类 `RocketMQMessageChannelBinder` 实现了 Spring Cloud Stream 规范，内部会构建 [RocketMQInboundChannelAdapter](https://github.com/alibaba/spring-cloud-alibaba/blob/rocketmq/spring-cloud-alibaba-starters/spring-cloud-starter-stream-rocketmq/src/main/java/com/alibaba/cloud/stream/binder/rocketmq/integration/inbound/RocketMQInboundChannelAdapter.java) 和 [RocketMQProducerMessageHandler](https://github.com/alibaba/spring-cloud-alibaba/blob/rocketmq/spring-cloud-alibaba-starters/spring-cloud-starter-stream-rocketmq/src/main/java/com/alibaba/cloud/stream/binder/rocketmq/integration/outbound/RocketMQProducerMessageHandler.java)。

`RocketMQProducerMessageHandler` 会基于 Binding 配置通过 [RocketMQProduceFactory](https://github.com/alibaba/spring-cloud-alibaba/blob/rocketmq/spring-cloud-alibaba-starters/spring-cloud-starter-stream-rocketmq/src/main/java/com/alibaba/cloud/stream/binder/rocketmq/integration/outbound/RocketMQProduceFactory.java) 构造 RocketMQ Producer，其内部会把 `spring-messaging` 模块内 `org.springframework.messaging.Message` 消息类转换成 RocketMQ 的消息类 `org.apache.rocketmq.common.message.Message`，然后发送出去。

`RocketMQInboundChannelAdapter` 也会基于 Binding 配置通过 [RocketMQConsumerFactory](https://github.com/alibaba/spring-cloud-alibaba/blob/rocketmq/spring-cloud-alibaba-starters/spring-cloud-starter-stream-rocketmq/src/main/java/com/alibaba/cloud/stream/binder/rocketmq/integration/inbound/RocketMQConsumerFactory.java) 构造 `DefaultMQPushConsumer`，其内部会启动 RocketMQ Consumer 接收消息。

**NOTE** | 与 [RocketMQ-Spring](https://github.com/apache/rocketmq-spring) 框架的兼容需要手动处理

目前 Binder 支持在 `Header` 中设置相关的 key 来进行 RocketMQ Message 消息的特性设置。

比如 `TAGS`、`KEYS`、`TRANSACTIONAL_ARGS` 等 RocketMQ 消息对应的标签，详情见 [com.alibaba.cloud.stream.binder.rocketmq.constant.RocketMQConst](https://github.com/alibaba/spring-cloud-alibaba/blob/rocketmq/spring-cloud-alibaba-starters/spring-cloud-starter-stream-rocketmq/src/main/java/com/alibaba/cloud/stream/binder/rocketmq/contants/RocketMQConst.java)

```java
MessageBuilder builder = MessageBuilder.withPayload(msg)
    .setHeader(RocketMQHeaders.TAGS, "binder")
    .setHeader(RocketMQHeaders.KEYS, "my-key");
Message message = builder.build();
output().send(message);
```

或者使用 StreamBridge

```java
MessageBuilder builder = MessageBuilder.withPayload(msg)
    .setHeader(RocketMQHeaders.TAGS, "binder")
    .setHeader(RocketMQHeaders.KEYS, "my-key");
Message message = builder.build();
streamBridge.send("producer-out-0", message);
```

**NOTE** | 更多使用请参考样例: [com.alibaba.cloud.examples.SenderService](https://github.com/alibaba/spring-cloud-alibaba/blob/rocketmq/spring-cloud-alibaba-examples/rocketmq-example/rocketmq-produce-example/src/main/java/com/alibaba/cloud/examples/SenderService.java)

## 配置选项

### RocketMQ Binder Properties

#### spring.cloud.stream.rocketmq.binder.name-server  

  RocketMQ NameServer 地址(老版本使用 namesrv-addr 配置项)。  

  Default: `127.0.0.1:9876`.

#### spring.cloud.stream.rocketmq.binder.access-key

  阿里云账号 AccessKey。

  Default: `null`.

#### spring.cloud.stream.rocketmq.binder.secret-key

  阿里云账号 SecretKey。

  Default: `null`.

#### spring.cloud.stream.rocketmq.binder.enable-msg-trace

  是否为 Producer 和 Consumer 开启消息轨迹功能

  Default: `true`

#### spring.cloud.stream.rocketmq.binder.customized-trace-topic

  消息轨迹开启后存储的 topic 名称。

  Default: `RMQ_SYS_TRACE_TOPIC`.

### RocketMQ Consumer Properties

下面的这些配置是以 `spring.cloud.stream.rocketmq.bindings.<channelName>.consumer.` 为前缀的 RocketMQ Consumer 相关的配置。
更多见[com.alibaba.cloud.stream.binder.rocketmq.properties.RocketMQConsumerProperties](https://github.com/alibaba/spring-cloud-alibaba/blob/rocketmq/spring-cloud-alibaba-starters/spring-cloud-starter-stream-rocketmq/src/main/java/com/alibaba/cloud/stream/binder/rocketmq/properties/RocketMQConsumerProperties.java)。

#### enable

  是否启用 Consumer。

  默认值: `true`.

#### subscription

  Consumer 基于 TAGS 订阅，多个 tag 以 `||` 分割。更多见 `com.alibaba.cloud.stream.binder.rocketmq.properties.RocketMQConsumerProperties.subscription`

  默认值: `empty`.

#### messageModel

  Consumer 消费模式。如果想让每一个的订阅者都能接收到消息，可以使用广播模式。更多见 `org.apache.rocketmq.common.protocol.heartbeat.MessageModel`

  默认值: `CLUSTERING`.

#### consumeFromWhere

  Consumer 从哪里开始消费。更多见 `org.apache.rocketmq.common.consumer.ConsumeFromWhere`

  默认值: `CONSUME_FROM_LAST_OFFSET`.

#下面的这些配置是 Consumer Push 模式相关的配置。# `spring.cloud.stream.rocketmq.bindings.<channelName>.consumer.push.`

#### orderly

  是否同步消费消息模式

  默认值: `false`.

#### delayLevelWhenNextConsume

  异步消费消息模式下消费失败重试策略：
  * -1,不重复，直接放入死信队列
  * 0,broker 控制重试策略  
  * >0,client 控制重试策略
  
    默认值: `0`.

#### suspendCurrentQueueTimeMillis

  同步消费消息模式下消费失败后再次消费的时间间隔。

  默认值: `1000`.

其他更多参数见 `com.alibaba.cloud.stream.binder.rocketmq.properties.RocketMQConsumerProperties.Push`

#下面的这些配置是 Consumer Pull 模式相关的配置。#`spring.cloud.stream.rocketmq.bindings.<channelName>.consumer.pull.`

#### pullThreadNums

  消费时拉取的线程数

  默认值: `20`.

#### pollTimeoutMillis

  拉取时的超时毫秒数

  默认值: `1000 * 5`.

其他更多参数见 `com.alibaba.cloud.stream.binder.rocketmq.properties.RocketMQConsumerProperties.Pull`.

**NOTE** |  更多参数见 [com.alibaba.cloud.stream.binder.rocketmq.properties.RocketMQConsumerProperties](https://github.com/alibaba/spring-cloud-alibaba/blob/rocketmq/spring-cloud-alibaba-starters/spring-cloud-starter-stream-rocketmq/src/main/java/com/alibaba/cloud/stream/binder/rocketmq/properties/RocketMQConsumerProperties.java)

### RocketMQ Provider Properties

下面的这些配置是以 `spring.cloud.stream.rocketmq.bindings.<channelName>.producer.` 为前缀的 RocketMQ Producer 相关的配置。更多见 [com.alibaba.cloud.stream.binder.rocketmq.properties.RocketMQProducerProperties](https://github.com/alibaba/spring-cloud-alibaba/blob/rocketmq/spring-cloud-alibaba-starters/spring-cloud-starter-stream-rocketmq/src/main/java/com/alibaba/cloud/stream/binder/rocketmq/properties/RocketMQProducerProperties.java)

#### enable

  是否启用 Producer。

  默认值: `true`.

#### group

  Producer group name。

  默认值: `empty`.

#### maxMessageSize

  消息发送的最大字节数。

  默认值: `8249344`.

#### producerType
  消息生产者类型，普通或者事务。更多见 
  `com.alibaba.cloud.stream.binder.rocketmq.properties.RocketMQProducerProperties.ProducerType`.

  默认值: `Normal`.

#### transactionListener

事务消息监听器的beanName，在 `producerType=Trans` 时才有效；必须是实现 `org.apache.rocketmq.client.producer.TransactionListener` 接口的Spring Bean。

#### sendType

消息发送类型（同步、异步、单向）。更多见`com.alibaba.cloud.stream.binder.rocketmq.properties.RocketMQProducerProperties.SendType`.

默认值: `Sync`.

#### sendCallBack

消息发送后回调函数的beanName，在 `sendType=Async` 时才有效；必须是实现 `org.apache.rocketmq.client.producer.SendCallback` 接口的Spring Bean。

#### vipChannelEnabled

是否在 Vip Channel 上发送消息。

默认值: `true`.

#### sendMessageTimeout

发送消息的超时时间(毫秒)。

默认值: `3000`.

#### compressMessageBodyThreshold

消息体压缩阀值(当消息体超过 4k 的时候会被压缩)。

默认值: `4096`.

#### retryTimesWhenSendFailed

在同步发送消息的模式下，消息发送失败的重试次数。

默认值: `2`.

#### retryTimesWhenSendAsyncFailed

在异步发送消息的模式下，消息发送失败的重试次数。

默认值: `2`.

#### retryAnotherBroker

消息发送失败的情况下是否重试其它的 broker。

默认值: `false`.

**NOTE** | 生产者其他更多参数请见：[com.alibaba.cloud.stream.binder.rocketmq.properties.RocketMQProducerProperties](https://github.com/alibaba/spring-cloud-alibaba/blob/rocketmq/spring-cloud-alibaba-starters/spring-cloud-starter-stream-rocketmq/src/main/java/com/alibaba/cloud/stream/binder/rocketmq/properties/RocketMQProducerProperties.java)

