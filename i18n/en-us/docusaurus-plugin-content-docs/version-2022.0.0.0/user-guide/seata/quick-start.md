---
title: "Quick Start"
keywords: [Spring Cloud Alibaba,Seata.]
description: Seata, Quick Start.
---

### How to use Seata

Import dependencies:

```xml
<dependency>
     <groupId>com.alibaba.cloud</groupId>
     <artifactId>spring-cloud-starter-alibaba-seata</artifactId>
</dependency>
```

The project provides related examples: [Example](https://github.com/alibaba/spring-cloud-alibaba/tree/2.2.x/spring-cloud-alibaba-examples/seata-example)

1. Make sure that `nacos-server` is already running locally on port `8848`.
2. Configure the database, modify the following configuration in the `application.yml` file under the resources directory of the three applications `account-server`, `order-service`, and `storage-service` to the actual configuration in the running environment Configuration:

   ```properties
   base:
     config:
       mdb:
         hostname: 127.0.0.1 #your mysql server ip address
         dbname: seata #your database name for test
         port: 3306 #your mysql server listening port
         username: root #your mysql server username
         password: root #your mysql server password
   ```

3. Create a database table, which can be quickly operated according to `all.sql` under `spring-cloud-alibaba-examples/seata-example`:

     - Create [transaction log table](https://github.com/seata/seata/tree/develop/script/client) according to the selected transaction mode. For example, the default is AT mode, and the undo_log table needs to be used, then enter at/db and select the corresponding database script to execute.
     - Create the [Status Record Table](https://github.com/seata/seata/tree/develop/script/server/db) required for seata-server db mode, including `global_table`, `branch_table`, `lock_table`, `distributed_lock`.
     - Create the database tables required in the `spring-cloud-alibaba-examples/seata-example` example.

4. Create the Nacos configuration required by `spring-cloud-alibaba-examples/seata-example`.

   ```properties
   DataId: seata.properties, Group: SEATA_ Group (Seata 1.5.1 default group)

   Configuration content:

   service.vgroupMapping.order-service-tx-group=default
   service.vgroupMapping.account-service-tx-group=default
   service.vgroupMapping.business-service-tx-group=default
   service.vgroupMapping.storage-service-tx-group=default
   ```

5. Start Seata Server, there are two ways: Spring Boot and download server:

    - Run the seata-server under `spring-cloud-alibaba-examples/seata-example` to start the Seata server.
    - Start Seata Server according to [seata-server.jar](https://seata.io/zh-cn/docs/ops/deploy-guide-beginner.html) officially provided by the Seata community.

6. Start the sub-services `account-service`, `order-service`, `storage-service` under the `spring-cloud-alibaba-examples/seata-example` folder locally, and finally start the global transaction control service `business -service`.

7. After starting the example, visit the following URL through the HTTP GET method to verify the scenarios of calling other services through RestTemplate and FeignClient in `business-service`:

    http://127.0.0.1:18081/seata/feign
    http://127.0.0.1:18081/seata/rest

### Seata Dashboard

- Seata 1.5.1 supports Seata console local access console address: `http://127.0.0.1:7091`.
- The ongoing transaction information and global lock information can be observed through the Seata console, and the relevant information is deleted when the transaction is completed.


### How to verify the success of a distributed transaction?
#### Whether the Xid information is transmitted successfully

In the controllers of the three services `account-server`, `order-service` and `storage-service`, the first logic to execute is to output the Xid information in the RootContext, and if you see it, the correct Xid information is output , that is, it changes every time, and the Xids of all services in the same call are consistent. It indicates that the transmission and restoration of Seata's Xid is normal.

#### Consistency of data in the database

In this example, we simulate a scenario where a user purchases goods. StorageService is responsible for deducting the inventory quantity, OrderService is responsible for saving the order, BusinessService is responsible for deducting the balance of the user account, and AccountService is responsible for updating the balance of the account and serves as the global transaction control entry.
To demonstrate the example, we used Random in OrderService and AccountService. NextBoolean() randomly throws exceptions, simulating the scenario where exceptions occur randomly when calling services.

If distributed transactions are efficient, then the following equation should be true:
- User's original amount (1000) = user's existing amount + product unit price (2) order quantity product quantity per order (2)
- Initial Item Quantity (100) = Existing Item Quantity + Order Quantity * Item Quantity per Order (2)

### Spring Cloud support points
- A service provider that provides services through Spring MVC can automatically restore the Seata context when it receives an HTTP request that contains Seata information in the header.
- Support for automatic passing of Seata context when service caller calls via RestTemplate.
- Support for automatically passing the Seata context when the service caller calls via FeignClient.
- Support the scenario of using SeataClient and Hystrix at the same time.
- Supports scenarios used by SeataClient and Sentinel.