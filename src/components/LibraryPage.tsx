import React from 'react';
import { Layout, Typography, Segmented, Row, Col } from 'antd';
import styles from '../styles/custom/libraryPage.module.less';
import HistoryCard from './HistoryCard';
import CustomButton from './CustomButton';

import { libraryCategories, libraryData } from '../statics/dashboardData';

const { Title, Paragraph } = Typography;

const LibraryPage: React.FC = () => {
  return (
    <Layout className={styles.container}>
      <Title level={3}>Browse Library</Title>
      <Paragraph>Explore our comprehensive collection of ready-to-use worksheets and templates</Paragraph>

      <Segmented block options={libraryCategories} size="small" style={{ marginBottom: '1.5rem', color: 'black' }} />

      <Row gutter={[16, 16]} justify="start">
        {libraryData.map((item, index) => (
          <Col xs={24} sm={12} md={8} key={index}>
            <HistoryCard {...item} />
          </Col>
        ))}
      </Row>

      <div className={styles.loadMoreWrapper}>
        <CustomButton text="Load More Templates" type="default" style={{ fontWeight: 500 }} size="middle" />
      </div>
    </Layout>
  );
};

export default LibraryPage;
