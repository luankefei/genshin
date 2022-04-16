import React, { useState, useEffect } from "react";

import SectionTitle from "../SectionTitle";
import FilterSection from "../FilterSection";

import localeChs from "../../../utils/locale.chs";
import log from "../../../utils/log";
import mona from "../../../utils/mona";
import {
  Container,
  Uploader,
  UploadMessage,
  SectionContent,
  WeightSection,
  WeightButton,
  // FilterSection,
  // Filter,
  // FilterTitle,
  // FilterDetail,
} from "./artifact-right.style";
import { IArtifact } from "src/utils/mona.artifact";
// import { ArtifactList } from "../artifact.style";

const logProgress: string[] = [];

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

type IProps = {
  weightMap: any;
  filterMap: any;
  artifactList: any[];
  onFileUploaded: (list: IArtifact[]) => void;
};

const ArtifactRight = (props: IProps) => {
  const { weightMap, filterMap, artifactList, onFileUploaded } = props;

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

    // console.log("imageUrl", artifacts);

    // const fileName = `checkin_custom_${today}_${userInfo.user_id}_${file.name}`;
    if (artifacts && artifacts.length) {
      // console.log("setArtifactList");
      onFileUploaded(artifacts);
      // setArtifactList(artifacts);

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

  const onWeightButtonClick = (key: string) => () => {
    console.log("onWeightButtonClick", key, weightMap[key]);
    // if (props.modelValue == 0) {
    //   emit("update:modelValue", 0.5);
    // } else if (props.modelValue == 0.5) {
    //   emit("update:modelValue", 1);
    // } else {
    //   emit("update:modelValue", 0);
    // }
  };

  const renderWeightButtons = () => {
    // console.log("renderWeightButtons", weightMap);
    //   return {
    //     "value-button": true,
    //     one: props.modelValue == 1,
    //     zero: props.modelValue == 0,
    //   };
    // });
    // });

    return Object.keys(weightMap).map((k) => {
      const content = localeChs.affix[k];
      let affix = weightMap[k] === 1 ? "one" : "";
      if (weightMap[k] === 0) affix = "zero";

      return (
        <WeightButton key={k} className={affix} onClick={onWeightButtonClick(k)}>
          <span className="blank">{content}</span>
          <span className="fill">{content}</span>
        </WeightButton>
      );
    });
  };

  // const countArtifactsByAttr = (artifacts: IArtifact[], key: keyof IArtifact) => {
  //   // key: string;
  //   // value: string | number;
  //   // tip: string;

  //   let s: IOption[] = [];
  //   const op: IOption = { tip: "0", key: "", value: "" };
  //   for (let a of artifacts) {
  //     let akey = a[key].toString();
  //     op.key = akey;
  //     if (akey in s) {
  //       op[akey].tip += 1;
  //     }
  //   }
  //   s.push(op);
  //   return s;
  // };

  //   filterSets(state) {
  //     let ret = [{ key: "", value: "全部", tip: state.artifacts.length.toString() }],
  //         s = countArtifactAttr(state.artifacts, 'set')
  //     for (let key in chs.set) {
  //         if (key in s)
  //             ret.push({ key, value: chs.set[key].name, tip: s[key].toString() });
  //     }
  //     return ret;
  // },

  return (
    <Container>
      <Uploader>
        <SectionTitle title="导入">
          <span data-click="openTutorial">教程</span>
        </SectionTitle>
        <SectionContent>
          <label htmlFor="select-file">
            <span className="button">导入</span>
          </label>
          <UploadMessage>成功导入638个5星圣遗物</UploadMessage>
        </SectionContent>

        <input id="select-file" type="file" onChange={fileChange} accept=".json" />
      </Uploader>
      <WeightSection>
        <SectionTitle title="词条权重" />
        <SectionContent>{renderWeightButtons()}</SectionContent>
      </WeightSection>

      <FilterSection filterMap={filterMap} artifactList={artifactList} />
    </Container>
  );
};

export default ArtifactRight;
