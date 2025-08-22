import React from "react";
import { Select } from "antd";
import LanguageOptionItem from "./LanguageOptionItem";
import "../index.css";

const { Option } = Select;

export interface CustomOption {
  code: string;
  label: string;
}

export interface CustomSelectorProps {
  options: CustomOption[];
  value?: string;
  defaultRegion?: string;
  onChange?: (value: string) => void;
  suffixIcon?: React.ReactNode;
  prefixIcon?: React.ReactNode;
  placeholder?: string;            
  width?: number | string;
  size?: "small" | "middle" | "large";
}

const CustomSelector: React.FC<CustomSelectorProps> = ({
  options,
  value,
  defaultRegion,
  onChange,
  suffixIcon,
  prefixIcon,
  width,
  placeholder,
  size = "middle",
}) => {
  const needPrefix = Boolean(prefixIcon);

  const displayValue = value === '' ? undefined : value;

  return (
    <Select
      value={displayValue}
      onChange={onChange}
      suffixIcon={suffixIcon}
      optionLabelProp={needPrefix ? "label" : undefined}  // use custom label if prefix
      style={{ width }}
      placeholder={placeholder}
      size={size}
      defaultValue={defaultRegion}
    >
      {options.map(({ code, label }) => {
        const render = (
          <span style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
            {needPrefix && prefixIcon}
            <LanguageOptionItem code={code} label={label} />
          </span>
        );

        return (
          <Option key={code} value={code} label={render}>
            {render}
          </Option>
        );
      })}
    </Select>
  );
};

export default CustomSelector;
