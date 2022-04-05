import React, { FC, useState, useEffect } from "react";
import type { ReactNode } from "react";
import ModalPortal from "../ModalPortal";
import SSRSuspense, { cloneElement } from "../SSRSuspense";

/**
 * 通用Modal组件
 */
export type ModalProps = {
  visible: boolean;
  children: ReactNode;
  showCloseButton?: boolean;
  onClose?: () => void;
};

const Modal: FC<ModalProps> = (props) => {
  // const { visible, children, showCloseButton, onClose } = props;
  // console.log("Modal render visible ========", props.visible);
  return (
    <SSRSuspense fallback={<>hehe</>} {...props}>
      <ModalPortal {...props} />
    </SSRSuspense>
  );
};

export default Modal;
