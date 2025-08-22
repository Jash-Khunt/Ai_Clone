import React from 'react';
import SettingsActionCard from './SettingsActionCard';
import { securityActions, accountActions } from '../statics/securityData';
import styles from '../styles/custom/security.module.less';

const SecuritySettings: React.FC = () => {
  const handleActionClick = (key: string) => {
    console.log('Action clicked:', key);
    // Future API logic
  };

  return (
      <div className={styles.securityWrapper}>
        <SettingsActionCard
          title="Password & Security"
          description="Manage your password and security settings"
          actions={securityActions}
          onActionClick={handleActionClick}
        />

        <SettingsActionCard
          title="Account Actions"
          description="Manage your account data and preferences"
          actions={accountActions}
          onActionClick={handleActionClick}
        />
      </div>
  );
};

export default SecuritySettings;
