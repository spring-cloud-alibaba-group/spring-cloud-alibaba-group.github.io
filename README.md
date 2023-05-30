# Spring Cloud Alibaba Official Website

### Quick Start

1. `npm install`

2. `npm run start`

3. Browser input

```shell
localhost:3000/
```

### Build and start as a service

1. `npm run build`

2. `npm run serve`

3. Browser input
```shell
localhost:3000/
```

## Local environment preparation
Base docusaurus v2.3.1
Node.js version 16.14+

## i18n Considerations

Please note that if you start the site in development mode with `npm run start` or `npm run start-en`, the regional language switching feature and local search feature will not work. Please run the program in production mode using the "build and start as service" process to enable locale switching and site search.

## How to write documentation

### Add a new document

1. Add a new .md file under i18n/en-us/docusaurus-plugin-content-docs/current or i18n/zh-cn/docusaurus-plugin-content-docs/current. Corresponding to the Chinese file and the English file, the Chinese and English file names must be consistent.
2. Update sidebar.js to add a new entry in the en-us or zh-cn directory.

### Add new articles for developers

1. Add a new .md file under i18n/en-us/docusaurus-plugin-content-docs/current/developers or i18n/zh-cn/docusaurus-plugin-content-docs/current/developers, the file name should start with _dev.md ends. Note that the suffix _dev is necessary.
2. Update sidebar.js to add a new entry in en-us or zh-cn.

### Add a new blog

1. Add a new .md file under i18n/en-us/docusaurus-plugin-content-blog/current or i18n/zh-cn/docusaurus-plugin-content-blog/current. Corresponding to the Chinese file and the English file, the Chinese and English file names must be consistent.
2. Requires `SEO` configuration.

## SEO

the type is:
```
---
title: title
keywords: [keywords1,keywords2]
description: some description
author: author name
date: 2018-12-29
custom_edit_url: https://github.com/spring-cloud-alibaba-group/spring-cloud-alibaba-group.github.io/blob/main/i18n/en/docusaurus-plugin-content-blog/30-line- wasm.md
---
```

**Notice:**
1. "title" cannot contain ":"
2. `keywords` must be `Array`
3. `custom_edit_url` is a link to the documentation in this repo, required.

## Note the .md file
1. Do not use incorrect html tags, such as `<img>, <br>`, replace it with `<img/> <br/>`;
2. If you want to display `<xx>`, please replace it with `&lt;xx&gt;`.