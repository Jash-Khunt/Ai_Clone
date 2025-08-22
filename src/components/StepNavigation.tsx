import React from 'react';
import { Card, Typography, Space, Button } from 'antd';
import { useNavigate } from 'react-router-dom';
import { ArrowRightOutlined } from '@ant-design/icons';
import styles from '../styles/custom/stepNavigation.module.less';

const { Title, Text } = Typography;

interface StepNavigationProps {
  currentStep: number;
  maxStepReached: number;
}

const StepNavigation: React.FC<StepNavigationProps> = ({ currentStep, maxStepReached }) => {
  const navigate = useNavigate();

  const steps = [
    { number: 1, label: "Input Source", path: "/worksheet/step1", description: "Choose input method and upload files" },
    { number: 2, label: "Subject Info", path: "/worksheet/step2", description: "Select curriculum, grade, and subject" },
    { number: 3, label: "Customize", path: "/worksheet/step3", description: "Configure questions and features" },
    { number: 4, label: "Preview & Generate", path: "/worksheet/step4", description: "Review and generate worksheet" }
  ];

  const handleStepClick = (stepIndex: number, stepPath: string) => {
    if (stepIndex <= maxStepReached) {
      navigate(stepPath);
    }
  };

  return (
    <Card className={styles.navigationCard}>
      <Title level={4}>Quick Navigation</Title>
      <Text type="secondary">Click on any completed step to navigate directly</Text>
      
      <Space direction="vertical" style={{ width: '100%', marginTop: 16 }}>
        {steps.map((step, index) => {
          const isCompleted = index < currentStep;
          const isCurrent = index === currentStep;
          const isAccessible = index <= maxStepReached;
          
          return (
            <div 
              key={step.number} 
              className={`${styles.stepLink} ${isCompleted ? styles.completed : ''} ${isCurrent ? styles.current : ''} ${isAccessible ? styles.accessible : ''}`}
              onClick={() => handleStepClick(index, step.path)}
            >
              <div className={styles.stepInfo}>
                <div className={styles.stepNumber}>
                  {isCompleted ? '✓' : step.number}
                </div>
                <div className={styles.stepDetails}>
                  <Text strong>{step.label}</Text>
                  <Text type="secondary" className={styles.stepDescription}>
                    {step.description}
                  </Text>
                </div>
              </div>
              {isAccessible && (
                <Button 
                  type="link" 
                  icon={<ArrowRightOutlined />}
                  className={styles.navigateButton}
                >
                  Go to Step {step.number}
                </Button>
              )}
            </div>
          );
        })}
      </Space>
    </Card>
  );
};

export default StepNavigation;
