import { Card, Typography, Row, Col } from "antd";
import styles from "../styles/custom/demoPage.module.less";
import { useTranslation } from "react-i18next";

const { Title, Text } = Typography;

const WhyChooseSection = () => {
  const { t } = useTranslation();
  const features = t("whyChoose.features", { returnObjects: true }) as string[];

  return (
    <Card className={styles.whyChooseCard}>
      <div className={styles.whyChooseContainer}>
        <Title level={4} className={styles.whyChooseTitle}>
          {t("whyChoose.title")}
        </Title>

        <Row gutter={[16, 16]}>
          {features.map((feature, index) => {
            const colorClass =
              index % 2 === 0 ? styles.checkBlue : styles.checkOrange;
            return (
              <Col xs={24} sm={12} key={feature}>
                <div className={styles.featureItem}>
                  <svg
                    className={colorClass}
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M21.801 10A10 10 0 1 1 17 3.335" />
                    <path d="m9 11 3 3L22 4" />
                  </svg>
                  <Text className={styles.featureText}>{feature}</Text>
                </div>
              </Col>
            );
          })}
        </Row>
      </div>
    </Card>
  );
};

export default WhyChooseSection;
