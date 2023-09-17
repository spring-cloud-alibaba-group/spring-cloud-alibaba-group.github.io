---
title: 最佳实践示例
keywords: [Spring Cloud Alibaba]
description: Integrated Example.
---

## Spring Cloud Alibaba 项目简介

Spring Cloud Alibaba（下文简称为 SCA ） 致力于提供微服务开发的一站式解决方案。此项目包含开发分布式应用服务的必需组件，方便开发者通过 Spring Cloud 编程模型轻松使用这些组件来开发分布式应用服务。
依托 SCA，您只需要添加一些注解和少量配置，就可以将 Spring Cloud 应用接入阿里分布式应用解决方案，通过阿里中间件来迅速搭建分布式应用系统。

## 项目最佳实践案例介绍

SCA 的项目的最佳实践，是整合了 SCA 相关组件（Nacos，Sentinel，Seata，RocketMQ）的 Example 示例项目。方便用户全面体验 SCA 提供的一站式微服务解决方案。

    1. Spring Cloud Gateway：网关
    2. Nacos：服务注册和配置中心
    3. Sentinel：熔断限流
    4. Seata：分布式事务
    5. RocketMQ：消息队列，削峰填谷
    6. Docker：使用Docker进行容器化部署
    7. Kubernetes：使用k8s进行容器化部署

下图为 SCA 最佳实践项目结构示意图：

![项目结构示意图](https://sca-storage.oss-cn-hangzhou.aliyuncs.com/sca-example/image.png)

## 组件详细说明

1. 其中，用户下单购买货物的场景主要使用 Seata 来进行分布式事务的能力体现。

2. 用户为商品进行点赞的场景，模拟大流量环境下通过 Sentinel 进行限流或是 RocketMQ 进行削峰填谷。在此场景下，SCA 社区提供了两种应对大流量的处理方式：

   - Sentinel 在网关侧绑定指定网关路由进行服务的熔断降级。

   - RocketMQ 进行流量削峰填谷，在大流量请求下，生产者向 RocketMQ 发送消息，而消费者则通过可配置的消费速率进行拉取消费，减少大流量直接请求数据库增加点赞请求的压力。

### Spring Cloud Gateway

Spring Cloud GateWay 是微服务模块的网关，整合 Nacos，实现动态路由的配置。通过监听 Nacos 配置的改变，实现服务网关路由配置动态刷新，每次路由信息变更，无需修改配置文件而后重启服务。

### Nacos

Nacos 是 SCA 微服务模块的服务注册中心和配置中心。整合 Spring Cloud Gateway，所有的微服务模块都注册到 Nacos 中进行服务注册与发现。

### Seata

基于 Seata 的 AT 模式，用于库存模块，账户模块，订单模块的分布式事务处理。当库存不足/账户余额不足时，进行事务回滚。

### Sentinel

用于点赞场景的服务熔断限流。整合 Nacos 配置中心与 Spring Cloud Gateway，实现指定路由规则、熔断限流规则动态配置。

### RocketMQ

用于进行点赞服务流量的削峰填谷。通过将大流量的点赞请求从生产者发送到 mq，消费者模块从 mq 中拉取进行一定频率的消费，不是简单的直接服务熔断限流降级，实现 RocketMQ 针对大流量的削峰填谷能力。

### 应用场景说明

在本 Example 示例中，SCA 社区提供了两种业务场景：

1.  用户下单购买货物的场景，下单后： 

    1. 先请求库存模块，扣减库存； 

    2. 扣减账户余额；

    3. 生成订单信息返回响应。 

2.  用户为商品进行点赞（模拟 MQ 的生产者和消费者应用场景）返回商品点赞后的详细信息（点赞数等）。 

## 项目部署

### 部署前准备

在启动服务容器前，请先配置 Host 地址映射，确保服务能够正常启动！

    ```shell
    # for integrated-example
    127.0.0.1 integrated-mysql
    127.0.0.1 nacos-server
    127.0.0.1 seata-server
    127.0.0.1 rocketmq
    127.0.0.1 gateway-service
    127.0.0.1 integrated-frontend
    ```

### 服务本地化部署

**服务组件准备**

在运行示例项目之前，需要保证本机具备以下的基础环境，如果您的本地没有当前的环境，下面会一步步进行搭建，演示搭建过程。 当然您也可以通过 SCA 社区提供的 docker-compose 文件快速启动相应组件。本项目的各个组件版本请移步至各社区的 release 页面进行下载并解压运行。

- Nacos 服务端 [2.1.0 版本](https://github.com/alibaba/nacos/releases)
- Seata 服务端 [1.5.1 版本](https://github.com/seata/seata/releases)
- RocketMQ 服务端 [4.9.4 版本](https://github.com/apache/rocketmq/releases)
- MySQL 服务端 5.7 版本

**数据库配置**

在数据库配置开始之前，请确保 MySQL 的服务端开启并能够正常向外提供服务。

针对第一个场景，订单、账户、库存微服务都需要各自的数据库，而第二个场景模拟点赞也需要存储点赞信息的数据库。运行 spring-cloud-alibaba-examples/integrated-example/config-init/sql/init.sql 脚本创建业务所需的数据库环境以及 Seata 相关的数据表。

**Nacos 配置**

1. 启动 Nacos Server

   为了便于 Example 项目的演示，这里采用 Nacos 的 standalone （单节点）模式启动，进入到 Nacos 解压后的目录下，执行如下命令。

   ```shell
   #Linux/Mac环境
   sh bin/startup.sh -m standalone
   #如果您是Ubuntu环境，执行上述命令启动报错提示[[符号找不到，可以执行如下的命令
   bash bin/startup.sh -m standalone
   #Win环境
   .\bin\startup.cmd -m standalone
   ```

2. 添加配置

   在批量导入配置之前，请先修改 spring-cloud-alibaba-examples/integrated-example/config-init/config/datasource-config.yaml 中的数据源配置 **(用户名和密码)**。

   之后运行 spring-cloud-alibaba-examples/integrated-example/config-init/scripts/nacos-config-quick.sh 脚本来完成所有微服务配置的一键导入。

   ```shell
   # linux
   sh nacos-config-quick.sh
   # windows 可以使用 git bash 来完成配置的导入 执行命令同上
   ```

**Seata 配置**

Seata 的 db 模式需要额外配置数据库信息以及修改 Seata 服务端的配置文件，且在新版本中配置文件相较于旧版本进行了合并，因此这里为了便于演示方便，采用 Seata 单机的 file 模式启动 Seata Server。

进入到 release 解压后的 seata 目录中，执行如下命令：

```shell
#Linux/Mac环境
sh ./bin/seata-server.sh
#Win环境
bin\seata-server.bat
```

**RocketMQ 配置**

进入到 release 解压后的 rocketmq 目录中，执行如下命令。

1. 启动 NameServer

   ```shell
   #Linux/Mac环境
   sh bin/mqnamesrv
   #Win环境
   .\bin\mqnamesrv.cmd
   ```

2. 启动 Broker

   ```shell
   #Linux/Mac环境
   sh bin/mqbroker
   #Win环境
   .\bin\mqbroker.cmd -n localhost:9876
   ```

**运行 Example 示例**

准备工作完成后可以运行 Example 示例，主要根据不同的使用场景，可以分别体验用户下单（分布式事务能力）以及模拟高流量点赞（熔断限流以及削峰填谷的能力）。

首先需要分别启动 integrated-frontend 以及 integrated-gateway 微服务应用。

- integrated-gateway 模块是整个最佳实践示例的网关。
- integrated-frontend 为最佳实践示例的简易前端页面。

1. 分布式事务能力

   **场景说明**

   针对分布式事务能力，SCA 社区提供了用户下单购买货物的场景，下单后：

   - 先请求库存模块，扣减库存
   - 扣减账户余额
   - 生成订单信息返回响应

   **启动测试**

   分别启动 integrated-storage，integrated-account，integrated-order 三个微服务应用。

   访问 `http://integrated-frontend:8080/order` 来体验对应场景。

   直接点击下单按钮提交表单，应用模拟客户端向网关发送了一个创建订单的请求。

   - 用户的 userId 为 admin
   - 用户下单的商品编号为 1 号
   - 此次订单购买的商品个数为 1 个

   <div align="center">
       <img src="https://camo.githubusercontent.com/9448ae62231a5728f61fd0def7f846c745ddfb6bc5ebaea691cf3f8f042a26f3/68747470733a2f2f6d792d696d672d312e6f73732d636e2d68616e677a686f752e616c6979756e63732e636f6d2f696d6167652d32303232313031363135353431363532342e706e67"/>
   </div>

   在本 Example 示例中，为了便于演示，每件商品的单价都为 2。

   而在前面的准备工作中，初始化业务数据库表的时候应用新建了一个用户，用户的 userId 为 admin，余额为 3 元；同时新建了一个编号为 1 号的商品，库存为 100 件。

   因此通过上述的操作，应用会创建一个订单，扣减对应商品编号为 1 号的库存个数（100 - 1 = 99），扣减 admin 用户的余额（3 - 2 = 1）。

   <div align="center">
       <img src="https://camo.githubusercontent.com/029a719f01294cd8d4c2af4608fcd4eef83d2c95b087006791cab2a5b3ced0b1/68747470733a2f2f6d792d696d672d312e6f73732d636e2d68616e677a686f752e616c6979756e63732e636f6d2f696d6167652d32303232313031363135353432393830312e706e67"/>
   </div>

   如果再次请求相同的接口，同样是先扣减库存（99 - 1 = 98），但是会因为 admin 用户余额不足而抛出异常，并被 Seata 捕获，执行分布式事务二阶段提交，回滚事务。

   <div align="center">
       <img src="https://camo.githubusercontent.com/33c136cbeb3dd32ba438dfc4301d96a71da6d06a0ee85de3249085de19e87551/68747470733a2f2f6d792d696d672d312e6f73732d636e2d68616e677a686f752e616c6979756e63732e636f6d2f696d6167652d32303232313031363135353433363131322e706e67"/>
   </div>

   可以看到数据库中库存的记录因为回滚之后仍然为 99 件。

2. 熔断限流，削峰填谷能力

   **场景说明**

   针对大流量背景下的服务熔断限流，削峰填谷，SCA 社区提供了用户为商品进行点赞的场景。在此场景下，SCA 社区提供了两种应对大流量的处理方式。

   - Sentinel 在网关侧绑定指定网关路由进行服务的熔断降级。
   - RocketMQ 进行流量削峰填谷，在大流量请求下，生产者向 RocketMQ 发送消息，而消费者则通过可配置的消费速率进行拉取消费，减少大流量直接请求数据库增加点赞请求的压力。

   **启动测试**

   分别启动 integrated-praise-provider 以及 integrated-praise-consumer 模块。

   **Sentinel 服务熔断降级**

   访问 `http://integrated-frontend:8080/sentinel` 体验对应场景。

   <div align="center">
       <img src="https://camo.githubusercontent.com/167540c2a9c937fcc99c29f174a7747128dc318e2badbc2531a4d6eee66bd6e7/68747470733a2f2f6d792d696d672d312e6f73732d636e2d68616e677a686f752e616c6979756e63732e636f6d2f696d6167652d32303232313031363135353530313239302e706e67"/>
   </div>

   网关路由点赞服务的限流规则为 5，而在前端通过异步处理模拟了 10 次并发请求。

   因此可以看到 Sentinel 在 Gateway 侧针对多出的流量进行了服务熔断返回 fallback 给客户端，同时数据库的点赞数进行了更新（+5）。

   <div align="center">
       <img src="https://camo.githubusercontent.com/9115475ee01df4f11c375d842dde9cfd4cb8ec6de0dfa399d9d0a5f63e5a2702/68747470733a2f2f6d792d696d672d312e6f73732d636e2d68616e677a686f752e616c6979756e63732e636f6d2f696d6167652d32303232303931343135353735353130332e706e67"/>
   </div>

   **RocketMQ 进行流量削峰填谷**

   访问 `http://integrated-frontend:8080/rocketmq` 体验对应场景。

   由于之前在 Nacos 中配置了 integrated-praise-consumer 消费者模块的消费速率以及间隔，在点击按钮时应用模拟 1000 个点赞请求，针对 1000 个点赞请求，integrated-praise-provider 会将 1000 次请求都向 Broker 投递消息，而在消费者模块中会根据配置的消费速率进行消费，向数据库更新点赞的商品数据，模拟大流量下 RocketMQ 削峰填谷的特性。

   可以看到数据库中点赞的个数正在动态更新。

   <div align="center">
       <img src="https://camo.githubusercontent.com/869d9c0c343a28435d62f76ef20bcb12d735c7983a737bd6c68fe8f3e678d40d/68747470733a2f2f6d792d696d672d312e6f73732d636e2d68616e677a686f752e616c6979756e63732e636f6d2f696d6167652d32303232313031363137333630343035392e706e67"/>
   </div>

### Docker Compose 部署

容器化部署是将应用代码和所需的所有组件(例如库、框架和其他依赖项)打包在一起, 让它们隔离在自己的"容器"中去运行。

> Note：如果以 Docker Compose 方式体验 Example 时，需要确保内存资源 >= 24G！

**组件容器启动**

进入 spring-cloud-alibaba-examples/integrated-example 目录下，执行 `docker-compose -f docker-compose-env.yml up -d` 即可启动所有微服务应用依赖的组件，即 Nacos，MySQL，RocketMQ，Seata-Server，完成需要的数据库表配置等相关操作。

**添加应用配置信息**

在 spring-cloud-alibaba-examples/integrated-example 目录下，在终端中执行 `config-init/scripts/nacos-config-quick.sh` 脚本文件。即可自动注入应用的所有配置信息。

**服务容器启动**

在 spring-cloud-alibaba-examples/integrated-example 目录下，执行以下命令 `docker-compose -f ./docker-compose/docker-compose-service.yml up -d` 来快速部署 example 应用。

**访问 Example**

体验 Example 过程同 服务本地化部署 Example 访问。

**服务容器停止**

在 spring-cloud-alibaba-examples/integrated-example 目录下，执行以下命来停止正在运行的 example 服务容器。
`docker-compose -f ./docker-compose/docker-compose-service.yml down`

**组件容器停止**

在 spring-cloud-alibaba-examples/integrated-example 目录下，执行以下命令 `docker-compose -f ./docker-compose/docker-compose-env.yml down` 来停止正在运行的 example 组件容器。

更多信息请参考：[Spring Cloud Alibaba 容器化部署最佳实践 | Docker-Compose 版本](https://github.com/alibaba/spring-cloud-alibaba/blob/2022.x/spring-cloud-alibaba-examples/integrated-example/docs/zh/docker-compose-deploy-zh.md)

### Kubernetes Helm 部署

**准备工作**

在这里通过 NodePort 的方式来向外界暴露 Kubernetes 中 Pod 的服务，在启动测试前还需配置好 Kubernetes 集群节点的 ip 映射。

```shell
# 实际情况请结合您的 K8S 节点的公网 ip 进行调整
120.24.xxx.xxx integrated-frontend
120.24.xxx.xxx gateway-service
120.24.xxx.xxx integrated-mysql-web
120.24.xxx.xxx nacos-mysql-web
120.24.xxx.xxx nacos-svc
```

**项目部署**

进入到 spring-cloud-alibaba-examples/integrated-example 目录下，执行如下命令利用 Helm 部署应用程序。

```shell
helm package helm-chart

helm install integrated-example integrated-example-1.0.0.tgz
```

通过运行上述命令，根据 SCA 社区提供的 Helm Chart 文档通过 Helm 快速完成最佳实践示例的部署。
可以通过 Kubernetes 提供的 kubectl 命令查看各容器资源部署的情况，耐心等待所有容器完成启动后即可到对应页面体验各个组件的使用场景及能力。

**体验 Example**

体验 Example 过程同 服务本地化部署 Example 访问。

**停止测试**

如果您想停止体验，输入如下命令。

```shell
helm uninstall integrated-example
```

更多信息请参考：[Spring Cloud Alibaba 容器化部署最佳实践 | Kubernetes Helm-Chart 版本](https://github.com/alibaba/spring-cloud-alibaba/blob/2022.x/spring-cloud-alibaba-examples/integrated-example/docs/zh/kubernetes-deployment-zh.md)

## 其他

本示例仅是针对各个组件选取出了较为典型的功能特性来服务应用场景。

当然各个组件的功能特性不仅仅只包含最佳实践中演示的这些，如果您对 SCA 感兴趣或是想要深入了解 SCA 项目，欢迎阅览各个组件的独立 Example 相关文档。

- Nacos examples
  - [Nacos config example](https://github.com/alibaba/spring-cloud-alibaba/blob/2022.x/spring-cloud-alibaba-examples/nacos-example/nacos-config-example/readme-zh.md)
  - [Nacos discovery example](https://github.com/alibaba/spring-cloud-alibaba/blob/2022.x/spring-cloud-alibaba-examples/nacos-example/nacos-discovery-example/readme-zh.md)
- [Sentinel core example](https://github.com/alibaba/spring-cloud-alibaba/blob/2022.x/spring-cloud-alibaba-examples/sentinel-example/sentinel-core-example/readme-zh.md)
- [Seata example](https://github.com/alibaba/spring-cloud-alibaba/blob/2022.x/spring-cloud-alibaba-examples/seata-example/readme-zh.md)
- [RocketMQ example](https://github.com/alibaba/spring-cloud-alibaba/blob/2022.x/spring-cloud-alibaba-examples/rocketmq-example/readme-zh.md)
