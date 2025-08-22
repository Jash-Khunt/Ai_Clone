import React, { useState } from 'react';
import { Tree, Button, Modal, Input, message } from 'antd';
import { PlusOutlined, FolderOpenOutlined } from '@ant-design/icons';
import styles from '../styles/custom/folderTree.module.less';

export interface Folder {
  folder_id: number;
  name: string;
  parent_id: number | null;
  children?: Folder[];
}

interface FolderTreeProps {
  folders: Folder[];
  onSelect: (folderId: number) => void;
  onAddFolder: (parentId: number | null, name: string) => void;
  selectedFolderId: number | null;
}

const FolderTree: React.FC<FolderTreeProps> = ({
  folders,
  onSelect,
  onAddFolder,
  selectedFolderId,
}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [newFolderName, setNewFolderName] = useState('');
  const [currentParentId, setCurrentParentId] = useState<number | null>(null);

  const handleAddFolder = (parentId: number | null) => {
    setCurrentParentId(parentId);
    setModalVisible(true);
  };

  const handleOk = () => {
    if (!newFolderName.trim()) {
      message.error('Folder name cannot be empty');
      return;
    }
    onAddFolder(currentParentId, newFolderName.trim());
    setModalVisible(false);
    setNewFolderName('');
  };

  const renderTreeNodes = (data: Folder[]): any[] =>
    data.map((item) => ({
      title: (
        <span>
          <FolderOpenOutlined style={{ marginRight: 8 }} />
          {item.name}
          <Button
            type="link"
            icon={<PlusOutlined />}
            size="small"
            onClick={(e) => {
              e.stopPropagation();
              handleAddFolder(item.folder_id);
            }}
            className={styles.addBtn}
          />
        </span>
      ),
      key: item.folder_id,
      children: item.children ? renderTreeNodes(item.children) : [],
      selectable: true,
    }));

  return (
    <div className={styles.folderTree}>
      <Button
        type="primary"
        icon={<PlusOutlined />}
        onClick={() => handleAddFolder(null)}
        className={styles.addRootBtn}
        block
      >
        Add Root Folder
      </Button>
      <Tree
        showLine
        selectedKeys={selectedFolderId ? [selectedFolderId.toString()] : []}
        treeData={renderTreeNodes(folders)}
        onSelect={(selectedKeys) => {
          if (selectedKeys.length > 0) onSelect(Number(selectedKeys[0]));
        }}
        className={styles.tree}
      />
      <Modal
        title="Add New Folder"
        open={modalVisible}
        onOk={handleOk}
        onCancel={() => setModalVisible(false)}
      >
        <Input
          placeholder="Folder Name"
          value={newFolderName}
          onChange={(e) => setNewFolderName(e.target.value)}
        />
      </Modal>
    </div>
  );
};

export default FolderTree;