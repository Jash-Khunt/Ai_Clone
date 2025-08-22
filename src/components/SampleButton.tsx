import type React from "react";
import { Button, Space } from "antd";
import styles from "../styles/try.module.less";

interface SampleButtonProps {
  flag: string;
  text: string;
  subtext: string;
  theme?: "orange" | "blue" | "teal"; // Made optional
  onClick?: () => void;
  className?: string;
}

const SampleButton: React.FC<SampleButtonProps> = ({
  flag,
  text,
  subtext,
  theme = "blue", // Default value
  onClick,
  className,
}) => {
  const themeClass = `${styles.sampleButton} ${
    theme
      ? styles[`sampleButton${theme.charAt(0).toUpperCase() + theme.slice(1)}`]
      : ""
  }`;

  return (
    <Button
      onClick={onClick}
      className={`${themeClass} ${className}`}
      size="middle"
    >
      <Space align="center" size={12}>
        <div
          className={`${styles.sampleFlag} ${
            theme
              ? styles[
                  `sampleFlag${theme.charAt(0).toUpperCase() + theme.slice(1)}`
                ]
              : ""
          }`}
        >
          {flag}
        </div>
        <div className={styles.sampleContent}>
          <div className={styles.sampleText}>{text}</div>
          <div className={styles.sampleSubtext}>{subtext}</div>
        </div>
      </Space>
    </Button>
  );
};

export default SampleButton;
