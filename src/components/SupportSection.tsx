import React from 'react';
import { Row, Col, Typography, Card } from 'antd';
import {
  MailOutlined,
  EnvironmentOutlined,
  WhatsAppOutlined,
} from '@ant-design/icons';
import Note from './Note';
import { supportData } from '../statics/supportData';
import styles from '../styles/custom/contactPage.module.less';

const { Text, Paragraph } = Typography;

const getIcon = (type: string) => {
  switch (type) {
    case 'email':
      return <MailOutlined className={styles.supportIcon} />;
    case 'whatsapp':
      return <WhatsAppOutlined className={styles.supportIcon} />;
    case 'location':
      return <EnvironmentOutlined className={styles.supportIcon} />;
    default:
      return null;
  }
};

const SupportSection: React.FC = () => {
  return (
    <div className={styles.supportSection}>
      <Row gutter={[0, 24]} justify="center">
        {supportData.map((item, index) => (
          <Col xs={24} sm={24} md={22} lg={20} key={index} style={{ display: 'flex', justifyContent: 'center' }}>
            <div style={{ width: '100%', maxWidth: 700 }}>
              <Card hoverable className={styles.supportCard}>
                <div className={styles.supportCardContent}>
                  <div className={styles.supportIconWrapper}>
                    {getIcon(item.type)}
                  </div>
                  <div className={styles.supportTextWrapper}>
                    <Text className={styles.supportTitle}>{item.title}</Text>
                    {item.description.map((desc, i) => (
                      <Text className={styles.supportDescription} key={i}>
                        {desc}
                      </Text>
                    ))}
                  </div>
                </div>
              </Card>

            </div>
          </Col>

        ))}
      </Row>

      <Note />
    </div>
  );
};

export default SupportSection;
