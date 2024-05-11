---
title: overview
keywords: [Spring Cloud Alibaba, schedulerx]
description: schedulerx
---

## Introduction to Timed Tasks
Timed tasks refer to tasks that are executed periodically at a predetermined time or at a fixed frequency. In enterprise applications, backend business initiated by non user behavior is generally achieved through scheduled tasks, and common scenarios are as follows:
- Asynchronous data processing: For example, first storing orders and scanning unpaid orders every minute for batch processing.
- Automated operation and maintenance: For example, cleaning the history of the database every hour.
- System monitoring: For example, scanning monitoring indicators every minute, and if the threshold is exceeded, an alarm will be triggered.
- Data synchronization: For example, synchronizing data from MySQL to the big data platform at 1am every day.
## Spring Scheduling Tasks
In monolithic applications, implementing scheduled tasks is very simple, for example, Java has Java. util Timer and TimedExecutorService. However, in microservices, an application generally has many nodes, and through the above implementation methods, it can bring a fatal problem, which is the repeated execution of tasks.
Spring Cloud Alibaba Scheduling Tasks provides an open-source, lightweight, and highly available scheduling task solution to help you quickly develop distributed scheduling tasks under microservices architecture.
