# Spring Cloud Alibaba Website

[![CI Status](https://github.com/spring-cloud-alibaba-group/spring-cloud-alibaba-group.github.io/workflows/sca.aliyun.com%20deploy/badge.svg)](https://github.com/spring-cloud-alibaba-group/spring-cloud-alibaba-group.github.io/actions)

## Build the project locally

### Environmental preparation

> If you do not want to install the dependent components locally, refer to the following [How Docker Environments Work](#docker-mode).
> The project source code is based on docusaurus v2.4.1, so to compile and run this project, you need to ensure that the Node. JS is installed.

- Node.js version 16.14+

### Quick start

1. `npm install`

2. `npm run start` (When started in this way, the English page cannot be accessed if access is required to `npm run start-en` start)

3. Browser input

```shell
# Chinese mode startup
http://localhost:3000/zh-cn
# English mode starts
http://localhost:3000/en-us
```

### Build and start as a service

1. `npm run build`

2. `npm run serve`

3. Browser input

```shell
http://localhost:3000/zh-cn
```

## Docker mode

Make sure Docker is installed on the local machine.

### Local development

1. Build the mirror

```shell
docker build --target development -t docs:dev .
```

2. Run the container

```shell
docker run -p 3000:3000 docs:dev
```

### Production deployment

1. Build the mirror

```shell
docker build -t sca-site:latest .
```

2. Run the container

```shell
docker run --rm -p 3000:80 sca-site:latest
```

## Note for i18n

Note that if you are using `npm run start` or `npm run start-en` starting a Web site project in development mode, the regional language conversion feature and the local search feature will not work. Run the site project using `npm run build & npm run server` in production mode to enable locale switching and site-wide search.

## How to write a document

### Add a new document

1. A placeholder file is added at the `docs` `versioned_docs` position corresponding to the folder under the root directory;
2. Add a new markdown file under `i18n/en-us/docusaurus-plugin-content-docs/version` or `i18n/zh-cn/docusaurus-plugin-content-docs/version`. Corresponding to English and Chinese files, the Chinese and English file names shall be consistent with the `docs` placeholder files;
3. Add the corresponding entry in the `sidecar.json` file under the `versioned_sidecar` corresponding version.

### Add new articles for developers

1. At `i18n/en-us/docusaurus-plugin-content-docs/current/developers` or Add a new markdown file under `i18n/zh-cn/docusaurus-plugin-content-docs/current/developers`. The file name should be *\ End of _ dev. MD. Note the suffix* \ _ dev, which is necessary;
2. Update the `sidebar.js` to add a new entry in en-us or zh-cn.

### Add a new blog

1. Add a new markdown under `i18n/en-us/docusaurus-plugin-content-blog/current` or `i18n/zh-cn/docusaurus-plugin-content-blog/current` paper. Corresponding to English and Chinese, the Chinese and English file names shall be consistent with the placeholder file names;
2. Add SEO configuration in the file header.

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

**Notice**

1. `title` cannot contain ":";
2. `keywords` Must be `Array`;
3. `custom_edit_url` Is a link to the documentation in the github repository.

## Note the markdown file

1. Do not use incorrect HTML tags, such as `<img>， <br>`, replace with `<img/> <br/>`;
2. Replace with `&lt;xx&gt;` if you want to display `<xx>`.
