---
title: 进阶指南
keywords: [Spring Cloud Alibaba]
description: seata.
---

本章节展示 Seata 相关配置和事务模式。

## 参数配置

### 公共部分

| 配置项                                    | key                                       | 默认值  | 说明                                                                                                                                                                                                                                        |
| ----------------------------------------- | ----------------------------------------- | ------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| socket 通信方式                           | transport.type                            | TCP     | TCP、UNIX_DOMAIN_SOCKET                                                                                                                                                                                                                     |
| socket 通道类型                           | transport.server                          |         | NIO、NATIVE(根据操作系统类型和 socket 通信方式选择 KQueue 或 Epoll，注意 Windows 只支持 NIO，选择这种方式会抛出异常）                                                                                                                       |
| TM 批量发送请求消息开关                   | transport.enableTmClientBatchSendRequest  | false   |
| RM 批量发送请求消息开关                   | transport.enableRmClientBatchSendRequest  | true    |
| TC 批量发送回复消息开关                   | transport.enableTcServerBatchSendResponse | false   |
| RM 发送请求超时时间                       | transport.rpcRmRequestTimeout             | 30 秒   |
| TM 发送请求超时时间                       | transport.rpcTmRequestTimeout             | 30 秒   |
| TC 发送请求超时时间                       | transport.rpcTcRequestTimeout             | 30 秒   |
| Netty 通信模型 Boss group 线程数          | transport.threadFactory.bossThreadSize    | 1       |
| Netty 通信模型 Worker group 线程数        | transport.threadFactory.workerThreadSize  | Default | 可配置线程数或选择特定线程工作模式下的线程数，线程的默认工作模式有 4 种:Auto(2*CPU 核数 + 1)、Pin(CPU 核数，适用于计算密集型任务)、BusyPin(CPU 核数 + 1，适用于计算密集型且内存比较有限的场景）、Default(2*CPU 核数，适用于 IO 密集型任务） |
| 服务端 Netty 线程池关闭前等待服务下线时间 | transport.shutdown.wait                   | 3 秒    |
| client 和 server 通信编解码方式           | transport.serialization                   | seata   | seata(ByteBuf)、protobuf、kryo、hession、fst                                                                                                                                                                                                |
| client 和 server 通信数据压缩方式         | transport.compressor                      | none    | none、gzip、zip、sevenz、bzip2、lz4、deflater、zstd                                                                                                                                                                                         |
| client 和 server 通信心跳检测开关         | transport.heartbeat                       | true    |
| 注册中心类型                              | registry.type                             | file    | 支持 file 、nacos 、redis、eureka、zk、consul、etcd3、sofa、custom                                                                                                                                                                          |
| 配置中心类型                              | config.type                               | file    | 支持 file、nacos 、apollo、zk、consul、etcd3、springcloud、custom                                                                                                                                                                           |

### 服务端

| 配置项                                                                             | key                                       | 默认值                                                                                  | 说明                                                                                                                 |
| ---------------------------------------------------------------------------------- | ----------------------------------------- | --------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------- |
| undo 保留天数                                                                      | server.undo.logSaveDays                   | 7 天                                                                                    |
| undo 清理线程间隔时间                                                              | server.undo.logDeletePeriod               | 86400000 毫秒                                                                           |
| 二阶段提交重试超时时长                                                             | server.maxCommitRetryTimeout              | -1                                                                                      | 单位 ms,s,m,h,d,对应毫秒,秒,分,小时,天,默认毫秒。默认值-1 表示无限重试。                                             |
| 二阶段回滚重试超时时长                                                             | server.maxRollbackRetryTimeout            |                                                                                         |
| 二阶段提交未完成状态全局事务重试提交线程间隔时间                                   | server.recovery.committingRetryPeriod     | 1000，单位毫秒                                                                          |
| 二阶段异步提交状态重试提交线程间隔时间                                             | server.recovery.asynCommittingRetryPeriod | 1000，单位毫秒                                                                          |
| 二阶段回滚状态重试回滚线程间隔时间                                                 | server.recovery.rollbackingRetryPeriod    | 1000，单位毫秒                                                                          |
| 超时状态检测重试线程间隔时间                                                       | server.recovery.timeoutRetryPeriod        | 1000，单位毫秒                                                                          | 检测出超时将全局事务置入回滚会话管理器                                                                               |
| 二阶段回滚超时后是否释放锁                                                         | server.rollbackRetryTimeoutUnlockEnable   | false                                                                                   |
| Sever 端事务管理全局锁超时时间                                                     | server.distributedLockExpireTime          | 10000，单位毫秒                                                                         |
| 防止 XA 分支事务悬挂的重试超时时间                                                 | server.server.xaerNotaRetryTimeout        | 60000，单位毫秒                                                                         |
| 分支事务 Session 异步删除线程池队列大小                                            | server.session.branchAsyncQueueSize       | 5000                                                                                    |
| 分支事务 Session 异步删除开关                                                      | server.session.enableBranchAsyncRemove    | false                                                                                   |
| 对于批量请求消息的并行处理开关                                                     | server.enableParallelRequestHandle        | false                                                                                   |
| 事务会话信息存储方式                                                               | store.mode                                |                                                                                         | file 本地文件(不支持 HA)，db 数据库，redis(支持 HA)                                                                  |
| 事务锁信息存储方式                                                                 | store.lock.mode                           |                                                                                         | file 本地文件(不支持 HA)，db 数据库，redis(支持 HA)；配置为空时，取 store.mode 配置项值                              |
| 事务回话信息存储方式                                                               | store.session.mode                        | file 本地文件(不支持 HA)，db 数据库，redis(支持 HA)；配置为空时，取 store.mode 配置项值 |
| db 或 redis 存储密码解密公钥                                                       | store.publicKey                           |                                                                                         |
| file 模式文件存储文件夹名                                                          | store.file.dir                            | sessionStore                                                                            |
| file 模式文件存储分支 session 最大字节数                                           | store.file.maxBranchSessionSize           | 16384(16kb),单位 byte                                                                   |
| file 模式文件存储全局 session 最大字节数                                           | store.file.maxGlobalSessionSize           | 512b，单位 byte                                                                         |
| file 模式文件存储 buffer 最大缓存大小                                              | store.file.fileWriteBufferCacheSize       | 16384(16kb)，单位 byte                                                                  | 写入 session 等数据量大于该值时会抛出异常                                                                            |
| file 模式文件存储刷盘策略                                                          | store.file.flushDiskMode                  | async                                                                                   | 可选 sync                                                                                                            |
| file 模式文件存储 Server 节点重启后从备份文件中恢复的 session 或 lock key 上限个数 | store.file.sessionReloadReadSize          | 100                                                                                     |
| db 模式数据源类型                                                                  | store.db.datasource                       |                                                                                         | dbcp、druid、hikari；无默认值，store.mode=db 时必须指定                                                              |
| db 模式数据库类型                                                                  | store.db.dbType                           |                                                                                         | mysql、oracle、db2、sqlserver、sybaee、h2、sqlite、access、postgresql、oceanbase；无默认值，store.mode=db 时必须指定 |
| db 模式数据库驱动                                                                  | store.db.driverClassName                  |                                                                                         | store.mode=db 时必须指定                                                                                             |
| db 模式数据库 url                                                                  | store.db.url                              |                                                                                         | store.mode=db 时必须指定，在使用 mysql 作为数据源时，建议在连接参数中加上 rewriteBatchedStatements=true              |
| db 模式数据库账户                                                                  | store.db.user                             |                                                                                         | store.mode=db 时必须指定                                                                                             |
| db 模式数据库账户密码                                                              | store.db.password                         |                                                                                         | store.mode=db 时必须指定                                                                                             |
| db 模式数据库初始连接数                                                            | store.db.minConn                          | 1                                                                                       |
| db 模式数据库最大连接数                                                            | store.db.maxConn                          | 20                                                                                      |
| db 模式获取连接时最大等待时间                                                      | store.db.maxWait                          | 5000，单位毫秒                                                                          |
| db 模式全局事务表名                                                                | store.db.globalTable                      | global_table                                                                            |

> **NOTE：**更多详见：[server 端配置项参考](http://seata.io/zh-cn/docs/user/configurations.html)。

### 客户端

| 配置项                                        | key                                                | 默认值        | 说明                                                                                                              |
| --------------------------------------------- | -------------------------------------------------- | ------------- | ----------------------------------------------------------------------------------------------------------------- |
| 是否开启 spring-boot 自动装配                 | seata.enabled                                      | true          |
| 是否开启数据源自动代理                        | seata.enableAutoDataSourceProxy=true               | ture          |                                                                                                                   |
| 是否使用 JDK 代理作为数据源自动代理的实现方式 | seata.useJdkProxy=false                            | false         | 采用 CGLIB 作为数据源自动代理的实现方式                                                                           |
| 客户端事务消息请求是否批量合并发送            | transport.enableClientBatchSendRequest             | true          | false 单条发送                                                                                                    |
| 日志异常输出概率                              | client.log.exceptionRate                           | 100           | 目前用于 undo 回滚失败时异常堆栈输出，百分之一的概率输出，回滚失败基本是脏数据，无需输出堆栈占用硬盘空间          |
| 事务群组                                      | service.vgroupMapping.my_test_tx_group             |               | my_test_tx_group 为分组，配置项值为 TC 集群名                                                                     |
| TC 服务列表                                   | service.default.grouplist                          |               | 仅注册中心为 file 时使用                                                                                          |
| 全局事务开关                                  | service.disableGlobalTransaction                   | false         | false 为开启，true 为关闭                                                                                         |
| 降级开关                                      | client.tm.degradeCheck                             | 默认 false    | 业务侧根据连续错误数自动降级不走 seata 事务                                                                       |
| 升降级达标阈值                                | client.tm.degradeCheckAllowTimes                   | 默认 10       |
| 服务自检周期                                  | client.tm.degradeCheckPeriod                       | 2000,单位 ms  | 每 2 秒进行一次服务自检,来决定                                                                                    |
| 是否上报一阶段成功                            | client.rm.reportSuccessEnable                      | false         | true 用于保持分支事务生命周期记录完整，false 可提高不少性能。                                                     |
| 异步提交缓存队列长度                          | client.rm.asyncCommitBufferLimit                   | 10000         | 二阶段提交成功，RM 异步清理 undo 队列                                                                             |
| 校验或占用全局锁重试间隔                      | client.rm.lock.retryInterval                       | 10，单位毫秒  |
| 校验或占用全局锁重试次数                      | client.rm.lock.retryTimes                          | 30            |
| 分支事务与其它全局回滚事务冲突时锁策略        | client.rm.lock.retryPolicyBranchRollbackOnConflict | true          | 优先释放本地锁让回滚成功                                                                                          |
| 一阶段结果上报 TC 重试次数                    | client.rm.reportRetryCount                         | 5 次          |
| 自动刷新缓存中的表结构                        | client.rm.tableMetaCheckEnable                     | false         |
| 定时刷新缓存中表结构间隔时间                  | client.rm.tableMetaCheckerInterval                 | 60 秒         |
| 是否开启 saga 分支注册                        | client.rm.sagaBranchRegisterEnable                 | false         | Saga 模式中分支状态存储在状态机本地数据库中，可通过状态机进行提交或回滚，为提高性能可考虑不用向 TC 注册 Saga 分支 |
| saga 模式中数据序列化方式                     | client.rm.sagaJsonParser                           | 默认 fastjson | 可选 jackson                                                                                                      |

> **NOTE：**更多详见：[client 端配置项参考](http://seata.io/zh-cn/docs/user/configurations.html)。

## 事务模式

### AT 模式

**前提**

- 基于支持本地 ACID 事务的关系型数据库。
- Java 应用，通过 JDBC 访问数据库。

**整体机制**

两阶段提交协议的演变：

- 一阶段：业务数据和回滚日志记录在同一个本地事务中提交，释放本地锁和连接资源。

- 二阶段：

  提交异步化，非常快速地完成。  
   回滚通过一阶段的回滚日志进行反向补偿。

**写隔离**

- 一阶段本地事务提交前，需要确保先拿到全局锁。
- 拿不到全局锁 ，不能提交本地事务。
- 拿全局锁的尝试被限制在一定范围内，超出范围将放弃，并回滚本地事务，释放本地锁。

以一个示例来说明：

两个全局事务 tx1 和 tx2，分别对 a 表的 m 字段进行更新操作，m 的初始值 1000。

tx1 先开始，开启本地事务，拿到本地锁，更新操作 m = 1000 - 100 = 900。本地事务提交前，先拿到该记录的全局锁，本地提交释放本地锁。 tx2 后开始，开启本地事务，拿到本地锁，更新操作 m = 900 - 100 = 800。本地事务提交前，尝试拿该记录的全局锁，tx1 全局提交前，该记录的全局锁被 tx1 持有，tx2 需要重试等待全局锁。

<p align="center">
<img src="https://sca-storage.oss-cn-hangzhou.aliyuncs.com/sca-example/seata/seata/fig1.png"/>
</p>

tx1 二阶段全局提交，释放全局锁。tx2 拿到全局锁提交本地事务。

<p align="center">
<img src="https://sca-storage.oss-cn-hangzhou.aliyuncs.com/sca-example/seata/seata/fig2.png"/>
</p>

如果 tx1 的二阶段全局回滚，则 tx1 需要重新获取该数据的本地锁，进行反向补偿的更新操作，实现分支的回滚。

此时，如果 tx2 仍在等待该数据的全局锁，同时持有本地锁，则 tx1 的分支回滚会失败。分支的回滚会一直重试，直到 tx2 的全局锁等锁超时，放弃全局锁并回滚本地事务释放本地锁，tx1 的分支回滚最终成功。

因为整个过程全局锁在 tx1 结束前一直是被 tx1 持有的，所以不会发生脏写的问题。

**读隔离**

在数据库本地事务隔离级别**读已提交（Read Committed）**或以上的基础上，Seata（AT 模式）的默认全局隔离级别是**读未提交（Read Uncommitted）**。

如果应用在特定场景下，必需要求全局的**读已提交**，目前 Seata 的方式是通过 SELECT FOR UPDATE 语句的代理。

<p align="center">
<img src="https://sca-storage.oss-cn-hangzhou.aliyuncs.com/sca-example/seata/seata/fig3.png"/>
</p>

SELECT FOR UPDATE 语句的执行会申请全局锁，如果全局锁被其他事务持有，则释放本地锁（回滚 SELECT FOR UPDATE 语句的本地执行）并重试。这个过程中，查询是被 block 住的，直到全局锁拿到，即读取的相关数据是已提交的，才返回。

出于总体性能上的考虑，Seata 目前的方案并没有对所有 SELECT 语句都进行代理，仅针对 FOR UPDATE 的 SELECT 语句。

**工作机制**

以一个示例来说明整个 AT 分支的工作过程。

业务表：product

| Field | Type         | Key |
| ----- | ------------ | --- |
| id    | bigint(20)   | PRI |
| name  | varchar(100) |
| since | varchar(100) |

AT 分支事务的业务逻辑：

```java
$ update product set name = 'GTS' where name = 'TXC';
```

**一阶段**

过程：

1. 解析 SQL：得到 SQL 的类型（UPDATE），表（product），条件（where name = 'TXC'）等相关的信息。

2. 查询前镜像：根据解析得到的条件信息，生成查询语句，定位数据。

   ```java
   $ select id, name, since from product where name = 'TXC';
   ```

得到前镜像：

| id  | name | since |
| --- | ---- | ----- |
| 1   | TXC  | 2014  |

1. 执行业务 SQL：更新这条记录的 name 为 'GTS'。
2. 查询后镜像：根据前镜像的结果，通过 主键 定位数据。

   ```java
   $ select id, name, since from product where id = 1;
   ```

得到后镜像：

| id  | name | since |
| --- | ---- | ----- |
| 1   | GTS  | 2014  |

1. 插入回滚日志：把前后镜像数据以及业务 SQL 相关的信息组成一条回滚日志记录，插入到 UNDO_LOG 表中。

   ```java
   {
   "branchId": 641789253,
   "undoItems": [{
   "afterImage": {
   "rows": [{
   	"fields": [{
   		"name": "id",
   		"type": 4,
   		"value": 1
   	}, {
   		"name": "name",
   		"type": 12,
   		"value": "GTS"
   	}, {
   		"name": "since",
   		"type": 12,
   		"value": "2014"
   	}]
   }],
   "tableName": "product"
   },
   "beforeImage": {
   "rows": [{
   	"fields": [{
   		"name": "id",
   		"type": 4,
   		"value": 1
   	}, {
   		"name": "name",
   		"type": 12,
   		"value": "TXC"
   	}, {
   		"name": "since",
   		"type": 12,
   		"value": "2014"
   	}]
   }],
   "tableName": "product"
   },
   "sqlType": "UPDATE"
   }],
   "xid": "xid:xxx"
   }
   ```

2. 提交前，向 TC 注册分支：申请 product 表中，主键值等于 1 的记录的 全局锁 。
3. 本地事务提交：业务数据的更新和前面步骤中生成的 UNDO LOG 一并提交。
4. 将本地事务提交的结果上报给 TC。

**二阶段-回滚**

1. 收到 TC 的分支回滚请求，开启一个本地事务，执行如下操作。
2. 通过 XID 和 Branch ID 查找到相应的 UNDO LOG 记录。
3. 数据校验：拿 UNDO LOG 中的后镜与当前数据进行比较，如果有不同，说明数据被当前全局事务之外的动作做了修改。这种情况，需要根据配置策略来做处理，详细的说明在另外的文档中介绍。
4. 根据 UNDO LOG 中的前镜像和业务 SQL 的相关信息生成并执行回滚的语句：

   ```java
   $ update product set name = 'TXC' where id = 1;
   ```

5. 提交本地事务。并把本地事务的执行结果（即分支事务回滚的结果）上报给 TC。

**二阶段-提交**

1. 收到 TC 的分支提交请求，把请求放入一个异步任务的队列中，马上返回提交成功的结果给 TC。
2. 异步任务阶段的分支提交请求将异步和批量地删除相应 UNDO LOG 记录。

   > **NOTE：**关于回滚日志表详情，可以从 Seata 官方回滚日志表详情查看：[回滚日志表](http://seata.io/zh-cn/docs/dev/mode/at-mode.html)。

### TCC 模式

回顾总览中的描述：一个分布式的全局事务，整体是两阶段提交的模型。全局事务是由若干分支事务组成的，分支事务要满足两阶段提交的模型要求，即需要每个分支事务都具备自己的：

- 一阶段 prepare 行为
- 二阶段 commit 或 rollback 行为

<p align="center">
<img src="https://sca-storage.oss-cn-hangzhou.aliyuncs.com/sca-example/seata/seata/fig4.png"/>
</p>

根据两阶段行为模式的不同，我们将分支事务划分为 Automatic (Branch) Transaction Mode 和 TCC (Branch) Transaction Mode。

AT 模式基于支持本地 ACID 事务的关系型数据库：

- 一阶段 prepare 行为：在本地事务中，一并提交业务数据更新和相应回滚日志记录。
- 二阶段 commit 行为：马上成功结束，自动异步批量清理回滚日志。
- 二阶段 rollback 行为：通过回滚日志，自动生成补偿操作，完成数据回滚。

相应的，TCC 模式，不依赖于底层数据资源的事务支持：

- 一阶段 prepare 行为：调用自定义的 prepare 逻辑。
- 二阶段 commit 行为：调用自定义的 commit 逻辑。
- 二阶段 rollback 行为：调用自定义的 rollback 逻辑。

所谓 TCC 模式，是指支持把自定义的分支事务纳入到全局事务的管理中。

> **NOTE：**关于更多模式如 Saga 模式、XA 模式，可以从 Seata 官方 [Saga 模式](http://seata.io/zh-cn/docs/user/saga.html)、[XA 模式](http://seata.io/zh-cn/docs/dev/mode/xa-mode.html) 页面查看。
