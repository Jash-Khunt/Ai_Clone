import React, { useEffect, useState } from 'react';
import GalleryHeader from '../components/GalleryHeader';
import GalleryTabs from '../components/GalleryTabs';
import GalleryFilters from '../components/GalleryFilters';
import GalleryContent from '../components/GalleryContent';
import styles from '../styles/custom/myGallery.module.less';
import { FolderOpenOutlined, ArrowLeftOutlined, PlusOutlined } from '@ant-design/icons';
import { Sparkles } from 'lucide-react';
import { Row, Col, message, Spin, Button, Modal, Input } from 'antd';

interface Folder {
  folder_id: number;
  name: string;
  parent_id: number | null;
  created_by: number;
}

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

const MyGallery: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'files' | 'upload'>('files');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'images' | 'pdfs'>('all');
  const [folders, setFolders] = useState<Folder[]>([]);
  const [files, setFiles] = useState<FileItem[]>([]);
  const [currentFolderId, setCurrentFolderId] = useState<number | null>(null);
  const [parentFolderId, setParentFolderId] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [newFolderName, setNewFolderName] = useState('');
  const [thumbnailCache, setThumbnailCache] = useState<Record<string, string>>({});

  const API_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";

  // Get thumbnail URL using base64 API to avoid CORS issues
  const getThumbnailUrl = async (filePath: string) => {
    if (!filePath) return '';
    
    // Extract filename from path
    const filename = filePath.split('/').pop();
    if (!filename) return '';
    
    // Check cache first
    if (thumbnailCache[filename]) {
      return thumbnailCache[filename];
    }
    
    try {
      const response = await fetch(`${API_URL}/gallery/image/${filename}`);
      if (response.ok) {
        const data = await response.json();
        // Cache the result
        setThumbnailCache(prev => ({ ...prev, [filename]: data.dataUrl }));
        return data.dataUrl;
      }
    } catch (error) {
      console.error('Error fetching image:', error);
    }
    
    return '';
  };

  // Load thumbnails for files
  useEffect(() => {
    const loadThumbnails = async () => {
      const updatedFiles = await Promise.all(
        files.map(async (file) => {
          if (file.type === 'IMAGE' && !file.thumbnail) {
            const thumbnailPath = file.file_path || '';
            const thumbnailUrl = await getThumbnailUrl(thumbnailPath);
            return { ...file, thumbnail: thumbnailUrl };
          }
          return file;
        })
      );
      setFiles(updatedFiles);
    };

    if (files.length > 0) {
      loadThumbnails();
    }
  }, [files.length, thumbnailCache]);

  // Fetch folders and images for the current folder
  const fetchContents = async (folderId: number | null) => {
    setLoading(true);
    try {
      // Folders
      const folderRes = await fetch(`${API_URL}/gallery/folders?parentId=${folderId ?? ''}`);
      const folderData = await folderRes.json();
      setFolders(folderData);
      // Images
      const fileRes = await fetch(`${API_URL}/gallery/images?folderId=${folderId ?? ''}`);
      const fileData = await fileRes.json();
      setFiles(fileData.map((img: any) => {
        // Determine file type based on category_id or file extension
        let fileType: 'IMAGE' | 'PDF' = 'IMAGE';
        if (img.category_id === 1 || img.file_path?.toLowerCase().endsWith('.pdf')) {
          fileType = 'PDF';
        } else if (img.category_id === 2 || 
                   img.file_path?.toLowerCase().match(/\.(jpg|jpeg|png|gif|bmp|webp)$/)) {
          fileType = 'IMAGE';
        }
        
        const mappedFile = {
          ...img,
          id: img.object_id || img.image_id, // Try both column names
          name: img.title || img.file_path,
          type: fileType,
          thumbnail: '', // Will be loaded asynchronously
          file_path: img.file_path, // Include file_path for worksheet generation
        };
                
        return mappedFile;
      }));
      // Get parent folder id for navigation
      if (folderId) {
        const thisFolder = folderData.find((f: Folder) => f.folder_id === folderId);
        setParentFolderId(thisFolder ? thisFolder.parent_id : null);
      } else {
        setParentFolderId(null);
      }
    } catch {
      message.error('Failed to load contents');
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchContents(currentFolderId);
  }, [currentFolderId]);

  // Create folder in current folder
  const handleAddFolder = async () => {
    try {
      const userId = JSON.parse(localStorage.getItem('user') || '{}').user_id;
      console.log(userId);
      const res = await fetch(`${API_URL}/gallery/folders`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          parent_id: currentFolderId, 
          name: newFolderName,
          created_by: Number(userId),
        }),
      });
      if (!res.ok) throw new Error('Failed to create folder');
      setModalVisible(false);
      setNewFolderName('');
      fetchContents(currentFolderId);
      message.success('Folder created');
    } catch {
      message.error('Failed to create folder');
    }
  };

  // Back button: fetch parent folder from backend
  const handleBack = async () => {
    if (currentFolderId === null) return;
    try {
      const res = await fetch(`${API_URL}/gallery/folders/${currentFolderId}`);
      if (!res.ok) throw new Error('Failed to fetch parent folder');
      const folder = await res.json();
      setCurrentFolderId(folder.parent_id);
    } catch {
      setCurrentFolderId(null); // fallback to root
    }
  };

  // Combined view: folders as FileItem type, plus static demo files
  const staticDemoFiles: FileItem[] = [
    // {
    //   id: 'static-img-1',
    //   name: 'Demo Image 1',
    //   type: 'IMAGE',
    //   uploadedAt: '2024-08-01',
    //   status: 'New',
    //   thumbnail: 'https://via.placeholder.com/150',
    //   folder_id: currentFolderId,
    // },
    // {
    //   id: 'static-pdf-1',
    //   name: 'Demo PDF 1',
    //   type: 'PDF',
    //   uploadedAt: '2024-08-01',
    //   status: 'Used',
    //   thumbnail: '',
    //   folder_id: currentFolderId,
    // },
  ];
  const combinedItems: FileItem[] = [
    ...folders.map(f => ({
      id: `folder-${f.folder_id}`,
      name: f.name,
      type: 'FOLDER' as const,
      folder_id: f.folder_id,
    })),
    ...files,
    ...staticDemoFiles,
  ];

  // Navigation: click folder to go in
  const handleItemClick = (item: FileItem) => {
    if (item.type === 'FOLDER') {
      setCurrentFolderId(item.folder_id!);
    }
  };

  // Filter/search
  const filteredItems = combinedItems.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
    if (item.type === 'FOLDER') return matchesSearch;
    const matchesFilter =
      filterType === 'all' ||
      (filterType === 'images' && item.type === 'IMAGE') ||
      (filterType === 'pdfs' && item.type === 'PDF');
    return matchesSearch && matchesFilter;
  });

  return (
    <div className={styles.galleryWrapper}>
      <GalleryHeader
        title="My Gallery"
        description="Upload, organize and use your files to generate AI worksheets"
        icon={<FolderOpenOutlined className={styles.folder} />}
        rightContent={
          <>
            <Sparkles size={18} className={styles.sectionIcon} /> Select any file to instantly generate worksheets with AI
          </>
        }
      />
      <div className={styles.container}>
        <GalleryTabs activeTab={activeTab} setActiveTab={setActiveTab} />
        <div className={styles.mainContent}>
          <div className={styles.contentCard}>
            <Row gutter={24}>
              <Col span={24}>
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: 16 }}>
                  {currentFolderId !== null && (
                    <Button icon={<ArrowLeftOutlined />} onClick={handleBack} style={{ marginRight: 8 }}>
                      Back
                    </Button>
                  )}
                  <Button type="primary" icon={<PlusOutlined />} onClick={() => setModalVisible(true)}>
                    New Folder
                  </Button>
                </div>
                <GalleryFilters
                  searchTerm={searchTerm}
                  setSearchTerm={setSearchTerm}
                  filterType={filterType}
                  setFilterType={setFilterType}
                  getFilterCount={() => combinedItems.length}
                  viewMode={viewMode}
                  setViewMode={setViewMode}
                />
                <GalleryContent
                  files={filteredItems}
                  totalFiles={combinedItems.length}
                  viewMode={viewMode}
                  onGenerateWorksheet={() => {}}
                  onItemClick={handleItemClick}
                />
                <Modal
                  title="Create New Folder"
                  open={modalVisible}
                  onOk={handleAddFolder}
                  onCancel={() => setModalVisible(false)}
                >
                  <Input
                    placeholder="Folder Name"
                    value={newFolderName}
                    onChange={e => setNewFolderName(e.target.value)}
                  />
                </Modal>
              </Col>
            </Row>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyGallery;
