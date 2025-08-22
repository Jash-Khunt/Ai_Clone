"use client"

import type React from "react"
import { Row, Col, Typography, Input, Button } from "antd"
import { ArrowLeft, FileText } from "lucide-react"
import { useNavigate } from "react-router-dom"
import CustomButton from "./CustomButton"
import styles from "../styles/cbseWorksheets.module.less"
import HeaderLogo from "./HeaderLogo"
import logoSrc from "../assets/aiworksheetprologo.png";
import useMobileDetection from "../store/useMobileDetection";

const { Title, Text } = Typography
const { Search } = Input

const CBSEHeroSection: React.FC = () => {
  const isMobile = useMobileDetection();
  const navigate = useNavigate()

  const handleBackToHome = () => {
    navigate("/")
  }

  const handleCreateWorksheet = () => {
    console.log("Create Custom Worksheet clicked")
  }

  return (
    <div className={styles.heroSection}>
      {/* Header */}
      <div className={styles.header}>
        <Button type="text" icon={<ArrowLeft size={16} />} onClick={handleBackToHome} className={styles.backButton}>
          Back to Home
        </Button>

        <div className={styles.logo}>

          <HeaderLogo 
            logoSrc={logoSrc} 
            title="Where Education Meets Innovation" 
            to="/" 
            hideSubtitle={isMobile}
          />
        </div>
      </div>

      {/* Hero Content */}
      <div className={styles.heroContent}>
        <div className={styles.badge}>
          <span className={styles.badgeText}>CBSE & ICSE Curriculum</span>
        </div>

        <Title level={1} className={styles.heroTitle}>
          Free CBSE & ICSE Worksheets
        </Title>

        <Text className={styles.heroSubtitle}>
          Class-wise worksheets aligned with CBSE and ICSE curriculum. Covering all subjects including Hindi, English,
          Mathematics, Science, and Social Studies.
        </Text>

        <Row gutter={16} justify="center" className={styles.heroActions}>
          <Col xs={24} sm={12} md={10}>
            <CustomButton
              text="Create Custom Worksheet"
              type="primary"
              prefixIcon={<FileText size={16} />}
              onClick={handleCreateWorksheet}
              className={styles.createButton}
              block
            />
          </Col>
          <Col xs={24} sm={12} md={8}>
            <Search placeholder="Search worksheets..." className={styles.searchInput} size="large" />
          </Col>
        </Row>
      </div>
    </div>
  )
}

export default CBSEHeroSection
