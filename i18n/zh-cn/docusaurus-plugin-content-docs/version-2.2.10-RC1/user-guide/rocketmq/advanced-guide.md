---
title: 进阶指南
keywords: [Spring Cloud Alibaba]
description: Advanced, RocketMQ, Guide.
---

本章节展示 spring-cloud-statrer-stream-rocketmq 的实现和相关配置。

## Spring Cloud Stream RocketMQ Binder 的实现

### 架构实现
<p align="center">
<img src="https://img.alicdn.com/tfs/TB1v8rcbUY1gK0jSZFCXXcwqXXa-1236-773.png" />
</p>

spring-cloud-statrer-stream-rocketmq 去除了对 [RocketMQ-Spring](https://github.com/apache/rocketmq-spring) 框架的依赖 。 Spring Cloud Stream Binder 核心类 **RocketMQMessageChannelBinder** 实现了 Spring Cloud Stream 规范，内部会构建 RocketMQInboundChannelAdapter 和 RocketMQProducerMessageHandler。

**RocketMQProducerMessageHandler** 会基于 Binding 配置通过 RocketMQProduceFactory 构造 RocketMQ Producer，其内部会把 spring-messaging 模块内 org.springframework.messaging.Message 消息类转换成 RocketMQ 的消息类 org.apache.rocketmq.common.message.Message，然后发送出去。

**RocketMQInboundChannelAdapter** 也会基于 Binding 配置通过 RocketMQConsumerFactory 构造 DefaultMQPushConsumer，其内部会启动 RocketMQ Consumer 接收消息。

> **NOTE** 与 [RocketMQ-Spring](https://github.com/apache/rocketmq-spring) 框架的兼容需要手动处理。

目前 Binder 支持在 Header 中设置相关的 key 来进行 RocketMQ Message 消息的特性设置。

比如 TAGS、KEYS、TRANSACTIONAL_ARGS 等 RocketMQ 消息对应的标签，详情见 [com.alibaba.cloud.stream.binder.rocketmq.constant.RocketMQConst](https://github.com/alibaba/spring-cloud-alibaba/blob/2022.x/spring-cloud-alibaba-starters/spring-cloud-starter-stream-rocketmq/src/main/java/com/alibaba/cloud/stream/binder/rocketmq/constant/RocketMQConst.java)

```java
MessageBuilder builder = MessageBuilder.withPayload(msg)
    .setHeader(RocketMQHeaders.TAGS, "binder")
    .setHeader(RocketMQHeaders.KEYS, "my-key");
Message message = builder.build();
output().send(message);
```

或者使用 StreamBridge：

```java
MessageBuilder builder = MessageBuilder.withPayload(msg)
    .setHeader(RocketMQHeaders.TAGS, "binder")
    .setHeader(RocketMQHeaders.KEYS, "my-key");
Message message = builder.build();
streamBridge.send("producer-out-0", message);
```

> **NOTE** 更多使用请参考样例：[com.alibaba.cloud.examples.SenderService](https://github.com/alibaba/spring-cloud-alibaba/blob/rocketmq/spring-cloud-alibaba-examples/rocketmq-example/rocketmq-produce-example/src/main/java/com/alibaba/cloud/examples/SenderService.java)。

## 更多配置项参考

### 绑定器配置

关于以 spring-cloud-starter-stream-rocketmq-binder 为前缀的配置项如下所示：

配置项|key|默认值|说明  
----|----|-----|-----  
| RocketMQ NameServer 地址| spring.cloud.stream.rocketmq.binder.name-server | 127.0.0.1:9876 | 老版本使用 namesrv-addr 配置项 |
| 身份验证公钥 | spring.cloud.stream.rocketmq.binder.access-key | null | 阿里云账号 AccessKey |
| 身份验证私钥 | spring.cloud.stream.rocketmq.binder.secret-key | null | 阿里云账号 SecretKey |
| 消息轨迹功能 |spring.cloud.stream.rocketmq.binder.enable-msg-trace | true | 是否为 Producer 和 Consumer 开启消息轨迹功能 |
| topic 名称 | spring.cloud.stream.rocketmq.binder.customized-trace-topic | RMQ_SYS_TRACE_TOPIC | 消息轨迹开启后存储的 topic 名称 |

### 消息消费者配置

 关于以 spring-cloud-starter-stream-rocketmq-binder-consumer 为前缀的配置项如下所示：

配置项|key|默认值|说明  
----|----|-----|-----  
|是否启用 Consumer|spring.cloud.starter.stream.rocketmq.binder.  consumer.enable| true| |
|Consumer 基于 TAGS 订阅|spring.cloud.starter.stream.rocketmq.binder.  consumer.subscription|empty|多个 tag 以 &#124&#124 分割。更多见 [subscription](https://github.com/apache/rocketmq/blob/4.9.x/common/src/main/java/org/apache/rocketmq/common/consumer/subscription.java)。|
|Consumer 消费模式|spring.cloud.starter.stream.rocketmq.binder.  consumer.messageModel|CLUSTERING|如果想让每一个的订阅者都能接收到消息，可以使用广播模式。更多见 [MessageModel](https://github.com/apache/rocketmq/blob/4.9.x/common/src/main/java/org/apache/rocketmq/common/protocol/heartbeat/MessageModel.java)|
|Consumer 从哪里开始消费|spring.cloud.starter.stream.rocketmq.binder.  consumer.consumeFromWhere| | 更多见 [ConsumeFromWhere](https://github.com/apache/rocketmq/blob/4.9.x/common/src/main/java/org/apache/rocketmq/common/consumer/ConsumeFromWhere.java)。|

> **NOTE**   更多见  [RocketMQConsumerProperties](https://github.com/alibaba/spring-cloud-alibaba/blob/rocketmq/spring-cloud-alibaba-starters/spring-cloud-starter-stream-rocketmq/src/main/java/com/alibaba/cloud/stream/binder/rocketmq/properties/RocketMQConsumerProperties.java)。


关于以 spring-cloud-starter-stream-rocketmq-binder-consumer-push 为前缀的配置项如下所示：

配置项|key|默认值|说明  
--------------|----|--------------|-----  
是否同步消费消息模式|spring.cloud.starter.stream.rocketmq.binder.  consumer.push.pushorderly |false|
消费失败重试策略|spring.cloud.starter.stream.rocketmq.binder.  consumer.push.delayLevelWhenNextConsume|0|同步消费消息模式下。-1，不重复直接放入死信队列。0，broker 控制重试策略。0，client 控制重试策略。
消费失败后再次消费的时间间隔|spring.cloud.starter.stream.rocketmq.binder.  consumer.push.suspendCurrentQueueTimeMillis|1000|同步消费消息模式下。

> **NOTE** 其他更多参数见 [RocketMQConsumerProperties.Push](https://github.com/alibaba/spring-cloud-alibaba/blob/2022.x/spring-cloud-alibaba-starters/spring-cloud-starter-stream-rocketmq/src/main/java/com/alibaba/cloud/stream/binder/rocketmq/properties/RocketMQConsumerProperties.java) 

关于以 spring-cloud-starter-stream-rocketmq-binder-consumer-pull 为前缀的配置项如下所示：

配置项|key|默认值|说明  
----|----|-----|-----  
|消费时拉取的线程数|spring.cloud.starter.stream.rocketmq.binder.consumer.pull.pullThreadNums|20||
|拉取时的超时毫秒数|spring.cloud.starter.stream.rocketmq.binder.consumer.push.pollTimeoutMillis|1000 * 5| |

> **NOTE**  其他更多参数见 [RocketMQConsumerProperties.Pull](https://github.com/alibaba/spring-cloud-alibaba/blob/2022.x/spring-cloud-alibaba-starters/spring-cloud-starter-stream-rocketmq/src/main/java/com/alibaba/cloud/stream/binder/rocketmq/properties/RocketMQConsumerProperties.java)。

### 消息生产者配置

关于以 spring-cloud-starter-stream-rocketmq-binder-producer 为前缀的配置项如下所示：

配置项|key|默认值|说明  
----|----|-----|-----  
| 是否启用 Producer | spring.cloud.starter.stream.rocketmq.  binder.producer.enable| true| |
| 生产者集群名称 | spring.cloud.starter.stream.rocketmq.  binder.producer.group | empty| |
| 消息发送的最大字节数 | spring.cloud.starter.stream.rocketmq.  binder.producer.maxMessageSize| 8249344 | |
| 消息生产者类型 |spring.cloud.starter.stream.rocketmq.  binder.producer.producerType |Normal | 普通或者事务。更多见 [RocketMQProducerProperties.ProducerType](https://github.com/alibaba/spring-cloud-alibaba/blob/2022.x/spring-cloud-alibaba-starters/spring-cloud-starter-stream-rocketmq/src/main/java/com/alibaba/cloud/stream/binder/rocketmq/properties/RocketMQProducerProperties.java)|
| 事务消息监听器的beanName | spring.cloud.starter.stream.rocketmq.  binder.producer.transactionListener| | 在 `producerType=Trans` 时才有效；必须是实现 [TransactionListener](https://github.com/apache/rocketmq/blob/4.9.x/client/src/main/java/org/apache/rocketmq/client/producer/TransactionListener.java) 接口的Spring Bean|
| 消息发送类型 | spring.cloud.starter.stream.rocketmq.  binder.producer.sendType | Sync | 同步、异步、单向。更多见[RocketMQProducerProperties.SendType](https://github.com/alibaba/spring-cloud-alibaba/blob/2022.x/spring-cloud-alibaba-starters/spring-cloud-starter-stream-rocketmq/src/main/java/com/alibaba/cloud/stream/binder/rocketmq/properties/RocketMQProducerProperties.java)|
| 消息发送后回调函数的beanName |spring.cloud.starter.stream.rocketmq.  binder.producer.sendCallBack| | 在 `sendType=Async` 时才有效；必须是实现 [SendCallback](https://github.com/apache/rocketmq/blob/bbbe737e4e57ebc32581220fa8766cf32f7833eb/client/src/main/java/org/apache/rocketmq/client/producer/SendCallback.java) 接口的 Spring Bean|
| 是否在 Vip Channel 上发送消息 | spring.cloud.starter.stream.rocketmq.  binder.producer.vipChannelEnabled | true | |
| 发送消息的超时时间 | spring.cloud.starter.stream.rocketmq.  binder.producer.sendMessageTimeout | 3000 | 单位为毫秒 |
| 消息体压缩阀值 | spring.cloud.starter.stream.rocketmq.  binder.producer.compressMessageBodyThreshold | |
| 在同步发送消息的模式下，消息发送失败的重试次数 | spring.cloud.starter.stream.rocketmq.  binder.producer.retryTimesWhenSendFailed | 2 | |
| 在异步发送消息的模式下，消息发送失败的重试次数 | spring.cloud.starter.stream.rocketmq.  binder.producer.retryTimesWhenSendAsyncFailed | 2 | |
| 消息发送失败的情况下是否重试其它的 broker | spring.cloud.starter.stream.rocketmq.  binder.producer.retryAnotherBroker | false | |

> **NOTE**   生产者其他更多参数请见：[RocketMQProducerProperties](https://github.com/alibaba/spring-cloud-alibaba/blob/rocketmq/spring-cloud-alibaba-starters/spring-cloud-starter-stream-rocketmq/src/main/java/com/alibaba/cloud/stream/binder/rocketmq/properties/RocketMQProducerProperties.java)。
