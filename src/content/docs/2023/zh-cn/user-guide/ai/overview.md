---
title: AI 概述
keywords: [Spring Cloud Alibaba,Spring AI,Tongyi Qianwen]
description: "Spring AI 与通义千问集成，使用 Spring AI 开发 Java AI 应用。"
---

## 1. 概览
Spring 框架通过 Spring AI 项目正式发布了对生成式 AI 应用开发的支持。 Spring Cloud Alibaba 当前基于 Spring AI 提供了对阿里通义系列的完整支持，包括对话、prompt模板、Function Call、文生图、向量数据库等本。文旨在对 Spring Boot 应用程序中的生成式 AI 集成进行深入介绍。

此外，我们还将了解 Spring AI 如何与模型交互，并创建一个应用程序来展示其功能。

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
然而，虽然 Spring AI 项目仍处于测试阶段，但并非所有功能都已完成并记录在案。

## 3. Spring AI 快速开始

首先，AiClient 需要 API 密钥才能与 OpenAI 平台进行所有通信。 为此，我们将在 API 密钥页面上创建一个令牌。
Spring AI项目定义了配置属性：spring.ai.openai.api-key。 我们可以在application.yml文件中进行设置。

```
spring:
  ai:
    openai.api-key: ${OPEN_AI_KEY}
```

下一步是配置依赖项存储库。 Spring AI 项目在 Spring Milestone Repository 中提供工件。
因此，我们需要添加存储库定义：

```
<repositories>
    <repository>
        <id>spring-snapshots</id>
        <name>Spring Snapshots</name>
        <url>https://repo.spring.io/snapshot</url>
        <releases>
            <enabled>false</enabled>
        </releases>
    </repository>
</repositories>
```

之后，我们准备导入 open-ai-spring-boot-starter：

```
<dependency>
    <groupId>org.springframework.experimental.ai</groupId>
    <artifactId>spring-ai-openai-spring-boot-starter</artifactId>
    <version>0.7.1-SNAPSHOT</version>
</dependency>
```

请记住，Spring AI 项目正在积极发展，因此请查看官方 GitHub 页面以获取最新版本
就这样！ 现在，让我们将这个概念付诸实践。
## 4. Spring AI 实践
现在，我们将编写一个简单的 REST API 来进行演示。 它将由两个端点组成，返回我们想要的任何主题和流派的诗歌：

- /ai/cathaiku — 将实现基本的generate() 方法并返回一个带有关于猫的俳句的纯字符串值；
- /ai/poetry?theme={{theme}}&genre={{genre}} — 将演示 PromtTemplate 和 AiResponse 类的功能；

### 4.1. 自动注入 _AiClient_

为了简单起见，我们从 cat haiku 端点开始。 使用 @RestController 注解，我们将设置 PoetryController 并添加 GET 方法映射：

```
@RestController
@RequestMapping("ai")
public class PoetryController {
    private final PoetryService poetryService;

    // constructor

    @GetMapping("/cathaiku")
    public ResponseEntity<String> generateHaiku(){
        return ResponseEntity.ok(poetryService.getCatHaiku());
    }
}
```

接下来，遵循 DDD 概念，服务层将定义所有领域逻辑。 调用generate()方法所需要做的就是将AiClient注入到PoetryService中。 现在，我们可以定义字符串提示，在其中指定生成俳句的请求。

```
@Service
public class PoetryServiceImpl implements PoetryService {
    public static final String WRITE_ME_HAIKU_ABOUT_CAT = """
        Write me Haiku about cat,
        haiku should start with the word cat obligatory""";

    private final AiClient aiClient;

    // constructor

    @Override
    public String getCatHaiku() {
        return aiClient.generate(WRITE_ME_HAIKU_ABOUT_CAT);
    }
}
```

端点已启动并准备好接收请求。 响应将包含一个纯字符串：

```
Cat prowls in the night,
Whiskers twitch with keen delight,
Silent hunter's might.
```

到目前为止看起来还不错； 然而，当前的解决方案存在一些缺陷。 首先，纯字符串的响应并不是 REST 合约的最佳解决方案。
此外，始终使用相同的旧提示查询 ChatGPT 并没有多大价值。 因此，我们的下一步是添加参数化值：主题和流派。 这时候 PromtTemplate 就能为我们提供最好的服务！

### 4.2. 使用 _PromptTemplate _配置_ Queries_
从本质上讲，PromptTemplate 的工作方式与 StringBuilder 和字典的组合非常相似。 与 /cathaiku 端点类似，我们首先定义提示的基本字符串。 此外，这一次，我们将通过名称定义用实际值填充的占位符：

```
String promptString = """
    Write me {genre} poetry about {theme}
    """;
PromptTemplate promptTemplate = new PromptTemplate(promptString);
promptTemplate.add("genre", genre);
promptTemplate.add("theme", theme);
```

接下来，我们可能想做的是标准化端点输出。 为此，我们将引入简单的记录类 - PoetryDto，它将包含诗歌标题、名称和流派：
公共记录 PoetryDto（字符串标题、字符串诗歌、字符串流派、字符串主题）{}复制
进一步的步骤是在 BeanOutputParser 类中注册 PoetryDto； 它提供序列化和反序列化 OpenAI API 输出的功能。
然后，我们将这个解析器提供给 promtTemple，从现在开始，我们的消息将被序列化到 DTO 对象中。
最后，我们的生成函数将如下所示：

```
@Override
public PoetryDto getPoetryByGenreAndTheme(String genre, String theme) {
    BeanOutputParser<PoetryDto> poetryDtoBeanOutputParser = new BeanOutputParser<>(PoetryDto.class);

    String promptString = """
        Write me {genre} poetry about {theme}
        {format}
    """;

    PromptTemplate promptTemplate = new PromptTemplate(promptString);
    promptTemplate.add("genre", genre);
    promptTemplate.add("theme", theme);
    promptTemplate.add("format", poetryDtoBeanOutputParser.getFormat());
    promptTemplate.setOutputParser(poetryDtoBeanOutputParser);

    AiResponse response = aiClient.generate(promptTemplate.create());

    return poetryDtoBeanOutputParser.parse(response.getGeneration().getText());
}
```

我们的客户现在收到的响应看起来好多了，更重要的是，它符合 REST API 标准和最佳实践：

```
{
    "title": "Dancing Flames",
    "poetry": "In the depths of night, flames dance with grace,
       Their golden tongues lick the air with fiery embrace.
       A symphony of warmth, a mesmerizing sight,
       In their flickering glow, shadows take flight.
       Oh, flames so vibrant, so full of life,
       Burning with passion, banishing all strife.
       They consume with ardor, yet do not destroy,
       A paradox of power, a delicate ploy.
       They whisper secrets, untold and untamed,
       Their radiant hues, a kaleidoscope unnamed.
       In their gentle crackling, stories unfold,
       Of ancient tales and legends untold.
       Flames ignite the heart, awakening desire,
       They fuel the soul, setting it on fire.
       With every flicker, they kindle a spark,
       Guiding us through the darkness, lighting up the dark.
       So let us gather 'round, bask in their warm embrace,
       For in the realm of flames, magic finds its place.
       In their ethereal dance, we find solace and release,
       And in their eternal glow, our spirits find peace.",
    "genre": "Liric",
    "theme": "Flames"
}
```

## 5. Error Handling

Spring AI 项目通过 OpenAiHttpException 类提供了对 OpenAPI 错误的抽象。 不幸的是，它不提供每个错误类型的类的单独映射。 然而，由于这种抽象，我们可以在一个处理程序中使用 RestControllerAdvice 处理所有异常。
下面的代码使用 Spring 6 框架的 ProblemDetail 标准。 如果您不熟悉，请查看官方文档。

```
@RestControllerAdvice
public class ExceptionTranslator extends ResponseEntityExceptionHandler {
    public static final String OPEN_AI_CLIENT_RAISED_EXCEPTION = "Open AI client raised exception";

    @ExceptionHandler(OpenAiHttpException.class)
    ProblemDetail handleOpenAiHttpException(OpenAiHttpException ex) {
        HttpStatus status = Optional
          .ofNullable(HttpStatus.resolve(ex.statusCode))
          .orElse(HttpStatus.BAD_REQUEST);
        ProblemDetail problemDetail = ProblemDetail.forStatusAndDetail(status, ex.getMessage());
        problemDetail.setTitle(OPEN_AI_CLIENT_RAISED_EXCEPTION);
        return problemDetail;
    }
}Copy
```

现在，如果 OpenAPI 响应包含错误，我们将对其进行处理。 以下是响应的示例：

```
{
    "type": "about:blank",
    "title": "Open AI client raised exception",
    "status": 401,
    "detail": "Incorrect API key provided: sk-XG6GW***************************************wlmi.
       You can find your API key at https://platform.openai.com/account/api-keys.",
    "instance": "/ai/cathaiku"
}Copy
```

可能的异常状态的完整列表位于官方文档页面上。

## 6. Conclusion

在本文中，我们熟悉了 Spring AI 项目及其在 REST API 背景下的功能。 尽管在撰写本文时，spring-ai-starter 仍在积极开发中，并且可以在快照版本中访问。 它为将生成式 AI 集成到 Spring Boot 应用程序中提供了可靠的接口。
在本文中，我们介绍了与 Spring AI 的基本和高级集成，包括 AiClient 在幕后的工作方式。 作为概念证明，我们实现了一个生成诗歌的基本 REST 应用程序。 除了生成端点的基本示例之外，我们还提供了使用高级 Spring AI 功能的示例：PromtTemplate、AiResponse 和 BeanOutputParser。 此外，我们还实现了错误处理功能。

关于 Spring Cloud Alibaba AI 的具体用法，请参考 [官方源码示例](https://github.com/alibaba/spring-cloud-alibaba/tree/2023.x/spring-cloud-alibaba-examples/spring-cloud-ai-example)。

