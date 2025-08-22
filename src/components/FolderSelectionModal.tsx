import React, { useState, useEffect } from 'react';
import { Modal, Select, Button, message, Spin } from 'antd';
import { FolderOutlined, PlusOutlined } from '@ant-design/icons';

const { Option } = Select;

interface Folder {
  folder_id: number;
  name: string;
  parent_id: number | null;
  created_by: number;
}

interface FolderSelectionModalProps {
  visible?: boolean;
  onCancel: () => void;
  onConfirm: (folderId: number | null) => void;
  uploadedFiles: Array<{
    title: string;
    description: string;
    file_path: string;
    thumbnail_path?: string;
    category_id: number;
    uploaded_by: number;
    visibility: string;
    tags: string;
    originalName: string;
    fileName: string;
    thumbnailName?: string;
  }>;
  userId: number;
}

const FolderSelectionModal: React.FC<FolderSelectionModalProps> = ({
  visible,
  onCancel,
  onConfirm,
  uploadedFiles,
  userId
}) => {
  const [folders, setFolders] = useState<Folder[]>([]);
  const [selectedFolderId, setSelectedFolderId] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [newFolderName, setNewFolderName] = useState('');
  const [showNewFolderInput, setShowNewFolderInput] = useState(false);

  const API_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";

  useEffect(() => {
    if (visible && userId) {
      fetchUserFolders();
    }
  }, [visible, userId]);

  const fetchUserFolders = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/gallery/user-folders?userId=${userId}`);
      if (response.ok) {
        const data = await response.json();
        setFolders(data);
      } else {
        message.error('Failed to fetch folders');
      }
    } catch (error) {
      console.error('Error fetching folders:', error);
      message.error('Failed to fetch folders');
    }
    setLoading(false);
  };

  const handleCreateFolder = async () => {
    if (!newFolderName.trim()) {
      message.error('Please enter a folder name');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/gallery/folders`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: newFolderName.trim(),
          parent_id: null,
          created_by: userId
        }),
      });

      if (response.ok) {
        const newFolder = await response.json();
        setFolders([...folders, newFolder]);
        setSelectedFolderId(newFolder.folder_id);
        setNewFolderName('');
        setShowNewFolderInput(false);
        message.success('Folder created successfully');
      } else {
        message.error('Failed to create folder');
      }
    } catch (error) {
      console.error('Error creating folder:', error);
      message.error('Failed to create folder');
    }
    setLoading(false);
  };

  const handleConfirm = () => {
    onConfirm(selectedFolderId);
  };

  return (
    <Modal
      title="Save to Gallery"
      open={visible}
      onCancel={onCancel}
      footer={[
        <Button key="cancel" onClick={onCancel}>
          Cancel
        </Button>,
        <Button 
          key="confirm" 
          type="primary" 
          onClick={handleConfirm}
          loading={loading}
        >
          Save to Gallery
        </Button>,
      ]}
      width={600}
    >
      <div style={{ marginBottom: 16 }}>
        <p>You have {uploadedFiles.length} file(s) to save to your gallery:</p>
        <ul style={{ marginLeft: 20 }}>
          {uploadedFiles.map((file, index) => (
            <li key={index}>{file.originalName}</li>
          ))}
        </ul>
      </div>

      <div style={{ marginBottom: 16 }}>
        <label style={{ display: 'block', marginBottom: 8, fontWeight: 500 }}>
          Select Folder (optional):
        </label>
        <Select
          style={{ width: '100%' }}
          placeholder="Choose a folder or leave empty for root"
          value={selectedFolderId}
          onChange={setSelectedFolderId}
          allowClear
          loading={loading}
        >
          {folders.map((folder) => (
            <Option key={folder.folder_id} value={folder.folder_id}>
              <FolderOutlined style={{ marginRight: 8 }} />
              {folder.name}
            </Option>
          ))}
        </Select>
      </div>

      <div style={{ marginBottom: 16 }}>
        <Button
          type="dashed"
          icon={<PlusOutlined />}
          onClick={() => setShowNewFolderInput(true)}
          style={{ width: '100%' }}
        >
          Create New Folder
        </Button>
      </div>

      {showNewFolderInput && (
        <div style={{ marginBottom: 16 }}>
          <div style={{ display: 'flex', gap: 8 }}>
            <input
              type="text"
              placeholder="Enter folder name"
              value={newFolderName}
              onChange={(e) => setNewFolderName(e.target.value)}
              style={{
                flex: 1,
                padding: '8px 12px',
                border: '1px solid #d9d9d9',
                borderRadius: '6px',
                fontSize: '14px'
              }}
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  handleCreateFolder();
                }
              }}
            />
            <Button 
              type="primary" 
              onClick={handleCreateFolder}
              loading={loading}
            >
              Create
            </Button>
            <Button onClick={() => {
              setShowNewFolderInput(false);
              setNewFolderName('');
            }}>
              Cancel
            </Button>
          </div>
        </div>
      )}

      <div style={{ 
        padding: 12, 
        backgroundColor: '#f6f8fa', 
        borderRadius: 6,
        fontSize: '14px',
        color: '#586069'
      }}>
        <p style={{ margin: 0 }}>
          <strong>Note:</strong> Files will be saved to your gallery and can be accessed later from the "My Gallery" section.
          {selectedFolderId ? ' Files will be organized in the selected folder.' : ' Files will be saved in the root directory.'}
        </p>
      </div>
    </Modal>
  );
};

export default FolderSelectionModal; 