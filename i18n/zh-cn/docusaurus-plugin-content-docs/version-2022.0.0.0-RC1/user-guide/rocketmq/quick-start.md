---
title: 快速开始
keywords: [Spring Cloud Alibaba, RocketMQ]
description: RocketMQ, Quick Start.
---

本章节将演示 RocketMQ 的基本使用，以及 RocketMQ 与 Spring Cloud Stream 结合后的基本使用，以广播消费为例。

## RocketMQ 基本使用

### 安装并启动

1. 下载 [RocketMQ 最新的二进制文件](https://www.apache.org/dyn/closer.cgi?path=rocketmq/4.3.2/rocketmq-all-4.3.2-bin-release.zip)，并解压。

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

2. 启动 NameServer

Linux / Unix / Mac 操作系统，执行命令 ：

    ```shell
    $ nohup sh bin/mqnamesrv & tail -f ~/logs/rocketmqlogs/namesrv.log
    ```

    Windows 操作系统，执行命令：

    ```
    $ .\bin\mqnamesrv.cmd
    ```

3. 启动 Broker

Linux / Unix / Mac 操作系统，执行命令 ：

    ```bash
    $ nohup sh bin/mqbroker -n localhost:9876 & tail -f ~/logs/rocketmqlogs/broker.log
    ```

    Windows 操作系统，执行命令：
    
    ```
    $ .\bin\mqbroker.cmd -n localhost:9876
    ```

### 测试发送与接受消息

1. 创建测试主题（TopicTest）：

Linux / Unix / Mac 操作系统，执行命令 ：

    ```shell
    $ sh bin/mqadmin updatetopic -n localhost:9876 -t TestTopic -c DefaultCluster
    ```

    Windows 操作系统，执行命令：

    ```
    $ .\bin\mqadmin.cmd updatetopic -n localhost:9876 -t TopicTest -c DefaultCluster
    ```

2. 发送消息：

Linux / Unix / Mac 操作系统，执行命令 ：  
    
    ```shell
    $ sh bin/tools.sh org.apache.rocketmq.example.quickstart.Producer
    ```

    Windows 操作系统，执行命令：
    ```cmd
    $ .\bin\tools.cmd org.apache.rocketmq.example.quickstart.Producer
    ```
    发送成功后显示：SendResult [sendStatus=SEND_OK, msgId= ...

3. 接收消息：

   Linux / Unix / Mac 操作系统，执行命令 ：

   ```shell
   $ sh bin/tools.sh org.apache.rocketmq.example.quickstart.Consumer
   ```

   Windows 操作系统，执行命令：

   ```
   $ .\bin\tools.cmd org.apache.rocketmq.example.quickstart.Consumer
   ```

   发送成功后显示：SendResult [sendStatus=SEND_OK, msgId= ...

   接收成功后显示：ConsumeMessageThread\_%d Receive New Messages: [MessageExt...

## 广播消费示例

​ 广播会发送消息给所有消费者。如果你想同一消费组下所有消费者接收到同一个 topic 下的消息，广播消费非常适合此场景。

### 引入依赖

需要在 `pom.xml` 文件中引入 group ID 为 `com.alibaba.cloud` 和 artifact ID 为 `spring-cloud-starter-stream-rocketmq` 的 starter：

```xml
<dependency>
    <groupId>com.alibaba.cloud</groupId>
    <artifactId>spring-cloud-starter-stream-rocketmq</artifactId>
</dependency>
```

### 更新主题（topic）

更新 RocketMQ 中的主题（topic）为广播模式。

Linux / Unix / Mac 操作系统，执行命令 ：

```shell
$ sh bin/mqadmin updateTopic -n localhost:9876 -c DefaultCluster -t broadcast
```

Windows 操作系统，执行命令：

```
$ .\bin\mqadmin.cmd updateTopic -n localhost:9876 -c DefaultCluster -t broadcast
```

### 创建生产者

1. 相关配置

在应用的 `/src/main/resources/application.yaml` 配置文件中完成 RocketMQ 广播消息生产者的相关配置。如下所示，对服务端口号、RocketMQ 的 NameServer 地址、消息发送的目标进行配置：

```yaml
server:
port: 28085
spring:
application:
  name: rocketmq-broadcast-producer-example
cloud:
  stream:
    rocketmq:
      binder:
        name-server: localhost:9876
      bindings:
        producer-out-0:
          producer:
            group: output_1
    bindings:
      producer-out-0:
        destination: broadcast
logging:
level:
  org.springframework.context.support: debug
```

2. 发送消息

通过`@Autowired` 注解，将 StreamBridge 注入到应用程序中，以发送消息。在 producer 方法中，使用循环发送 100 条消息。每条消息都包含一个 key 和 headers，并创建一个 GenericMessage 对象作为消息体，然后使用 streamBridge.send 方法发送消息到名为 "producer-out-0" 的目标。

```java
@SpringBootApplication
public class RocketMQBroadcastProducerApplication {

  private static final Logger log = LoggerFactory.getLogger(RocketMQBroadcastProducerApplication.class);

  @Autowired
  private StreamBridge streamBridge;
  public static void main(String[] args) {
      SpringApplication.run(RocketMQBroadcastProducerApplication.class, args);
  }

  @Bean
  public ApplicationRunner producer() {
      return args -> {
        for (int i = 0; i < 100; i++) {
            String key = "KEY" + i;
            Map<String, Object> headers = new HashMap<>();
            headers.put(MessageConst.PROPERTY_KEYS, key);
            headers.put(MessageConst.PROPERTY_ORIGIN_MESSAGE_ID, i);
            Message<SimpleMsg> msg = new GenericMessage<SimpleMsg>(new SimpleMsg("Hello RocketMQ " + i), headers);
            streamBridge.send("producer-out-0", msg);
        }
      };
  }
}
```

### 创建消费者

启动两个消费者实例。

**消费者 1**

1. 相关配置

在应用的 `/src/main/resources/application.yaml` 配置文件中完成 RocketMQ 广播消息消费者 1 的相关配置。如下所示，对服务端口号、消费者函数、RocketMQ 的 NameServer 地址、消息消费模式以及消费者分组进行配置：

```yaml
server:
  port: 28084
spring:
  application:
    name: rocketmq-broadcast-consumer1-example
  cloud:
    stream:
      function:
        definition: consumer;
      rocketmq:
        binder:
          name-server: localhost:9876
        bindings:
          consumer-in-0:
            consumer:
              messageModel: BROADCASTING
      bindings:
        consumer-in-0:
          destination: broadcast
          group: broadcast-consumer
logging:
  level:
    org.springframework.context.support: debug
```

2. 接收消息

通过 `@Bean` 注解标记的 consumer 方法返回一个 Consumer 对象，用于处理接收到的消息。在 consumer 方法中，通过 Lambda 表达式定义了一个消费者函数，当接收到新消息时，打印出消息内容。

```java
@SpringBootApplication
public class RocketMQBroadcastConsumer1Application {

  private static final Logger log = LoggerFactory.getLogger(RocketMQBroadcastConsumer1Application.class);

  public static void main(String[] args) {
      SpringApplication.run(RocketMQBroadcastConsumer1Application.class, args);
  }

  @Bean
  public Consumer<Message<SimpleMsg>> consumer() {
      return msg -> {
        log.info(Thread.currentThread().getName() + " Consumer1 Receive New Messages: " + msg.getPayload().getMsg());
      };
  }
}
```

**消费者 2**

消费者 2 创建过程的详细解释可参考上述消费者 1 的创建过程的解释。

1. 相关配置  
   `application.yml`配置

```yaml
server:
  port: 28083
spring:
  application:
    name: rocketmq-broadcast-consumer2-example
  cloud:
    stream:
      function:
        definition: consumer;
      rocketmq:
        binder:
          name-server: localhost:9876
        bindings:
          consumer-in-0:
            consumer:
              messageModel: BROADCASTING
      bindings:
        consumer-in-0:
          destination: broadcast
          group: broadcast-consumer
logging:
  level:
    org.springframework.context.support: debug
```

2. 接收消息

```java
@SpringBootApplication
public class RocketMQBroadcastConsumer2Application {

  private static final Logger log = LoggerFactory.getLogger(RocketMQBroadcastConsumer2Application.class);

  public static void main(String[] args) {
      SpringApplication.run(RocketMQBroadcastConsumer2Application.class, args);
  }

  @Bean
  public Consumer<Message<SimpleMsg>> consumer() {
      return msg -> {
        log.info(Thread.currentThread().getName() + " Consumer2 Receive New Messages: " + msg.getPayload().getMsg());
      };
  }
}
```

除了上述的广播消费应用，还可以进行顺序消费，延时消费，过滤消息，事务消息等应用，关于更多 RocketMQ 的简单示例，可以参考 [RocketMQ 示例](https://github.com/alibaba/spring-cloud-alibaba/blob/2022.x/spring-cloud-alibaba-examples/rocketmq-example/readme-zh.md)。

此 Demo 仅演示了 RocketMQ 与 Spring Cloud Stream 结合后的基本使用，更多 RocketMQ 的高级特性，请参考 RocketMQ 进阶指南章节！
