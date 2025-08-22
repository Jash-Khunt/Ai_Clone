import React from 'react';
import { Typography, Tag, Space, Tooltip } from 'antd';
import { EditOutlined, ShareAltOutlined, DownloadOutlined, DeleteOutlined, FileTextOutlined } from '@ant-design/icons';
import styles from '../styles/custom/MyWorksheet.module.less';

const { Text } = Typography;

interface WorksheetProps {
  title: string;
  subject: string;
  grade: string;
  downloads: number;
  status: 'published' | 'draft';
}

const MyWorksheet: React.FC<WorksheetProps> = ({ title, subject, grade, downloads, status }) => {
  return (
    <div className={styles.worksheetCard}>
      {/* LEFT SIDE */}
      <div className={styles.leftSection}>
        <div className={styles.iconBox}><FileTextOutlined /></div>
        <div>
          <Text strong>{title}</Text>
          <div className={styles.meta}>
            <Text type="secondary">{subject} • {grade} • {downloads} downloads</Text>
          </div>
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className={styles.rightSection}>
        <Tag color={status === 'published' ? 'black' : 'default'} style={{borderRadius: '1rem'}}>{status}</Tag>
        <Space size="middle">
          <Tooltip className={styles.icon} title="Edit"><EditOutlined /></Tooltip>
          <Tooltip className={styles.icon} title="Share"><ShareAltOutlined /></Tooltip>
          <Tooltip className={styles.icon} title="Download"><DownloadOutlined /></Tooltip>
          <Tooltip className={styles.icon} title="Delete"><DeleteOutlined style={{ color: 'red' }} /></Tooltip>
        </Space>
      </div>
    </div>
  );
};

export default MyWorksheet;
