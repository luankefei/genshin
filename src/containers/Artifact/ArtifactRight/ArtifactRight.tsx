import SectionTitle from "../SectionTitle";
import Select from "../Select";

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
import localeChs from "src/utils/locale.chs";

type IProps = {
  weightMap: any;
  onFileUploaded: (list: IArtifact[]) => void;
};

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

const ArtifactRight = (props: IProps) => {
  const { weightMap, onFileUploaded } = props;

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

    console.log("imageUrl", artifacts);

    // const fileName = `checkin_custom_${today}_${userInfo.user_id}_${file.name}`;
    if (artifacts && artifacts.length) {
      console.log("setArtifactList");
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
    console.log("renderWeightButtons", weightMap);
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
          <span data-show="store.state.useFilterPro" data-click="useFilterPro(false)">
            基本
          </span>
          <span data-show="!store.state.useFilterPro" data-click="useFilterPro(true)">
            高级
          </span>
        </SectionTitle>
        <SectionContent data-show="!store.state.useFilterPro">
          <Filter className="filter">
            <FilterTitle>套装：</FilterTitle>
            <FilterDetail>
              <Select
                value="全部"
                options={[{ key: "北京", value: "beijing", tip: "10" }]}
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
