import React from 'react';
import { Typography } from 'antd';
import styles from '../styles/custom/MyWorksheet.module.less';
import MyWorksheet from './MyWorksheet';
import { worksheets } from '../statics/dashboardData';

const { Title, Paragraph } = Typography;

const RecentWorksheets: React.FC = () => {
  return (
    <div className={styles.recentWorksheetsContainer}>
      <Title level={3}>Recent Worksheets</Title>
      <Paragraph>
        Your latest created and published worksheets
      </Paragraph>
      <div className={styles.worksheetsList}>
        {worksheets.map((ws, idx) => (
          <MyWorksheet key={idx} {...ws} />
        ))}
      </div>
    </div>
  );
};

export default RecentWorksheets;
