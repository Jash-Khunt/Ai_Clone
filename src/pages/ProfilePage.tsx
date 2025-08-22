import React, { useState } from 'react';
import { Typography } from 'antd';
import styles from '../styles/custom/profile.module.less';
import ProfileTabs from '../components/ProfileTabs';
import Profile from '../components/Profile';
import NotificationPreferences from '../components/NotificationPreferences';
import SecuritySettings  from '../components/SecuritySettings';
import PageHeader from '../components/PageHeader';

const { Title, Text } = Typography;

const ProfilePage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('Profile');

  const renderContent = () => {
    switch (activeTab) {
      case 'Profile':
        return <Profile />;
      case 'Notifications':
        return <NotificationPreferences />;
      case 'Security':
        return <SecuritySettings />;
      default:
        return null;
    }
  };

  return (
    <>
      <PageHeader />
      <div className={styles.profileHeader}>
        <Title style={{fontWeight: 700}} level={2} >My Profile</Title>
        <Text>
          Manage your account settings and preferences
        </Text>
      </div>

      <div className={styles.segmentedWrapper}>
        <ProfileTabs activeTab={activeTab} onTabChange={setActiveTab} />
      </div>

        <div className={styles.profileOuterCard}>
          {renderContent()}
        </div>
    </>
  );
};

export default ProfilePage;
