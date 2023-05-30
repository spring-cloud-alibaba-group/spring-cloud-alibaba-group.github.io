import React from 'react';

import { translate } from '@docusaurus/Translate';
import { getLink } from '../../../utils';

import BrowserOnly from '@docusaurus/BrowserOnly';
import './index.scss';

const data = {
  title: translate({ id: 'homepage.introTitle', message: 'Spring Cloud Alibaba 是什么？' }),
  desc: translate({
    id: 'homepage.introDesc',
    message:
      'Spring Cloud Alibaba针对微服务架构中的服务注册与发现、分布式消息、微服务限流降级以及分布式事务等核心领域，都提供了相应来自阿里巴巴集团内部大规模应用实践验证的成熟解决方案实现，让微服务构建过程既简单高效又稳定可靠！',
  }),
  img: {
    'zh-cn': 'https://sca-storage.oss-cn-hangzhou.aliyuncs.com/website/ecosystem.jpg',
    'en-us': 'https://sca-storage.oss-cn-hangzhou.aliyuncs.com/website/ecosystem.jpg',
  },
};

const Introduction = ({ language }: { language: string }) => {
  return (
    <BrowserOnly>
      {() => (
        <section className="introduction-section">
          <div className="introduction-body">
            <div className="introduction">
              <h3>{data.title}</h3>
              <p>{data.desc}</p>
            </div>
            <div className="img-wrapper">
              <img src={getLink(data.img[language] || data.img['zh-cn'])} />
            </div>
          </div>
        </section>
      )}
    </BrowserOnly>
  );
};

export default Introduction;
