import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Card } from 'antd';
import { Sparkles } from 'lucide-react';
import { FileTextOutlined } from '@ant-design/icons';

import GalleryHeader from '../components/GalleryHeader';
import FileUploadSection from '../components/FileUploadSection';
import WorksheetForm from '../components/WorksheetForm';
import SectionHeader from '../components/SectionHeader';
import styles from '../styles/custom/generateWorksheetPage.module.less';
import { setFiles } from '../store/slices/worksheetSlice';

const GenerateWorksheetPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const file = location.state?.file || null;

  const [fileUploaded, setFileUploaded] = useState(!!file);
  const [uploadedFile, setUploadedFile] = useState<any>(file || null);

  useEffect(() => {
    if (file) {
      setFileUploaded(true);
      
      console.log('📁 Original file data:', file);
      
      // Format gallery file for worksheet generation
      const formattedGalleryFile = {
        uid: file.id || Date.now().toString(),
        name: file.name,
        type: file.type,
        url: file.thumbnail || '', // Use thumbnail for preview
        originFileObj: undefined, // Gallery files don't have originFileObj
        galleryFile: true, // Flag to identify gallery files
        galleryId: file.id, // Store gallery file ID
        filePath: file.file_path, // Store file path for backend
      };
      
      console.log('📁 Gallery file formatted:', formattedGalleryFile);
      setUploadedFile(formattedGalleryFile);
      dispatch(setFiles([formattedGalleryFile]));
    }
  }, [file, dispatch]);

  const handleFileUpload = (localFile: File) => {
    const url = URL.createObjectURL(localFile);
    const fileType = localFile.type.includes('pdf') ? 'PDF' : 'IMAGE';

    const formattedFile = {
      uid: Date.now().toString(),
      name: localFile.name,
      type: fileType,
      url,
      originFileObj: localFile,
    };

    setUploadedFile(formattedFile);
    setFileUploaded(true);

    dispatch(setFiles([formattedFile])); 
  };

  const handleRemoveFile = () => {
    setUploadedFile(null);
    setFileUploaded(false);
    dispatch(setFiles([])); 
  };

  const handleBrowseGallery = () => {
    navigate('/my-gallery');
  };

  return (
    <div className={styles.container}>
      <div className={styles.galleryWrapper}>
        <GalleryHeader
          title="Generate Worksheet"
          description="Create AI-powered worksheets from your uploaded content"
          icon={<Sparkles size={29} className={styles.sectionIcon} />}
          backTo="/my-gallery"
          backText="Back to Gallery"
          className={styles.header}
        />
      </div>

      <div className={styles.wrapper}>
        <div className={styles.leftSection}>
          <Card className={styles.uploadCard}>
            <SectionHeader
              title={
                <>
                  <FileTextOutlined className={styles.sectionIcon} />
                  Source File
                </>
              }
            />
            <FileUploadSection
              uploadedFile={uploadedFile}
              fileUploaded={fileUploaded}
              onUpload={handleFileUpload}
              onRemove={handleRemoveFile}
              onBrowseGallery={handleBrowseGallery}
            />
          </Card>
        </div>

        <div className={styles.rightSection}>
          <Card>
            <WorksheetForm />
          </Card>
        </div>
      </div>
    </div>
  );
};

export default GenerateWorksheetPage;
