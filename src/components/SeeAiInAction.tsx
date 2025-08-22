"use client";

import type React from "react";
import { useState } from "react";
import { Row, Col, Typography, Input } from "antd";
import { Sparkles } from "lucide-react";
import CustomCard from "../components/CustomCard";
import CustomButton from "../components/CustomButton";
import FeatureBadge from "../components/FeatureBadge";
import styles from "../styles/SeeAiInAction.module.less";
import { useTranslation } from "react-i18next";

const { Title, Text } = Typography;

interface SeeAiInActionProps {
  title?: string;
  subtitle?: string;
  placeholder?: string;
  showBadge?: boolean;
  className?: string;
}

const SeeAiInAction: React.FC<SeeAiInActionProps> = ({
  title,
  subtitle,
  placeholder,
  showBadge = true,
  className = "",
}) => {
  const { t } = useTranslation();
  const [topicInput, setTopicInput] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerateQuestions = async () => {
    if (!topicInput.trim()) return;
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
      console.log("Generated questions for:", topicInput);
    }, 2000);
  };

  return (
    <section className={`${styles.demoSection} ${className}`}>
      <div className={styles.container}>
        <Row justify="center">
          <Col xs={24} md={16} lg={14} xl={12}>
            <CustomCard className={styles.demoCard}>
              <div className={styles.demoHeader}>
                <div className={styles.iconContainer}>
                  <div className={styles.robotIcon}>🤖</div>
                </div>
                <Title level={3} className={styles.demoTitle}>
                  {title ?? t("seeAiInAction.title")}
                </Title>
                <Text className={styles.demoSubtitle}>
                  {subtitle ?? t("seeAiInAction.subtitle")}
                </Text>
              </div>

              <div className={styles.demoInput}>
                <Input
                  placeholder={placeholder ?? t("seeAiInAction.placeholder")}
                  value={topicInput}
                  onChange={(e) => setTopicInput(e.target.value)}
                  className={styles.topicInput}
                  size="middle"
                />
                <CustomButton
                  text={
                    isGenerating
                      ? t("seeAiInAction.button.generating")
                      : t("seeAiInAction.button.generateNow")
                  }
                  type="primary"
                  prefixIcon={<Sparkles size={16} />}
                  onClick={handleGenerateQuestions}
                  disabled={!topicInput.trim()}
                  loading={isGenerating}
                  className={styles.generateButton}
                  block
                  size="middle"
                />
              </div>

              {showBadge && (
                <div className={styles.featureBadges}>
                  <Row gutter={[16, 12]} justify="center">
                    <Col xs={12} sm={6} md={6}>
                      <FeatureBadge
                        text={t("seeAiInAction.features.instantQuestions")}
                        variant="success"
                        dotColor="#10b981"
                      />
                    </Col>
                    <Col xs={12} sm={6} md={6}>
                      <FeatureBadge
                        text={t("seeAiInAction.features.answerKeys")}
                        variant="info"
                        dotColor="#3b82f6"
                      />
                    </Col>
                    <Col xs={12} sm={6} md={6}>
                      <FeatureBadge
                        text={t("seeAiInAction.features.curriculumAligned")}
                        variant="purple"
                        dotColor="#8b5cf6"
                      />
                    </Col>
                    <Col xs={12} sm={6} md={6}>
                      <FeatureBadge
                        text={t("seeAiInAction.features.funFacts")}
                        variant="warning"
                        dotColor="#f59e0b"
                      />
                    </Col>
                  </Row>
                </div>
              )}
            </CustomCard>
          </Col>
        </Row>
      </div>
    </section>
  );
};

export default SeeAiInAction;
