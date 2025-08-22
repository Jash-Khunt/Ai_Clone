import type React from "react";
import { Typography } from "antd";
import styles from "../styles/try.module.less";

const { Title, Text } = Typography;

interface StatisticItemProps {
  number: string;
  label: string;
  subtext?: string;
  color?: "blue" | "purple" | "green";
}

const StatisticItem: React.FC<StatisticItemProps> = ({
  number,
  label,
  subtext,
  color = "blue",
}) => {
  return (
    <div className={styles.statisticItem}>
      <Title
        level={2}
        className={`${styles.statisticNumber} ${
          styles[
            `statisticNumber${color.charAt(0).toUpperCase() + color.slice(1)}`
          ]
        }`}
      >
        {number}
      </Title>
      <Text className={styles.statisticLabel}>{label}</Text>
      {subtext && (
        <Text
          className={`${styles.statisticSubtext} ${styles.statisticSubtextGreen}`}
        >
          {subtext}
        </Text>
      )}
    </div>
  );
};

export default StatisticItem;
