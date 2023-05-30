import React from 'react';
import { translate } from '@docusaurus/Translate';
import './index.scss';
import BrowserOnly from '@docusaurus/BrowserOnly';

const data = {
  title: translate({ id: 'homepage.introTitle', message: '欢迎扫描加入社区，共建Spring Cloud Alibaba' }),
  list: [
    'https://sca-storage.oss-cn-hangzhou.aliyuncs.com/website/dingtalk-group8.jpg',
  ],
};

const Community = () => {
  return (
    <BrowserOnly>
      {() => (
        <section className ="community-section">
          <h3>{data.title}</h3>
          <div className="community">
            {data.list.map((community, i) => (
              <div className="community-item" key={i}>
                <img src={community} />
              </div>
            ))}
          </div>
        </section>
      )}
    </BrowserOnly>
  );
};

export default Community;
