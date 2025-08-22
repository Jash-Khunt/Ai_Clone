import React, { useState } from 'react';
import { Typography, Input, Row, Col, Button, Space } from 'antd';
import {
  MailOutlined,
  PhoneOutlined,
  HomeOutlined,
  TeamOutlined,
  EditOutlined,
  UserOutlined
} from '@ant-design/icons';
import styles from '../styles/custom/profile.module.less';
import { profileData } from '../statics/profileData';

const { Title, Text } = Typography;

const ProfileForm: React.FC = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(profileData);

  const handleChange = (key: string, value: string) => {
    setFormData(prev => ({ ...prev, [key]: value }));
  };

  const handleSave = () => {
    // Placeholder for saving logic
    setIsEditing(false);
  };

  const handleCancel = () => {
    setFormData(profileData);
    setIsEditing(false);
  };

  return (
    <div className={styles.profileForm}>
      <div className={styles.formHeader}>
        <div>
          <Title level={4}>Profile Information</Title>
          <Text type="secondary">Update your personal information and bio</Text>
        </div>

        {isEditing ? (
          <Space>
            <Button onClick={handleCancel}>Cancel</Button>
            <Button type="primary" onClick={handleSave}>Save Changes</Button>
          </Space>
        ) : (
          <Button icon={<EditOutlined />} className={styles.editBtn} onClick={() => setIsEditing(true)}>Edit</Button>
        )}
      </div>

      <Row gutter={[16, 16]}>
        <Col xs={24} md={12}>
          <label className={styles.label}>Full Name</label>
          <Input
            size="middle"
            prefix={<UserOutlined />}
            value={formData.fullName}
            onChange={(e) => handleChange('fullName', e.target.value)}
            disabled={!isEditing}
          />
        </Col>
        <Col xs={24} md={12}>
          <label className={styles.label}>Email Address</label>
          <Input
            size="middle"
            prefix={<MailOutlined />}
            value={formData.email}
            onChange={(e) => handleChange('email', e.target.value)}
            disabled={!isEditing}
          />
        </Col>
        <Col xs={24} md={12}>
          <label className={styles.label}>Phone Number</label>
          <Input
            size="middle"
            prefix={<PhoneOutlined />}
            value={formData.phone}
            onChange={(e) => handleChange('phone', e.target.value)}
            disabled={!isEditing}
          />
        </Col>
        <Col xs={24} md={12}>
          <label className={styles.label}>School/Institution</label>
          <Input
            size="middle"
            prefix={<TeamOutlined />}
            value={formData.school}
            onChange={(e) => handleChange('school', e.target.value)}
            disabled={!isEditing}
          />
        </Col>
        <Col span={24}>
          <label className={styles.label}>Address</label>
          <Input
            size="middle"
            prefix={<HomeOutlined />}
            value={formData.address}
            onChange={(e) => handleChange('address', e.target.value)}
            disabled={!isEditing}
          />
        </Col>
        <Col span={24}>
          <label className={styles.label}>Bio</label>
          <Input.TextArea
            rows={4}
            value={formData.bio}
            onChange={(e) => handleChange('bio', e.target.value)}
            disabled={!isEditing}
          />
        </Col>
      </Row>
    </div>
  );
};

export default ProfileForm;
