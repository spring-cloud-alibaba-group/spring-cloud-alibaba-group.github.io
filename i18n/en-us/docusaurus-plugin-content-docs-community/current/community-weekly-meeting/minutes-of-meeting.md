---
title: Minutes of weekly meeting
keywords: [Spring Cloud Alibaba,Meeting]
description: Minutes of weekly meetings
---

## Meeting 32:20 23/03/30
### Attendees
Xu Weidong, Cheng Pu, Ruan Sheng, Yu Huangbin, Jxinx, ziyou Zeyou, Yang Jieling, Hou Shiyu, Qiu Xianbao, \*\* Bai, Mu Si, Hu Junfeng, Wang Liang, Yuluo, Liu Yang-y, Xu Min, Chen Yong, \*\* long, \*\* chun, Wang Kang, Zhang Qian, Cao Liang, \* Yi, \*\* * Guan, Chang Xiaoxiao, Wang Jie, Wang Zhipeng, Zhan Shengcong, Me Peng
### Topic of the conference

1. Reviewed the PR and issues of the community in the past two weeks and introduced the past dynamics of the community and the work plan of the next two weeks.
2. Community Powen introduced the design scheme of SCA interconnection supporting RocketMQ 5.0.
### Conclusion of the meeting

1. The future new functions of the community, such as connecting with the Kubernetes configuration center, adaptation of RocketMQ 5.0 and other branch versions to be released in the future, need to convene the major Committer team of the community for discussion; in addition, the future community-related version management and iteration plan need to be discussed and confirmed. It is tentatively scheduled for completion in early April.
2. The current naming of modules related to micro-service governance restricts the subsequent development of relevant modules, so it is necessary to launch a discussion on renaming and adjusting them. The discussion issues [# 3238] (https://github.com/alibaba/spring-cloud-alibaba/issues/3238)
## Meeting 31:20 23/03/16
### Attendees
Xu Weidong, Cheng Pu, Ruan Sheng, Yu Huangbin, Jxinx, ziyou Zeyou, Yang Jieling, Hou Shiyu, Qiu Xianbao, \*\* Bai, Mu Si, Hu Junfeng, Wang Liang, Yuluo, Liu Yang-y, Xu Min, Chen Yong, \*\* long, \*\* chun, Wang Kang, Zhang Qian, Cao Liang, \* Yi, \*\* * Guan, Chang Xiaoxiao, Wang Jie, Wang Zhipeng, Zhan Shengcong
### Topic of the conference

1. Reviewed the PR and issues of the community in the past two weeks and introduced the past dynamics of the community and the work plan of the next two weeks.
2. Community Musi shared its recent research on zero-trust security in Istio.
3. The community will organize Chengpu students to discuss the application of topics for 2023 Open Source Summer.
### Conclusion of the meeting

1. Zero trust security capacity building will act as a community service an important part of governance, the discussion issues [# 2974] (https://github.com/alibaba/spring-cloud-alibaba/issues/2974)
2. The community plans to release next week 2021.0.5.0 version, related [milestone] (https://github.com/alibaba/spring-cloud-alibaba/milestone/22).
## Meeting 30:20 23/03/02
### Attendees
Tzu-ming liu, \ * \ * xin, zhang qian, Cheng park, hai-feng zhao, Andy, Yuluo, \ * \ * \ * \ * \ * \ * \ * \ *), Curtis ShenHai, liu liang, Yang Boyuan, Liang Jiantao, \ * \ * kun, mooring smell
### Topic of the conference

1. Reviewed the PR and issues of the community in the past two weeks and introduced the past dynamics of the community and the work plan of the next two weeks.
2. Community Chengpu introduced the plan of the community to build its official website in the future.
### Conclusion of the meeting

# 1. In view of the [3171] (https://github.com/alibaba/spring-cloud-alibaba/pull/3171), which need to be the current community Seata module for OpenFeign client default Settings don't retry policies to remove, Then, it is clearly explained in the document that if you set this parameter to do not retry a possible impact, the community should not affect the user's original usage while bringing a specific function effect to the user.
## Meeting 29:20 23/02/16
### Attendees
Shen Chen yi, gofow, puppy | Wang Shengquan (B - 4 f - C082), RuanSheng, Cheng park, xu-dong song, Sorie song 2 Eva, Wilson, Wang Kang, PHILOR (li), XiaoQuan, Wang Xindong, aksu (jay huang), animal husbandry, east, Lin Xuefei, \ \ \ * * * \ * more than double, iChen, Huang Bin, xu Spirit, \ * \ * beads, John, yue auspicious, pun, zijns, \ \ \ * * * \ * \ * \ * \ * \ * \ * \ * \ * kunduz, Yuluo, \ * \ * \ * \ * \ * \ * \ * \ * \ * \ * \ * \ * \ * \ * \ * \ * \ * \ * \ * \ * \ * \ * \ * \ * \ * \ *), \ * \ * cheng, RedCraz yGhost, Cheng Xingyuan, Wang Yipan, \* bin, \*\* * long, He Zihao, \*\* chun, Wang Jie, Z, Liang Nan, Bo Wen, \* ting, \* non, Zhou Puzhao, robin brother, Hu Junfeng, Wang Liang, godtroop, \*\* south, smooth, little horse brother (mercyblitz), Chen Zuoxian, wind Yin, Jia Jiangnan, CAP , \*\* long, Chen Xiaodong (Chengdu Information), Chen Jianbin, Han Shaohua, Li Zhiyong, Gao (Gao Hongwei), Liu Wuyong, \*\* da, \* Ding, Ding Jiefei, Yang Jieling
### Topic of the conference

1. Reviewed the PR and issues of the community in the past two weeks and introduced the past dynamics of the community and the work plan of the next two weeks.
2. Community students share how to quickly try and experience the micro-service governance capabilities provided by the community.
### Conclusion of the meeting

1. According to [# 3151] (https://github.com/alibaba/spring-cloud-alibaba/issues/3151), After discussion in the weekly meeting, the community decided to delete the original Seata burial point for Web in the Spring Cloud Alibaba project and only the burial point provided by the Seata client.
# 2. In view of the [3137] (https://github.com/alibaba/spring-cloud-alibaba/issues/3137), After discussion in the weekly meeting, the community decided to use spring-cloud-starter-alibaba-kubernetes-config to name the new module. The naming of the module exists as a special case that violates the naming rules of the new module in the current community.
## Meeting 28:20 23/02/03
### Attendees
Yan Baochuan, Wang Jie, Cheng Pu, Liu Xingtang, Wang Yipan, Yue Faxiang, Ruan Sheng, Shimian, Musi, Fan Ziyuan, Zhang Bin, Liu Liangwen, Lin Xuefei, ziyou Zeyou, Xu Ling, Zhang Qian, Wang Xielong, Qi Luo, Zhao Ziliang, Lai Hui, Jie Yinquan, Tian Qingzhao, Yuluo, hello, Wang Kang, As If from another World, Bo Wen, Peng Yuan, Xian Kunpeng, Xylitol patients, Cui Hui, Hu Junfeng, Zhu Haikun, Zuo Jingyue, Jin Zhenyu
### Topic of the conference

1. Reviewed the PR and issues of the community in the past two weeks and introduced the past dynamics of the community and the work plan of the next two weeks.
2. The community Chengpu shares the Spring Cloud Alibaba, some considerations of the construction of the project document "required] before [documentation (https://www.yuque.com/g/spring-cloud-alibaba/xgu1l3/dvzsik95vs8ipyur/collaborator/join?to Eg. "ken".

## Meeting 27:20 23/01/05
### Attendees
Ruan Sheng, Yun Tian-sky, Li Ye-kuan, Cheng Pu, Wang Xilong, Dioxide.CN, He Mifeng, Liu Xin, Tan Kai, Cao Rui's father, Zhang Qian, Gu Zhongzheng, Ye Ting, Wang Liang, Bo Wen, Ah Ba Ah Ba, Fan Bin, CAP, 565026 Zhu Haikun, Liu Wenliang, Xu Spirit, Li Shengkun, Dong Baozhu, Shi Liang, zhi-kun luo, xiao-hua wang, ziyou tsai, Liu Hechun, Wang Canxuan, leisurely Lai Hui, Yuluo, Ren Haojun | nepxion.com, zhi-guo Yang, FuXiSong, Li Yuan fai, John, Sun Peng, ZhangJunChao, yu Huang Bin, Wang Tang star, animal husbandry, Klein
### Topic of the conference

1. Reviewed the PR and issues of the community in the past two weeks and introduced the past dynamics of the community and the work plan of the next two weeks.
2. Cheng Cheng introduced the release planning of the latest Spring Cloud Alibaba 2.2.10-RC1 version and the future demand plan of the community.
### Conclusion of the meeting

1. Explore the possibility of providing a set of custom load balancers so that SCA's current new features based on load balancing can be easily ported to all current main branches.

## Meeting 26:20 22/12/23
### Attendees
RuanSheng, sensible, Cheng park, Wang Canxuan, Liu Hechun, Qin Jiaxing, Andy, zhi-kun luo, He Mi peak, xiao-bing deng, Li Fangxiang, Vic Meng (xian-hui Meng), rebekah, xu ling, mooring smell, Shi Liang, zhang xb doctor zhang, Chen smile double, Wei Fang super, the Fitzwilliam | Wu Weigang (B4F - B094), liu liang, Sun Peng, Tang Jingyu, animal husbandry, Ye Ting, Ye Jieqin, Qu mingyan, Liu Hongzhao, yu Huang Bin, fan, ShiXiangYun, huangtian expensive, Ren Haojun | nepxion.com, cheng wen-lung, building month, Deng Zhengwei, 565026 seats Zhu Haikun, Lingzhi, Zou Ying, Jie Yinquan, Zhang Qian, Li Ming, LAN Pengfei, Wang Xelong, CAP, Yuluo, Deng Jun, Xinyi, Yuan Yun, Wang Jie, Li Xingpeng, Gao Mingjie, Hu Junfeng, Dong Baozhu
### Topic of the conference

1. Reviewed the PR and issues of the community in the past two weeks and introduced the past dynamics of the community and the work plan of the next two weeks.
2. Community Ruan Sheng introduced the content of Spring Cloud Alibaba 2022.0.0.0, which will be released soon, and demonstrated the demo of constructing SCA service registration, discovery and configuration update based on GraalVM technology.
### Conclusion of the meeting

1. Cheng Park introduced that the medium and long-term work of the community in the future will focus on micro-service governance capacity building, and it will provide development resources required by micro-service governance construction for external development contributors in the future.
2. The community will continue to complete the work planning of all components supporting GraalVM, and plan to complete the support of all components as soon as possible in the future and then launch the official version 2022.0.0.0.
## Meeting 25:20 22/12/08
### Attendees
Wang Canxuan, RuanSheng, sensible, Wilson, Ren Haojun | nepxion.com, xu  Meng(Meng Xianhui), Li Yekuan, Li Fangxiang, Wang Jie, Shi Liang, WZeng, Liu Xin, Ning Quan, Tony, Ye Ting, Gao Yuan, Guan Hua, Qiankun, DEV, John, z, Wecheng Weix Sun, Qi Luo, Luo Zhikun, Chen Xiaomin, LogicMeow, Li Jiannan, Zhang Hongwei, CAP, Ye Jianjun, Deng Zhengwei, Li Ming, Xinyi, He Mifeng, Yu Huangbin
### Topic of the conference

1. Reviewed the PR and issues of the community in the past two weeks and introduced the past dynamics of the community and the work plan of the next two weeks.
2. Community Student Ruan Sheng introduced the recent research and practice on SCA connection to Spring Boot 3.0.
### Conclusion of the meeting

1. Discussed the status quo of community adapter Spring Boot 3.0 and arrangement, the community has completed some preliminary rely on upgrading and modification work [# 2948] (https://github.com/alibaba/spring-cloud-alibaba/pull/2948), During the weekly community meeting, it was decided that a new version of Spring Boot 3.0 would be released after the relevant features had been revamped and a Spring Boot 3.0 best practice had been developed.
## Meeting 24:20 22/11/24
### Attendees
Vic  Meng(Meng Xianhui), Yu Huangbin, Cheng Pu, Guo Peng, zhang Erbo, Wang Zhi, Zhang Xuesheng, Yang Boyuan, Zhang Fansheng, \*\* yi, Mu Si, Shimian, iChen, Wang Xiaohua, Liu Liangwen, Li Peikui, \* cheng, Li Fangxiang, \*\* xin, Yang, RedCrazyGhost, Deng Zhengwei, Yu Angang, Zhang Shicheng, Shi Kaiyang, Zhang wei, Wang Zhishun, Bo Wen, As if from another world, Liu Zhimin, Wu Chaoqun, Zhang Hebao, Wang Jie, Shunli, \*\* Kun, Lin Chao
### Topic of the conference

1. Reviewed the PR and issues of the community in the past two weeks and introduced the past dynamics of the community and the work plan of the next two weeks.
2. Chengpu introduced the upcoming open-source cloud native application scaffolding project planned by Ali.
## Meeting 23:20 22/11/10
### Attendees
Chengpu, hth, Ma Zhengbin, Yu Huangbin, Ruan Sheng, \*\* Wei, Bo Wen, Mu Si, Zhang Fansheng, Deng Zhengwei, Xiao Guang, RedCrazyGhost, James, ///, Zhang, Lai Hui, Yu Xiang, Peng Danhua, Yang Jieling, Shi Jindong, Wang Jie, \*\* Peng, LogicMeao, Wu Zheng 13343463815, z, Tony, Yang Boyuan, Li Yuanhui, \*\* Yi, \*\* Da, Qin Jiaxing, \*\* Long
### Topic of the conference

1. Reviewed the PR and issues of the community in the past two weeks and introduced the past dynamics of the community and the work plan of the next two weeks.
2. Community student Musi introduced and demonstrated the Istio function of service authentication and tag routing related micro-service governance capabilities that have been completed in the community
### Conclusion of the meeting

1. Next, the community will continue to enrich the micro-service governance capabilities, and try its best to achieve the traffic governance capabilities of VirtualService and Destination in Istio, so that the majority of users can use the Kubernetes cloud native environment. The flow governance effects of Spring Cloud applications can be achieved through mainstream control surfaces, and work is being planned.
## Meeting 22:20 22/10/27
### Attendees
Contemplating, schoolmate zhang guo-sheng zhang, stars and wu, Adrian wong, Wu Haixin, RuanSheng, yu Huang Bin, wang, Ren Haojun | nepxion.com, Liu Hongzhao, Chengpu, as if from a different generation, sensibu, Mu Si, Wang Jie, Li Yuanhui, Cheng Xingyuan, Lai Hui, Zhong Yuan, RedCrazyGhost, Deng Zhengwei, iChen, \*\* qin, Bo Wen, \*\* * peng, Yang Jieling, Zhang Qian, You Sili, James, \*\* * bing, Lin Zhaoguan, \*\* *🍊, Li Jian, Lei Ping, \*\* Yue, Zhao Haifeng, \*\* Kun, zkzlx, Yaser after blackening
### Topic of the conference

1. Reviewed the PR and issues of the community in the past two weeks and introduced the past dynamics of the community and the work plan of the next two weeks.
2. Cheng describes the completed best practices of containerization deployment of Spring Cloud Alibaba.
### Conclusion of the meeting

1. The reconstruction of NacosWatch class are discussed, the discussion issues [# 2868] (https://github.com/alibaba/spring-cloud-alibaba/issues/2868)
## Meeting 21:20 22/10/13
### Attendees
Li Yuan fai, Deng Zhengwei, Cheng park, animal husbandry, yu Huang Bin, Ren Haojun | nepxion.com, Liu Liangwen, Gu Zhongzheng, RedCrazyGhost, Zhong Yuan, Zhang Jianhong, intelligent, Lai Hui, Ruan Sheng, Zhang Qian, Yuluo, \*\* Yue, Sorie Song Erwa, \*\* cheng, Bo Wen, \*\* shuang, Zhang, Yang Boyuan, \*\* xu, 🐼 Gao Xiang, Luo night
### Topic of the conference

1. Reviewed the PR and issues of the community in the past two weeks and introduced the past dynamics of the community and the work plan of the next two weeks.
2. Introduction of RocketMQ 5.0 supported by Spring Cloud Alibaba, related issues: [#2843](https://github.com/alibaba/spring-cloud-alibaba/issues/2843)
### Conclusion of the meeting

1. Clarify the specific work related to Spring Cloud Alibaba support RocketMQ 5.0. The degree of work objectives and work refinement and claim need to be further determined and refined, which will be discussed in the SCA Docking Rocket 5.0 interest group.
2. Synchronizing the 2nd quarterly Active Contributor plan of the community, in which Li Yuanhui is responsible for Nacos, Deng Zhengwei is responsible for Seata, Chengpu is responsible for follow-up issues and PR support and Q&A of Sentinel and RocketMQ modules.
## Meeting 20:20 22/09/29
### Attendees
Cheng Xingyuan, le pocket, Sorie song two Eva, from Chiang kai-shek, autumn officer, Ren Haojun | nepxion.com, Chengpu, Zhao Ping, Lai Hui, Yang Boyuan, Bo Wen, Wu Qunqun, Liu Liangwen, Mu Si, Li Yuanhui, Huang Biao, \*\* yu, Deng Zhengwei, \*\* yu, Liu Xin, \* Kai, \* nan, \*\* Lin, Zhang Xuesheng, Li Xinhuan, \* wen, Chang Wei, Liu Jun, Senshui, as if from another generation, Peng Yao, Quan Yongqi, \*\* Shuang, Jin Cheng , Zhang Wenming, 4ye, Liu Guinan
### Topic of the conference

1. Reviewed the PR and issues of the community in the past two weeks and introduced the past dynamics of the community and the work plan of the next two weeks.
2. Community Student Lai Hui demonstrated the tag routing function of Spring Cloud Alibaba micro-service governance.
## Meeting 19:20 22/09/15
### Attendees
Huang Rongfeng, Chen Weiming, Hu Fei, Chengpu, Bo Wen, Sun Silong, Zhong Yuan, Sorie Song Erwa, Lai Hui, Liu Liangwen, Zhou Yue, \*\ Da, Yuluo, Wang Jie, James, Deng Zhengwei, Ruan Sheng, Zhang Qian, Liu Guorong, \*\* peng, Ge Zhiye, \*\* Xin, Ma Zilong, CAP, \*\* \* * shuang, Li Han, Cheng Xingyuan, \* Yan
### Topic of the conference

1. Reviewed the PR and issues of the community in the past two weeks and introduced the past dynamics of the community and the work plan of the next two weeks.
2. Community Cheng describes the latest features related to remote hyperactivity and IPv6 service address registration in Spring Cloud Alibaba 2.2.9.RELEASE.
### Conclusion of the meeting

1. The students in the community proposed to create a spring-cloud-alibaba-awesome project in the future to put some community materials, so that external users can better understand SCA through these materials. This requires the participation of students from both inside and outside the community.

## Meeting 18:20 22/09/01
### Attendees
Li Yekuan, FANG Huabao, Ruan Sheng, JAY, Mu Si, iChen, Huang Yuyao, Chengpu, Huang Yihui, Lai Hui, Wang Jie, Qu Mingyang, James, Zhang Fengtao, Xiao Wei, Xiao Wei, Where are we going, Li Yuchang, Sun Silong, Bo Wen, Gong Yi, Liu Liangwen, Zhang Jianhong, Wang Guojian, Chen Xiaoshuang, Yu Huangbin, Li Bo, Chen Haoran, Ma Guoliang (Guoliang), Liu Jun, Liu Yang, Liu Jun, Cheng Xingyuan, Fu Xiaolei, Min Jiao, Han Yu, Chen Guopeng, Song Jipeng
### Topic of the conference

1. Reviewed the PR and issues of the community in the past two weeks and introduced the past dynamics of the community and the work plan of the next two weeks.
2. Invite Lu Turtle, a student from OpenSergo and Dubbo community, to introduce the design of micro-service governance and control surface scheme.
### Conclusion of the meeting

1. The meeting discussed and determined that it is necessary for the subsequent community to provide Spring Cloud Alibaba users with the service registration and discovery capabilities based on Kubernetes. So that users using Spring Cloud Alibaba's micro-service governance capabilities via the Istio & OpenSergo control surface can build micro-services and deploy cloud native applications in the easiest way possible.
## Meeting 17:20 22/08/18
### Attendees
Huang Yihui, Wang Jie, Li Yuanhui, James, Gu Zhongzheng, Sun Silong, Zhang Zhangwen, Chengpu, Huang Yuyao, Yang Yang, Zhong Li, Wang Tangxing - Dingda, Tian Qingzhao, Huang Beijin, Shao Xikai, hth, Cheng Xingyuan, Musi, Bo Wen, Sorie Song Erwa, Zhang Di, Zhang Benxue, JAY, Guan Yu, Bryce Hu, CAI Peng, Liu Bin, Xiao Wei, Xiao Wei, Where are we going, Yuan Dashan, Xu Keming, Lai Hui, Zheng Han, Li Shengkun
### Topic of the conference

1. Reviewed the PR and issues of the community in the past two weeks and introduced the past dynamics of the community and the work plan of the next two weeks.
2. Cheng Cheng introduced the latest progress of Spring Cloud Alibaba's remote multi-activity solution construction.
### Conclusion of the meeting

1. Version 2.2.9 is expected to be released in early September to enable Spring Cloud users to build live micro-service applications based on Spring Cloud Alibaba-related modules.
## Meeting 16:20 22/08/04
### Attendees
Musi, Sorie Song Erwa, Zhang Zhangwen, Chen Yunlong, Chengpu, Huang Yuyao, Shu Tianshu, Lai Hui, James, Xiao Wei, Xiao Wei, Where are we going, Cheng Xingyuan, Sun Silong, Yu Huangbin, Liu Liangwen, Xue Penghui, Wang Yangyang, Liu Xin, Wang Jie, Gu Zhongzheng, CAP, Zhang Qian, John, Li Yuanhui, \*\* kun, Shimian, \*\* Long, \*\* Long, Yang Boyuan, Zhu Letao
### Topic of the conference

1. Reviewed the PR and issues of the community in the past two weeks and introduced the past dynamics of the community and the work plan of the next two weeks.
2. Community student Lai Hui introduced the design scheme of tag route in Spring Cloud Alibaba micro-service governance, and how to connect to external open source micro-service governance control surfaces such as Istio in the future.
### Conclusion of the meeting

1. At present, the community will mainly focus on the construction of micro-service governance. In the first phase, tag routing and service authentication related micro-service governance functions of istio will be completed within the next two months.
2. In addition, the community will also do some Spring Cloud Alibaba micro-service cloud native best practices, related design schemes can be seen in: [#2697](https://github.com/alibaba/spring-cloud-alibaba/issues/2697)
## Meeting 15:20 22/07/21
### Attendees
Yu Huangbin, Musi, Sorie Song Erwa, James, Chengpu, Huang Yuyao, Zhang Kai, Lai Hui, Wang Jie, Xiao Wei, Xiao Wei, Where are we going, Yang Zhiqiang, Jin Cheng, Zhou Shengping, Bo Wen, Liu Liangwen, Gu Zhongzheng, Li Wenchao, Lei Zhupeng, Sun Silong, Yan Yan, Yang Boyuan, Ma Zilong, Ah ah ah, Cheng Xingyuan, CAP, Shimian, Suhe, Ma Guoliang (Guoliang), Li Xiaoshuang, Chen Weiming
### Topic of the conference

1. Reviewed the PR and issues of the community in the past two weeks and introduced the past dynamics of the community and the work plan of the next two weeks.
2. The community invites OpenSergo contributors Shimian and Suhe to introduce the latest progress of OpenSergo project and the future planning of connecting with Spring Cloud Alibaba.
### Conclusion of the meeting

1. In the future, community contributors can write articles using Spring Cloud Alibaba's core features to share related functions with the outside world, and community Week can also plan to share the presentation and introduction of some core components of the project.

## Meeting 14:20 22/07/08
### Attendees
Li Yuan fai, Liu Junhao, Chen Junlian, James, Sun Silong, chun-chieh liu (junjie3. Liu), Lai Hui, liu liang, Zhang Erbai, He Shaohe, Cheng park, Sorie song 2 Eva, Li Ye wide, Tang Zhi, animal husbandry, moored to smell, AnWenBiao, Sky | Xu Yongkang (9 f - B100), jian-hong zhang, hong-wei ma, Cheng Xingyuan, XiaoWei XiaoWei, Where are we going to ah, Huang Yuyao, Hu Wei jie (Ivan), zhi-fang xue, Li Yuchang, the Fitzwilliam | Wu Weigang (B4F-B094), Liu Muyuan, Zhong Li, Xie Xuanhui, Song Jun, Li Shengkun, Liu Ming, Gu Xinxin, Zhang Bowen, Cui Kuai, Chen Weiwei, Zhang Chenghao, Wang Rui, Tang Liang, Li Han, Ma Guoliang (Guoliang), Jie Yinquan, RedCrazyGhost, Zhou Wei, Yu Huangbin, Wang Jie, Li Xiaoshuang, Yang Zeyu, Li Yunlong, Feng Junwei, Wu Wei, Song Yi 
### Topic of the conference

1. Reviewed the PR and issues of the community in the past two weeks and introduced the past dynamics of the community and the work plan of the next two weeks.
2. Li Yuanhui, student of Community Cheng Xingyuan and Summer of Programming, introduced the design and planning of Spring Cloud Alibaba's intelligent fully automated test scheme.
### Conclusion of the meeting

1. The automated test scheme still needs to be further improved and refined, and the test points of related components in Spring Cloud Alibaba should be listed as soon as possible.
## Meeting 13:20 22/06/23
### Attendees
Chengpu, Zishu 🍠, Lai Hui, Shi Xiangyun, Sun Silong, Xiao Wei, Xiao Wei, Where are we going to ah, wangjie, LiQi, upcoming days, animal husbandry, puppy | Wang Shengquan (B - 4 f - C082), KeHaiYong, Lee, yu Huang Bin, Liu Hongzhao, James, seats on building, Peng Hongyou, Sorie song 2 Eva, Huang Yuyao, Sky | Xu Yongkang (9 f - B100), ab (bobi), Guo Kang, Yang, xiao-shuang li, ZhiZePeng, king, the Fitzwilliam | Wu Weigang (B4F-B094), Zheng Li, Cheng Xingyuan, Yang Zeyu
### Topic of the conference

1. Review the PR and issues of the community in the past few weeks and introduce the past dynamics of the community and the work plan of the next two weeks.
2. AppActive Community leader @Just share Aliyun remote living program AppActive.
3. Discuss how the AppActive Remote Reactivity solution can better serve Spring Cloud users through Spring Cloud Alibaba.
### Conclusion of the meeting

1. Spring Cloud Alibaba will next work with the AppActive community to plan the steps for SCA integration with AppActive and the todo list.

## Meeting 12:20 22/06/09
### Attendees
Wang Kang, Zhan Tong, Dahai, LAN Pengfei, mush, Deng Jun, Jin, Zhou Guanghua, Liu Xin, Chengpu, Liu Shuai, Sorie_ Song Er, Ren Kaige, Jiu Jianxian, Zhang Qian, Shi Shenglai, Yang Boyuan, Li Jun, Zhu Yufei, Chen Jun, iChen, Chen Haoran, Bao Yinlei
### Topic of the conference

1. Review the PR and issues of the community in the past few weeks and introduce the past dynamics of the community and the work plan of the next two weeks.
2. Chengpu introduced the planning of Spring Cloud Alibaba community in the next 3 months to students inside and outside the community.
### Conclusion of the meeting

1. The future work center of Spring Cloud Alibaba community will focus on the direction of micro-service framework that brings better use to developers, and focus on three directions of micro-service governance, micro-service application high availability and distributed task scheduling.
## Meeting 11:20 22/05/26
### Attendees
Zhang Bin, xylitol patients, Zhengdong Wang, Jie Wang, Awake Kang Yunzhi, Qi Luo, Haichao Liu, Sorie_Song Er, GUI Yu, Dahai, Xelong Wang, Rongfei Yan, Chaoyu Wang, Chengpu Cheng, Xin Huang, James, Jaime, Yu Yu, Liu Liangwen, Shaohe He, Hui Lai, Lijie Gao, Jianqing Chen, Zhichao Xie, Pengfei Zhang, Qian Zhang, Shengkun Li, Nan Wang, Lu Nie Yi, rebekah, shi-qiang huang, personality, digital center - and rat summer, Lu Zhe, moor-jankowski Austin, ya-jie zhang, RuanSheng, bligh more handsome than (bobi), yet, the Fitzwilliam | Wu Weigang (B4F-B094), Huang Bingliang, Li Miao, Li Yuangao, Li Xiaoshuang, Zhang Xiaokun, Yang Boyuan, Sun Shuaijie, Shao Rong, Lee, CAP, Chen Weiming, Huang Jianfeng, Yun Xing, Yang Jieling, Yu Huangbin, Luo Xinliang, Zhao Runqi
### Topic of the conference

1. Review the PR and issues of the community in the past few weeks and introduce the past dynamics of the community and the work plan of the next two weeks.
2. Liu Liangwen, community Committer, shared related technologies of Spring Cloud Function.
### Conclusion of the meeting

1. The community will conduct follow-up research on Spring Cloud Alibaba's support for Xds protocol to realize the use of Service Mesh technology to provide service governance capabilities for Spring Cloud Alibaba applications.
## Meeting 10:20 22/05/12
### Attendees
Peng Jinhua, iChen, James, Fu Sheng, Xiao Ma Ge (mercyblitz), Zhao Minghao, Chun Shao, Cheng Pu, Sorie_ Song Er, Hu Le, Jaime, Zhang Guobin, Xiao Guang, Zha Quanzhi, Liu Liangwen, He Shaohe, Ayase Xinyuan, Li Xiaowei, Jiang Jinlong, Cheng Xingyuan, Cheng Chuan, Yang Boyuan, Zhang Qian, Xu Hongwei @P Almer. Xu, wang nan, sea, Deng Tong endowment, wangjie, zhang guiquan, Galio | Zhu Tonghui b084 (4 f), zhi-chao xie, Chen Xuguang, hello, NieLuYi, Li Shuangqiang, los night, Xu Spirit, moored to smell, Lu Yupeng, Xu Xiaocheng, li-jun wang, ༾, Li Shengkun, Du Haihang, Liao Xiu, Machine, ng to, Shao Lei, Li Quanjin, Xu Daojie, Wang Gang, Mr. Wang, Huang Yi Dan, handsome, de-fa sun yet
### Topic of the conference

1. Review the PR and issues of the community in the past few weeks and introduce the past dynamics of the community and the work plan of the next two weeks.
2. Chengpu shares the use of Spring Cloud Stream in Spring Cloud Alibaba.
3. Discuss the community's participation in Alibaba Programming Summer topic selection.
### Conclusion of the meeting

1. Confirm that the community will participate in Alibaba Open Source Summer with a topic on RocketMQ and a topic on automated testing.
2. Confirm that Spring Cloud Alibaba 2.2.8 is expected to launch in early June.
## Meeting 9:20 22/04/28
### Attendees
Zhang Qian, Shen Chenyi, Liu Liangwen, Li Cheng, James, Wu Haoyou, Cheng Pu, Yuan Dashan, Zhao Yijun, Dong Weihao, Liang Minghui, Jiang Xiaojia, Ryzain_Li, Jia Qilei, Zi Lu, Sun Zhan, Liu Yuan, Wang Zhengfei, Qiao Lin, Tong Shao, Zhang Jian, Wang Xiangjun! , Zhan Tong, Wang Wei, Chen Bin, Cheng Xingyuan, Wang Mengchen, Li Bo, Xiao Bo, Tang Fan, Xu Chen, Taills, Nian Shuaishuai, Yang Xiaohang, Qi Luo, Tang Hao, Du Xiaobin, Nicky - Daisuke, JueJu, Adam, Kane, bligh weeks longer than (bobi), solution, Huang Junlin, Xu Kaiming, wang yu, Jiang Shuyuan, mooring smell, both sheep and sheep, and the sea, double, Chen Liangang, Yang Boyuan guang-hua zhou, Chen smile, chan kin hung, Jasper, xylitol, Xu Daojie, patients with the Fitzwilliam | Wu Weigang (B4F - B094), Sorie_ song 2, 6, sunny days, sun chess, Ren Haojun | nepxion.com, liu victory, 闫晓栋, CAP, liang, zuo-chen li, NaiDong vladilena, zhang, wars, Chen Guozheng, Li Shengkun, LouJiaBin, Feng Junwei, Galio | Zhu Tonghui (4 f b084), Yang Jieling, Yang Yikun, Wang Yonggang, He Shao-he, Zhu A-Long
### Topic of the conference

1. Review the PR and issues of the community in the past few weeks and introduce the past dynamics of the community and the work plan of the next two weeks.
2. Discussed the selection of two candidate topics for community participation in Open Source Summer and the content planning of Spring Cloud Alibaba 2.2.8 new version in May.
### Conclusion of the meeting

1. Confirmed that the new version of Spring Cloud Alibaba 2.2.8 is mainly to repair the legacy problems and upgrade components on the basis of Spring Cloud Hoxton and Spring Boot 2.3.x, which are widely used by users in the current industry. And samples of microservices best practices for the industry.
## Meeting 8:20 22/04/14
### Attendees
Godtroop, sail boom, wangcheng dress feather, the people, wangjie, RuanSheng, Yang guo, Long Duan bin, Shen Chen yi, wang shuai, puppy | Wang Shengquan (B - 4 f - C082), Ren Haojun | nepxion.com, Hao Longfei, Zhang Zhangwen, iChen, Sun Silong, Yang Boyuan, Chen Yuncong, Peng Feng, ZHI, Xie Yuxiang, Huang Xin, Shi Jian, Xu Zhenjun, Tang Xiangguang, Yang Bin, Liu Shuai, Xue Guangshun, Zhao Yongyong, Fan Zhixue, Chengpu, Ruan Weimin, Wang Xiaowei, Dahai, Shi Jin, Bu Feng, Canghaixiao, Zhan Shengcong, Grey Xiong, Sorie_Song Two (https://github.com...  Guoliang), Bo Wen, Yang Jieling, Ah Ye, Guozhi Chi, Liao Mengge, Luo Zhikun, Xie Hao, Jin Qiang, Mu Zi, Hu Xian, Huang Yisheng, Yan Yan, Hu Guoguang, Xu Daojie, Lu Shun, Huang Zihao, Wu Shanru, Wang Chunlan, Liu Jing, xxx, Jian An, leehom, Deng Yu-min, Qin Yunqiang
### Topic of the conference

1. Review the PR and issues of the community in the past few weeks and introduce the past dynamics of the community and the work plan of the next two weeks.
2. Ren Haojun and Tong Zilong, core members of Nepxion Discovery project, introduced the micro-service management provided by Nepxion Discovery project to the community students.
### Conclusion of the meeting

# 1. In view of the [2018] (https://github.com/alibaba/spring-cloud-alibaba/pull/2494) are discussed in detail, think it is a false demand, community should not to be realized across a set of service calls, Causes the concept of grouping that the framework is designed for to be broken.
2. When submitting issues, external users must pay attention to specifications, and try to provide all content conducive to troubleshooting, including but not limited to framework version, configuration and key code of recurring problems, at one time according to the template, so as to solve the problem faster.
## Meeting 7:20 22/03/31
### Attendees
Yang Jieling, Sorie_Song Er (https://github.com... , pianfeng, liu liang, RuanSheng, Li Zhongguang, xiao-shuang li, the sea, back pot before big fairy, Chen Guizhou, James, promoter, zhang lei, WuQiang macros, Jin Qiang, tung-yu hsieh, Cheng park, shao-jie Yang, XingFei, check all intelligence and Xu Xiaocheng, Ren Haojun | Nepxion.com, Ryzain_Li, lin-jie wang, Yang Ruicong, Zhang Jiong, ABU than (bobi), Ye Cong, rasch, ya-jie zhang, also light, sensible, wen-bo li, chess, dauri, iChen, Huang Haibo, Li Yijuan, guang-ming liu, governing the country, wu tang 飇, shou-chuan Chen, Huang Fu, Xu Kang, Deng Yumin, TongZiLong, Liang Minghui, Cheng Xiong, Solution long weeks, zhang lei, less strong pig, YueGuiLin, spring, Shao Zhipeng, Fx_demon, shi-guo xu, gaoxiang, the Fitzwilliam | Wu Weigang (B4F-B094), Li Cheng, Bo Wen, Xuan Shui, Ma Guoliang (Guoliang), Wang Xuesong - Marketing Campaign Technology, Lao Chao, Yan Yan, Zhong Xiaochao, Yang Mingxu, Li Keyi, Bao Yinlei, Taiyi, esun, Chu Yuwen, Tang Hao, Hu Long, Liang Chuanqi, Wang Xintian
### Topic of the conference

1. Review the PR and issues of the community in the past few weeks and introduce the past dynamics of the community and the work plan of the next two weeks.
2. Discussed issues related to micro-service governance. Students from inside and outside the community as well as Alibaba discussed micro-service governance ability and related standard construction.

### Conclusion of the meeting

1. Micro-service governance capacity building should be divided into functions and stages, which is not a problem that the enterprise has a voice for, but should be done by the community and can be done. For example, some partial operation and maintenance and partial service state capabilities cannot be done by the open source community.
2. In the following weekly meetings, 10 minutes should still be reserved for students outside the community to speak, and the meeting minutes should be timely sent to the open source communication group, so that other students who did not attend the meeting can also know the community dynamics.


## Meeting 6:2022/03/17
### Attendees
Sorie_ song two, James, liu liang, ACTS Kang Zheng, XieYu, Wu Haoyou, Su Yajie, Wu Junjie, thank the new and Ren Haojun | nepxion.com, the Great Demon King, Lu Zhiming, Zhao Ziming, Zhang Bo, Wang Zhishun, Guo Mingxiang, Qian Haifeng (normal line), Jing Yuanhao, Lin Zhaoguan, Sun Silong, Lv Zhong, Liang Qingqing, Xue Gang, Xu Daojie, Yang Yi, Guo Quansi, Nick Zhang Ziheng, Xu Zhuxi, Danqing Ge, You Xiao, Chengpu, Bei Yang, Wang Pengqiang, Wang Guojian, Zhao Zhen, iChen, Ding Yun  B084), zhang kai, Jiang Yujie, yu Huang Bin, hua-rong zhou, xiao-bing deng, Wu Chao, severus, early Liu Yu, Zhang Liming, dauri m, liu zhenzhen, XingXunTao, XingFei, upcoming days, shepherd, Li Shengkun, fructus schisandrae, fancy liu, Alvin | huang Yang bing (4 f - B091), also smell, berth lamp, yun, kermit (Jiang Qimin), kun, Zhu Along, zhang Dan Di, Xu Shiguo, Zong Yuan, Yu Jibiao, Guo Qingzhe, Li Wenbo, Wang Chuan, Bao Yinlei, Bac He, Shi Qiang, Yang Jun, Fan Zhengkai, Yang Bing, Tong Zilong, xxx, Lv Yongle
### Topic of the conference

1. Review the PR and issues of the community in the past few weeks and introduce the past dynamics of the community and the work plan of the next two weeks.
2. The newly joined members of the community introduce themselves to introduce the open source lighting program of CAS.

### Conclusion of the meeting

1. Discussed some representative PR and issues in the community over the past two weeks. Here are some points to note:
- [2442] (https://github.com/alibaba/spring-cloud-alibaba/issues/2442) : RocketMQ automatic reading configuration, reflection, prone to upgrade
- [2468] (https://github.com/alibaba/spring-cloud-alibaba/pull/2468) : the Config to monitor configuration a print, read and success, not read the warning logs
- RocketMQ adds some examples
- [2459] (https://github.com/alibaba/spring-cloud-alibaba/pull/2459) : configuration priority need to improve, to increase the configuration file for the order
2. Determined 8 topics and corresponding mentors to participate in the Open Source Lighting Program of Chinese Academy of Sciences.
## Meeting 5:20 22/03/03
### Attendees
Jin Cheng, Xiu Lian, Shi Jin, Wang Zhennan, Tian Xiaofeng, Nie Zhengbing, Zhu Yangchun, Dahai, Fengqing, Wang Wenjun, Chengpu, Qingluan, Liu Liangwen, Yi Jiangbo, Wang Shengquan, Sorie_Song 'er, Austin, Chen Guizhou, Zhang Yafei, Li Dinglin, Tang Jia, bobi, Hu Huanqi, Xiong Chun, Wang Manhong, Mai Jianhui, Bing Feng, Zhang Zhenyu, Tong Zi Long, Bo Smell, Mr Ho, Zhu Renjie, Ren Haojun | nepxion.com, Chen smile double, guo-liang ma (good), Jerry, Zheng Lingbing, ShuiWa, liu2 guo2 rong2, a third-year
### Topic of the conference

1. Review the PR and issues of the community in the past few weeks and introduce the past dynamics of the community and the work plan of the next two weeks.
2. Community Committer introduces and shares the construction of Spring Cloud Alibaba project integration test.
3. Discuss the implementation of micro-service governance.
### Conclusion of the meeting

1. Spring Cloud Dubbo related problems, continue to maintain the refactor, or remove the dubbo module? It was decided to take the Spring Cloud Dubbo module out of the current trunk branch and maintain it in a separate branch.
2. In view of the open source problem of micro service governance, the community students feel that the current goal is too large to be implemented. It is suggested to investigate the relevant existing service contract capabilities of Spring Boot Admin and other current open source communities.



## Meeting 4:20 22/02/17
### Attendees
Sorie_ song 2, Ren Haojun | nepxion.com, listens, Chen Weiming, Liu Liangwen, Wu Zhiguo, Dahai, iChen, Chengpu, Yu Huangbin, bobi, Zhang Qihang, Li Xiaoshuang, Xu Jiabeng, Peng Zhengguo, Shen Nan, Zhang Chenghao, Tian Ming, Xu Qihua, Jia Zhiheng, Dong Yinuo, Wang Ruoyu, Liu Chuang, Xu Hongcao, Zhang Zhitao, Du Zhan (Xue Guanghong), Guoliang, Qi Li, Li Sheng Kun, Mu Zhen, Jiu Li, Xiong Yuliang, Liang Mengxuan, Zhou Ju, Hu Bo, Zheng Han, Li Jiannan, listen to the white - Han Junwen, Yu Jibiao, Liang clean, season of the season of flying season of flying, Zhang Shaowu, Wang Xiang, Yang Guang, Wu Weichun, Huang Chuanwei, Liu Dexi, LAN Shaohui, Lu Jing, Ou Jianfeng, Wang Hongzhi, Lv Wenfeng, Zhang Ran, Fan Bin, Chen Diyu, pop-wzz, Cer, Li Pengyao , Wu Haoyou, Hu Huan its, xue Ao, smooth, glide zy, tries to male sheep sheep, little star, zhao (ECHO 💫), TongZiLong, Li Shibo, Chen, Mr. Wang, Wei Chenglong, Chen Hong ren, ShengMing, Huang Renyi, jian-lin xu, liu, Guo Zhen following, gucci, Qin Yunqiang, KXD, Duan Chang rich, wen qiang, guo-qiang wu, wang feng, zhang lei, NiuLu, Wu Jiapeng
### Topic of the conference
1. Introduce new committers in the community, send special commemorative prizes to students who have contributed codes to the community in the past, and link to receive souvenir registration (valid date: 02/17/10:00 am~02/22/18:00 pm) : [https://ding.cjfx.cn/f/ii88khje](https://ding.cjfx.cn/f/ii88khje)
2.Review the PR of the community in the past few weeks, the past dynamics of the community and the work plan for the next two weeks.
3. Discuss Spring Cloud Alibaba micro-service governance.
### Discussion points

1. For dubbo related problems, continue to maintain the refactor or remove the dubbo module?
2. Discuss the SCA version number. Should we start with SCA 2021.2 in Spring Cloud version +1 or 2021 and align SC 2021 or 2022 with Spring Cloud version?
3. Do you need the official website of SCA?
4. Discussion on the new micro-service governance module

4.1 Naming the New Module
4.2 Is Sentinel-dashboard Reasonable for the Service Contract Console? Another console? Or do you build a console that belongs to SCA and hyperlinks to Sentinel-dashboard and Nacos-dashboard?
4.3 Contract security, contract non-code intrusion, contract exposure (such as integration on the gateway) and other issues?
4.3 Long-term planning of Service contract module, reflection on subsequent functions of service contract, whether to integrate OpenTelemetry in the future? Do you need to access monitoring services such as Prometheus?

5. Systematic testing, automatic systematic and comprehensive testing of all components of SCA, is a valuable intentional effort.



## Meeting 3:20 22/01/20
### Attendees
Wang Shengquan, long lee Cheng, cypress, Cheng park, clean, Zhang Yi and B28, hai-bin huang liang, Tang star, patients with xylitol, Zhang Yunjiang, party governing the country well sequence, wine sword play, wu, yu Huang Bin, Sorie_ two, upcoming days, Chen song, liu liang, the Fitzwilliam, |, Wu Weigang, iChen, positive, deng pichead amornsomboon, niuzian, tung-yu hsieh, Li Bozhen, Yang Yue, Zong Qi, Xie Fei, Li Wenbo, Sun Shaoping, Karen, Tong Zilong, Xu Yongkang, Zhu Sen, Chun Shao, Liu Guojie, Li Xiaoshuang, Wang Xuyang, Le 'er's Yangyang, Golfey, Chen Xiaoshuang, Fu Yike, Li Weiyang, Jason, jackhu, Ren He, Lei Ke, Dahai, Zhang Le, Gu Jiachun, Bo Wen, Dang Kang, bobi, Xiao Ze - Huang Zebin -SCM R & D Technology Department, Song Kui, kxd
### Content of the meeting
1. The students in the community discussed and dealt with the new PR and issues that emerged in the last two weeks, mainly concerning the new features supporting Spring Boot 2.4.x version.
2. Invited Popbi from Alibaba Cloud micro service governance team to introduce the open source Spec content of micro service governance that Alibaba will mainly promote in the future and the preliminary plan of landing relevant content in Spring Cloud Alibaba community.


## Meeting 2:20 22/01/06
### Attendees
Liu Liangwen, Yu Huangbin (Zhejiang Liupintang Education Technology Co., LTD.), Bing Feng, Bu Bi (Ali), Yan Yan (Student), Chengpu (Ali), Bo Wen (Ali)
### Content of the meeting
1. Community students discussed and dealt with the new PR and issues that emerged in the last two weeks together, and discussed that the main community work and planning in the next two weeks is to adapt to a new version of Spring Cloud 2021.x and other components.
2. The moderator took you through the latest developments of Spring's official blogs over the last two weeks and discussed some of the newer technologies.

## Meeting 1:21/12/23
### Attendees
Ye Xuanyu, Tong Zilong, Yu Huangbin (Zhejiang Liupintang Education Technology Co., LTD.), Bingfeng, Xiaomagge (self-employed), Chunshao (Tencent), Bubi (Ali), Yidan (Ali), Chengpu (Ali)
### Content of the meeting
1. Discussed the organization form and content of the community biweekly meeting

- Discussed the development form of Community week meeting, reviewed past issues and PR on GitHub, and discussed relevant information. At present, the community biweekly meeting is mainly for the core participants of the community to discuss the feasibility of gradual opening.

2. Discussed the possible future work content and evolution direction of the community

- Classify the remaining issues and deal with the remaining issues in time.
- Spring Cloud Alibaba support for Dubbo 3.0 and RocketMQ 5.0.
- Improve community-related development documents and lower the threshold of community participation so as to attract more students to participate in the community.
- Discuss whether Spring Cloud Alibaba can functionalize some components to embrace responsive programming.
- Discuss whether Spring Cloud Alibaba can provide some basic operational testing capabilities such as tag routing, grayscale, monitoring, and a Spring Boot Admin-like console.