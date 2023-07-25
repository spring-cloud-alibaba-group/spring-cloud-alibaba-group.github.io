---
title: Static compilation
keywords: [Spring Cloud Alibaba]
description: Spring Cloud Alibaba, Roadmap Graalvm.
---

### Introduction to Static Compilation Capability

The biggest change brought by Spring Boot 3.0 this time is the support of GraalVM's native image, which is also the part that they spend more time and energy on as emphasized in the official document. As an alternative to JRE, GraalVM technology pre-compiles Java applications through technologies such as Ahead Of Time (AOT), allowing Spring to learn more about the application when it runs the application, making the entire application start faster. In addition, the final application can be smaller and occupy less memory by eliminating some unnecessary content during the compilation process through the compilation tool. It is very friendly to some scenarios that require very high startup speed, such as Serverless and FaaS scenarios! This time, Spring Boot 3.0 directly migrated it from Spring Native to Spring Boot, which also indicates that the technology has gradually matured, and the Spring ecosystem has entered the GraalVM stage!

Compared with the JVM compilation and deployment method, GraalVM has the following characteristics:

- Static analysis of the application starts from the main entry point during the application construction phase.

- When creating a native image, through code analysis, the inaccessible code will be deleted and will not become part of the executable file, so that the package size can be compressed to a certain extent.

- GraalVM cannot directly perceive the dynamic elements of the code. Therefore, for applications with reflection, serialization, and dynamic proxies, you need to provide relevant hint configuration files in advance to help parse the application. For related operations, refer to official documents.

- The application classpath is fixed at build time and cannot be changed.

- No lazy class loading, everything in the executable will be loaded into memory at startup.

- The supported Java applications have some restrictions in some aspects, so there is currently no guarantee that all previous Java applications can be directly built using GraalVM technology, and there may be incompatibility exceptions with a certain probability.

### background

The following is the community’s tests related to the startup speed and runtime occupancy of the sample applications of the currently supported service registration and discovery modules after the upgrade to Spring Boot 3.0, using GraalVM to build native application images (the test process was measured on macOS 11.4, 2.6 GHz 6-Core Intel Core i7 processor, 16G memory environment and simulated 3 times to take the average value):

<p align="center">
<img src="https://sca-storage.oss-cn-hangzhou.aliyuncs.com/website/graalvm_performance.jpg" />
</p>

From the above comparison, it can be found that the latest Spring Cloud Alibaba application that supports Spring Boot 3.0 and is based on GraalVM will be greatly reduced in terms of startup speed, runtime memory usage, and application package size. This brings significant advantages to applications hosted on the cloud in the cloud-native era, allowing them to perform elastic expansion and contraction faster and reduce the overall cost of using the cloud for enterprises!

### Adaptation function module

- Nacos;

- Seata;

- Sentinel;

- RocketMQ.

### Adaptation progress

At present, each module has successfully added the hints code class missing in Spring Cloud Alibaba through the `RuntimeHintsRegistrar` provided by Spring;

- https://github.com/alibaba/spring-cloud-alibaba/pull/3371

- https://github.com/alibaba/spring-cloud-alibaba/pull/3370

The metadata of each module has been submitted to OracleLab's central metadata warehouse.

- https://github.com/oracle/graalvm-reachability-metadata/issues/260

### Official release time

It is expected that the 2022 official version will be officially released in mid-to-late July, which will provide comprehensive support for static compilation capabilities.