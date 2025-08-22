import React from "react";
import { Card, Typography, Row, Col } from "antd";
import {
  UserOutlined,
  TeamOutlined,
  HomeOutlined,
  BookOutlined,
  ArrowRightOutlined,
} from "@ant-design/icons";
import styles from "../styles/custom/aiTools.module.less";
import { Sparkles } from "lucide-react";
import CustomButton from "./CustomButton";
import { useTranslation } from "react-i18next";

const { Title, Paragraph } = Typography;

const AiTools: React.FC = () => {
  const { t } = useTranslation();

  const cardData = [
    {
      type: "students",
      icon: (
        <BookOutlined
          className={`${styles.iconGradient} ${styles.iconStudents}`}
        />
      ),
      title: t("aiTools.cards.students.title"),
      description: t("aiTools.cards.students.description"),
      features: t("aiTools.cards.students.features", {
        returnObjects: true,
      }) as string[],
      button: (
        <CustomButton
          text={t("aiTools.cards.students.button")}
          type="default"
          block
          className={`${styles.iconBackStudents} ${styles.btn}`}
        />
      ),
    },
    {
      type: "teachers",
      icon: (
        <TeamOutlined
          className={`${styles.iconGradient} ${styles.iconTeachers}`}
        />
      ),
      title: t("aiTools.cards.teachers.title"),
      description: t("aiTools.cards.teachers.description"),
      features: t("aiTools.cards.teachers.features", {
        returnObjects: true,
      }) as string[],
      button: (
        <CustomButton
          text={t("aiTools.cards.teachers.button")}
          type="default"
          block
          className={`${styles.iconBackTeachers} ${styles.btn}`}
        />
      ),
    },
    {
      type: "parents",
      icon: (
        <UserOutlined
          className={`${styles.iconGradient} ${styles.iconParents}`}
        />
      ),
      title: t("aiTools.cards.parents.title"),
      description: t("aiTools.cards.parents.description"),
      features: t("aiTools.cards.parents.features", {
        returnObjects: true,
      }) as string[],
      button: (
        <CustomButton
          text={t("aiTools.cards.parents.button")}
          type="default"
          block
          className={`${styles.iconBackParents} ${styles.btn}`}
        />
      ),
    },
    {
      type: "tutors",
      icon: (
        <HomeOutlined
          className={`${styles.iconGradient} ${styles.iconTutors}`}
        />
      ),
      title: t("aiTools.cards.tutors.title"),
      description: t("aiTools.cards.tutors.description"),
      features: t("aiTools.cards.tutors.features", {
        returnObjects: true,
      }) as string[],
      button: (
        <CustomButton
          text={t("aiTools.cards.tutors.button")}
          type="default"
          block
          className={`${styles.iconBackTutors} ${styles.btn}`}
        />
      ),
    },
  ];

  return (
    <div className={styles.educationTools}>
      {/* Hero Section */}
      <div className={styles.heroSection}>
        <Title className={styles.heroTitle}>
          {t("aiTools.hero.title")} <div>{t("aiTools.hero.highlight")}</div>
        </Title>
        <Paragraph className={styles.heroText}>
          {t("aiTools.hero.description")}
        </Paragraph>
        <CustomButton
          text={t("aiTools.hero.button")}
          prefixIcon={<Sparkles size={20} className={styles.sparkles} />}
          className={styles.primaryBtn}
          type="primary"
          size="large"
        />
      </div>

      {/* Section Heading */}
      <div className={styles.sectionHeading}>
        <Title level={2} className={styles.scondTitle}>
          {t("aiTools.section.heading")}
        </Title>
        <Paragraph className={styles.heroText}>
          {t("aiTools.section.description")}
        </Paragraph>
      </div>

      {/* Cards Section */}
      <Row gutter={[24, 24]} justify="center">
        {cardData.map((card, index) => (
          <Col xs={24} sm={12} md={12} lg={6} key={index}>
            <Card
              className={`${styles.toolCard} ${styles[card.type]}`}
              hoverable
            >
              <div>{card.icon}</div>
              <Title level={4} className={styles.title}>
                {card.title}
              </Title>
              <div>
                <Paragraph className={styles.dsc}>{card.description}</Paragraph>
                <div className={styles.features}>
                  <ul className={styles.featureList}>
                    {card.features.map((f, i) => (
                      <li key={i} className={styles.dsc}>
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              {card.button}
            </Card>
          </Col>
        ))}
      </Row>

      {/* Bottom CTA */}
      <div className={styles.bottomCta}>
        <Title level={4}>{t("aiTools.cta.title")}</Title>
        <Paragraph className={styles.subText}>
          {t("aiTools.cta.description")}
        </Paragraph>
        <CustomButton
          prefixIcon={<ArrowRightOutlined />}
          text={t("aiTools.cta.button")}
          type="primary"
          size="large"
          className={styles.browseBtn}
        />
      </div>
    </div>
  );
};

export default AiTools;
