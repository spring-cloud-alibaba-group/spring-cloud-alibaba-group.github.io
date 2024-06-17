---
id: "question-history-15323"
title: "怎么用spring ai 实现与通义 聊天交互？ sca(spring-cloud-alibaba)"
date: "2024-06-13"
category: "expertConsultation"
description: "要使用Spring Cloud Alibaba实现与通义的聊天交互，您可以遵循以下详细步骤：1. **获取通义千问的API密钥**：   - 访问[阿里云百炼页面](https://www.aliyun.com/product/bailian)，登录您的阿里云账号。   - 选择开通“百炼大模型推理"
---

## 用户问题 ： 
 怎么用spring ai 实现与通义 聊天交互？ sca(spring-cloud-alibaba) 

---------------
## 专家官方解答 ：

要使用Spring Cloud Alibaba实现与通义的聊天交互，您可以遵循以下详细步骤：

1. **获取通义千问的API密钥**：
   - 访问[阿里云百炼页面](https://www.aliyun.com/product/bailian)，登录您的阿里云账号。
   - 选择开通“百炼大模型推理”服务，等待开通成功的通知。
   - 开通成功后，进入个人中心，点击右上角小人图标，选择API-KEY，创建新的API-KEY并记录它。

2. **添加Spring Cloud Alibaba依赖**：
   - 在项目的`pom.xml`中，确保添加了Spring Cloud Alibaba 2023.0.1.0版本的依赖。这包括添加依赖管理和具体的依赖项，如示例所示：
     ```xml
     <!-- 依赖管理 -->
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
     
     <!-- 具体依赖 -->
     <dependencies>
         <dependency>
             <groupId>com.alibaba.cloud</groupId>
             <artifactId>spring-cloud-starter-alibaba-ai</artifactId>
         </dependency>
     </dependencies>
     ```

3. **配置API密钥**：
   - 在`application.yml`或`application.properties`中配置您的API密钥，例如：
     ```yaml
     spring:
       cloud:
         ai:
           tongyi:
             chat:
               options:
                 api-key: sk-a3d73b1709bf4a178c28ed7c8b3b5axx  # 替换为您的API密钥
     ```
     或
     ```properties
     spring.cloud.ai.tongyi.chat.options.api-key=sk-a3d73b1709bf4a178c28ed7c8b3b5axx
     ```

4. **编写聊天服务实现类**：
   - 创建一个服务类，继承`AbstractTongYiServiceImpl`，并注入`ChatClient`和`StreamingChatClient`，以实现与通义千问的交互逻辑。

5. **实现聊天逻辑**：
   - 在服务类中，覆盖或实现`completion`和`streamCompletion`方法，分别处理非流式和流式的聊天响应。

6. **启动应用**：
   - 最后，确保您的Spring Boot应用主类已正确配置并启动。

通过以上步骤，您的Spring Cloud Alibaba应用就能够与通义千问模型进行聊天交互了。这些步骤简化了直接对接AI模型的复杂性，允许您利用Spring的便利性快速集成AI功能到您的项目中。


<font color="#949494">---------------</font> 


## 参考链接 ：

*专家经验：sca ai 调用通义大模型实现聊天交互 
 
 *专家经验：sca ai (spring cloud alibaba ai）介绍 


 <font color="#949494">---------------</font> 
 


## <font color="#FF0000">答疑服务说明：</font> 

本内容经由技术专家审阅的用户问答的镜像生成，我们提供了<font color="#FF0000">专家智能答疑服务</font>，在<font color="#FF0000">页面的右下的浮窗”专家答疑“</font>。您也可以访问 : [全局专家答疑](https://opensource.alibaba.com/chatBot) 。 咨询其他产品的的问题

### 反馈
如问答有错漏，欢迎点：[差评](https://ai.nacos.io/user/feedbackByEnhancerGradePOJOID?enhancerGradePOJOId=15324)给我们反馈。
