import { Typography } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import type { ReactNode } from 'react';
import CustomButton from './CustomButton';
import styles from '../styles/custom/galleryHeader.module.less';

const { Title, Text } = Typography;

export interface GalleryHeaderProps {
  title?: string;
  description?: string;
  icon?: ReactNode;
  rightContent?: ReactNode;
  onBackClick?: () => void;
  backText?: string;
  showBackButton?: boolean;
  className?: string;
  backTo?: string;
}

const GalleryHeader: React.FC<GalleryHeaderProps> = ({
  title,
  description,
  icon,
  rightContent,
  onBackClick,
  backText = 'Back to Home',
  showBackButton = true,
  className = '',
  backTo = '/',
}) => {
  const navigate = useNavigate();

  const handleBack = () => {
    if (onBackClick) {
      onBackClick();
    } else {
      navigate(backTo ?? '/');
    }
  };

  return (
    <div className={`${styles.header} ${className}`}>
      <div className={styles.headerLeft}>
        <div className={styles.titleSection}>
          {showBackButton && (
            <CustomButton
              text={backText}
              type="text"
              onClick={handleBack}
              size="middle"
              prefixIcon={<ArrowLeftOutlined />}
              className={styles.backButton}
            />
          )}
          <div className={styles.pageTitleSub}>
            <Title level={2} className={styles.pageTitle}>
              {icon} {title}
            </Title>
            {description && (
              <Text className={styles.pageDescription}>{description}</Text>
            )}
          </div>
        </div>
      </div>
      {rightContent && <div className={styles.headerRight}>{rightContent}</div>}
    </div>
  );
};

export default GalleryHeader;
