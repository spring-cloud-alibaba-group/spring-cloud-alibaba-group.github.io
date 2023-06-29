---
title: GraalVM概述
keywords: [Spring Cloud Alibaba]
description: overivew.
---

## GraalVM 介绍

Spring Boot 3.0带来了一项重大改动，即对GraalVM原生镜像的支持。这也是官方文档中强调的他们花费时间和精力较多的部分。 GraalVM 技术作为JRE的替代方案，通过预先编译（Ahead Of Time，AOT）等技术对 Java 应用进行预先编译，使得 Spring 在运行应用时能够获得更多与应用有关的信息，从而加快整个应用的启动速度。此外，通过编译工具在编译过程中消除一些不必要的内容，可以使最终的应用程序更小，占用内存更低。对于那些对启动速度要求非常高的场景，比如 Serverless、FaaS 场景，这项技术非常友好！ 本次 Spring Boot 3.0 直接将其正式从 Spring Native 迁入到 Spring Boot 中，这也预示着该项技术开始逐渐走向成熟，Spring 生态开始迈入 GraalVM 阶段！

与 JVM 编译部署方式相比，GraalVM 具有以下特点：

* 在应用构建阶段，从主入口点开始对应用程序进行静态分析。
* 创建本机镜像时，通过代码分析删除无法访问的代码，并且不会成为可执行文件的一部分，从而在一定程度上压缩程序包大小。
* GraalVM 无法直接感知代码的动态元素，因此对于存在反射、序列化和动态代理的应用程序，需要提前提供相关 hint 配置文件来帮助解析应用程序。详细操作过程可参考官方文档。
* 应用程序类路径在构建时是固定的，不能更改。
* 没有惰性类加载，可执行文件中的所有内容都将在启动时加载到内存中。
* 支持的 Java 应用程序在某些方面存在一些限制，因此目前并不能保证之前的 Java 应用都可直接使用 GraalVM 技术进行构建，可能会出现不兼容的异常情况。

本次发布的 Spring Cloud Alibaba 2022.0.0.0 版本中，部分中间件客户端已完成了构建 GraalVM 原生应用的适配。社区将目前支持的服务注册与发现模块相关示例应用升级为 Spring Boot 3.0 后，使用 GraalVM 构建原生应用镜像进行了启动速度和运行时占用内容的测试（测试过程在 macOS 11.4，2.6 GHz 6-Core Intel Core i7 处理器，16G 内存环境下分别模拟3次取平均值测得）。测试结果如下：

![GraalVM Performance](https://sca-storage.oss-cn-hangzhou.aliyuncs.com/website/docs/zh/graalvm_performance.jpg)

通过上述对比可以发现，最新支持 Spring Boot 3.0 基于 GraalVM 的 Spring Cloud Alibaba 应用在启动速度、运行时内存占用和应用包大小方面得到显著的改善。例如，服务注册消费应用的启动速度提高了近 10 倍，运行时内存占用降低了近 2/3，效果非常明显。这为云原生时代带来了显著的优势，使得托管在云上的应用能够更快地进行弹性扩缩容，并降低企业的整体云成本。