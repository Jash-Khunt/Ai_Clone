import React from 'react';
import { Row, Col } from 'antd';
import ProfileCard from './ProfileCard';
import ProfileForm from './ProfileForm';
import styles from '../styles/custom/profile.module.less'

const Profile: React.FC = () => {
  return (
    <div className={styles.profile}>
      <Row gutter={[24, 24]}>
        <Col xs={24} md={8}>
          <ProfileCard />
        </Col>
        <Col xs={24} md={16}>
          <ProfileForm />
        </Col>
      </Row>
    </div>
  );
};

export default Profile;
