"use client";
import type React from "react";
import { Row, Col, Typography } from "antd";
import {
  Sparkles,
  Zap,
  Shield,
  Star,
  Globe,
  FileText,
  Upload,
  Languages,
  Circle,
  MessageCircle,
  BarChart3,
  Link,
} from "lucide-react";
import { useTranslation } from "react-i18next";
import Choose from "./Choose";
import styles from "../styles/Features.module.less";

const { Title, Text } = Typography;

const Features: React.FC = () => {
  const { t } = useTranslation();

  const featuresData = [
    {
      icon: <Sparkles />,
      title: t("features.list.ai.title"),
      description: t("features.list.ai.desc"),
      iconColor: "#A855F7",
    },
    {
      icon: <Zap />,
      title: t("features.list.instant.title"),
      description: t("features.list.instant.desc"),
      iconColor: "#F97316",
    },
    {
      icon: <Shield />,
      title: t("features.list.quality.title"),
      description: t("features.list.quality.desc"),
      iconColor: "#14B8A6",
    },
    {
      icon: <Star />,
      title: t("features.list.custom.title"),
      description: t("features.list.custom.desc"),
      iconColor: "#EC4899",
    },
    {
      icon: <Globe />,
      title: t("features.list.multiCurriculum.title"),
      description: t("features.list.multiCurriculum.desc"),
      iconColor: "#3B82F6",
    },
    {
      icon: <FileText />,
      title: t("features.list.globalFormat.title"),
      description: t("features.list.globalFormat.desc"),
      iconColor: "#22C55E",
    },
    {
      icon: <Upload />,
      title: t("features.list.multiInput.title"),
      description: t("features.list.multiInput.desc"),
      iconColor: "#6366F1",
    },
    {
      icon: <Languages />,
      title: t("features.list.multiLang.title"),
      description: t("features.list.multiLang.desc"),
      iconColor: "#EF4444",
    },
    {
      icon: <Circle />,
      title: t("features.list.dashboard.title"),
      description: t("features.list.dashboard.desc"),
      iconColor: "#EAB308",
    },
    {
      icon: <MessageCircle />,
      title: t("features.list.chat.title"),
      description: t("features.list.chat.desc"),
      iconColor: "#10B981",
    },
    {
      icon: <BarChart3 />,
      title: t("features.list.library.title"),
      description: t("features.list.library.desc"),
      iconColor: "#06B6D4",
    },
    {
      icon: <Link />,
      title: t("features.list.tools.title"),
      description: t("features.list.tools.desc"),
      iconColor: "#8B5CF6",
    },
  ];

  return (
    <section id="features" className={styles.featuresSection}>
      <div className={styles.container}>
        <div className={styles.header}>
          <Title level={2} className={styles.title}>
            {t("features.header.title")}
          </Title>
          <Text className={styles.subtitle}>
            {t("features.header.subtitle")}
          </Text>
        </div>
        <Row gutter={[24, 24]} className={styles.featuresGrid}>
          {featuresData.map((feature, index) => (
            <Col xs={24} sm={12} md={8} lg={6} key={index}>
              <Choose
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
                iconColor={feature.iconColor}
              />
            </Col>
          ))}
        </Row>
      </div>
    </section>
  );
};

export default Features;
