import { Button, Col, Row } from 'antd';
import React from 'react';
import styles from '../styles/custom/worksheetPage.module.less';

interface Props {
  onBack: () => void;
  onNext: () => void;
  nextLabel?: string;
  backLabel?: string;
  disabled?: boolean;
  nextIcon?: React.ReactNode;
  loading?: boolean;
}

const StepButtonGroup: React.FC<Props> = ({
  onBack,
  onNext,
  nextLabel = 'Continue',
  backLabel = 'Back',
  disabled = false,
  nextIcon,
  loading = false,
}) => {
  return (
    <Row justify="space-between" style={{ marginTop: '2rem' }}>
      <Col>
        <Button style={{height: '2.5rem'}} onClick={onBack}>{backLabel}</Button>
      </Col>
      <Col flex="auto">
        <Button
          block
          size="large"
          className={styles.gradientButton}
          disabled={disabled}
          onClick={onNext}
          icon={nextIcon}
          style={{ width: '98%', marginLeft: 12, height: '2.5rem' }}
          loading={loading}
        >
          {nextLabel}
        </Button>
      </Col>
    </Row>
  );
};

export default StepButtonGroup;
