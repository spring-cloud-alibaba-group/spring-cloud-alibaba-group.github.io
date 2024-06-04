---
id: "question-history-13928"
title: "怎么用spring cloud alibaba ai 实现基于大模型的聊天？ sca(spring-cloud-alibaba)"
date: "2024-05-27"
category: "expertConsultation"
description: "要使用Spring Cloud Alibaba AI实现基于大模型的聊天功能，您可以遵循以下步骤：1. **获取阿里云通义千问API密钥**：   - 访问[阿里云百炼页面](https://www.aliyun.com/product/bailian)，登录您的阿里云账号。   - 选择开通“百炼"
tags: ["spring-cloud-alibaba","ai","大模型","聊天"]
keywords: ["spring-cloud-alibaba","ai","大模型","聊天"]
---

要使用Spring Cloud Alibaba AI实现基于大模型的聊天功能，您可以遵循以下步骤：

1. **获取阿里云通义千问API密钥**：
   - 访问[阿里云百炼页面](https://www.aliyun.com/product/bailian)，登录您的阿里云账号。
   - 选择开通“百炼大模型推理”服务，等待开通成功的通知。
   - 成功开通后，进入用户设置（右上角小人图标），选择API-KEY，创建一个新的API-KEY并记录它。

2. **添加依赖**：
   - 在项目的`pom.xml`文件中，引入Spring Cloud Alibaba 2023.0.1.0版本的依赖，以及Spring Cloud Alibaba AI的Starter依赖，以集成AI服务。

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

3. **配置API密钥**：
   - 在`application.yml`或`application.properties`中，配置阿里云通义千问的API密钥，确保与您之前获取的密钥相匹配。

```yaml
spring:
  cloud:
    ai:
      tongyi:
        chat:
          options:
            api-key: sk-a3d73b1709bf4a178c28ed7c8b3b5axx  # 替换为实际的API-KEY
```

4. **编写服务实现类**：
   - 创建一个服务实现类，继承自`AbstractTongYiServiceImpl`，该类将自动注入`ChatClient`和`StreamingChatClient`，它们负责处理与通义大模型的交互细节。

```java
@Service
public class TongYiChatServiceImpl extends AbstractTongYiServiceImpl {
    // 构造函数注入ChatClient和StreamingChatClient
    public TongYiChatServiceImpl(ChatClient chatClient, StreamingChatClient streamingChatClient) {
        super(chatClient, streamingChatClient);
    }

    // 实现聊天逻辑
    public String chat(String message) {
        Prompt prompt = new Prompt(new UserMessage(message));
        return call(prompt).getResult().getOutput().getContent();
    }
}
```

5. **启动应用**：
   - 最后，确保您的Spring Boot应用入口类（通常包含`@SpringBootApplication`注解）已配置正确，并运行该应用。

```java
@SpringBootApplication
public class YourApplication {
    public static void main(String[] args) {
        SpringApplication.run(YourApplication.class, args);
    }
}
```

通过以上步骤，您就能基于Spring Cloud Alibaba AI和阿里云通义大模型实现聊天功能。应用启动后，即可通过调用服务实现类中的方法与AI进行交互，获得聊天回复。
## <font color="#FF0000">答疑服务说明：</font> 

本内容经由技术专家审阅的用户问答的镜像生成，我们提供了<font color="#FF0000">专家智能答疑服务</font>，在<font color="#FF0000">页面的右下的浮窗”专家答疑“</font>。您也可以访问 : [全局专家答疑](https://opensource.alibaba.com/chatBot) 。 咨询其他产品的的问题

### 反馈
如问答有错漏，欢迎点：[差评](https://ai.nacos.io/user/feedbackByEnhancerGradePOJOID?enhancerGradePOJOId=14618)给我们反馈。
