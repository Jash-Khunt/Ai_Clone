import styles from '../styles/custom/stepIndicator.module.less';
import { Typography } from 'antd';
import { useNavigate } from 'react-router-dom';

const { Title } = Typography;

interface Props {
  currentStep: number;
  maxStepReached: number;
}

const StepIndicator: React.FC<Props> = ({ currentStep, maxStepReached }) => {
  const navigate = useNavigate();
  
  const steps = [
    { number: 1, label: "Input Source", path: "/worksheet/step1" },
    { number: 2, label: "Subject Info", path: "/worksheet/step2" },
    { number: 3, label: "Customize", path: "/worksheet/step3" },
    { number: 4, label: "Preview & Generate", path: "/worksheet/step4" }
  ];

  const handleStepClick = (stepIndex: number, stepPath: string) => {
    // Only allow navigation to steps that have been reached or are the current step
    if (stepIndex <= maxStepReached) {
      navigate(stepPath);
    }
  };

  return (
    <div className={styles.stepIndicatorWrapper}>
      <div className={styles.stepLine}>
        {steps.map((step, index) => {
          // ✅ Now color only up to currentStep, ignore maxStepReached for coloring
          const isCurrentOrBefore = index <= currentStep;
          const isClickable = index <= maxStepReached;

          return (
            <div className={styles.stepWrapper} key={step.number}>
              <div className={styles.stepContent}>
                <div
                  className={`${styles.stepCircle} ${
                    isCurrentOrBefore ? styles.purple : ''
                  } ${isClickable ? styles.clickable : ''}`}
                  onClick={() => handleStepClick(index, step.path)}
                  title={isClickable ? `Go to ${step.label}` : 'Complete previous steps first'}
                >
                  {step.number}
                </div>
                <div className={styles.stepLabel}>{step.label}</div>
              </div>

              {index < steps.length - 1 && (
                <div
                  className={`${styles.stepConnector} ${
                    index < currentStep ? styles.connectorPurple : ''
                  }`}
                />
              )}
            </div>
          );
        })}
      </div>

      <div className={styles.stepBottomText}>
        <Title level={5}>Step {currentStep + 1} of {steps.length}</Title>
      </div>
    </div>
  );
};

export default StepIndicator;
