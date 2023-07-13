---
title: Roadmap
keywords: [Spring Cloud Alibaba]
description: Spring Cloud Alibaba Roadmap.
custom_edit_url: https://github.com/higress-group/higress-group.github.io/blob/main/i18n/zh-cn/docusaurus-plugin-content-docs/current/overview/roadmap.md
---

<a href="#1" target="_self">&nbsp;&nbsp;&nbsp;&nbsp;Service Governance Capacity Building</a>
<br/>


<a href="#2" target="_self">&nbsp;&nbsp;&nbsp;&nbsp;Docking RocketMQ 5.0</a>
<br/>

<a href="#3" target="_self">&nbsp;&nbsp;&nbsp;&nbsp;Graalvm static compilation adaptation</a>
<br/>

<a href="#4" target="_self">&nbsp;&nbsp;&nbsp;&nbsp;Document official website construction</a>
<br/>

<h3 id='1'>Service governance capacity building</h3>

### Governance Capacity Building

**background**

Spring Cloud Alibaba has done some governance-related work before, but it only covers some scenarios of Istio. In the future, it plans to continue to connect the governance capabilities that have not yet been connected to DestinationRule and VirtualService in Istio, so that users can seamlessly connect to it. In the cloud-native technology system.

**Feature List（TODO）**

1. Support Istio first-part jwt

2. grpc version update and adaptation

3. TLS

     - mTLS/TLS communication (including using ISTIO's own mTLS and user-defined certificates)

     - Support authentication authentication (under the premise of mTLS)

4. DestinationRule & VirtualService

     - Obtain load-balanced endpoints through EDS-related information, which means that service discovery data can be obtained directly from the control plane, without additional use of registration centers such as Nacos in the cloud-native system

     - Through the load balancing strategy specified in CDS, combined with spring-cloud-loadbalancer and other components to implement different load balancing strategies for different subsets

     - General load balancing strategy

       ● RANDOM, PASSTHROUGH, ROUND_ROBIN, LEAST_REQUEST
    
     - consistent hashing
     - Regional load balancing

     - Configure the connection-related configuration of Feign in Spring Cloud through the connection pool configuration configured in DestinationRule

         ■ Maximum number of retries

         ■ Maximum idle time

         ■ http2 related configuration

     - Through OutlierDetection in DestinationRule, feign's outlier instance removal is realized

         ■ Number of consecutive errors

         ■ Error Interval
        
         ■ Minimal enucleation percentage
        
         ■ Maximum removal percentage
        
         ■......

     - Through the request/response header operation in VirtualService, modify the request/response header to access this application

     - Through the matching rules of HTTP and HTTPS traffic in virtualService, some capabilities of label routing are enhanced

     https://istio.io/latest/zh/docs/reference/config/networking/virtual-service/#HTTPMatchRequest
     https://istio.io/latest/zh/docs/reference/config/networking/virtual-service/#TLSMatchAttributes
    
     For example, do some support for inversion operations (without headers), and route according to some additional labels

     ○ Return directly through the redirection in VirtualService to realize the service mock

     ○ Realize path rewriting through path rewriting in VirtualService

     ○ Implement fault retry through fault retry in VirtualService

     ○ Realize cross-domain through cross-domain in VirtualService

     ○ Realize fault injection through fault injection in VirtualService

**TODO:**

1. xds-bootstrap research

2. mtls implementation and integration

### Service contract docking

**Effect**

- After adding dependencies and specifying the reporting address, the user can achieve the following capabilities:

- The user writes the controller, and can see request information such as path/method on the open source console

- The user writes the controller, brings the openapi v3 annotation, and can see information such as path/method/parameter description on the open source console

**Technical realization**

- **Spring Cloud Alibaba New Module**

     SCA opens the service governance module, which has the following functions:

     1. After the application starts, scan all controllers and collect openapi information

     2. If the reporting address is configured, report the information to the console

- **Report data format**

     There are currently two options for the format:

     1. Refer to OpenAPI format to report, for example: https://editor.swagger.io/

     2. Extend the metadata format of dubbo, for example: https://github.com/apache/dubbo/pull/7029#issuecomment-746162196
     In order to support k8s deployment in the future, the above format will be converted into proto/gRPC definition at the same time.

- **Report data certification**

     The current reporting method is more inclined to json reporting, user name and password authentication.

     In order to support k8s deployment in the future, mtls authentication + gRPC reporting will be supported.

- **Console**

     <p align="center">
     <img src="https://sca-storage.oss-cn-hangzhou.aliyuncs.com/website/image.png" />
     </p>

     Since the service governance open source will continue to use the Sentinel console, a "service contract" menu will be added to the Sentinel console to display service contract information.

- **other**

     For more information about open source microservice governance, please refer to: https://www.yuque.com/ot01yo/thyzgp/rgzqv3

<h3 id='2'>Docking RocketMQ 5.0</h3>

### New features of RocketMQ 5.0

<p align="center">
<img src="https://sca-storage.oss-cn-hangzhou.aliyuncs.com/website/image%20%282%29.png" />
</p>

**1. Cloud-native infrastructure**

<p align="center">
<img src="https://sca-storage.oss-cn-hangzhou.aliyuncs.com/website/image%20%281%29.png" />
</p>

**2. Lightweight API and multilingual integration**

RocketMQ 5.0 launched a new multi-language SDK based on gRPC. The new SDK simplifies complexity, is lighter, and is easier to use and integrate.
In version 5.0, the maven coordinates of the officially recommended Java Client are:

```xml
<dependencies>
     <dependency>
         <groupId>org.apache.rocketmq</groupId>
         <artifactId>rocketmq-client-java</artifactId>
         <version>5.0.0</version>
     </dependency>
</dependencies>
```

In version 4.9, the maven coordinates are:

```xml
<dependencies>
     <dependency>
         <groupId>org.apache.rocketmq</groupId>
         <artifactId>rocketmq-client</artifactId>
         <version>4.9.4</version>
     </dependency>
</dependencies>
```

At first glance, it can be seen that the artifact ID has changed. After a little research, you can find:
In RocketMQ 5.0, in order to unify clients in all languages, a Github repository https://github.com/apache/rocketmq-clients is maintained separately for developing multilingual clients, including Java, Golang, Cpp, Rust and other languages.


In the RocketMQ 4.x version, the Java language still uses the client module in the RocketMQ main warehouse as the client.
That is to say, in RocketMQ 5.0, the Java client has undergone tremendous changes, achieving the purpose of simplifying, lightweight, and unifying with other language functions.
Then in Spring Cloud Alibaba, we will also consider using the new version of Java Client as the underlying implementation to update the relevant code.

- **Consumer**

     In the new version of Java Client, three Consumer types are provided:

     <p align="center">
     <img src="https://sca-storage.oss-cn-hangzhou.aliyuncs.com/website/image%20%283%29.png" />
     </p>

     Among them, SimpleConsumer is a newly added consumer interface, which provides more flexible custom configuration.

     We can consider connecting the latest version of Java Client in Spring Cloud Alibaba and supporting the corresponding Consumer type.
     For details, please refer to: https://rocketmq.apache.org/zh/docs/featureBehavior/06consumertype

- **Provider**

     Correspondingly, the interface of Producer has also changed,

     <p align="center">
     <img src="https://sca-storage.oss-cn-hangzhou.aliyuncs.com/website/image%20%284%29.png" />
     </p>

     The implementation of Producer can also be modified according to the latest interface.


**3. Event and stream processing scenario integration**

In terms of computing framework, RocketMQ 5.0 introduces a set of lightweight stream processing framework RSteams. RStreams has less dependencies, is easy to deploy, and can be scaled out arbitrarily. It can use RocketMQ resources to complete lightweight data processing and calculations.
Github: https://github.com/apache/rocketmq-streams
rocketmq-stream implements a series of advanced APIs, allowing users to easily write stream computing programs to meet their business needs.

We know that Spring Cloud Alibaba integrates RocketMQ through Spring Cloud Stream. Here we can consider creating a new binder to integrate rocketmq-streams. For specific integration, please refer to Spring Cloud Stream's official integration of kafka-streams.

<p align="center">
<img src="https://sca-storage.oss-cn-hangzhou.aliyuncs.com/website/image%20%285%29.png" />
</p>

Reference: https://github.com/spring-cloud/spring-cloud-stream#apache-kafka-streams-binder

### Action

1. The provider client upgrade plan needs to be further determined.
2. It needs to be further confirmed that the Consumer client supports the SimpleConsumer solution.
3. Whether rocketmq-streams supports stream time processing and the form of support needs to be discussed within the interest group and community core.

<h3 id='3'>Graalvm static compilation adaptation</h3>

### Introduction to Static Compilation Capability

The biggest change brought by Spring Boot 3.0 this time is the support of GraalVM's native image, which is also the part that they spend more time and energy on as emphasized in the official document. As an alternative to JRE, GraalVM technology pre-compiles Java applications through technologies such as Ahead Of Time (AOT), allowing Spring to learn more about the application when it runs the application, making the entire application start faster. In addition, the final application can be smaller and occupy less memory by eliminating some unnecessary content during the compilation process through the compilation tool. It is very friendly to some scenarios that require very high startup speed, such as Serverless and FaaS scenarios! This time, Spring Boot 3.0 directly migrated it from Spring Native to Spring Boot, which also indicates that the technology has gradually matured, and the Spring ecosystem has entered the GraalVM stage!

Compared with the JVM compilation and deployment method, GraalVM has the following characteristics:

- Static analysis of the application starts from the main entry point during the application construction phase.

- When creating a native image, through code analysis, the inaccessible code will be deleted and will not become part of the executable file, so that the package size can be compressed to a certain extent.

- GraalVM cannot directly perceive the dynamic elements of the code. Therefore, for applications with reflection, serialization, and dynamic proxies, you need to provide relevant hint configuration files in advance to help parse the application. For related operations, refer to official documents.

- The application classpath is fixed at build time and cannot be changed.

- No lazy class loading, everything in the executable will be loaded into memory at startup.

- The supported Java applications have some restrictions in some aspects, so there is currently no guarantee that all previous Java applications can be directly built using GraalVM technology, and there may be incompatibility exceptions with a certain probability.

**background**

The following is a sample application related to the service registration and discovery module currently supported by the community. After upgrading to Spring Boot 3.0, using GraalVM to build a native application image to do a test related to startup speed and runtime content (the test process is on macOS 11.4, 2.6 GHz 6-Core Intel Core i7 processor, 16G memory environment, simulated 3 times and take the average value):

<p align="center">
<img src="https://sca-storage.oss-cn-hangzhou.aliyuncs.com/website/graalvm_performance.jpg" />
</p>

From the above comparison, it can be found that the latest GraalVM-based Spring Cloud Alibaba application that supports Spring Boot 3.0 will be greatly reduced in terms of startup speed, runtime memory usage, and application package size. For example, the startup speed of service registration consumer applications has increased by nearly 10 times, the runtime memory usage is reduced by nearly 2/3 compared to the original, the effect is very obvious. This brings significant advantages to applications hosted on the cloud in the cloud-native era, allowing them to perform elastic expansion and contraction faster and reduce the overall cost of using the cloud for enterprises!

**Adapted function module**

- Nacos;

- Seata;

- Sentinel;

- RocketMQ.

**Adaptation progress**

At present, each module has successfully added the hints code class missing in Spring Cloud Alibaba through the `RuntimeHintsRegistrar` provided by Spring;

- https://github.com/alibaba/spring-cloud-alibaba/pull/3371

- https://github.com/alibaba/spring-cloud-alibaba/pull/3370

The metadata of each module has been submitted to OracleLab's central metadata warehouse.

- https://github.com/oracle/graalvm-reachability-metadata/issues/260

**Official Release Date**

It is expected that the 2022 official version will be officially released in mid-to-late July, which will provide comprehensive support for static compilation capabilities.

<h3 id='4'>Document official website construction</h3>

### Document official website construction background

At present, community-related documents are mainly concentrated in the `spring-cloud-alibaba-docs` module, and the documents are written in adoc as a whole. The project documentation is based on [Spring Cloud official website](https://spring.io/projects/spring-cloud -alibaba), it is not conducive to the long-term development of the project and the timely update and iteration of documents. Therefore, the community decided to build its own official website, which is convenient for users to use and refer to documents.

**Technical Selection**

Consistent with the official website of other Ali open source projects, select the official website framework of the open source document of FaceBook: [Docusaurus](https://www.docusaurus.cn/)

**Current Progress**

At present, the construction of the official website of the document has entered the finishing work, and some details still need to be improved. Welcome to participate in [community official website construction] (https://github.com/spring-cloud-alibaba-group/spring-cloud-alibaba-group.github.io).

**release time**

It is expected to be officially released and launched in mid-to-late July.