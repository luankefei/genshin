import { useState, useEffect } from "react";
import RangeSlider from "react-rangeslider";

import SectionTitle from "../SectionTitle";
import Select from "../Select";
import type { IOption } from "../Select";
import artifactDict from "src/utils/artifact.dict";
import localeChs from "src/utils/locale.chs";
import { IArtifact } from "src/utils/mona.artifact";

import { Container, Filter, FilterTitle, FilterDetail } from "./filter-section.style";
import { SectionContent } from "../ArtifactRight/artifact-right.style";

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
  filterMap: any;
  artifactList: any[];
};

const FilterSection = (props: IProps) => {
  const { filterMap, artifactList } = props;

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
  }, [artifactList]);
  // }, []);

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
        console.log("------------------ forEach", mapping[n][k], dict[n][k], n, k, dict, mapping);
        let key = n === "set" ? mapping[n][k].name : mapping[n][k];

        // mainKey词条需要翻译
        if (n === "mainKey") key = localeChs.affix[k];

        list.push({
          key, // OceanHuedClam,
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
    const names = ["set", "slot", "mainKey"];
    // "mainKey", "location", "lock"];
    names.forEach((key) => (dict[key] = countArtifactsByAttr(artifactList as any, key as keyof IArtifact)));

    console.log("====== FilterOptionsMap dict", dict);
    // restore
    restoreToOptionList(dict, names);

    console.log("countArtifactsByAttr", dict);
    setFilterOptionsMap(dict as any);
  };

  return (
    <Container>
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
            <Select
              value={filterMap.slot}
              options={filterOptionsMap.slot}
              onSelect={() => undefined}
              data-className="filter-ctrl"
              data-items="store.getters.filterSlots"
              data-update-model-value="setFilter('slot', $event)"
            />
          </FilterDetail>
        </Filter>
        <Filter>
          <FilterTitle>主词条：</FilterTitle>
          <FilterDetail>
            <Select
              value={filterMap.mainKey}
              options={filterOptionsMap.mainKey}
              onSelect={() => undefined}
              data-className="filter-ctrl"
              data-items="store.getters.filterMains"
              data-model-value="store.state.filter.main"
              data-update-model-value="setFilter('main', $event)"
            />
          </FilterDetail>
        </Filter>
        <div className="filter">
          <span className="filter-name">等级：</span>

          <RangeSlider value={filterMap.lvRange} onChange={() => undefined} />
          <div
            range-slider
            className="filter-ctrl"
            data-model-value="store.state.filter.lvRange"
            data-update-model-value="setFilter('lvRange', $event)"
          />
        </div>
      </SectionContent>
    </Container>
  );
};

export default FilterSection;
