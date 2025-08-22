import { FileTextOutlined } from '@ant-design/icons';
import { Tag, Typography } from 'antd';
import CustomButton from './CustomButton';
import styles from '../styles/custom/uploadedFilePreview.module.less';

const { Text } = Typography;

const UploadedFilePreview = ({
  file,
  onRemove,
}: {
  file: any;
  onRemove: () => void;
}) => {
  return (
    <>
      <div className={styles.uploadInfo}>
        <div>
          <div className={styles.fileTitle}>{file.name}</div>
          <Tag color="blue" style={{ fontSize: 12, padding: '0px 8px', borderRadius: '1rem'}}>
            {file.type}
          </Tag>
        </div>
        {file.type === 'IMAGE' && (file.url || file.thumbnail) ? (
          <img src={file.url || file.thumbnail} alt="Preview" className={styles.previewImage} />
        ) : file.type === 'PDF' ? (
          <div className={styles.pdfPlaceholder}>
            <FileTextOutlined style={{ fontSize: 64, color: '#555' }} />
          </div>
        ) : (
          <Text type="secondary">No preview available</Text>
        )}
      </div>

      <CustomButton
        text="Remove File"
        type="default"
        block
        onClick={onRemove}
        className={styles.removeFileBtn}
      />
    </>
  );
};

export default UploadedFilePreview;
