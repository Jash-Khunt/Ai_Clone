"use client";

import type React from "react";
import { Button, Space } from "antd";

interface CustomButtonProps {
  text: string;
  onClick?: () => void;
  prefixIcon?: React.ReactNode;
  postfixIcon?: React.ReactNode;
  type?: "primary" | "default" | "dashed" | "text" | "link";
  block?: boolean;
  danger?: boolean;
  htmlType?: "button" | "submit" | "reset";
  size?: "small" | "middle" | "large";
  loading?: boolean;
  disabled?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

const CustomButton: React.FC<CustomButtonProps> = ({
  text,
  className,
  onClick,
  prefixIcon,
  postfixIcon,
  type = "primary",
  block = false,
  danger = false,
  htmlType = "button",
  size = "large",
  loading = false,
  disabled = false,
  style,
}) => {
  return (
    <Button
      className={className}
      style={style}
      type={type}
      onClick={onClick}
      htmlType={htmlType}
      block={block}
      danger={danger}
      size={size}
      loading={loading}
      disabled={disabled}
    >
      <Space>
        {prefixIcon}
        <span>{text}</span>
        {postfixIcon}
      </Space>
    </Button>
  );
};

export default CustomButton;
