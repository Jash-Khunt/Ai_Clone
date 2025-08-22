import type React from "react";
import { Row, Col, Typography, Space } from "antd";
import { FileText, Globe, Sparkles, Zap } from "lucide-react";
import WorksheetCard from "./WorksheetCard";
import SampleButton from "./SampleButton";
import { worksheetData, sampleButtons } from "../constants/tryData";
import StatisticItem from "./StatisticItem";
import FeatureItem from "./FeatureItem";
import styles from "../styles/try.module.less";
import { useTranslation, Trans } from "react-i18next";

const { Title, Text } = Typography;

const Try: React.FC = () => {
  const { t } = useTranslation();

  const handlePreview = (index: number) => {
    window.open("/cbse-worksheets", "_blank");
  };

  const handleUseTemplate = (index: number) => {
    console.log(`Use template for worksheet at index ${index}`);
  };

  const handleSampleClick = (text: string) => {
    console.log(`Sample button clicked with text: ${text}`);
  };

  const featuresData = [
    {
      icon: <FileText size={20} />,
      title: t("try.features.multipleFormats.title"),
      description: t("try.features.multipleFormats.description"),
      color: "blue",
    },
    {
      icon: <Globe size={20} />,
      title: t("try.features.curricula.title"),
      description: t("try.features.curricula.description"),
      color: "green",
    },
    {
      icon: <Sparkles size={20} />,
      title: t("try.features.aiPowered.title"),
      description: t("try.features.aiPowered.description"),
      color: "purple",
    },
    {
      icon: <Zap size={20} />,
      title: t("try.features.fastResults.title"),
      description: t("try.features.fastResults.description"),
      color: "orange",
    },
  ];

  const statisticsData = [
    {
      number: "50,000+",
      label: t("try.statistics.worksheets.label"),
      subtext: t("try.statistics.worksheets.subtext"),
      color: "blue",
    },
    {
      number: "2,500+",
      label: t("try.statistics.educators.label"),
      subtext: t("try.statistics.educators.subtext"),
      color: "purple",
    },
    {
      number: "99.8%",
      label: t("try.statistics.accuracy.label"),
      subtext: t("try.statistics.accuracy.subtext"),
      color: "green",
    },
  ];

  return (
    <div id="try" className={styles.container}>
      <div className={styles.content}>
        <div className={styles.header}>
          <div className={styles.badge}>
            <Sparkles size={14} />
            <span>{t("try.badge")}</span>
          </div>
          <Title level={2} className={styles.title}>
            <span className={styles.titleGradient}>{t("try.title1")}</span>
            <br />
            <span className={styles.titleBlack}>{t("try.title2")}</span>
          </Title>
          <Text className={styles.subtitle}>
            <Trans
              i18nKey="try.subtitle"
              components={{
                highlight: <span className={styles.highlight} />,
                highlightPurple: <span className={styles.highlightPurple} />,
              }}
            />
          </Text>
        </div>

        <Row gutter={[16, 16]} className={styles.worksheetsRow}>
          {worksheetData.map((worksheet, index) => (
            <Col xs={24} md={8} key={index}>
              <WorksheetCard
                flag={worksheet.flag}
                category={worksheet.category}
                title={worksheet.title}
                description={worksheet.description}
                details={worksheet.details}
                theme={worksheet.theme}
                onPreview={() => handlePreview(index)}
                onUseTemplate={() => handleUseTemplate(index)}
              />
            </Col>
          ))}
        </Row>

        <div className={styles.samplesSection}>
          <Title level={4} className={styles.samplesTitle}>
            {t("try.samplesTitle")}
          </Title>
          <Text className={styles.samplesText}>{t("try.samplesText")}</Text>
          <Space size="middle" wrap className={styles.samplesButtons}>
            {sampleButtons.map((sample, index) => (
              <SampleButton
                key={index}
                flag={sample.flag}
                text={sample.text}
                subtext={sample.subtext}
                theme={sample.theme}
                onClick={() => handleSampleClick(sample.text)}
                className={styles.sampleButton}
              />
            ))}
          </Space>
        </div>

        {/* Features Section */}
        <div className={styles.featuresSection}>
          <Row gutter={[16, 16]} justify="center">
            {featuresData.map((feature, index) => (
              <Col xs={12} sm={6} key={index}>
                <FeatureItem
                  icon={feature.icon}
                  title={feature.title}
                  description={feature.description}
                  color={feature.color}
                />
              </Col>
            ))}
          </Row>
        </div>

        {/* Statistics Section */}
        <div className={styles.statisticsSection}>
          <Row gutter={[24, 16]} justify="center">
            {statisticsData.map((stat, index) => (
              <Col xs={24} sm={8} key={index}>
                <StatisticItem
                  number={stat.number}
                  label={stat.label}
                  subtext={stat.subtext}
                  color={stat.color}
                />
              </Col>
            ))}
          </Row>
        </div>
      </div>
    </div>
  );
};

export default Try;
