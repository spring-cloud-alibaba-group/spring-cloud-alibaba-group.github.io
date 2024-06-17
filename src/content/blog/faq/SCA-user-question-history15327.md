---
id: "question-history-15327"
title: "springai 接入通义大模型的步骤 sca(spring-cloud-alibaba)"
date: "2024-06-14"
category: "expertConsultation"
description: "接入Sca(Spring Cloud Alibaba) SpringAI到通义大模型的详细步骤如下：1. **申请API-Key**：   - 访问[阿里云百炼页面](https://www.aliyun.com/product/bailian)，使用您的阿里云账号登录。   - 选择开通“百炼大模"
---

## 用户问题 ： 
 springai 接入通义大模型的步骤 sca(spring-cloud-alibaba) 

---------------
## 专家官方解答 ：

接入Sca(Spring Cloud Alibaba) SpringAI到通义大模型的详细步骤如下：

1. **申请API-Key**：
   - 访问[阿里云百炼页面](https://www.aliyun.com/product/bailian)，使用您的阿里云账号登录。
   - 选择开通“百炼大模型推理”服务，等待开通成功的通知。
   - 开通成功后，进入账户设置，点击右上角小人图标，选择API-KEY，创建一个新的API-KEY并记录下来。

2. **添加依赖**：
   - 在项目的`pom.xml`中添加Spring Cloud Alibaba 2023.0.1.0版本的依赖，确保包含`spring-cloud-starter-alibaba-ai`模块。

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
   - 在`application.yml`或`application.properties`中配置您的API-KEY。

```yaml
spring:
  cloud:
    ai:
      tongyi:
        chat:
          options:
            api-key: sk-a3d73b1709bf4a178c28ed7c8b3b5axx  # 用您实际的API-KEY替换这里
```
   或者
   ```properties
   spring.cloud.ai.tongyi.chat.options.api-key=sk-a3d73b1709bf4a178c28ed7c8b3b5axx
   ```

4. **实现聊天服务**：
   - 创建一个服务实现类，继承`AbstractTongYiServiceImpl`，并注入`ChatClient`和`StreamingChatClient`。

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

    // 实现具体的聊天逻辑方法
}
```

5. **编写聊天逻辑**：
   - 在服务实现类中，根据需求实现completion和streamCompletion方法，以处理消息和返回响应。

6. **启动应用**：
   - 最后，在Spring Boot的入口类中使用`SpringApplication.run()`方法启动应用。

```java
@SpringBootApplication
public class Application {
    public static void main(String[] args) {
        SpringApplication.run(Application.class, args);
    }
}
```

以上步骤完成后，您的项目就具备了通过Spring Cloud Alibaba框架调用通义大模型进行聊天交互的能力。Spring AI框架的优势在于它提供了一套统一的接口，便于在不同AI服务提供商之间切换，同时简化了与AI模型的集成过程，提高了开发效率和可维护性。


<font color="#949494">---------------</font> 


## 参考链接 ：

*专家经验：sca ai 调用通义大模型实现聊天交互 
 
 *专家经验：sca ai (spring cloud alibaba ai）介绍 


 <font color="#949494">---------------</font> 
 


## <font color="#FF0000">答疑服务说明：</font> 

本内容经由技术专家审阅的用户问答的镜像生成，我们提供了<font color="#FF0000">专家智能答疑服务</font>，在<font color="#FF0000">页面的右下的浮窗”专家答疑“</font>。您也可以访问 : [全局专家答疑](https://opensource.alibaba.com/chatBot) 。 咨询其他产品的的问题

### 反馈
如问答有错漏，欢迎点：[差评](https://ai.nacos.io/user/feedbackByEnhancerGradePOJOID?enhancerGradePOJOId=15333)给我们反馈。
