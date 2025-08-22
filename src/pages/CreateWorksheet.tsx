import React, { useState } from "react";
import { Card, Typography, Badge } from "antd";
import {
  UploadOutlined,
  FontSizeOutlined,
  FileTextOutlined,
  TeamOutlined,
} from "@ant-design/icons";
import styles from "../styles/custom/CreateWorksheet.module.less";
import QuotesSection from "../components/QuotesSection";
import HowItWorksParentSection from "../components/HowItWorksParentSection";
import PageHeader from "../components/PageHeader";
import { useDispatch } from "react-redux";
import { setInputMethod } from "../store/slices/worksheetSlice";
import { useTranslation } from "react-i18next";

const { Title, Text, Paragraph } = Typography;

const CreateWorksheet: React.FC = () => {
  const [selected, setSelected] = useState<"upload" | "describe" | "sample">(
    "upload"
  );
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const handleCardClick = (key: "upload" | "describe" | "sample") => {
    setSelected(key);
    if (key === "upload") dispatch(setInputMethod("upload"));
    else if (key === "describe") dispatch(setInputMethod("type"));
  };

  const renderCard = (
    key: "upload" | "describe" | "sample",
    icon: React.ReactNode
  ) => {
    const isActive = selected === key;

    // Get the card data (title, points, etc.)
    const cardData = t(`createWorksheet.cards.${key}`, {
      returnObjects: true,
    }) as {
      title: string;
      perfectWhen: string;
      solves: string;
      points: string[];
    };

    // Fetch badge text safely (may not exist)
    const badgeText = t(`createWorksheet.cards.${key}.badge`, {
      defaultValue: "",
    });

    return (
      <Badge.Ribbon
        text={badgeText}
        color="blue"
        className={isActive && badgeText ? styles.ribbon : styles.hiddenRibbon}
      >
        <Card
          className={`${styles.card} ${isActive ? styles.activeCard : ""}`}
          onClick={() => handleCardClick(key)}
        >
          <div className={styles.cardIcon}>{icon}</div>
          <Title level={4} className={styles.cardTitle}>
            {cardData.title}
          </Title>
          <Paragraph className={styles.perfectWhen}>
            <b>{t("createWorksheet.labels.perfectWhen")} </b>
            {cardData.perfectWhen}
          </Paragraph>
          <div className={styles.solveBox}>
            {t("createWorksheet.labels.solves")}: "{cardData.solves}"
          </div>
          <div className={styles.points}>
            <ul style={{ padding: 0, margin: 0 }}>
              {cardData.points.map((pt: string, i: number) => (
                <li
                  key={i}
                  style={{
                    marginBottom: 8,
                    listStyleType: "disc",
                    marginLeft: 16,
                  }}
                >
                  {pt}
                </li>
              ))}
            </ul>
          </div>
        </Card>
      </Badge.Ribbon>
    );
  };

  return (
    <>
      <PageHeader />
      <div className={styles.container}>
        <Title level={2} className={styles.heading}>
          {t("createWorksheet.heading")}
        </Title>
        <Text className={styles.recommended}>
          <TeamOutlined style={{ fontSize: 24, color: "#2F54EB" }} />{" "}
          {t("createWorksheet.recommended")}
        </Text>
        <div className={styles.subText}>{t("createWorksheet.subText")}</div>

        <div className={styles.cardContainer}>
          {renderCard(
            "upload",
            <div className={styles.icon}>
              <UploadOutlined
                className={`${styles.iconBase} ${styles.uploadIcon}`}
              />
            </div>
          )}
          {renderCard(
            "describe",
            <div className={styles.icon}>
              <FontSizeOutlined
                className={`${styles.iconBase} ${styles.describeIcon}`}
              />
            </div>
          )}
          {renderCard(
            "sample",
            <div className={styles.icon}>
              <FileTextOutlined
                className={`${styles.iconBase} ${styles.fileIcon}`}
              />
            </div>
          )}
        </div>

        <QuotesSection />
        <HowItWorksParentSection />
      </div>
    </>
  );
};

export default CreateWorksheet;
