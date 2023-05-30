---
title: "Best Practice"
keywords: [Spring Cloud Alibaba]
description: Integrated Example, Baset Practice.
---

## Introduction to Spring Cloud Alibaba Project

Spring Cloud Alibaba (hereinafter referred to as SCA) is committed to providing a one-stop solution for microservice development. This project contains the necessary components to develop distributed application services, so that developers can easily use these components to develop distributed application services through the Spring Cloud programming model.
Relying on SCA, you only need to add some annotations and a small amount of configuration to connect Spring Cloud applications to Alibaba's distributed application solutions, and quickly build distributed application systems through Alibaba middleware.

## Project best practice case introduction

The best practice for SCA projects is the example project that integrates SCA-related components (Nacos, Sentinel, Seata, RocketMQ). It is convenient for users to fully experience the one-stop microservice solution provided by SCA.

    1. Spring Cloud Gateway: Gateway
    2. Nacos: service registration and configuration center
    3. Sentinel: fuse current limiter
    4. Seata: Distributed Transactions
    5. RocketMQ: message queue, peak cutting and valley filling
    6. Docker: Use Docker for containerized deployment
    7. Kubernetes: containerized deployment using k8s

The following figure is a schematic diagram of the SCA best practice project structure:

![Project Structure Diagram](https://sca-storage.oss-cn-hangzhou.aliyuncs.com/sca-example/image.png)

## Component Details

1. Among them, the scene where the user places an order to purchase goods mainly uses Seata to perform distributed transactions.

2. The scene where the user likes the product, simulates the traffic limitation through Sentinel or the peak shaving and valley filling by RocketMQ in a large traffic environment. In this scenario, the SCA community provides two processing methods to deal with large traffic:

   - Sentinel binds the designated gateway route on the gateway side to perform fuse downgrade of services.

   - RocketMQ performs traffic peak shaving and valley filling. Under large traffic requests, producers send messages to RocketMQ, while consumers pass configurable messages.
  
   The consumption rate is used to pull and withdraw consumption, reducing the pressure of large traffic directly requesting the database to increase the like request.

### Spring Cloud Gateway

Spring Cloud GateWay is the gateway of the microservice module, which integrates Nacos to realize the configuration of dynamic routing. By monitoring the change of Nacos configuration, the routing configuration of the service gateway is dynamically refreshed. Every time the routing information changes, there is no need to modify the configuration file and then restart the service.

### Nacos

Nacos is the service registry and configuration center of the SCA microservice module. Integrating Spring Cloud Gateway, all microservice modules are registered in Nacos for service registration and discovery.

### Seata

Based on Seata's AT mode, it is used for distributed transaction processing of inventory module, account module and order module. When the inventory is insufficient/the account balance is insufficient, the transaction is rolled back.

### Sentinel

Service circuit breaker and current limit for liking scenarios. Integrate Nacos configuration center and Spring Cloud Gateway to realize dynamic configuration of specified routing rules and circuit breaking and current limiting rules.

### RocketMQ

It is used to cut peaks and fill valleys of like service traffic. By sending large-traffic like requests from the producer to MQ, the consumer module pulls from MQ for consumption at a certain frequency. It is not a simple direct service fusing, current limiting and downgrading, and realizes RocketMQ's peak-shaving and valley-filling capabilities for large traffic.

### Application Scenario Description

In this example, the SCA community provides two business scenarios:
1. The scene where the user places an order to purchase goods, after placing the order:

    1. First request the inventory module to deduct the inventory;
    
    2. Deduct the account balance;
    
    3. Generate order information and return a response.

2. The user likes the product (simulating the producer-consumer application scenario of MQ) and returns the detailed information (number of likes, etc.) after the product is liked.

## project deployment

## Prepare for deployment

Before starting the service container, please configure the Host address mapping to ensure that the service can start normally!

```shell
# for integrated-example
127.0.0.1 integrated-mysql
127.0.0.1 nacos-server
127.0.0.1 seata-server
127.0.0.1 rocketmq
127.0.0.1 gateway-service
127.0.0.1 integrated-frontend
```

### Service Localization Deployment

**Service component preparation**

Before running the example, you need to ensure that the machine has the following basic environment. If your local environment does not have the current environment, the following will build it step by step to demonstrate the building process. Of course, you can also quickly start the corresponding components through the docker-compose file provided by the Spring Cloud Alibaba (hereinafter referred to as SCA) community. For each component version of this project, please move to the release page of each community to download and decompress and run.

- Nacos server [version 2.1.0](https://github.com/alibaba/nacos/releases)
- Seata Server [Version 1.5.1](https://github.com/seata/seata/releases)
- RocketMQ server [version 4.9.4](https://github.com/apache/rocketmq/releases)
- MySQL server version 5.7

**Database configuration**

Before starting the database configuration, please make sure that the MySQL server is started and can provide services to the outside world normally.

For the first scenario, the order, account, and inventory microservices all need their own databases, and the second scenario simulates likes and also needs a database for storing like information. Run the sql script of `spring-cloud-alibaba-examples/integrated-example/config-init/sql/init.sql` to create the environment required by the business and Seata-related tables with one click.

**Nacos configuration**

1. Start Nacos Server

     In order to facilitate the demonstration of the example, Nacos is started in the standalone mode, enter the directory after decompressing Nacos, and execute the following command.

     ```shell
     #Linux/Mac environment
     sh bin/startup.sh -m standalone
     #If you are in an Ubuntu environment, execute the above command to start the error message [[The symbol cannot be found, you can execute the following command
     bash bin/startup.sh -m standalone
     #WinEnvironment
     .\bin\startup.cmd -m standalone
     ```
2. Add configuration

     Before importing configurations in batches, please modify the data source configuration **(username and password)** in `spring-cloud-alibaba-examples/integrated-example/config-init/config/datasource-config.yaml`.

     Then run `spring-cloud-alibaba-examples/integrated-example/config-init/scripts/nacos-config-quick.sh` to complete the one-click import of all microservice configurations.

     ```shell
     #linux
     sh nacos-config-quick.sh
     # Windows can use git bash to complete the import of the configuration Execute the same command as above
     ```


**Seata configuration**

The db mode of Seata requires additional configuration of database information and modification of the configuration file of the Seata server, and the configuration file in the new version is merged compared with the old version, so for the convenience of demonstration, Seata Server is started in the file mode of the Seata stand-alone.

Go to the seata directory after release decompression, and execute the following command.

```shell
#Linux/Mac environment
sh ./bin/seata-server.sh
#WinEnvironment
bin\seata-server.bat
```

**RocketMQ 配置**

Go to the rocketmq directory after release decompression, and execute the following command.

1. Start NameServer

    ```shell
    # Linux/Mac environment
    sh bin/mqnamesrv
    # Wine nvironment
    .\bin\mqnamesrv.cmd
    ```

2. Start Broker

    ```shell
    # Linux/Mac environment
    sh bin/mqbroker
    # Win environment
    .\bin\mqbroker.cmd -n localhost:9876
    ```

**Run the example**

After the preparations are completed, you can run the example. According to different usage scenarios, you can experience user placing an order (distributed transaction capability) and simulating high-traffic likes (capability of melting current limit and peak-shaving and valley-filling capabilities).

First, you need to start the integrated-frontend and integrated-gateway microservice applications respectively.

- The integrated-gateway module is the gateway for the entire best practice example.
- integrated-frontend is a simple frontend page for best practice examples.

1. Distributed transaction capability

    **Scene Description**

    For distributed transaction capabilities, the SCA community provides a scenario where users place an order to purchase goods. After placing an order:

    - Request inventory module first, deduct inventory
    - Deduct account balance
    - Generate order information and return a response

    **Start test**

    Start the three microservice applications of integrated-storage, integrated-account, and integrated-order respectively.

    Visit `http://integrated-frontend:8080/order` to experience the corresponding scene.

    Directly click the order button to submit the form, and the application simulates that the client sends a request to create an order to the gateway.

    - The user's userId is admin
    - The product number of the user's order is No. 1
    - The number of products purchased in this order is 1

    <div align="center">
        <img src="https://camo.githubusercontent.com/9448ae62231a5728f61fd0def7f846c745ddfb6bc5ebaea691cf3f8f042a26f3/68747470733a2f2f6d792d696d672d312e6f73732d636e2d68616e677a686f752e616c6979756e63732e636f6d2f696d6167652d32303232313031363135353431363532342e706e67"/>
    </div> 

    In this example, for the sake of demonstration, the unit price of each item is 2.

    In the previous preparatory work, when initializing the business database table, the application created a new user, the userId is admin, and the balance is 3 yuan; at the same time, a new product numbered 1 is created, and the inventory is 100 pieces.

    Therefore, through the above operations, the application will create an order, deduct the number of inventory corresponding to item number 1 (100-1=99), and deduct the balance of the admin user (3-2=1).

    <div align="center">
        <img src="https://camo.githubusercontent.com/029a719f01294cd8d4c2af4608fcd4eef83d2c95b087006791cab2a5b3ced0b1/68747470733a2f2f6d792d696d672d312e6f73732d636e2d68616e677a686f752e616c6979756e63732e636f6d2f696d6167652d32303232313031363135353432393830312e706e67"/>
    </div>

    If the same interface is requested again, the inventory is also deducted first (99-1=98), but an exception will be thrown due to insufficient balance of the admin user, which will be caught by Seata, perform a two-phase commit of the distributed transaction, and roll back the transaction.

    <div align="center">
        <img src="https://camo.githubusercontent.com/33c136cbeb3dd32ba438dfc4301d96a71da6d06a0ee85de3249085de19e87551/68747470733a2f2f6d792d696d672d312e6f73732d636e2d68616e677a686f752e616c6979756e63732e636f6d2f696d6167652d32303232313031363135353433363131322e706e67"/>
    </div>

    You can see the record of inventory in the database because it is still 99 pieces after the rollback.

2. Fusing and current limiting, peak-shaving and valley-filling capabilities

    **Scene Description**
    
    In view of the service circuit breaker and current limit under the background of large traffic, and the peak shaving to fill the valley, the SCA community provides a scene where users like the product. In this scenario, the SCA community provides two processing methods to deal with large traffic.

    - Sentinel binds the specified gateway route on the gateway side to perform circuit breaker downgrade of the service.
    - RocketMQ performs traffic peak shaving and valley filling. Under large traffic requests, producers send messages to RocketMQ, while consumers pull and consume through configurable consumption rates, reducing the pressure of large traffic directly requesting the database to increase like requests.

    **Start test**

    Start the integrated-praise-provider and integrated-praise-consumer modules respectively.

    **Sentinel service fuse downgrade**

    Visit `http://integrated-frontend:8080/sentinel` to experience the corresponding scene.

    <div align="center">
        <img src="https://camo.githubusercontent.com/167540c2a9c937fcc99c29f174a7747128dc318e2badbc2531a4d6eee66bd6e7/68747470733a2f2f6d792d696d672d312e6f73732d636e2d68616e677a686f752e616c6979756e63732e636f6d2f696d6167652d32303232313031363135353530313239302e706e67"/>
    </div>

    The flow-limiting rule of the gateway routing thumbs-up service is 5, and 10 concurrent requests are simulated through asynchronous processing on the front end.

    Therefore, it can be seen that Sentinel has performed a service fuse on the Gateway side for the excess traffic and returned a fallback to the client, and at the same time the number of likes in the database has been updated (+5).

    <div align="center">
        <img src="https://camo.githubusercontent.com/9115475ee01df4f11c375d842dde9cfd4cb8ec6de0dfa399d9d0a5f63e5a2702/68747470733a2f2f6d792d696d672d312e6f73732d636e2d68616e677a686f752e616c6979756e63732e636f6d2f696d6167652d32303232303931343135353735353130332e706e67"/>
    </div>

    **RocketMQ performs traffic peak-shaving and valley-filling**

    Visit `http://integrated-frontend:8080/rocketmq` to experience the corresponding scenario.

    Since the consumption rate and interval of the integrated-praise-consumer consumer module were configured in Nacos before, when the button is clicked, the application simulates 1000 praise requests. For 1000 praise requests, integrated-praise-provider will send 1000 requests They all deliver messages to the Broker, and in the consumer module, they will consume according to the configured consumption rate, update the product data of the likes to the database, and simulate the characteristics of RocketMQ's peak-shaving and valley-filling under heavy traffic.

    You can see that the number of likes in the database is being dynamically updated.

    <div align="center">
        <img src="https://camo.githubusercontent.com/869d9c0c343a28435d62f76ef20bcb12d735c7983a737bd6c68fe8f3e678d40d/68747470733a2f2f6d792d696d672d312e6f73732d636e2d68616e677a686f752e616c6979756e63732e636f6d2f696d6167652d32303232313031363137333630343035392e706e67"/>
    </div>
### Docker Compose deploy

Containerized deployment is to package the application code and all required components (such as libraries, frameworks and other dependencies) together and let them run in isolation in their own "containers".

> Note: If you use Docker Compose to experience the example, you need to ensure that the memory resources >= 24G!

**Component container start**

Enter the spring-cloud-alibaba-examples/integrated-example directory and execute `docker-compose -f docker-compose-env.yml up -d` to start all the components that the microservice application depends on, namely Nacos, MySQL , RocketMQ, Seata-Server, complete the required database table configuration and other related operations.

**Add application configuration information**

In the spring-cloud-alibaba-examples/integrated-example directory, execute the `config-init/scripts/nacos-config-quick.sh` script file in the terminal. All configuration information of the application can be automatically injected.

**service container start**

In the spring-cloud-alibaba-examples/integrated-example directory, execute the following command `docker-compose -f ./docker-compose/docker-compose-service.yml up -d` to quickly deploy the example application.

**Visit Example**

The process of experiencing the example is the same as accessing the service localization deployment example.

**service container stopped**

In the spring-cloud-alibaba-examples/integrated-example directory, execute the following command to stop the running example service container.
`docker-compose -f ./docker-compose/docker-compose-service.yml down`

**Component container stopped**

In the spring-cloud-alibaba-examples/integrated-example directory, execute the following command `docker-compose -f ./docker-compose/docker-compose-env.yml down` to stop the running example component container.

For more information, please refer to: [Spring Cloud Alibaba containerized deployment best practices | Docker-Compose version](https://github.com/alibaba/spring-cloud-alibaba/blob/2022.x/spring-cloud-alibaba-examples/integrated-example/docs/zh/docker-compose-deploy-zh.md)

### Kubernetes Helm deploy

**Preparation**

Here, the Pod service in Kubernetes is exposed to the outside world through NodePort, and the ip mapping of the Kubernetes cluster nodes needs to be configured before starting the test.

``` shell
# Please adjust according to the actual situation with the public network ip of your K8S node
120.24.xxx.xxx integrated-frontend
120.24.xxx.xxx gateway-service
120.24.xxx.xxx integrated-mysql-web
120.24.xxx.xxx nacos-mysql-web
120.24.xxx.xxx nacos-svc
```

**Project Deployment**

Go to the spring-cloud-alibaba-examples/integrated-example directory and execute the following command to deploy the application with Helm.

```shell
helm package helm-chart

helm install integrated-example integrated-example-1.0.0.tgz
```

By running the above command, according to the Helm Chart document provided by the SCA community, the deployment of the best practice example can be quickly completed through Helm.
You can use the kubectl command provided by Kubernetes to view the resource deployment of each container. After waiting patiently for all containers to start, you can go to the corresponding page to experience the usage scenarios and capabilities of each component.

**Experience Example**

The process of experiencing the example is the same as accessing the service localization deployment example.

**stop testing**

If you want to stop the experience, enter the following command.

```shell
helm uninstall integrated-example
```

For more information, please refer to: [Spring Cloud Alibaba containerized deployment best practices | Kubernetes Helm-Chart version](https://github.com/alibaba/spring-cloud-alibaba/blob/2022.x/spring-cloud-alibaba-examples/integrated-example/docs/zh/kubernetes-deployment-zh.md)

## other

This example only selects typical functional features for each component to serve application scenarios.

Of course, the functional characteristics of each component are not limited to those demonstrated in the best practice. If you are interested in SCA or want to learn more about SCA projects, please read the independent example related documents of each component.

- Nacos examples
    - [Nacos config example](https://github.com/alibaba/spring-cloud-alibaba/blob/2022.x/spring-cloud-alibaba-examples/nacos-example/nacos-config-example/readme-zh.md)
    - [Nacos discovery example](https://github.com/alibaba/spring-cloud-alibaba/blob/2022.x/spring-cloud-alibaba-examples/nacos-example/nacos-discovery-example/readme-zh.md)
- [Sentinel core example](https://github.com/alibaba/spring-cloud-alibaba/blob/2022.x/spring-cloud-alibaba-examples/sentinel-example/sentinel-core-example/readme-zh.md)
- [Seata example](https://github.com/alibaba/spring-cloud-alibaba/blob/2022.x/spring-cloud-alibaba-examples/seata-example/readme-zh.md)
- [RocketMQ example](https://github.com/alibaba/spring-cloud-alibaba/blob/2022.x/spring-cloud-alibaba-examples/rocketmq-example/readme-zh.md)