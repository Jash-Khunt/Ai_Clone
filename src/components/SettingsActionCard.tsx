import React from 'react';
import { Button, Typography } from 'antd';
import styles from '../styles/custom/security.module.less';

const { Title, Text } = Typography;

interface ActionItem {
  key: string;
  title: string;
  danger?: boolean;
}

interface SettingsActionCardProps {
  title: string;
  description: string;
  actions: ActionItem[];
  onActionClick?: (key: string) => void;
}

const SettingsActionCard: React.FC<SettingsActionCardProps> = ({
  title,
  description,
  actions,
  onActionClick
}) => {
  return (
    <div className={styles.cardWrapper}>
      <Title level={4}>{title}</Title>
      <Text type="secondary">{description}</Text>

      <div className={styles.actionList}>
        {actions.map((action) => (
          <Button
            key={action.key}
            block
            className={`${styles.actionButton} ${action.danger ? styles.danger : ''}`}
            onClick={() => onActionClick?.(action.key)}
          >
            {action.title}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default SettingsActionCard;
