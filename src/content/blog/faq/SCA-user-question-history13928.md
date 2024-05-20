---
id: "question-history-13928"
title: "怎么用spring cloud alibaba ai 实现基于大模型的聊天？ sca(spring-cloud-alibaba)"
date: "2024-05-17"
category: expertConsultation
description: "sca(spring-cloud-alibaba) 怎么用spring cloud alibaba ai 实现基于大模型的聊天？"
tags: ["spring-cloud-alibaba","ai","大模型","聊天"]
keywords: ["spring-cloud-alibaba","ai","大模型","聊天"]
---

## 用户问题 ： 
 怎么用spring cloud alibaba ai 实现基于大模型的聊天？ sca(spring-cloud-alibaba) 

---------------
## 专家官方解答 ：

使用Spring Cloud Alibaba AI实现基于大模型的聊天功能，可以遵循以下步骤：

1. **添加依赖**: 在项目的`pom.xml`文件中引入Spring Cloud Alibaba相关依赖，确保版本为2023.0.1.0或以上，以获得对Spring AI的支持。这包括添加Spring Cloud Alibaba依赖管理和具体的AI Starter依赖。

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

2. **配置API Key**: 在`application.yml`或`application.properties`文件中，配置阿里云通义大模型所需的API密钥。这是与阿里云服务交互所必需的认证信息。

```yaml
spring:
  cloud:
    ai:
      tongyi:
        chat:
          options:
            api-key: sk-a3d73b1709bf4a178c28ed7c8b3b5axx  # 请替换为有效的API密钥
```

3. **创建服务实现类**: 实现聊天服务，通过自动注入`ChatClient`和`StreamingChatClient`来与通义大模型进行交互。这两个客户端封装了与模型通信的细节。

```java
@Service
public class TongYiChatServiceImpl {

    private final ChatClient chatClient;
    private final StreamingChatClient streamingChatClient;

    @Autowired
    public TongYiChatServiceImpl(ChatClient chatClient, StreamingChatClient streamingChatClient) {
        this.chatClient = chatClient;
        this.streamingChatClient = streamingChatClient;
    }

    public String simpleCompletion(String message) {
        Prompt prompt = new Prompt(new UserMessage(message));
        return chatClient.call(prompt).getResult().getOutput().getContent();
    }

    public String streamCompletion(String message) {
        StringBuilder fullContent = new StringBuilder();
        streamingChatClient.stream(new Prompt(message))
                .flatMap(chatResponse -> Flux.fromIterable(chatResponse.getResults()))
                .map(Content::getContent)
                .doOnNext(fullContent::append)
                .blockLast();
        return fullContent.toString();
    }
}
```

4. **启动应用**: 创建一个Spring Boot入口类，通过`SpringApplication.run()`方法启动应用。

```java
@SpringBootApplication
public class ChatApplication {
    public static void main(String[] args) {
        SpringApplication.run(ChatApplication.class, args);
    }
}
```

完成以上步骤后，您就已经成功搭建了一个基于Spring Cloud Alibaba AI的聊天应用，能够利用阿里云的通义大模型进行对话交互。通过调用`TongYiChatServiceImpl`中的方法，您可以轻松地实现发送消息和接收回复的功能。


<font color="#949494">---------------</font> 


## 参考链接 ：

*专家经验:sca ai (spring cloud alibaba ai）介绍 
 
 *专家经验:sca ai 调用通义大模型实现聊天交互 


 <font color="#949494">---------------</font> 
 


## <font color="#FF0000">答疑服务说明：</font> 

本内容经由技术专家审阅的用户问答的镜像生成，我们提供了<font color="#FF0000">专家智能答疑服务</font>，在<font color="#FF0000">页面的右下的浮窗”专家答疑“</font>。您也可以访问 : [全局专家答疑](https://opensource.alibaba.com/chatBot) 。 咨询其他产品的的问题

### 反馈
如问答有错漏，欢迎点：[差评](https://ai.nacos.io/user/feedbackByEnhancerGradePOJOID?enhancerGradePOJOId=13931)给我们反馈。
