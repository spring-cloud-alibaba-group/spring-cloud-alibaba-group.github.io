/**
 * Creating a sidebar enables you to:
 - create an ordered group of docs
 - render a sidebar for each doc of that group
 - provide next/previous navigation

 The sidebars can be generated from the filesystem, or explicitly defined here.

 Create as many sidebars as you want.
 */

// @ts-check

/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  docs: [
    {
      type: 'category',
      label: 'Overview',
      collapsible: true,
      items: [
        'overview/what-is-sca',
        "overview/version-explain",
        {
          type: 'category',
          label: 'Roadmap',
          collapsible: true,
          items: [
            'overview/roadmap/doc/doc',
            'overview/roadmap/graalvm-adapter/graalvm',
            'overview/roadmap/rocketmq-5.0.0/rocketmq-5.0.0',
            'overview/roadmap/service-governance/service-governance'
          ]
        },
        'overview/faq'
      ],
    },
    {
      type: 'category',
      label: 'User Guide',
      collapsible: true,
      items: [
        {
          type: 'category',
          label: 'Nacos',
          items: [
            'user-guide/nacos/overview',
            'user-guide/nacos/quick-start',
            'user-guide/nacos/advanced-guide'
          ]
        },
        {
          type: 'category',
          label: 'Seata',
          items: [
            'user-guide/seata/overview',
            'user-guide/seata/quick-start',
            'user-guide/seata/advanced-guide'
          ]
        },
        {
          type: 'category',
          label: 'Sentinel',
          items: [
            'user-guide/sentinel/overview',
            'user-guide/sentinel/quick-start',
            'user-guide/sentinel/advanced-guide'
          ]
        },
        {
          type: 'category',
          label: 'RocketMQ',
          items: [
            'user-guide/rocketmq/overview',
            'user-guide/rocketmq/quick-start',
            'user-guide/rocketmq/advanced-guide'
          ]
        },
        {
          type: 'category',
          label: 'Sidecar',
          items: [
            'user-guide/sidecar/overview',
            'user-guide/sidecar/quick-start',
            'user-guide/sidecar/advanced-guide'
          ]
        },
        {
          type: 'category',
          label: 'AOT And Native',
          items: [
            'user-guide/graalvm/overview',
            'user-guide/graalvm/quick-start',
            'user-guide/graalvm/advanced-guide'
          ]
        }
      ]
    },
    {
      type: 'category',
      label: 'Best practice',
      collapsible: true,
      items: [
        'best-practice/integrated-example'
      ]
    },
    // todo 后续补充或彻底删除
    // {
    //   type: 'category',
    //   label: 'Reference manual',
    //   collapsible: true,
    //   items: []
    // }
  ]
};

module.exports = sidebars;
