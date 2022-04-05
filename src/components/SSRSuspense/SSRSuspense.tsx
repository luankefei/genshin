import React, { FC, useState, useEffect } from "react";
import type { ReactNode, ReactElement } from "react";
// import { canUseDOM } from "../../utils/safeHTMLElement";

type IProps = {
  fallback: ReactElement;
  children: ReactElement;
};

type IState = {
  nodes: ReactNode;
};

export const cloneElement = (child, props) => {
  // Checking isValidElement is the safe way and avoids a typescript
  // error too.
  if (React.isValidElement(child)) {
    return React.cloneElement(child, { ...props });
  }
  return child;
};

const SSRSuspense: FC<IProps> = (props) => {
  const { children, fallback } = props;
  const [ssrState, setSSRState] = useState(true);

  useEffect(() => {
    setSSRState(false);
  }, []);

  // const childrenWithProps = React.Children.map(children, (child) => cloneElement(child, props));
  return ssrState ? fallback : children;
};

export default SSRSuspense;
