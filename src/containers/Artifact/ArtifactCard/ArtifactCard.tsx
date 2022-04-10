import React, { useEffect, useState, useContext } from "react";

import { IArtifact, Affix } from "../../../utils/mona.artifact";
import locale from "../../../utils/locale.chs";
import data from "../../../utils/mona.data";

import { Container, Header, Main } from "./artifact-card.style";

const ArtifactCard = (props: IArtifact) => {
  //   <artifact-card
  //   v-for="a in store.state.filteredArtifacts"
  //   :artifact="a"
  //   :select-mode="selectMode"
  //   :selected="selected(a.data.index)"
  //   @flip-select="flipSelect(a.data.index, $event)"
  //   @flip-lock="flipLock(a.data.index)"
  //   @edit="edit(a.data.index)"
  // />
  const pieceName = () => {
    if (props.set in locale.set && props.slot in locale.slot) {
      let name = locale.set[props.set].name;
      let slot = locale.slot[props.slot][2]; // "花","羽"...
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

  const logoImageUrl = `/artifacts/${bigCamelToKebab(props.set)}/circlet-of-logos`;

  // 圣遗物副词条
  const renderMinors = () => {
    const affixName = (key: string) => {
      let name: string = locale.affix[key];
      if (name.endsWith("%")) {
        name = name.substring(0, name.length - 1);
      }
      return name;
    };

    let ret = [];
    for (let a of props.minors) {
      let name = affixName(a.key);
      ret.push({
        text: `· ${name}+${a.valueString()}`,
        // TODO: 这里是和筛选项相关的功能，过滤无效词条
        // style: `opacity: ${store.state.weightInUse[a.key] > 0 ? 1 : 0.5};`,
      });
    }
    return ret.map((item) => (
      <div key={item.text} className="minor-affix">
        {item.text}
      </div>
    ));
  };

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
        <div className="affix-numbers" v-if="artifact.level < 20">
          <div className="min-an">最小 {affnum.min}</div>
          <div className="avg-an">期望 {affnum.avg}</div>
          <div className="max-an">最大 {affnum.max}</div>
        </div>
        <div className="full-an" data-else={true}>
          已满级，{affnum.cur}词条
        </div>
      </Main>
    </Container>
  );
};

export default ArtifactCard;
