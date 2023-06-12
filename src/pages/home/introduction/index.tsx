import React from "react";

import { translate } from "@docusaurus/Translate";
import { getLink } from "../../../utils";

import BrowserOnly from "@docusaurus/BrowserOnly";
import "./index.scss";

const data = {
  title: translate({ id: "homepage.introTitle", message: "Spring Cloud Alibaba 是什么？" }),
  descFirst: translate({
    id: "homepage.introDescFirst",
    message:
      "Spring Cloud Alibaba为分布式应用开发提供一站式解决方案。它包含开发分布式应用程序所需的所有组件，使您可以轻松地使用Spring Cloud开发应用程序。",
  }),
  descSecond: translate({
    id: "homepage.introDescSecond",
    message:
      "有了Spring Cloud Alibaba，你只需要添加一些注释和少量的配置，就可以将Spring Cloud应用连接到阿里的分布式解决方案上，用阿里的中间件构建一个分布式应用系统。",
  }),
  img: {
    "zh-cn": "https://img.alicdn.com/imgextra/i1/O1CN01QvzFcc1s1rCCQdLOl_!!6000000005707-2-tps-3200-2001.png",
    "en-us": "https://img.alicdn.com/imgextra/i1/O1CN01QvzFcc1s1rCCQdLOl_!!6000000005707-2-tps-3200-2001.png",
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
              <p>{data.descFirst}</p>
              <p>{data.descSecond}</p>
            </div>
            <div className="img-wrapper">
              <img src={getLink(data.img[language] || data.img["zh-cn"])} />
            </div>
          </div>
        </section>
      )}
    </BrowserOnly>
  );
};

export default Introduction;
