## 贡献文档说明

在向此 Spring Cloud Alibaba 官网文档存储库做出贡献之前。请先阅读此贡献文档，确保文档格式正确，减少重复修改文档格式的次数，减小文档 review 难度。

## 文档编写前必读

在编写文档前需要考虑以下几个问题：
- **功能作用域是什么，就是做到了什么地步？**
- **功能模块用户在使用过程中哪些步骤容易犯错，提前说明指出？**


1. 正式书面文档不要用我们，xxx 等人称：

    ```markdown
    我们使用如下配置

    ~~我们~~使用如下配置
    ```

2. 文档结尾之后需要添加合适的标点符号（注意中英文符号差别 **中 ：，英 :**）：

    ```markdown
    在使用 spring-cloud-starter-nacos-config 模块功能，需要在项目 pom.xml 文件种引入以下配置

    在使用 spring-cloud-starter-nacos-config 模块功能，需要在项目 pom.xml 文件种引入以下配置：
    ```

3. 注意专有名词的书写格式：

    ```markdown
    spring cloud -> Spring Cloud
    feign        -> Feign
    nacos        -> Nacos
    ......

    部分专有名词需要加入空格：
    DestinationRule -> Destination Rule
    ```

    > 1. 英文书写时需要注意单词词性。标题不应使用动词，一般为名词！
    > 2. 专有名词模糊时，使用搜索引擎检索，确保正确性！

4. 模块标题英文注意首字母大写

    ```markdown
    ~~routing example~~

    Routing Example
    ```

5. 不同的内容需要给定对应的代码块类型：

    ```java
    public static void main(String[] args) {

        System.out.println("test")；

    }
    ```

    ```markdown
    public static void main(String[] args) {

        System.out.println("test")；

    }
    ```

6. 缩略词在使用前需要先声明（社区外部同学可能不清楚缩写含义）：

    ```markdown
    说明通过了~~SCA~~的鉴权。

    提前声明为：Spring Cloud Alibaba （下文简称为 SCA）
    ```

7. 关键内容，比如特定配置文件、依赖名称需要使用阴影标记：

    需要引入 spring-cloud-starter-stream-rocketmq 模块依赖

    需要引入 `spring-cloud-starter-stream-rocketmq` 模块依赖

8. 英文和中文之间空一个空格，确保可读性：

    ```markdown 
    环境~~上Nacos需~~要添加对~~应dataId的~~基础配置

    环境上 Nacos 需要添加对应 dataId 的基础配置
    ```

9. **写完文档之后，自己至少读一遍，否则大概率有问题！否则大概率有问题！否则大概率有问题！**

## 项目运行测试

### 本地运行测试

- 在编写完成中文文档时，运行 `npm run start` 命令，在本地浏览器查看显示效果。
- 在编写完成英文文档时，运行 `npm run start-en` 命令，在本地浏览器查看显示效果。

### 本地部署测试

- 在编写完成文档之后，运行 `npm run build` 构建项目，之后运行 `npm run server` 本地部署项目，在本地浏览器查看效果，确保项目构建部署成功。
