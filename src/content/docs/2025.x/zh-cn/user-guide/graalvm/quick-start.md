---
title: 快速开始
keywords: [Spring Cloud Alibaba]
description: Quick Start.
---

要使用 GraalVM 静态编译能力，首先确保您项目的 Spring Boot 版本为 3.0.0 或以上，Spring Cloud 版本为 2022.0.0 或以上。然后在项目中引入 Spring Cloud Alibaba 2022.0.0.0 或以上版本的所需模块依赖即可。

## 环境准备

要使用 Native Build Tools 构建原生镜像，需要在首先在机器上安装 GraalVM 发行版。 您可以在 Liberica Native Image Kit 页面上手动下载它，也可以使用像 SDKMAN!
这样的下载管理器。本文演示环境为 macOS，如果是 Windows 可参考相应文档进行操作。执行以下命令安装 GraalVM 环境：

```bash
$ sdk install java 22.3.r17-nik
$ sdk use java 22.3.r17-nik
```

通过检查 java -version 的输出来验证是否配置了正确的版本：

```bash
$ java -version
openjdk version "17.0.5" 2022-10-18 LTS
OpenJDK Runtime Environment GraalVM 22.3.0 (build 17.0.5+8-LTS)
OpenJDK 64-Bit Server VM GraalVM 22.3.0 (build 17.0.5+8-LTS, mixed mode)
```

## 生成 Hints 文件

通过以下命令生成应用中反射、序列化和动态代理所需的 Hints 配置文件，前提是应用中引入了 `spring-boot-starter-parent` 父模块：

```bash
$ mvn -Pnative spring-boot:run
```

之后应用会启动，需要尽可能完整的测试一遍应用的所有功能，保证应用的大部分代码都被测试用例覆盖，这样才能确保完整生成应用运行过程中的所有必须的动态属性。 运行完所有测试用例后，我们发现`resource/META-INF/native-image` 目录下会生成以下一些 hints 文件:

- resource-config.json：应用中资源 hint 文件
- reflect-config.json：应用中反射定义 hint 文件
- serialization-config.json：应用中序列化内容 hint 文件
- proxy-config.json：应用中 Java 代理相关内容 hint 文件
- jni-config.json：应用中 Java Native Interface（JNI）内容 hint 文件

注意事项：RocketMQ 应用通过上述命令进行 hint 文件生成过程中，可能会出现配置信息扫描不全问题，可参考 [相关 issue](https://github.com/alibaba/spring-cloud-alibaba/issues/3101)，Sentinel 应用通过上述命令进行 hint 文件生成过程中，可能会遇到如下问题，可参考 [相关 issue](https://github.com/alibaba/Sentinel/issues/3012)。

## 构建原生应用

以上步骤一切准备就绪后，通过以下命令来构建原生镜像：

```bash
$ mvn -Pnative native:compile
```

成功执行后，我们在 `/target` 目录可以看到生成的可执行文件。

## 启动应用

与普通可执行文件无异，通过 `target/xxx` 启动应用, 可以观察到类似如下的输出:

```
2022-12-22T16:28:51.006+08:00  INFO 75439 --- [           main] o.s.b.w.embedded.tomcat.TomcatWebServer  : Tomcat started on port(s): 8888 (http) with context path ''
2022-12-22T16:28:51.008+08:00  INFO 75439 --- [           main] c.a.cloud.imports.examples.Application   : Started Application in 0.653 seconds (process running for 0.662)
```

可以发现应用的启动速度大大加快。再通过 `vmmap pid | grep Physical` 命令查看运行过程中的内存占用情况通过原生镜像启动的应用内存占用情况如下：

```
Physical footprint:         59.2M
Physical footprint (peak):  59.2M
```

社区对比了同一个应用通过普通的方式启动 Java 应用的内存占用情况如下：

```
Physical footprint:         214.0M
Physical footprint (peak):  256.8M
```

可以看到，通过原生镜像启动 Java 应用后，内存占用大大减少。 应用启动后各项功能与通过 jar 启动无异。
