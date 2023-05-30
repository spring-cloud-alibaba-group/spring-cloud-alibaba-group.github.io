# Spring Cloud Alibaba 官网

### 快速开始

1. `npm install`

2. `npm run start`

3. 浏览器输入
```
localhost:3000/
```

### 项目构建

1. `npm run build`

2. `npm run serve`

3. 浏览器输入
```
localhost:3000/
```

## 本地环境准备
Base docusaurus v2.3.1
Node.js version 16.14+

## i18n注意事项
目前，我们使用[docusaurus](https://www.zhihu.com/people/erda-project)' v2.3.1 '， `docusaurus.config.js`中的`defaultLocale`有问题。我们不能部署像“https://my-site”(https://github.com/facebook/docusaurus/discussions/8745)这样的网站。

它将在“v2.4”中得到完美解决，敬请期待。

请注意，如果您在开发模式下使用`npm run start`或`npm run start-en`启动网站，则区域语言转换功能和本地搜索功能将不起作用。请在生产模式下使用“构建并服务”流程运行该程序，以启用语言环境切换功能。

## 如何撰写文档

### 添加一个新文档

1. 在i18n/en-us/docusaurus-plugin-content-docs/current或i18n/zh-cn/docusaurus-plugin-content-docs/current下添加新的.md文件。对应中文文件和英文文件，中英文文件名要一致。
2. 更新sidebar.js，在en-us或zh-cn目录中添加一个新条目。

### 为开发人员添加新的文章

1. 在i18n/en-us/docusaurus-plugin-content-docs/current/developers或i18n/zh-cn/docusaurus-plugin-content-docs/current/developers下添加新的.md文件，文件名应该以_dev.md结尾。注意，后缀_dev是必要的。
2. 更新sidebar.js，在en-us或zh-cn中添加一个新条目。

### 添加一个新博客

1. 在i18n/en-us/docusaurus-plugin-content-blog/current或i18n/zh-cn/docusaurus-plugin-content-blog/current下添加新的.md文件。对应中文文件和英文文件，中英文文件名要一致。
2. 需要 `SEO` 配置。

## SEO

the type is :
```
---
title: title
keywords: [keywords1,keywords2]
description: some description
author: author name
date: 2018-12-29
custom_edit_url: https://github.com/spring-cloud-alibaba-group/spring-cloud-alibaba-group.github.io/blob/main/i18n/en/docusaurus-plugin-content-blog/30-line-wasm.md
---
```
**注意:**
1. “title” 不能包含 “:”
2. `keywords` 必须是 `Array`
3. `custom_edit_url` 是到这个repo中的文档的链接，必需的。

## 注意.md文件
1. 不要使用不正确的html标签，如`<img>， <br>`，替换为`<img /> <br />`；
2. 如果您想显示`<xx>`，请替换为`&lt;xx&gt;`。
