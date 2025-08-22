import React, { useState } from 'react';
import { Button, Tag, Typography, Tooltip, message } from 'antd';
import {
  PlayCircleOutlined,
  FileTextOutlined,
  PictureOutlined,
  FolderOpenOutlined,
  EyeOutlined,
  DownloadOutlined,
  DeleteOutlined,
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import FilePreviewModal from './FilePreviewModal';
import fileService from '../../utils/fileService';
import styles from '../../styles/custom/fileCard.module.less';

const { Title, Text } = Typography;

interface FileItem {
  id: string;
  name: string;
  type: 'IMAGE' | 'PDF' | 'FOLDER';
  uploadedAt?: string;
  status?: 'Used' | 'New';
  thumbnail?: string;
  folder_id?: number | null;
  file_path?: string;
}

interface FileCardProps {
  file: FileItem;
  onGenerateWorksheet?: (fileId: string) => void;
  onItemClick?: (file: FileItem) => void;
  listView?: boolean;
}

const FileCard: React.FC<FileCardProps> = ({ file, onGenerateWorksheet, onItemClick, listView = false }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [previewModalVisible, setPreviewModalVisible] = useState(false);
  const navigate = useNavigate();

  const handleView = (e: React.MouseEvent) => {
    e.stopPropagation();
    setPreviewModalVisible(true);
  };

  const handleDownload = (fileId: string) => {
    message.loading(`Downloading ${file.name}...`, 0);
    fileService.downloadFile(fileId, file.name)
      .then(() => {
        message.destroy();
        message.success(`"${file.name}" downloaded successfully`);
      })
      .catch((error) => {
        message.destroy();
        message.error(`Failed to download "${file.name}". Please try again.`);
        console.error('Download error:', error);
      });
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (window.confirm(`Are you sure you want to delete "${file.name}"?`)) {
      message.loading(`Deleting ${file.name}...`, 0);
      fileService.deleteFile(file.id)
        .then(() => {
          message.destroy();
          message.success(`"${file.name}" deleted successfully`);
          window.location.reload();
        })
        .catch((error) => {
          message.destroy();
          message.error(`Failed to delete "${file.name}". Please try again.`);
          console.error('Delete error:', error);
        });
    }
  };

  const handleGenerate = () => {
    const fileData = {
      id: file.id,
      name: file.name,
      type: file.type,
      uploadedAt: file.uploadedAt,
      status: file.status,
      thumbnail: file.thumbnail || '',
      file_path: file.file_path, // Add file_path for backend processing
    };
    
    console.log('🔍 FileCard - Original file:', file);
    console.log('🔍 FileCard - Passing file data:', fileData);
    
    navigate('/worksheet-gallery', {
      state: {
        file: fileData,
      },
    });
  };

  // FOLDER: click navigates in, show folder icon, no actions
  if (file.type === 'FOLDER') {
    return (
      <div
        className={styles.fileCard}
        style={{ cursor: 'pointer' }}
        onClick={() => onItemClick && onItemClick(file)}
      >
        <div className={styles.cardHeader}>
          <Tag color="gold" className={styles.typeTag}>FOLDER</Tag>
        </div>
        <div className={styles.cardContent}>
          <div className={styles.thumbnail}>
            <FolderOpenOutlined className={styles.imageIcon} style={{ fontSize: 32 }} />
          </div>
          <div className={styles.fileInfo}>
            <Title level={5} className={styles.fileName}>{file.name}</Title>
          </div>
        </div>
      </div>
    );
  }

  // IMAGE/PDF: existing behavior
  return (
    <div className={styles.fileCard}>
      <div className={styles.cardHeader}>
        <Tag color="blue" className={styles.typeTag}>{file.type}</Tag>
        {file.status === 'Used' && <Tag color="green" className={styles.statusTag}>Used</Tag>}
      </div>
      <div className={styles.cardContent}>
        <div
          className={styles.thumbnail}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {file.type === 'PDF' ? (
            <div className={styles.pdfPreview}>
              <FileTextOutlined className={styles.pdfIcon} />
            </div>
                    ) : file.thumbnail ? (
            <>
              <img 
                src={file.thumbnail} 
                alt={file.name} 
                className={styles.imagePreview}
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                  e.currentTarget.nextElementSibling?.classList.remove('hidden');
                }}
              />
              <PictureOutlined 
                className={`${styles.imageIcon} hidden`} 
                style={{ display: 'none' }}
              />
            </>
          ) : (
            <PictureOutlined className={styles.imageIcon} />
          )}
          {isHovered && (
            <div className={styles.hoverActions}>
              <Tooltip title="View">
                <Button type="text" icon={<EyeOutlined />} className={styles.actionButton} onClick={handleView} />
              </Tooltip>
              <Tooltip title="Download">
                <Button
                  type="text"
                  icon={<DownloadOutlined />}
                  className={`${styles.actionButton} ${styles.downloadButton}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDownload(file.id);
                  }}
                />
              </Tooltip>
              <Tooltip title="Delete">
                <Button type="text" icon={<DeleteOutlined />} className={styles.actionButton} onClick={handleDelete} />
              </Tooltip>
            </div>
          )}
        </div>
        <div className={styles.fileInfo}>
          <Title level={5} className={styles.fileName}>{file.name}</Title>
          <Text className={styles.uploadDate}>Uploaded on {file.uploadedAt}</Text>
        </div>
      </div>
      <Button
        type="primary"
        icon={<PlayCircleOutlined />}
        className={styles.generateButton}
        onClick={handleGenerate}
        block
      >
        Generate Worksheet
      </Button>
      <FilePreviewModal
        visible={previewModalVisible}
        file={
          file.type === 'IMAGE' || file.type === 'PDF'
            ? {
                id: file.id,
                name: file.name,
                type: file.type,
                thumbnail: file.thumbnail,
              }
            : null
        }
        onClose={() => setPreviewModalVisible(false)}
        onDownload={handleDownload}
      />
    </div>
  );
};

export default FileCard;
