import type React from "react";
import { Button, Space, Typography } from "antd";
import { Download, Eye, Share2, RotateCcw } from "lucide-react";
import CustomButton from "./CustomButton";
import styles from "../styles/generatedWorksheet.module.less";

const { Title, Text } = Typography;

interface WorksheetInfo {
  topic: string;
  curriculum: string;
  grade: string;
  subject: string;
  format: string;
}

interface WorksheetSidebarProps {
  worksheetInfo: WorksheetInfo;
  onDownloadPDF?: () => void;
  onShowAnswers?: () => void;
  onShareWorksheet?: () => void;
  onRegenerate?: () => void;
  onSendOnWhatsApp?: () => void;
}

const WorksheetSidebar: React.FC<WorksheetSidebarProps> = ({
  worksheetInfo,
  onDownloadPDF,
  onShowAnswers,
  onShareWorksheet,
  onRegenerate,
  onSendOnWhatsApp,
}) => {
  return (
    <div className={styles.sidebar}>
      <div className={styles.sidebarSection}>
        <Title level={4} className={styles.sectionTitle}>
          Actions
        </Title>
        <Space
          direction="vertical"
          size="middle"
          className={styles.actionButtons}
        >
          <CustomButton
            text="Download PDF"
            type="primary"
            prefixIcon={<Download size={16} />}
            onClick={onDownloadPDF}
            className={styles.downloadButton}
            block
          />
          <Button
            type="default"
            icon={<Eye size={16} />}
            onClick={onShowAnswers}
            className={styles.actionButton}
            block
          >
            Show Answers
          </Button>
          <Button
            type="default"
            icon={<Share2 size={16} />}
            onClick={onShareWorksheet}
            className={styles.actionButton}
            block
          >
            Share Worksheet
          </Button>
          <Button
            type="default"
            icon={<RotateCcw size={16} />}
            onClick={onRegenerate}
            className={styles.actionButton}
            block
          >
            Regenerate
          </Button>
        </Space>
      </div>

      <div className={styles.shareEarnSection}>
        <Title level={5} className={styles.shareEarnTitle}>
          📤 Share & Earn
        </Title>
        <Text className={styles.shareEarnText}>
          Share this worksheet to help other educators discover
          AIWorksheetPro.com!
        </Text>
      </div>

      <div className={styles.sidebarSection}>
        <Title level={4} className={styles.sectionTitle}>
          Worksheet Info
        </Title>
        <div className={styles.infoList}>
          <div className={styles.infoItem}>
            <Text className={styles.infoLabel}>Topic:</Text>
            <Text className={styles.infoValue}>{worksheetInfo.topic}</Text>
          </div>
          <div className={styles.infoItem}>
            <Text className={styles.infoLabel}>Curriculum:</Text>
            <Text className={styles.infoValue}>{worksheetInfo.curriculum}</Text>
          </div>
          <div className={styles.infoItem}>
            <Text className={styles.infoLabel}>Grade:</Text>
            <Text className={styles.infoValue}>{worksheetInfo.grade}</Text>
          </div>
          <div className={styles.infoItem}>
            <Text className={styles.infoLabel}>Subject:</Text>
            <Text className={styles.infoValue}>{worksheetInfo.subject}</Text>
          </div>
          <div className={styles.infoItem}>
            <Text className={styles.infoLabel}>Format:</Text>
            <Text className={styles.infoValue}>{worksheetInfo.format}</Text>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorksheetSidebar;
