---
id: "question-history-15329"
title: "springai 调用 通义千问的详解 sca(spring-cloud-alibaba)"
date: "2024-06-14"
category: "expertConsultation"
description: "根据您的问题，您想了解如何在Spring Cloud Alibaba项目中调用通义千问的详细步骤。以下是基于提供的知识内容为您整理的解答：### 分析问题原因您希望为您的项目集成AI能力，特别是利用通义千问进行聊天交互。这需要您正确配置Spring Cloud Alibaba项目以连接阿里云的通义千"
---

## 用户问题 ： 
 springai 调用 通义千问的详解 sca(spring-cloud-alibaba) 

---------------
## 专家官方解答 ：

根据您的问题，您想了解如何在Spring Cloud Alibaba项目中调用通义千问的详细步骤。以下是基于提供的知识内容为您整理的解答：

### 分析问题原因
您希望为您的项目集成AI能力，特别是利用通义千问进行聊天交互。这需要您正确配置Spring Cloud Alibaba项目以连接阿里云的通义千问服务，并实现相应的业务逻辑。

### 具体步骤与解释

#### 1. 申请通义千问API密钥
- **操作路径**：访问[阿里云百炼页面](https://www.aliyun.com/product/bailian)，登录您的阿里云账号，开通“百炼大模型推理”服务，等待开通成功通知，然后在个人中心创建新的API-KEY并记录它。

#### 2. 添加依赖
- 在项目的`pom.xml`文件中，确保添加了正确的Spring Cloud Alibaba依赖，版本号为`2023.0.1.0`，并引入`spring-cloud-starter-alibaba-ai`依赖。

```xml
<dependencyManagement>
    <dependencies>
        <!-- Spring Cloud Alibaba依赖管理 -->
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
    <!-- 引入Spring Cloud Alibaba AI组件 -->
    <dependency>
        <groupId>com.alibaba.cloud</groupId>
        <artifactId>spring-cloud-starter-alibaba-ai</artifactId>
    </dependency>
</dependencies>
```

#### 3. 配置API密钥
- 在`application.yml`或`application.properties`中配置您的API-KEY。

```yaml
spring:
  cloud:
    ai:
      tongyi:
        chat:
          options:
            api-key: sk-a3d73b1709bf4a178c28ed7c8b3b5axx  # 替换为您的API-KEY
```
或者
```properties
spring.cloud.ai.tongyi.chat.options.api-key=sk-a3d73b1709bf4a178c28ed7c8b3b5axx
```

#### 4. 实现聊天服务
- 创建服务实现类，继承`AbstractTongYiServiceImpl`，并注入`ChatClient`和`StreamingChatClient`。

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

    // 实现聊天逻辑
    // ...
}
```

#### 5. 提供聊天逻辑实现
- 在服务类中实现`completion`方法用于一次性获取回复，以及`streamCompletion`方法用于流式处理回复。

#### 6. 启动应用
- 确保您的Spring Boot应用入口类上标注了`@SpringBootApplication`注解，并启动应用。

```java
@SpringBootApplication
public class YourApplication {
    public static void main(String[] args) {
        SpringApplication.run(YourApplication.class, args);
    }
}
```

### 解释
以上步骤确保了您的Spring Cloud Alibaba项目能够成功集成通义千问服务，通过定义的服务类可以方便地调用AI接口进行聊天交互，而无需直接处理底层通信细节。这样的设计既简化了开发工作，也使得未来更换AI服务提供商变得相对容易，体现了Spring AI框架的灵活性和便利性。

如果有任何步骤不清晰或在实施过程中遇到问题，请随时提问。


<font color="#949494">---------------</font> 


## 参考链接 ：

*专家经验：sca ai 调用通义大模型实现聊天交互 
 
 *专家经验：sca ai (spring cloud alibaba ai）介绍 


 <font color="#949494">---------------</font> 
 


## <font color="#FF0000">答疑服务说明：</font> 

本内容经由技术专家审阅的用户问答的镜像生成，我们提供了<font color="#FF0000">专家智能答疑服务</font>，在<font color="#FF0000">页面的右下的浮窗”专家答疑“</font>。您也可以访问 : [全局专家答疑](https://opensource.alibaba.com/chatBot) 。 咨询其他产品的的问题

### 反馈
如问答有错漏，欢迎点：[差评](https://ai.nacos.io/user/feedbackByEnhancerGradePOJOID?enhancerGradePOJOId=15335)给我们反馈。
