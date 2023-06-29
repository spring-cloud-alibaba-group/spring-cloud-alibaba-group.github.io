---
title: 快速开始
keywords: [Spring Cloud Alibaba, RocketMQ,]
description: RocketMQ Quick Start.
---

本章节将演示 RocketMQ 和 Spring Cloud Alibaba RocketMQ Binder 的基本使用。

## RocketMQ 基本使用

* 下载 RocketMQ

下载 [RocketMQ最新的二进制文件](https://www.apache.org/dyn/closer.cgi?path=rocketmq/4.3.2/rocketmq-all-4.3.2-bin-release.zip)，并解压

解压后的目录结构如下：

```
apache-rocketmq
├── LICENSE
├── NOTICE
├── README.md
├── benchmark
├── bin
├── conf
└── lib
```

* 启动 NameServer

```bash
nohup sh bin/mqnamesrv &
tail -f ~/logs/rocketmqlogs/namesrv.log
```

* 启动 Broker

```bash
nohup sh bin/mqbroker -n localhost:9876 &
tail -f ~/logs/rocketmqlogs/broker.log
```

* 发送、接收消息

发送消息：

```bash
sh bin/tools.sh org.apache.rocketmq.example.quickstart.Producer
```

发送成功后显示：`SendResult [sendStatus=SEND_OK, msgId= ...`

接收消息：

```bash
sh bin/tools.sh org.apache.rocketmq.example.quickstart.Consumer
```

接收成功后显示：`ConsumeMessageThread_%d Receive New Messages: [MessageExt...`

* 关闭 Server

```bash
sh bin/mqshutdown broker
sh bin/mqshutdown namesrv
```
## Spring Cloud Alibaba RocketMQ Binder的使用

如果要在您的项目中引入 RocketMQ Binder，需要引入如下 maven 依赖：

```xml
<dependency>
  <groupId>com.alibaba.cloud</groupId>
  <artifactId>spring-cloud-stream-binder-rocketmq</artifactId>
</dependency>
```

或者可以使用 Spring Cloud Stream RocketMQ Starter：

```xml
<dependency>
    <groupId>com.alibaba.cloud</groupId>
    <artifactId>spring-cloud-starter-stream-rocketmq</artifactId>
</dependency>
```