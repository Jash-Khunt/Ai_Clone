import React from 'react';
import { Card, Typography, Button } from 'antd';
import type { ReactNode } from 'react';
import styles from '../../styles/custom/featureCard.module.less';

const { Paragraph } = Typography;

interface FeatureCardProps {
  icon: ReactNode;
  title: string;
  description: string;
  buttonText: string;
  onClick: () => void;
  gradient?: boolean;
}

const FeatureCard: React.FC<FeatureCardProps> = ({
  icon,
  title,
  description,
  buttonText,
  onClick,
  gradient = false
}) => {
  return (
    <Card className={styles.featureCard}>
      <div className={styles.cardHeader}>
        {icon}
        <span>{title}</span>
      </div>
      <Paragraph className={styles.cardText}>{description}</Paragraph>

      <Button
        className={`${styles.cardButton} ${gradient ? styles.gradientBtn : styles.plainBtn}`}
        onClick={onClick}
        block
      >
        {icon} {buttonText}
      </Button>
    </Card>
  );
};

export default FeatureCard; 