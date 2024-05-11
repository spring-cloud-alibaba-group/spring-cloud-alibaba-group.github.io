---
title: Quick Start
keywords: [Spring Cloud Alibaba, schedulerx]
description: schedulerx
---

This chapter will demonstrate the use of [@Scheduled](https://spring.io/guides/gs/scheduling-tasks) Annotate to implement distributed scheduled tasks.
@The scheduled annotation is the default implementation of a scheduled task scheduling framework under the spring context, which can implement the scheduled scheduling of a certain method and supports Cron, fixedDelay, and fixedRate expressions.

# Access to cloud version
The simplest way to connect to Spring's distributed scheduled tasks is to directly connect to the Alibaba Cloud hosted [Distributed Task Scheduling Platform SchedularX](https://www.aliyun.com/ntms/middleware/schedulerx) Not only is it fully compatible with Spring @Schedule annotations, but it also features high availability, high security, high performance, maintenance free, and low cost.
The task management platform of the Task Scheduling Platform SchedularX can help you dynamically add, modify, and operate scheduled tasks, as well as enterprise level observable solutions such as alarm monitoring, historical recording, log services, and link tracking, ensuring the stable operation of your scheduled tasks.
![](https://intranetproxy.alipay.com/skylark/lark/0/2024/jpeg/23156875/1714380620901-ac56feee-c76f-4e2e-8734-efec929d48c3.jpeg)
## Access steps

1. Log in to the [SchedulerX Console](https://schedulerx2.console.aliyun.com/public/AppList) Open the service for free.
2. Reference [access document](https://help.aliyun.com/zh/schedulerx/user-guide/spring-jobs?spm=5176.14256785.help.dexternal.f09e126dAXAvEs#p-9sy-0ay-hgx) access, each account has 5 free task quotas.


![image.png](https://intranetproxy.alipay.com/skylark/lark/0/2024/png/23156875/1714372692175-124953b0-5f7b-4b75-98b4-0db7e65c2959.png#clientId=u68590545-eb8b-4&from=paste&height=532&id=u72d922ad&originHeight=1064&originWidth=3070&originalType=binary&ratio=2&rotation=0&showTitle=false&size=1285311&status=done&style=none&taskId=u0b6fa2b0-bc33-47f2-907c-89b4fa8fe1d&title=&width=1535)

# Local access method
Without relying on cloud products, local access methods can be combined with [@ Scheduling Lock](https://github.com/lukas-krecan/ShedLock) Annotate to implement distributed scheduled tasks.
@The Scheduling Lock annotation is a framework for distributed locks, combined with the @ Scheduling annotation, to ensure that tasks are executed only once on multiple nodes at the same time. This framework supports the implementation of various distributed locks, such as Jdbc, Zookeeper, Redis, etc. The principle is as follows
![](https://intranetproxy.alipay.com/skylark/lark/0/2024/jpeg/67910/1710923161344-bf71de34-6845-4edb-a514-b49ac06ec5bd.jpeg)
## Access steps
Taking MySQL distributed lock as an example, demonstrate the access process of distributed tasks

1. Create tables in MySQL
```sql
CREATE TABLE shedlock(name VARCHAR(64) NOT NULL, lock_until TIMESTAMP(3) NOT NULL,
    locked_at TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3), locked_by VARCHAR(255) NOT NULL, PRIMARY KEY (name));
```

2. Introduce the dependency of shedlock in the pom.xml file
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

3. Add the jdbc configuration in the application.properties file (ignore this step if it has already been added)
```properties
spring.datasource.url=jdbc:mysql://127.0.0.1:3306/testdb?useUnicode=true&characterEncoding=utf-8&useSSL=false
spring.datasource.username=root
spring.datasource.password=123456
spring.datasource.driver-class=com.mysql.cj.jdbc.Driver
```

4. Configure LockProvider
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

5. Configure the startup class and enable Scheduling Tasks
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

6. Create scheduled tasks
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
