import React from "react";
import { translate } from "@docusaurus/Translate";
import BrowserOnly from "@docusaurus/BrowserOnly";
import "./index.scss";

const data = {

    list: [
        {
            title: translate({ id: "homepage.featureListTitle1", message: '简单易用' }),
            content: [
                translate({
                    id: "homepage.featureListContent1",
                    message:
                        'Spring Cloud Alibaba 作为一站式的微服务构建方案，用户只需要添加一些注解和少量配置，就可以通过阿里中间件来迅速搭建分布式应用系统。',
                }),
            ],
        },
        {
            title: translate({ id: 'homepage.featureListTitle2', message: '生产等级' }),
            content: [
                translate({
                    id: 'homepage.featureListContent2',
                    message: '核心组件都经过阿里巴巴多年双十一洪峰考验，成熟稳定。',
                }),
            ],
        },
        {
            title: translate({ id: 'homepage.featureListTitle3', message: '扩展性强' }),
            content: translate({
                id: 'homepage.featureListContent3',
                message:
                    'Spring Cloud Alibaba 基于 Spring Cloud 微服务解决方案规范，可便捷地对其中的组件进行扩展和替换。',
            }),
        },
        {
            title: translate({ id: 'homepage.featureListTitle4', message: '能力全面' }),
            content: translate({
                id: 'homepage.featureListContent4',
                message: '针对微服务架构中的服务注册与发现、分布式消息、微服务限流降级、分布式事务和微服务治理等重要领域，都提供了对应解决方案。',
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

const Item = (props: any) => {
    console.log(props);

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
