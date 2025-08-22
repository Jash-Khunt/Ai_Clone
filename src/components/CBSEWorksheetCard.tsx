"use client"

import type React from "react"
import { Card, Typography, Button, Rate } from "antd"
import { Eye, Download, FileText } from "lucide-react"
import styles from "../styles/cbseWorksheets.module.less"

const { Title, Text } = Typography

interface CBSEWorksheetCardProps {
  class: string
  subject: string
  board: string
  title: string
  description: string
  questions: number
  time: string
  difficulty: string
  topics: string[]
  onPreview?: () => void
  onDownload?: () => void
  onUseTemplate?: () => void
}

const CBSEWorksheetCard: React.FC<CBSEWorksheetCardProps> = ({
  class: className,
  subject,
  board,
  title,
  description,
  questions,
  time,
  difficulty,
  topics,
  onPreview,
  onDownload,
  onUseTemplate,
}) => {
  return (
    <Card className={styles.worksheetCard}>
      <div className={styles.cardHeader}>
        <div className={styles.cardBadges}>
          <span className={styles.classBadge}>{className}</span>
          <span className={styles.subjectBadge}>{subject}</span>
          <span className={styles.boardBadge}>{board}</span>
        </div>
        <Rate disabled defaultValue={5} className={styles.rating} />
      </div>

      <Title level={4} className={styles.cardTitle}>
        {title}
      </Title>

      <Text className={styles.cardDescription}>{description}</Text>

      <div className={styles.cardMeta}>
        <div className={styles.metaItem}>
          <Text className={styles.metaLabel}>Questions:</Text>
          <Text className={styles.metaValue}>{questions}</Text>
        </div>
        <div className={styles.metaItem}>
          <Text className={styles.metaLabel}>Time:</Text>
          <Text className={styles.metaValue}>{time}</Text>
        </div>
        <div className={styles.metaItem}>
          <Text className={styles.metaLabel}>Difficulty:</Text>
          <Text className={styles.metaValue}>{difficulty}</Text>
        </div>
        <div className={styles.metaItem}>
          <Text className={styles.metaLabel}>Board:</Text>
          <Text className={styles.metaValue}>{board}</Text>
        </div>
      </div>

      <div className={styles.topicsCovered}>
        <Text className={styles.topicsLabel}>Topics Covered:</Text>
        <div className={styles.topicTags}>
          {topics.map((topic, index) => (
            <span key={index} className={styles.topicTag}>
              {topic}
            </span>
          ))}
        </div>
      </div>

      <div className={styles.cardActions}>
        <Button icon={<Eye size={16} />} onClick={onPreview} className={styles.previewButton}>
          Preview
        </Button>
        <Button icon={<Download size={16} />} onClick={onDownload} className={styles.downloadButton}>
          Download
        </Button>
        <Button
          type="primary"
          icon={<FileText size={16} />}
          onClick={onUseTemplate}
          className={styles.useTemplateButton}
        >
          Use Template
        </Button>
      </div>
    </Card>
  )
}

export default CBSEWorksheetCard
