import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import { Card, Row, Col, Checkbox, Typography, Spin, Alert, Table, Image } from 'antd';
import { FileDoneOutlined } from '@ant-design/icons';
import StepButtonGroup from './StepButtonGroup';
import { addOns } from '../statics/worksheetOptions';
import styles from '../styles/custom/worksheetPage.module.less';
import { useQuestionTypes } from '../hooks/useCurriculumGrade';
import { useGenerateWorksheet } from '../hooks/useGenerateWorksheet';

const { Title, Text } = Typography;

interface Props {
  onNext: () => void;
  onBack: () => void;
}

const Step4CustomizeWorksheet: React.FC<Props> = ({ onNext, onBack }) => {
  const worksheet = useSelector((state: RootState) => state.worksheet);

  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  //@ts-ignore
  const { questionTypes, loadingQuestionTypes, boardError } = useQuestionTypes(worksheet.boardId?.toString());
  const { generateWorksheet, submitting } = useGenerateWorksheet();

  const handleCheckboxChange = (checkedValues: string[]) => {
    setSelectedOptions(checkedValues);
  };

  const handleNext = async () => {
    generateWorksheet({ worksheet, selectedOptions });
  };

  const isDisabled = selectedOptions.length === 0 || !!boardError || submitting;

  const fileColumns = [
    {
      title: 'Preview',
      dataIndex: 'originFileObj',
      key: 'preview',
      render: (file: File | undefined) => {
        if (file && file.type.startsWith('image/')) {
          const url = URL.createObjectURL(file);
          return <Image src={url} width={100} alt="preview" onLoad={() => URL.revokeObjectURL(url)} />;
        }
        return <Text type="secondary">No Preview</Text>;
      },
    },
    {
      title: 'File Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Type',
      dataIndex: 'type',
      key: 'type',
    },
  ];

  return (
    <Card className={styles.cardContainer}>
      <div className={styles.centeredHeader}>
        <Title level={3}>Customize Your Worksheet</Title>
        <Text type="secondary">Choose question types and additional features</Text>
      </div>

      {boardError && (
        <Alert
          message="Board ID Error"
          description={boardError}
          type="error"
          showIcon
          style={{ marginBottom: 20 }}
        />
      )}

      <Row gutter={[32, 16]}>
        <Col span={12}>
          <Title level={5} className={styles.sectionTitle}>Question Types</Title>
          {loadingQuestionTypes ? (
            <Spin />
          ) : questionTypes.length > 0 ? (
            <Checkbox.Group
              className={styles.checkboxGroup}
              options={questionTypes}
              value={selectedOptions.filter(val => questionTypes.includes(val))}
              onChange={(vals) =>
                handleCheckboxChange([
                  ...vals,
                  ...selectedOptions.filter(o => addOns.includes(o)),
                ])
              }
            />
          ) : (
            <Text type="danger">No question types found.</Text>
          )}
        </Col>

        <Col span={12}>
          <Title level={5} className={styles.sectionTitle}>Add-ons</Title>
          <Checkbox.Group
            className={styles.checkboxGroup}
            options={addOns}
            value={selectedOptions.filter(val => addOns.includes(val))}
            onChange={(vals) =>
              handleCheckboxChange([
                ...vals,
                ...selectedOptions.filter(o => questionTypes.includes(o)),
              ])
            }
          />
        </Col>
      </Row>

      {worksheet.files?.length > 0 && (
        <div style={{ marginTop: 30 }}>
          <Title level={5} style={{ marginBottom: 16 }}>Selected Files</Title>
          <Table
            dataSource={worksheet.files}
            columns={fileColumns}
            rowKey="uid"
            pagination={false}
            size="small"
          />
        </div>
      )}

      <StepButtonGroup
        onBack={onBack}
        onNext={handleNext}
        nextLabel={submitting ? 'Generating...' : 'Generate Worksheet'}
        nextIcon={<FileDoneOutlined />}
        disabled={isDisabled}
        loading={submitting}
      />
    </Card>
  );
};

export default Step4CustomizeWorksheet;