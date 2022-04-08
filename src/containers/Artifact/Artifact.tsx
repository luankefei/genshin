import Head from "next/head";
import React, { useEffect, useState, useContext } from "react";

import ArtifactCard from "../../components/ArtifactCard";
import log from "../../utils/log";
import mona from "../../utils/mona";

import { Page, Header, Container, ArtifactList, SideBar } from "./artifact.style";

function validateFile(file: any): boolean {
  // 作用：点击选择图片，但是没有选图
  if (!file) {
    log.send("no_file_error", {
      desc: "用户没有选择图片",
    });
    return false;
  }

  // 没有实际作用，只上报日志
  // const fileType = file.type;
  // const extname = file.name.split(".").pop();
  // // 只验证文件类型，不多扩展名做校验
  // const regex = /^(image\/jpeg)|(image\/png)|(image\/gif)|(image\/webp)$/gi;
  // const isFileTypeValid = regex.test(fileType);
  // if (!isFileTypeValid && fileType) {
  //   log.send("invalid_file_type", { fileType, extname, desc: "用户图片格式非法" });
  // }

  return true;
}

const logProgress: string[] = [];

const Artifact = () => {
  const [artifactList, setArtifactList] = useState([]);

  const monaFileToArtifacts = (file: any): Promise<any> => {
    // 2019.08.27 不再执行压缩
    return new Promise((resolve) => {
      const reader = new FileReader();

      // 读取文件转text
      reader.readAsText(file);
      reader.onload = () => resolve(reader.result);
    })
      .then((file: any) => {
        const artifacts = mona.loads(file);
        return artifacts;
      })
      .catch((err: any) => {
        // setVisibleImageModal(false);
        // Toast.info("图片打开失败", 2);

        log.send("file_change_error", {
          err: JSON.stringify(err),
          p: logProgress.join(","),
        });
      });
  };

  const fileChange = async (event: any) => {
    const target = event.target;
    let file = target.files[0];

    log.send("click_select_image", {
      desc: "用户点击选择图片按钮",
    });

    if (!validateFile(file)) {
      return;
    }

    // setVisibleImageModal(true);

    const artifacts = await monaFileToArtifacts(file).catch((err) => {
      log.send("file_change_error", {
        err: JSON.stringify(err),
      });
    });

    console.log("imageUrl", artifacts);

    // const fileName = `checkin_custom_${today}_${userInfo.user_id}_${file.name}`;
    if (artifacts && artifacts.length) {
      setArtifactList(artifacts);

      // imageUrl = await getOssToken()
      //   .then(() => {
      //     logProgress.push("upload");
      //     return uploadToOss(fileName, file);
      //   })
      //   .then(() => drawCustomImage(file))
      //   .catch((err: any) => {
      //     log.send("file_change_error", {
      //       err: JSON.stringify(err),
      //     });
      //   });
      log.send("draw_stage_1_success", { desc: "第一方案成功人数" });
    }
  };

  const renderArtifact = () => artifactList.map((a, index) => <ArtifactCard key={index} {...a} />);

  return (
    <Page>
      <Header>header</Header>
      <Container>
        <SideBar>
          <div className="upload">
            <label htmlFor="select-file">
              <div className="select-img">
                <img src="/icon/select_photo.png" alt="更换照片" />
                <span>更换照片</span>
              </div>
            </label>
            <input id="select-file" type="file" onChange={fileChange} accept=".json" />
          </div>
        </SideBar>
        <ArtifactList>
          <ul>
            {renderArtifact()}
            {/* <ArtifactCard />
            <ArtifactCard /> */}
          </ul>
        </ArtifactList>
      </Container>
    </Page>
  );
};

export default Artifact;
