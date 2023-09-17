---
title: Service Governance
keywords: [Spring Cloud Alibaba]
description: Spring Cloud Alibaba, Roadmap Service Governance.
---

## Service Governance Capacity Building Background

Spring Cloud Alibaba has done some governance-related work before, but it only covers part of Istio's scenarios. In the future, it plans to continue to connect the governance capabilities that have not been connected to DestinationRule and VirtualService in Istio, so that users can seamlessly integrate into the cloud-native technical system.

## List of features (TODO)

1. Support Istio first-part jwt

2. GRPC version update and adaptation

3. TLS

    - mTLS/TLS communication (including using ISTIO's own mTLS and user-defined certificates)

    - Support authentication authentication (under the premise of mTLS)

4.  DestinationRule & VirtualService

    - Obtain load-balanced endpoints through EDS-related information, which means that service discovery data can be obtained directly from the control plane, without additional use of registration centers such as Nacos in the cloud-native system

    - Through the load balancing strategy specified in CDS, combined with spring-cloud-loadbalancer and other components to implement different load balancing strategies for different subsets

    - General load balancing strategy

      > RANDOM, PASSTHROUGH, ROUND_ROBIN, LEAST_REQUEST

    - consistent hashing
    - Regional load balancing

    - Configure the connection-related configuration of Feign in Spring Cloud through the connection pool configuration configured in DestinationRule

      > Maximum number of retries
      > Maximum idle time
      > http2 related configuration

    - Through OutlierDetection in DestinationRule, feign's outlier instance removal is realized

      > Number of consecutive errors
      > error interval
      > Minimum enucleation percentage
      > Maximum enucleation percentage

    - Through the request/response header operation in VirtualService, modify the request/response header to access this application

    - Through the matching rules of HTTP and HTTPS traffic in virtualService, some capabilities of label routing are enhanced

    https://istio.io/latest/zh/docs/reference/config/networking/virtual-service/#HTTPMatchRequest
    https://istio.io/latest/zh/docs/reference/config/networking/virtual-service/#TLSMatchAttributes

    For example, do some inversion operations (without headers) support, and route according to some additional labels

         ○ Return directly through the redirection in VirtualService to realize the service mock

         ○ Realize path rewriting through path rewriting in VirtualService

         ○ Implement fault retry through fault retry in VirtualService

         ○ Realize cross-domain through cross-domain in VirtualService

         ○ Realize fault injection through fault injection in VirtualService

## TODO:

1. xds-bootstrap research

2. mtls implementation and integration

## Service contract docking

### Effect

- After adding dependencies and specifying the reporting address, the user can achieve the following capabilities:

- The user writes the controller, and can see request information such as path/method on the open source console

- The user writes the controller, brings the openapi v3 annotation, and can see information such as path/method/parameter description on the open source console

### Technical realization

### Spring Cloud Alibaba new module

SCA opens the service governance module, which has the following functions:

     1. After the application starts, scan all controllers and collect openapi information

     2. If the reporting address is configured, report the information to the console

### Report data format

There are currently two options for the format:

     1. Refer to OpenAPI format to report, for example: https://editor.swagger.io/

     2. Extend the metadata format of dubbo, for example: https://github.com/apache/dubbo/pull/7029#issuecomment-746162196
     In order to support k8s deployment in the future, the above format will be converted into proto/gRPC definition at the same time.

### Report data authentication

The current reporting method is more inclined to json reporting, user name and password authentication.

In order to support k8s deployment in the future, mtls authentication + gRPC reporting will be supported.

### Console

<p align="center">
<img src="https://sca-storage.oss-cn-hangzhou.aliyuncs.com/website/image.png" />
</p>

Since the service governance open source will continue to use the Sentinel console, a "service contract" menu will be added to the Sentinel console to display service contract information.

### other

For more information about open source microservice governance, please refer to: https://www.yuque.com/ot01yo/thyzgp/rgzqv3
