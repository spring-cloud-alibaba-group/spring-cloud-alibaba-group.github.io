# Spring Cloud Alibaba 官网

[![CI Status](https://github.com/spring-cloud-alibaba-group/spring-cloud-alibaba-group.github.io/workflows/sca.aliyun.com%20deploy/badge.svg)](https://github.com/spring-cloud-alibaba-group/spring-cloud-alibaba-group.github.io/actions)

## 本地构建项目

### 环境准备

> 如果不想在本地安装依赖组件，可参考下文 [Docker 环境运行方式](#docker-方式运行)。
> 项目源码基于 docusaurus v3.1.0 构建，因此要编译运行本项目需确保安装 Node.js 。

- Node.js version 18.0+

### 快速启动

1. `npm install` or `npm install -legacy-peer-deps`

2. `npm run start` （以此方式启动时，无法访问 English 页面，如需访问以 `npm run start-en` 启动）

3. 浏览器输入

```shell
# 中文模式启动
http://localhost:3000/zh-cn
# 英文模式启动
http://localhost:3000/en-us
```

### 构建并以服务启动

1. `npm run build`

2. `npm run serve`

3. 浏览器输入

```shell
http://localhost:3000/zh-cn
```

## Docker 方式运行

确保本地机器安装 Docker。

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

## i18n 注意事项

请注意，如果在开发模式下使用 `npm run start` 或 `npm run start-en` 启动网站项目，则区域语言转换功能和本地搜索功能将不起作用。请在生产模式下使用 `npm run build & npm run server` 运行网站项目，以启用语言环境切换和站内搜索功能。

## 如何撰写文档

### 添加一个新文档

1. 在根目录下的 `docs` 和 `versioned_docs` 文件夹对应位置添加占位文件；
2. 在 `i18n/en-us/docusaurus-plugin-content-docs/version` 或 `i18n/zh-cn/docusaurus-plugin-content-docs/version` 下添加新的 markdown 文件。对应英文和中文文件，中英文文件名需要和 `docs` 占位文件一致；
3. 在 `versioned_sidecar` 对应版本下的 `sidecar.json` 文件中添加对应条目。

### 为开发人员添加新的文章

1. 在 `i18n/en-us/docusaurus-plugin-content-docs/current/developers` 或 `i18n/zh-cn/docusaurus-plugin-content-docs/current/developers` 下添加新的 markdown 文件，文件名应该以 *\_dev.md 结尾。注意，后缀 *\_dev 是必要的；
2. 更新 `sidebar.js`，在 en-us 或 zh-cn 中添加一个新条目。

### 添加一个新博客

1. 添加 markdown 文件
    1. 添加占位文件，在 `/blog`；
    2.在 `i18n/en-us/docusaurus-plugin-content-blog/current` 或 `i18n/zh-cn/docusaurus-plugin-content-blog/current` 下添加新的 markdown 文件。对应英文和中文，中英文文件名需要和占位文件名一致；
2. 在文件头添加 SEO 配置；
3. 文档中的图片添加到 `/static/img/blog/xxx` 下，xxx 和 blog 标题一致。

## SEO

the type is :

```markdwon
---
title: title
keywords: [keywords1,keywords2]
description: some description
author: author name
date: 2018-12-29
custom_edit_url: https://github.com/spring-cloud-alibaba-group/spring-cloud-alibaba-group.github.io/blob/master/i18n/en-us/docusaurus-plugin-content-blog/SCA-2022.0.0.0-version-released.md
---
```

**注意:**

1. “title” 不能包含 “:” ；
2. `keywords` 必须是 `Array`；
3. `custom_edit_url` 是到 github 仓库中的文档链接。

## 注意 markdown 文件

1. 不要使用不正确的 html 标签，如 `<img>， <br>` ，替换为 `<img/> <br/>`；
2. 如果您想显示 `<xx>` ，请替换为 `&lt;xx&gt;` 。
