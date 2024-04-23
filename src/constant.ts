import type { Customer, Solution, ChooseReason, CommunityLink, ContributeLink } from "@/types"
import { getEntries } from "astro:content";

// Place any global data in this file.
// You can import this data from anywhere in your site by using the `import` keyword.

// TODO: 配置algolia
export const ALGOLIA = {
  appId: '1QV814950M',
  apiKey: '7445da3dec050d45d29f3fe93ed45af3',
  indexName: 'nacos'
}

// 文档根据版本区分的提示banner
export const DOCS_BANNER = {
  latest: '',
  next:'',
  v1: '',
  v2:'',
}

// TODO: 文档Header数据
export const DOCS_ITEM = [
  {
    key: "2023",
    label: "2023.0.0.0-RC1",
    target: "_self",
    link: "/docs/2023/overview/what-is-sca/",
    translations: {
      en: "2023.0.0.0",
      link: "/en/docs/2023/overview/what-is-sca/",
    }
  },
  {
    key: "2022",
    label: "2022.0.0.0",
    target: "_self",
    link: "/docs/2022/overview/what-is-sca/",
    translations: {
      en: "2022.0.0.0",
      link: "/en/docs/2022/overview/what-is-sca/",
    }
  },
  {
    key: "2021",
    label: "2021.0.5.0",
    target: "_self",
    link: "/docs/2021/overview/what-is-sca/",
    translations: {
      en: "2021.0.5.0",
      link: "/en/docs/2021/overview/what-is-sca/",
    }
  },
  {
    key: "2.2.x",
    label: "2.2.x",
    target: "_self",
    link: "/docs/2.2.x/overview/what-is-sca/",
    translations: {
      en: "2023.0.0.0",
      link: "/en/docs/2.2.x/overview/what-is-sca/",
    }
  },
];

// 主要特性
export const CHOOSE_REASON_LIST: ChooseReason[] = [
  {
    title: "home.website.edge.1.title",
    svgKey: "easy",
    description: "home.website.edge.1.description",
  },
  {
    title: "home.website.edge.2.title",
    svgKey: "adaptive",
    description: "home.website.edge.2.description",
  },
  {
    title: "home.website.edge.3.title",
    svgKey: "timeTested",
    description: "home.website.edge.3.description",
  },
  {
    title: "home.website.edge.4.title",
    svgKey: "variety",
    description: "home.website.edge.4.description",
  },
]

// 合作客户反馈
export const COMPANY_CUSTOMERS: Customer[] = [
  {
    name: "cloud.feedback.soul.name",
    theme: "gray",
    logo: "https://img.alicdn.com/imgextra/i2/O1CN01GZhEqR1bY3dY5SOuY_!!6000000003476-2-tps-160-130.png",
    href: "https://code.alibaba-inc.com/goat/astro-nacos",
    description: "cloud.feedback.soul.description",
  },
  {
    name: "cloud.feedback.laidian.name",
    theme: "dark",
    logo: "https://img.alicdn.com/imgextra/i3/O1CN010ulPrT1M45UNBCAXe_!!6000000001380-2-tps-160-130.png",
    href: "https://developer.aliyun.com/article/855894",
    description: "cloud.feedback.laidian.description",
  },
  {
    name: "cloud.feedback.zeekr.name",
    theme: "light",
    logo: "https://img.alicdn.com/imgextra/i2/O1CN01zluUCK29BKvOCojPr_!!6000000008029-2-tps-160-130.png",
    href: "https://developer.aliyun.com/article/1173573",
    description: "cloud.feedback.zeekr.description",
  },
  {
    name: "cloud.feedback.ykc.name",
    theme: "gray",
    logo: "https://img.alicdn.com/imgextra/i1/O1CN01LWMfwx1Ggf9VGmXBF_!!6000000000652-2-tps-160-130.png",
    href: "https://developer.aliyun.com/article/1172572?groupCode=mse",
    description: "cloud.feedback.ykc.description",
  },
  {
    name: "cloud.feedback.bosideng.name",
    theme: "dark",
    logo: "https://img.alicdn.com/imgextra/i2/O1CN01d7EDXs1HLsnXSTgGG_!!6000000000742-2-tps-160-130.png",
    href: "https://developer.aliyun.com/article/1147221?groupCode=mse",
    description: "cloud.feedback.bosideng.description",
  },
  {
    name: "cloud.feedback.skechers.name",
    theme: "light",
    logo: "https://img.alicdn.com/imgextra/i1/O1CN01P1k9gA1YpVsxPYzAw_!!6000000003108-2-tps-160-130.png",
    href: "https://developer.aliyun.com/article/844814",
    description: "cloud.feedback.skechers.description",
  },
  {
    name: "cloud.feedback.very.name",
    theme: "gray",
    logo: "https://img.alicdn.com/imgextra/i1/O1CN01DevTFA28W7HY1JFC6_!!6000000007939-2-tps-160-130.png",
    href: "https://developer.aliyun.com/article/992090",
    description: "cloud.feedback.very.description",
  },
  {
    name: "cloud.feedback.helian.name",
    theme: "dark",
    logo: "https://img.alicdn.com/imgextra/i3/O1CN01YmUBmh1snwqr4kRot_!!6000000005812-2-tps-544-180.png",
    href: "https://developer.aliyun.com/article/1095573",
    description: "cloud.feedback.helian.description",
  },
  {
    name: "cloud.feedback.zhijin.name",
    theme: "light",
    logo: "https://img.alicdn.com/imgextra/i3/O1CN015GIqM31qsPTObt2CV_!!6000000005551-2-tps-544-180.png",
    href: "https://developer.aliyun.com/article/1064881",
    description: "cloud.feedback.zhijin.description",
  },
];

// 解决方案列表
export const SOLUTION_LIST: Solution[] = [
  {
    checked: true,
    src: "https://help.aliyun.com/zh/mse/use-cases/implement-high-availability-capabilities-of-mse-microservices-registry/?spm=a2c4g.11186623.0.0.102a27e0juv8vG",
    title: "home.solutions.card.1",
    keyword: [
      "home.solutions.card.keyword.high_availability",
      "home.solutions.card.keyword.multi_availability",
      "home.solutions.card.keyword.multi_data",
      "home.solutions.card.keyword.disaster_recovery_protect",
    ],
  },
  {
    checked: false,
    src: "https://help.aliyun.com/zh/mse/use-cases/migration-solution-based-on-mse-sync/?spm=a2c4g.11186623.0.0.13f12318fSap49",
    title: "home.solutions.card.2",
    keyword: [
      "home.solutions.card.keyword.data_synchronization_migration",
      "home.solutions.card.keyword.smooth_migration",
      "home.solutions.card.keyword.migration_high_availability",
      "home.solutions.card.keyword.easy_use",
    ],
  },
  {
    checked: false,
    src: "https://developer.aliyun.com/article/1265016?spm=5176.21213303.J_qCOwPWspKEuWcmp8qiZNQ.10.c89e2f3dQa2WtF&scm=20140722.S_community@@%E6%96%87%E7%AB%A0@@1265016._.ID_community@@%E6%96%87%E7%AB%A0@@1265016-RL_%E4%BA%91%E5%8E%9F%E7%94%9F%E7%BD%91%E5%85%B3%E5%A6%82%E4%BD%95%E5%AE%9E%E7%8E%B0%E5%AE%89%E5%85%A8%E9%98%B2%E6%8A%A4%E8%83%BD%E5%8A%9B-LOC_llm-OR_ser-V_3-RK_rerank-P0_2",
    title: "home.solutions.card.3",
    keyword: [
      "home.solutions.card.keyword.three_in_one",
      "home.solutions.card.keyword.safety",
      "home.solutions.card.keyword.plugin_ecosystem",
      "home.solutions.card.keyword.application_firewall",
    ],
  },
  {
    checked: false,
    src: "https://help.aliyun.com/zh/mse/use-cases/implement-graceful-start-and-shutdown-of-microservice-applications-by-using-mse/?spm=a2c4g.11186623.0.0.385116bftBJhAY",
    title: "home.solutions.card.4",
    keyword: [
      "home.solutions.card.keyword.lossless",
      "home.solutions.card.keyword.multi_availability",
      "home.solutions.card.keyword.grayscale",
      "home.solutions.card.keyword.service_governance",
    ],
  },
];

// 文档贡献板块的链接列表
export const getCommunityLinkList = (t: Function): CommunityLink[] => [
  {
    href: `/blog`,
    text: t("rightSidebar.readBlog"),
    icon: "basil:document-outline",
  },
  {
    href: 'https://github.com/spring-cloud-alibaba-group/spring-cloud-alibaba-group.github.io/blob/main/src/content/docs',
    text: t("rightSidebar.github"),
    icon: "ant-design:github-filled",
  },
];



// 文档社区板块的链接列表
export const getContributeLinkList = (lang: string, editHref: string, feedbackUrl: string, t: Function): ContributeLink[] => [
  {
    // href: `/${lang}/v2/contribution/contributing`,
    href: '/docs/developer/contributor-guide/new-contributor-guide_dev/',
    text: t("rightSidebar.contributorGuides"),
    depth: 2,
    icon: "tabler:book",
  },
  {
    href: editHref,
    text: t("rightSidebar.editPage"),
    depth: 2,
    icon: "tabler:pencil",
  },
  {
    href: feedbackUrl,
    text: t("rightSidebar.feedbackIssue"),
    depth: 2,
    icon: "ant-design:github-filled",
  },
];

export const i18nMap = {
  "blog": {
    article: 'blog.article.technical',
    case: 'blog.article.case.best.practices',
    ecosystem: 'blog.article.ecosystem.articles',
    all: 'blog.all.articles'
  },
  "news": {
    announcement: 'blog.activity.community.announcement',
    release: 'blog.activity.release.statement',
    committer: 'page.blog.news.personnel.promotion',
    cooperate: 'page.blog.news.community.cooperation',
    all: 'page.blog.news.all'
  },
  "activity": {
    'announcement': 'blog.activity.community.announcement',
    'activity-preview': 'blog.activity.preview.event',
    'activity-detail': 'blog.activity.detail.event',
    'all': 'blog.activity.all.event'
  },
  "learn": {
    'spring': 'learn.spring.title',
    'spring-boot': 'learn.spring-boot.title',
    'spring-cloud': 'learn.spring-cloud.title',
    'spring-cloud-alibaba': 'learn.spring-cloud-alibaba.title',
    'all': 'learn.all.title'
  }
};

export const BLOG_CATEGORY = [
  {
    type: 'article',
    title: '技术文章',
    href: '/blog/article'
  },

  {
    type: 'ecosystem',
    title: '生态文章',
    href: '/blog/ecosystem'
  },
  {
    type: 'case',
    title: '最佳实践',
    href: '/blog/case'
  },
  {
    type: 'all',
    title: '全部文章',
    href: '/blog/all'
  },
];

export const LEARN_CATEGORY = [
  {
    type: 'spring',
    title: 'Spring',
    href: '/learn/spring/'
  },

  {
    type: 'spring-boot',
    title: 'Spring Boot',
    href: '/learn/spring-boot/'
  },
  {
    type: 'spring-cloud',
    title: 'Spring Cloud',
    href: '/learn/spring-cloud/'
  },
  {
    type: 'spring-cloud-alibaba',
    title: 'Spring Cloud Alibaba',
    href: '/learn/spring-cloud-alibaba/'
  },
  {
    type: 'all',
    title: '全部文章',
    href: '/learn/all/'
  },
];

export const HEADER_ACTIVITY_CARD = [
  {
    "collection": "blog",
    "slug": "news/ospp-2024",
    "description": "Spring Cloud Alibaba 编程之夏报名启动！",
    "imageUrl": "https://img.alicdn.com/imgextra/i2/O1CN01Gh8wq71CApBVywPq3_!!6000000000041-0-tps-800-1000.jpg",
  },
  {
    "collection": "blog",
    "slug": "news/attend-a-meeting",
    "description": "参加社区双周会！",
    "imageUrl": "https://img.alicdn.com/imgextra/i2/O1CN01Gh8wq71CApBVywPq3_!!6000000000041-0-tps-800-1000.jpg",
  }
];

export const HEADER_LEARN_CARD = [
  {
    collection: "blog",
    slug: "learning/spring-boot/core",
    description: "最全面的 Spring 中文系列教程，从这里开启你的 Spring 应用开发之旅！",
    imageUrl:
      "https://img.alicdn.com/imgextra/i1/O1CN01xDVfHk1El7oBMjL3p_!!6000000000391-2-tps-1083-721.png",
  },
];

export const HEADER_SOLUTIONS_CARD = [
  {
    collection: "blog",
    slug: "release-nacos110",
    blankUrl: 'https://www.aliyun.com/product/aliware/mse',
    description: "阿里云 MSE 微服务引擎",
    imageUrl:
      "https://img.alicdn.com/imgextra/i2/O1CN011815Q71wQpLpuKYeC_!!6000000006303-0-tps-1284-721.jpg",
  },
];

export const BLOG_IMAGE_SOURCE = [
  "https://img.alicdn.com/imgextra/i1/O1CN0114MKuq1qKyZ0heOq7_!!6000000005478-2-tps-304-179.png",
  "https://img.alicdn.com/imgextra/i2/O1CN01E4YfjD1WmBmWymUJC_!!6000000002830-2-tps-608-358.png",
  "https://img.alicdn.com/imgextra/i1/O1CN01o9sjZA1Efd1bMrl0C_!!6000000000379-2-tps-608-358.png",
  "https://img.alicdn.com/imgextra/i1/O1CN011wgjV01CZ695M8OEB_!!6000000000094-2-tps-608-358.png",
  "https://img.alicdn.com/imgextra/i2/O1CN01swoIUH1csxKPKfwJE_!!6000000003657-2-tps-608-358.png",
  "https://img.alicdn.com/imgextra/i4/O1CN01nIy1Wf1DjSiy0TCxe_!!6000000000252-2-tps-608-358.png",
  "https://img.alicdn.com/imgextra/i3/O1CN019EjKf11Dj0KQKkP3e_!!6000000000251-2-tps-608-358.png",
  "https://img.alicdn.com/imgextra/i2/O1CN01l7gM7r1Y4L5ngHWb8_!!6000000003005-2-tps-608-358.png",
  "https://img.alicdn.com/imgextra/i2/O1CN01oWfLB51kfENwUFaQw_!!6000000004710-2-tps-608-358.png"
];

export const MICROSERVICE_SOLUTION = [
  { title: 'Nacos', image: '/assets/2-1.jpg', detailTitle: "home.introduction.detailTitle.1", detail: 'home.introduction.detail.1' },
  { title: 'Sentinel', image: '/assets/2-2.jpg', detailTitle: 'home.introduction.detailTitle.2', detail: 'home.introduction.detail.2' },
  { title: 'Seata', image: '/assets/2-3.jpg', detailTitle: 'home.introduction.detailTitle.3', detail: 'home.introduction.detail.3' },
  { title: 'RocketMQ', image: '/assets/2-4.jpg', detailTitle: 'home.introduction.detailTitle.4', detail: 'home.introduction.detail.4' },
  { title: 'AI', image: '/assets/2-5.jpg', detailTitle: 'home.introduction.detailTitle.5', detail: 'home.introduction.detail.5' },
  { title: 'Spring Boot', image: '/assets/2-6.jpg', detailTitle: 'home.introduction.detailTitle.6', detail: 'home.introduction.detail.6' },
  { title: 'Spring', image: '/assets/2-7.jpg', detailTitle: 'home.introduction.detailTitle.7', detail: 'home.introduction.detail.7' },
];

export const ProductDisplayCardData = [
  {
    cover: "https://img.alicdn.com/imgextra/i2/O1CN01psWBwW1tzgeAxapCz_!!6000000005973-0-tps-2448-3672.jpg",
    coverPosition: "bottom",
    title: "Nacos",
    body: "home.introduction.card.Nacos.des",
  },
  {
    cover: "https://img.alicdn.com/imgextra/i2/O1CN01l9eXcR1LJN7PxX79e_!!6000000001278-0-tps-1000-1500.jpg",
    coverPosition: "bottom",
    title: "RocketMQ",
    body: "home.introduction.card.RocketMQ.des",
  },
  {
    cover: "https://img.alicdn.com/imgextra/i2/O1CN01HzKXZY29J7h0UIGJ5_!!6000000008046-0-tps-1000-1500.jpg",
    coverPosition: "bottom",
    title: "Sentinel",
    body: "home.introduction.card.Sentinel.des",
  },
  {
    cover: "https://img.alicdn.com/imgextra/i3/O1CN01bJroU81BzNHfeB3jN_!!6000000000016-0-tps-1000-1500.jpg",
    coverPosition: "bottom",
    title: "Seata",
    body: "home.introduction.card.Nacos.des",
  },
  {
    cover: "https://img.alicdn.com/imgextra/i2/O1CN01HzKXZY29J7h0UIGJ5_!!6000000008046-0-tps-1000-1500.jpg",
    coverPosition: "bottom",
    title: "Spring AI",
    body: "home.introduction.card.AI.des",
  },
  {
    cover: "https://img.alicdn.com/imgextra/i2/O1CN01k1amBw1U0RHtPPlvH_!!6000000002455-0-tps-1000-1500.jpg",
    coverPosition: "bottom",
    title: "Spring Boot",
    body: "home.introduction.card.Boot.des",
  },
  {
    cover: "https://img.alicdn.com/imgextra/i3/O1CN01WxXILZ1C0I4pkZUyD_!!6000000000018-0-tps-1000-1500.jpg",
    coverPosition: "bottom",
    title: "Spring Cloud",
    body: "home.introduction.card.Cloud.des",
  },
];

export const categoryMap = {
  article: "blog_article",
  case: "blog_case",
  ecosystem: "blog_ecosystem",
  release: "news_release",
  committer: "news_personnel",
  announcement: "news_announcement",
  cooperate: "news_cooperate",
  "activity-preview": "activity_activity-preview",
  "activity-detail": "activity_activity-preview",
};

//获取顶部导航悬浮层 博客列表信息
export const getBlogContentList = async (blogList = []) => {

  const simplifiedPosts = blogList.map((item) => ({
    collection: item.collection,
    slug: item.slug,
  }));
  const blogDescrip = blogList.map((item) => item.description);

  const blogImgs = blogList.map((item) => item.imageUrl);
  const posts = (await getEntries(simplifiedPosts as any)) || [];
  const blankUrl = blogList.map((item) => item.blankUrl);

  return {
    blogDescrip,
    blogImgs,
    posts,
    blankUrl
  };
}

export const COMMUNITY_MENU_LIST = [
  {
    label: "社区",
    translations: {
      en: "COMMUNITY",
    },
    children: [
      {
        label: "报告文档问题",
        target: "_blank",
        link: "https://github.com/spring-cloud-alibaba-group/spring-cloud-alibaba-group.github.io/issues",
        translations: {
          en: "Report a doc issue",
        },
      },
      {
        label: "贡献社区",
        target: "_blank",
        link: 'https://github.com/alibaba/spring-cloud-alibaba/pulls',
        translations: {
          en: "Contribute community",
        },
      },
      {
        label: "贡献者",
        target: "_blank",
        link: 'https://github.com/alibaba/spring-cloud-alibaba/graphs/contributors',
        translations: {
          en: "Contributors",
        },
      },
    ],
  },
  {
    label: "资源",
    translations: {
      en: "Resources",
    },
    children: [
      {
        label: "博客",
        target: "_self",
        link: "/blog/",
        translations: {
          en: "Blog",
        },
      },
      {
        label: "电子书",
        target: "_self",
        link: "/docs/ebook/srekog/",
        translations: {
          en: "E-book",
        },
      },
    ],
  },
];

export const LEARN_CARD_LIST= [
  {
    title: "Spring 教程",
    description: "零基础学习 Spring Framework 核心概念，包括依赖注入、AOP、REST 等。",
    href: "/learn/spring/",
  },
  {
    title: "Spring Boot 教程",
    description: "快速掌握构建生产级别应用，覆盖自动配置、数据库交互、微服务构建等。",
    href: "/learn/spring-boot/",
  },
  {
    title: "Spring Cloud 教程",
    description: "学习微服务地址发现、配置管理、路由、负载均衡、断路器和分布式消息传递",
    href: "/learn/spring-cloud/",
  },
  {
    title: "微服务治理教程",
    description: "阿里巴巴等企业实践总结，涵盖灰度发布、限流降级、流量管控等高阶微服务治理能力。",
    href: "/docs/ebook/srekog/",
  }
];

export const SOLUTIONS_CARD_LIST = [
  {
    title: "注册配置中心高可用最佳实践",
    description:
      "提供 Nacos/ZooKeeper/Eureka 的商业化托管服务。",
    href: "https://help.aliyun.com/zh/mse/use-cases/implement-high-availability-capabilities-of-mse-microservices-registry?spm=a2c4g.11186623.0.0.102a27e0juv8vG",
  },
  {
    title: "云原生网关如何实现安全防护能力",
    description:
      "提供符合 K8s Ingress 标准的下一代网关，将流量网关、微服务网关和 WAF 安全网关三合一。",
    href: "https://developer.aliyun.com/article/1265016?spm=5176.21213303.J_qCOwPWspKEuWcmp8qiZNQ.10.c89e2f3dQa2WtF&scm=20140722.S_community@@%E6%96%87%E7%AB%A0@@1265016._.ID_community@@%E6%96%87%E7%AB%A0@@1265016-RL_%E4%BA%91%E5%8E%9F%E7%94%9F%E7%BD%91%E5%85%B3%E5%A6%82%E4%BD%95%E5%AE%9E%E7%8E%B0%E5%AE%89%E5%85%A8%E9%98%B2%E6%8A%A4%E8%83%BD%E5%8A%9B-LOC_llm-OR_ser-V_3-RK_rerank-P0_2",
  },
  {
    title: "全链路灰度与优雅上下线",
    description:
      "原生支持 Spring Cloud/Dubbo/Sentinel，提供丰富的流量治理和流量防护功能。",
    href: "https://help.aliyun.com/zh/mse/use-cases/implement-an-end-to-end-canary-release-by-using-mse-cloud-native-gateways?spm=a2c4g.11186623.0.i3",
  },
  {
    title: "应用实时监控",
    description:
      "作为云原生可观测平台，ARMS 提供全栈性能监控告警与端到端追踪诊断能力。",
    href: "https://help.aliyun.com/zh/arms/?spm=5176.8140086.J_5253785160.8.3e87be45mtM0kX",
  },
];