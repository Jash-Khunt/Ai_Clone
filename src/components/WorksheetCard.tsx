import type React from "react";
import { Space, Typography } from "antd";
import { Eye, FileText } from "lucide-react";
import CustomCard from "./CustomCard";
import CustomButton from "./CustomButton";
import styles from "../styles/try.module.less";

const { Title, Text } = Typography;

interface DetailItem {
  icon: React.ReactNode;
  text: string;
}

interface WorksheetCardProps {
  flag: string;
  category: string;
  title: string;
  description: string;
  details: DetailItem[];
  theme?: "orange" | "blue" | "teal"; // Made optional
  onPreview?: () => void;
  onUseTemplate?: () => void;
}

const WorksheetCard: React.FC<WorksheetCardProps> = ({
  flag,
  category,
  title,
  description,
  details,
  theme = "blue", // Default value
  onPreview,
  onUseTemplate,
}) => {
  const themeClass = `${styles.worksheetCard} ${
    theme
      ? styles[`worksheetCard${theme.charAt(0).toUpperCase() + theme.slice(1)}`]
      : ""
  }`;

  return (
    <CustomCard className={themeClass}>
      <div className={styles.worksheetCardContent}>
        <div className={styles.worksheetHeader}>
          {theme && (
            <div
              className={`${styles.topBorder} ${
                styles[
                  `topBorder${theme.charAt(0).toUpperCase() + theme.slice(1)}`
                ]
              }`}
            ></div>
          )}
          <Space align="center" className={styles.cardCategory}>
            <div
              className={`${styles.flagIcon} ${
                theme
                  ? styles[
                      `flagIcon${
                        theme.charAt(0).toUpperCase() + theme.slice(1)
                      }`
                    ]
                  : ""
              }`}
            >
              {flag}
            </div>
            <div>
              <Text className={styles.categoryText}>{category}</Text>
              <div className={styles.categoryBadge}>
                {theme === "orange" && (
                  <span className={styles.verifiedBadge}>✓ Verified</span>
                )}
                {theme === "blue" && (
                  <span className={styles.popularBadge}>👑 Popular</span>
                )}
                {theme === "teal" && (
                  <span className={styles.bilingualBadge}>🌟 Bilingual</span>
                )}
              </div>
            </div>
          </Space>
        </div>

        <Title level={5} className={styles.cardTitle}>
          {title}
        </Title>

        <Text className={styles.cardDescription}>{description}</Text>

        <div className={styles.cardDetails}>
          {details.map((detail, index) => (
            <div key={index} className={styles.detailItem}>
              <span
                className={`${styles.detailIcon} ${
                  theme
                    ? styles[
                        `detailIcon${
                          theme.charAt(0).toUpperCase() + theme.slice(1)
                        }`
                      ]
                    : ""
                }`}
              >
                {detail.icon}
              </span>
              <Text className={styles.detailText}>{detail.text}</Text>
            </div>
          ))}
        </div>

        <div className={styles.cardActions}>
          <div className={styles.buttonContainer}>
            <CustomButton
              text="Use Template"
              type="primary"
              prefixIcon={<FileText size={14} />}
              onClick={onUseTemplate}
              size="small"
              className={`${styles.useButton} ${
                theme
                  ? styles[
                      `useButton${
                        theme.charAt(0).toUpperCase() + theme.slice(1)
                      }`
                    ]
                  : ""
              }`}
            />
            <CustomButton
              text="Quick Preview"
              type="default"
              prefixIcon={<Eye size={14} />}
              onClick={onPreview}
              size="small"
              className={`${styles.previewButton} ${
                theme
                  ? styles[
                      `previewButton${
                        theme.charAt(0).toUpperCase() + theme.slice(1)
                      }`
                    ]
                  : ""
              }`}
            />
          </div>
        </div>
      </div>
    </CustomCard>
  );
};

export default WorksheetCard;
