import React from "react";
import Translate, { translate } from "@docusaurus/Translate";
import { Bone } from "../../../components";

import BrowserOnly from "@docusaurus/BrowserOnly";
import "./index.scss";

const data = {
  desc: (
    <span>
      <Translate id="homepage.userDesc1">请在</Translate>{" "}
      <a
        rel="noopener noreferrer"
        target="_blank"
        href="https://github.com/alibaba/spring-cloud-alibaba/issues/301"
        style={{ color: "#69BD44" }}
      >
        Wanted: who&#39;s using Spring Cloud Alibaba
      </a>{" "}
      <Translate id="homepage.userDesc2">
        上提供信息来帮助社区做得更好！
      </Translate>
    </span>
  ),

  list: [
    "https://img.alicdn.com/imgextra/i1/O1CN01TleQq128FAP8POtL5_!!6000000007902-2-tps-241-42.png",
    "https://img.alicdn.com/tfs/TB1Ly5oS3HqK1RjSZFPXXcwapXa-238-54.png",
    "img/user-logo/aihuishou.png",
    "img/user-logo/caocaochuxing.png",
    "img/user-logo/etcp.png",
    "img/user-logo/pingankeji.png",
    "img/user-logo/fenghuangwangqiche.png",
    "img/user-logo/gfnx.png",
    "img/user-logo/guanwanglogo.png",
    "img/user-logo/haigeguanjia.png",
    "img/user-logo/hangzhoulinggong.png",
    "img/user-logo/jingxiujiaoyu.png",
    "img/user-logo/keji.png",
    "img/user-logo/langxunkeji.png",
    "img/user-logo/whaleBI-light.svg",
    "img/user-logo/lianheyongdao.png",
    "img/user-logo/llianxiangyun.png", 
    "img/user-logo/ratta.png",     
    "img/user-logo/shijiaar.png",   
    "img/user-logo/shuiyang.png",        
    "img/user-logo/yageer.png",     
    "img/user-logo/yiguanzhizao.png",  
    "img/user-logo/shanghaiguiniekeji.png",
    "img/user-logo/yitingcheku.png",  
    "img/user-logo/logo_yipingtang.968e80ad.png",

  ],
  titleBefore: translate({
    id: "homepage.userTitleBefore",
    message: "谁在使用",
  }),
  titleAfter: translate({
    id: "homepage.userTitleAfter",
    message: " Spring Cloud Alibaba",
  }),
};

const User = () => {
  return (
    <BrowserOnly>
      {() => (
        <section className="users-section">
          <h3>
            {data.titleBefore}
            <span>{data.titleAfter}</span>
          </h3>
          {/* <Bone type="dark" /> */}
          <p>{data.desc}</p>
          <div className="users">
            {data.list.map((user, i) => (
              <div className="user-item" key={i}>
                <img src={user} />
              </div>
            ))}
          </div>
        </section>
      )}
    </BrowserOnly>
  );
};

export default User;
