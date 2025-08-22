import React from 'react';
import { Card, Tag, Typography, Row } from 'antd';
import { EyeOutlined, DownloadOutlined, CopyOutlined, StarFilled } from '@ant-design/icons';
import styles from '../styles/custom/libraryPage.module.less';
import CustomButton from './CustomButton';

const { Title, Text, Paragraph } = Typography;

interface HistoryCardProps {
  subject: string;
  title: string;
  description: string;
  downloads: number;
  rating?: number; 
}

const HistoryCard: React.FC<HistoryCardProps> = ({
  subject,
  title,
  description,
  downloads,
  rating = 5,
}) => (
  <Card className={styles.card} hoverable>
    <Row justify="space-between" align="middle" className={styles.header}>
      <Tag color="default" style={{ borderRadius: '1rem', fontWeight: 500 }}>{subject}</Tag>
        <div><StarFilled /> {rating}</div>
    </Row>

    <div className={styles.cardBody}>
      <Title level={5} className={styles.title}>{title}</Title>
      <Paragraph className={styles.description}>{description}</Paragraph>
      <Text type="secondary" className={styles.downloads}>{downloads} downloads</Text>

      <div className={styles.actions}>
        <CustomButton
          text="Preview"
          prefixIcon={<EyeOutlined />}
          style={{ fontWeight: 500, flex: 1 }}
          type="default"
          size="middle"
        />
        <CustomButton
          text="Use Template"
          prefixIcon={<CopyOutlined />}
          style={{ fontWeight: 500, flex: 1 }}
          type="default"
          size="middle"
        />
      </div>

      <CustomButton
        text="Download"
        prefixIcon={<DownloadOutlined />}
        style={{
          backgroundColor: "#37b037",
          fontWeight: 500,
          marginTop: 12
        }}
        size="middle"
        block
      />
    </div>
  </Card>
);

export default HistoryCard;
