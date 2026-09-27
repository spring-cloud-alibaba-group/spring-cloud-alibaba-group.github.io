---
title: 概述
keywords: [Spring Cloud Alibaba, schedulerx]
description: schedulerx
---

## 定时任务简介
定时任务是指在约定的时间，或者按照固定频率周期性执行的任务。在企业应用中，非用户行为发起的后台业务，一般都是通过定时任务来实现，常见场景如下：

- 异步数据处理：比如先将订单入库，每分钟扫描未支付的订单做批处理。
- 自动化运维：比如每小时清理一次数据库的历史记录。
- 系统监控：比如每分钟扫描监控指标，如果超出阈值，进行报警。
- 数据同步：比如每天凌晨1点把mysql中的数据同步到大数据平台中。
## Spring SchedulingTasks
在单体应用中，实现定时任务很简单，比如Java中有java.util.Timer和ScheduledExecutorService。但是在微服务中，一个应用一般来说有很多节点，通过以上实现方式，就会带来一个致命的问题，那就是任务重复执行。
Spring Cloud Alibaba SchedulingTasks提供了一套开源、轻量级、高可用的定时任务解决方案，帮助您快速开发微服务体系下的分布式定时任务。

