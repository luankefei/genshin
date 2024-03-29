import React, { useEffect, useState, useContext } from "react";
import Modal from "../../components/Modal";
import Image from "next/image";

import { ICharacter, IWeapon, IWeaponData } from "../../interface/genshin.type";
// import { IWeaponData } from "../../interface/genshin.type";

import { weapons, weaponMap } from "../../utils/weapon.data";
import { Container, WeaponModalDetail, WeaponList } from "./weapon-modal.style";

type IProps = {
  isOpen: boolean;
  character: ICharacter | null;
  onClose: (state?: string, weapon?: IWeaponData) => void;
};

const WeaponModal = (props: IProps) => {
  const { isOpen, character, onClose } = props;
  const [visible, setVisible] = useState(isOpen);

  useEffect(() => {
    if (isOpen !== visible) setVisible(isOpen);
  }, [isOpen, visible]);

  const onModalClose = () => {
    // setElementFilter("");
    // setModalCharacter("");
    onClose();
  };

  const onWeaponClick = (weaponName: string) => () => {
    onClose("onselect", weaponMap[weaponName]);
  };

  // 只显示角色相关武器
  const renderWeaponList = () =>
    weapons
      .filter((item) => weaponMap[item])
      .filter((item) => weaponMap[item].type.toLowerCase() === character?.weaponType)
      .map((item) => {
        const bgClassName = "character-bg-" + weaponMap[item]?.rarity || "4";

        return (
          <li key={item} onClick={onWeaponClick(item)}>
            <img className={`icon ${bgClassName}`} src={`/weapons/${item}/icon`} alt={item} />
            <span>{weaponMap[item].name}</span>
          </li>
        );
      });

  return (
    <Modal visible={visible} onClose={onModalClose}>
      <Container>
        <WeaponModalDetail>
          <div
            className="header"
            style={{
              backgroundImage: `url(https://seelie.inmagi.com/img/characters/bg/${character && character.enName}.png)`,
            }}
          >
            <img className="icon" src={`/weapons/${character?.weapon.id}/icon`} alt={character?.weapon.id} />
            <span>{character?.weapon.name}</span>
          </div>
          <div>
            <WeaponList>{renderWeaponList()}</WeaponList>
          </div>
        </WeaponModalDetail>
      </Container>
    </Modal>
  );
};

export default WeaponModal;
