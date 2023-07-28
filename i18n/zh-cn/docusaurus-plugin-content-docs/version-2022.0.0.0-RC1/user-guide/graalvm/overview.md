---
title: GraalVM概述
keywords: [Spring Cloud Alibaba]
description: overivew.
---

## GraalVM 介绍

Spring Boot 3.0 本次带来最大的改动就是 GraalVM 原生镜像的支持，也是官方文档中强调的他们花费时间精力比较多的部分。 GraalVM 技术作为JRE的替代方案，其通过预先编译（Ahead Of Time，AOT）等技术对 Java 应用进行预先编译，让 Spring 在运行应用时掌握更多应用有关的信息，让整个应用启动速度更快。另外，通过编译工具在编译过程中通过消除一些不必要的内容可以让最终的应用更小，占用内存更低。对于一些对启动速度要求非常高的场景，比如 Serverless、FaaS 场景非常友好！ 本次 Spring Boot 3.0 直接将其正式从 Spring Native 迁入到 Spring Boot 中来，也预示着该项技术开始逐渐走向成熟，Spring 生态开始迈入 GraalVM 阶段！

跟 JVM 编译部署方式相比，GraalVM 具有以下特点：

* 在应用构建阶段，从主入口点就开始进行应用程序的静态分析。
* 创建本机镜像时，通过代码分析，会将无法访问的代码删除，并且不会成为可执行文件的一部分，从而可在一定程度上压缩程序包大小。
* GraalVM 无法直接感知代码的动态元素，因此对于存在反射、序列化和动态代理的应用程序，需要提前提供相关 hint 配置文件，帮助解析应用程序，相关操作过程可参考官方文档。
* 应用程序类路径在构建时是固定的，不能更改。
* 没有惰性类加载，可执行文件中的所有内容都将在启动时加载到内存中。
* 支持的 Java 应用程序在某些方面存在一些限制，因此目前并不能保证之前的 Java 应用都可直接使用 GraalVM 技术进行应用构建，有一定概率会存在不兼容的异常情况。

本次发布的 Spring Cloud Alibaba 2022.0.0.0-RC1 版本所包含的部分中间件客户端已完成了构建 GraalVM 原生应用的适配，以下是社区对目前所支持的服务注册与发现模块相关示例应用在升级为 Spring Boot 3.0 以后，使用 GraalVM 构建原生应用镜像做的在启动速度和运行时占用内容相关的测试（测试过程在 macOS 11.4，2.6 GHz 6-Core Intel Core i7 处理器，16G 内存环境下分别模拟3次取平均值测得）：

![GraalVM Performance](https://sca-storage.oss-cn-hangzhou.aliyuncs.com/website/docs/zh/graalvm_performance.jpg)

从上述对比可发现，最新支持 Spring Boot 3.0 基于 GraalVM 的 Spring Cloud Alibaba 应用会在启动速度、运行时内存占用和应用包大小方面得到大幅度降低，例如，其中服务注册消费应用启动速度提升了近 10 倍，运行时内存占用比原来降低了近乎 2/3，效果非常明显。这给云原生时代，托管在云上的应用带来了显著优势，让其可以更快地进行弹性扩缩容以及降低企业整体用云成本！