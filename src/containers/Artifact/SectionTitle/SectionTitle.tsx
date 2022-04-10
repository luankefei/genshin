import type { ReactNode } from "react";
import { Container } from "./section-title.style";

type IProps = {
  title: string;
  children?: ReactNode;
};

const SectionTitle = (props: IProps) => {
  const { title, children } = props;

  return (
    <Container>
      <span>{title}</span>
      {children ? <div className="section-opts">{children}</div> : null}
    </Container>
  );
};

export default SectionTitle;
