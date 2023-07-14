---
title: "Quick Start"
keywords: [Spring Cloud Alibaba, RocketMQ]
description: RocketMQ, Quick Start.
---

This chapter will demonstrate the basic use of RocketMQ and the basic use of RocketMQ combined with Spring Cloud Stream, taking broadcast consumption as an example.

## Basic usage of RocketMQ

### Install and start 
    
1. Download [RocketMQ latest binary file](https://www.apache.org/dyn/closer.cgi?path=rocketmq/4.3.2/rocketmq-all-4.3.2-bin-release.zip), and decompress.

    The directory structure after decompression is as follows:

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

2. Start NameServer 

  Linux / Unix / Mac operating system, execute the command:

    ```shell
    $ nohup sh bin/mqnamesrv & tail -f ~/logs/rocketmqlogs/namesrv.log
    ```

	Windows operating system, execute the command:

    ```
    $ .\bin\mqnamesrv.cmd
    ```

3. Start Broker

  Linux / Unix / Mac operating system, execute the command:

    ```bash
    $ nohup sh bin/mqbroker -n localhost:9876 & tail -f ~/logs/rocketmqlogs/broker.log
    ```

	Windows operating system, execute the command:
    ```
    $ .\bin\mqbroker.cmd -n localhost:9876
    ```

### Test sending and receiving messages

1. Create a test topic (TopicTest):  
  
  Linux / Unix / Mac operating system, execute the command:

    ```shell
    $ sh bin/mqadmin updatetopic -n localhost:9876 -t TestTopic -c DefaultCluster
    ```

	Windows operating system, execute the command:

    ```
    $ .\bin\mqadmin.cmd updatetopic -n localhost:9876 -t TopicTest -c DefaultCluster
    ```
2. Send a message:

  Linux / Unix / Mac operating system, execute the command:
    ```shell
    $ sh bin/tools.sh org.apache.rocketmq.example.quickstart.Producer
    ```

	Windows operating system, execute the command:
    ```cmd
    $ .\bin\tools.cmd org.apache.rocketmq.example.quickstart.Producer
    ```
    After sending successfully, it will display: SendResult [sendStatus=SEND_OK, msgId= ...

3. Receive message:

    Linux / Unix / Mac operating system, execute the command:

    ```shell
    $ sh bin/tools.sh org.apache.rocketmq.example.quickstart.Consumer
    ```

    Windows operating system, execute the command:  
      ```
      $ .\bin\tools.cmd org.apache.rocketmq.example.quickstart.Consumer
      ```

      After sending successfully, it will display: SendResult [sendStatus=SEND_OK, msgId= ...

      After receiving successfully, it will display: ConsumeMessageThread_%d Receive New Messages: [MessageExt...

## Broadcast consumption example

​Broadcasting sends messages to all consumers. If you want all consumers under the same consumer group to receive messages under the same topic, broadcast consumption is very suitable for this scenario.

### Introduce dependencies

A starter whose group ID is com.alibaba.cloud and artifact ID is spring-cloud-starter-stream-rocketmq needs to be introduced in the pom.xml file:       

```xml
<dependency>
    <groupId>com.alibaba.cloud</groupId>
    <artifactId>spring-cloud-starter-stream-rocketmq</artifactId>
</dependency>
```

### Update topic

  Update the topic in RocketMQ to broadcast mode.

  Linux / Unix / Mac operating system, execute the command:

  ```shell
  sh bin/mqadmin updateTopic -n localhost:9876 -c DefaultCluster -t broadcast
  ```

  Windows operating system, execute the command:
  ```
  .\bin\mqadmin.cmd updateTopic -n localhost:9876 -c DefaultCluster -t broadcast
  ```

### Create producer

1. Related configuration

  Complete the configuration of the RocketMQ broadcast message producer in the /src/main/resources/application.yaml configuration file of the application. Configure the service port number, the NameServer address of RocketMQ, and the destination for sending messages as follows:

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
  
2. Send a message

  Inject the StreamBridge into the application via the@Autowired  annotation to send messages. In the producer method, use a loop to send 100 messages. Each message contains a key and headers, and creates a GenericMessage object as the message body, and then uses the streamBridge.send method to send the message to the destination named "producer-out-0".

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

### Create consumer

Start two consumer instances.

**consumer 1**    

1. Related configuration

  Complete the relevant configuration of RocketMQ broadcast message consumer 1 in the /src/main/resources/application.yaml configuration file of the application. Configure the service port number, consumer function, RocketMQ NameServer address, message consumption mode and consumer group as follows:

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

2. Receive message  

  The consumer method marked with the @Bean annotation returns a Consumer object for processing the received message. In the consumer method, a consumer function is defined through a Lambda expression, and when a new message is received, the message content is printed out.

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

**consumer 2**

For a detailed explanation of the creation process of consumer 2, please refer to the explanation of the creation process of consumer 1 above.

1. Related configuration  
`application.yml` configuration
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

2. Receive message

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

In addition to the above-mentioned broadcast consumption applications, applications such as sequential consumption, delayed consumption, message filtering, and transactional messages can also be performed. For more simple examples of RocketMQ, please refer to   [RocketMQ example](https://github.com/alibaba/spring-cloud-alibaba/blob/2022.x/spring-cloud-alibaba-examples/rocketmq-example/readme-zh.md).

This Demo only demonstrates the basic use of RocketMQ combined with Spring Cloud Stream. For more advanced features of RocketMQ, please refer to the RocketMQ Advanced Guide chapter!
