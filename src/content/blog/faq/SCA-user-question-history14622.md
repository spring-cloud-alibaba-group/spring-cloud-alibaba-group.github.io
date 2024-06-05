---
id: "question-history-14622"
title: "怎么用spring ai 接入通义千问？ sca(spring-cloud-alibaba)"
date: "2024-05-27"
category: "expertConsultation"
description: "要使用Spring Cloud Alibaba接入通义千问，您可以遵循以下详细步骤：1. **获取API-Key**：   - 首先，访问[阿里云百炼页面](https://www.aliyun.com/product/bailian)，登录您的阿里云账号。   - 选择开通“百炼大模型推理”服务，"
tags: ["spring-cloud-alibaba","spring ai","通义千问"]
keywords: ["spring-cloud-alibaba","spring ai","通义千问"]
---

要使用Spring Cloud Alibaba接入通义千问，您可以遵循以下详细步骤：

1. **获取API-Key**：
   - 首先，访问[阿里云百炼页面](https://www.aliyun.com/product/bailian)，登录您的阿里云账号。
   - 选择开通“百炼大模型推理”服务，并等待开通成功的通知（通常通过短信）。
   - 开通成功后，再次登录阿里云百炼页面，点击右上角小人图标，进入API-KEY管理，创建一个新的API-KEY。请妥善保存此Key，后续配置将会用到。

2. **添加依赖**：
   - 在您的项目`pom.xml`中，确保添加了Spring Cloud Alibaba依赖，以及特定的AI模块依赖。示例如下：
     ```xml
     <dependencyManagement>
         <dependencies>
             <dependency>
                 <groupId>com.alibaba.cloud</groupId>
                 <artifactId>spring-cloud-alibaba-dependencies</artifactId>
                 <version>2023.0.1.0</version>
                 <type>pom</type>
                 <scope>import</scope>
             </dependency>
         </dependencies>
     </dependencyManagement>

     <dependencies>
         <dependency>
             <groupId>com.alibaba.cloud</groupId>
             <artifactId>spring-cloud-starter-alibaba-ai</artifactId>
         </dependency>
     </dependencies>
     ```

3. **配置API-Key**：
   - 在`application.yml`或`application.properties`中配置通义千问的API-Key。例如，在`application.yml`中配置如下：
     ```yaml
     spring:
       cloud:
         ai:
           tongyi:
             chat:
               options:
                 api-key: sk-a3d73b1709bf4a178c28ed7c8b3b5axx  # 替换为您的实际API-KEY
     ```
   或在`application.properties`中配置：
     ```
     spring.cloud.ai.tongyi.chat.options.api-key=sk-a3d73b1709bf4a178c28ed7c8b3b5axx
     ```

4. **编写服务实现类**：
   - 创建一个服务实现类，继承自`AbstractTongYiServiceImpl`，并注入`ChatClient`和`StreamingChatClient`以实现聊天功能。
     ```java
     @Service
     public class TongYiServiceImpl extends AbstractTongYiServiceImpl {
         private final ChatClient chatClient;
         private final StreamingChatClient streamingChatClient;

         @Autowired
         public TongYiServiceImpl(ChatClient chatClient, StreamingChatClient streamingChatClient) {
             this.chatClient = chatClient;
             this.streamingChatClient = streamingChatClient;
         }

         // 实现具体的聊天逻辑，如completion和streamCompletion方法
     }
     ```

5. **启动应用**：
   - 确保您的Spring Boot应用入口类已配置好，然后启动应用。
     ```java
     @SpringBootApplication
     public class YourApplication {
         public static void main(String[] args) {
             SpringApplication.run(YourApplication.class, args);
         }
     }
     ```

通过以上步骤，您的Spring Cloud Alibaba项目就已经集成了通义千问，能够利用其强大的对话生成能力为您的应用增添AI交互功能。这不仅简化了与不同AI提供商的对接工作，也提高了代码的复用性和可维护性。
## <font color="#FF0000">答疑服务说明：</font> 

本内容经由技术专家审阅的用户问答的镜像生成，我们提供了<font color="#FF0000">专家智能答疑服务</font>，在<font color="#FF0000">页面的右下的浮窗”专家答疑“</font>。您也可以访问 : [全局专家答疑](https://opensource.alibaba.com/chatBot) 。 咨询其他产品的的问题

### 反馈
如问答有错漏，欢迎点：[差评](https://ai.nacos.io/user/feedbackByEnhancerGradePOJOID?enhancerGradePOJOId=14623)给我们反馈。
