---
title: 周会纪要
keywords: [Spring Cloud Alibaba, Meeting]
description: 周会纪要
---

## 会议 32：2023/03/30

### 参会人

马鹏、阮胜、铖朴、袁大山、时亮、王杰、黄敬林、ziyou 仔悠、\*权、许 灵、刘南方、王智、\*\*乾、\*\*宽、\*\*柏、\*\*祥、\*\*靓、\*鑫、\*\*龙、郭靖、\*\*嘉、\*\*师、\*\*\*\*\*颖、林学飞、\*\*松、张彬、\*华、刘梁文、\*\*斌、\*\*\*\*者、牧思、谭琦存、\*\*华、\*成、背锅大仙、泊闻、Yuluo、温延龙、张志鹏、罗志峰、老唐、CAP、胡俊锋、杨杰灵、Jxinx、高鑫、\*\*伟、闫云龙、张玉明、程兴源、donald、杨博源、王康、\*\*敏、秦兆繁

### 会议主题

1. Review 社区过去 2 周的 PR 和 issues 以及对社区过去的动态与未来两周工作规划进行介绍。
2. 社区泊闻同学介绍 SCA 对接支持 RocketMQ 5.0 的设计方案的内容。

### 会议结论

1. 社区未来新功能比如对接 Kubernetes 配置中心、适配 RocketMQ 5.0 等未来随什么分支版本进行发布需要召集社区主要 Committer 团队进行讨论，另外对未来的社区相关版本管理与迭代计划需要进行讨论和确定。暂定在 4 月初完成。
2. 微服务治理相关模块当前命名限制了相关模块后续的发展，需要对其发起重命名调整讨论，相关讨论 issues[#3238](https://github.com/alibaba/spring-cloud-alibaba/issues/3238)

## 会议 31：2023/03/16

### 参会人

徐卫东、铖朴、阮胜、余黄彬、Jxinx、ziyou 仔悠、杨杰灵、侯世宇、邱献宝、\*\*柏、牧思、胡俊锋、王良、Yuluo、刘洋-Y、徐敏、陈勇、\*\*龙、\*\*春、王康、张骞、曹亮、\*一、\*\*宽、常笑笑、王杰、王志鹏、占生聪

### 会议主题

1. Review 社区过去 2 周的 PR 和 issues 以及对社区过去的动态与未来两周工作规划进行介绍。
2. 社区牧思同学分享介绍了其近期在调研 Istio 中零信任安全相关的内容情况。
3. 社区铖朴同学组织进行讨论 2023 年度开源之夏的选题申报。

### 会议结论

1. 零信任安全能力的构建会作为社区微服务治理能力中的重要组成部分，相关讨论 issues[#2974](https://github.com/alibaba/spring-cloud-alibaba/issues/2974)
2. 社区计划下周发布 2021.0.5.0 版本，相关[milestone](https://github.com/alibaba/spring-cloud-alibaba/milestone/22)。

## 会议 30：2023/03/02

### 参会人

刘子明、\*\*鑫、张骞、铖朴、赵海峰、王良、Yuluo、\*\*\*\*\*\*\*\*)、寇申海、刘梁文、杨博源、梁建涛、\*\*坤、泊闻

### 会议主题

1. Review 社区过去 2 周的 PR 和 issues 以及对社区过去的动态与未来两周工作规划进行介绍。
2. 社区铖朴介绍了一下社区接下来将建设社区官方网站的计划。

### 会议结论

1. 针对[#3171](https://github.com/alibaba/spring-cloud-alibaba/pull/3171)，需要将当前社区 Seata 模块为 OpenFeign 客户端默认设置的不重试策略给移除，然后在文档中说明清楚设置为不重试可能的影响面，社区还是不应该因为给用户带来特定功能效果的同时影响用户原来的使用方式。

## 会议 29：2023/02/16

### 参会人

沈琛益、gofow、puppy | 王晟权(B-4F-C082)、阮胜、铖朴、宋旭东、Sorie 宋二娃、张同学、王康、PHILOR(李辉)、肖权、王欣东、阿克苏(黄杰)、牧思、\*\*东、林学飞、\*\*双、iChen、余黄彬、许 灵、\*\*珠、John、岳法祥、\*\*斌、张子建、\*\*\*\*\*\*\*\*\*昆、Yuluo、\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*）、\*\*程、RedCrazyGhost、程兴源、王逸攀、\*斌、\*\*龙、何子豪、\*\*春、王杰、Z、梁南、泊闻、\*廷、\*非、周普照、robin 哥、胡俊锋、王良、godtroop、\*\*南、顺利、小马哥（mercyblitz）、陈作贤、风吟、贾江南、CAP、\*\*龙、陈小东（成都资讯）、陈健斌、韩少华、李志永、高同学(高宏伟)、刘武勇、\*\*达、\*顶、丁杰飞、杨杰灵

### 会议主题

1. Review 社区过去 2 周的 PR 和 issues 以及对社区过去的动态与未来两周工作规划进行介绍。
2. 社区同学分享如何快速试用和体验社区提供的微服务治理能力。

### 会议结论

1. 针对[#3151](https://github.com/alibaba/spring-cloud-alibaba/issues/3151)，周会社区讨论后决定在 Spring Cloud Alibaba 项目中删除原来针对 Web 的 Seata 埋点，就只是 Seata 客户端提供的埋点即可。
2. 针对[#3137](https://github.com/alibaba/spring-cloud-alibaba/issues/3137)，周会社区讨论后决定采用 spring-cloud-starter-alibaba-kubernetes-config 针对新模块进行命名，该模块命名作为一个违背当前社区新模块命名规则的一个特例存在。

## 会议 28：2023/02/03

### 参会人

闫宝川、王杰、铖朴、刘兴堂、王逸攀、岳法祥、阮胜、十眠、牧思、范子源、张彬、刘梁文、林学飞、ziyou 仔悠、许 灵、张骞、王协龙、棋洛、赵子亮、赖晖、揭印泉、田青钊、Yuluo、hello、王康、恍如隔世、泊闻、彭原、羡昆鹏、木糖醇患者、崔辉、胡俊锋、565026 朱海昆、左敬岳、金震宇

### 会议主题

1. Review 社区过去 2 周的 PR 和 issues 以及对社区过去的动态与未来两周工作规划进行介绍。
2. 社区铖朴分享 Spring Cloud Alibaba 项目文档建设的一些注意事项《[文档编写前必读](https://www.yuque.com/g/spring-cloud-alibaba/xgu1l3/dvzsik95vs8ipyur/collaborator/join?token=Y0l3lxhbD0fSDYLM#)》。

## 会议 27：2023/01/05

### 参会人

阮胜、云天空、李业宽、铖朴、王协龙、Dioxide.CN、贺蜜峰、刘鑫、谭恺、曹睿爸爸、张骞、顾中正、叶廷、王良、泊闻、啊吧啊吧、范斌、CAP、565026 朱海昆、刘文靓、许 灵、李盛琨、董保珠、石亮、罗志坤、王晓华、ziyou 仔悠、刘和春、王灿轩、赖晖、Yuluo、任浩军 | nepxion.com、杨志国、付希松、李苑辉、John、孙朋、章骏超、余黄彬、王唐星、牧思、Klein

### 会议主题

1. Review 社区过去 2 周的 PR 和 issues 以及对社区过去的动态与未来两周工作规划进行介绍。
2. 社区铖朴介绍最新 Spring Cloud Alibaba 2.2.10-RC1 版本的相关发版规划与社区未来的需求计划情况。

### 会议结论

1. 探索提供一套自定义负载均衡的可能性，以便 SCA 当前根据负载均衡所做的新特性可便捷移植到所有当前主分支。

## 会议 26：2022/12/23

### 参会人

阮胜、懂事、铖朴、王灿轩、刘和春、秦加兴、王良、罗志坤、贺蜜峰、邓小兵、李方祥、Vic Meng(孟宪辉)、刘鑫、许 灵、泊闻、石亮、张小波 doctor zhang、陈笑双、魏方超、Fitzwilliam | 吴伟刚（B4F-B094）、刘梁文、孙朋、唐敬宇、牧思、叶廷、叶杰钦、璩明洋、刘洪照、余黄彬、范斌、施祥云、黄田贵、任浩军 | nepxion.com、郑文龙、席建月、邓正威、565026 朱海昆、灵芝、邹颖、揭印泉、张骞、李明、兰鹏飞、王协龙、CAP、Yuluo、邓军、新一、远云、王杰、李星鹏、高明杰、胡俊锋、董保珠

### 会议主题

1. Review 社区过去 2 周的 PR 和 issues 以及对社区过去的动态与未来两周工作规划进行介绍。
2. 社区阮胜同学介绍最新即将发布的 Spring Cloud Alibaba 2022.0.0.0 版本的相关内容并演示基于 GraalVM 技术构建 SCA 服务注册与发现、配置更新的 demo。

### 会议结论

1. 铖朴介绍了社区未来的中长期工作会聚焦在微服务治理能力建设上，后续会给外部开发贡献者提供微服务治理建设所需的开发资源。
2. 社区后续会继续完成所有组件支持 GraalVM 的工作规划，计划在未来尽快完成所有组件的支持然后推出 2022.0.0.0 正式版本。

## 会议 25：2022/12/08

### 参会人

王灿轩、阮胜、懂事、张同学、任浩军 | nepxion.com、许 灵、铖朴、胡俊锋、牧思、董保珠、Hulk、诸葛懿、智泽鹏、泊闻、史富富、张华、godtroop、吴群群、宋轶群、谭恺、毛幼师、曹睿爸爸、陈笑双、杨洋、廖秀达、黄北金、唐敬宇、ziyou 仔悠、Vic Meng(孟宪辉)、李业宽、李方祥、王杰、石亮、WZeng、刘鑫、宁权、Tony、叶廷、高原、管华、乾坤、DEV、John、z、伟成 Weix Sun、棋洛、罗志坤、陈晓敏、逻辑喵、李健南、张泓玮、CAP、叶建均、邓正威、李明、新一、贺蜜峰、余黄彬

### 会议主题

1. Review 社区过去 2 周的 PR 和 issues 以及对社区过去的动态与未来两周工作规划进行介绍。
2. 社区阮胜同学介绍近期在 SCA 对接 Spring Boot 3.0 方面的调研和实践情况。

### 会议结论

1. 讨论了社区适配 Spring Boot 3.0 的现状和安排，社区已经完成部分初步的依赖升级和改造工作[#2948](https://github.com/alibaba/spring-cloud-alibaba/pull/2948)，社区在周会中讨论决定会在完成相关功能改造并出一个 Spring Boot 3.0 相关最佳实践后再推出相关新版本。

## 会议 24：2022/11/24

### 参会人

Vic Meng(孟宪辉)、余黄彬、铖朴、郭鹏、张尔柏、王智、张同学、杨博源、张繁盛、\*\*仪、牧思、十眠、iChen、王晓华、刘梁文、李沛奎、\*称、李方祥、\*\*鑫、阳、RedCrazyGhost、邓正威、余安刚、张世成、史凯洋、zhangwei、王志顺、泊闻、恍如隔世、刘志民、吴超群、张贺保、王杰、顺利、\*\*坤、林超

### 会议主题

1. Review 社区过去 2 周的 PR 和 issues 以及对社区过去的动态与未来两周工作规划进行介绍。
2. 社区铖朴同学介绍后续阿里即将规划开源的云原生应用脚手架项目。

## 会议 23：2022/11/10

### 参会人

铖朴、hth、马称、余黄彬、阮胜、\*\*伟、泊闻、牧思、张繁盛、邓正威、晓光、RedCrazyGhost、James、///、张同学、赖晖、于翔、彭丹华、杨杰灵、石晋东、王杰、\*\*鹏、逻辑喵、吴正 13343463815、z、Tony、杨博源、李苑辉、\*\*毅、\*\*达、秦加兴、\*\*龙

### 会议主题

1. Review 社区过去 2 周的 PR 和 issues 以及对社区过去的动态与未来两周工作规划进行介绍。
2. 社区同学牧思介绍和演示了当前社区已经完成的服务鉴权、标签路由相关微服务治理能力对接 Istio 的功能

### 会议结论

1. 接下来社区会继续丰富微服务治理能力，尽可能把 Istio 中 VirtualService、Destination 等相关流量治理的能力都做上来，让广大用户在 Kubernetes 云原生环境，可通过主流的控制面实现 Spring Cloud 应用的流量治理效果，相关工作正在规划中。

## 会议 22：2022/10/27

### 参会人

张国盛、历星辰、吴群群、张同学、王浩然、吴海鑫、阮胜、余黄彬、王国建、任浩军 | nepxion.com、刘洪照、铖朴、恍如隔世、懂事、牧思、王杰、李苑辉、程兴源、赖晖、仲远、RedCrazyGhost、邓正威、iChen、\*\*钦、泊闻、\*\*鹏、杨杰灵、张骞、游思立、James、\*\*兵、林召官、\*\*🍊、李建、雷平、\*\*月、赵海峰、\*\*坤、zkzlx、黑化后的亚瑟

### 会议主题

1. Review 社区过去 2 周的 PR 和 issues 以及对社区过去的动态与未来两周工作规划进行介绍。
2. 铖朴介绍当前已经完成的 Spring Cloud Alibaba 容器化部署最佳实践内容。

### 会议结论

1. 对 NacosWatch 类的重构进行了讨论，相关讨论 issues[#2868](https://github.com/alibaba/spring-cloud-alibaba/issues/2868)

## 会议 21：2022/10/13

### 参会人

李苑辉、邓正威、铖朴、牧思、余黄彬、任浩军 | nepxion.com、刘梁文、顾中正、RedCrazyGhost、仲远、张建宏、懂事、赖晖、阮胜、张骞、Yuluo、\*\*月、Sorie 宋二娃、\*\*程、泊闻、\*\*双、张同学、杨博源、\*\*旭、🐼 高祥、洛夜

### 会议主题

1. Review 社区过去 2 周的 PR 和 issues 以及对社区过去的动态与未来两周工作规划进行介绍。
2. 社区泊闻同学介绍 Spring Cloud Alibaba 支持 RocketMQ 5.0 的相关功能规划，关联 issues：[#2843](https://github.com/alibaba/spring-cloud-alibaba/issues/2843)

### 会议结论

1. 明确了 Spring Cloud Alibaba 支持 RocketMQ 5.0 相关工作的具体内容。相关工作目标程度和工作细化与认领需要进一步确定和细化，这块会在 SCA 对接 Rocket 5.0 兴趣小组进行讨论。
2. 同步社区第 2 期季度活跃贡献者计划的情况，其中李苑辉同学负责 Nacos、邓正威同学负责 Seata、铖朴负责 Sentinel 和 RocketMQ 模块后续 issues 和 PR 支持与答疑。

## 会议 20：2022/09/29

### 参会人

程兴源、乐兜、Sorie 宋二娃、顾中正、秋官、任浩军 | nepxion.com、铖朴、赵平、赖晖、杨博源、泊闻、吴群群、刘梁文、牧思、李苑辉、黄标、\*\*宇、邓正威、\*\*宇、刘鑫、\*恺、\*楠、\*\*林、张同学、李欣桓、黄嵩文、畅为、刘军、懂事、恍如隔世、彭瑶、全永奇、\*\*双、金成、张文明、4ye、刘贵男

### 会议主题

1. Review 社区过去 2 周的 PR 和 issues 以及对社区过去的动态与未来两周工作规划进行介绍。
2. 社区赖晖同学演示 Spring Cloud Alibaba 微服务治理中的标签路由功能。

## 会议 19：2022/09/15

### 参会人

黄荣烽、陈伟明、胡飞、铖朴、泊闻、孙斯龙、仲远、Sorie 宋二娃、赖晖、刘梁文、周跃、\*\*达、Yuluo、王杰、James、邓正威、阮胜、张骞、刘国荣、\*\*鹏、葛治野、\*\*鑫、马子龙、CAP、\*\*双、李瀚、程兴源、\*言

### 会议主题

1. Review 社区过去 2 周的 PR 和 issues 以及对社区过去的动态与未来两周工作规划进行介绍。
2. 社区铖朴介绍 Spring Cloud Alibaba 2.2.9.RELEASE 中异地多活以及 IPv6 服务地址注册相关最新特性。

### 会议结论

1. 社区同学提议，后续计划弄一个 spring-cloud-alibaba-awesome 的项目，来放一些社区资料，以便外部用户更好地通过这些资料了解 SCA。这块需要社区内外部同学一起参与共建。

## 会议 18：2022/09/01

### 参会人

李业宽、方华保、阮胜、JAY、牧思、iChen、黄宇尧、铖朴、黄毅辉、赖晖、王杰、璩明洋、James、张凤涛、小魏，小魏，我们要去哪里呀、李玉长、孙斯龙、泊闻、懂事、刘梁文、张建宏、王国建、陈笑双、余黄彬、李博、陈浩然、马国良(国良)、柳君、刘洋、刘军、程兴源、富晓磊、闵苛、韩宇、陈国鹏、宋纪朋

### 会议主题

1. Review 社区过去 2 周的 PR 和 issues 以及对社区过去的动态与未来两周工作规划进行介绍。
2. 邀请 OpenSergo 社区&Dubbo 社区同学陆龟介绍微服务治理管控面方案设计。

### 会议结论

1. 会议讨论确定后续社区有必要为 Spring Cloud Alibaba 用户提供基于 Kubernetes 的服务注册与发现能力，以便通过 Istio & OpenSergo 控制面使用 Spring Cloud Alibaba 微服务治理能力的用户能以最简单的方式构建微服务和部署云原生应用。

## 会议 17：2022/08/18

### 参会人

黄毅辉、王杰、李苑辉、James、顾中正、孙斯龙、张章文、铖朴、黄宇尧、杨洋、就砺、王唐星-钉钉、田青钊、黄北金、邵喜凯、hth、程兴源、牧思、泊闻、Sorie 宋二娃、张迪、张本学、JAY、关宇、Bryce Hu、蔡鹏、刘斌、小魏，小魏，我们要去哪里呀、袁大山、许凯明、赖晖、郑晗、李盛琨

### 会议主题

1. Review 社区过去 2 周的 PR 和 issues 以及对社区过去的动态与未来两周工作规划进行介绍。
2. 社区铖朴介绍 Spring Cloud Alibaba 的异地多活解决方案建设最新进展。

### 会议结论

1. 预计九月初会发布 2.2.9 版本以让 Spring Cloud 用户可以基于 Spring Cloud Alibaba 相关模块构建多活微服务应用。

## 会议 16：2022/08/04

### 参会人

牧思、Sorie 宋二娃、张章文、陈云龙、铖朴、黄宇尧、舒天舒、赖晖、James、小魏，小魏，我们要去哪里呀、程兴源、孙斯龙、余黄彬、刘梁文、薛鹏辉、王洋洋、刘鑫、王杰、顾中正、CAP、张骞、John、李苑辉、\*\*琨、十眠、\*\*龙、杨博源、朱乐陶

### 会议主题

1. Review 社区过去 2 周的 PR 和 issues 以及对社区过去的动态与未来两周工作规划进行介绍。
2. 社区同学赖晖介绍 Spring Cloud Alibaba 微服务治理中的标签路由路由设计方案，以及后续如何对接外部开源微服务治理控制面如 Istio 等。

### 会议结论

1. 目前社区会主要投入精力在微服务治理建设上，第一期未来 2 个月之内会完成对接 istio 的标签路由、服务鉴权等相关微服务治理功能。
2. 另外社区也会做一些 Spring Cloud Alibaba 微服务云原生最佳实践，相关设计方案可参见：[#2697](https://github.com/alibaba/spring-cloud-alibaba/issues/2697)

## 会议 15：2022/07/21

### 参会人

余黄彬、牧思、Sorie 宋二娃、James、铖朴、黄宇尧、张凯、赖晖、王杰、小魏，小魏，我们要去哪里呀、杨志强、金成、周圣平、泊闻、刘梁文、顾中正、李文超、雷祝鹏、孙斯龙、言言、杨博源、马子龙、啊吧啊吧、程兴源、CAP、十眠、宿何、马国良(国良)、李晓双、陈伟明

### 会议主题

1. Review 社区过去 2 周的 PR 和 issues 以及对社区过去的动态与未来两周工作规划进行介绍。
2. 社区邀请 OpenSergo 社区贡献者十眠和宿河介绍 OpenSergo 项目最新进展以及未来对接 Spring Cloud Alibaba 的规划。

### 会议结论

1. 未来，社区贡献者可以写一些使用 Spring Cloud Alibaba 核心特性的文章向外界进行相关功能分享，社区周会也可以规划分享一些项目核心组件的展示介绍。

## 会议 14：2022/07/08

### 参会人

李苑辉、刘俊浩、陈俊炼、James、孙斯龙、刘俊杰(junjie3.liu)、赖晖、刘梁文、张尔柏、贺绍鹤、铖朴、Sorie 宋二娃、李业宽、唐智、牧思、泊闻、安文彪、Sky|许永康（9F-B100）、张建宏、马红卫、程兴源、小魏，小魏，我们要去哪里呀、黄宇尧、胡玮杰(Ivan)、薛志方、李玉长、Fitzwilliam | 吴伟刚（B4F-B094）、刘沐元、就砺、谢萱辉、宋军、李盛琨、刘明、顾欣欣、张博文、崔快、陈伟伟、张程浩、王睿、汤亮、李瀚、马国良(国良)、揭印泉、RedCrazyGhost、周伟、余黄彬、王杰、李晓双、杨泽宇、李昀隆、冯俊伟、无言、宋轶群、李超、智泽鹏、马东、彭原、王正东、施祥云、王鹏程、郦琦、屋顶、席建月、刘洪照、杨林林、杨志强、黑化后的亚瑟

### 会议主题

1. Review 社区过去 2 周的 PR 和 issues 以及对社区过去的动态与未来两周工作规划进行介绍。
2. 社区程兴源和编程之夏相关选题同学李苑辉介绍 Spring Cloud Alibaba 实现智能化全自动化测试方案设计与规划。

### 会议结论

1. 自动化测试方案仍然需要进一步的完善和细化，需要尽快将 Spring Cloud Alibaba 中相关组件的测试点列举出来。

## 会议 13：2022/06/23

### 参会人

铖朴、自疏 🍠、赖晖、施祥云、孙斯龙、小魏，小魏，我们要去哪里呀、王杰、郦琦、言言、牧思、puppy | 王晟权(B-4F-C082)、柯海勇、Lee、余黄彬、刘洪照、James、席建月、彭洪友、Sorie 宋二娃、黄宇尧、Sky|许永康（9F-B100）、卜比(bobi)、郭康、杨志强、李晓双、智泽鹏、王鹏程、Fitzwilliam | 吴伟刚（B4F-B094）、就砺、程兴源、杨泽宇

### 会议主题

1. Review 社区过去几周的 PR 和 issues 以及对社区过去的动态与未来两周工作规划进行介绍。
2. AppActive 社区负责人@就砺分享阿里云异地多活方案 AppActive。
3. 讨论 AppActive 异地多活方案如何通过 Spring Cloud Alibaba 更好地服务于 Spring Cloud 用户。

### 会议结论

1. Spring Cloud Alibaba 接下来会跟 AppActive 社区一起规划 SCA 集成 AppActive 的步骤和 todo list。

## 会议 12：2022/06/09

### 参会人

王康、展彤、大海、兰鹏飞、mush、邓俊、Jin、周光华、刘鑫、铖朴、刘帅、Sorie\_宋二、任凯歌、酒剑仙、张骞、时胜来、杨博源、李军、朱雨飞、陈军、iChen、陈浩然、鲍寅磊

### 会议主题

1. Review 社区过去几周的 PR 和 issues 以及对社区过去的动态与未来两周工作规划进行介绍。
2. 铖朴向社区内外同学介绍了 Spring Cloud Alibaba 社区未来 3 个月内的规划。

### 会议结论

1. Spring Cloud Alibaba 社区未来的工作中心会围绕带给开发者更好用的微服务框架方向努力，重点会在微服务治理、微服务应用高可用和分布式任务调度 3 个方向上展开工作。

## 会议 11：2022/05/26

### 参会人

张彬、木糖醇患者、王正东、王杰、Awake、康运智、棋洛、刘海潮、Sorie\_宋二、归屿、大海、王协龙、严荣非、王超越、铖朴、黄鑫、James、Jaime、无异、刘梁文、贺绍鹤、赖晖、高丽杰、陈建清、谢志超、张鹏飞、张骞、李盛琨、王楠、聂璐毅、刘鑫、黄世强、个性、数字中心-鼠夏天、卢哲、吴勇广、Austin、张亚杰、阮胜、卜比(bobi)、立帅尚、Fitzwilliam | 吴伟刚（B4F-B094）、黄炳良、李美满、李元高、李晓双、张小坤、杨博源、孙帅杰、少荣、Lee、CAP、陈伟明、黄建锋、云兴、杨杰灵、余黄彬、骆新亮、赵润淇

### 会议主题

1. Review 社区过去几周的 PR 和 issues 以及对社区过去的动态与未来两周工作规划进行介绍。
2. 社区 Committer 刘梁文分享 Spring Cloud Function 相关技术。

### 会议结论

1. 社区后续会调研 Spring Cloud Alibaba 支持 Xds 协议实现利用 Service Mesh 技术为 Spring Cloud Alibaba 应用提供服务治理能力。

## 会议 10：2022/05/12

### 参会人

彭锦华、iChen、James、付盛、小马哥（mercyblitz）、赵明浩、春少、铖朴、Sorie\_宋二、胡乐、Jaime、张国斌、晓光、查全智、刘梁文、贺绍鹤、新垣绫濑、李小伟、姜金隆、程兴源、冰封、刘鑫、王川、杨博源、张骞、徐红维@Palmer.Xu、王楠、大海、邓通资、王杰、张国强、Galio | 朱桐辉(4f b084)、谢志超、陈旭光、hello、聂璐毅、李双强、洛夜、许 灵、泊闻、卢宇鹏、徐骁成、王立君、༾、李盛琨、杜海航、廖秀达、Machine、吴涛、邵磊、李泉锦、许道杰、王岗、王永刚、黄熠丹、立帅尚、孙德发

### 会议主题

1. Review 社区过去几周的 PR 和 issues 以及对社区过去的动态与未来两周工作规划进行介绍。
2. 铖朴分享 Spring Cloud Stream 在 Spring Cloud Alibaba 中的使用。
3. 讨论社区参加阿里巴巴编程之夏选题情况。

### 会议结论

1. 确定社区将会在 RocketMQ 和自动化测试方面各出一个题目参加阿里巴巴开源之夏活动。
2. 确定了 Spring Cloud Alibaba 2.2.8 预计将在六月初发布。

## 会议 9：2022/04/28

### 参会人

张骞、沈琛益、刘梁文、李铖、James、吴浩友、铖朴、袁大山、赵宜珺、董伟豪、梁明辉、蒋晓佳、Ryzain*Li、贾琦磊、子路、孙展、刘源、王正飞、乔淋、童少、张健、王相君！、展彤、王威、陈斌、程兴源、王孟臣、李博、肖波、唐帆、徐琛、Taills、年帅帅、杨晓航、棋洛、汤浩、杜晓彬、Nicky - 孟鑫、阙炬文、Adam、凯恩、卜比(bobi)、解长周、黄军霖、许凯明、王宇、江树源、泊闻、乐儿的羊羊、大海、周光华、陈笑双、陈连刚、杨博源、陈健雄、Jasper、木糖醇患者、许道杰、Fitzwilliam | 吴伟刚（B4F-B094）、Sorie*宋二、六、晴天、孙棋、任浩军 | nepxion.com、柳胜利、闫晓栋、CAP、郑冰、李佐臣、覃敏、张栋、战乃东、陈国正、李盛琨、楼佳斌、冯俊伟、Galio | 朱桐辉(4f b084)、杨杰灵、杨益焜、王永刚、贺绍鹤、朱阿龙

### 会议主题

1. Review 社区过去几周的 PR 和 issues 以及对社区过去的动态与未来两周工作规划进行介绍。
2. 就社区参与开源之夏两个候选题目敲定以及 5 月份 Spring Cloud Alibaba 2.2.8 新版本内容规划进行讨论。

### 会议结论

1. 确定了 Spring Cloud Alibaba 2.2.8 新版本主要是在当前业界用户使用较多的 Spring Cloud Hoxton 和 Spring Boot 2.3.x 基础上做一下遗留问题修复和组件升级，以及面向业界建设微服务最佳实践 samples。

## 会议 8：2022/04/14

### 参会人

godtroop、帆潮、王诚、子民、王杰、阮胜、杨过、龙端彬、沈琛益、王帅、puppy | 王晟权(B-4F-C082)、任浩军 | nepxion.com、郝龙飞、张章文、iChen、孙斯龙、杨博源、陈云聪、彭锋、ZHI、谢宇翔、黄鑫、施健、徐臻俊、唐向光、杨斌、刘帅、薛广顺、赵勇勇、范志学、铖朴、阮威敏、王晓炜、大海、史进、步风、沧海笑、占生聪、灰灰熊、Sorie\_宋二(https://github.com...、张浩1、余黄彬、查全智、James、李沃晟、童子龙、王希、李晓双、张云翔、朱缘、tavion、韦长亮、rottenmu、杨智慧、程兴源、棋洛、叶萌、廖秀达、李丽标、李盛琨、郑晗、刘梁文、肖杨、陈笑双、杨江长、黄忠成、孟享广、张炯、马国良(国良)、泊闻、杨杰灵、阿呀、胡桃池、廖梦鸽、罗志坤、谢浩、金强、慕紫、胡弦、黄义声、言言、胡国光、许道杰、路顺、黄子豪、吴善如、王春兰、刘景、xxx、建安、leehom、邓裕民、秦云强

### 会议主题

1. Review 社区过去几周的 PR 和 issues 以及对社区过去的动态与未来两周工作规划进行介绍。
2. Nepxion Discovery 项目核心成员任浩军和童子龙同学一起向社区同学介绍了 Nepxion Discovery 项目所提供的微服务治理有关内容。

### 会议结论

1. 针对 [#2018](https://github.com/alibaba/spring-cloud-alibaba/pull/2494) 进行了详细讨论，认为其是一个伪需求，社区不应该去实现跨组服务调用，会导致框架所设计的分组的概念被破坏。
2. 外部用户提交 issues 时一定要注意规范，尽量按照模板一次性把有利于排查问题的所有内容，包括但不限于框架版本、配置以及复现问题关键代码一次性提供，以便能更快解决问题。

## 会议 7：2022/03/31

### 参会人

杨杰灵、Sorie\_宋二(https://github.com...、赵宇、刘梁文、阮胜、李中光、李晓双、大海、背锅大仙、陈贵洲、James、唐金前、张雷、伍强宏、金强、谢东育、铖朴、杨少杰、邢飞、查全智、徐骁成、任浩军 | nepxion.com、Ryzain_Li、王林杰、杨瑞聪、张炯、卜比(bobi)、叶聪、罗旭、张亚杰、亦盏、懂事、李文博、棋洛、初林朋、iChen、黄海博、李艺娟、吴治国、刘广明、唐文飇、陈守川、黄富、徐康、邓裕民、童子龙、梁明辉、程雄、解长周、张磊、威猛猪猪、岳桂林、春少、邵志鹏、Fx_demon、徐世国、高翔、Fitzwilliam | 吴伟刚（B4F-B094）、李铖、泊闻、玄水、马国良(国良)、王雪松-营销活动技术、老潮、言言、钟晓潮、杨明旭、李柯颐、鲍寅磊、太一、esun、初玉文、汤浩、胡龙、梁传奇、王馨田

### 会议主题

1. Review 社区过去几周的 PR 和 issues 以及对社区过去的动态与未来两周工作规划进行介绍。
2. 讨论了一下微服务治理相关问题，社区内外以及阿里内部相关同学对微服务治理能力和相关标准建设都进行了讨论。

### 会议结论

1. 微服务治理能力建设要分功能和分阶段来做，并不是企业有呼声的问题，社区就要去做并且能去做，像一些偏运维偏服务态的能力本身并不是开源社区能做的，如果企业对相关问题有述求可能还是要寻求商业化解决方案。
2. 后续周会还是要留 10 分钟给社区外的同学发言，会议纪要内容后续要能及时发到开源交流群，让其他未参会的同学也能了解社区动态。

## 会议 6：2022/03/17

### 参会人

Sorie\_宋二、James、刘梁文、徒康政、解宇、吴浩友、苏亚杰、吴君杰、谢新、任浩军 | nepxion.com、大魔王、鲁智明、赵子明、张波、王志顺、郭明祥、钱海逢（法线）、景元昊、林召官、孙斯龙、吕忠、梁清洁、薛刚、许道杰、杨毅、郭全思、Nick 张子恒、徐竹西、丹青阁、游霄、铖朴、北扬、王鹏强、王国建、赵镇、iChen、丁云伟、李文博、刘奇峰、赵建华、村田、胡波、徐骁成、张庆雪、老毛、行冬、冯朝军、乔玉涛、Fitzwilliam | 吴伟刚、陈建清、高明杰、Eddy ｜高照辉（B4F-B090）、李晓双、蔡中杰、大海、Galio | 朱桐辉(4f b084)、张凯、姜玉杰、余黄彬、周华荣、邓小兵、吴超、王志荣、刘煜、张理明、初林朋、刘真真、邢训涛、邢飞、言言、谢飞、李盛琨、五味子、刘小军、Alvin|黄杨兵（4F-B091）、亦盏、泊闻、云天、kermit(江其民)、丹坤、朱阿龙、张迪、徐世国、宗元、余继彪、郭庆喆、李文博、王川、鲍寅磊、Bac He、世强、杨俊、樊正凯、杨兵、童子龙、xxx、吕永乐

### 会议主题

1. Review 社区过去几周的 PR 和 issues 以及对社区过去的动态与未来两周工作规划进行介绍。
2. 社区近期加入的新成员自我介绍，介绍中科院开源点亮计划事宜。

### 会议结论

1. 讨论了社区过去 2 周的一些有代表性的 PR 和 issues，以下是其中一些需要注意的点：
   - [2442](https://github.com/alibaba/spring-cloud-alibaba/issues/2442)：RocketMQ 自动读取配置，反射，容易出现升级
   - [2468](https://github.com/alibaba/spring-cloud-alibaba/pull/2468)：Config 监听配置打印一下，读到加 success，没读到加一下警告日志
   - RocketMQ 补充一些 example
   - [2459](https://github.com/alibaba/spring-cloud-alibaba/pull/2459)：配置优先级需要完善一下，给配置文件增加一下 order
2. 确定了参加中科院开源点亮计划的 8 个选题以及对应的指导导师。

## 会议 5：2022/03/03

### 参会人

金成、修炼、史进、王振南、田晓峰、聂正兵、朱阳春、大海、逢清、王文君、铖朴、青鸾、刘梁文、易江波、王晟权、Sorie\_宋二、Austin、陈贵洲、章亚飞、李定林、唐佳、卜比(bobi)、胡焕其、熊春、王满红、麦建辉、冰封、张振裕、童子龙、泊闻、何先生、朱仁杰、任浩军 | nepxion.com、陈笑双、马国良(国良)、Jerry、郑凌冰、水娃、刘国荣、方坤

### 会议主题

1. Review 社区过去几周的 PR 和 issues 以及对社区过去的动态与未来两周工作规划进行介绍。
2. 社区 Committer 介绍和分享 Spring Cloud Alibaba 项目集成测试相关建设情况。
3. 讨论微服务治理实施具体事宜。

### 会议结论

1. Spring Cloud Dubbo 相关问题，继续维护做 refactor，还是剔除 dubbo 模块？决定将 Spring Cloud Dubbo 模块从当前主干分支中剔除在单独的分支中进行维护。
2. 针对微服务治理开源的问题，社区同学感觉当前目标太大，难以实施，建议调研一下 Spring Boot Admin 等当前开源社区的相关现有服务契约能力。

## 会议 4：2022/02/17

### 参会人

Sorie\_宋二、任浩军 | nepxion.com、聆听、陈伟明、刘梁文、吴治国、大海、iChen、铖朴、余黄彬、卜比(bobi)、张启航、李晓双、徐家锋、彭正国、沈楠、张程浩、田明、徐其华、贾志恒、董以诺、王若宇、刘闯、许洪操、张志涛、渡劫(薛光洪)、国良、齐利、李盛琨、牧贞、玖厘、熊宇量、梁孟轩、周驹、胡波、郑晗、李健南、听白-韩俊文、余继彪、梁清洁、季节的季飞翔的飞、张绍武、王翔、杨光、吴伟春、黄传伟、刘德喜、兰少辉、卢静、欧渐风、王弘智、吕文峰、张然、范斌、陈迪宇、pop-wzz、Cer、李鹏耀、吴浩友、胡焕其、薛奡、顺利、凌风 zy、乐儿的羊羊、小星、赵向雄（ECHO💫）、童子龙、李仕波、陈飞、王永刚、魏成龙、陈泓任、盛明、黄仁义、徐建林、刘帅、郭真继、古琦、秦云强、kxd、段昌富、文强、吴国强、王峰、张磊、牛璐、吴佳朋

### 会议主题

1.介绍社区新加入的 Committer，向过去已经给社区贡献过代码的同学发社区特殊纪念奖品，纪念品领取登记链接（有效期：02/17/10:00 am~02/22/18:00 pm）：[https://ding.cjfx.cn/f/ii88khje](https://ding.cjfx.cn/f/ii88khje)
2.Review 社区过去几周的 PR 以及对社区过去的动态与未来两周工作规划。 3.就 Spring Cloud Alibaba 微服务治理相关内容进行讨论一下。

### 讨论点

1. dubbo 相关问题，继续维护做 refactor，还是剔除 dubbo 模块？
2. SCA 版本号讨论，是在 Spring Cloud 版本 +1 还是 2021 版本先直接从 SCA 2021.2 开始对 SC 2021 或者是 SCA 2022 版本再对齐 Spring Cloud 版本?
3. 是否需要 SCA 官网？
4. 微服务治理新模块问题讨论

           4.1 新模块命名

    4.2 服务契约控制台使用 Sentinel-dashboard 是否合理? 另外使用一套控制台? 还是构造一个属于 SCA 的控制台然后通过超链接链接到 Sentinel-dashboard 和 Nacos-dashboard?
    4.3 契约的安全性，契约非代码侵入方式，契约外网暴露(例如集成在网关上)等问题？
    4.3 服务契约模块长远规划, 服务契约后续功能的思考，后续是否集成 OpenTelemetry？是否需要打通 Prometheus 等监控服务?

5. 系统化测试，针对 SCA 所有组件做自动系统化全面的测试，这是很有价值的意向工作。

## 会议 3：2022/01/20

### 参会人

王晟权、李铖、长柏、铖朴、梁清洁、张义、B28、黄海宾、瑭星、木糖醇患者、张运江、党匀序、酒剑仙、吴治国、余黄彬、Sorie\_宋二、言言、陈超、刘梁文、Fitzwilliam、|、吴伟刚、iChen、邓积极、林泽群、niuzian、谢东育、李柏真、杨越、宗齐、谢飞、李文博、孙少平、卡伦、童子龙、许永康、朱森、春少、柳国杰、李晓双、王旭阳、乐儿的羊羊、Golfey、陈笑双、拂衣客、黎维阳、Jason、jackhu、任贺、雷珂、大海、张乐、顾加春、泊闻、当康、卜比(bobi)、小泽-黄泽滨-SCM 研发技术部、宋奎、kxd

### 会议内容

1.社区同学一起讨论和处理了一下近 2 周新出现的新 PR 和 issues 问题，主要针对了其中有关支持 Spring Boot 2.4.x 版本新特性进行了讨论。 2.邀请阿里云微服务治理团队的卜比介绍了一下未来阿里会主推的微服务治理开源 Spec 内容以及相关内容在 Spring Cloud Alibaba 社区落地的初步规划。

## 会议 2：2022/01/06

### 参会人

刘梁文、余黄彬（浙江六品堂教育科技有限公司）、冰封、卜比（阿里）、言言（在校学生）、铖朴（阿里）、泊闻（阿里）

### 会议内容

1.社区同学一起讨论和处理了一下近 2 周新出现的新 PR 和 issues 问题，讨论了一下未来两周的主要社区工作和规划是适配一个 Spring Cloud 2021.x 等组件的新版本，也欢迎未参会但看到该纪要的外部同学一起参与进来。 2.主持人带着大家一起把 Spring 官方的近 2 周的最新进展相关 blogs 浏览了一遍，并对其中一些比较新的技术进行了适当讨论。

## 会议 1：2021/12/23

### 参会人

叶轩宇、童子龙、余黄彬（浙江六品堂教育科技有限公司）、冰封、小马哥（自主创业）、春少（腾讯）、卜比（阿里）、亦盏（阿里）、铖朴（阿里）

### 会议内容

1.讨论了社区双周会的组织形式和内容

- 讨论了社区周会的展开形式，回顾了一下过去 GitHub 上的 issues 和 PR，对相关信息进行了一定讨论。当前社区双周会主要还是面对社区核心参与者进行后续会讨论逐步开放的可行性。

  2.讨论了社区后续可能的工作内容和演进方向

- 将遗留 issues 进行分类，遗留的 issues 及时进行处理。
- Spring Cloud Alibaba 对 Dubbo 3.0 和 RocketMQ 5.0 的支持。
- 完善社区相关开发文档，降低社区参与的门槛以便吸纳更多同学参与到社区中来。
- 讨论 Spring Cloud Alibaba 是否可进行一些组件的 Function 化，拥抱响应式编程。
- 讨论 Spring Cloud Alibaba 是否可提供一些基础的运维测的能力，比如标签路由、灰度、监控以及类似于 Spring Boot Admin 的控制台。
