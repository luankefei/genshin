import Head from "next/head";
import React, { useEffect, useState, useContext } from "react";

import ArtifactCard from "./ArtifactCard";

import { Page, Header, Container, ArtifactList, SideBar } from "./artifact.style";
import ArtifactRight from "./ArtifactRight";
import { IArtifact } from "src/utils/mona.artifact";

const Artifact = () => {
  const [artifactList, setArtifactList] = useState([]);

  const onFileUploaded = (list: IArtifact[]) => {
    setArtifactList(list);
  };

  const renderArtifact = () => artifactList.map((a, index) => <ArtifactCard key={index} {...a} />);

  return (
    <Page>
      <Container>
        <SideBar>
          <ArtifactRight onFileUploaded={onFileUploaded} />
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

export default Artifact;
