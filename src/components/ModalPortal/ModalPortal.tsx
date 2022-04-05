/**
 * 通用Modal组件
 */
import { FC, useState, useEffect } from "react";
import type { ReactNode } from "react";
import { createPortal } from "react-dom";
import { canUseDOM } from "../../utils/safeHTMLElement";
import { Wrapper, CloseButton, Container } from "./modal-portal.style";

export type ModalProps = {
  visible: boolean;
  children: ReactNode;
  showCloseButton?: boolean;
  onClose?: () => void;
};

let node: HTMLElement | null = null;

const ModalPortal: FC<ModalProps> = (props) => {
  // console.log("ModalPortal ==============", props, props.visible);
  const { visible } = props;

  const [open, setOpen] = useState(visible);

  useEffect(() => {
    if (!canUseDOM) return;
    node = document.createElement("div");
    node.className = "ReactModalPortal";

    document.body.appendChild(node);
  }, []);

  useEffect(() => {
    if (visible !== open) setOpen(visible);
    // console.log("ModalPortal ============== useEffect", visible);
  }, [visible, open]);

  const onClose = () => {
    setOpen(false);
    if (props.onClose) props.onClose();
  };

  // only in client side
  if (!canUseDOM) return null;

  return createPortal(
    open ? (
      <Wrapper>
        <CloseButton onClick={onClose}>
          <img src="/static/icons/close.png" alt="关闭" />
        </CloseButton>
        <Container>
          <div>{props.children}</div>
        </Container>
      </Wrapper>
    ) : null,
    node || document.body
  );
};

export default ModalPortal;
