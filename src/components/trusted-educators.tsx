"use client";
import type React from "react";
import { Row, Col, Typography } from "antd";
import { Star } from "lucide-react";
import { useTranslation } from "react-i18next";
import styles from "../styles/trusted-educators.module.less";

const { Title, Text } = Typography;

interface TestimonialProps {
  quote: string;
  name: string;
  title: string;
  school: string;
}

const TestimonialCard: React.FC<TestimonialProps> = ({
  quote,
  name,
  title,
  school,
}) => {
  return (
    <div className={styles.testimonialCard}>
      <div className={styles.starsContainer}>
        {[...Array(5)].map((_, i) => (
          <Star key={i} className={styles.starIcon} />
        ))}
      </div>
      <Text className={styles.testimonialQuote}>"{quote}"</Text>
      <div className={styles.testimonialAuthor}>
        <Text className={styles.authorName}>{name}</Text>
        <Text className={styles.authorTitle}>{title}</Text>
        <Text className={styles.authorSchool}>{school}</Text>
      </div>
    </div>
  );
};

const TrustedEducators: React.FC = () => {
  const { t } = useTranslation();

  const statistics = [
    {
      number: "50K+",
      label: t("trusted.statistics.teachers"),
      colorClass: "Blue",
    },
    {
      number: "2M+",
      label: t("trusted.statistics.worksheets"),
      colorClass: "Purple",
    },
    {
      number: "95%",
      label: t("trusted.statistics.satisfaction"),
      colorClass: "Green",
    },
    {
      number: "150+",
      label: t("trusted.statistics.countries"),
      colorClass: "Orange",
    },
  ];

  const testimonials = t("trusted.testimonials", {
    returnObjects: true,
  }) as TestimonialProps[];

  return (
    <section className={styles.trustedSection}>
      <div className={styles.container}>
        <div className={styles.header}>
          <Title level={2} className={styles.title}>
            {t("trusted.title")}
          </Title>
          <Text className={styles.subtitle}>{t("trusted.subtitle")}</Text>
        </div>

        <Row gutter={[32, 32]} className={styles.statisticsRow}>
          {statistics.map((stat, index) => (
            <Col xs={12} md={6} key={index}>
              <div className={styles.statisticItem}>
                <div
                  className={`${styles.statisticNumber} ${
                    styles[`statisticNumber${stat.colorClass}`]
                  }`}
                >
                  {stat.number}
                </div>
                <Text className={styles.statisticLabel}>{stat.label}</Text>
              </div>
            </Col>
          ))}
        </Row>

        <Row gutter={[24, 24]}>
          {testimonials.map((testimonial, index) => (
            <Col xs={24} md={8} key={index}>
              <TestimonialCard {...testimonial} />
            </Col>
          ))}
        </Row>
      </div>
    </section>
  );
};

export default TrustedEducators;
