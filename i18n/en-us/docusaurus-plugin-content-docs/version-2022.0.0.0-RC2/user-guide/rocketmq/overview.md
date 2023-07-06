---
title: overview
keywords: [Spring Cloud Alibaba]
description: RocketMQ, overview.
---
## Introduction to RocketMQ

[RocketMQ](https://rocketmq.apache.org/) is an open source distributed message system, based on highly available distributed cluster technology, providing low-latency, highly reliable message publishing and subscription services. At the same time, it is widely used in many fields, including asynchronous communication decoupling, enterprise solutions, financial payment, telecommunications, e-commerce, express logistics, advertising marketing, social networking, instant messaging, mobile applications, mobile games, video, Internet of Things, car networking etc.

Has the following characteristics:

* Can guarantee strict message order;

* Provide a rich message pull mode;

* Efficient subscriber horizontal expansion capability;

* Real-time message subscription mechanism;

* Billion-level message accumulation capability.

Before introducing `spring-cloud-starter-stream-rocketmq`, let's take a look at Spring Cloud Stream.

## Introduction to Spring Cloud Stream

Spring Cloud Stream is a framework for building message-based microservice applications. It is based on Spring Boot to create a production-level stand-alone Spring application, and uses Spring Integration to connect with Broker.
  
Spring Cloud Stream provides a unified abstraction of message middleware configuration, and introduces the unified concepts of publish-subscribe, consumer groups, and partition.

There are two concepts inside Spring Cloud Stream: Binder and Binding.

* Binder: A component integrated with external message middleware, used to create Binding, each message middleware has its own Binder implementation.

    For example, `Kafka` implements `KafkaMessageChannelBinder`, `RabbitMQ` implements `RabbitMessageChannelBinder`, and `RocketMQ` implements `RocketMQMessageChannelBinder`.

* Binding: Including Input Binding and Output Binding.

Binding provides a bridge between the message middleware and the Provider and Consumer provided by the application, so that developers only need to use the Provider or Consumer of the application to produce or consume data, shielding the developer from the underlying message middleware touch.

The following figure is the architecture design of Spring Cloud Stream:

<p align="center">
  <img src="https://docs.spring.io/spring-cloud-stream/docs/current/reference/html/images/SCSt-with-binder.png" />
</p>