import React, { FC, useState, useEffect } from "react";
import type { ReactNode } from "react";
// import ModalPortal from "../ModalPortal";
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
  const { visible, children, showCloseButton, onClose } = props;
  return (
    <SSRSuspense fallback={<>hehe</>}>{cloneElement(children, { visible, showCloseButton, onClose })}</SSRSuspense>
  );
};

export default Modal;
