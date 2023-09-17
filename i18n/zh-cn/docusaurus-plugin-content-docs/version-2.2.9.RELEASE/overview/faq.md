---
title: FAQ
keywords: [Spring Cloud Alibaba]
description: Spring Cloud Alibaba FAQ.
custom_edit_url: https://github.com/spring-cloud-alibaba-group/spring-cloud-alibaba-group.github.io/blob/master/i18n/zh-cn/docusaurus-plugin-content-docs/current/overview/faq.md
---

# FAQ

<a href="#1" target="_self">1. Spring Cloud Alibaba 维护了几个分支，对应的区别是什么？</a>
<br/>

<a href="#2" target="_self">2. 关于组件版本选择，需要去哪参考？</a>
<br/>

<a href="#3" target="_self">3. 社区有版本建设路线规划吗？</a>
<br/>

<a href="#4" target="_self">4. 社区有周会讨论吗，怎么参与进来？</a>
<br/>

<a href="#5" target="_self">5. Spring Cloud Alibaba 和 Spring Cloud、Spring Cloud Netflix 的区别在哪？</a>
<br/>

<a href="#6" target="_self">6. 有最佳实践示例吗？</a>
<br/>

<a href="#7" target="_self">7. Spring Cloud Alibaba 可以集成新开源的网关 Higress 吗？</a>
<br/>

<a href="#8" target="_self">8. 如何成为社区 Committer？</a>
<br/>

<a href="#9" target="_self">9. 社区有提供相关的学习资料，或者是技术博客吗？</a>
<br/>

---

<h3 id='1'>Q： 1. Spring Cloud Alibaba 维护了几个分支，对应的区别是什么？</h3>

**A：**

Spring Cloud Alibaba 目前有三个分支在积极维护，分别是 `2.2.x`，`2021.x`，`2022.x`

版本特性如下：

- [2.2.x](https://github.com/alibaba/spring-cloud-alibaba/tree/2.2.x)：集成了服务治理相关的功能模块，比如[异地多活](https://github.com/alibaba/spring-cloud-alibaba/tree/2.2.x/spring-cloud-alibaba-examples/appactive-example), [标签路由](https://github.com/alibaba/spring-cloud-alibaba/tree/2.2.x/spring-cloud-alibaba-examples/governance-example/label-routing-example)，[Istio 权限验证](https://github.com/alibaba/spring-cloud-alibaba/tree/2.2.x/spring-cloud-alibaba-examples/governance-example/authentication-example)功能。

- [2021.x](https://github.com/alibaba/spring-cloud-alibaba/tree/2021.x)：适配了 Spring Cloud 2021.x 系列的版本，集成了 Spring Cloud Alibaba 各个功能组件。

- [2022.x](https://github.com/alibaba/spring-cloud-alibaba)：集成了 Spring Cloud Alibaba 对于 [GraalVM](https://www.graalvm.org/) 静态编译的支持。

---

<h3 id='2'>Q： 2. 关于组件版本选择，需要去哪参考？</h3>

**A：**

1. 参考 Github 仓库 Wiki：[版本说明](https://github.com/alibaba/spring-cloud-alibaba/wiki/%E7%89%88%E6%9C%AC%E8%AF%B4%E6%98%8E)；

2. 参考官网的[版本发布说明文档](./version-explain.md)。

---

<h3 id='3'>Q： 3. 社区有版本建设路线规划吗？</h3>

**A：**

社区对各个版本的建设，都有详细的规划设计，具体可参见：[Roadmap](./roadmap/doc/doc.md)

---

<h3 id='4'>Q： 4. 社区有周会讨论吗，怎么参与进来？</h3>

**A：**

<!-- todo：需要更新连接，无法通过相对路径连接 -->

参考[社区](../../../community/community-weekly-meeting/attend-a-meeting)模块。

---

<h3 id='5'>Q： 5. Spring Cloud Alibaba 和 Spring Cloud、Spring Cloud Netflix 的区别在哪？</h3>

**A：**

Spring Cloud：Spring 官方提供的分布式应用开发的一套共用模式，也可以理解成一套微服务开发的统一的抽象编程模型。

Spring Cloud Netflix：基于 Spring Cloud 编程模型实现的微服务框架，是最早期的微服务框架。近年来，Netflix 宣布大多数组件停止维护。

Spring Cloud Alibaba：Alibaba 提供的基于 Spring Cloud 编程模型实现的微服务框架，其所有组件都来自于阿里巴巴微服务技术，无论是解决方案完整性、技术成熟度、社区还是文档资料等都对国内开发者非常友好。

---

<h3 id='6'>Q： 6. 有最佳实践示例吗？</h3>

**A：**

参考 [最佳实践](../best-practice/integrated-example.md)

---

<h3 id='7'>Q： 7. Spring Cloud Alibaba 可以集成新开源的网关 Higress 吗？</h3>

**A：**

可以集成，相关功能正在规划中，具体可参见 [Roadmap](./roadmap/doc/doc.md)：

---

<h3 id='8'>Q： 8. 如何成为社区 Committer？</h3>

**A：**

<!-- todo：需要更新连接，无法通过相对路径连接 -->

- 关于社区贡献，可以参考[开发者模块](../../../community/developer/contributor-guide/new-contributor-guide_dev)，其中有相关叙述。

- Committer 是具有仓库写权限的个人，包含以下的标准：

  - 能够在长时间内做持续贡献 issue、PR 的个人；
  - 对社区做出了重要 feature 贡献；
  - 参与 issue 列表的维护、重要 feature 的讨论、社区周会主持与参与社区周会分享等社区活动；
  - 参加过至少 1 次的社区季度活跃贡献者计划；
  - 参与 code review；
  - Committer 由 Steering Committee 成员提名投票产生，至少获得 3 票同意才能当选；

---

<h3 id='9'>Q： 9. 社区有提供相关的学习资料，或者是技术博客吗？</h3>

**A：**

<!-- todo：需要更新连接，无法通过相对路径连接 -->

- 社区目前现在有[博客模块](../../../blog/SCA-Proxyless-Mesh)，更新一些社区相关的功能介绍和在一些前沿技术上的探索；

- 相关学习资料正在整理中，不久之后会在官网发布。

---
