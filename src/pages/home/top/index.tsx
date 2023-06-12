import React from "react";
import { translate } from "@docusaurus/Translate";
import { Button, ButtonType } from "../../../components";
import { getLink } from "../../../utils";

import BrowserOnly from "@docusaurus/BrowserOnly";

import "./index.scss";

const topData = {
  // 删除logo
  // brandLogoUrl: 'https://img.alicdn.com/imgextra/i1/O1CN01bmdCFQ1Zupzs0XIKc_!!6000000003255-55-tps-288-86.svg',
  briefIntroductionTitle: translate({
    id: "homepage.briefIntroductionTitle",
    message: "Spring Cloud Alibaba",
  }),
  briefIntroductionDesc: translate({
    id: "homepage.briefIntroductionDesc",
    message: "致力于提供微服务开发的一站式解决方案!",
  }),
  buttons: [
    {
      text: translate({ id: "homepage.quickstartButton", message: "快速入门" }),
      link: "/docs/user-guide/nacos/quick-start",
      type: "normal",
    },
    {
      text: "GitHub",
      link: "https://github.com/alibaba/spring-cloud-alibaba",
      type: "normal",
      target: "_blank",
    },
  ],
  versionNote: {
    text: "Release Note of 2021.0.5.0",
    link: "https://github.com/alibaba/spring-cloud-alibaba/releases/tag/2021.0.5.0",
  },
  releaseDate: "Released on March 22, 2023",
};

const Top = ({ language }: { language?: string }) => {
  const [state, setState] = React.useState({
    starCount: "",
    forkCount: "",
  });

  const { starCount, forkCount } = state;

  React.useEffect(() => {
    fetch("//api.github.com/repos/alibaba/spring-cloud-alibaba")
      .then((res) => res.json())
      .then((data) => {
        setState({
          starCount: `${data.stargazers_count}`,
          forkCount: `${data.forks_count}`,
        });
      });
  }, []);

  return (
    <BrowserOnly>
      {() => (
        <section className="top-section">
          <div className="top-body">
            <div className="vertical-middle">
              {/* <div className="product-name">
                <img src={getLink(topData.brandLogoUrl)} />
              </div> */}
              <p className="product-title">{topData.briefIntroductionTitle}</p>
              <p className="product-desc">{topData.briefIntroductionDesc}</p>
              <div className="button-area">
                {topData.buttons.map((b) => (
                  <Button
                    type={b.type as ButtonType}
                    key={b.text}
                    link={b.link}
                    target={b.target}
                    language={language}
                  >
                    {b.text}
                  </Button>
                ))}
              </div>
              <div className="github-buttons">
                <a
                  href="https://github.com/alibaba/spring-cloud-alibaba"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <div className="star">
                    <img src="https://img.alicdn.com/imgextra/i2/O1CN01p5mlMy1jXc76s8KB2_!!6000000004558-2-tps-300-300.png" />
                    <span className="type">Star</span>
                    <span className="line" />
                  </div>
                  <div className="count">{starCount}</div>
                </a>
                <a
                  href="https://github.com/alibaba/spring-cloud-alibaba/fork"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <div className="fork">
                    <img src="https://img.alicdn.com/imgextra/i2/O1CN01GQIcbr1o7ZfwkxGs1_!!6000000005178-2-tps-300-300.png" />
                    <span className="type">Fork</span>
                    <span className="line" />
                  </div>
                  <div className="count">{forkCount}</div>
                </a>
                <a target="_blank" rel="noopener noreferrer" href={getLink(topData.versionNote.link)}>
                  <div className="release-note">
                    <span className="type ">{topData.versionNote.text}</span>
                  </div>
                </a>
                {/* <div className="version-note"></div> */}
              </div>
              {/* <div className="release-date">{dataSource.brand.releaseDate}</div> */}
            </div>
            {/* <div className="animation">
            <img className="img1" src="//img.alicdn.com/tfs/TB1evnpJhnaK1RjSZFBXXcW7VXa-702-312.png" />
            <img className="img2" src="//img.alicdn.com/tfs/TB1iau9JcbpK1RjSZFyXXX_qFXa-914-1156.png" />
            <div className="outer-circle" />
            <div className="rotate-circle">
              <svg viewBox="0 0 404 404" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <linearGradient
                    id="linear"
                    x1="0%"
                    y1="0%"
                    x2="100%"
                    y2="0%"
                  >
                    <stop offset="0%" stopColor="rgba(17, 186, 250, 1)" />
                    <stop offset="50%" stopColor="rgba(17, 186, 250, 0.1)" />
                    <stop offset="50%" stopColor="rgba(17, 186, 250, 1)" />
                    <stop offset="100%" stopColor="rgba(17, 186, 250, 0.1)" />
                  </linearGradient>
                  </defs>
                <circle cx="202" cy="202" r="200" fill="rgba(0, 0, 0, 0)" stroke="url(#linear)" strokeWidth="4" />
              </svg>
            </div>
            <img className="img3" src="//img.alicdn.com/tfs/TB1EBu.JgHqK1RjSZJnXXbNLpXa-914-1156.png" />
            <img className="img4" src="//img.alicdn.com/tfs/TB115i2JmzqK1RjSZPxXXc4tVXa-186-78.png" />
            <img className="img5" src="//img.alicdn.com/tfs/TB115i2JmzqK1RjSZPxXXc4tVXa-186-78.png" />
          </div> */}
          </div>
        </section>
      )}
    </BrowserOnly>
  );
};

export default Top;
