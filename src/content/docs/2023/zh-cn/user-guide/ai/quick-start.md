---
title: 快速开始
keywords: [Spring Cloud Alibaba,Spring AI,Tongyi Qianwen]
description: "Spring AI 与通义千问集成，使用 Spring AI 开发 Java AI 应用。"
---

Spring Cloud Alibaba AI 模块基于 [Spring AI 0.8.1](https://docs.spring.io/spring-ai/reference/0.8-SNAPSHOT/index.html) 项目 API 完成通义系列大模型的接入。本项目演示如何使用 `spring-cloud-starter-alibaba-ai` 完成 Spring Cloud 微服务应用与通义系列模型的整合。

[模型服务灵积](https://help.aliyun.com/zh/dashscope/) 是阿里巴巴推出的一个大模型应用服务。灵积模型服务建立在“模型即服务”（Model-as-a-Service，MaaS）的理念基础之上，围绕AI各领域模型，通过标准化的API提供包括模型推理、模型微调训练在内的多种模型服务。

## 使用示例
目前已经完成对 Spring AI 多种模型的适配，以下是一些具体的示例，您可以使用浏览器或者 curl 工具对接口进行请求，完成对应功能接入的练习：
* [helloworld](https://github.com/alibaba/spring-cloud-alibaba/tree/2023.x/spring-cloud-alibaba-examples/spring-cloud-ai-example/src/main/java/com/alibaba/cloud/ai/example/tongyi/service/impl/helloworld)
* [text-to-image](https://github.com/alibaba/spring-cloud-alibaba/tree/2023.x/spring-cloud-alibaba-examples/spring-cloud-ai-example/src/main/java/com/alibaba/cloud/ai/example/tongyi/service/impl/images)
* [text-to-audio](https://github.com/alibaba/spring-cloud-alibaba/tree/2023.x/spring-cloud-alibaba-examples/spring-cloud-ai-example/src/main/java/com/alibaba/cloud/ai/example/tongyi/service/impl/audio)
* [OutputParser](https://github.com/alibaba/spring-cloud-alibaba/tree/2023.x/spring-cloud-alibaba-examples/spring-cloud-ai-example/src/main/java/com/alibaba/cloud/ai/example/tongyi/service/impl/output)
* [Prompt Template](https://github.com/alibaba/spring-cloud-alibaba/tree/2023.x/spring-cloud-alibaba-examples/spring-cloud-ai-example/src/main/java/com/alibaba/cloud/ai/example/tongyi/service/impl/prompttemplate)
* [Roles](https://github.com/alibaba/spring-cloud-alibaba/tree/2023.x/spring-cloud-alibaba-examples/spring-cloud-ai-example/src/main/java/com/alibaba/cloud/ai/example/tongyi/service/impl/roles)
* [Stuff](https://github.com/alibaba/spring-cloud-alibaba/tree/2023.x/spring-cloud-alibaba-examples/spring-cloud-ai-example/src/main/java/com/alibaba/cloud/ai/example/tongyi/service/impl/stuff)

## 应用接入说明

### 接入 `spring-cloud-starter-alibaba-ai`


2.  在 `application.yml` 配置文件中加入以下配置：
```yaml
spring:
  cloud:
    ai:
      tongyi:
        chat:
          options:
            # Replace the following key with a valid API-KEY.
            api-key: sk-a3d73b1709bf4a178c28ed7c8b3b5axx
```


3.  编写聊天服务实现类，由 Spring AI 自动注入 `ChatClient`、`StreamingChatClient`，`ChatClient` 屏蔽底层通义大模型交互细节。
```java
@Service
public class TongYiSimpleServiceImpl extends AbstractTongYiServiceImpl {

	private final ChatClient chatClient;

	private final StreamingChatClient streamingChatClient;

	@Autowired
	public TongYiSimpleServiceImpl(ChatClient chatClient, StreamingChatClient streamingChatClient) {
		this.chatClient = chatClient;
		this.streamingChatClient = streamingChatClient;
	}
}
```

4. 提供具体聊天逻辑实现
```java
@Service
public class TongYiSimpleServiceImpl extends AbstractTongYiServiceImpl {

	// ......

	@Override
	public String completion(String message) {

		Prompt prompt = new Prompt(new UserMessage(message));

		return chatClient.call(prompt).getResult().getOutput().getContent();
	}

	@Override
	public Map<String, String> streamCompletion(String message) {

		StringBuilder fullContent = new StringBuilder();

		streamingChatClient.stream(new Prompt(message))
				.flatMap(chatResponse -> Flux.fromIterable(chatResponse.getResults()))
				.map(content -> content.getOutput().getContent())
				.doOnNext(fullContent::append)
				.last()
				.map(lastContent -> Map.of(message, fullContent.toString()))
				.block();

		log.info(fullContent.toString());

		return Map.of(message, fullContent.toString());
	}

}
```

5. 编写 Spring 入口类并启动应用
```java
@SpringBootApplication
public class TongYiApplication {
	public static void main(String[] args) {
		SpringApplication.run(TongYiApplication.class);
	}
}
```

至此，便完成了最简单的聊天 AI 应用开发，与普通的 Spring Boot 应用开发步骤完全一致！
### 验证应用效果
启动应用后，可通过如下两种方式验证应用效果。

1. **方式一**

### 验证

浏览器地址栏输入：`http://localhost:8080/ai/example`

返回如下响应：
```json
{
    "Tell me a joke": "Sure, here's a classic one for you:\n\nWhy was the math book sad?\n\nBecause it had too many problems.\n\nI hope that made you smile! If you're looking for more, just let me know."
}
```

### 简易前端验证

2. **方式二**

### 配置项说明

更多配置项参考：

![spring-ai-example](/img/user/ai/sca-ai-example-front.gif)


![spring-ai-etl-pipeline](/img/user/ai/etl-pipeline.png)
