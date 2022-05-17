import Head from "next/head";
import Router, { withRouter } from "next/router";
import React, { useEffect, useState, useContext } from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { makeSelectWeightMap, makeSelectFilterMap } from "./artifact.selector";

import ArtifactCard from "./ArtifactCard";
import ArtifactRight from "./ArtifactRight";

import { IArtifact } from "../../interface/genshin.type";
import { Page, Header, Container, ArtifactList, SideBar } from "./artifact.style";

type IProps = {
  weightMap: any;
  filterMap: any;
};

const facts = [
  {
    set: "EchoesOfAnOffering",
    slot: "flower",
    rarity: 5,
    level: 20,
    lock: false,
    location: "",
    mainKey: "hp",
    minors: [
      { key: "cr", value: 10.5 },
      { key: "er", value: 11.7 },
      { key: "hpp", value: 4.1 },
      { key: "atkp", value: 8.7 },
    ],
    data: { index: 0, affnum: { cur: 0, avg: 0, min: 0, max: 0 }, lock: false },
  },
  {
    set: "OceanHuedClam",
    slot: "flower",
    rarity: 5,
    level: 20,
    lock: false,
    location: "",
    mainKey: "hp",
    minors: [
      { key: "er", value: 17.5 },
      { key: "atk", value: 16 },
      { key: "atkp", value: 15.2 },
      { key: "hpp", value: 5.3 },
    ],
    data: { index: 1, affnum: { cur: 0, avg: 0, min: 0, max: 0 }, lock: false },
  },
];
const Artifact = (props: IProps) => {
  const { weightMap, filterMap } = props;
  const [sortBy, setSortBy] = useState("avg");
  const [artifactList, setArtifactList] = useState(facts as any);

  //   const stat = computed(() => {
  //     let nAll = store.state.filteredArtifacts.length
  //     let nFull = 0, nLock = 0
  //     for (let a of store.state.filteredArtifacts) {
  //         if (a.level == 20) nFull++
  //         if (a.lock) nLock++
  //     }
  //     return `共${nAll}个圣遗物，满级${nFull}个，加锁${nLock}个，解锁${nAll - nLock}个`
  // })

  const onFileUploaded = (list: IArtifact[]) => {
    setArtifactList(list);
  };

  // hook filter submit
  // const onFilterSubmit = () => {
  //   let ret = artifactList;
  //   // filter
  //   // basic filter
  //   if (filterMap.set) ret = ret.filter((a) => a.set == filterMap.set);
  //   if (filterMap.slot) ret = ret.filter((a) => a.slot == filterMap.slot);
  //   if (filterMap.main) ret = ret.filter((a) => a.mainKey == filterMap.main);
  //   if (filterMap.location != "all") ret = ret.filter((a) => a.location == filterMap.location);
  //   if (filterMap.lock) ret = ret.filter((a) => a.lock.toString() == filterMap.lock);
  //   ret = ret.filter((a) => a.level <= filterMap.lvRange);

  //   // TODO: action同步到store
  //   // weightMapInUse = { ...weightMap };

  //   // update affix numbers
  //   for (let a of ret) {
  //     a.clear();
  //     if (sortBy == "score") a.updateScore();
  //     a.updateAffnum(weightMapInUse);
  //   }
  //   // sort
  //   if (sortBy) {
  //     // sort in descending order of affix number
  //     ret.sort((a, b) => (b.data.affnum as any)[sortBy] - (a.data.affnum as any)[sortBy]);
  //   } else {
  //     // sort in ascending order of index
  //     ret.sort((a, b) => a.data.index - b.data.index);
  //   }
  //   // update
  //   setArtifactList(ret);
  // };

  const renderArtifact = () =>
    artifactList.map((a, index) => <ArtifactCard key={index} weightMap={weightMap} {...a} />);

  return (
    <Page>
      <Container>
        <SideBar>
          <ArtifactRight
            onFileUploaded={onFileUploaded}
            weightMap={weightMap}
            filterMap={filterMap}
            artifactList={artifactList}
            // onFilterSubmit={onFilterSubmit}
          />
        </SideBar>
        <ArtifactList>
          <ul>{renderArtifact()}</ul>
        </ArtifactList>
      </Container>
    </Page>
  );
};

const mapStateToProps = createStructuredSelector({
  weightMap: makeSelectWeightMap(),
  filterMap: makeSelectFilterMap(),
});

const withConnect = connect(mapStateToProps);

export default compose(withConnect, withRouter)(Artifact);
