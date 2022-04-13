import React, { useState } from "react";
import { DropSelect, Option } from "./select.style";

type IOption = {
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
  const [visible, setVisible] = useState(true);

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
    return options.map((op, index) => (
      <Option key={index} className="option" onClick={onOptionSelect(op)}>
        <span className="value">{op.value}</span>
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
      <span>{value}</span>
      <i />
      <ul style={{ display: visible ? "block" : "none" }}>{renderOptions()}</ul>
    </DropSelect>
  );
};

export default Select;
