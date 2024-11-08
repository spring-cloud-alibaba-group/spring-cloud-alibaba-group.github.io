---
id: "question-history-17421"
title: "spring ai alibaba 如何指定使用其他模型？"
date: "2024-10-28"
category: "expertConsultation"
description: "根据提供的我了解的信息，Spring AI Alibaba 支持多种模型的接入，并且可以通过简单的配置更改来切换使用不同的模型。这体现了Spring AI的核心价值：写一次代码，支持所有模型。### 具体步骤如下：1. **确定要使用的模型**：   - 如果您想使用阿里云灵积平台上的其他模型（如通"
tags: ["spring","ai","alibaba","模型","指定","使用","其他"]
keywords: ["spring","ai","alibaba","模型","指定","使用","其他"]
---

## 用户问题 ： 
 spring ai alibaba 如何指定使用其他模型？  

---------------
## 专家官方解答 ：

根据提供的我了解的信息，Spring AI Alibaba 支持多种模型的接入，并且可以通过简单的配置更改来切换使用不同的模型。这体现了Spring AI的核心价值：写一次代码，支持所有模型。

### 具体步骤如下：

1. **确定要使用的模型**：
   - 如果您想使用阿里云灵积平台上的其他模型（如通义、Llama等），首先需要登录[百炼控制台](https://bailian.console.aliyun.com/)。
   - 从左侧菜单选择“模型广场”，找到并点击您想要使用的具体模型。
   - 点击该模型对应的“API调用”按钮，在打开页面中找到并复制模型的英文名称。例如，若英文名为`qwen-max`，则记下此名以备后续配置使用。

2. **修改项目配置文件**：
   - 在您的`application.properties`或`application.yaml`中添加以下配置项，将`<MODEL_NAME>`替换为之前记录下来的模型英文名称。
     ```yaml
     spring:
       ai:
         dashscope:
           model: <MODEL_NAME>
     ```
   - 如果希望直接访问本地部署或其他外部服务（如OpenAI）而非默认的阿里云灵积，则需调整相应部分的配置。比如对于OpenAI：
     ```yaml
     spring:
       ai:
         openai:
           api-key: your_openai_api_key
           base-url: https://api.openai.com/v1/
         dashscope:
           chat:
             enabled: false
           embadding:
             enabled: false
           image:
             enabled: false
     ```

3. **添加必要的依赖**：
   - 根据所选模型类型，可能还需要引入特定的starter依赖。例如，当连接至OpenAI时，应包含如下Maven依赖：
     ```xml
     <dependency>
       <groupId>org.springframework.ai</groupId>
       <artifactId>spring-ai-openai-spring-boot-starter</artifactId>
       <version>最新版本号</version>
     </dependency>
     ```

4. **检查与测试**：
   - 完成上述配置后，请确保应用程序能够正常启动，并通过适当的接口或控制器方法调用指定的新模型进行测试。

### 解释

通过这种方式，Spring AI Alibaba框架允许开发者轻松地在不同的人工智能模型之间切换，只需简单地修改几行配置即可实现模型变更，无需大量重写业务逻辑代码。这不仅提高了开发效率，也使得应用能够更灵活地适应不断发展的AI技术环境。同时，针对特定需求（如私有化部署或特殊API接入），还提供了详细的配置指南和示例代码供参考。


<font color="#949494">---------------</font> 


## 参考链接 ：

* 专家经验：spring ai alibaba 是否支持其他模型比如open ai？ 
 
 * 专家经验：spring ai alibaba 文本生成使用说明 
 
 * 专家经验：sca ai (spring ai alibaba）介绍 


 <font color="#949494">---------------</font> 
 


## <font color="#FF0000">答疑服务说明：</font> 

本内容经由技术专家审阅的用户问答的镜像生成，我们提供了<font color="#FF0000">专家智能答疑服务</font>,使用方法：
用法1： 在<font color="#FF0000">页面的右下的浮窗”专家答疑“</font>。
用法2： 点击[专家答疑页](https://answer.opensource.alibaba.com/docs/intro)（针对部分网站不支持插件嵌入的情况）
### 另：


有其他开源产品的使用问题？[点击访问阿里AI专家答疑服务](https://answer.opensource.alibaba.com/docs/intro)。
### 反馈
如问答有错漏，欢迎点：[差评](https://ai.nacos.io/user/feedbackByEnhancerGradePOJOID?enhancerGradePOJOId=17424)给我们反馈。
