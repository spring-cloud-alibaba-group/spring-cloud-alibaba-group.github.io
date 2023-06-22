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
      <Translate id="homepage.userDesc2">上提供信息来帮助社区做得更好！</Translate>
    </span>
  ),

  list: [
    "https://img.alicdn.com/imgextra/i1/O1CN01TleQq128FAP8POtL5_!!6000000007902-2-tps-241-42.png",
    "https://img.alicdn.com/tfs/TB1Ly5oS3HqK1RjSZFPXXcwapXa-238-54.png",
    "https://sca-storage.oss-cn-hangzhou.aliyuncs.com/website/project-users-logo/user-icon/nanhang.png",
    "https://sca-storage.oss-cn-hangzhou.aliyuncs.com/website/project-users-logo/user-icon/shijiaAR.png",
    "https://sca-storage.oss-cn-hangzhou.aliyuncs.com/website/project-users-logo/user-icon/bellmann.png",
    "https://sca-storage.oss-cn-hangzhou.aliyuncs.com/website/project-users-logo/user-icon/branco.png",
    "https://sca-storage.oss-cn-hangzhou.aliyuncs.com/website/project-users-logo/user-icon/yunnangongtayinhang.jpg",
    "https://sca-storage.oss-cn-hangzhou.aliyuncs.com/website/project-users-logo/user-icon/yagee.png",
    "https://sca-storage.oss-cn-hangzhou.aliyuncs.com/website/project-users-logo/user-icon/yuetuchuxing.png",
    "https://sca-storage.oss-cn-hangzhou.aliyuncs.com/website/project-users-logo/user-icon/chaungzhiyuantai.png",
    "https://sca-storage.oss-cn-hangzhou.aliyuncs.com/website/project-users-logo/user-icon/dapengjiaoyu.png",
    "https://sca-storage.oss-cn-hangzhou.aliyuncs.com/website/project-users-logo/user-icon/fulinkeji.png",
    "https://sca-storage.oss-cn-hangzhou.aliyuncs.com/website/project-users-logo/user-icon/haigeguanjia.png",
    "https://sca-storage.oss-cn-hangzhou.aliyuncs.com/website/project-users-logo/user-icon/longdongxueyuan.png",
    "https://sca-storage.oss-cn-hangzhou.aliyuncs.com/website/project-users-logo/user-icon/jumi.png",
    "https://sca-storage.oss-cn-hangzhou.aliyuncs.com/website/project-users-logo/user-icon/kayouzhifu.png",
    "https://sca-storage.oss-cn-hangzhou.aliyuncs.com/website/project-users-logo/user-icon/kuchaokeji.png",
    "https://sca-storage.oss-cn-hangzhou.aliyuncs.com/website/project-users-logo/user-icon/langxunkeji.png",
    "https://sca-storage.oss-cn-hangzhou.aliyuncs.com/website/project-users-logo/user-icon/lansigufen.png",
    "https://sca-storage.oss-cn-hangzhou.aliyuncs.com/website/project-users-logo/user-icon/leita.png",
    "https://sca-storage.oss-cn-hangzhou.aliyuncs.com/website/project-users-logo/user-icon/liancaikeji.png",
    "https://sca-storage.oss-cn-hangzhou.aliyuncs.com/website/project-users-logo/user-icon/mukun.png",
    "https://sca-storage.oss-cn-hangzhou.aliyuncs.com/website/project-users-logo/user-icon/tuopulangning.png",
    "https://sca-storage.oss-cn-hangzhou.aliyuncs.com/website/project-users-logo/user-icon/shuiyang.png",
    "https://sca-storage.oss-cn-hangzhou.aliyuncs.com/website/project-users-logo/user-icon/yiguanzhizao.png",
    "https://sca-storage.oss-cn-hangzhou.aliyuncs.com/website/project-users-logo/user-icon/pingankeji.png",
    "https://sca-storage.oss-cn-hangzhou.aliyuncs.com/website/project-users-logo/user-icon/aihuishou.png",
    "https://sca-storage.oss-cn-hangzhou.aliyuncs.com/website/project-users-logo/user-icon/shezhongruanjian.png",
    "https://sca-storage.oss-cn-hangzhou.aliyuncs.com/website/project-users-logo/user-icon/yitingcheku.png",
    "https://sca-storage.oss-cn-hangzhou.aliyuncs.com/website/project-users-logo/user-icon/zhanxinzhanli.png",
    "https://sca-storage.oss-cn-hangzhou.aliyuncs.com/website/project-users-logo/user-icon/fenghuangwangqiche.png",
    "https://sca-storage.oss-cn-hangzhou.aliyuncs.com/website/project-users-logo/user-icon/wuxiangwangluo.png",
    "https://sca-storage.oss-cn-hangzhou.aliyuncs.com/website/project-users-logo/user-icon/yipingtang.png",
    "https://sca-storage.oss-cn-hangzhou.aliyuncs.com/website/project-users-logo/user-icon/etcp.png",
  ],
  titleBefore: translate({ id: "homepage.userTitleBefore", message: "谁在使用" }),
  titleAfter: translate({ id: "homepage.userTitleAfter", message: " Spring Cloud Alibaba" }),
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
