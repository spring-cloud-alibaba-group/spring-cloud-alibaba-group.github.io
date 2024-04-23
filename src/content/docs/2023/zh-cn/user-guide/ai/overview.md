---
title: AI 概述
keywords: [Spring Cloud Alibaba,Spring AI,Tongyi Qianwen]
description: "Spring AI 与通义千问集成，使用 Spring AI 开发 Java AI 应用。"
---

## 1. 概览
Spring 框架通过 Spring AI 项目正式发布了对生成式 AI 应用开发的支持。 Spring Cloud Alibaba 当前基于 Spring AI 提供了对阿里通义系列的完整支持，包括对话、prompt模板、Function Call、文生图、向量数据库等本。

## 2. Spring AI 核心概念

在开始之前，我们先回顾一下一些关键领域术语和概念。
Spring AI 最初专注于设计用于处理语言输入和生成语言输出的模型。 该项目背后的想法是为开发人员提供一个抽象接口，这是将生成式 AI API 作为独立组件添加到应用程序中的基础。
其中一种抽象是接口 AiClient，它有两个基本实现 - OpenAI 和 Azure OpenAI。而 Spring Cloud Alibaba AI 提供了对通义系列的全面支持。

```
public interface AiClient {
    default String generate(String message);
    AiResponse generate(Prompt prompt);
}
```

AiClient为生成功能提供了两种选择。 简化的 -generate(String message) -使用 String 作为输入和输出，它可以用来避免 Promt 和 AiResponse 类的额外复杂性。
现在，让我们仔细看看它们的区别。

### 2.1. 高级特性 _Prompt_ 和 _AiResponse_

在AI领域，提示是指提供给AI的短信。 它由上下文和问题组成，该模型用于生成答案。
从 Spring AI 项目的角度来看，Prompt 是参数化_Message_s 的列表。

```
public class Prompt {
    private final List<Message> messages;
    // constructors and utility methods
}

public interface Message {
    String getContent();
    Map<String, Object> getProperties();
    MessageType getMessageType();
}
```

提示使开发人员能够更好地控制文本输入。 一个很好的例子是提示模板，它由预定义的文本和一组占位符构成。 然后，我们可以使用传递给 Message 构造函数的 Map<String, Object> 值来填充它们。

Tell me a {adjective} joke about {content}.

消息接口还保存有关 AI 模型可以处理的消息类别的高级信息。 例如，OpenAI 实现区分对话角色，并通过 MessageType 有效映射。 对于其他模型，它可以反映消息格式或一些其他自定义属性。 更多详情请参考官方文档。

```
public class AiResponse {
    private final List<Generation> generations;
    // getters and setters
}

public class Generation {
    private final String text;
    private Map<String, Object> info;
}
```

AiResponse 由 Generation 对象列表组成，每个对象都保存相应提示的输出。 此外，Generation对象提供AI响应的元数据信息。



关于 Spring Cloud Alibaba AI 的具体用法，请参考 [官方源码示例](https://github.com/alibaba/spring-cloud-alibaba/tree/2023.x/spring-cloud-alibaba-examples/spring-cloud-ai-example)。

