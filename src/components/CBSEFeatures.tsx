import type React from "react"
import { Row, Col, Typography } from "antd"
import { BookOpen, Globe, Star, Users } from "lucide-react"
import styles from "../styles/cbseWorksheets.module.less"

const { Title, Text } = Typography

const CBSEFeatures: React.FC = () => {
  const features = [
    {
      icon: <BookOpen size={32} />,
      title: "NCERT Aligned",
      description: "Questions based on NCERT textbooks and syllabus",
      color: "#FF6B35",
    },
    {
      icon: <Globe size={32} />,
      title: "Bilingual Content",
      description: "Hindi and English medium worksheets available",
      color: "#10B981",
    },
    {
      icon: <Star size={32} />,
      title: "Board Exam Ready",
      description: "Pattern and difficulty matching board examinations",
      color: "#3B82F6",
    },
    {
      icon: <Users size={32} />,
      title: "All Classes",
      description: "Class 1 to Class 12 comprehensive coverage",
      color: "#8B5CF6",
    },
  ]

  return (
    <div className={styles.featuresSection}>
      <Row gutter={[32, 32]} justify="center">
        {features.map((feature, index) => (
          <Col xs={24} sm={12} md={6} key={index}>
            <div className={styles.featureCard}>
              <div className={styles.featureIcon} style={{ color: feature.color }}>
                {feature.icon}
              </div>
              <Title level={4} className={styles.featureTitle}>
                {feature.title}
              </Title>
              <Text className={styles.featureDescription}>{feature.description}</Text>
            </div>
          </Col>
        ))}
      </Row>
    </div>
  )
}

export default CBSEFeatures
