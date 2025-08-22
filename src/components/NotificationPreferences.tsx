import React, { useState } from 'react';
import { Switch, Typography, Divider } from 'antd';
import styles from '../styles/custom/notificationPreferences.module.less';
import { notificationPreferences as staticPreferences } from '../statics/notificationData';

const { Title, Text } = Typography;

const NotificationPreferences: React.FC = () => {
  const [preferences, setPreferences] = useState(staticPreferences);

  const handleToggle = (key: string) => {
    setPreferences((prev) =>
      prev.map((item) =>
        item.key === key ? { ...item, enabled: !item.enabled } : item
      )
    );
  };

  return (
    <div className={styles.notificationPage}>
      <div className={styles.notificationCard}>
        <Title level={4}>Notification Preferences</Title>
        <Text type="secondary">
          Manage how you receive notifications and updates
        </Text>

        <Divider />

        {preferences.map((pref) => (
          <div className={styles.preferenceItem} key={pref.key}>
              <div>
                  <Text strong>{pref.title}</Text>
                  <br />
                  <Text type="secondary">{pref.description}</Text>
              </div>
              <Switch
                  className={pref.enabled ? styles.blackSwitch : ''}
                  checked={pref.enabled}
                  onChange={() => handleToggle(pref.key)}
              />
          </div>
        ))}
      </div>
    </div>
  );
};

export default NotificationPreferences;
