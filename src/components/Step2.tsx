import React from 'react';
import { Card, Typography } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { getCountryCode } from '../utils/country';
import styles from '../styles/custom/Step2.module.less';
import CurriculumGradeSelector from './CurriculumGradeSelector';
import CustomButton from './CustomButton';
import { ArrowLeftOutlined, ArrowRightOutlined, BookOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;

interface Props {
  onNext: () => void;
  onBack: () => void;
}

const Step2CurriculumGrade: React.FC<Props> = ({ onNext, onBack }) => {
  const dispatch = useDispatch();
  const {
    curriculum,
    grade,
    subject,
    stateBoardState,
  } = useSelector((state: RootState) => state.worksheet);

  const [selectedCurriculumName, setSelectedCurriculumName] = React.useState('');
  const countryCode = getCountryCode();
  const showState = selectedCurriculumName === 'State Board';

  const isDisabled =
    !curriculum ||
    !grade ||
    !subject ||
    (showState && !stateBoardState);

  return (
    <Card className={styles.wrapper}>
      <div className={styles.step2}>
        <Title level={3}>Select Curriculum, Grade & Questions</Title>
        <Text type="secondary">
          Choose educational framework, level, subject, number of questions, and state (if applicable)
        </Text>
      </div>

      <div className={styles.mainurriclum}>
        <CurriculumGradeSelector
          curriculum={curriculum}
          stateBoardState={stateBoardState}
          grade={grade}
          subject={subject}
          onCurriculumNameChange={setSelectedCurriculumName}
        />
      </div>

      <div className={styles.tipBoxYellow}>
        <Title level={5} style={{ color: '#a74a10ff' }}><BookOutlined  style={{marginRight: '0.5rem'}}/>Subject Information</Title>
        <Text style={{ lineHeight: 1.5, color: '#92400E' }}>
          <div style={{ color: '#92400E', fontWeight: 700 }}>Selected:</div>
          This information helps us generate age-appropriate content aligned with your curriculum standards.
        </Text>
      </div>


      {/* Navigation */}
      <div className={styles.navigationButtons}>
        <CustomButton
          text="Previous"
          type="default"
          prefixIcon={<ArrowLeftOutlined />}
          onClick={onBack}
        />
        <CustomButton
          text="Next"
          type="primary"
          postfixIcon={<ArrowRightOutlined />}
          className={styles.next}
          onClick={onNext}
          disabled={isDisabled} 
        />
      </div>
    </Card>
  );
};

export default Step2CurriculumGrade;
