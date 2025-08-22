import React from 'react';
import { Avatar, Typography, Divider } from 'antd';
import styles from '../styles/custom/profile.module.less';
import { profileData } from '../statics/profileData';
import { CameraOutlined } from '@ant-design/icons';

const { Text, Title } = Typography;

const ProfileCard: React.FC = () => {
  return (
    <div className={styles.profileCard}>
      <div className={styles.avatarWrapper}>
        <Avatar className={styles.avatar} size={80}>
          {profileData.initials}
        </Avatar>
        <div className={styles.iconWrapper}>
          <CameraOutlined />
        </div>
      </div>

      <Title level={4} className={styles.name}>{profileData.fullName}</Title>

      <div className={styles.roleTag}>Teacher</div>

      <Divider />

      <div className={styles.stat}>
        <Title level={4} className={styles.worksheetStat}>{profileData.worksheetsCreated}</Title>
        <Text type="secondary">Worksheets Created</Text>
      </div>

      <div className={styles.stat}>
        <Title level={4} className={styles.downloadStat}>{profileData.downloads.toLocaleString()}</Title>
        <Text type="secondary">Total Downloads</Text>
      </div>

      <Text type="secondary">Member since {profileData.memberSince}</Text>
    </div>
  );
};

export default ProfileCard;
