import React from "react";
import { Card, Row, Col, Typography } from "antd";
import {
  FileImageOutlined,
  BulbOutlined,
  FileTextOutlined,
} from "@ant-design/icons";
import CustomButton from "./CustomButton";
import styles from "../styles/custom/createOptions.module.less";
import { useTranslation } from "react-i18next";

const { Title, Text } = Typography;

interface CardOptionProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  note?: string;
  onClick: () => void;
}

const CardOption: React.FC<CardOptionProps> = ({
  icon,
  title,
  description,
  note,
  onClick,
}) => {
  const { t } = useTranslation();
  return (
    <Card className={styles.optionCard}>
      <div className={styles.icon}>{icon}</div>
      <Title level={4} className={styles.title}>
        {title}
      </Title>
      <div style={{ lineHeight: "2" }}>
        <Text className={styles.description}>{description}</Text>
        {note && <div className={styles.note}>{note}</div>}
      </div>
      <CustomButton
        text={t("createOptions.getStarted")}
        onClick={onClick}
        type="primary"
        className={styles.getStartedBtn}
        block
      />
    </Card>
  );
};

const CreateOptions: React.FC = () => {
  const { t } = useTranslation();

  const options = [
    {
      key: "image",
      icon: (
        <div className={styles.fileImageOutlined}>
          <FileImageOutlined />
        </div>
      ),
      title: t("createOptions.image.title"),
      description: t("createOptions.image.description"),
      note: t("createOptions.image.note"),
      onClick: () => console.log("Generate from Image"),
    },
    {
      key: "topic",
      icon: (
        <div className={styles.bulbOutlined}>
          <BulbOutlined />
        </div>
      ),
      title: t("createOptions.topic.title"),
      description: t("createOptions.topic.description"),
      note: t("createOptions.topic.note"),
      onClick: () => console.log("Generate from Topic"),
    },
    {
      key: "sample",
      icon: (
        <div className={styles.fileTextOutlined}>
          <FileTextOutlined />
        </div>
      ),
      title: t("createOptions.sample.title"),
      description: t("createOptions.sample.description"),
      note: t("createOptions.sample.note"),
      onClick: () => console.log("Generate from Sample Worksheet"),
    },
  ];

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <Title level={3}>
          <div style={{ fontWeight: 700 }}>{t("createOptions.heading")}</div>
        </Title>
        <p>{t("createOptions.subheading")}</p>
      </div>
      <Row gutter={[24, 24]} justify="center">
        {options.map((opt) => (
          <Col xs={24} md={8} key={opt.key}>
            <CardOption {...opt} />
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default CreateOptions;
