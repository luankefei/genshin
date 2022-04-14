import React, { useState } from "react";
import { DropSelect, Option } from "./select.style";

export type IOption = {
  key: string;
  value: string | number;
  tip: string;
};

type IProps = {
  value: string | number;
  options: IOption[];
  onSelect: (value: string | number) => void;
};

const Select = (props: IProps) => {
  const { value, options } = props;
  const [visible, setVisible] = useState(false);

  // console.log("renderSelect", options, options.length);

  const toggleOptions = (state: boolean) => () => {
    if (visible !== state) setVisible(state);
  };

  // const onSelectClick = () => {
  //   setVisible(!visible);
  // };

  const onOptionSelect = (op: IOption) => () => {
    console.log("onOptionSelect", op);
  };

  const renderOptions = () => {
    if (!options.length) return [];
    return options.map((op, index) => (
      <Option key={index} className="option" onClick={onOptionSelect(op)}>
        <span className="value">{op.key}</span>
        <i className="tip">{op.tip}</i>
      </Option>
    ));
  };

  return (
    <DropSelect
      tabIndex={-1}
      // onClick={onSelectClick}
      onMouseEnter={toggleOptions(true)}
      onMouseLeave={toggleOptions(false)}
    >
      <span>{value || "全部"}</span>
      <i />
      <ul style={{ display: visible ? "block" : "none" }}>{renderOptions()}</ul>
    </DropSelect>
  );
};

export default Select;
