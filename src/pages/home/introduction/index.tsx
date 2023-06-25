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
      "Spring Cloud Alibaba 为分布式应用开发提供一站式解决方案。它包含开发分布式应用程序所需的所有组件，使您可以轻松地使用 Spring Cloud 微服务框架开发应用程序。",
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
