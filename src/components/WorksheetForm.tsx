import React, { useState } from 'react';
import { Form, Select } from 'antd';
import { Sparkles } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import {
  setField,
  setNumberOfQuestions,
} from '../store/slices/worksheetSlice';
import { useQuestionTypes } from '../hooks/useCurriculumGrade';
import { useGenerateWorksheet } from '../hooks/useGenerateWorksheet';

import CustomButton from './CustomButton';
import CurriculumGradeSelector from './CurriculumGradeSelector';
import SectionHeader from './SectionHeader';

import { SettingOutlined } from '@ant-design/icons';
import styles from '../styles/custom/worksheetForm.module.less';
import NumberOfQuestionsSelector from './NumberOfQuestionsSelector';

const { Option } = Select;

const WorksheetForm = () => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const [selectedCurriculumName, setSelectedCurriculumName] = useState('');
  const [selectedQuestionTypes, setSelectedQuestionTypes] = useState<string[]>([]);

  const {
    curriculum,
    stateBoardState,
    grade,
    subject,
    numberOfQuestions,
    boardId,
    topic,
    files,
    inputMethod,
  } = useSelector((state: RootState) => state.worksheet);

  const { questionTypes } = useQuestionTypes(boardId);
  const { generateWorksheet, submitting } = useGenerateWorksheet();

  const handleQuestionTypeChange = (value: string[]) => {
    setSelectedQuestionTypes(value);
    dispatch(setField({ key: 'customizations', value }));
  };

  const handleQuestionCountChange = (value: string) => {
    dispatch(setNumberOfQuestions(value));
  };

  const handleGenerateWorksheet = async () => {
    try {
      await form.validateFields();

      const worksheetPayload = {
        curriculum,
        stateBoardState,
        grade,
        subject,
        numberOfQuestions,
        boardId,
        topic,
        files,
        inputMethod,
      };

      await generateWorksheet({
        worksheet: worksheetPayload,
        selectedOptions: selectedQuestionTypes,
      });
    } catch (err) {
      // Validation handled by AntD
    }
  };

  return (
    <>
      <SectionHeader
        title={
          <>
            <SettingOutlined className={styles.sectionIcon} />
            Worksheet Configuration
          </>
        }
        subtitle="Configure the details for your AI-generated worksheet"
      />

      <Form
        layout="vertical"
        requiredMark={false}
        onFinish={handleGenerateWorksheet}
        form={form}
      >
        <CurriculumGradeSelector
          curriculum={curriculum}
          stateBoardState={stateBoardState}
          grade={grade}
          subject={subject}
          onCurriculumNameChange={setSelectedCurriculumName}
          form={form}
        />

        <Form.Item
          label="Question Types"
          name="questionTypes"
          rules={[{ required: true, message: 'Please select at least one type' }]}
        >
          <Select
            mode="multiple"
            placeholder="Select question types"
            className={styles.input}
            onChange={handleQuestionTypeChange}
            value={selectedQuestionTypes}
          >
            {questionTypes.map((type) => (
              <Option key={type} value={type}>
                {type}
              </Option>
            ))}
          </Select>
        </Form.Item>

        <NumberOfQuestionsSelector />

        <Form.Item className={styles.fullWidth}>
          <CustomButton
            text={submitting ? 'Generating...' : 'Generate AI Worksheet'}
            prefixIcon={<Sparkles size={22} className={styles.btnIcon} />}
            type="primary"
            htmlType="submit"
            block
            className={styles.generateBtn}
            disabled={submitting}
            loading={submitting}
          />
        </Form.Item>
      </Form>
    </>
  );
};

export default WorksheetForm;
