import { useDispatch, useSelector } from 'react-redux';
import { Card, Typography, Input } from 'antd';
import { RootState } from '../store/index';
import { setTopic } from '../store/slices/worksheetSlice';
import StepButtonGroup from './StepButtonGroup';
import styles from '../styles/custom/worksheetPage.module.less';

const { Title, Text } = Typography;
const { TextArea } = Input;

interface Props {
  onNext: () => void;
  onBack: () => void;
}

const Step3TypeTopic: React.FC<Props> = ({ onNext, onBack }) => {
  const dispatch = useDispatch();
  const topic = useSelector((state: RootState) => state.worksheet.topic);

  const isDisabled = topic.trim().length === 0;

  return (
    <Card className={styles.cardContainer}>
      <div className={styles.centeredHeader}>
        <Title level={3}>Add Your Content</Title>
        <Text type="secondary">Enter the topic or learning concept</Text>
      </div>

      <div className={styles.textAreaWrapper}>
        <label className={styles.label}>Learning Topic</label>
        <TextArea
          placeholder="Enter the topic or concept you want to create a worksheet for..."
          rows={4}
          value={topic}
          onChange={(e) => dispatch(setTopic(e.target.value))}
        />
      </div>

      <StepButtonGroup
        onBack={onBack}
        onNext={onNext}
        disabled={isDisabled}
      />
    </Card>
  );
};

export default Step3TypeTopic;
