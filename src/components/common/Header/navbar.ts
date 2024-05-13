import DocsMenu from "./DocsMenu.astro";
import CommunityMenu from "./CommunityMenu.astro";
import LearnMenu from "./LearnMenu.astro";
import SolutionsMenu from "./SolutionsMenu.astro";


export default [
  {
    label: "文档",
    translations: {
      en: "DOCS",
    },
    trigger: "hover",
    slot: DocsMenu,
    position: "absolute",
    activePath: ["/docs"],
  },
  {
    label: "社区",
    translations: {
      en: "COMMUNITY",
    },
    trigger: "hover",
    relativePosition: 'page',
    slot: CommunityMenu,
    position:"absolute",
    activePath: ["/news", "/activity", "/blog", "/docs/ebook/", "/download"],
  },
  {
    label: "博客",
    translations: {
      en: "BLOG",
    },
    trigger: "click",
    target: "_self",
    route: "/blog/",
  },
  {
    label: "学习",
    translations: {
      en: "LEARN",
    },
    trigger: "hover",
    slot: LearnMenu,
    position: "absolute",
    relativePosition: 'page',
    activePath: ["/learn"],
  },
  {
    label: "解决方案",
    translations: {
      en: "SOLUTIONS",
    },
    trigger: "hover",
    slot: SolutionsMenu,
    position: "absolute",
    relativePosition: 'page',
    activePath: ["solutions"],
  },
  {
    label: "专家答疑审阅后归档",
    translations: {
      en: "wuyi",
    },
    trigger: "click",
    target: "_self",
    route: "/wuyi/",
    activePath: ["/wuyi"],
  },
];