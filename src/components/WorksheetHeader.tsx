import type React from "react"
import { Button, Space, Typography } from "antd"
import { ArrowLeft, Home } from "lucide-react"
import { useNavigate } from "react-router-dom"
import styles from "../styles/generatedWorksheet.module.less"

const { Title } = Typography

interface WorksheetHeaderProps {
  title?: string
  region?: string
  onBackClick?: () => void
}

const WorksheetHeader: React.FC<WorksheetHeaderProps> = ({
  title = "Worksheet Preview",
  region = "UAE",
  onBackClick,
}) => {
  const navigate = useNavigate()

  const handleBackClick = () => {
    if (onBackClick) {
      onBackClick()
    } else {
      navigate(-1)
    }
  }

  return (
    <div className={styles.worksheetHeader}>
      <Button type="text" icon={<ArrowLeft size={16} />} onClick={handleBackClick} className={styles.backButton}>
        Back to Generator
      </Button>

      <Title level={3} className={styles.headerTitle}>
        {title}
      </Title>

      <Space align="center" className={styles.headerRight}>
        <div className={styles.regionBadge}>
          <span className={styles.regionFlag}>🇦🇪</span>
          <span className={styles.regionText}>{region}</span>
        </div>
        <Button type="text" icon={<Home size={16} />} className={styles.homeButton} />
      </Space>
    </div>
  )
}

export default WorksheetHeader
