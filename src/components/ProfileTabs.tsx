// components/ProfileTabs.tsx
import React from 'react';
import { Segmented } from 'antd';
import {
  UserOutlined,
  BellOutlined,
  LockOutlined,
} from '@ant-design/icons';

interface ProfileTabsProps {
  activeTab: string;
  onTabChange: (val: string) => void;
}

const ProfileTabs: React.FC<ProfileTabsProps> = ({ activeTab, onTabChange }) => {
  const tabOptions = [
    {
      label: (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 8 }}>
          <UserOutlined />
          <span>Profile</span>
        </div>
      ),
      value: 'Profile',
    },
    {
      label: (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 8 }}>
          <BellOutlined />
          <span>Notifications</span>
        </div>
      ),
      value: 'Notifications',
    },
    {
      label: (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 8}}>
          <LockOutlined />
          <span>Security</span>
        </div>
      ),
      value: 'Security',
    },
  ];

  return (
    <Segmented
      block
      size="large"
      options={tabOptions}
      value={activeTab}
      onChange={(val) => onTabChange(val as string)}
    />
  );
};

export default ProfileTabs;
