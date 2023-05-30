// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require('prism-react-renderer/themes/github');

const commonDocsOptions = {
  //是否显示面包屑导航
  breadcrumbs: true,
  // 是否显示最后更新作者
  showLastUpdateAuthor: false,
  // 是否显示最后更新时间
  showLastUpdateTime: true,
};

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Spring Cloud Alibaba',
  favicon: 'img/higress_logo_small.png',
  themes: [
    require.resolve("@easyops-cn/docusaurus-search-local"),
    /** @type {import("@easyops-cn/docusaurus-search-local").PluginOptions} */
  ],
  // Set the production url of your site here
  url: 'https://higress.io',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'alibaba', // Usually your GitHub org/user name.
  projectName: 'Spring Cloud Alibaba', // Usually your repo name.

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  // Even if you don't use internalization, you can use this field to set useful
  // metadata like html lang. For example, if your site is Chinese, you may want
  // to replace "en" with "zh-Hans".
  clientModules: [require.resolve('./src/myClientModule.ts'), require.resolve('./src/custom-js.ts')],
  i18n: {
    defaultLocale: 'default',
    locales: ['en-us', 'zh-cn', 'default'],
    localeConfigs: {
      'en-us': {
        label: 'En',
        htmlLang: 'en-US',
      },
      'zh-cn': {
        label: '中',
        htmlLang: 'zh-CN',
      },
    },
  },
  scripts: [
    { src: '//g.alicdn.com/mamba/assets/0.0.19/mse-arc-ui.min.js' },
    {
      src: '//g.alicdn.com/alilog/mlog/aplus_v2.js',
      id: 'beacon-aplus',
      exparams: 'clog=o&aplus&sidx=aplusSidx&ckx=aplusCkx',
    },
    {
      src: '//g.alicdn.com/aes/??tracker/1.0.34/index.js,tracker-plugin-pv/2.4.5/index.js,tracker-plugin-event/1.2.5/index.js,tracker-plugin-jserror/1.0.13/index.js,tracker-plugin-api/1.1.14/index.js,tracker-plugin-perf/1.1.8/index.js,tracker-plugin-eventTiming/1.0.4/index.js',
    },
    {
      src: 'https://www.googletagmanager.com/gtag/js?id=G-YHS75WKFBR',
      async: true,
    },
  ],
  stylesheets: [
    {
      href: '//g.alicdn.com/mamba/assets/0.0.19/mse-arc-ui.min.css',
    },
  ],
  plugins: [
    'docusaurus-plugin-sass',
    [
      'content-docs',
      /** @type {import('@docusaurus/plugin-content-docs').Options} */
      ({
        id: 'developers',
        path: 'developers',
        routeBasePath: '/developers',
        sidebarPath: require.resolve('./sidebarDevelopers.json'),
        ...commonDocsOptions,
      }),
    ],
    [
      'content-docs',
      /** @type {import('@docusaurus/plugin-content-docs').Options} */
      ({
        id: 'community',
        path: 'community',
        routeBasePath: '/community',
        sidebarPath: require.resolve('./sidebarCommunity.json'),
        ...commonDocsOptions,
      }),
    ],
  ],
  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          editUrl: ({ docPath, locale }) => {
            return `https://github.com/spring-cloud-alibaba-group/spring-cloud-alibaba-group.github.io/blob/main/i18n/${locale}/docusaurus-plugin-content-docs/current/${docPath}`;
          },
          lastVersion: '2022.0.0.0-RC1',
          versions: {
            '2.2.10-RC1': {
              banner: 'none'
            },
            '2022.0.0.0-RC1': {
              banner: 'none'
            },
            '2021.0.5.0': {
              banner: 'none'
            }
          },
        },
        blog: {
          showReadingTime: true,
          blogSidebarTitle: '全部博文',
          blogSidebarCount: 'ALL',
          editUrl: ({ blogPath, locale }) => {
            return `https://github.com/spring-cloud-alibaba-group/spring-cloud-alibaba-group.github.io/blob/main/i18n/${locale}/docusaurus-plugin-content-blog/${blogPath}`;
          },
        },
        theme: {
          customCss: require.resolve('./src/css/custom.scss'),
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      metadata: [{ name: 'keywords', content: 'Spring Cloud Alibaba,微服务' }],
      // Replace with your project's social card
      image: 'img/higress_logo_small.png',
      colorMode: {
        defaultMode: 'light',
        disableSwitch: true, // 禁止切换主题模式
        respectPrefersColorScheme: false,
      },
      navbar: {
        title: '',
        logo: {
          alt: 'Spring Cloud Alibaba logo',
          src: 'https://sca-storage.oss-cn-hangzhou.aliyuncs.com/website/logo-touming.png',
        },
        items: [
          {
            label: 'Home',
            to: '/',
            activeBaseRegex: '^/$',
            position: 'right',
          },
          {
            type: 'docsVersionDropdown',
            label: 'Docs',
            docid: 'overview/what-is-sca',
            position: 'right',
            dropdownItemsAfter: [{
              label: 'All Versions',
              to: '/versions'
            }],
            dropdownActiveClassDisabled: true,
          },
          {
            label: 'Developers',
            to: '/developers/developers_dev',
            position: 'right',
          },
          {
            label: 'Blog',
            to: '/blog',
            position: 'right',
          },
          {
            label: 'Community',
            to: '/community/community-weekly-meeting/host-of-weekly-meeting',
            position: 'right',
          },
          {
            type: 'localeDropdown',
            position: 'right',
          },
          {
            href: 'https://github.com/alibaba/spring-cloud-alibaba',
            position: 'right',
            className: 'header-github-link',
          },
        ],
      },
      footer: {
        style: 'light',
        links: [
          {
            title: 'Vision',
            items: [
              {
                label: 'introduce',
                to: '/',
              },
            ],
          },
          {
            title: 'Documentation',
            items: [
              {
                label: 'What is Spring Cloud Alibaba?',
                to: '/docs/overview/what-is-sca',
              },
              {
                label: 'Quick Start',
                to: '/docs/user-guide/nacos/quick-start',
              },
              {
                label: 'Report a doc issue',
                href: 'https://github.com/spring-cloud-alibaba-group/spring-cloud-alibaba-group.github.io/issues/new',
              },
              {
                label: 'Edit This Page on GitHub',
                href: 'https://github.com/spring-cloud-alibaba-group/spring-cloud-alibaba-group.github.io',
              },
            ],
          },
          {
            title: 'Resources',
            items: [
              {
                label: 'Last Version',
                to: '/docs/2021.0.5.0/overview/what-is-sca',
              },
              {
                label: 'Blog',
                to: '/blog',
              },
              {
                label: 'Community',
                to: '/community/events-news',
              },
              {
                label: "Github",
                href: "https://github.com/alibaba/spring-cloud-alibaba"
              }
            ],
          },
          {
            title: 'Friend Chain',
            items: [
              {
                label: 'Higress',
                href: 'https://higress.io/zh-cn/index.html',
              },
              {
                label: 'Seata',
                href: 'https://seata.io/zh-cn/index.html',
              },
              {
                label: 'Nacos',
                href: 'https://nacos.io/zh-cn/index.html',
              },
            ],
          }
        ],
        /*logo: {
          src: '//img.alicdn.com/imgextra/i2/O1CN01oNTGgE1lfW7oEPIzP_!!6000000004846-2-tps-960-290.png',
          width: 120,
          height: 36,
        },*/
        copyright: `Copyright © ${new Date().getFullYear()} Spring Cloud Alibaba<br/>浙公网安备 33011002016922号 浙ICP备12022327号-1119`,
      },
      docs: {
        sidebar: {
          autoCollapseCategories: true,
        },
      },
      prism: {
        theme: lightCodeTheme,
        additionalLanguages: ['java', 'properties'],
      },
    }),
};

module.exports = config;
