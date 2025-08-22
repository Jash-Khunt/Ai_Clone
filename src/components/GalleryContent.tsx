import { Row, Col } from 'antd';
import FileCard from './ui/FileCard';
import styles from '../styles/custom/myGallery.module.less'

interface FileItem {
  id: string;
  name: string;
  type: 'IMAGE' | 'PDF' | 'FOLDER';
  uploadedAt?: string;
  status?: 'Used' | 'New';
  thumbnail?: string;
  folder_id?: number | null;
}

interface Props {
  files: FileItem[];
  totalFiles: number;
  viewMode: 'grid' | 'list';
  onGenerateWorksheet?: (fileId: string) => void;
  onItemClick?: (file: FileItem) => void;
}

const GalleryContent: React.FC<Props> = ({ files, totalFiles, viewMode, onGenerateWorksheet, onItemClick }) => (
  <>
    <div className={styles.fileCount}>
      {files.length} of {totalFiles} items
    </div>
    {viewMode === 'grid' ? (
      <Row gutter={[16, 16]} className={styles.fileGrid}>
        {files.map((file) => (
          <Col key={file.id} xs={24} sm={12} md={8} lg={6} xl={4}>
            <FileCard file={file} onGenerateWorksheet={onGenerateWorksheet} onItemClick={onItemClick} />
          </Col>
        ))}
      </Row>
    ) : (
      <div className={styles.fileList}>
        {files.map((file) => (
          <div key={file.id} className={styles.listItem}>
            <FileCard file={file} onGenerateWorksheet={onGenerateWorksheet} onItemClick={onItemClick} listView />
          </div>
        ))}
      </div>
    )}
  </>
);

export default GalleryContent;
