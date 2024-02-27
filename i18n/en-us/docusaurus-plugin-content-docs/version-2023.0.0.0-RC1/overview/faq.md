---
title: FAQ
keywords: [Spring Cloud Alibaba]
description: Spring Cloud Alibaba FAQ.
custom_edit_url: https://github.com/spring-cloud-alibaba-group/spring-cloud-alibaba-group.github.io/blob/master/i18n/en-us/docusaurus-plugin-content-docs/current/overview/faq.md
---

## FAQ

<a href="#1" target="_self">1. Spring Cloud Alibaba maintains several branches, what are the corresponding differences?</a>
<br/>

<a href="#2" target="_self">2. Regarding the selection of component versions, where should I go for reference? </a>
<br/>

<a href="#3" target="_self">3. Does the community have a roadmap for version construction? </a>
<br/>

<a href="#4" target="_self">4. Is there a weekly meeting in the community and how to get involved? </a>
<br/>

<a href="#5" target="_self">5. What is the difference between Spring Cloud Alibaba, Spring Cloud and Spring Cloud Netflix? </a>
<br/>

<a href="#6" target="_self">6. Are there examples of best practices? </a>
<br/>

<a href="#7" target="_self">7. Can Spring Cloud Alibaba integrate the new open source gateway Higress? </a>
<br/>

<a href="#8" target="_self">8. How to become a Community Committer? </a>
<br/>

<a href="#9" target="_self">9. Does the community provide relevant learning materials or technical blogs? </a>
<br/>

---

<h3 id='1'>Q: 1. Spring Cloud Alibaba maintains several branches, what are the corresponding differences? </h3>

**A:**

Spring Cloud Alibaba currently has three branchs actively maintained, namely `2.2.x`, `2021.x`, `2022.x`, `2023.x`.

The version features are as follows:

- [2.2.x](https://github.com/alibaba/spring-cloud-alibaba/tree/2.2.x): Integrates functional modules related to service governance, such as [off-site multi-active](https://github.com/alibaba/spring-cloud-alibaba/tree/2.2.x/spring-cloud-alibaba-examples/appactive-example), [label routing](https://github.com/alibaba/spring-cloud-alibaba/tree/2.2.x/spring-cloud-alibaba-examples/governance-example/label-routing-example), [Istio permission verification](https://github.com/alibaba/spring-cloud-alibaba/tree/2.2.x/spring-cloud-alibaba-examples/governance-example/authentication-example) function.

- [2021.x](https://github.com/alibaba/spring-cloud-alibaba/tree/2021.x): It is adapted to the Spring Cloud 2021.x series version and integrates various functional components of Spring Cloud Alibaba.

- [2022.x](https://github.com/alibaba/spring-cloud-alibaba/tree/2022.x): Integrates Spring Cloud Alibaba's support for static compilation of [GraalVM](https://www.graalvm.org/).

- [2023.x](https://github.com/alibaba/spring-cloud-alibaba): Integrated Spring Boot 3.2.x and Spring Cloud 2023.x.

---

<h3 id='2'>Q: 2. Regarding the selection of component versions, where should I go for reference? </h3>

**A:**

Refer to the [Version Release Document](./version-explain.md) on the official website.

---

<h3 id='3'>Q: 3. Does the community have a roadmap for version construction? </h3>

**A:**

The community has detailed planning and design for the construction of each version. For details, please refer to: [Roadmap](./roadmap/rocketmq-5.0.0/rocketmq-5.0.0.md)

---

<h3 id='4'>Q: 4. Is there a weekly meeting in the community, and how to get involved? </h3>

**A:**

<!-- todo: need to update the connection, can not connect through the relative path -->

Refer to the [Community](../../../community/community-weekly-meeting/attend-a-meeting) module.

---

<h3 id='5'>Q: 5. What is the difference between Spring Cloud Alibaba, Spring Cloud, and Spring Cloud Netflix? </h3>

**A:**

Spring Cloud: A set of common patterns for distributed application development officially provided by Spring can also be understood as a unified abstract programming model for microservice development.

Spring Cloud Netflix: A microservice framework implemented based on the Spring Cloud programming model, which is the earliest microservice framework. In recent years, Netflix has announced that most components are down for maintenance.

Spring Cloud Alibaba: Alibaba provides a microservice framework based on the Spring Cloud programming model. Most of its components use components provided by Ali, which is more suitable for Chinese programmers.

---

<h3 id='6'>Q: 6. Are there any best practice examples? </h3>

**A:**

See [Best Practice](../best-practice/integrated-example.md)

---

<h3 id='7'>Q: 7. Can Spring Cloud Alibaba integrate the new open source gateway Higress? </h3>

**A:**

Can be integrated, see [SCA-Higress-routing](../../../blog/SCA-Higress-Application-Deployment) for details:

---

<h3 id='8'>Q: 8. How to become a community Commiter? </h3>

**A:**

<!-- todo: need to update the connection, can not connect through the relative path -->

- For community contributions, please refer to [Developer Module](../../../community/developer/contributor-guide/new-contributor-guide_dev), which contains related descriptions.

- A Committer is an individual with write access to the repository, including the following criteria:

  - Individuals who can make continuous contributions to issues and PRs over a long period of time;
  - Made important feature contributions to the community;
  - Participate in community activities such as maintaining the issue list, discussing important features, hosting weekly community meetings, and participating in community weekly meeting sharing;
  - Participated in the Community Quarterly Active Contributor Program at least 1 time;
  - Participate in code review;
  - The Committer is nominated and voted by members of the Steering Committee, and must obtain at least 3 votes to be elected;

---

<h3 id='9'>Q: 9. Does the community provide relevant learning materials or technical blogs? </h3>

**A:**

<!-- todo: need to update the connection, can not connect through the relative path -->

- The community currently has [blog module](../../../blog/SCA-Proxyless-Mesh), update some community-related function introductions and explore some cutting-edge technologies;

- Relevant learning materials are being sorted out and will be released on the official website soon.

---
