import type React from "react"
import { Row, Col, Typography } from "antd"
import CBSEHeroSection from "../../components/CBSEHeroSection"
import CBSEFeatures from "../../components/CBSEFeatures"
import CBSEWorksheetCard from "../../components/CBSEWorksheetCard"
import CustomButton from "../../components/CustomButton"
import styles from "../../styles/cbseWorksheets.module.less"

const { Title, Text } = Typography

const CBSEWorksheets: React.FC = () => {
  const worksheets = [
    {
      class: "Class 3",
      subject: "Hindi",
      board: "CBSE",
      title: "व्याकरण: संज्ञा और सर्वनाम",
      englishTitle: "Grammar: Nouns and Pronouns",
      description: "Hindi grammar worksheet covering different types of nouns and pronouns with examples",
      questions: 15,
      time: "25-30 minutes",
      difficulty: "Beginner",
      topics: ["संज्ञा के भेद", "सर्वनाम", "वाक्य प्रयोग"],
    },
    {
      class: "Class 5",
      subject: "Mathematics",
      board: "CBSE",
      title: "Fractions and Decimals",
      englishTitle: "भिन्न और दशमलव",
      description: "Comprehensive worksheet on converting fractions to decimals and vice versa with word problems",
      questions: 20,
      time: "35-40 minutes",
      difficulty: "Intermediate",
      topics: ["Equivalent Fractions", "Decimal Conversion", "Word Problems"],
    },
    {
      class: "Class 7",
      subject: "Science",
      board: "CBSE",
      title: "Acids, Bases and Salts",
      englishTitle: "अम्ल, क्षार और लवण",
      description: "Laboratory-based questions and theory covering properties of acids, bases, and their reactions",
      questions: 18,
      time: "40-45 minutes",
      difficulty: "Intermediate",
      topics: ["pH Scale", "Indicators", "Neutralization", "Daily Life Applications"],
    },
    {
      class: "Class 10",
      subject: "Social Science",
      board: "CBSE",
      title: "Indian Freedom Struggle",
      englishTitle: "भारतीय स्वतंत्रता संग्राम",
      description: "Comprehensive worksheet covering major events, leaders, and movements of India's independence",
      questions: 25,
      time: "60 minutes",
      difficulty: "Advanced",
      topics: ["Non-Cooperation Movement", "Quit India", "Revolutionary Activities", "Partition"],
    },
  ]

  const handlePreview = (index: number) => {
    console.log(`Preview worksheet ${index}`)
  }

  const handleDownload = (index: number) => {
    console.log(`Download worksheet ${index}`)
  }

  const handleUseTemplate = (index: number) => {
    console.log(`Use template ${index}`)
  }

  const handleStartCreating = () => {
    console.log("Start Creating Worksheets")
  }

  return (
    <div className={styles.cbseWorksheetsPage}>
      <CBSEHeroSection />
      <CBSEFeatures />

      <div className={styles.worksheetsSection}>
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <Title level={2} className={styles.sectionTitle}>
              CBSE & ICSE Curriculum Worksheets
            </Title>
            <Text className={styles.sectionSubtitle}>Comprehensive worksheets covering all subjects and classes</Text>
          </div>

          <Row gutter={[24, 24]}>
            {worksheets.map((worksheet, index) => (
              <Col xs={24} lg={12} key={index}>
                <CBSEWorksheetCard
                  class={worksheet.class}
                  subject={worksheet.subject}
                  board={worksheet.board}
                  title={worksheet.title}
                  description={worksheet.description}
                  questions={worksheet.questions}
                  time={worksheet.time}
                  difficulty={worksheet.difficulty}
                  topics={worksheet.topics}
                  onPreview={() => handlePreview(index)}
                  onDownload={() => handleDownload(index)}
                  onUseTemplate={() => handleUseTemplate(index)}
                />
              </Col>
            ))}
          </Row>
        </div>
      </div>

      <div className={styles.footerCTA}>
        <div className={styles.container}>
          <Title level={2} className={styles.ctaTitle}>
            Create Worksheets for Your Indian Classroom
          </Title>
          <Text className={styles.ctaSubtitle}>
            Generate unlimited worksheets aligned with CBSE and ICSE curriculum standards
          </Text>
        </div>
        <CustomButton
            text="Start Creating Worksheets"
            type="primary"
            onClick={handleStartCreating}
            className={styles.ctaButton}
            size="large"
          />
      </div>
    </div>
  )
}

export default CBSEWorksheets
