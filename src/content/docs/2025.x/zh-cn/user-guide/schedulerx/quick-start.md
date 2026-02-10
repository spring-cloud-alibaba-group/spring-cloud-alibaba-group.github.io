---
title: 快速开始
keywords: [Spring Cloud Alibaba, schedulerx]
description: schedulerx
---

本章节将演示通过 [@Scheduled](https://spring.io/guides/gs/scheduling-tasks) 注解实现分布式定时任务。
@Scheduled 注解是spring-context下默认实现的定时任务调度框架，可以实现某个方法的定时调度，支持Cron、fixedDelay、fixedRate表达式。
# 接入云上版本
接入Spring分布式定时任务，最简单的方式就是直接接入阿里云托管的[分布式任务调度平台SchedulerX](https://www.aliyun.com/ntms/middleware/schedulerx)，不但完全兼容Spring @Scheduled 注解，还具有高可用、高安全、高性能、免运维、低成本等特点。
任务调度平台SchedulerX的任务管理平台，可以帮助您动态新增、修改、运维定时任务，还有报警监控、历史记录、日志服务、链路追踪等企业级可观测方案，为您的定时任务稳定运行保驾护航。
![](/img/1728554015375.png)
## 接入步骤

1. 登录[SchedulerX控制台](https://schedulerx2.console.aliyun.com/public/AppList)，免费开通服务。
2. 参考[接入文档](https://help.aliyun.com/zh/schedulerx/user-guide/spring-jobs?spm=5176.14256785.help.dexternal.f09e126dAXAvEs#p-9sy-0ay-hgx)接入，每个账号拥有5个免费任务额度。

![image.png](/img/1728554015702.png)

# 本地接入方式
不借助云产品，本地接入方式可以再结合 [@SchedulerLock](https://github.com/lukas-krecan/ShedLock) 注解来实现分布式定时任务。
@SchedulerLock 注解是一个分布式锁的框架，结合@Scheduled 注解，可以保证任务同一时间，在多个节点上只会执行一次。该框架支持多种分布式锁的实现，比如Jdbc、Zookeeper、Redis等。原理如下
![](/img/1728554015888.png)
## 接入步骤
下面以Mysql分布式锁为例，演示分布式任务的接入过程

1. 在Mysql中创建表
```sql
CREATE TABLE shedlock(name VARCHAR(64) NOT NULL, lock_until TIMESTAMP(3) NOT NULL,
    locked_at TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3), locked_by VARCHAR(255) NOT NULL, PRIMARY KEY (name));
```

2. 在 pom.xml 文件中引入 shedlock 的依赖 
```xml
<dependency>
  <groupId>net.javacrumbs.shedlock</groupId>
  <artifactId>shedlock-spring</artifactId>
  <version>4.23.0</version>
</dependency>
<dependency>
  <groupId>net.javacrumbs.shedlock</groupId>
  <artifactId>shedlock-provider-jdbc-template</artifactId>
  <version>4.23.0</version>
</dependency>
<dependency>
  <groupId>org.springframework.boot</groupId>
  <artifactId>spring-boot-starter-jdbc</artifactId>
</dependency>
<dependency>
  <groupId>mysql</groupId>
  <artifactId>mysql-connector-java</artifactId>
  <version>8.0.33</version>
</dependency>
```

3. 在application.properties文件中添加jdbc配置（如果已经添加可以忽略这步）
```properties
spring.datasource.url=jdbc:mysql://127.0.0.1:3306/testdb?useUnicode=true&characterEncoding=utf-8&useSSL=false
spring.datasource.username=root
spring.datasource.password=123456
spring.datasource.driver-class=com.mysql.cj.jdbc.Driver
```

4. 配置LockProvider
```java
import java.util.TimeZone;
import javax.sql.DataSource;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.jdbc.core.JdbcTemplate;

import net.javacrumbs.shedlock.core.LockProvider;
import net.javacrumbs.shedlock.provider.jdbctemplate.JdbcTemplateLockProvider;

@Configuration
public class ScheduledLockConfig {

    @Autowired
    private DataSource dataSource;

    @Bean
    public LockProvider lockProvider() {
        return new JdbcTemplateLockProvider(JdbcTemplateLockProvider.Configuration.builder()
            .withJdbcTemplate(new JdbcTemplate(dataSource))
            .withTimeZone(TimeZone.getTimeZone("UTC"))
            .build());
    }
}
```

5. 配置启动类，启用SchedulingTasks
```java
@SpringBootApplication
@EnableScheduling
@EnableSchedulerLock(defaultLockAtMostFor = "3m")
public class MyApplication {

    public static void main(String[] args) {
        SpringApplication.run(MyApplication.class, args);
    }
}
```

6. 创建定时任务
```java
import org.joda.time.DateTime;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import net.javacrumbs.shedlock.spring.annotation.SchedulerLock;

@Component
public class SpringJob {

    /**
     * 每5分钟跑一次
     */
    @Scheduled(cron = "0 */5 * * * ?")
    @SchedulerLock(name = "SpringJob.job1", lockAtMostFor = "2m", lockAtLeastFor = "1m")
    public void job1() {
        System.out.println("time=" + DateTime.now().toString("YYYY-MM-dd HH:mm:ss") + " do job1...");
    }
    
    /**
     * 每5秒跑一次
     */
    @Scheduled(fixedRate = 5000)
    @SchedulerLock(name = "SpringJob.job2", lockAtMostFor = "4s", lockAtLeastFor = "4s")
    public void job2() {
        System.out.println("time=" + DateTime.now().toString("YYYY-MM-dd HH:mm:ss") + " do job2...");
    }
    
    /**
     * 上次跑完之后隔5秒再跑
     * @throws InterruptedException 
     */
    @Scheduled(fixedDelay = 5000)
    @SchedulerLock(name = "SpringJob.job3", lockAtMostFor = "4s", lockAtLeastFor = "4s")
    public void job3() throws InterruptedException {
        System.out.println("time=" + DateTime.now().toString("YYYY-MM-dd HH:mm:ss") + " do job3...");
        Thread.sleep(10000);
    }
    
}
```
