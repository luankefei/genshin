import React, { useEffect, useState, useContext } from "react";

import ElementFilter from "../../components/ElementFilter";
import CharacterModal, { DEFAULT_WEAPON_DETAIL } from "../../components/CharacterModal";

import { ClientContext } from "../../context/ClientProvider";
import storage from "../../utils/storage";
import { artifactMap } from "../../utils/artifact.data";
import locale from "../../utils/locale.chs";

import { Page, Header, Container } from "./role.style";
import WeaponModal from "../../components/WeaponModal";
import ArtifactModal from "../../components/ArtifactModal";

import { ICharacter, IWeapon, IWeaponData } from "../../interface/genshin.type";

const Role = () => {
  const client = useContext(ClientContext);

  // 当前选中的角色
  const [character, setCharacter] = useState<ICharacter | null>(null);

  // 当前选中的角色的武器
  const [weapon, setWeapon] = useState<IWeapon | null>(null);

  // 页面渲染的角色列表
  const [characterList, setCharacterList] = useState<ICharacter[]>([]);

  // 三个浮层状态
  const [characterModalVisible, setCharacterModalVisible] = useState(false);
  const [weaponModalVisible, setWeaponModalVisible] = useState(false);
  const [artifactModalVisible, setArtifactModalVisible] = useState(false);
  // const [elementFilter, setElementFilter] = useState("");
  // const [weaponModalVisible, setWeaponModalVisible] = useState(false);

  useEffect(() => {
    // client.get("https://api.genshin.dev/characters").then((res) => {
    //   console.log("api.genshin.dev res count: ", res.length);
    // });

    // TODO: 暂时从storage中获取数据恢复列表
    setCharacterList(storage.get("characterList") || []);
  }, []);

  const showCharacterModal = () => {
    setCharacterModalVisible(true);
  };

  const onTableCellClick = (character: ICharacter, key: string) => () => {
    setCharacter(character);
    setWeapon({ ...character.weapon, id: character.weapon.id.replaceAll("_", "-") });
    if (key === "weapon") console.log("showWeaponMoodal");

    showCharacterModal();
  };

  const addCharacter = () => {
    setCharacter(null);
    showCharacterModal();
  };

  const clearCharacter = () => {
    setCharacter(null);
    setCharacterList([]);
    storage.clear();
  };

  const onCharacterModalClose = (state?: string, character?: ICharacter) => {
    // 修改角色数据
    if ((state === "onsubmit" || state === "onselect") && character) {
      const obj: ICharacter = JSON.parse(JSON.stringify(character));

      setCharacter(obj);

      // case 1: 不将数据带回列表
      if (state === "onselect") return;

      let list = [];
      if (characterList.find((c) => c.name === obj.name)) {
        list = characterList.map((item) => (item.name === obj.name ? obj : item));
      } else {
        list = characterList.concat([obj]);
      }

      setCharacterList(list);

      // 3.24 新增将数据同步到 storage
      storage.set("characterList", list);
    }

    // 弹出武器浮层
    if (state === "showWeapon") return setWeaponModalVisible(true);

    // 弹出圣遗物浮层
    if (state === "showArtifact") return setArtifactModalVisible(true);

    // 只关闭
    if (!state) setCharacter(null);

    // 默认行为：关闭角色浮层
    setCharacterModalVisible(false);
  };

  const onWeaponModalClose = (state?: string, weapon?: IWeaponData) => {
    if (state === "onselect" && weapon && character) {
      // 5.16 由于函数式组件的浅比较问题 这里尝试不再更新到character
      const weaponObj = { ...DEFAULT_WEAPON_DETAIL, ...character.weapon, ...weapon };
      weaponObj.id = weaponObj.id.replaceAll("_", "-");
      setWeapon(weaponObj);

      // character.weapon = { ...JSON.parse(JSON.stringify(DEFAULT_WEAPON_DETAIL)), ...weapon };
      // character.weapon.id = character.weapon.id.replaceAll("_", "-");

      setCharacter({ ...character, weapon: weaponObj });

      // TODO: 更新列表
      // setCharacterModalVisible(true);
    }

    setWeaponModalVisible(false);
  };

  const onArtifactModalClose = (state?: string, weapon?: IWeaponData) => {
    if (state === "onselect" && weapon && character) {
      console.log("setCharacter");
    }

    console.log("onArtifactModalClose");
  };

  const renderCharacterList = () => {
    return (characterList as ICharacter[]).map((c, index) => {
      const talent = Object.keys(c.talents)
        .map((k: string) => c.talents[k])
        .join(" / ");

      return (
        <tr key={c.enName}>
          <td width="7%">{index + 1}</td>
          <td width="15%" className="left middle" onClick={onTableCellClick(c, "name")}>
            <img className="icon" src={`/characters/${c.enName}/icon`} alt={c.enName} width="40" height="40" />
            <span>{locale.character[c.name] || c.name}</span>
          </td>
          <td width="8%" onClick={onTableCellClick(c, "level")}>
            {c.level}
          </td>
          <td width="10%" onClick={onTableCellClick(c, "talent")}>
            {talent}
          </td>
          <td width="7%" onClick={onTableCellClick(c, "constellation")}>
            {c.constellation}
          </td>
          <td width="20%" className="left" onClick={onTableCellClick(c, "artifact")}>
            <ul>
              <li>有效词条：{c.artifacts.count}</li>
              <li>主词条：{c.artifacts.main}</li>
              <li>双爆：{c.artifacts.critical_score}</li>
              <li>套装：{c.artifacts.list.map((item) => artifactMap[item]?.data?.zh.name).join(" / ")}</li>
            </ul>
          </td>
          <td width="16%" className="left" onClick={onTableCellClick(c, "weapon")}>
            <ul>
              <li>名称：{c.weapon.name}</li>
              <li>精炼：{c.weapon.affix}</li>
              <li>等级：{c.weapon.level}</li>
            </ul>
          </td>
          <td width="11%" onClick={onTableCellClick(c, "score")}>
            {c.score}
          </td>
          <td width="6%" onClick={onTableCellClick(c, "update")}>
            {c.update}
          </td>
        </tr>
      );
    });
  };

  return (
    <Page>
      <Header>
        <button className="add-character" onClick={addCharacter}>
          添加角色
        </button>

        <button className="clear-character" onClick={clearCharacter}>
          清空角色
        </button>
        <div className="element-filter-wrapper">
          <ElementFilter />
        </div>
      </Header>

      <Container>
        <div>
          <table>
            <thead>
              <tr>
                <th>序号</th>
                <th>角色</th>
                <th>等级</th>
                <th>天赋</th>
                <th>命座</th>
                <th>圣遗物（有效词条、充能、套装）</th>
                <th>武器</th>
                <th>练度打分（0-100）</th>
                <th>最后更新</th>
              </tr>
            </thead>
            <tbody>{renderCharacterList()}</tbody>
          </table>
        </div>
      </Container>
      <CharacterModal
        isOpen={characterModalVisible}
        weapon={weapon}
        character={character}
        onClose={onCharacterModalClose}
      />
      <WeaponModal isOpen={weaponModalVisible} character={character} onClose={onWeaponModalClose} />
      <ArtifactModal isOpen={artifactModalVisible} character={character} onClose={onArtifactModalClose} />
    </Page>
  );
};

export default Role;
