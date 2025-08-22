import React from 'react';
import { UploadOutlined } from '@ant-design/icons';
import { Typography } from 'antd';
import UploadedFilePreview from './UploadedFilePreview';
import CustomButton from './CustomButton';
import styles from '../styles/custom/fileUploadSection.module.less';

const { Text } = Typography;

interface Props {
  uploadedFile: any;
  fileUploaded: boolean;
  onUpload: (file: File) => void;
  onRemove: () => void;
  onBrowseGallery: () => void;
}

const FileUploadSection: React.FC<Props> = ({
  uploadedFile,
  fileUploaded,
  onUpload,
  onRemove,
  onBrowseGallery,
}) => {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) onUpload(file);
  };

  return fileUploaded && uploadedFile ? (
    <UploadedFilePreview file={uploadedFile} onRemove={onRemove} />
  ) : (
    <div className={styles.uploadContainer}>
      <label className={styles.dropZone}>
        <input
          type="file"
          accept="image/*,.pdf"
          onChange={handleFileChange}
          className={styles.uploadInput}
        />
        <div className={styles.uploadContent}>
          <UploadOutlined className={styles.uploadIcon} />
          <Text>Drop files here or click to browse</Text>
          <Text type="secondary">Supports: Images (JPG, PNG) and PDF files</Text>
        </div>
      </label>

      <div className={styles.orDivider}>Or</div>

      <CustomButton
        text="Browse Gallery"
        type="link"
        className={styles.galleryButton}
        onClick={onBrowseGallery}
        block
      />
    </div>
  );
};

export default FileUploadSection;
