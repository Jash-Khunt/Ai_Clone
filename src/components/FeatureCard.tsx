import React from "react";
import { Card, Typography, Row, Col } from "antd";
import {
  UploadOutlined,
  SettingOutlined,
  DownloadOutlined,
} from "@ant-design/icons";
import { useTranslation } from "react-i18next";

import styles from "../styles/custom/demoPage.module.less";

const { Title, Text } = Typography;

const icons = [<UploadOutlined />, <SettingOutlined />, <DownloadOutlined />];

const FeatureCard: React.FC = () => {
  const { t } = useTranslation();
  const features = t("featureCard.features", { returnObjects: true }) as {
    title: string;
    description: string;
  }[];

  return (
    <div className={styles.featureSection}>
      <Row gutter={[24, 24]} justify="center">
        {features.map(({ title, description }, index) => (
          <Col key={title} xs={24} sm={24} md={12} lg={8}>
            <Card className={styles.customFeatureCard}>
              <div className={`${styles.iconCircle} ${styles[`icon${index}`]}`}>
                {icons[index]}
              </div>
              <Title level={5}>{title}</Title>
              <Text className={styles.featureDesc}>{description}</Text>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default FeatureCard;
