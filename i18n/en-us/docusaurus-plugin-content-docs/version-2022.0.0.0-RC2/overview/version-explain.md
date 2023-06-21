---
title: "Release Notes"
keywords: [Spring Cloud Alibaba]
description: Spring Cloud Alibaba Version.
custom_edit_url: https://github.com/higress-group/higress-group.github.io/blob/main/i18n/zh-cn/docusaurus-plugin-content-docs/current/overview/terminology.md
---

## Graduation version dependencies (recommended)
Due to the large changes between Spring Boot 3.0, Spring Boot 2.7~2.4 and versions below 2.4, the Spring Boot version related to old projects of enterprise customers is still below Spring Boot 2.4. In order to meet the different needs of existing users and new users at the same time, the community With Spring Boot 3.0 and 2.4 as the dividing line, three branch iterations of 2022.x, 2021.x, and 2.2.x are maintained at the same time. If you don't want to upgrade across branches, if you want to use new features, please upgrade to the new version of the corresponding branch.
In order to avoid dependency conflicts in the related construction process, we suggest that you can create projects through [Cloud Native Application Initializer](https://start.aliyun.com).

### 2022.x branch
The Spring Cloud Alibaba versions adapted to Spring Boot 3.0, Spring Cloud 2022.x and above are arranged in the following table from newest to old (the latest version is marked with *): _(Note that the naming method of this branch Spring Cloud Alibaba version has been adjusted. In the future, it will correspond to the Spring Cloud version. The first three digits are the Spring Cloud version, and the last digit is the extended version. For example, the first version of Spring Cloud Alibaba corresponding to the Spring Cloud 2022.0.0 version is: 2022.0.0.0, and the second version for: 2022.0.0.1 and so on)_

| Spring Cloud Alibaba Version | Spring Cloud Version  | Spring Boot Version |
|------------------------------|-----------------------|---------------------|
| 2022.0.0.0-RC*               | Spring Cloud 2022.0.0 | 3.0.0               |


### 2021.x branch
Adapted to Spring Boot 2.4, Spring Cloud Alibaba versions of Spring Cloud 2021.x and above are listed in the following table from newest to old (the latest version is marked with *):

| Spring Cloud Alibaba Version | Spring Cloud Version  | Spring Boot Version |
|------------------------------|-----------------------|---------------------|
| 2021.0.5.0*                  | Spring Cloud 2021.0.5 | 2.6.13              |
| 2021.0.4.0                   | Spring Cloud 2021.0.4 | 2.6.11              |
| 2021.0.1.0                   | Spring Cloud 2021.0.1 | 2.6.3               |
| 2021.1                       | Spring Cloud 2020.0.1 | 2.4.2               |


### 2.2.x branch
Adapted to Spring Boot 2.4, the Spring Cloud Hoxton version and the following Spring Cloud Alibaba version are arranged in the following table from newest to old (the latest version is marked with *):

| Spring Cloud Alibaba Version                         | Spring Cloud Version        | Spring Boot Version |
|------------------------------------------------------|-----------------------------|---------------------|
| 2.2.10-RC1*                                          | Spring Cloud Hoxton.SR12    | 2.3.12.RELEASE      |
| 2.2.9.RELEASE                                        | Spring Cloud Hoxton.SR12    | 2.3.12.RELEASE      |
| 2.2.8.RELEASE                                        | Spring Cloud Hoxton.SR12    | 2.3.12.RELEASE      |
| 2.2.7.RELEASE                                        | Spring Cloud Hoxton.SR12    | 2.3.12.RELEASE      |
| 2.2.6.RELEASE                                        | Spring Cloud Hoxton.SR9     | 2.3.2.RELEASE       |
| 2.2.1.RELEASE                                        | Spring Cloud Hoxton.SR3     | 2.2.5.RELEASE       |
| 2.2.0.RELEASE                                        | Spring Cloud Hoxton.RELEASE | 2.2.X.RELEASE       |
| 2.1.4.RELEASE                                        | Spring Cloud Greenwich.SR6  | 2.1.13.RELEASE      |
| 2.1.2.RELEASE                                        | Spring Cloud Greenwich      | 2.1.X.RELEASE       |
| 2.0.4.RELEASE(stop maintenance, upgrade recommended) | Spring Cloud Finchley       | 2.0.X.RELEASE       |
| 1.5.1.RELEASE(stop maintenance, upgrade recommended) | Spring Cloud Edgware        | 1.5.X.RELEASE       |


## Component version relationship
Each Spring Cloud Alibaba version and the corresponding versions of the components it adapts to are shown in the following table (note that Spring Cloud Dubbo has been removed from the trunk since 2021.0.1.0 and will no longer evolve with the trunk):

| Spring Cloud Alibaba Version                              | Sentinel Version | Nacos Version | RocketMQ Version | Dubbo Version | Seata Version |
|-----------------------------------------------------------|------------------|---------------|------------------|---------------|---------------|
| 2021.0.5.0                                                | 1.8.6            | 2.2.0         | 4.9.4            | ~             | 1.6.1         |
| 2.2.10-RC1                                                | 1.8.6            | 2.2.0         | 4.9.4            | ~             | 1.6.1         |
| 2022.0.0.0-RC1                                            | 1.8.6            | 2.2.1-RC      | 4.9.4            | ~             | 1.6.1         |
| 2.2.9.RELEASE                                             | 1.8.5            | 2.1.0         | 4.9.4            | ~             | 1.5.2         |
| 2021.0.4.0                                                | 1.8.5            | 2.0.4         | 4.9.4            | ~             | 1.5.2         |
| 2.2.8.RELEASE                                             | 1.8.4            | 2.1.0         | 4.9.3            | ~             | 1.5.1         |
| 2021.0.1.0                                                | 1.8.3            | 1.4.2         | 4.9.2            | ~             | 1.4.2         |
| 2.2.7.RELEASE                                             | 1.8.1            | 2.0.3         | 4.6.1            | 2.7.13        | 1.3.0         |
| 2.2.6.RELEASE                                             | 1.8.1            | 1.4.2         | 4.4.0            | 2.7.8         | 1.3.0         |
| 2021.1 or 2.2.5.RELEASE or 2.1.4.RELEASE or 2.0.4.RELEASE | 1.8.0            | 1.4.1         | 4.4.0            | 2.7.8         | 1.3.0         |
| 2.2.3.RELEASE or 2.1.3.RELEASE or 2.0.3.RELEASE           | 1.8.0            | 1.3.3         | 4.4.0            | 2.7.8         | 1.3.0         |
| 2.2.1.RELEASE or 2.1.2.RELEASE or 2.0.2.RELEASE           | 1.7.1            | 1.2.1         | 4.4.0            | 2.7.6         | 1.2.0         |
| 2.2.0.RELEASE                                             | 1.7.1            | 1.1.4         | 4.4.0            | 2.7.4.1       | 1.0.0         |
| 2.1.1.RELEASE or 2.0.1.RELEASE or 1.5.1.RELEASE           | 1.7.0            | 1.1.4         | 4.4.0            | 2.7.3         | 0.9.0         |
| 2.1.0.RELEASE or 2.0.0.RELEASE or 1.5.0.RELEASE           | 1.6.3            | 1.1.1         | 4.4.0            | 2.7.3         | 0.7.1         |