import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Typography, Row, Col } from 'antd';
import {
  PhoneOutlined,
  CheckCircleTwoTone,
  ArrowLeftOutlined,
} from '@ant-design/icons';
import styles from '../styles/custom/registraionPage.module.less';

const { Title, Text, Paragraph } = Typography;

interface Props {
  userType: 'new' | 'existing';
  onBack?: () => void;
  onComplete?: () => void;
}

const VerificationSuccess: React.FC<Props> = ({ userType, onBack, onComplete }) => {
  const navigate = useNavigate();

  return (
    <Row justify="center">
      <Col>
        {/* Back link on top left */}
        <div
          onClick={onBack}
          className={styles.backLink}
          style={{
            cursor: onBack ? 'pointer' : 'default',
            margin: '26px 0px 16px 18px'
          }}
        >
          <ArrowLeftOutlined style={{ marginRight: 8 }} className={styles.leftIcon} />
          <Text strong>Back to Home</Text>
        </div>

        {/* Success card container */}
        <div className={styles.verificationContainer}>
          {userType === 'new' && (
            <>
              <div className={styles.iconCircle}>
                <PhoneOutlined className={styles.phoneIcon} />
              </div>

              <Title level={2} className={styles.verificationTitle}>
                Verification Successful
              </Title>

              <div className={styles.stepButtons}>
                <Button type="primary" shape="circle" size="small">1</Button>
                <Button
                  type="primary"
                  shape="circle"
                  size="small"
                  className={styles.stepButtonMargin}
                >2</Button>
                <Button type="primary" shape="circle" size="small">3</Button>
              </div>

              <CheckCircleTwoTone twoToneColor="#52c41a" className={styles.successIcon} />

              <Title level={3}>Registration Successful</Title>
              <Paragraph type="secondary" className={styles.verificationParagraph}>
                Verification successful! You're all set to create your first AI-powered worksheet.
                Click 'Get Started' to begin!
              </Paragraph>
            </>
          )}

          <Button
            type="primary"
            block
            size="large"
            className={styles.getStartedButton}
            onClick={() => {
              if (onComplete) {
                onComplete();
              }
              navigate('/demo-page'); 
            }}
          >
            Get Started →
          </Button>
        </div>
      </Col>
    </Row>
  );
};

export default VerificationSuccess;
