import React from 'react';
import { Modal, Button, Typography } from 'antd';
import { DownloadOutlined, CloseOutlined } from '@ant-design/icons';
import styles from '../../styles/custom/filePreviewModal.module.less';

const { Title } = Typography;

interface FilePreviewModalProps {
  visible: boolean;
  file: {
    id: string;
    name: string;
    type: 'IMAGE' | 'PDF';
    thumbnail?: string;
  } | null;
  onClose: () => void;
  onDownload: (fileId: string) => void;
}

const FilePreviewModal: React.FC<FilePreviewModalProps> = ({
  visible,
  file,
  onClose,
  onDownload
}) => {
  if (!file) return null;

  const handleDownload = () => {
    onDownload(file.id);
  };

  return (
    <Modal
      open={visible}
      onCancel={onClose}
      footer={null}
      width={800}
      className={styles.previewModal}
      destroyOnClose
    >
      <div className={styles.modalHeader}>
        <Title level={4} className={styles.fileName}>
          {file.name}
        </Title>
        <div className={styles.modalActions}>
          <Button
            type="primary"
            icon={<DownloadOutlined />}
            onClick={handleDownload}
            className={styles.downloadButton}
          >
            Download
          </Button>
          <Button
            icon={<CloseOutlined />}
            onClick={onClose}
            className={styles.closeButton}
          />
        </div>
      </div>
      
      <div className={styles.previewContent}>
        {file.type === 'IMAGE' ? (
          <div className={styles.imagePreview}>
            <img
              src={file.thumbnail || `${import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api'}/gallery/download/${file.id}`}
              alt={file.name}
              className={styles.previewImage}
            />
          </div>
        ) : (
          <div className={styles.pdfPreview}>
            <div className={styles.pdfPlaceholder}>
              <div className={styles.pdfIcon}>
                <svg width="64" height="64" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M14 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V8L14 2Z" stroke="#1890ff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M14 2V8H20" stroke="#1890ff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M16 13H8" stroke="#1890ff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M16 17H8" stroke="#1890ff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M10 9H8" stroke="#1890ff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <div className={styles.pdfTitle}>{file.name}</div>
              <div className={styles.pdfMessage}>PDF Document</div>
              <Button 
                type="primary" 
                size="large"
                onClick={() => window.open(`${import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api'}/gallery/download/${file.id}`, '_blank')}
                className={styles.pdfDownloadButton}
              >
                Open PDF
              </Button>
            </div>
          </div>
        )}
      </div>
    </Modal>
  );
};

export default FilePreviewModal; 