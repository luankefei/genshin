import Head from "next/head";
import Router, { withRouter } from "next/router";
import React, { useEffect, useState, useContext } from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import { actions } from "./artifact.reducer";
import { makeSelectArtifacts, makeSelectWeightMap, makeSelectFilterMap } from "./artifact.selector";

import ArtifactCard from "./ArtifactCard";
import ArtifactRight from "./ArtifactRight";

import { IArtifact } from "../../interface/genshin.type";
import { Page, Header, Container, ArtifactList, SideBar } from "./artifact.style";

type IProps = {
  weightMap: any;
  filterMap: any;
  artifactList: any[];
  createArtifacts: (payload: { artifacts: IArtifact[] }) => void;
  updateArtifacts: () => void;
};

const Artifact = (props: IProps) => {
  const { weightMap, filterMap, artifactList, createArtifacts, updateArtifacts } = props;

  // TODO: 排序暂未使用
  const [sortBy, setSortBy] = useState("avg");

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
    createArtifacts({ artifacts: list });
    updateArtifacts();
  };

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
  artifactList: makeSelectArtifacts(),
});

const mapDispatchToProps = {
  createArtifacts: actions.createArtifacts,
  updateArtifacts: actions.updateArtifacts,
};

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect, withRouter)(Artifact);
