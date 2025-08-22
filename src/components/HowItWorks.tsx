import type React from "react"
import { Row, Col, Typography } from "antd"
import { useTranslation } from "react-i18next"
import StepCard from "./StepCard"
import styles from "../styles/HowItWorks.module.less"

const { Title } = Typography

const HowItWorks: React.FC = () => {
  const { t } = useTranslation()

  const stepsData = [
    {
      stepNumber: 1,
      title: t("howItWorks.step1.title"),
      description: t("howItWorks.step1.description"),
    },
    {
      stepNumber: 2,
      title: t("howItWorks.step2.title"),
      description: t("howItWorks.step2.description"),
    },
    {
      stepNumber: 3,
      title: t("howItWorks.step3.title"),
      description: t("howItWorks.step3.description"),
    },
    {
      stepNumber: 4,
      title: t("howItWorks.step4.title"),
      description: t("howItWorks.step4.description"),
    },
  ]

  return (
    <section id="how-it-works" className={styles.howItWorksSection}>
      <div className={styles.container}>
        <div className={styles.header}>
          <Title level={2} className={styles.title}>
            {t("howItWorks.title")}
          </Title>
        </div>

        <Row gutter={[24, 32]} className={styles.stepsGrid}>
          {stepsData.map((step, index) => (
            <Col xs={24} sm={12} lg={6} key={index}>
              <StepCard
                stepNumber={step.stepNumber}
                title={step.title}
                description={step.description}
              />
            </Col>
          ))}
        </Row>
      </div>
    </section>
  )
}

export default HowItWorks