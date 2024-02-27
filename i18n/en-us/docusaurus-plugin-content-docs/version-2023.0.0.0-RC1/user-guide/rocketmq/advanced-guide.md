---
title: "Advanced Guide"
keywords: [Spring Cloud Alibaba]
description: Advanced, RocketMQ, Guide.
---

This section shows the implementation and related configuration of spring-cloud-statrer-stream-rocketmq.

## Implementation of Spring Cloud Stream RocketMQ Binder

### Architecture implementation

<p align="center">
<img src="https://img.alicdn.com/tfs/TB1v8rcbUY1gK0jSZFCXXcwqXXa-1236-773.png" />
</p>

spring-cloud-statrer-stream-rocketmq removes the dependency on [RocketMQ-Spring](https://github.com/apache/rocketmq-spring) framework. The Spring Cloud Stream Binder core class **RocketMQMessageChannelBinder** implements the Spring Cloud Stream specification, and internally builds RocketMQInboundChannelAdapter and RocketMQProducerMessageHandler.

**RocketMQProducerMessageHandler** will construct RocketMQ Producer through RocketMQProduceFactory based on the Binding configuration, and internally convert the org.springframework.messaging.Message message class in the spring-messaging module into the RocketMQ message class org.apache.rocketmq.common.message.Message , and send it out.

**RocketMQInboundChannelAdapter** will also construct DefaultMQPushConsumer through RocketMQConsumerFactory based on Binding configuration, which will start RocketMQ Consumer to receive messages internally.

> **NOTE** Compatibility with the [RocketMQ-Spring](https://github.com/apache/rocketmq-spring) framework needs to be handled manually.

Currently Binder supports setting related keys in the Header to set the characteristics of the RocketMQ Message.

For example, tags corresponding to RocketMQ messages such as TAGS, KEYS, TRANSACTIONAL_ARGS, etc., see [com.alibaba.cloud.stream.binder.rocketmq.constant.RocketMQConst](https://github.com/alibaba/spring-cloud-alibaba/blob/2022.x/spring-cloud-alibaba-starters/spring-cloud-starter-stream-rocketmq/src/main/java/com/alibaba/cloud/stream/binder/rocketmq/constant/RocketMQConst.java).

```java
MessageBuilder builder = MessageBuilder.withPayload(msg)
    .setHeader(RocketMQHeaders.TAGS, "binder")
    .setHeader(RocketMQHeaders.KEYS, "my-key");
Message message = builder.build();
output().send(message);
```

Or use StreamBridge:

```java
MessageBuilder builder = MessageBuilder.withPayload(msg)
    .setHeader(RocketMQHeaders.TAGS, "binder")
    .setHeader(RocketMQHeaders.KEYS, "my-key");
Message message = builder.build();
streamBridge.send("producer-out-0", message);
```

> **NOTE** For more usage, please refer to the sample: [com.alibaba.cloud.examples.SenderService](https://github.com/alibaba/spring-cloud-alibaba/blob/rocketmq/spring-cloud-alibaba-examples/rocketmq-example/rocketmq-produce-example/src/main/java/com/alibaba/cloud/examples/SenderService.java).

## More configuration item reference

### Binder Properties

The configuration items prefixed with spring-cloud-starter-stream-rocketmq-binder are as follows:

| Configuration item          | Key                                                        | Default value       | Description                                                            |
| --------------------------- | ---------------------------------------------------------- | ------------------- | ---------------------------------------------------------------------- |
| RocketMQ NameServer address | spring.cloud.stream.rocketmq.binder.name-server            | 127.0.0.1:9876      | Older versions use the namesrv-addr configuration item                 |
| Authentication public key   | spring.cloud.stream.rocketmq.binder.access-key             | null                | Aliyun account AccessKey                                               |
| Authentication private key  | spring.cloud.stream.rocketmq.binder.secret-key             | null                | Aliyun account SecretKey                                               |
| Message track function      | spring.cloud.stream.rocketmq.binder.enable-msg-trace       | true                | Whether to enable the message track function for Producer and Consumer |
| Topic name                  | spring.cloud.stream.rocketmq.binder.customized-trace-topic | RMQ_SYS_TRACE_TOPIC | The topic name stored after the message track is turned on             |

### Consumer Properties

The configuration items prefixed with spring-cloud-starter-stream-rocketmq-binder-consumer are as follows:

| Configuration item                  | Key                                                                    | Default value | Description                                                                                                                                                                                                                                          |
| ----------------------------------- | ---------------------------------------------------------------------- | ------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Whether to enable Consumer          | spring.cloud.starter.stream.rocketmq.binder. consumer.enable           | true          |                                                                                                                                                                                                                                                      |
| Consumer Subscription based on TAGS | spring.cloud.starter.stream.rocketmq.binder. consumer.subscription     | empty         | Multiple tags are separated by &#124&#124. See [subscription](https://github.com/apache/rocketmq/blob/4.9.x/common/src/main/java/org/apache/rocketmq/common/consumer/subscription.java) for more.                                                    |
| Consumer consumption mode           | spring.cloud.starter.stream.rocketmq.binder. consumer.messageModel     | CLUSTERING    | If you want every subscriber to receive the message, you can use the broadcast mode. See [MessageModel](https://github.com/apache/rocketmq/blob/4.9.x/common/src/main/java/org/apache/rocketmq/common/protocol/heartbeat/MessageModel.java) for more |
| Where does Consumer start consuming | spring.cloud.starter.stream.rocketmq.binder. consumer.consumeFromWhere |               | See [ConsumeFromWhere](https://github.com/apache/rocketmq/blob/4.9.x/common/src/main/java/org/apache/rocketmq/common/consumer/ConsumeFromWhere.java) for more.                                                                                       |

> **NOTE** See more [RocketMQConsumerProperties](https://github.com/alibaba/spring-cloud-alibaba/blob/rocketmq/spring-cloud-alibaba-starters/spring-cloud-starter-stream-rocketmq/src/main/java/com/alibaba/cloud/stream/binder/rocketmq/properties/RocketMQConsumerProperties.java).

The configuration items prefixed with spring-cloud-starter-stream-rocketmq-binder-consumer-push are as follows:

| Configuration item                                            | Key                                                                                      | Default value | Description                                                                                                                                                                                 |
| ------------------------------------------------------------- | ---------------------------------------------------------------------------------------- | ------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Whether to consume message mode synchronously                 | spring.cloud.starter.stream.rocketmq.binder. consumer.push.pushorderly                   | false         |
| Consumption failure retry strategy                            | spring.cloud.starter.stream.rocketmq.binder. consumer.push.delayLevelWhenNextConsume     | 0             | In synchronous consumption message mode. -1, directly put into the dead letter queue without repeating. 0, the broker controls the retry strategy. 0, the client controls the retry policy. |
| Time interval for consumption again after consumption failure | spring.cloud.starter.stream.rocketmq.binder. consumer.push.suspendCurrentQueueTimeMillis | 1000          | In synchronous consumption message mode.                                                                                                                                                    |

> **NOTE** For more parameters, see [RocketMQConsumerProperties.Push](https://github.com/alibaba/spring-cloud-alibaba/blob/2022.x/spring-cloud-alibaba-starters/spring-cloud-starter-stream-rocketmq/src/main/java/com/alibaba/cloud/stream/binder/rocketmq/properties/RocketMQConsumerProperties.java).

The configuration items prefixed with spring-cloud-starter-stream-rocketmq-binder-consumer-pull are as follows:

| Configuration item                          | Key                                                                          | Default value | Description |
| ------------------------------------------- | ---------------------------------------------------------------------------- | ------------- | ----------- |
| The number of threads pulled when consuming | spring.cloud.starter.stream.rocketmq. binder.consumer.pull.pullThreadNums    | 20            |             |
| Timeout in milliseconds when pulling        | spring.cloud.starter.stream.rocketmq. binder.consumer.push.pollTimeoutMillis | 1000 \* 5     |             |

> **NOTE** For more parameters, see [RocketMQConsumerProperties.Pull](https://github.com/alibaba/spring-cloud-alibaba/blob/2022.x/spring-cloud-alibaba-starters/spring-cloud-starter-stream-rocketmq/src/main/java/com/alibaba/cloud/stream/binder/rocketmq/properties/RocketMQConsumerProperties.java).

### Provider Properties

The configuration items prefixed with spring-cloud-starter-stream-rocketmq-binder-producer are as follows:

| Configuration item                                                                                 | Key                                                                                 | Default value | Description                                                                                                                                                                                                                                                                                                          |
| -------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------- | ------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Whether to enable Producer                                                                         | spring.cloud.starter.stream.rocketmq. binder.producer.enable                        | true          |                                                                                                                                                                                                                                                                                                                      |
| Producer cluster name                                                                              | spring.cloud.starter.stream.rocketmq. binder.producer.group                         | empty         |                                                                                                                                                                                                                                                                                                                      |
| Maximum number of bytes to send for a message                                                      | spring.cloud.starter.stream.rocketmq. binder.producer.maxMessageSize                | 8249344       |                                                                                                                                                                                                                                                                                                                      |
| Message producer type                                                                              | spring.cloud.starter.stream.rocketmq. binder.producer.producerType                  | Normal        | Ordinary or business. See more [RocketMQProducerProperties.ProducerType](https://github.com/alibaba/spring-cloud-alibaba/blob/2022.x/spring-cloud-alibaba-starters/spring-cloud-starter-stream-rocketmq/src/main/java/com/alibaba/cloud/stream/binder/rocketmq/properties/RocketMQProducerProperties.java)           |
| BeanName of the transaction message listener                                                       | spring.cloud.starter.stream.rocketmq. binder.producer.transactionListener           |               | Only valid when `producerType=Trans`; must implement [TransactionListener](https://github.com/apache/rocketmq/blob/4.9.x/client/src/main/java/org/apache/rocketmq/client/producer/TransactionListener.java) interface Spring Bean                                                                                    |
| message sending type                                                                               | spring.cloud.starter.stream.rocketmq. binder.producer.sendType                      | Sync          | Synchronous, asynchronous, one-way. See more [RocketMQProducerProperties.SendType](https://github.com/alibaba/spring-cloud-alibaba/blob/2022.x/spring-cloud-alibaba-starters/spring-cloud-starter-stream-rocketmq/src/main/java/com/alibaba/cloud/stream/binder/rocketmq/properties/RocketMQProducerProperties.java) |
| The beanName of the callback function after the message is sent                                    | spring.cloud.starter.stream.rocketmq. binder.producer.sendCallBack                  |               | Only valid when `sendType=Async`; must implement [SendCallback](https://github.com/apache/rocketmq/blob/bbbe737e4e57ebc32581220fa8766cf32f7833eb/client/src/main/java/org/apache/rocketmq/client/producer/SendCallback.java) interface Spring Bean                                                                   |
| Whether to send messages on Vip Channel                                                            | spring.cloud.starter.stream.rocketmq. binder.producer.vipChannelEnabled             | true          |                                                                                                                                                                                                                                                                                                                      |
| Timeout for sending messages                                                                       | spring.cloud.starter.stream.rocketmq. binder.producer.sendMessageTimeout            | 3000          | In milliseconds                                                                                                                                                                                                                                                                                                      |
| Message body compression threshold                                                                 | spring.cloud.starter.stream.rocketmq. binder.producer.compressMessageBodyThreshold  |               |
| In the mode of sending messages synchronously, the number of retries for message sending failures  | spring.cloud.starter.stream.rocketmq. binder.producer.retryTimesWhenSendFailed      | 2             |                                                                                                                                                                                                                                                                                                                      |
| In the mode of sending messages asynchronously, the number of retries for message sending failures | spring.cloud.starter.stream.rocketmq. binder.producer.retryTimesWhenSendAsyncFailed | 2             |                                                                                                                                                                                                                                                                                                                      |
| Whether to retry other brokers in case of message sending failure                                  | spring.cloud.starter.stream.rocketmq. binder.producer.retryAnotherBroker            | false         |                                                                                                                                                                                                                                                                                                                      |

> **NOTE** For more parameters of the producer, please see: [RocketMQProducerProperties](https://github.com/alibaba/spring-cloud-alibaba/blob/rocketmq/spring-cloud-alibaba-starters/spring-cloud-starter-stream-rocketmq/src/main/java/com/alibaba/cloud/stream/binder/rocketmq/properties/RocketMQProducerProperties.java).
