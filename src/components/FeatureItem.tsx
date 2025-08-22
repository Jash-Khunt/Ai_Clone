import type React from "react";
import { Typography } from "antd";
import styles from "../styles/try.module.less";

const { Title, Text } = Typography;

interface FeatureItemProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  color?: "blue" | "green" | "purple" | "orange";
}

const FeatureItem: React.FC<FeatureItemProps> = ({
  icon,
  title,
  description,
  color = "blue",
}) => {
  return (
    <div className={styles.featureItem}>
      <div
        className={`${styles.featureIconWrapper} ${
          styles[`featureIcon${color.charAt(0).toUpperCase() + color.slice(1)}`]
        }`}
      >
        {icon}
      </div>
      <Title level={5} className={styles.featureTitle}>
        {title}
      </Title>
      <Text className={styles.featureDescription}>{description}</Text>
    </div>
  );
};

export default FeatureItem;
