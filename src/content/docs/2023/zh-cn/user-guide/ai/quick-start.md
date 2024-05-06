---
title: 快速开始
keywords: [Spring Cloud Alibaba,Spring AI,Tongyi Qianwen]
description: "Spring AI 与通义千问集成，使用 Spring AI 开发 Java AI 应用。"
---

Spring AI 是 Spring 官方社区项目，旨在简化 Java AI 应用程序开发，让 Java 开发者像使用 Spring 开发普通应用一样开发 AI 应用。

Spring Cloud Alibaba AI 以 Spring AI 为基础，并在此基础上提供阿里云通义系列大模型全面适配，让用户在 5 分钟内开发基于通义大模型的 Java AI 应用。

## Spring AI 简介
据 Spring AI 官网描述，该项目的灵感来自著名的 Python 项目，如 LangChain 和 LlamaIndex，但 Spring AI 并不是这些项目的直接复制。Spring AI 相信下一波 Generative AI 生成式应用程序将不仅面向 Python 开发人员，而且将在许多编程语言中无处不在。

Spring AI 的核心是提供抽象，作为开发 Java AI 应用程序的基础，提供以下功能：

- 提供多种大模型服务对接能力，包括业界大多数主流大模型服务等；
- 支持灵活的 Prompt Template 和模型输出解析 Output Parsing 能力;
- 支持多模态的生成式 AI 能力，如对话，文生图、文生语音等；
- 提供通用的可移植的 API 以访问各类模型服务和 Embedding 服务，支持同步和流式调用，同时也支持传递特定模型的定制参数；
- 支持 RAG 能力的基础组件，包括 DocumentLoader、TextSpillter、EmobeddingClient、VectorStore 等；
- 支持 AI Spring Boot Starter 实现配置自动装配；
## Spring Cloud Alibaba AI 简介
Spring Cloud Alibaba AI 目前基于 [Spring AI 0.8.1](https://docs.spring.io/spring-ai/reference/0.8-SNAPSHOT/index.html) 版本 API 完成通义系列大模型的接入。通义接入是基于阿里云 [灵积模型服务](https://help.aliyun.com/zh/dashscope/)，灵积模型服务建立在“模型即服务”（Model-as-a-Service，MaaS）的理念基础之上，围绕 AI 各领域模型，通过标准化的API提供包括模型推理、模型微调训练在内的多种模型服务。

在当前最新版本中，Spring Cloud Alibaba AI 主要完成了几种常见生成式模型的适配，包括对话、文生图、文生语音等，开发者可以使用 Spring Cloud Alibaba AI 开发基于通义的聊天、图片或语音生成 AI 应用，框架还提供 OutParser、Prompt Template、Stuff 等实用能力。

以下是当前官方提供的 Spring Cloud Alibaba AI 应用开发示例，可以点击查看：

- [聊天对话应用](https://github.com/alibaba/spring-cloud-alibaba/tree/2023.x/spring-cloud-alibaba-examples/spring-cloud-ai-example/src/main/java/com/alibaba/cloud/ai/example/tongyi/service/impl/helloworld)
- [文生图应用](https://github.com/alibaba/spring-cloud-alibaba/tree/2023.x/spring-cloud-alibaba-examples/spring-cloud-ai-example/src/main/java/com/alibaba/cloud/ai/example/tongyi/service/impl/images)
- [文生语音应用](https://github.com/alibaba/spring-cloud-alibaba/tree/2023.x/spring-cloud-alibaba-examples/spring-cloud-ai-example/src/main/java/com/alibaba/cloud/ai/example/tongyi/service/impl/audio)
- [模型输出解析OutputParser（实现从 String 到自动 POJO 映射）](https://github.com/alibaba/spring-cloud-alibaba/tree/2023.x/spring-cloud-alibaba-examples/spring-cloud-ai-example/src/main/java/com/alibaba/cloud/ai/example/tongyi/service/impl/output)
- [使用 Prompt Template](https://github.com/alibaba/spring-cloud-alibaba/tree/2023.x/spring-cloud-alibaba-examples/spring-cloud-ai-example/src/main/java/com/alibaba/cloud/ai/example/tongyi/service/impl/prompttemplate)
- [让 AI 模型接入外部数据（Prompt Stuff）](https://github.com/alibaba/spring-cloud-alibaba/tree/2023.x/spring-cloud-alibaba-examples/spring-cloud-ai-example/src/main/java/com/alibaba/cloud/ai/example/tongyi/service/impl/stuff)

## 体验第一个Spring AI应用开发

本项目演示如何使用 `spring-cloud-starter-alibaba-ai` 完成一个在线聊天 AI 应用，底层使用通义千问提供的模型服务。可在此查看 [完整示例源码](https://github.com/alibaba/spring-cloud-alibaba/tree/2023.x/spring-cloud-alibaba-examples/spring-cloud-ai-example/src/main/java/com/alibaba/cloud/ai/example/tongyi/service/impl/helloworld)。

### 开发聊天对话应用

1.  在项目 pom.xml 中加入 2023.0.1.0 版本 Spring Cloud Alibaba 依赖：
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


浏览器地址栏输入：`http://localhost:8080/ai/example`

返回如下响应：
```json
{
    "Tell me a joke": "Sure, here's a classic one for you:\n\nWhy was the math book sad?\n\nBecause it had too many problems.\n\nI hope that made you smile! If you're looking for more, just let me know."
}
```


2. **方式二**

进入 `resources/static` 目录下，使用浏览器打开 index.html 文件，输入问题，即可获得输出响应（确保 api-key 有效）：

![spring-ai-example](/img/user/ai/sca-ai-example-front.gif)

### 申请通义API-KEY
为使示例能够正常接入通义大模型，需要在阿里云开通 **DashScope 灵积模型服务**，申请有效的 API-KEY 并更新到应用配置文件。具体操作步骤可参见如下文档：

[https://help.aliyun.com/zh/dashscope/developer-reference/activate-dashscope-and-create-an-api-key](https://help.aliyun.com/zh/dashscope/developer-reference/activate-dashscope-and-create-an-api-key)

## 未来规划
当前版本 Spring Cloud Alibaba AI 主要完成了几种常见生成式模型适配，包括对话、文生图、文生语音等。接下来的版本中，我们将继续完成 VectorStore、Embedding、ETL Pipeline 等更多适配，简化 RAG 等更多 AI 应用开发场景。

![spring-ai-etl-pipeline](/img/user/ai/etl-pipeline.png)
