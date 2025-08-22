import React from 'react';
import { Row, Col, Card, Typography, Space } from 'antd';
import {
  BookOutlined,
  AppstoreAddOutlined,
  FileTextOutlined,
  BulbOutlined,
  ClockCircleOutlined,
  UserSwitchOutlined,
  SmileOutlined,
  EditOutlined,
  QuestionCircleOutlined,
  GlobalOutlined,
  PlusOutlined,
} from '@ant-design/icons';

import { aiTools } from '../statics/dashboardData';
import styles from '../styles/custom/dashboard.module.less';

const { Title, Text } = Typography;

const iconMap: Record<string, React.ReactNode> = {
  BookOutlined: <BookOutlined />,
  AppstoreAddOutlined: <AppstoreAddOutlined />,
  FileTextOutlined: <FileTextOutlined />,
  BulbOutlined: <BulbOutlined />,
  ClockCircleOutlined: <ClockCircleOutlined />,
  UserSwitchOutlined: <UserSwitchOutlined />,
  SmileOutlined: <SmileOutlined />,
  EditOutlined: <EditOutlined />,
  QuestionCircleOutlined: <QuestionCircleOutlined />,
  GlobalOutlined: <GlobalOutlined />,
};

const AIToolsSection: React.FC = () => {
    return (
    <div>
        <Title level={3}>10 AI Tools for Parents & Teachers</Title>
        <Text type="secondary">
            Powerful AI-powered tools to enhance your teaching and make education more engaging
        </Text>

        <div className={styles.cardGrid}>
            <Row gutter={[24, 24]}>
            {aiTools.map((tool) => (
                <Col span={24} md={12} key={tool.title}>
                    <div className={styles.toolCard}>
                        <div className={styles.toolCardInner}>
                            <div className={styles.iconWrapper}>
                                {iconMap[String(tool.icon)] ?? <QuestionCircleOutlined />}
                            </div>
                            <div className={styles.toolContent}>
                                <Title level={5} className={styles.toolTitle}>{tool.title}</Title>
                                <Text type="secondary" className={styles.toolDescription}>{tool.description}</Text>
                            </div>
                            <div>
                                <PlusOutlined className={styles.plusIcon} />
                            </div>
                        </div>
                    </div>
                </Col>

            ))}
            </Row>
        </div>
    </div>
  );
};

export default AIToolsSection;
