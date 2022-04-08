import React, { useEffect, useState, useContext } from "react";
import { Container, Elements } from "./element-filter.style";

const ElementFilter = () => {
  const [elementFilter, setElementFilter] = useState("");

  const clickElementFilter = (e: any) => {
    let node = e.target;
    while (node.nodeName && node.nodeName !== "LI") node = node.parentNode;

    const element = node.dataset.name || "";

    if (elementFilter === element) return setElementFilter("");
    setElementFilter(node.dataset.name || "");
  };

  // 角色浮层的元素筛选
  const renderElementFilter = () => {
    // 风 冰 草 雷 岩 水 火
    const elements = ["anemo", "cryo", "dendro", "electro", "geo", "hydro", "pyro"];

    return elements.map((item) => (
      <li className={item === elementFilter ? "selected" : ""} data-name={item} key={item}>
        <img src={`/elements/${item}.png`} alt={item} />
      </li>
    ));
  };

  return (
    <Container>
      <Elements onClick={clickElementFilter}>
        <ul>{renderElementFilter()}</ul>
      </Elements>
    </Container>
  );
};

export default ElementFilter;
