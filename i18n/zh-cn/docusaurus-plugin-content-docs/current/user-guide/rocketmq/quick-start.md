---
title: 快速开始
keywords: [Spring Cloud Alibaba, RocketMQ]
description: RocketMQ,Quick Start.
---

本章节将演示 RocketMQ 和 Spring Cloud Alibaba RocketMQ Binder 的基本使用。

## RocketMQ 基本使用

### 安装并启动 RocketMQ Server

1. 下载 [RocketMQ最新的二进制文件](https://www.apache.org/dyn/closer.cgi?path=rocketmq/4.3.2/rocketmq-all-4.3.2-bin-release.zip)，并解压。

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

    ```bash
    nohup sh bin/mqnamesrv &
    tail -f ~/logs/rocketmqlogs/namesrv.log
    ```

3. 启动 Broker

    ```bash
    nohup sh bin/mqbroker -n localhost:9876 &
    tail -f ~/logs/rocketmqlogs/broker.log
    ```

### 测试发送与接受消息

1. 发送消息：

    ```bash
    sh bin/tools.sh org.apache.rocketmq.example.quickstart.Producer
    ```

    发送成功后显示：`SendResult [sendStatus=SEND_OK, msgId= ...`

2. 接收消息：

    ```bash
    sh bin/tools.sh org.apache.rocketmq.example.quickstart.Consumer
    ```

    接收成功后显示：`ConsumeMessageThread_%d Receive New Messages: [MessageExt...`

### 关闭 RocketMQ Server

```bash
sh bin/mqshutdown broker
sh bin/mqshutdown namesrv
```

## Spring Cloud Alibaba RocketMQ Binder 的使用

### 1. 准备 RocketMQ 环境

**下载 RocketMQ**

下载地址：https://rocketmq.apache.org/zh/download，
> NOTE: 选择合适的版本下载即可。注意下载的文件形式，推荐使用二进制文件方式下载！


**启动 RocketMQ**

Linux \ Mac 环境使用以下方式启动。

- 启动 mqnamesrv：

    ```shell
    sh bin/mqnamesrv
    ```

- 启动 mqbroker：

    ```shell
    sh bin/mqbroker -n localhost:9876
    ```

Windows 环境使用以下方式启动。

- 启动 mqnamesrv：

    ```shell
    .\bin\mqnamesrv.cmd
    ```

- 启动 mqbroker：

    ```shell
    .\bin\mqbroker.cmd -n localhost:9876
    ```

**创建 Topic**

Linux / Mac 使用以下命令：

```sh
sh bin/mqadmin updateTopic -n localhost:9876 -c DefaultCluster -t broadcast
```

Windows 使用以下命令创建：

```shell
.\bin\mqadmin.cmd updateTopic -n localhost:9876 -c DefaultCluster -t broadcast
```

### 2. 引入依赖

在项目中引入如下的 maven 依赖：

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

### 3. 创建广播模式示例应用

**创建消息生产者模块**

```java
@SpringBootApplication
public class RocketMQBroadcastProducerApplication {
	private static final Logger log = LoggerFactory
			.getLogger(RocketMQBroadcastProducerApplication.class);
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

在 resources 中创建 application.yml 文件，加入如下配置：

```properties
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

**创建消息消费者 1 模块**

```java

@SpringBootApplication
public class RocketMQBroadcastConsumer1Application {
	private static final Logger log = LoggerFactory
			.getLogger(RocketMQBroadcastConsumer1Application.class);

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

在 resources 中创建 application.yml 文件，加入如下配置：

```properties
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

**创建消息消费者 2 模块**

```java
@SpringBootApplication
public class RocketMQBroadcastConsumer2Application {
	private static final Logger log = LoggerFactory
			.getLogger(RocketMQBroadcastConsumer2Application.class);

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

```properties
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

### 4. 更多示例参考

更多关于 spring-cloud-starter-stream-rocketmq 使用示例，参看 [Spring Cloud Alibaba RocketMQ Example](https://github.com/alibaba/spring-cloud-alibaba/tree/2022.x/spring-cloud-alibaba-examples/rocketmq-example)
