---
title: How to smoothly migrate Spring Cloud Alibaba applications to IPv6?
keywords: [IPv6, IP protocol stack smooth migration]
description: Introduces how Spring Cloud Alibaba applications can be smoothly migrated to IPv6
author: Cheng Pu
date: 2023-03-30
---

## Summary

As a next-generation Internet protocol, migration to IPv6 is the general trend in the future. However, due to the large-scale application of the IPv4 protocol in the current Internet, there is no way for users to specify a time and date. From that moment on, all devices on the Internet will use IPv6, which is unrealistic. One-time migration is not only unfeasible at the infrastructure level, but for enterprise users, even if the infrastructure can be prepared, it is unacceptable for enterprise users to shut down at least hundreds or even thousands of application instances for a period of time for protocol stack migration, no matter in terms of risk or cost! Since it cannot be done in one step, gradual IP address migration has become the current mainstream choice. This article will introduce some mainstream gradual IP address migration methods.

<!--truncate-->

## background

The IPv4 protocol (hereinafter referred to as IPv4) has made important contributions to the development and popularization of the Internet, but in recent years, with the explosive growth of applications, data and IT services. The IPv4 address used to describe the 32-bit binary number format used in the protocol design process has been exhausted in 2011 [[1]](https://www.infoq.cn/article/vpdcmupcw3mev3l2kx41), and since then, the whole world has been in a situation where no new addresses are available.

The IPv6 protocol (hereafter referred to as IPv6) is the next-generation Internet protocol adopted after IPv4. Compared with the IPv4 protocol, which uses 32 bits to represent IP addresses, the number of address representation bits has been expanded to 128 bits, and the number of addresses is 2 to the 96th power that IPv4 can provide. Simply looking at the numbers may seem unintuitive. Instead, it is more intuitive and classic to describe the number of IPv6 addresses: "IPv6, which uses 128 bits to represent addresses, can assign an IP address to every grain of sand on the earth"! In addition, the IPv6 protocol can not only solve the address shortage problem in the IPv4 protocol, but also provide more efficient and secure network communication for the Internet. The IPv6 protocol provides many new functions and advantages in network communication. For example, in terms of data transmission and routing, its new design improves efficiency and reliability, reducing network congestion and packet loss. In addition, in the field of security, its built-in support for IPSec can better protect the security of data transmission in the network and prevent hackers from attacking and stealing data.
As a next-generation Internet protocol, migration to IPv6 is the general trend in the future. In my country, since 2014, relevant agencies have gradually stopped allocating IPv4 addresses to new users and applications, and started to fully commercialize the IPv6 protocol (Computer Network (Seventh Edition) Xie Xiren). According to government guidance, in recent years, a series of related guidance documents have been issued successively, such as: [Action Plan for Promoting Internet Protocol Version 6 (IPv6) Scale Deployment](http://www.gov.cn/zhengce/2017-11/26/content_5242389.htm)” issued by the State Council in 2017, and “[IPv6 Traffic Improvement Three-Year Special Action Plan (2021-2023)](http://www.xinhuanet.com/info/2021-07/09/c_1310052164.htm) issued by the Ministry of Industry and Information Technology in 2021, the [Guiding Opinions on Promoting IPv6 Scale Deployment](http://www.gov.cn/zhengce/zhengceku/2021-07/23/content_5626963.htm) issued by the Cyberspace Administration of China protocol migration to IPv6 protocol.
However, due to the large-scale application of the IPv4 protocol in the current Internet, there is no way for users to specify a time and date. From that moment on, all devices on the Internet will use IPv6, which is unrealistic. One-time migration is not only unfeasible at the infrastructure level, but for enterprise users, even if the infrastructure can be prepared, it is unacceptable for enterprise users to shut down at least hundreds or even thousands of application instances for a period of time for protocol stack migration, no matter in terms of risk or cost! Since it cannot be done in one step, gradual IP address migration has become the current mainstream choice. Next, this article will introduce some mainstream gradual IP address migration methods.

## Migration scheme

Although the IPv6 protocol has many advantages, its promotion and application still face many challenges. The popularization of IPv6 requires supporting infrastructure measures and support on a global scale, including updating of network equipment, personnel training, promotion of policies and regulations, and so on. At the same time, the compatibility between IPv6 and IPv4 is also an important issue, which needs to be solved through technical means and transition mechanism.
Common IP protocol gradual migration coexistence solutions mainly include dual stack (Dual Stack), tunneling (Tunneling) and other technologies. Among them, dual-stack technology is a widely used IPv4/IPv6 coexistence technology in the industry. Its purpose is to install IPv4 and IPv6 dual protocol stacks for devices before the Internet completely transitions to IPv6. A dual-stack device can communicate with a single-IPv4, single-IPv6, or dual-stack device. By allowing various protocol stacks to coexist, the migration of the IP protocol stack is carried out gradually. For example, Kubernetes has already supported [dual-stack function](https://kubernetes.io/zh-cn/docs/concepts/services-networking/dual-stack/) very early.
Tunneling technology is a method of encapsulating IPv6 addresses into IPv4 datagrams. After the data is sent from the IPv6 single protocol stack, in the process of passing through the IPv4 single stack network environment, the IPv6 address is encapsulated into the IPv4 datagram as the content of the IPv4 datagram, and then transmitted through the IPv4 protocol stack. After passing through the IPv4 single-stack environment, when coming to the IPv6 single-stack environment, the content of the IPv6 data segment in the datagram is parsed out, and a new IPv6 datagram is constructed for transmission in the IPv6 protocol stack environment.

## Microservice dual-stack migration solution

The solutions presented above are more of a generalized methodology. But specifically in the microservice system, how does the remote call process realize the coexistence of multiple protocol stacks so as to help enterprise users smoothly migrate the protocol stacks?

![image.png](https://intranetproxy.alipay.com/skylark/lark/0/2023/png/21257183/1679207793618-9c431106-93a2-452f-be71-32185f826569.png#clientId=u0b49bd32-d731-4&from=paste&height=386&id=F7Hec&name=image.png&originHeight=772&originWidth=1464&originalType=binary&ratio=2&rotation=0&showTitle=false&size=71775&status=done&style=none&taskId=u05d69bc5-9d7e-4646-987b-e869da537ba&title=&width=732)

The above figure is the remote call process architecture diagram commonly used between services in the current microservice system in the industry. Next, this article introduces how to implement the common method of smooth migration of the protocol stack of the microservice application based on the dual-stack technology.

### Double registration and double subscription to achieve smooth migration of the protocol stack

In the microservice system, compared with the single-stack environment, there is only one IP address, and the registration and discovery process of the microservice is based on the address to complete the service remote call. In an environment where multiple protocol stacks coexist, the essence is to solve the problem of how to use IP addresses during service registration and discovery.
After sorting out the problem, it is not difficult to find that the method based on double registration and double subscription can better solve the problem of coexistence of multiple protocol stacks in the microservice system, so as to realize the smooth migration of the protocol stack of the microservice system. The service registration and subscription process of this solution can be described as shown in the following figure:

![image.png](https://intranetproxy.alipay.com/skylark/lark/0/2023/png/21257183/1679216863247-e13d938b-a2a5-4965-b417-0d323d1c11fd.png#clientId=u21221381-1afe-4&from=paste&height=534&id=R9qXH&name=image.png&originHeight=1068&originWidth=1352&originalType=binary&ratio=2&rotation=0&showTitle=false&size=115412&status=done&style=none&taskId=u4adc2aaa-4fcc-4830-aca5-beccded9a22&title=&width=676)

The process of using double registration and double subscription to realize the smooth IP protocol stack migration of the microservice system can be roughly described as the following steps:

1. Before the new application is upgraded or released, upgrade the IP address protocol stack of the host machine where the relevant microservice application is located, so that it supports both IPv4 and IPv6 dual protocol stacks.
2. For the microservice application transformed in step 1, at the microservice framework level, a dual-stack address extraction module extracts valid IPv4 and IPv6 addresses in the application host, and registers both dual-stack addresses to the registration center through the service registration module.
3. The consumer subscribes to the IPv4 and IPv6 dual-stack addresses of a service in the registration center, and compares the protocol stack type supported by the host through the dual-stack address resolution module at the application service framework level. If the host only supports IPv4 protocol, use the provider’s IPv4 address to initiate a service call; if it only supports IPv6 or supports both dual stacks, use the provider’s IPv6 address to initiate a service call;
4. After all the microservices in the system support the IPv6 protocol stack, gradually close the IPv4 protocol stack for all application hosts, so as to smoothly complete the migration of the large-scale microservice system from the IPv4 protocol stack to the IPv6 protocol stack.

### Realize smooth migration of protocol stack based on DNS technology

Although the method of dual registration and dual subscription is natural and clear, it will reduce the service capacity of the registration center because an additional record corresponding to the IP address will be registered for the application in the dual-stack environment during the service registration process.
Therefore, it is also possible to realize the coexistence of multiple protocol stacks based on DNS technology, and to solve the method of protocol stack migration in the microservice system. Its essence is to change the original process of registering the service instance address into the registration service instance domain name (the domain name here is more of an instance identification function), which can realize the coexistence of multiple protocol stacks through the additional DNS domain name system to store the dual-stack IP address corresponding to the service domain name under the condition that the number of registered service instance records in the registry remains unchanged. The service registration and subscription process using this scheme is shown in the following figure:

![image.png](https://intranetproxy.alipay.com/skylark/lark/0/2023/png/21257183/1679217073664-4fc6c45d-b58c-4ae7-b446-ba0c3ff60400.png#clientId=u21221381-1afe-4&from=paste&height=462&id=u23c7c9fd&name=image.png&originHeight=924&originWidth=1600&originalType=binary&ratio=2&rotation=0&showTitle=false&size=141458&status=done&style=none&taskId=ud6e287ba-8c6f-404a-975b-53976811967&title=&width=800)

The process of implementing smooth IP address migration in a microservice system based on DNS technology can be roughly described as the following steps:

1. Before the new application is upgraded or released, the IP address protocol stack of the relevant micro-service application is transformed so that it supports both IPv4 and IPv6 dual protocol stacks. The modified application needs to register the dual-stack IP address information of the machine and the domain name characteristic of this application instance to the DNS service of the system.
2. After completing the domain name registration, the application instance registers the local domain name to the registration center.
3. The consumer subscribes to the domain name of all instances of a certain service in the registration center, and initiates a request based on domain name resolution to the DNS service in the system through the domain name resolution module at the application framework level. After obtaining the IP address corresponding to the example domain name through DNS, compare the protocol stack type supported by the host machine. If the host machine only supports IPv4, use the IPv4 address to initiate the service call; if the host machine only supports IPv6 or supports both stacks at the same time, use the IPv6 address to initiate the service call;
4. After all the microservices in the system support the IPv6 protocol stack, gradually close the IPv4 protocol stack for all application hosts, so as to smoothly complete the migration of the large-scale microservice system from the IPv4 protocol stack to the IPv6 protocol stack.
   Compared with the double registration and double subscription method, the DNS-based method can better solve the redundant pressure on the registration center during the double registration and double subscription process, but the high availability of DNS is also a point that enterprise users need to pay special attention to.

## practice

As a widely used microservice framework, Spring Cloud Alibaba has provided a solution for interoperability and coexistence of different protocol stack applications in microservice scenarios in version 2021.0.5.0, so as to help enterprise users realize the protocol stack migration capability of large-scale microservice systems. The community solution is based on the implementation of dual registration and dual subscription. After the application is started, the IPv4 address and IPv6 address of the microservice will be registered in the registration center by default. The IPv4 address will be stored under the IP field in the Nacos service list, and the IPv6 address will be in the metadata field of Nacos. When a service consumer calls a service provider, it will select an appropriate IP address type to initiate a service call according to its own IP protocol stack support. Specific rules:

1. If the service consumer itself supports IPv4 and IPv6 dual protocol stacks or only supports the IPv6 protocol stack, the service consumer will use the IPv6 address provided by the service to initiate a service call;
2. If the service consumer itself only supports IPv4 single protocol stack, the service consumer will use the IPv4 address provided by the service to initiate a service call.

## Application configuration

Compared with the general use of Spring Cloud Alibaba to build microservices, the following configuration needs to be added to the application to use the protocol stack coexistence migration function:

### Service Registration

At present, after using the Spring Cloud Alibaba version that supports the protocol stack coexistence and migration function, the service provider does not need to do any configuration during the service registration process, and will check the protocol stack supported by the current application by default. If the default is a single IPv6 or IPv4 protocol stack, only the corresponding address will be registered. If the application supports dual-stack, it will automatically obtain the IPv6 address of the application, and then register the IPv6 address in the registration center as the service instance metadata of the application instance.

### Service Consumption

If the application uses the Spring Cloud Alibaba 2021.0.5.0 version, the Spring Cloud LoadBalancer load balancing strategy is used by default, and the following configuration needs to be added to the consumer application application.properties configuration file to enable the protocol stack coexistence migration function:

```properties
spring.cloud.loadbalancer.ribbon.enabled=false
spring.cloud.loadbalancer.nacos.enabled=true
```

## Effect demonstration

For the convenience of demonstration, this article builds a dual-stack environment directly based on [Aliyun Container Service ACK](https://www.aliyun.com/product/kubernetes) to demonstrate service registration and consumption in a dual-stack environment.

## Service Registration

The Pod information of the service provider instance used in this article is as follows:

![image.png](https://intranetproxy.alipay.com/skylark/lark/0/2023/png/21257183/1679227819209-cb1b2ad6-4402-4075-aced-065f76160da4.png#clientId=uf73c13f1-991a-4&from=paste&height=156&id=u81a5cd10&name=image.png&originHeight=312&originWidth=2446&originalType=binary&ratio=2&rotation=0&showTitle=false&size=204807&status=done&style=none&taskId=uefd0add8-a6af-4436-807e-6606dc783fd&title=&width=1223)

Based on the coexistence and migration function of the Spring Cloud Alibaba protocol stack, its service instance list information on the registration center:

![image.png](https://intranetproxy.alipay.com/skylark/lark/0/2023/png/21257183/1679227850292-4c9d3cae-9a3a-4464-b863-17d4390bbb17.png#clientId=uf73c13f1-991a-4&from=paste&height=126&id=u78988947&name=image.png&originHeight=252&originWidth=2554&originalType=binary&ratio=2&rotation=0&showTitle=false&size=143946&status=done&style=none&taskId=u05f1052d-335b-4533-a72e-66a703f4b3d&title=&width=1277)

## Service Consumption

Single-stack environment service consumer:

![image.png](https://intranetproxy.alipay.com/skylark/lark/0/2023/png/21257183/1679280217276-9e3cd3dc-b181-49a9-b6cf-c156e6720112.png#clientId=uf73c13f1-991a-4&from=paste&height=154&id=u326c0cf1&name=image.png&originHeight=308&originWidth=2462&originalType=binary&ratio=2&rotation=0&showTitle=false&size=181070&status=done&style=none&taskId=uddf23c9b-d437-4022-8d3b-9b3edf72c14&title=&width=1231)

After the service call is successful, the service provider will print the calling IP address of the calling consumer:

![image.png](https://intranetproxy.alipay.com/skylark/lark/0/2023/png/21257183/1679280312813-4cb6d6e3-8a65-4be4-8660-b8af1cbecc23.png#clientId=uf73c13f1-991a-4&from=paste&height=181&id=u77731e53&name=image.png&originHeight=362&originWidth=2248&originalType=binary&ratio=2&rotation=0&showTitle=false&size=185950&status=done&style=none&taskId=u1b6c29bc-8997-4926-affd-f4a5f252ff3&title=&width=1124)

From the above returned results, consumers in the IPv4 single-stack environment always initiate requests to dual-stack service providers through the IPv4 protocol stack because they only support single-stack.
Dual-stack environment service consumer:

![image.png](https://intranetproxy.alipay.com/skylark/lark/0/2023/png/21257183/1679280399202-87209390-cddf-4f48-b53c-d035f67312c9.png#clientId=uf73c13f1-991a-4&from=paste&height=153&id=u7b1bfd9e&name=image.png&originHeight=306&originWidth=2436&originalType=binary&ratio=2&rotation=0&showTitle=false&size=192353&status=done&style=none&taskId=u4f98585e-d87d-466b-b7de-0c6d25df563&title=&width=1218)

After the service call is successful, the service provider will print the calling IP address of the calling consumer, and you can see that the IPv6 address of the consumer is printed:

![image.png](https://intranetproxy.alipay.com/skylark/lark/0/2023/png/21257183/1679280496522-771aa27f-3c61-4c27-b2ba-931bfa3702d0.png#clientId=uf73c13f1-991a-4&from=paste&height=155&id=u808935b7&name=image.png&originHeight=310&originWidth=2252&originalType=binary&ratio=2&rotation=0&showTitle=false&size=202478&status=done&style=none&taskId=u68cd3a36-1de8-4598-b73d-c027faf51f8&title=&width=1126)

From the above returned results, consumers in the IPv4/IPv6 dual-stack environment support IPv6, and in order to realize the migration of the protocol stack to IPv6, they always send requests to the dual-stack service provider through the IPv6 protocol stack by default.
