import type React from "react"
import { Typography } from "antd"
import styles from "../styles/HowItWorks.module.less"

const { Title, Text } = Typography

interface StepCardProps {
  stepNumber: number
  title: string
  description: string
}

const StepCard: React.FC<StepCardProps> = ({ stepNumber, title, description }) => {
  return (
    <div className={styles.stepCard}>
      <div className={styles.stepBadge}>
        <span className={styles.stepNumber}>{stepNumber}</span>
      </div>

      <div className={styles.stepContent}>
        <Title level={4} className={styles.stepTitle}>
          {title}
        </Title>
        <Text className={styles.stepDescription}>{description}</Text>
      </div>
    </div>
  )
}

export default StepCard
