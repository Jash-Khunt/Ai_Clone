import React from 'react';
import { Typography } from 'antd';
import {
  UploadOutlined,
  FileTextOutlined,
  FolderOpenOutlined
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import FeatureCard from '../components/ui/FeatureCard';
import styles from '../styles/custom/aiWorksheetGenerator.module.less';
import PageHeader from '../components/PageHeader';
import { Sparkles } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { setInputMethod } from '../store/slices/worksheetSlice';

const { Title, Paragraph } = Typography;

const AIWorksheetGenerator: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleOpenGallery = () => {
    navigate('/my-gallery');
  };

  const handleStartCreating = () => {
    dispatch(setInputMethod('upload'));
    navigate('/worksheet-generator'); 
  };

  const features = [
    {
      icon: <UploadOutlined />,
      text: 'Upload Images & PDFs'
    },
    {
      icon: <Sparkles size={16}/>,
      text: 'AI-Powered Generation'
    },
    {
      icon: <FileTextOutlined />,
      text: 'Custom Worksheets'
    }
  ];

  return (
    <>
      <PageHeader />
      <div className={styles.container}>
        <div className={styles.header}>
          <Title className={styles.title}>AI Worksheet Generator</Title>
          <Paragraph className={styles.subtitle}>
            Transform your images and PDFs into intelligent worksheets with AI. Upload once,
            generate unlimited educational content.
          </Paragraph>
        </div>

        <div className={styles.cardWrapper}>
          <FeatureCard
            icon={<FolderOpenOutlined />}
            title="My Gallery"
            description="Browse your uploaded files and generate worksheets from existing content."
            buttonText="Open Gallery"
            onClick={handleOpenGallery}
            gradient
          />

          <FeatureCard
            icon={<Sparkles className={styles.sectionIcon} />}
            title="Generate Worksheet"
            description="Upload new files or select from gallery to create AI-powered worksheets."
            buttonText="Start Creating"
            onClick={handleStartCreating}
          />
        </div>

        <div className={styles.footer}>
          {features.map((feature, index) => (
            <span key={index} className={styles.featureItem}>
              {feature.icon} {feature.text}
            </span>
          ))}
        </div>
      </div>
    </>
  );
};

export default AIWorksheetGenerator;
