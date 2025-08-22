import { Row, Col, Tooltip } from 'antd';
import { EyeOutlined, DeleteOutlined } from '@ant-design/icons';

interface FileActionsProps {
  isImage: boolean;
  url: string;
  onPreview: () => void;
  onDelete: () => void;
}

const FileActions: React.FC<FileActionsProps> = ({ isImage, url, onPreview, onDelete }) => {
  return (
    <Row gutter={16} justify="end" style={{marginRight: 16}}>
      <Col>
        <Tooltip title="View">
          {isImage ? (
            <EyeOutlined
              style={{ fontSize: 18, cursor: 'pointer', color: 'blue' }}
              onClick={onPreview}
            />
          ) : (
            <a href={url} target="_blank" rel="noopener noreferrer">
              <EyeOutlined style={{ fontSize: 18, cursor: 'pointer', color: 'blue' }} />
            </a>
          )}
        </Tooltip>
      </Col>
      <Col>
        <Tooltip title="Delete">
          <DeleteOutlined
            style={{ fontSize: 18, color: 'red', cursor: 'pointer' }}
            onClick={onDelete}
          />
        </Tooltip>
      </Col>
    </Row>
  );
};

export default FileActions;
