import React from "react";
import { Button, Typography, Tag, Card, Space, Row, Col } from "antd";
import {
  PlayCircleOutlined,
  BookOutlined,
  StarFilled,
  UploadOutlined,
  SettingOutlined,
  DownloadOutlined,
  ClockCircleOutlined,
  CheckCircleOutlined,
  ThunderboltOutlined,
} from "@ant-design/icons";
import { useTranslation, Trans } from "react-i18next";
import styles from "../styles/HeroSection.module.less";

const { Title, Text, Paragraph } = Typography;

const HeroSection: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className={styles.heroWrapper}>
      {/* Top Stats Banner */}
      <div className={styles.statsBanner}>
        <div className={styles.container}>
          <Space wrap size="large" className={styles.statsContent}>
            <Space size="small">
              <CheckCircleOutlined />
              <Text className={styles.statsText}>
                {t("hero.stats.teachers")}
              </Text>
            </Space>
            <Space size="small">
              <ClockCircleOutlined />
              <Text className={styles.statsText}>{t("hero.stats.time")}</Text>
            </Space>
            <Space size="small">
              <ThunderboltOutlined />
              <Text className={styles.statsText}>
                {t("hero.stats.engagement")}
              </Text>
            </Space>
            <Space size="small">
              <StarFilled />
              <Text className={styles.statsText}>{t("hero.stats.rating")}</Text>
            </Space>
          </Space>
        </div>
      </div>

      {/* Main Hero Section */}
      <div className={styles.heroSection}>
        <div className={styles.container}>
          <div className={styles.heroContent}>
            {/* Badge */}
            <div className={styles.badgeWrapper}>
              <Tag className={styles.badge}>
                <ThunderboltOutlined className={styles.badgeIcon} />
                {t("hero.badge")}
              </Tag>
            </div>

            {/* Main Headline */}
            <Title level={1} className={styles.heroTitle}>
              {t("hero.title.line1")} <br />
              {t("hero.title.line2")} <br />
              <span className={styles.gradientText}>
                {t("hero.title.highlight")}
              </span>
              <br />
              <span className={styles.subtitle}>
                {t("hero.title.subtitle")}
              </span>
            </Title>

            {/* Description with bold inside */}
            <Paragraph className={styles.heroDescription}>
              <Trans
                i18nKey="hero.description"
                components={{ strong: <strong /> }}
              />
            </Paragraph>

            {/* CTA Buttons */}
            <Space wrap size="middle" className={styles.ctaButtons}>
              <Button
                type="primary"
                size="large"
                className={styles.primaryButton}
                icon={<ThunderboltOutlined />}
              >
                {t("hero.cta.create")}
              </Button>
              <Button
                size="large"
                className={styles.secondaryButton}
                icon={<PlayCircleOutlined />}
              >
                {t("hero.cta.demo")}
              </Button>
              <Button
                type="text"
                size="large"
                className={styles.textButton}
                icon={<BookOutlined />}
              >
                {t("hero.cta.library")}
              </Button>
            </Space>

            {/* Feature Tags */}
            <Space wrap size="middle" className={styles.featureTags}>
              <Tag className={styles.featureTag}>
                <CheckCircleOutlined className={styles.featureIcon} />
                {t("hero.features.daily")}
              </Tag>
              <Tag className={styles.featureTag}>
                <CheckCircleOutlined className={styles.featureIcon} />
                {t("hero.features.nocard")}
              </Tag>
              <Tag className={styles.featureTag}>
                <CheckCircleOutlined className={styles.featureIcon} />
                {t("hero.features.cancel")}
              </Tag>
            </Space>
          </div>
        </div>

        {/* Process Section */}
        <div className={styles.container}>
          <Card className={styles.processCard}>
            <div className={styles.processHeader}>
              <Title level={2} className={styles.processTitle}>
                <Trans
                  i18nKey="hero.process.title"
                  components={{ span: <span className={styles.yellowText} /> }}
                />
              </Title>
              <Paragraph className={styles.processDescription}>
                {t("hero.process.description")}
              </Paragraph>
            </div>

            <Row gutter={[24, 24]} className={styles.stepsGrid}>
              {[1, 2, 3, 4].map((num) => (
                <Col xs={24} sm={12} lg={6} key={num}>
                  <div className={styles.stepItem}>
                    <div className={styles.stepIconWrapper}>
                      <div className={styles.stepIcon}>
                        {num === 1 && <UploadOutlined />}
                        {num === 2 && <ThunderboltOutlined />}
                        {num === 3 && <SettingOutlined />}
                        {num === 4 && <DownloadOutlined />}
                      </div>
                      <div className={styles.stepNumber}>{num}</div>
                    </div>
                    <Title level={4} className={styles.stepTitle}>
                      {t(`hero.process.steps.${num}.title`)}
                    </Title>
                    <Text className={styles.stepDescription}>
                      {t(`hero.process.steps.${num}.desc`)}
                    </Text>
                  </div>
                </Col>
              ))}
            </Row>

            <div className={styles.completionTime}>
              <Space size="small">
                <ClockCircleOutlined />
                <Text className={styles.completionText}>
                  {t("hero.process.completion")}
                </Text>
              </Space>
            </div>
          </Card>
        </div>

        {/* Testimonial */}
        <div className={styles.container}>
          <Card className={styles.testimonialCard}>
            <div className={styles.testimonialStars}>
              {[...Array(5)].map((_, i) => (
                <StarFilled key={i} className={styles.star} />
              ))}
            </div>
            <Paragraph className={styles.testimonialText}>
              {t("hero.testimonial.text")}
            </Paragraph>
            <div className={styles.testimonialAuthor}>
              <Text strong>{t("hero.testimonial.author")}</Text>
              <br />
              <Text type="secondary">{t("hero.testimonial.role")}</Text>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
