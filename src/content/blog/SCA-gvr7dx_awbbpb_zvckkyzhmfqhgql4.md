---
title: "使用通义千问定制自己的代码助手"
description: "使用通义千问定制自己的代码助手"
date: "2024-10-10"
category: "case"
keywords: ["SCA"]
authors: "CH3CHO"
---

> 作者：伯箫，计划定制一个代码助手，结合通义千问和RAG技术，根据数据库Schema信息生成符合个人代码风格的数据访问层代码，旨在提高生成代码的质量和效率，且该助手在不断迭代中已结合FunctionCalling和RAG，展现出大模型在编程辅助上的巨大潜力。
>

# <font style="color:rgb(34, 35, 40);">背景</font>
<font style="color:rgb(37, 39, 42);">在过去一年中，我使用了Idealab、通义灵码和Aone Copilot等工具，大幅提升了代码编写效率。这些工具在代码补全、单方法编写和代码审查方面表现出色。然而，我希望能够一次性生成更多的代码，如CRUD操作，而不仅仅是进行小幅补全。</font>

<font style="color:rgb(37, 39, 42);">现有的代码生成器虽然能实现一次性生成CRUD代码，但其生成的代码风格与我的项目不一致，需要手动修改。</font>

<font style="color:rgb(37, 39, 42);">因此，我计划基于大模型定制一个代码助手，能够根据数据库表的Schema信息一次性生成符合我代码风格的数据访问层代码。</font>

# **<font style="color:rgb(34, 35, 40);">实现思路</font>**
<font style="color:rgb(37, 39, 42);">当一个数据库表创建完成后，通义灵码或Aone Copilot无法直接生成与之相关的数据访问层代码，原因在于它们无法获取表的字段信息，也不能直接连接数据库读取Schema。即使将建表语句提供给它们，生成的代码风格往往与现有项目不一致。</font>

<font style="color:rgb(37, 39, 42);">我一般会把建表语句贴出来，放到代码文件中，然后通义灵码就可以根据建表语句去实时生成相关的代码，一点一点补全。</font>

![](https://intranetproxy.alipay.com/skylark/lark/0/2024/webp/299576/1728376174568-383cbb58-1a43-4022-b0ed-d11874f83c8f.webp)

<font style="color:rgb(37, 39, 42);">问题清楚了，我们接下来就通过大模型一步步自己定制一个解决这个问题的工具。</font>

## **<font style="color:rgb(34, 35, 40);">模型与调用框架</font>**
<font style="color:rgb(37, 39, 42);">大模型发展到今天，其在生成代码方面的能力已经相当强大，几个主流的大模型满足我们基本的需要应该都没有问题。为了快速实现原型，我直接选择了通义千问(QWen)，大模型服务平台百炼提供的Java SDK是 </font>[<font style="color:rgb(37, 39, 42);">DashScope</font>](https://help.aliyun.com/zh/model-studio/developer-reference/install-sdk?spm=a2c4g.11186623.0.0.42aa6132K07RqD#f3e80b21069aa)<font style="color:rgb(37, 39, 42);">。但是DashScope并不能在其他大模型平台通用，如果QWen的效果不好，切换其他大模型的时候客户端的代码还需要重写，于是我找到了</font>[<font style="color:rgb(37, 39, 42);">Spring AI</font>](https://spring.io/projects/spring-ai)<font style="color:rgb(37, 39, 42);">，Spring AI支持很多的模型提供商，如 OpenAI、Microsoft、Amazon、Google 和 Huggingface，他不支持QWen，但是QWen 有自己的</font>[<font style="color:rgb(37, 39, 42);">Spring AI Alibaba</font>](https://sca.aliyun.com/ai/)<font style="color:rgb(37, 39, 42);">，Spring AI Alibaba 开源项目基于 Spring AI 构建。</font>

<font style="color:rgb(37, 39, 42);">最新开源的版本是1.0.0-M2，注意这个包还没有发布到中央仓，需要配置下repo地址，参考</font>[<font style="color:rgb(37, 39, 42);">Git说明</font>](https://github.com/alibaba/spring-ai-alibaba)<font style="color:rgb(37, 39, 42);">。</font>

<font style="background-color:rgb(250, 251, 254);">复制代码</font>

<font style="color:rgb(153, 153, 153);">⌄</font>

<font style="color:rgba(17, 31, 44, 0.56);"><</font><font style="color:rgb(0, 136, 85);">dependency</font><font style="color:rgba(17, 31, 44, 0.56);">></font>

<font style="color:rgba(17, 31, 44, 0.56);"> <</font><font style="color:rgb(0, 136, 85);">groupId</font><font style="color:rgba(17, 31, 44, 0.56);">>com.alibaba.cloud.ai</</font><font style="color:rgb(0, 136, 85);">groupId</font><font style="color:rgba(17, 31, 44, 0.56);">></font>

<font style="color:rgba(17, 31, 44, 0.56);"> <</font><font style="color:rgb(0, 136, 85);">artifactId</font><font style="color:rgba(17, 31, 44, 0.56);">>spring-ai-alibaba-starter</</font><font style="color:rgb(0, 136, 85);">artifactId</font><font style="color:rgba(17, 31, 44, 0.56);">></font>

<font style="color:rgba(17, 31, 44, 0.56);"> <</font><font style="color:rgb(0, 136, 85);">version</font><font style="color:rgba(17, 31, 44, 0.56);">>1.0.0-M2</</font><font style="color:rgb(0, 136, 85);">version</font><font style="color:rgba(17, 31, 44, 0.56);">></font>

<font style="color:rgba(17, 31, 44, 0.56);"></</font><font style="color:rgb(0, 136, 85);">dependency</font><font style="color:rgba(17, 31, 44, 0.56);">></font>

## **<font style="color:rgb(34, 35, 40);">通过Function Calling提取数据库Schema信息</font>**
<font style="color:rgb(37, 39, 42);">Function Calling 这一技术让开发者能够定义函数（也被称为工具（tools）），在</font>[<font style="color:rgb(37, 39, 42);">百炼平台的文档</font>](https://help.aliyun.com/zh/model-studio/developer-reference/use-qwen-by-calling-api)<font style="color:rgb(37, 39, 42);">中就叫做tools。</font>

<font style="color:rgb(37, 39, 42);">大语言模型在处理任务时，可以通过 Function Calling 判断是否需要引入外部工具以解决当前任务，有了这个能力，我们就可以定制访问数据库的插件。</font>

![](https://intranetproxy.alipay.com/skylark/lark/0/2024/webp/299576/1728376174666-82facdbc-6f37-4bb8-9c36-ce0fcffdc120.webp)

<font style="color:rgb(37, 39, 42);">原理看着复杂，总结起来也比较简单，Function Calling帮我们做了两件事情：</font>

<font style="color:rgb(37, 39, 42);">1、判断是否要调用某个预定义的函数。</font>

<font style="color:rgb(37, 39, 42);">2、如果要调用，从用户输入的文本里提取出函数所需要的函数值。</font>

<font style="color:rgb(37, 39, 42);">例如，当用户输入“请帮我给user_info这张表生成代码”时，系统会调用GetTableSchema函数，并提取“user_info”作为参数。</font>

![](https://intranetproxy.alipay.com/skylark/lark/0/2024/webp/299576/1728376174573-bbcdf97a-2273-430c-b313-3c07011161f8.webp)

![](https://intranetproxy.alipay.com/skylark/lark/0/2024/webp/299576/1728376174552-e7e97ee5-956f-4637-86de-d2406fad06eb.webp)

<font style="color:rgb(37, 39, 42);">然后，只需要简单的一行注册代码就行，其中最关键的就是第二个参数description。他描述了这个函数的功能，大模型会自己判断什么时候去调用它。</font>

![](https://intranetproxy.alipay.com/skylark/lark/0/2024/webp/299576/1728376174541-870ad6f6-b83c-428b-9d09-01b6cb872564.webp)

<font style="color:rgb(37, 39, 42);">有了GetTableSchema的自定义函数还不够，大模型不知道你需要生成的代是什么风格，接下来就需要用到RAG。</font>

## **<font style="color:rgb(34, 35, 40);">通过RAG生成你想要的代码风格</font>**
<font style="color:rgb(37, 39, 42);">通用的大模型，就好比是一位知识广阔的学者，但是他没有读过我们的项目代码，所以不知道要为我们生成的代码是什么风格。我们可以通过RAG(Retrieval-Augmented Generation)技术，把我们已有代码库的代码给他看一眼。这点代码对他来说信息量很少，即学即会。</font>

<font style="color:rgb(37, 39, 42);">从原理上说，生成式的语言模型，在回答问题的时候，他在不断的做文字接龙，在预测下一个“文字”。根据什么预测呢？根据训练这个语言模型时候所用的语料。通过RAG我们增强了调用大模型时候的上下文，给了他更多的相关信息，所以他能生成和我们代码风格相似的代码。有兴趣可以看这一篇《</font>[<font style="color:rgb(37, 39, 42);">从0到精通，读懂这一篇就够了，RAG：检索增强的前世今生</font>](https://mp.weixin.qq.com/s/jlYrPRRw8kAeBLTEVFoBTg?spm=ata.21736010.0.0.21437aadrawHSE)<font style="color:rgb(37, 39, 42);">》。</font>

![](https://intranetproxy.alipay.com/skylark/lark/0/2024/webp/299576/1728376175713-37c09b39-9d8c-4971-b1a4-6ae1e771cd84.webp)

<font style="color:rgb(37, 39, 42);">对照上图，我们先来看一下，一个RAG过程：</font>

<font style="color:rgb(37, 39, 42);">1、用户发起一个问题。</font>

<font style="color:rgb(37, 39, 42);">2、客户端将用户的问题到私域知识库中(一般是一个向量数据库)进行检索。</font>

<font style="color:rgb(37, 39, 42);">3、从私域知识库中检索得到相关的信息，得到一个增强版的、携带相关信息问题。</font>

<font style="color:rgb(37, 39, 42);">4、将检索到的增强版本的内容进行封装(可以封装成一个Prompt)。</font>

<font style="color:rgb(37, 39, 42);">5、使用增强的Prompt调用大模型，得到答案。</font>

<font style="color:rgb(37, 39, 42);">回到我们的问题，我们的知识量很少，只有一个代码库中的数据访问层代码，所以不需要去检索。可以省去第2步，直接从代码库中给几个数据访问类给到大模型即可。</font>

<font style="color:rgb(37, 39, 42);">如果想要扩展一下，想让大模型帮忙生成更高层的业务代码，也可以建立一个当前代码库的向量数据库。</font>

![](https://intranetproxy.alipay.com/skylark/lark/0/2024/webp/299576/1728376175751-8393805b-50cb-402b-8ecd-c0f872566d80.webp)

<font style="color:rgb(37, 39, 42);">这块代码偷懒了，Step1中本可以做成自动读取配置文件中的代码路径，为了省事，我把相关代码Copy了一份到项目中。</font>

<font style="color:rgb(37, 39, 42);">他们的对应关系如下:</font>

| <font style="color:rgb(37, 39, 42);">modelResorce</font> | <font style="color:rgb(37, 39, 42);">数据访问层的数据实体类</font> |
| :--- | :--- |
| <font style="color:rgb(37, 39, 42);">requestResource</font> | <font style="color:rgb(37, 39, 42);">数据访问层中查询方法的request入参类</font> |
| <font style="color:rgb(37, 39, 42);">repositoryResource</font> | <font style="color:rgb(37, 39, 42);">数据访问类Repository</font> |


<font style="color:rgb(37, 39, 42);">在Step2中，我使用Step1构建的Documents生成了新的systemMessage，这个systemMessage实际上还包含了一个Prompt优化的过程。</font>

## **<font style="color:rgb(34, 35, 40);">Prompt优化</font>**
<font style="color:rgb(37, 39, 42);">Prompt 是引导 AI 模型生成特定输出的输入格式，Prompt 的设计和措辞会显著影响模型的响应。Prompt 最开始只是简单的字符串，随着时间的推移，Prompt 逐渐开始包含特定的占位符，例如 AI 模型可以识别的 “USER:”、“SYSTEM:” 等，详细的介绍可以参考Spring AI Alibaba文档</font>[<font style="color:rgb(37, 39, 42);">关于Prompt的介绍</font>](https://sca.aliyun.com/ai/tutorials/prompt/?spm=0.29160081.0.0.f3f87021SpS1Gj)<font style="color:rgb(37, 39, 42);">。</font>

<font style="color:rgb(37, 39, 42);">我们现在需要把用户的原始问题和特定的知识相结合，变成新的Prompt，最终他长这样：</font>

![](https://intranetproxy.alipay.com/skylark/lark/0/2024/webp/299576/1728376175753-e5e48ff9-1955-4fd1-89fd-368b3d7dd767.webp)

<font style="color:rgb(37, 39, 42);">将我们上面得到的知识填充到里面即可。</font>

![](https://intranetproxy.alipay.com/skylark/lark/0/2024/webp/299576/1728376175758-caae1ede-7c0c-421c-b2f5-bfd5aa6b8f99.webp)

# **<font style="color:rgb(34, 35, 40);">实现效果</font>**
<font style="color:rgb(37, 39, 42);">问题1：请根据num_user_operation表生成代码</font>

![](https://intranetproxy.alipay.com/skylark/lark/0/2024/webp/299576/1728376175830-54037c50-3e8a-4932-a5e3-3de51e78d73f.webp)

<font style="color:rgb(37, 39, 42);">问题2：请帮我在这个代码的基础上生成一个update方法</font>

![](https://intranetproxy.alipay.com/skylark/lark/0/2024/webp/299576/1728376176067-3fe60194-dcbd-4959-9b6b-7da95323a5e2.webp)

# **<font style="color:rgb(34, 35, 40);">总结</font>**
<font style="color:rgb(37, 39, 42);">其实这小助手做了三个版本，第一个是纯粹使用Function Calling做的，里面生成代码的逻辑不是通过大模型实时生成的，而是拿到schema信息后循环拼凑起来的，大模型在里面的作用就是增加注释，然后结合对话记忆功能，在多次对话中可以进行代码的优化。</font>

<font style="color:rgb(37, 39, 42);">第二个版本是基于RAG的版本，但是没有用到Function Calling，这也出现了一个问题。先去数据库中查出Schema，然后再调用大模型接口，问题就是用户的输入是一句话，不好从中提取问题中的数据库表名。</font>

<font style="color:rgb(37, 39, 42);">最后这个版本把Function Calling 和RAG相结合，算是完成了这个小助手。</font>

<font style="color:rgb(37, 39, 42);">接下来也可以做一些扩展，例如让给小助手一个DB，生成整个DB下所有表的数据访问层代码。也可以做成插件集成到IDEAs等等。</font>

<font style="color:rgb(37, 39, 42);">实践下来，主要的感受就是大模型太强大，很多事情基于大模型都有可能实现质的飞跃，我们都需要不断学习跟上时代的步伐。</font>


