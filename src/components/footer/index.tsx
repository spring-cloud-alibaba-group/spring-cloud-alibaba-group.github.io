import React from "react";
import { translate } from "@docusaurus/Translate";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";

import "./index.scss";

const LicenseLogo =
  "https://img.alicdn.com/imgextra/i4/O1CN019fTXYL1tVSMxQUfXI_!!6000000005907-1-tps-65-70.gif";
const RecordLogo =
  "https://img.alicdn.com/imgextra/i4/O1CN01Yy52TB1LzVPtZYepI_!!6000000001370-2-tps-20-20.png";

const data = {
  vision: {
    title: translate({ id: "homepage.footerVersionTitle", message: "愿景" }),
    contentFist: translate({
      id: "homepage.introDescFirst",
      message:
        "Spring Cloud Alibaba 为分布式应用开发提供一站式解决方案。它包含开发分布式应用程序所需的所有组件，使您可以轻松地使用 Spring Cloud 微服务框架开发应用程序。",
    }),
  },
  documentation: {
    title: translate({ id: "homepage.footerDocTitle", message: "文档" }),
    list: [
      {
        text: translate({ id: "homepage.footerDocListText1", message: "概览" }),
        link: "/docs/2022.0.0.0/overview/what-is-sca",
        target: "",
      },
      {
        text: translate({ id: "homepage.footerDocListText2", message: "快速开始" }),
        link: "/docs/2022.0.0.0/user-guide/nacos/quick-start",
        target: "",
      },
      {
        text: translate({ id: "homepage.footerDocListText3", message: "报告文档问题" }),
        link: "https://github.com/spring-cloud-alibaba-group/spring-cloud-alibaba-group.github.io/issues/new",
        target: "_blank",
      },
      {
        text: translate({ id: "homepage.footerDocListText4", message: "在Github上编辑此文档" }),
        link: "https://github.com/spring-cloud-alibaba-group/spring-cloud-alibaba-group.github.io",
        target: "_blank",
      },
    ],
  },
  resources: {
    title: translate({ id: "homepage.footerResourcesTitle", message: "资源" }),
    list: [
      {
        text: translate({ id: "homepage.footerResourcesListText2", message: "社区" }),
        link: "/community/community-weekly-meeting/host-of-weekly-meeting",
        target: "",
      },
      {
        text: translate({ id: "homepage.footerResourcesListText1", message: "博客" }),
        link: "/blog",
        target: "",
      },
    ],
  },
  copyright: "Copyright © 2023 Spring Cloud Alibaba",
};

type Props = {
  logo: string;
};

const Footer = (props: Props) => {
  const { logo } = props;
  const { i18n } = useDocusaurusContext();
  const curLang = i18n.currentLocale;

  return (
    <footer className="footer-container">
      <div className="footer-body">
        <img style={{ marginTop: "4px", maxWidth: "240px", height: "auto"}} src={logo} />
        <br />
        <br />
        {/* <p className="docusaurus-power">website powered by docusaurus</p> */}
        <div className="cols-container"> 
          <div className="col col-12">
            <h3>{data.vision.title}</h3>
            <p>{data.vision.contentFist}</p>
          </div>
          <div className="col col-6">
            <dl>
              <dt>{data.documentation.title}</dt>
              {data.documentation.list.map((d, i) => (
                <dd key={i}>
                  {d.link?.substr(0, 4) === "http" && (
                    <a href={d.link} target={d.target || "_self"}>
                      {d.text}
                    </a>
                  )}
                  {d.link?.substr(0, 4) !== "http" && (
                    <a href={`/${curLang}${d.link}`} target={d.target || "_self"}>
                      {d.text}
                    </a>
                  )}
                </dd>
              ))}
            </dl>
          </div>
          <div className="col col-6">
            <dl>
              <dt>{data.resources.title}</dt>
              {data.resources.list.map((d, i) => (
                <dd key={i}>
                  <a href={`/${curLang}${d.link}`} target={d.target || "_self"}>
                    {d.text}
                  </a>
                </dd>
              ))}
            </dl>
          </div>
        </div>
      </div>
      <div className="footer-box">{data.copyright}</div>
    </footer>
  );
};

export default Footer;
