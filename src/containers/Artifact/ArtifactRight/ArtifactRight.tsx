import SectionTitle from "../SectionTitle";

import log from "../../../utils/log";
import mona from "../../../utils/mona";
import { Container, Uploader, UploadMessage, SectionContent, WeightSection } from "./artifact-right.style";
import { IArtifact } from "src/utils/mona.artifact";

type IProps = {
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
  const { onFileUploaded } = props;

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

        {/* <label htmlFor="select-file">
          <div className="select-img">
            <img src="/icon/select_photo.png" alt="更换照片" />
            <span>更换照片</span>
          </div>
        </label> */}
        <input id="select-file" type="file" onChange={fileChange} accept=".json" />
      </Uploader>
      <WeightSection>
        <SectionTitle title="词条权重" />
        <div data-style="margin-top: 14px;">
          <button
            value-button
            data-class="weight-button"
            data-for="(_, key) in store.state.weight"
            data-model-value="store.state.weight[key]"
            data-update-model-value="setWeight(key as string, $event)"
          >
            chs.affix as any[key]
          </button>
        </div>
      </WeightSection>
    </Container>
  );
};

export default ArtifactRight;
