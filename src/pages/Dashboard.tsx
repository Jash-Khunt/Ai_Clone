import React, { useState } from 'react';
import { Row, Col, Typography, Avatar, Segmented } from 'antd';
import styles from '../styles/custom/dashboard.module.less';
import { statCards, quickActions } from '../statics/dashboardData';
import StatCard from '../components/StatCard';
import ActionCard from '../components/ActionCard';
import RecentWorksheets from '../components/RecentWorksheets';
import LibraryPage from '../components/LibraryPage';
import { BookOutlined, BulbOutlined, FileTextOutlined, ThunderboltOutlined } from '@ant-design/icons';
import AIToolsSection from '../components/AIToolsSection';
import { useNavigate } from 'react-router-dom';
import { profileData } from '../statics/profileData'; // ✅ import user profile
import PageHeader from '../components/PageHeader';

const { Title, Text, Paragraph } = Typography;

const getInitials = (name: string) => {
  const parts = name.trim().split(' ');
  return parts.length >= 2
    ? parts[0][0].toUpperCase() + parts[1][0].toUpperCase()
    : parts[0][0].toUpperCase();
};

const TAB_OPTIONS = [
  {
    icon: <ThunderboltOutlined />,
    label: 'Quick Actions',
    value: 'Quick Actions',
  },
  {
    icon: <FileTextOutlined />,
    label: 'My Worksheets',
    value: 'My Worksheets',
  },
  {
    icon: <BulbOutlined />,
    label: 'AI Tools',
    value: 'AI Tools',
  },
  {
    icon: <BookOutlined />,
    label: 'Browse Library',
    value: 'Browse Library',
  },
];

const Dashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('Quick Actions');
  const navigate = useNavigate();

  const handleAvatarClick = () => {
    navigate('/profile');
  };

  return (
    <>
      <PageHeader />
      <div className={styles.dashboardWrapper}>
        {/* Header */}
        <Row justify="space-between" align="middle" className={styles.headerRow}>
          <Col>
            <Title level={2}>Welcome back, {profileData.role}!</Title>
            <Text style={{fontSize: 16, color: 'gray'}}> Manage your worksheets, track performance, and create new content. </Text>
          </Col>
          <Col>
            <Avatar className={styles.userAvatar} onClick={handleAvatarClick} style={{ cursor: 'pointer' }}>
              {profileData.initials.toUpperCase()}
            </Avatar>
          </Col>
        </Row>

        {/* Stat Cards */}
        <Row gutter={[24, 24]} className={styles.statsRow}>
          {statCards.map((card) => (
            <Col span={24} md={8} key={card.title}>
              <StatCard {...card} />
            </Col>
          ))}
        </Row>

        {/* Segmented Tabs */}
        <div style={{ margin: '24px 0', display: 'flex', justifyContent: 'center' }}>
          <Segmented
            block
            size="large"
            value={activeTab}
            onChange={(val) => setActiveTab(val as string)}
            options={TAB_OPTIONS.map((tab) => ({
              label: (
                <span style={{ display: 'flex', justifyContent: 'center', gap: 8 }}>
                  {tab.icon} {tab.label}
                </span>
              ),
              value: tab.value,
            }))}
            style={{
              width: '100%',
              backgroundColor: '#e6eaef',
              color: 'black',
              borderRadius: '8px',
              padding: '0.2rem',
            }}
          />
        </div>

        {/* Tab Content */}
        <div className={styles.quickActions}>
          {activeTab === 'Quick Actions' && (
            <>
              <Title level={3}>Quick Actions</Title>
              <Paragraph>Choose how you'd like to get started with creating your worksheet</Paragraph>
              <Row gutter={[24, 24]}>
                {quickActions.map((action) => (
                  <Col span={24} md={8} key={action.title}>
                    <ActionCard {...action} />
                  </Col>
                ))}
              </Row>
            </>
          )}

          {activeTab === 'My Worksheets' && <RecentWorksheets />}

          {activeTab === 'AI Tools' && <Text type="secondary"><AIToolsSection /></Text>}

          {activeTab === 'Browse Library' && <LibraryPage />}
        </div>
      </div>
    </>
  );
};

export default Dashboard;
