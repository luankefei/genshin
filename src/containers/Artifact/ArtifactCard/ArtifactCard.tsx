import React, { useEffect, useState, useContext } from "react";

import { IArtifact, Affix } from "../../../interface/genshin.type";
import locale from "../../../utils/locale.chs";
import data from "../../../utils/mona.data";

import { Container, Header, Main } from "./artifact-card.style";
import artifactDict from "src/utils/artifact.dict";

type IProps = IArtifact & {
  weightMap: any;
};

const ArtifactCard = (props: IProps) => {
  const { weightMap } = props;

  const pieceName = () => {
    if (props.set in locale.set && props.slot in locale.slot) {
      const name = locale.set[props.set].name;
      const slot = locale.slot[props.slot][2]; // "花","羽"...
      return `${name} · ${slot}`;
    } else {
      return "未知";
    }
  };

  const main = () => {
    if (props.mainKey in data.mainStat) {
      let key = props.mainKey,
        value = data.mainStat[props.mainKey][props.level];
      return {
        name: locale.affix[key],
        value: new Affix({ key, value }).valueString(),
      };
    } else {
      return { name: "未知", value: 0 };
    }
  };

  // 图片url是使用genshin.dev的数据，文件名使用全小写“-”连接，mona数据中名字使用大驼峰，需要转换
  const bigCamelToKebab = (str) => str.replaceAll(/[A-Z]/g, (c) => "-" + c.toLowerCase()).substring(1);
  const logoNameMap = {
    circlet: "circlet-of-logos",
    flower: "flower-of-life",
    goblet: "goblet-of-eonothem",
    plume: "plume-of-death",
    sands: "sands-of-eon",
  };

  const logoImageUrl = `/artifacts/${bigCamelToKebab(props.set)}/${logoNameMap[props.slot]}`;

  // 圣遗物副词条
  const renderMinors = () => {
    const affixName = (key: string) => {
      let name: string = locale.affix[key];

      console.log("affixName", name, key);
      if (name.endsWith("%")) {
        name = name.substring(0, name.length - 1);
      }
      return name;
    };

    let ret = [];
    const numberKeys = ["hp", "atk", "def", "em"];

    // TODO: 这里和下面的map应该合并，顺便整理一下上面的变量定义
    for (let a of props.minors) {
      let name = affixName(a.key);
      const valueString = numberKeys.includes(a.key) ? a.value : `${a.value}%`;

      ret.push({
        text: `${name}+${valueString}`,
        style: { opacity: weightMap[a.key] > 0 ? 1 : 0.5 },
      });
    }
    return ret.map((item) => (
      <div key={item.text} className="minor-affix" style={item.style}>
        {item.text}
      </div>
    ));
  };

  console.warn("data", props);

  // computed tofixed
  const affnum = {
    cur: props.data.affnum.cur.toFixed(1),
    avg: props.data.affnum.avg.toFixed(1),
    max: props.data.affnum.max.toFixed(1),
    min: props.data.affnum.min.toFixed(1),
  };

  return (
    <Container>
      <Header>
        <div className="head-stat">
          <div className="piece-name">{pieceName()}</div>
          <div className="main-affix-name">{main().name}</div>
          <div className="main-affix-value">{main().value}</div>
          <img src="/icons/stars.png" alt="stars" />
        </div>
        <img src={logoImageUrl} alt={props.set} />
      </Header>
      <Main>
        <div className="body-head">
          <span className="level">+{props.level}</span>
          <span className="cur-an">{props.data.affnum.cur.toFixed(1)}</span>
        </div>
        <div className="minor-affixes">{renderMinors()}</div>
        {props.level < 20 ? (
          <div className="affix-numbers">
            <div className="min-an">最小 {affnum.min}</div>
            <div className="avg-an">期望 {affnum.avg}</div>
            <div className="max-an">最大 {affnum.max}</div>
          </div>
        ) : (
          <div className="full-an" data-else={true}>
            已满级，{affnum.cur}词条
          </div>
        )}
      </Main>
    </Container>
  );
};

export default ArtifactCard;
