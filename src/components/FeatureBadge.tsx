import type React from "react";
import { Typography } from "antd";
import styles from "../styles/SeeAiInAction.module.less";

const { Text } = Typography;

interface FeatureBadgeProps {
  text: string;
  variant?: "success" | "info" | "purple" | "warning";
  dotColor?: string;
  className?: string;
}

const FeatureBadge: React.FC<FeatureBadgeProps> = ({
  text,
  variant = "info",
  dotColor,
  className = "",
}) => {
  const badgeClass = `${styles.featureBadge} ${
    styles[`featureBadge${variant.charAt(0).toUpperCase() + variant.slice(1)}`]
  }`;

  return (
    <div className={`${badgeClass} ${className}`}>
      <div className={styles.featureBadgeContent}>
        <span
          className={styles.featureBadgeDot}
          style={{ backgroundColor: dotColor }}
        />
        <Text className={styles.featureBadgeText}>{text}</Text>
      </div>
    </div>
  );
};

export default FeatureBadge;
