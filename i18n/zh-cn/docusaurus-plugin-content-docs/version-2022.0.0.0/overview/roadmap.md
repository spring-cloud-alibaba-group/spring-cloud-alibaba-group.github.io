---
title: Roadmap
keywords: [Spring Cloud Alibaba]
description: Spring Cloud Alibaba Roadmap.
custom_edit_url: https://github.com/higress-group/higress-group.github.io/blob/main/i18n/zh-cn/docusaurus-plugin-content-docs/current/overview/roadmap.md
---

<a href="#1" target="_self">&nbsp;&nbsp;&nbsp;&nbsp;服务治理能力建设</a>
<br/>


<a href="#2" target="_self">&nbsp;&nbsp;&nbsp;&nbsp;对接 RocketMQ 5.0</a>
<br/>

<a href="#3" target="_self">&nbsp;&nbsp;&nbsp;&nbsp;Graalvm 静态编译适配</a>
<br/>

<a href="#4" target="_self">&nbsp;&nbsp;&nbsp;&nbsp;文档官网建设</a>
<br/>

<h3 id='1'>服务治理能力建设</h3>

### 治理能力建设

**背景**

之前 Spring Cloud Alibaba 已经做了一些治理相关的工作，但是只覆盖了 Istio 的部分场景，后续打算将 Istio 中 DestinationRule 以及 VirtualService 中还未接入的治理能力持续接入，让用户可以无缝的衔接进云原生的技术体系中。

**Feature List（TODO）**

1. 支持Istio first-part jwt

2. grpc版本更新与适配

3. TLS

    - mTLS/TLS通信(包括使用ISTIO自带的mTLS以及用户自定义的证书)

    - 支持身份验证鉴权(mTLS前提下)

4. DestinationRule & VirtualService

    - 通过EDS的相关信息来获取负载均衡的endpoints，也就是说服务发现的数据可以直接从控制面获取，无需在云原生这套体系里面额外使用Nacos等注册中心

    - 通过CDS中指定的负载均衡策略，结合spring-cloud-loadbalancer等组件来对不同的subset做不同的负载均衡策略

    - 常规负载均衡策略

      ● RANDOM,PASSTHROUGH,ROUND_ROBIN,LEAST_REQUEST
    
    - 一致性哈希
    - 地域负载均衡

    - 通过 DestinationRule 中配置的连接池配置，来配置 Spring Cloud 中 Feign 的连接相关配置

        ■ 最大重试数

        ■ 最大闲置时间

        ■ http2相关配置

    - 通过DestinationRule中的OutlierDetection，来实现feign的离群实例摘除

        ■ 连续错误次数

        ■ 错误间隔
        
        ■ 最小摘除百分比
        
        ■ 最大摘除百分比
        
        ■ ........

    - 通过VirtualService中的请求/响应头操作，来对访问此应用的请求/响应头做响应的修改

    - 通过virtualService中的HTTP以及HTTPS流量的匹配规则，增强标签路由的一些能力

    https://istio.io/latest/zh/docs/reference/config/networking/virtual-service/#HTTPMatchRequest
    https://istio.io/latest/zh/docs/reference/config/networking/virtual-service/#TLSMatchAttributes
    
    比如做一些取反操作(without headers)的支持，以及根据一些额外的label来路由

    ○ 通过VirtualService中的重定向,直接返回，实现服务Mock

    ○ 通过VirtualService中的路径重写，实现路径重写

    ○ 通过VirtualService中的故障重试，实现故障重试

    ○ 通过VirtualService中的跨域，实现跨域

    ○ 通过VirtualService中的故障注入，实现故障注入

**TODO:**

1. xds-bootstrap调研

2. mtls实现并合入

### 服务契约对接

**效果**

- 用户通过添加依赖、指定上报地址后，达成如下能力：

- 用户写controller，能够在开源控制台上看到path/method等请求信息

- 用户写controller、带上openapi v3 annotation，能够在开源控制台上看到path/method/参数说明等信息

**技术实现**

- **Spring Cloud Alibaba 新模块**

    SCA开启服务治理模块，该模块功能如下：

    1. 应用启动后，扫描所有的controller，收集openapi 信息

    2. 如果配置了上报地址，则将这些信息上报到控制台

- **上报数据格式**

    目前格式上有两种选择：

    1. 参考OpenAPI格式上报，比如：https://editor.swagger.io/

    2. 扩展dubbo的metadata格式，例如： https://github.com/apache/dubbo/pull/7029#issuecomment-746162196
    为了后续支持k8s部署，同时会将上述格式转化为proto/gRPC定义。

- **上报数据认证**

    目前上报方式比较倾向于json上报，用户名和密码认证。

    为了后续支持k8s部署，将会支持mtls认证+gRPC上报。

- **控制台**

    <p align="center">
    <img src="https://sca-storage.oss-cn-hangzhou.aliyuncs.com/website/image.png" />
    </p>

    由于服务治理开源会沿用Sentinel控制台，所以会在Sentinel控制台上增加一个“服务契约”菜单，来展示服务契约信息。

- **其他**

    更多微服务治理开源的相关内容可以参考：https://www.yuque.com/ot01yo/thyzgp/rgzqv3

<h3 id='2'>对接 RocketMQ 5.0</h3>

### RocketMQ 5.0 新版特性

<p align="center">
<img src="https://sca-storage.oss-cn-hangzhou.aliyuncs.com/website/image%20%282%29.png" />
</p>

**1. 基础架构云原生化**

<p align="center">
<img src="https://sca-storage.oss-cn-hangzhou.aliyuncs.com/website/image%20%281%29.png" />
</p>

**2. 轻量 API 和多语言集成**

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


**3. 事件、流处理场景集成**

在计算框架方面，RocketMQ 5.0 引入了一套轻量级流式处理框架 RSteams。RStreams 依赖少、部署简单，可任意横向扩展，利用 RocketMQ 资源即可完成轻量级的数据处理和计算。
Github: https://github.com/apache/rocketmq-streams
rocketmq-stream 实现了一系列高级的API，可以让用户很方便的编写流计算的程序，实现自己的业务需求。

我们知道 Spring Cloud Alibaba 中通过 Spring Cloud Stream 来集成 RocketMQ，这里我们可以考虑创建一个新的 binder，对 rocketmq-streams 也进行集成。具体的集成可以参考 Spring Cloud Stream 官方对 kafka-streams 的集成。

<p align="center">
<img src="https://sca-storage.oss-cn-hangzhou.aliyuncs.com/website/image%20%285%29.png" />
</p>

参考：https://github.com/spring-cloud/spring-cloud-stream#apache-kafka-streams-binder

### Action

1. Provider 客户端升级方案需要进一步确定。
2. Consumer 客户端支持 SimpleConsumer 方案需要进一步确定。
3. rocketmq-streams 是否支持流时间处理以及支持的形式需要在兴趣小组和社区核心内部讨论。

<h3 id='3'>Graalvm 静态编译适配</h3>

### 静态编译能力介绍

Spring Boot 3.0 本次带来最大的改动就是 GraalVM 原生镜像的支持，也是官方文档中强调的他们花费时间精力比较多的部分。 GraalVM 技术作为JRE的替代方案，其通过预先编译（Ahead Of Time，AOT）等技术对 Java 应用进行预先编译，让 Spring 在运行应用时掌握更多应用有关的信息，让整个应用启动速度更快。另外，通过编译工具在编译过程中通过消除一些不必要的内容可以让最终的应用更小，占用内存更低。对于一些对启动速度要求非常高的场景，比如 Serverless、FaaS 场景非常友好！ 本次 Spring Boot 3.0 直接将其正式从 Spring Native 迁入到 Spring Boot 中来，也预示着该项技术开始逐渐走向成熟，Spring 生态开始迈入 GraalVM 阶段！

跟 JVM 编译部署方式相比，GraalVM 具有以下特点：

- 在应用构建阶段，从主入口点就开始进行应用程序的静态分析。

- 创建本机镜像时，通过代码分析，会将无法访问的代码删除，并且不会成为可执行文件的一部分，从而可在一定程度上压缩程序包大小。

- GraalVM 无法直接感知代码的动态元素，因此对于存在反射、序列化和动态代理的应用程序，需要提前提供相关 hint 配置文件，帮助解析应用程序，相关操作过程可参考官方文档。

- 应用程序类路径在构建时是固定的，不能更改。

- 没有惰性类加载，可执行文件中的所有内容都将在启动时加载到内存中。

- 支持的 Java 应用程序在某些方面存在一些限制，因此目前并不能保证之前的 Java 应用都可直接使用 GraalVM 技术进行应用构建，有一定概率会存在不兼容的异常情况。

**背景**

以下是社区对目前所支持的服务注册与发现模块相关示例应用在升级为 Spring Boot 3.0 以后，使用 GraalVM 构建原生应用镜像做的在启动速度和运行时占用内容相关的测试（测试过程在 macOS 11.4，2.6 GHz 6-Core Intel Core i7 处理器，16G 内存环境下分别模拟3次取平均值测得）：

<p align="center">
<img src="https://sca-storage.oss-cn-hangzhou.aliyuncs.com/website/graalvm_performance.jpg" />
</p>

从上述对比可发现，最新支持 Spring Boot 3.0 基于 GraalVM 的 Spring Cloud Alibaba 应用会在启动速度、运行时内存占用和应用包大小方面得到大幅度降低，例如，其中服务注册消费应用启动速度提升了近 10 倍，运行时内存占用比原来降低了近乎 2/3，效果非常明显。这给云原生时代，托管在云上的应用带来了显著优势，让其可以更快地进行弹性扩缩容以及降低企业整体用云成本！

**适配功能模块**

- Nacos；

- Seata；

- Sentinel；

- RocketMQ。

**适配进度**

目前各个模块已经成功通过 Spring 提供的 `RuntimeHintsRegistrar` 的方式添加了 Spring Cloud Alibaba 缺失的 hints 代码类；

- https://github.com/alibaba/spring-cloud-alibaba/pull/3371

- https://github.com/alibaba/spring-cloud-alibaba/pull/3370

各个模块的元数据已经提交到了 OracleLab 的中央元数据仓库。

- https://github.com/oracle/graalvm-reachability-metadata/issues/260

**正式发布时间**

预计7月中下旬正式发布 2022 正式版本，将提供完善的静态编译能力支持。

<h3 id='4'>文档官网建设</h3>

### 文档官网建设背景

目前社区相关文档主要集中在 `spring-cloud-alibaba-docs` 模块中，文档整体采用 adoc 方式编写，项目文档说明依托在 [Spring Cloud 官网](https://spring.io/projects/spring-cloud-alibaba)中，不利于项目长久发展和文档及时更新迭代。于是，社区决定建立自己的官网，方便用户使用和参考文档。

**技术选型**

和其他阿里开源项目官网保持一致，选用FaceBook开源的文档官网框架：[Docusaurus](https://www.docusaurus.cn/)

**目前进度**

目前文档官网建设已经进入收尾工作，有一些细节仍需完善。欢迎参与[社区官网建设](https://github.com/spring-cloud-alibaba-group/spring-cloud-alibaba-group.github.io)。

**发布时间**

预计在7月中下旬正式发布上线。


