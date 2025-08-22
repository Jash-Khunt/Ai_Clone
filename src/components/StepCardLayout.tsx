import React from 'react';
import { Typography, Button } from 'antd';
import styles from '../styles/custom/registraionPage.module.less'; // adjust the path accordingly

const { Title } = Typography;

interface StepCardLayoutProps {
  title: string;
  steps: number[];
  currentStep: number;
  icon: React.ReactNode;
  children: React.ReactNode;
  onBack?: () => void;
}

const StepCardLayout: React.FC<StepCardLayoutProps> = ({
  title,
  steps,
  currentStep,
  icon,
  children,
  onBack,
}) => {
  return (
    <div className={styles.stepCardContainer}>
      <div className={styles.iconTitleWrapper}>
        <div className={styles.iconCircle}>{icon}</div>
        <Title level={2} className={styles.stepTitle}>
          {title}
        </Title>
        <div>
          {steps.map((step) => (
            <Button
              key={step}
              shape="circle"
              size="small"
              type={step <= currentStep ? 'primary' : 'default'}
              className={styles.stepIndicator}
            >
              {step}
            </Button>
          ))}
        </div>
      </div>
      {children}
    </div>
  );
};

export default StepCardLayout;
