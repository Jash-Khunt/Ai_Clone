"use client";

import type React from "react";
import { Card } from "antd";
import { theme } from "../styles/theme";

interface CustomCardProps {
  children: React.ReactNode;
  className?: string;
  bodyClassName?: string;
  style?: React.CSSProperties;
  hoverable?: boolean;
  bordered?: boolean;
  size?: "default" | "small";
  bodyStyle?: React.CSSProperties;
  headStyle?: React.CSSProperties;
  title?: React.ReactNode;
  extra?: React.ReactNode;
  cover?: React.ReactNode;
  actions?: React.ReactNode[];
  loading?: boolean;
  onClick?: () => void;
}

const CustomCard: React.FC<CustomCardProps> = ({
  children,
  className,
  bodyClassName,
  style,
  hoverable = false,
  bordered = false,
  size = "default",
  bodyStyle,
  headStyle,
  title,
  extra,
  cover,
  actions,
  loading = false,
  onClick,
}) => {
  const defaultStyle: React.CSSProperties = {
    backgroundColor: theme.colors.cardBackground,
    borderRadius: theme.borderRadius.xl,
    boxShadow: theme.shadows.lg,
    border: `1px solid ${theme.colors.border}`,
    transition: theme.transitions.shadow,
    ...style,
  };

  const defaultBodyStyle: React.CSSProperties = {
    padding: size === "small" ? theme.spacing.lg : theme.spacing.xl,
    ...bodyStyle,
  };

  return (
    <Card
      className={className}
      style={defaultStyle}
      hoverable={hoverable}
      bordered={bordered}
      size={size}
      bodyStyle={{ padding: 0 }}
      headStyle={headStyle}
      title={title}
      extra={extra}
      cover={cover}
      actions={actions}
      loading={loading}
      onClick={onClick}
    >
      <div className={bodyClassName} style={defaultBodyStyle}>
        {children}
      </div>
    </Card>
  );
};

export default CustomCard;
