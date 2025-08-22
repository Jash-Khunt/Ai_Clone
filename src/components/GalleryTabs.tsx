import { Button } from 'antd';
import { FolderOutlined, UploadOutlined } from '@ant-design/icons';
import styles from '../styles/custom/galleryTabs.module.less';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setInputMethod } from '../store/slices/worksheetSlice';

interface Props {
  activeTab: 'files' | 'upload'; 
  setActiveTab: (tab: 'files' | 'upload') => void; 
}

const GalleryTabs: React.FC<Props> = ({ activeTab, setActiveTab }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleTabClick = (tab: 'upload' | 'files') => {
    setActiveTab(tab);
    if (tab === 'upload') {
      dispatch(setInputMethod('upload'));
      navigate('/worksheet-generator'); 
    }
  };

  return (
    <div className={styles.tabBar}>
      <Button
        type={activeTab === 'files' ? 'default' : 'text'}
        className={`${styles.tab} ${activeTab === 'files' ? styles.activeTab : ''}`}
        onClick={() => handleTabClick('files')}
      >
        <FolderOutlined /> My Files
      </Button>

      <Button
        type={activeTab === 'upload' ? 'default' : 'text'}
        className={`${styles.tab} ${activeTab === 'upload' ? styles.activeTab : ''}`}
        onClick={() => handleTabClick('upload')}
      >
        <UploadOutlined /> Upload New
      </Button>
    </div>
  );
};

export default GalleryTabs;
