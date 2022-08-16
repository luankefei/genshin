import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { actions } from "../artifact.reducer";

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
  StartContainer,
} from "./artifact-right.style";
import { IArtifact } from "src/interface/genshin.type";

const logProgress: string[] = [];

function validateFile(file: any): boolean {
  // 作用：点击选择图片，但是没有选图
  if (!file) {
    log.send("no_file_error", {
      desc: "用户没有选择图片",
    });
    return false;
  }

  return true;
}

type IProps = {
  weightMap: any;
  filterMap: any;
  artifactList: any[];
  artifactListBackup: any[];
  onFileUploaded: (artifactList: IArtifact[]) => void;
  updateWeightMap: (payload: { key: string; value: string }) => void;
  updateArtifacts: () => void;
};

const ArtifactRight = (props: IProps) => {
  const {
    weightMap,
    filterMap,
    artifactList,
    artifactListBackup,
    onFileUploaded,
    updateWeightMap,
    updateArtifacts,
  } = props;

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
        console.error("file_change_error", err);
        // log.send("file_change_error", {
        //   err: JSON.stringify(err),
        //   p: logProgress.join(","),
        // });
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

    const artifacts = await monaFileToArtifacts(file).catch((err) => {
      log.send("file_change_error", {
        err: JSON.stringify(err),
      });
    });

    if (artifacts && artifacts.length) {
      onFileUploaded(artifacts);
      log.send("draw_stage_1_success", { desc: "第一方案成功人数" });
    }
  };

  const onWeightButtonClick = (key: string) => () => {
    let value = weightMap[key];
    if (value === 0) value = 0.5;
    else if (value === 0.5) value = 1;
    else value = 0;

    updateWeightMap({ key, value });
  };

  const renderWeightButtons = () =>
    Object.keys(weightMap).map((k) => {
      const content = localeChs.affix[k];
      let affix = weightMap[k] === 1 ? "one" : "";
      if (weightMap[k] === 0) affix = "zero";

      return (
        <WeightButton
          key={k}
          className={affix}
          onClick={onWeightButtonClick(k)}
        >
          <span className="blank">{content}</span>
          <span className="fill">{content}</span>
        </WeightButton>
      );
    });

  const submitFilter = () => {
    updateArtifacts();
  };

  // 染色规则
  const clickDyeing = () => {
    const nodes: HTMLSpanElement[] = document.querySelectorAll(
      ".avg-an"
    ) as any;
    const n = nodes.length;
    for (let i = 0; i < n; i++) {
      const text = nodes[i].innerText.replace("期望", "");
      const affixs =
        nodes[i].parentNode.parentNode.querySelectorAll(".minor-affix");
      const hasBao = Array.prototype.find.call(
        affixs,
        (item) => item.innerText.indexOf("暴击") !== -1
      );

      console.log("hasBao", hasBao, nodes[i].innerText);
      const score = parseFloat(text);

      // 4 词条评分小于 4
      const isBadFour = score <= 4.0 && affixs.length === 4;

      // 无双爆，评分小于 5
      const isNoBao = !hasBao && score < 5;

      // 有暴，评分小于 4
      const isBadBao = hasBao && score < 4;

      // 染色
      if (isBadFour || isNoBao || isBadBao) nodes[i].style.background = "#000";
      // reset
      else nodes[i].style.background = "#2a82e4";
    }
  };

  return (
    <Container>
      <Uploader>
        <SectionTitle title="导入">
          <a href="https://ideless.github.io/artifact/tutorial/" target="blank">
            教程
          </a>
        </SectionTitle>
        <SectionContent>
          <label htmlFor="select-file">
            <span className="button">导入</span>
          </label>
          <button className="button btn-hollow" onClick={clickDyeing}>
            染色
          </button>
          <UploadMessage>共{artifactList.length}个5星圣遗物</UploadMessage>
        </SectionContent>

        <input
          id="select-file"
          type="file"
          onChange={fileChange}
          accept=".json"
        />
      </Uploader>
      <WeightSection>
        <SectionTitle title="词条权重" />
        <SectionContent>{renderWeightButtons()}</SectionContent>
      </WeightSection>

      <FilterSection filterMap={filterMap} artifactList={artifactListBackup} />

      <StartContainer>
        <button className="button" onClick={submitFilter}>
          开始计算
        </button>
      </StartContainer>
    </Container>
  );
};

const withConnect = connect(null, {
  updateWeightMap: actions.updateWeightMap,
  updateArtifacts: actions.updateArtifacts,
});

export default withConnect(ArtifactRight);

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
