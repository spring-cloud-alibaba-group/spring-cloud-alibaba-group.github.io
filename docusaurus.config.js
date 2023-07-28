// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require("prism-react-renderer/themes/github");

const commonDocsOptions = {
  //是否显示面包屑导航
  breadcrumbs: true,
  // 是否显示最后更新作者
  showLastUpdateAuthor: true,
  // 是否显示最后更新时间
  showLastUpdateTime: true,
};

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: "Spring Cloud Alibaba",
  favicon: "img/favicon.png",
  themes: [
    require.resolve("@easyops-cn/docusaurus-search-local"),
    /** @type {import("@easyops-cn/docusaurus-search-local").PluginOptions} */
  ],
  // Set the production url of your site here
  url: "https://sca.aliyun.com",
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: "/",

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: "alibaba", // Usually your GitHub org/user name.
  projectName: "Spring Cloud Alibaba", // Usually your repo name.

  onBrokenLinks: "throw",
  onBrokenMarkdownLinks: "warn",

  // Even if you don't use internalization, you can use this field to set useful
  // metadata like html lang. For example, if your site is Chinese, you may want
  // to replace "en" with "zh-Hans".
  clientModules: [
    require.resolve("./src/myClientModule.ts"),
    require.resolve("./src/custom-js.ts"),
  ],
  i18n: {
    defaultLocale: "default",
    locales: ["en-us", "zh-cn", "default"],
    localeConfigs: {
      "en-us": {
        label: "En",
        htmlLang: "en-US",
      },
      "zh-cn": {
        label: "中",
        htmlLang: "zh-CN",
      },
    },
  },
  scripts: [
    { src: "//g.alicdn.com/mamba/mse-arc-ui/0.0.3/umd/mse-arc-ui.min.js" },
    {
      src: "//g.alicdn.com/alilog/mlog/aplus_v2.js",
      id: "beacon-aplus",
      exparams: "clog=o&aplus&sidx=aplusSidx&ckx=aplusCkx",
    },
    {
      src: "//g.alicdn.com/aes/??tracker/1.0.34/index.js,tracker-plugin-pv/2.4.5/index.js,tracker-plugin-event/1.2.5/index.js,tracker-plugin-jserror/1.0.13/index.js,tracker-plugin-api/1.1.14/index.js,tracker-plugin-perf/1.1.8/index.js,tracker-plugin-eventTiming/1.0.4/index.js",
    },
    {
      src: "https://www.googletagmanager.com/gtag/js?id=G-NP3B57ZGEF",
      async: true,
    },
  ],
  stylesheets: [
    {
      href: "//g.alicdn.com/mamba/mse-arc-ui/0.0.3/umd/mse-arc-ui.min.css",
    },
  ],
  plugins: [
    "docusaurus-plugin-sass",
    [
      "content-docs",
      /** @type {import('@docusaurus/plugin-content-docs').Options} */
      ({
        id: "community",
        path: "community",
        routeBasePath: "/community",
        sidebarPath: require.resolve("./sidebarCommunity.json"),
        ...commonDocsOptions,
      }),
    ],
  ],
  presets: [
    [
      "classic",
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve("./sidebars.js"),
          editUrl: ({ docPath, locale }) => {
            return `https://github.com/spring-cloud-alibaba-group/spring-cloud-alibaba-group.github.io/blob/main/i18n/${locale}/docusaurus-plugin-content-docs/current/${docPath}`;
          },
          lastVersion: "2022.0.0.0",
          versions: {
            "2.2.10-RC1": {
              banner: "none",
            },
            "2022.0.0.0": {
              // Add routing path configuration to solve the release notes mapping problem when the version is released
              path: "/2022.0.0.0",
              banner: "none",
            },
            "2021.0.5.0": {
              banner: "none",
            },
          },
        },
        blog: {
          showReadingTime: true,
          blogSidebarTitle: "全部博文",
          blogSidebarCount: "ALL",
          editUrl: ({ blogPath, locale }) => {
            return `https://github.com/spring-cloud-alibaba-group/spring-cloud-alibaba-group.github.io/blob/main/i18n/${locale}/docusaurus-plugin-content-blog/${blogPath}`;
          },
        },
        theme: {
          customCss: require.resolve("./src/css/custom.scss"),
        },
        gtag: {
          trackingID: "G-NP3B57ZGEF",
          anonymizeIP: true,
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      metadata: [{ name: "keywords", content: "Spring Cloud Alibaba, 微服务" }],
      // Replace with your project's social card
      image: "img/logo.png",
      colorMode: {
        defaultMode: "light",
        disableSwitch: true, // 切换主题模式开关
        respectPrefersColorScheme: false,
      },
      navbar: {
        hideOnScroll: true,
        title: "",
        logo: {
          alt: "Spring Cloud Alibaba logo",
          src: "img/spring_cloud_alibaba_colorful.png",
          style: { marginTop: "4px", maxWidth: "180px", height: "auto" },
        },
        items: [
          {
            label: "Home",
            to: "/",
            activeBaseRegex: "^/$",
            position: "right",
          },
          {
            type: "docsVersionDropdown",
            label: "Docs",
            docid: "/overview/what-is-sca",
            position: "right",
            dropdownItemsAfter: [
              {
                label: "All Versions",
                to: "/versions",
              },
            ],
            dropdownActiveClassDisabled: true,
          },
          {
            type: "dropdown",
            label: "MicroServices",
            position: "right",
            items: [
              {
                label: "微服务社区版",
                href: "https://free.aliyun.com/?searchKey=mse&spm=sca-website-free.topbar.0.0.0",
              },
              {
                label: "微服务企业版",
                href: "https://www.aliyun.com/product/aliware/mse?spm=sca-website.topbar.0.0.0",
              },
            ],
          },
          {
            label: "Blog",
            to: "/blog",
            position: "right",
          },
          {
            label: "Community",
            to: "/community/community-weekly-meeting/host-of-weekly-meeting",
            position: "right",
          },
          {
            type: "localeDropdown",
            position: "right",
          },
          {
            href: "https://github.com/alibaba/spring-cloud-alibaba",
            position: "right",
            className: "header-github-link",
          },
        ],
      },
      docs: {
        sidebar: {
          autoCollapseCategories: true,
        },
      },
      prism: {
        theme: lightCodeTheme,
        additionalLanguages: ["java", "properties", "sql"],
      },
    }),
};

module.exports = config;
