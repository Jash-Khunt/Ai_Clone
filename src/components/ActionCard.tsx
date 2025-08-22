    import React from 'react';
import { Card, Typography } from 'antd';
import styles from '../styles/custom/dashboard.module.less';

const { Title, Text } = Typography;

interface ActionCardProps {
  title: string;
  description: string;
  icon: React.ElementType;
  iconClass: string;
}

const ActionCard: React.FC<ActionCardProps> = ({ title, description, icon: Icon, iconClass }) => {
  return (
    <Card hoverable className={styles.customFeatureCard}>
      <div className={`${styles.iconCircle} ${styles[iconClass]}`}>
        <Icon />
      </div>
      <Title level={5}>{title}</Title>
      <Text type="secondary">{description}</Text>
    </Card>
  );
};

export default ActionCard;
