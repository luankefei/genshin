import Head from "next/head";
import React, { useEffect, useState, useContext } from "react";

import ArtifactCard from "../../components/ArtifactCard";
import { Page, Header, Container, ArtifactList, SideBar } from "./artifact.style";

const Artifact = () => {
  return (
    <Page>
      <Header>header</Header>
      <Container>
        <SideBar>222</SideBar>
        <ArtifactList>
          <ul>
            <ArtifactCard />
            <ArtifactCard />
          </ul>
        </ArtifactList>
      </Container>
    </Page>
  );
};

export default Artifact;
