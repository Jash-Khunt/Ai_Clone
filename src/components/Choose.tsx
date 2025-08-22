import React from "react";
import { Typography } from "antd";
import styles from "../styles/Features.module.less";

const { Title, Text } = Typography;

interface ChooseProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  iconColor?: string;
}

const Choose: React.FC<ChooseProps> = ({
  icon,
  title,
  description,
  iconColor = "#3B82F6",
}) => {
  return (
    <div className={styles.featureCard}>
      <div className={styles.iconWrapper}>
        <div
          className={styles.iconContainer}
          style={{
            color: iconColor,
            backgroundColor: `${iconColor}20`, // 20% opacity background
          }}
        >
          {React.cloneElement(icon as React.ReactElement, {
            size: 28,
            strokeWidth: 1.5,
          })}
        </div>
      </div>
      <div className={styles.cardContent}>
        <Title level={4} className={styles.cardTitle}>
          {title}
        </Title>
        <Text className={styles.cardDescription}>{description}</Text>
      </div>
    </div>
  );
};

export default Choose;
