import React, { useEffect, useState, useContext } from "react";
import Modal from "../../components/Modal";
import { Container, WeaponModalDetail, WeaponList } from "./artifact-modal.style";

import { ICharacter, IWeaponData } from "../../interface/genshin.type";

type IProps = {
  isOpen: boolean;
  character: ICharacter | null;
  onClose: (state?: string, weapon?: IWeaponData) => void;
};

const ArtifactModal = (props: IProps) => {
  const { isOpen, character, onClose } = props;
  const [visible, setVisible] = useState(isOpen);

  const onModalClose = () => {
    // setElementFilter("");
    // setModalCharacter("");
    onClose();
  };

  const renderArtifactList = () => {
    return <li>1234</li>;
  };

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
            <img className="icon" src="/weapons/kaguras-verity/icon" alt="kaguras-verity" />
            <span>神乐之真意</span>
          </div>
          <div>
            <WeaponList>{renderArtifactList()}</WeaponList>
          </div>
        </WeaponModalDetail>
      </Container>
    </Modal>
  );
};

export default ArtifactModal;
