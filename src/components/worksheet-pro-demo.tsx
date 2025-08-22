"use client";

import type React from "react";
import { useState } from "react";
import { Row, Col, Typography, Space, Button } from "antd";
import {
  Play,
  ImageIcon,
  FileText,
  LayoutTemplateIcon as Template,
  Check,
  ArrowRight,
} from "lucide-react";
import { useTranslation } from "react-i18next";
import CustomCard from "./CustomCard";
import styles from "../styles/worksheet-pro-demo.module.less";

const { Title, Text } = Typography;

interface WorksheetProDemoProps {
  className?: string;
}

const WorksheetProDemo: React.FC<WorksheetProDemoProps> = ({
  className = "",
}) => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState("image");

  const tabs = [
    {
      key: "image",
      label: t("worksheetProDemo.tabs.image"),
      icon: <ImageIcon size={16} />,
    },
    {
      key: "topic",
      label: t("worksheetProDemo.tabs.topic"),
      icon: <FileText size={16} />,
    },
    {
      key: "templates",
      label: t("worksheetProDemo.tabs.templates"),
      icon: <Template size={16} />,
    },
  ];

  const features = [
    t("worksheetProDemo.features.pdf"),
    t("worksheetProDemo.features.ocr"),
    t("worksheetProDemo.features.auto"),
  ];

  const handleWatchDemo = () => {
    console.log("Watch demo clicked");
  };

  const handleGetStarted = () => {
    console.log("Get started clicked");
  };

  return (
    <section className={`${styles.demoSection} ${className}`}>
      <div className={styles.container}>
        {/* Header */}
        <div className={styles.header}>
          <Title level={2} className={styles.title}>
            {t("worksheetProDemo.title")}
          </Title>
          <Text className={styles.subtitle}>
            {t("worksheetProDemo.subtitle")}
          </Text>
        </div>

        {/* Tab Navigation */}
        <div className={styles.tabNavigation}>
          <Space size="middle" wrap>
            {tabs.map((tab) => (
              <Button
                key={tab.key}
                type={activeTab === tab.key ? "primary" : "default"}
                onClick={() => setActiveTab(tab.key)}
                className={`${styles.tabButton} ${
                  activeTab === tab.key ? styles.tabButtonActive : ""
                }`}
                icon={tab.icon}
              >
                {tab.label}
              </Button>
            ))}
          </Space>
        </div>

        {/* Video Demo Area */}
        <CustomCard className={styles.videoCard}>
          <div className={styles.videoContainer}>
            <div className={styles.liveBadge}>
              {t("worksheetProDemo.video.live")}
            </div>
            <div className={styles.videoContent}>
              <Button
                type="primary"
                size="large"
                onClick={handleWatchDemo}
                className={styles.playButton}
                icon={<Play size={20} />}
              >
                {t("worksheetProDemo.video.watchDemo")}
              </Button>
            </div>
          </div>

          {/* Feature Badges */}
          <div className={styles.featureBadges}>
            <Row gutter={[24, 16]} justify="center">
              {features.map((feature, index) => (
                <Col xs={24} sm={8} key={index}>
                  <div className={styles.featureBadge}>
                    <Check size={16} className={styles.featureIcon} />
                    <Text className={styles.featureText}>{feature}</Text>
                  </div>
                </Col>
              ))}
            </Row>
          </div>
        </CustomCard>

        {/* CTA Section */}
        <div className={styles.ctaSection}>
          <CustomCard className={styles.ctaCard}>
            <div className={styles.ctaContent}>
              <Title level={3} className={styles.ctaTitle}>
                {t("worksheetProDemo.cta.title")}
              </Title>
              <Text className={styles.ctaSubtitle}>
                {t("worksheetProDemo.cta.subtitle")}
              </Text>
              <Button
                type="primary"
                size="large"
                onClick={handleGetStarted}
                className={styles.ctaButton}
                icon={<ArrowRight size={18} />}
              >
                {t("worksheetProDemo.cta.button")}
              </Button>
            </div>
          </CustomCard>
        </div>
      </div>
    </section>
  );
};

export default WorksheetProDemo;
