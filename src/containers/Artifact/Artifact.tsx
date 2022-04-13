import Head from "next/head";
import Router, { withRouter } from "next/router";
import React, { useEffect, useState, useContext } from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { makeSelectWeightMap, makeSelectFilterMap } from "./artifact.selector";

import ArtifactCard from "./ArtifactCard";
import ArtifactRight from "./ArtifactRight";

import { IArtifact } from "../../utils/mona.artifact";
import { Page, Header, Container, ArtifactList, SideBar } from "./artifact.style";

type IProps = {
  weightMap: any;
  filterMap: any;
};

const Artifact = (props: IProps) => {
  const { weightMap, filterMap } = props;
  const [artifactList, setArtifactList] = useState([]);

  // console.log("DATA FROM REDUX", weightMap);

  const onFileUploaded = (list: IArtifact[]) => {
    setArtifactList(list);
  };

  const renderArtifact = () => artifactList.map((a, index) => <ArtifactCard key={index} {...a} />);

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
          <ul>
            {renderArtifact()}
            {/* <ArtifactCard />
            <ArtifactCard /> */}
          </ul>
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
