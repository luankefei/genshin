import React, { useState, useEffect } from "react";

import SectionTitle from "../SectionTitle";
import Select from "../Select";
import type { IOption } from "../Select";

import localeChs from "../../../utils/locale.chs";
import artifactDict from "../../../utils/artifact.dict";
import log from "../../../utils/log";
import mona from "../../../utils/mona";
import {
  Container,
  Uploader,
  UploadMessage,
  SectionContent,
  WeightSection,
  WeightButton,
  FilterSection,
  Filter,
  FilterTitle,
  FilterDetail,
} from "./artifact-right.style";
import { IArtifact } from "src/utils/mona.artifact";
import { ArtifactList } from "../artifact.style";

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

function countArtifactsByAttr(artifacts: IArtifact[], key: keyof IArtifact) {
  let s: { [key: string]: number } = {};
  for (let a of artifacts) {
    // console.log("a[key].", a, key, a[key]);
    let akey = a[key].toString();
    s[akey] = akey in s ? s[akey] + 1 : 1;
  }
  return s;
}

type IProps = {
  weightMap: any;
  filterMap: any;
  artifactList: any[];
  onFileUploaded: (list: IArtifact[]) => void;
};

const ArtifactRight = (props: IProps) => {
  const { weightMap, filterMap, artifactList, onFileUploaded } = props;
  const [filterOptionsMap, setFilterOptionsMap] = useState({
    set: [],
    slot: [],
    mainKey: [],
    location: [],
    lock: [],
  });

  useEffect(() => {
    // console.log("artifactList.length", JSON.stringify(artifactList));
    generateFilters();
    // }, [artifactList]);
  }, []);

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

  const restoreToOptionList = (dict: any, names: string[]) => {
    const mapping = {
      ...localeChs,
      ...artifactDict,
    };
    // console.log("localeChs mapping", mapping);
    names.forEach((n) => {
      // let n = name === "mainKey" ? "mainKeys" : name;
      const list = [];
      console.log("------------------ forEach before", n, dict);
      Object.keys(dict[n]).forEach((k) => {
        console.log("------------------ forEach", mapping[n][k], n, k, dict);
        list.push({
          key: n === "mainKey" ? mapping[n][k] : mapping[n][k].name, // OceanHuedClam,
          value: k,
          tip: dict[n][k],
        });
      });

      dict[n] = list;

      // TODO: 文字没有转成中文，需要查找原项目的代码
      console.log("restoreToOptionList list: ", list);
    });
  };

  const generateFilters = () => {
    // TODO: 测试数据
    const dict = {};
    // const dict = {
    //   set: {
    //     EchoesOfAnOffering: 150,
    //     OceanHuedClam: 37,
    //     EmblemOfSeveredFate: 59,
    //     ShimenawasReminiscence: 72,
    //     ArchaicPetra: 8,
    //     NoblesseOblige: 61,
    //     ThunderingFury: 27,
    //     WanderersTroupe: 74,
    //     GladiatorsFinale: 53,
    //     BlizzardStrayer: 10,
    //     TenacityOfTheMillelith: 9,
    //     MaidenBeloved: 2,
    //     Thundersoother: 32,
    //     VermillionHereafter: 177,
    //     HuskOfOpulentDreams: 33,
    //     HeartOfDepth: 6,
    //     RetracingBolide: 7,
    //     ViridescentVenerer: 4,
    //     PaleFlame: 5,
    //     BloodstainedChivalry: 2,
    //   },
    //   slot: { flower: 164, plume: 168, sands: 170, goblet: 168, circlet: 158 },
    //   mainKey: {
    //     hp: 164,
    //     atk: 168,
    //     atkp: 131,
    //     hpp: 92,
    //     em: 43,
    //     er: 20,
    //     defp: 87,
    //     hydroDB: 10,
    //     electroDB: 9,
    //     cryoDB: 8,
    //     pyroDB: 5,
    //     geoDB: 14,
    //     anemoDB: 14,
    //     physicalDB: 8,
    //     cd: 16,
    //     cr: 19,
    //     hb: 20,
    //   },
    // };
    const names = ["set", "slot", "mainKey"];
    // "mainKey", "location", "lock"];
    names.forEach((key) => (dict[key] = countArtifactsByAttr(artifactList as any, key as keyof IArtifact)));

    console.log("dict", dict);
    // restore
    restoreToOptionList(dict, names);

    console.log("countArtifactsByAttr", dict);
    setFilterOptionsMap(dict as any);
  };

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

      <FilterSection>
        <SectionTitle title="筛选">
          {/* <span data-show="store.state.useFilterPro" data-click="useFilterPro(false)">
            基本
          </span>
          <span data-show="!store.state.useFilterPro" data-click="useFilterPro(true)">
            高级
          </span> */}
        </SectionTitle>
        <SectionContent data-show="!store.state.useFilterPro">
          <Filter className="filter">
            <FilterTitle>套装：</FilterTitle>
            <FilterDetail>
              <Select
                value={filterMap.set}
                // options={[{ key: "北京", value: "beijing", tip: "10" }]}
                options={filterOptionsMap.set}
                onSelect={() => undefined}
                data-className="filter-ctrl"
                data-items="store.getters.filterSets"
                data-model-value="store.state.filter.set"
                data-update-model-value="setFilter('set', $event)"
              />
            </FilterDetail>
          </Filter>
          <Filter>
            <FilterTitle>部位：</FilterTitle>
            <FilterDetail>
              <div
                className="filter-ctrl"
                data-items="store.getters.filterSlots"
                data-model-value="store.state.filter.slot"
                data-update-model-value="setFilter('slot', $event)"
              />
            </FilterDetail>
          </Filter>
          {/* <div className="filter">
            <span className="filter-name">主词条：</span>
            <div
              drop-select
              className="filter-ctrl"
              data-items="store.getters.filterMains"
              data-model-value="store.state.filter.main"
              data-update-model-value="setFilter('main', $event)"
            />
          </div>
          <div className="filter">
            <span className="filter-name">角色：</span>
            <div
              drop-select
              className="filter-ctrl"
              data-items="store.getters.filterLocations"
              data-modue="store.state.filter.location"
              data-update-model-value="setFilter('location', $event)"
            />
          </div>
          <div className="filter">
            <span className="filter-name">锁：</span>
            <div
              drop-select
              className="filter-ctrl"
              data-items="store.getters.filterLocks"
              data-model-value="store.state.filter.lock"
              data-update-model-value="setFilter('lock', $event)"
            />
          </div>
          <div className="filter">
            <span className="filter-name">等级：</span>
            <div
              range-slider
              className="filter-ctrl"
              data-model-value="store.state.filter.lvRange"
              data-update-model-value="setFilter('lvRange', $event)"
            />
          </div> */}
        </SectionContent>
      </FilterSection>
    </Container>
  );
};

export default ArtifactRight;
