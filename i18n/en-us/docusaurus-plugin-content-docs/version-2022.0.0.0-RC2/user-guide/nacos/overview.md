---
title: Overview
keywords: [Spring Cloud Alibaba,Nacos]
description: Nacos,overivew.
---

## Service registration and discovery

The biggest difference between microservice and traditional monomer application architecture is that it emphasizes the splitting of software modules. Under monomer architecture, multiple functional modules of an application system are organized together and deployed and run in the same application process. Therefore, the response to a request can be completed directly between modules through method invocation. However, in the micro-service system, an application system needs to be split and deployed separately according to its functional characteristics in a certain granularity, so as to achieve high cohesion within modules, low coupling between modules, and high scalability of the whole micro-service system:

<p align="center">
<img src="https://sca-storage.oss-cn-hangzhou.aliyuncs.com/website/docs/zh/nacos/service-register-discovery.png"/>
</p>

The original request processing can be completed in one application at a time, there will be cross-process and cross-host service calls, how to enable the services to find each other and provide unified external service call ability like a single application is one of the core problems that need to be solved at the level of microservice framework.
In the Spring Cloud ecosystem, the following service registration and discovery model is adopted to realize mutual discovery and invocation of micro-services.

![service registration and discovery model](https://sca-storage.oss-cn-hangzhou.aliyuncs.com/website/docs/zh/nacos/service-register-discovery-module.png)

As shown in the figure above, a component called a registry is introduced into the microservice system to act as a coordinator. The most simplified process is that all micro-service applications will send their own information including service name, host IP address, port number and other information to the registry during startup. Then the upstream micro-service will search the IP address and port number of all instances of the corresponding service in the registry according to the service name in the process of processing the request for service invocation. The whole process is illustrated by the dotted line. This allows discrete microservice systems to provide external request processing capabilities as a whole.

## Configuration management

Before introducing distributed configuration, let me briefly introduce the concept of configuration. The configuration of software system refers to all kinds of Settings and parameters required in the software running process, including system configuration, application configuration and user configuration. System configuration includes the setting of basic environment parameters such as operating system, hardware and network. Application configuration includes setting various parameters and options of the application, such as database connection string, log level, etc. User configuration refers to user-defined options and parameters, such as shortcut keys, interface layout, and language. Configuration in the software system is an important supplement to the software source code, through it can easily adjust the execution behavior of the software system, make the software system more flexible.
In addition to single application, configuration information is widely used in distributed system. Different functions can be realized through configuration. Configuration information such as database connection information, log level, service configuration, and so on. In traditional development, this configuration information is often hard-coded into the application code, packaged and deployed along with the program code. However, this approach has many disadvantages, such as the configuration information is not easy to maintain, and any change in the configuration requires rebuilding and deployment.

![service-config](https://sca-storage.oss-cn-hangzhou.aliyuncs.com/website/docs/zh/nacos/service-config.png)

The software architecture using the distributed configuration center is shown in the figure above, which can help solve the following problems in the distributed scenario:
1. Managing application configuration: When there are a large number of applications to manage, manually maintaining configuration files can become difficult. The Distributed Configuration Center provides a solution to centrally manage and distribute configuration information.
2. Environment isolation: Application configuration information is often different in different environments, such as development, test, and production. Using the distributed configuration Center, you can easily manage and distribute configuration information in different environments.
3. Improve program security: Storing configuration information in a codebase or application file can lead to security risks, as the information can be accidentally leaked or exploited by malicious attackers. Distributed configuration allows you to encrypt and protect configuration information and control access permissions.
4. Dynamically update configuration: While the application is running, you may need to update configuration information dynamically so that the application can respond to changes. With the distributed configuration Center, configuration information can be dynamically updated at run time without having to restart the application.

## Overview of Nacos

[Nacos](https://nacos.io/zh-cn/) /nɑ:kəʊs/ is the abbreviation of Dynamic Naming and Configuration Service. A dynamic service discovery, configuration management, and service management platform that makes it easier to build cloud-native applications.

Nacos is dedicated to helping you discover, configure, and manage microservices. Nacos provides an easy-to-use feature set that helps you quickly implement dynamic service discovery, service configuration, service metadata, and traffic management.

Nacos helps you build, deliver, and manage microservice platforms more quickly and easily. Nacos is a service infrastructure for building modern application architectures (such as micro-service paradigm and cloud native paradigm) with "service" as the center.