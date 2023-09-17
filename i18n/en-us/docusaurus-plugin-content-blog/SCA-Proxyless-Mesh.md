---
title: Exploration of Spring Cloud Alibaba on Proxyless Mesh
keywords: [Proxyless Mesh, Microservice Governance]
description: Introduce Spring Cloud Alibaba's exploration on Proxyless Mesh
author: Cheng Pu
date: 2023-01-20
---

## Summary

After several years of development, Service Mesh is an emerging concept, which has attracted the attention and pursuit of mainstream technology companies from all over the world since its launch. The full name of Proxyless Mesh is Proxyless Service Mesh, which is a new software architecture developed on the basis of Service Mesh in recent years. The ideal of Service Mesh is full, but the reality is very skinny! Although there is no intrusion to the application through a layer of proxy, the increased network proxy overhead poses many challenges to the implementation of many Internet services with high performance requirements. Therefore, Proxyless Mesh, as a compromise between the traditional intrusive microservice framework and Service Mesh, provides an effective solution for a large number of non-Service Mesh applications in the cloud-native era, embracing cloud-native infrastructure, and solving pain points such as traffic management. This article will introduce Spring Cloud Alibaba's exploration on Proxyless Mesh.

<!--truncate-->

## Service Mesh

Standing today in 2023, Service Mesh is no longer an emerging concept. Looking back on the development history of the past 6 years, Service Mesh has been concerned and sought after by mainstream technology companies from all over the world since its launch.

- In 2016, the first year of Service Mesh, Buoyant CEO William Morgan first released Linkerd[[1]](https://linkerd.io/), which became the first Service Mesh project in the industry. In the same year, Lyft released Envoy[[2]](https://www.envoyproxy.io/), which became the second Service Mesh project.
- In 2017, Google, IBM, and Lyft jointly released Istio[[3]](https://github.com/istio/istio). Compared with Linkerd / Envoy and other projects, it added the concept of control plane to everyone for the first time and provided powerful traffic control capabilities. After years of development, Istio has gradually become the de facto standard for the control plane in the service mesh field.
- In July 2018, Istio 1.0 was released[[4]](https://istio.io/latest/news/releases/1.0.x/announcing-1.0/), marking that it has entered the era of production and availability. Gradually, more and more enterprises have begun to consider and try to apply service mesh to production.

As the most popular open source service mesh technology, Istio consists of two parts: the control plane and the data plane.

![image.png](https://intranetproxy.alipay.com/skylark/lark/0/2023/png/21257183/1673166074579-f43be3c0-d868-4c14-b33d-1582c1671293.png#clientId=uadda20a3-5fed-4&from=paste&height=307&id=u304b5422&name=image.png&originHeight=675&originWidth=1080&originalType=binary&ratio=1&rotation=0&showTitle=false&size=112132&status=done&style=none&taskId=u4d5e51cc-6bcb-4c84-aa17-0286854ca95&title=&width=490.90908026892316)

In the Istio Mesh architecture, its control plane is a process called Istiod, and the network proxy is Envoy. As a unified component of the control plane, Istiod is responsible for docking service registration discovery, routing rule management, certificate management and other capabilities. Envoy is used as a data plane to proxy business traffic through Sidecar. Istio and Envoy complete the transfer of data such as service discovery and routing rules through the xDS protocol interface. Istiod obtains service information by monitoring K8s resources such as Service and Endpoint, and sends these resources to the network agent on the data plane through the xDS protocol. Envoy is a process independent of the application. It runs with the business application Pod in the form of a sidecar (usually in the form of a container). It shares the same host network with the application process, and hijacks the network traffic of the business application by modifying the routing table to provide applications with non-intrusive capabilities such as service authentication and label routing.

## Proxyless Mesh

The full name of Proxyless Mesh is Proxyless Service Mesh, which is a new software architecture developed on the basis of Service Mesh in recent years. The ideal of Service Mesh is full, but the reality is very skinny! Although there is no intrusion to the application through a layer of proxy, the increased network proxy overhead poses many challenges to the implementation of many Internet services with high performance requirements. Therefore, Proxyless Mesh, as a compromise between the traditional intrusive microservice framework and Service Mesh, provides an effective solution for a large number of non-Service Mesh applications in the cloud-native era, embracing cloud-native infrastructure, and solving pain points such as traffic management. <!--truncate-->The difference between Service Mesh and Proxyless Mesh architecture is shown in the following figure:

![image.png](https://intranetproxy.alipay.com/skylark/lark/0/2023/png/21257183/1673167496757-9dc2f06a-ace3-4782-b145-adeac449ec7a.png#clientId=uadda20a3-5fed-4&from=paste&height=186&id=u496e40ee&name=image.png&originHeight=409&originWidth=1080&originalType=binary&ratio=1&rotation=0&showTitle=false&size=84637&status=done&style=none&taskId=ub601935d-93fc-4219-a593-57888c2d40b&title=&width=490.90908026892316)

In the past few years, well-known software open source communities at home and abroad have also conducted a lot of exploration in related fields. For example, in October 2021, the gRPC community provided users with the following architecture [[5]](https://istio.io/v1.12/blog/2021/proxyless-grpc/), which provides traffic management capabilities for gRPC applications by connecting to the Istio control plane and following the VirtualService & DestinationRule CRD specification.

![image.png](https://intranetproxy.alipay.com/skylark/lark/0/2023/png/21257183/1673167810474-02ebacab-109e-40ce-a9c0-b3b8c162176e.png#clientId=uadda20a3-5fed-4&from=paste&height=210&id=ub3a3231c&name=image.png&originHeight=461&originWidth=1040&originalType=binary&ratio=1&rotation=0&showTitle=false&size=124238&status=done&style=none&taskId=uef9fe286-41d7-4104-b2f0-046d4ca7e14&title=&width=472.7272624811853)

## Spring Cloud Alibaba Mesh Solution

As an intrusive microservice solution, Spring Cloud Alibaba provides users with one-stop microservice solutions in the process of building microservice applications, such as service registration and discovery, current limiting and degradation, distributed transactions and distributed messages, based on Spring Cloud microservice standards. In the past few years, it has been adopted by a large number of small and medium-sized enterprises in China, helping a large number of enterprises to embrace microservices more conveniently.
However, with the continuous deepening of microservices in enterprise applications, microservices bring many advantages such as system decoupling and high scalability to applications, and at the same time make applications more complex. How to manage microservices well? It has become a new issue that many enterprises gradually begin to pay attention to and pay attention to. The Spring Cloud Alibaba community has also noticed that many users have demands for microservice governance, so they have started exploring in this area since the beginning of 2022. The community believes that compared to Service Mesh, Proxyless Mesh is a more suitable technical solution for small and medium-sized enterprises. Not only will it not have a large performance loss caused by additional Sidecar agents, but more importantly, for enterprises, its implementation cost is very low!
To solve the microservice governance needs through the Mesh solution, a control plane that can dynamically issue rules to applications is indispensable. The community adheres to the principle of not reinventing the wheel and embracing mainstream solutions in the industry. By supporting the xDS protocol, users can not only provide users with service governance for Spring Cloud Alibaba applications through the mainstream Istio control plane, but also users can use the differentiated governance capabilities provided by Alibaba's open source OpenSergo microservice governance control plane for application governance. The relevant Mesh technology solution community provides it in the recently released 2.2.10-RC version [[6]](https://github.com/alibaba/spring-cloud-alibaba/releases). The first version that provides microservice governance capabilities has been made. The community is now partially compatible with the label routing and service authentication capabilities of Istio VirtualService & DestinationRule. Users can issue relevant rules to applications through the Istio control plane to manage traffic for applications.

![image.png](https://intranetproxy.alipay.com/skylark/lark/0/2023/png/59256332/1673253324947-3effabdf-3956-48cf-a101-5c366a91b2ab.png#clientId=u641e2097-531f-4&from=paste&height=245&id=u670014cb&name=image.png&originHeight=360&originWidth=762&originalType=binary&ratio=1&rotation=0&showTitle=false&size=155552&status=done&style=none&taskId=ud58f82c8-67cb-4fb2-988a-88eb670d8ff&title=&width=517.9971313476562)

### Preparation

The Proxyless Mesh solution first needs to prepare a control plane that can dynamically deliver rules to applications. This Spring Cloud Alibaba version 2.2.10-RC1 supports two mainstream control planes currently on the market to better meet various user demands:

#### 1. Istio control plane

In order to use the Istio control plane to issue governance rules, you first need to install the Istio control plane in the K8s environment. You can use the Istio environment for testing provided by the Spring Cloud Alibaba community, or you can try to install an Istio control plane yourself. The process of installing the Istio control plane is as follows:

1. To install the K8s environment, please refer to the [Installation Tools](https://kubernetes.io/zh-cn/docs/tasks/tools/) section of K8s
2. Install and enable Istio on K8s, please refer to the [Installation](https://istio.io/latest/zh/docs/setup/install/) section of the Istio official document

#### 2. OpenSergo control plane

OpenSergo is an open and general-purpose microservice governance project covering microservices and upstream and downstream related components. From the perspective of microservices, OpenSergo covers key governance areas such as traffic governance, service fault tolerance, service meta-information governance, and security governance. It provides a series of governance capabilities and standards, ecological adaptation, and best practices, and supports Java, Go, Rust, and other multi-language ecosystems.
As the unified control component of OpenSergo CRD, the OpenSergo control plane (Control Plane) carries the responsibility of service governance configuration conversion and distribution.

1. To install the K8s environment, please refer to the [Installation Tools](https://kubernetes.io/zh-cn/docs/tasks/tools/) section of K8s
2. To install and enable OpenSergo Control Plane on K8s, please refer to [OpenSergo Control Plane Installation Documentation](https://opensergo.io/zh-cn/docs/quick-start/opensergo-control-plane/) officially provided by OpenSergo

![img](https://user-images.githubusercontent.com/9434884/182856237-8ce85f41-1a1a-4a2a-8f58-db042bd4db42.png#height=336&id=MSEWC&originHeight=1362&originWidth=1856&originalType=binary&ratio=1&rotation=0&showTitle=false&status=done&style=none&title=&width=458)

#### Label Routing

##### App Background

In the current micro-service architecture, the number of services is very large. In order to better manage these micro-service applications, it may be necessary to label these applications and divide one or more service providers into the same group, so as to restrict traffic to only flow in designated groups and achieve the purpose of traffic isolation. Label routing can be used as the capability basis for scenarios such as blue-green release and grayscale release. It can be applied in the following scenarios:

- ** Multi-Version Development Test **

When multiple versions are developed in parallel, a development environment needs to be prepared for each version. If there are many versions, the cost of the development environment will be very high. The traffic isolation solution can greatly reduce resource costs during multi-version development and testing. Using the full-link traffic isolation mechanism based on label routing, specific traffic can be routed to a designated development environment. For example, if only application B and application D are modified in development environment 1, Tag1 is created for the versions of these two applications in development environment 1, and corresponding routing rules are configured. When the ingress application A calls B, it will determine whether the traffic meets the routing rules. If it is satisfied, route to the V1.1 version of application B in the development environment 1; if not, route to the V1 version of application B in the baseline environment. When application C calls D, it also decides to route to version V1 or version V1.1 of D according to the traffic.

![image.png](https://intranetproxy.alipay.com/skylark/lark/0/2022/png/59256332/1670813937718-d4452227-257c-46e5-9393-843b53a43368.png#clientId=ub03674c8-c3cf-4&from=paste&height=403&id=ue987ff03&name=image.png&originHeight=818&originWidth=1112&originalType=url&ratio=1&rotation=0&showTitle=false&size=197904&status=done&style=none&taskId=ua8cbb3d3-dfd1-4841-882c-9d88f8d7976&title=&width=548)

- **Application Traffic Isolation**

If multiple versions of an application run simultaneously online and are deployed in different environments, such as a daily environment and a special environment, you can use label routing to isolate the traffic of different versions in different environments, route the flash sale order traffic or order traffic from different channels to the special environment, and route normal traffic to the daily environment. Even if the special environment is abnormal, the traffic that should have entered the special environment will not enter the daily environment, and will not affect the use of the daily environment.

![image.png](https://intranetproxy.alipay.com/skylark/lark/0/2022/png/59256332/1670815218649-63c6da62-8ec8-461c-9d84-a2ea3c346353.png#clientId=ub03674c8-c3cf-4&from=paste&height=500&id=uc429db27&name=image.png&originHeight=668&originWidth=570&originalType=url&ratio=1&rotation=0&showTitle=false&size=104683&status=done&style=none&taskId=ub264d897-984d-400a-a09e-ee9fd6bd2ac&title=&width=427)

- **A/B Testing**

There are multiple application versions running online at the same time, and it is expected to perform A/B testing on different versions of the application. You can use the full-link traffic control of label routing to route the customer traffic in region A (such as Hangzhou) to version V1, and route the customer traffic in region B (such as Shanghai) to version V1.1 to verify different versions, thereby reducing the risk of releasing new products or new features, and providing guarantee for product innovation.

![image.png](https://intranetproxy.alipay.com/skylark/lark/0/2022/png/59256332/1670815281296-8caae5f2-278f-410b-847c-c3751cb741be.png#clientId=ub03674c8-c3cf-4&from=paste&height=527&id=u65a948c4&name=image.png&originHeight=842&originWidth=724&originalType=url&ratio=1&rotation=0&showTitle=false&size=137213&status=done&style=none&taskId=u1351cdf1-5842-4688-92fa-b688bcbf1fc&title=&width=453)

Currently, the tag routing capability provided by Spring Cloud Alibaba Mesh supports tag routing for requests based on request meta-information such as request path, request header, and HTTP request parameters, so that requests sent by applications are sent to upstream services of a specified version according to the rules issued by the Istio control plane.

##### Usage

###### 1. Import dependencies and configure the application

First, modify the `pom.xml` file, and import the label routing under Spring Cloud Alibaba 2.2.10-RC1 version and the related dependencies of the Istio resource conversion module (it is recommended to use the cloud-native application scaffolding [start.aliyun.com](https://start.aliyun.com) for project construction trial):

```xml
<dependencyManagement>
    <dependencies>
        <dependency>
            <groupId>com.alibaba.cloud</groupId>
            <artifactId>spring-cloud-alibaba-dependencies</artifactId>
            <version>2.2.10-RC1</version>
            <type>pom</type>
            <scope>import</scope>
        </dependency>
    </dependencies>
</dependencyManagement>

<dependencies>
    <dependency>
        <groupId>com.alibaba.cloud</groupId>
        <artifactId>spring-cloud-starter-alibaba-governance-routing</artifactId>
    </dependency>
    <dependency>
        <groupId>com.alibaba.cloud</groupId>
        <artifactId>spring-cloud-starter-xds-adapter</artifactId>
    </dependency>
</dependencies>
```

Configure the Istio control plane and Nacos registration center information for consumers in the `application.yml` configuration file:

```yaml
server:
  port: 18084
spring:
  main:
    allow-bean-definition-overriding: true
  application:
    name: service-consumer
  cloud:
    nacos:
      discovery:
        server-addr: 127.0.0.1:8848
        fail-fast: true
        username: nacos
        password: nacos
    istio:
      config:
        # Whether to enable Istio configuration conversion
        enabled: ${ISTIO_CONFIG_ENABLE:true}
        # Istiod IP
        host: ${ISTIOD_ADDR:127.0.0.1}
        # Istiod port
        port: ${ISTIOD_PORT:15010}
        # Polling Istio thread pool size
        polling-pool-size: ${POLLING_POOL_SIZE:10}
        # Polling Istio interval
        polling-time: ${POLLING_TIME:10}
        # Istiod authentication token (available when accessing Istiod port 15012)
        istiod-token: ${ISTIOD_TOKEN:}
        # Whether to print xds related logs
        log-xds: ${LOG_XDS:true}
```

Configure metadata for the producer application in the `application.yml` configuration file:

```yaml
# The first producer, version v1
spring.cloud.nacos.discovery.metadata.version=v1
# The second producer, version v2
spring.cloud.nacos.discovery.metadata.version=v2
```

If you need to connect to the OpenSergo control plane, you need to add `spring-cloud-starter-alibaba-governance-routing` and `spring-cloud-starter-opensergo-adapter to the consumer application

![image.png](https://intranetproxy.alipay.com/skylark/lark/0/2022/png/59256332/1670829548457-b8c4c868-4eba-48df-9977-94a487cf7a16.png#clientId=ub03674c8-c3cf-4&from=paste&height=1014&id=u8f0da6dc&name=image.png&originHeight=2028&originWidth=3574&originalType=binary&ratio=1&rotation=0&showTitle=false&size=1263912&status=done&style=none&taskId=u7ec88d37-d168-486e-b571-607313aa1fa&title=&width=1787)
The following information will be printed on the console, indicating that the application is listening to the configuration delivered by the Istio control plane:
![image.png](https://intranetproxy.alipay.com/skylark/lark/0/2022/png/59256332/1670827540929-bacb3da6-5c5e-47ec-8ceb-e2ba9047da6b.png#clientId=ub03674c8-c3cf-4&from=paste&height=253&id=FEeSH&name=image.png&originHeight=506&originWidth=2442&originalType=binary&ratio=1&rotation=0&showTitle=false&size=755462&status=done&style=none&taskId=ue6ca5f99-8c2b-41a3-b7fb-47b02395ec5&title=&width=1221)

###### 3. Send label routing rules through the Istio control plane

Deliver label routing rules through the Istio control plane, first deliver the DestinationRule rule:

```yaml
kubectl apply -f - << EOF
apiVersion: networking.istio.io/v1alpha3
kind: DestinationRule
metadata:
  name: my-destination-rule
spec:
  host: sca-virtual-service
  subsets:
  - name: v1
    labels:
      version: v1
  - name: v2
    labels:
      version: v2
EOF
```

This rule splits the backend service into two versions, the pod with the label v1 is divided into the v1 version, and the pod with the label v2 is divided into the v2 version
After that, issue the VirtualService rule:

```yaml
kubectl apply -f - << EOF
apiVersion: networking.istio.io/v1alpha3
kind: VirtualService
metadata:
  name: sca-virtual-service
spec:
  hosts:
    - service-provider
  http:
  - match:
    - headers:
        tag:
          exact: gray
      uri:
        exact: /istio-label-routing

    route:
    - destination:
        host: service-provider
        subset: v2
  - route:
    - destination:
        host: service-provider
        subset: v1
EOF
```

This VirtualService specifies the simplest label routing rule, routing the HTTP request whose request header is gray and the request path is /istio-label-routing to v2 version, and the rest of the traffic is routed to v1 version
Send several HTTP requests without request headers to IstioConsumerApplication

```shell
while true;
     do curl localhost:18084/istio-label-routing;
     sleep 0.1;
     echo "";
done;
```

Because the request header is not gray, the request will be routed to the v1 version, and the return is as follows
![image.png](https://intranetproxy.alipay.com/skylark/lark/0/2023/png/59256332/1673425287375-0d16c3eb-f984-4335-8774-011a22fa7478.png#clientId=ua63dc71d-6efb-4&from=paste&height=373&id=u8b6db133&name=image.png&originHeight=373&originWidth=630&originalType=binary&ratio=1&rotation=0&showTitle=false&size=158936&status=done&style=none&taskId=u436246ae-c6ed-446e-9ee1-d492e9d9f8f&title=&width=630)
Then send an HTTP request with the request header tag as gray and the request path as /istio-label-routing

```shell
while true;
     do curl localhost:18084/istio-label-routing -H "tag: gray";
     sleep 0.1;
     echo "";
done;
```

Because the routing rules are met, the request will be routed to the v2 version
![image.png](https://intranetproxy.alipay.com/skylark/lark/0/2023/png/59256332/1673425317396-bcf22604-c090-44f2-81e7-a383de341f02.png#clientId=ua63dc71d-6efb-4&from=paste&height=384&id=u468f4062&name=image.png&originHeight=384&originWidth=706&originalType=binary&ratio=1&rotation=0&showTitle=false&size=184842&status=done&style=none&taskId=u53c51ea5-7663-44f1-8166-0c454ec4664&title=&width=706)

##### 4. Issue label routing rules through the OpenSergo control plane

Specific traffic routing rules TrafficRouter are also defined through the OpenSergo control plane

```yaml
kubectl apply -f - << EOF
apiVersion: traffic.opensergo.io/v1alpha1
kind: TrafficRouter
metadata:
  name: service-provider
  namespace: default
  labels:
    app: service-provider
spec:
  hosts:
    - service-provider
  http:
    - match:
        - headers:
            tag:
              exact: v2
      route:
        - destination:
            host: service-provider
            subset: v2
            fallback:
              host: service-provider
              subset: v1
    - route:
        - destination:
            host: service-provider
            subset: v1
EOF
```

This TrafficRouter specifies the simplest traffic routing rule, routing HTTP requests with the request header tag v2 to the v2 version, and routing the rest of the traffic to the v1 version. If the v2 version does not have a corresponding node, the traffic will fallback to the v1 version.
After stopping the v2 version of ProviderApplication, continue to send an HTTP request with the request header tag as v2

```
curl --location --request GET '127.0.0.1:18083/router-test' --header 'tag: v2'
```

Because the v2 version has no service provider, the traffic is fallback to the v1 version.

```
Route in 30.221.132.228: 18081,version is v1.
```

The above detailed example code can be obtained in [Example Code](https://github.com/alibaba/spring-cloud-alibaba/tree/2.2.x/spring-cloud-alibaba-examples/governance-example/label-routing-example) on the community Github.

### Service Authentication

In normal production scenarios, microservice applications have security requirements, and any service cannot be called directly. Therefore, service authentication needs to be performed on the upstream application that calls the application to ensure the security of the application itself.
Service authentication not configured Consumer 1, 2, 3 and Provider are in the same namespace, and Consumer 1, 2, 3 can call all Paths (Path 1, 2, and 3) of Provider by default.
![image.png](https://intranetproxy.alipay.com/skylark/lark/0/2023/png/59256332/1673254389920-9f6f971f-83e4-4c13-80b5-54828110a636.png#clientId=u3be2ec29-8f22-4&from=paste&height=336&id=udccbb0df&name=image.png&originHeight=626&originWidth=1330&originalType=binary&ratio=1&rotation=0&showTitle=false&size=236089&status=done&style=none&taskId=u2c0ff2dc-ede5-4870-ae6f-cb04eb2fc5a&title=&width=713)
After configuring the service authentication rules, the legal call relationship between applications is shown in the following figure:
![image.png](https://intranetproxy.alipay.com/skylark/lark/0/2023/png/59256332/1673254350473-804e54d7-3759-4d58-a62a-9967b7b12124.png#clientId=u3be2ec29-8f22-4&from=paste&height=458&id=uffef029a&name=image.png&originHeight=728&originWidth=1388&originalType=binary&ratio=1&rotation=0&showTitle=false&size=269716&status=done&style=none&taskId=u5cc09038-2571-4378-bf77-8851dfa7447&title=&width=874)
Setting the authentication of all Paths can set the authentication rules for all the Paths of the Provider. For example, if the authentication rules of all the Paths of the Provider are set to reject calls from Consumer 1 (blacklist), then calls from Consumers 2 and 3 are allowed (whitelist).
Set the authentication of the specified Path. On the basis of setting the authentication of all the Paths, you can also set the authentication rules of the Consumer-specified Path. For example, according to the authentication method of all the Paths, Consumer 2 and 3 can access all the Paths of the Provider, but the Path2 of the Provider involves some core business or data, and you do not want Consumer 2 to call it. Path 1 and Path 3.
Currently, Spring Cloud Alibaba Mesh supports most of Istio's authentication rules, supports authentication rules other than mTLS support, and supports all Istio's string matching modes and logical operations of rules.
![image.png](https://intranetproxy.alipay.com/skylark/lark/0/2023/png/59256332/1673252085838-33a554dc-84a7-4368-9184-8d67b859cca6.png#clientId=u96cc9714-768f-4&from=paste&height=290&id=u1209da2a&name=image.png&originHeight=878&originWidth=2416&originalType=binary&ratio=1&rotation=0&showTitle=false&size=580493&status=done&style=none&taskId=u9c846760-e12a-4c76-9ca3-ef0686baa12&title=&width=799)

#### Usage

##### 1. Import dependencies and configure the application

Modify the `pom.xml` file, and introduce the Istio resource conversion and Spring Cloud Alibaba authentication modules (it is recommended to use the cloud-native application scaffolding [start.aliyun.com](https://start.aliyun.com) for project construction trial):

```xml
<dependencyManagement>
    <dependencies>
        <dependency>
            <groupId>com.alibaba.cloud</groupId>
            <artifactId>spring-cloud-alibaba-dependencies</artifactId>
            <version>2.2.10-RC1</version>
            <type>pom</type>
            <scope>import</scope>
        </dependency>
    </dependencies>
</dependencyManagement>

<dependencies>
    <dependency>
        <groupId>com.alibaba.cloud</groupId>
        <artifactId>spring-cloud-starter-alibaba-governance-auth</artifactId>
    </dependency>
    <dependency>
        <groupId>com.alibaba.cloud</groupId>
        <artifactId>spring-cloud-starter-xds-adapter</artifactId>
    </dependency>
</dependencies>
```

Configure Istio-related metadata in the application's `application.yml` configuration file:

```yaml
server:
  port: ${SERVER_PORT:80}
spring:
  cloud:
    governance:
      auth:
        # Whether to enable authentication
        enabled: ${ISTIO_AUTH_ENABLE:true}
     istio:
       config:
        # Whether to enable Istio configuration conversion
        enabled: ${ISTIO_CONFIG_ENABLE:true}
        # Istiod IP
        host: ${ISTIOD_ADDR:127.0.0.1}
        # Istiod port
        port: ${ISTIOD_PORT:15010}
        # Polling Istio thread pool size
        polling-pool-size: ${POLLING_POOL_SIZE:10}
        # Polling Istio interval
        polling-time: ${POLLING_TIMEOUT:10}
        # Istiod authentication token (available when accessing Istiod port 15012)
        istiod-token: ${ISTIOD_TOKEN:}
       # Whether to print xds related logs
      log-xds: ${LOG_XDS:true}
```

##### 2. Run the application

After importing the above dependencies and configuring the relevant configuration in the `application.yml` file, you can run the application and start a simple Spring Boot application, which contains only a simple interface, which will return the detailed information of this request to the client.
After starting the application, the following information will be printed on the console, indicating that the application is listening to the configuration issued by the Istio control plane:
![image.png](https://intranetproxy.alipay.com/skylark/lark/0/2022/png/59256332/1670827540929-bacb3da6-5c5e-47ec-8ceb-e2ba9047da6b.png#clientId=ub03674c8-c3cf-4&from=paste&height=253&id=u83065cbf&name=image.png&originHeight=506&originWidth=2442&originalType=binary&ratio=1&rotation=0&showTitle=false&size=755462&status=done&style=none&taskId=ue6ca5f99-8c2b-41a3-b7fb-47b02395ec5&title=&width=1221)

##### 3. Send the authentication configuration through the Istio control plane

Use the following command to issue an authentication rule to the demo application through Istio. This rule restricts access to the request header of the application:

```yaml
kubectl apply -f - << EOF
apiVersion: security.istio.io/v1beta1
kind: AuthorizationPolicy
metadata:
  name: http-headers-allow
  namespace: ${namespace_name}
spec:
  selector:
    matchLabels:
      app: ${app_name}
  action: ALLOW
  rules:
  - when:
    - key: request.headers[User-Agent]
      values: ["PostmanRuntime/*"]
EOF
```

Then send an HTTP request with a User-Agent header to verify that the rule is in effect:

```shell
while true;
     do curl localhost/auth -H "User-Agent: PostmanRuntime/7.29.2";
     sleep 0.1;
     echo "";
done;
```

Then send an HTTP request with a User-Agent header to verify that the rule is in effect:
![image.png](https://intranetproxy.alipay.com/skylark/lark/0/2023/png/59256332/1673429632757-50615c92-6307-49db-b83f-24d3e2740c7f.png#clientId=ub4579414-6c96-4&from=paste&height=334&id=ua5e2086d&name=image.png&originHeight=334&originWidth=809&originalType=binary&ratio=1&rotation=0&showTitle=false&size=215055&status=done&style=none&taskId=ue812a526-5099-4827-aa3b-cbdb04e8de6&title=&width=809)
Then send an HTTP request with a User-Agent header to verify that the rule is in effect:

```shell
while true;
     do curl localhost/auth;
     sleep 0.1;
     echo "";
done;
```

Since this request does not carry correct HTTP Header information, it will return:
![image.png](https://intranetproxy.alipay.com/skylark/lark/0/2023/png/59256332/1673426265876-d384df51-0a0f-41dc-bc62-c0bb96e019a3.png#clientId=ua63dc71d-6efb-4&from=paste&height=489&id=u2a04e281&name=image.png&originHeight=489&originWidth=496&originalType=binary&ratio=1&rotation=0&showTitle=false&size=155659&status=done&style=none&taskId=u1096f881-6679-48af-acf2-40382786ec1&title=&width=496)
The above detailed example code can be obtained from [Example Code](https://github.com/alibaba/spring-cloud-alibaba/tree/2.2.x/spring-cloud-alibaba-examples/governance-example/authentication-example) on the community Github.
