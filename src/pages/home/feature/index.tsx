import React from "react";
import { translate } from "@docusaurus/Translate";
import { Icon } from "../../../components";
import BrowserOnly from "@docusaurus/BrowserOnly";
import "./index.scss";

const data = {
  list: [
    {
      icon: "feature-1",
      title: translate({ id: "homepage.featureListTitle1", message: "多种类型注册中心支持" }),
      content: [
        translate({
          id: "homepage.featureListContent1",
          message:
            "提供多注册中心组件，支持Nacos、ZooKeeper、Consul，同时基于该组件可添加更多其他类型注册中心",
        }),
      ],
    },
    {
      icon: "feature-2",
      title: translate({ id: "homepage.featureListTitle2", message: "多Kubernetes集群支持" }),
      content: [
        translate({
          id: "homepage.featureListContent2",
          message: "一个Higress Controller可同时监听多个Kubernetes集群，方便跨多集群的统一路由管理",
        }),
      ],
    },
    {
      icon: "feature-3",
      title: translate({ id: "homepage.featureListTitle3", message: "多种扩展方式支持" }),
      content: translate({
        id: "homepage.featureListContent3",
        message:
          "支持Wasm插件、Lua插件、进程外插件，通过丰富的插件扩展机制，用户可以使用多语言编写扩展插件，有效降低插件编写门槛，满足用户自定义的扩展诉求",
      }),
    },
    {
      icon: "feature-4",
      title: translate({ id: "homepage.featureListTitle4", message: "Dubbo协议转换" }),
      content: translate({
        id: "homepage.featureListContent4",
        message:
          "提供HTTP协议到Dubbo协议的转换能力，降低用户对外暴露Dubbo服务的接入成本，满足传统Dubbo微服务用户希望提供对外请求访问的场景",
      }),
    },
    {
      icon: "feature-5",
      title: translate({ id: "homepage.featureListTitle5", message: "Sentinel支持" }),
      content: translate({
        id: "homepage.featureListContent5",
        message: "深度集成Sentinel，一站式的满足传统微服务用户对限流、降级、熔断等高可用能力的诉求",
      }),
    },
    {
      icon: "feature-6",
      title: translate({ id: "homepage.featureListTitle6", message: "Modsecurity" }),
      content: translate({
        id: "homepage.featureListContent6",
        message: "深度集成开源Web应用防火墙，满足网关用户对安全的首要防护诉求",
      }),
    },
  ],
  title: translate({ id: "homepage.featureTitle", message: "核心特色" }),
};

const Feature = () => {
  return (
    <BrowserOnly>
      {() => (
        <section className="feature-section">
          <div className="feature-container">
            <h3>{data.title}</h3>
            <ul>
              {data.list.map((feature, i) => (
                <Item feature={feature} key={i} />
              ))}
            </ul>
          </div>
        </section>
      )}
    </BrowserOnly>
  );
};

const Item = (props) => {
  const { feature } = props;
  return (
    <BrowserOnly>
      {() => (
        <li>
          {/* <Icon type={feature.icon} /> */}
          <div>
            <h4>{feature.title}</h4>
            <p>{feature.content}</p>
          </div>
        </li>
      )}
    </BrowserOnly>
  );
};

export default Feature;
