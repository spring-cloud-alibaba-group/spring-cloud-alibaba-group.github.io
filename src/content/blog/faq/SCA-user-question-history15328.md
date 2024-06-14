---
id: "question-history-15328"
title: "springai 使用通义千问的具体步骤和方法 sca(spring-cloud-alibaba)"
date: "2024-06-14"
category: "expertConsultation"
description: "根据您的问题，您想了解如何在Spring Cloud Alibaba项目中使用通义千问。以下是详细步骤和方法，依托于已有的知识内容：### 步骤分析与执行指南1. **获取通义千问API-Key**   - 首先，您需要访问[阿里云百炼页面](https://www.aliyun.com/produ"
---

## 用户问题 ： 
 springai 使用通义千问的具体步骤和方法 sca(spring-cloud-alibaba) 

---------------
## 专家官方解答 ：

根据您的问题，您想了解如何在Spring Cloud Alibaba项目中使用通义千问。以下是详细步骤和方法，依托于已有的知识内容：

### 步骤分析与执行指南

1. **获取通义千问API-Key**
   - 首先，您需要访问[阿里云百炼页面](https://www.aliyun.com/product/bailian)，并登录您的阿里云账号。
   - 在该页面中选择开通“百炼大模型推理”服务。等待阿里云发送开通成功的通知。
   - 成功开通后，进入个人中心，点击右上角小人图标，进入API-KEY管理界面，创建一个新的API-KEY。请确保保存好此Key，后续配置需要用到。

2. **添加Spring Cloud Alibaba依赖**
   - 在您的项目的`pom.xml`文件中，加入Spring Cloud Alibaba 2023.0.1.0版本的依赖。具体配置如下：
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

3. **配置API-Key**
   - 在`application.yml`或`application.properties`中配置您的API-KEY。例如，在`application.yml`中：
     ```yaml
     spring:
       cloud:
         ai:
           tongyi:
             chat:
               options:
                 api-key: sk-a3d73b1709bf4a178c28ed7c8b3b5axx  # 替换为您自己的API-KEY
     ```
     或者在`application.properties`中：
     ```
     spring.cloud.ai.tongyi.chat.options.api-key=sk-a3d73b1709bf4a178c28ed7c8b3b5axx
     ```

4. **编写服务实现类**
   - 创建一个服务实现类，继承自`AbstractTongYiServiceImpl`，并自动注入`ChatClient`和`StreamingChatClient`。示例代码如下：
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

         // 实现具体的聊天逻辑方法，如completion和streamCompletion
         // ...
     }
     ```

5. **提供聊天逻辑实现**
   - 在服务类中实现具体的聊天逻辑，比如通过`chatClient.call(prompt)`发起一次问答请求，或者利用`streamingChatClient.stream(prompt)`实现流式问答。

6. **启动应用**
   - 最后，确保您的Spring Boot应用入口类（通常包含`@SpringBootApplication`注解）正确配置并启动应用。

### 解释
以上步骤确保了您可以成功地在Spring Cloud Alibaba项目中集成并使用通义千问的AI能力。通过配置API-Key，您能够安全地调用阿里云提供的大模型服务；依赖管理和自动装配简化了开发工作；而自定义的服务实现则允许您灵活设计与AI的交互逻辑，无论是即时回复还是流式处理，都能满足不同场景的需求。


<font color="#949494">---------------</font> 


## 参考链接 ：

*专家经验：sca ai 调用通义大模型实现聊天交互 


 <font color="#949494">---------------</font> 
 


## <font color="#FF0000">答疑服务说明：</font> 

本内容经由技术专家审阅的用户问答的镜像生成，我们提供了<font color="#FF0000">专家智能答疑服务</font>，在<font color="#FF0000">页面的右下的浮窗”专家答疑“</font>。您也可以访问 : [全局专家答疑](https://opensource.alibaba.com/chatBot) 。 咨询其他产品的的问题

### 反馈
如问答有错漏，欢迎点：[差评](https://ai.nacos.io/user/feedbackByEnhancerGradePOJOID?enhancerGradePOJOId=15334)给我们反馈。
