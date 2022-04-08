import React, { useEffect, useState, useContext } from "react";

import { Container, Header, Main } from "./artifact-card.style";

const ArtifactCard = () => {
  return (
    <Container>
      <Header>
        <div className="head-stat">
          <div className="piece-name">pieceName</div>
          <div className="main-affix-name">main.name</div>
          <div className="main-affix-value">main.value</div>
          <img src="/icons/stars.png" alt="stars" />
        </div>
        <img src="/artifacts/adventurer/circlet-of-logos" alt="adventurer" />
      </Header>
      <Main>
        <div className="body-head">
          <span className="level">level</span>
          <span className="cur-an">affnum.cur</span>
        </div>
        <div className="minor-affixes">
          <div className="minor-affix" v-for="a in minors" data-style="a.style">
            a.text
          </div>
        </div>
        <div className="affix-numbers" v-if="artifact.level < 20">
          <div className="min-an">最小 affnum.min</div>
          <div className="avg-an">期望affnum.avg</div>
          <div className="max-an">最大affnum.max</div>
        </div>
        {/* <div className="full-an" v-else={true}>
          已满级，affnum.cur词条
        </div> */}
      </Main>
    </Container>
  );
};

export default ArtifactCard;
