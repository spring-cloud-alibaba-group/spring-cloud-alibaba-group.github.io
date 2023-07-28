# Spring Cloud Alibaba 官网

## 本地环境构建项目
### 环境准备
> 如果不想在本地安装依赖组件，可参考下文 [Docker 环境运行方式](#docker-方式运行)。
项目源码基于 docusaurus v2.3.1 构建，因此要编译运行本项目需确保安装 Node.js 等基础环境。

* Node.js version 16.14+

### 快速启动

1. `npm install`

2. `npm run start`

3. 浏览器输入

```shell
localhost:3000/
```

### 构建并以服务启动

1. `npm run build`

2. `npm run serve`

3. 浏览器输入
```shell
localhost:3000/
```

## Docker 方式运行
无需在本地机器安装任何组件

### 本地开发
1. 构建镜像
```shell
docker build --target development -t docs:dev .
```

2. 运行容器
```shell
docker run -p 3000:3000 docs:dev
```

### 生产部署
1. 构建镜像
```shell
docker build -t sca-site:latest .
```

2. 运行容器
```shell
docker run --rm -p 3000:80 sca-site:latest
```

## i18n注意事项

请注意，如果您在开发模式下使用 `npm run start` 或 `npm run start-en` 启动网站，则区域语言转换功能和本地搜索功能将不起作用。请在生产模式下使用“构建并以服务启动”流程运行该程序，以启用语言环境切换和站内搜索功能。

## 如何撰写文档

### 添加一个新文档

1. 在 i18n/en-us/docusaurus-plugin-content-docs/current或i18n/zh-cn/docusaurus-plugin-content-docs/current 下添加新的 .md 文件。对应中文文件和英文文件，中英文文件名要一致。
2. 更新 sidebar.js，在 en-us 或 zh-cn 目录中添加一个新条目。

### 为开发人员添加新的文章

1. 在 i18n/en-us/docusaurus-plugin-content-docs/current/developers或i18n/zh-cn/docusaurus-plugin-content-docs/current/developers 下添加新的 .md 文件，文件名应该以 _dev.md 结尾。注意，后缀 _dev 是必要的。
2. 更新 sidebar.js，在 en-us 或 zh-cn 中添加一个新条目。

### 添加一个新博客

1. 在 i18n/en-us/docusaurus-plugin-content-blog/current或i18n/zh-cn/docusaurus-plugin-content-blog/current 下添加新的 .md 文件。对应中文文件和英文文件，中英文文件名要一致。
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
3. `custom_edit_url` 是到这个 repo 中的文档的链接，必需的。

## 注意 .md 文件
1. 不要使用不正确的 html 标签，如 `<img>， <br>` ，替换为 `<img/> <br/>`；
2. 如果您想显示 `<xx>` ，请替换为 `&lt;xx&gt;` 。
