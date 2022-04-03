import React, { FC, useState, useEffect } from "react";
import type { ReactNode } from "react";
// import { canUseDOM } from "../../utils/safeHTMLElement";

type IProps = {
  fallback: ReactNode;
  children: ReactNode;
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
  // const [ssrState, setSSRState] = useState(typeof window === "undefined" || !canUseDOM);
  const [nodes, setNodes] = useState(fallback);

  useEffect(() => {
    setNodes(childrenWithProps);
  }, []);

  const childrenWithProps = React.Children.map(children, (child) => cloneElement(child, props));
  return <>{nodes}</>;
};

export default SSRSuspense;
