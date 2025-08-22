import React, { useState, useEffect } from 'react';
import { Card, Typography, Row, Col, Descriptions, Tag, Space, Button } from 'antd';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import { useNavigate, useLocation } from 'react-router-dom';
import StepIndicator from '../components/StepIndicator';
import StepNavigation from '../components/StepNavigation';
import Step1 from '../components/Step1';
import Step2 from '../components/Step2';
import Step3QuestionConfiguration from '../components/Step3QuestionConfiguration';
import CustomButton from '../components/CustomButton';
import { ArrowLeftOutlined, ArrowRightOutlined, CheckCircleOutlined } from '@ant-design/icons';
import styles from '../styles/custom/newWorksheetPage.module.less';
import Step4 from '../components/Step4';
import PageHeader from '../components/PageHeader';

const { Title, Text } = Typography;

const NewWorksheetPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const worksheet = useSelector((state: RootState) => state.worksheet);
  
  // Get current step from URL path
  const getCurrentStepFromPath = () => {
    const path = location.pathname;
    if (path.includes('/step1')) return 0;
    if (path.includes('/step2')) return 1;
    if (path.includes('/step3')) return 2;
    if (path.includes('/step4')) return 3;
    return 0; // default to step 1
  };

  // Redirect to step1 if accessing base route
  useEffect(() => {
    if (location.pathname === '/worksheet') {
      navigate('/worksheet/step1', { replace: true });
    }
  }, [location.pathname, navigate]);

  const [currentStep, setCurrentStep] = useState(getCurrentStepFromPath());
  const [maxStepReached, setMaxStepReached] = useState(getCurrentStepFromPath());

  // Update step when URL changes
  useEffect(() => {
    const newStep = getCurrentStepFromPath();
    setCurrentStep(newStep);
    setMaxStepReached((prevMax) => Math.max(prevMax, newStep));
  }, [location.pathname]);

  const goToStep = (step: number) => {
    const stepRoutes = ['/worksheet/step1', '/worksheet/step2', '/worksheet/step3', '/worksheet/step4'];
    navigate(stepRoutes[step]);
  };

  const goNext = () => {
    const nextStep = currentStep + 1;
    if (nextStep <= 3) {
      goToStep(nextStep);
    }
  };

  const goBack = () => {
    const prevStep = currentStep - 1;
    if (prevStep >= 0) {
      goToStep(prevStep);
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return <Step1 onNext={goNext} onBack={goBack} />;
      case 1:
        return <Step2 onNext={goNext} onBack={goBack} />;
      case 2:
        return <Step3QuestionConfiguration onNext={goNext} onBack={goBack} />;
      case 3:
        return <Step4 onBack={goBack} />;
      default:
        return null;
    }
  };

  return (<>
    <PageHeader />
    <div className={styles.newWorksheet}>
      <div className={styles.container}>
        <div className={styles.header}>
          <Title level={2} style={{fontWeight: 700}}>Create New Worksheet</Title>
          <Text type="secondary" style={{color: '#888', fontSize: 16}}>Follow the steps below to generate your AI-powered worksheet</Text>
        </div>

        <StepIndicator currentStep={currentStep} maxStepReached={maxStepReached} />
        
        <div className={styles.content}>
          <div className={styles.mainContent}>
            {renderStepContent()}
          </div>    
        </div>
      </div>
    </div>
  </>
  );
};

// Step 4: Worksheet Summary Component
interface WorksheetSummaryStepProps {
  onBack: () => void;
  onGenerate: () => void;
}

const WorksheetSummaryStep: React.FC<WorksheetSummaryStepProps> = ({ onBack, onGenerate }) => {
  const worksheet = useSelector((state: RootState) => state.worksheet);

  const getInputMethodLabel = (method: string | null) => {
    switch (method) {
      case 'upload': return 'File Upload';
      case 'type': return 'Manual Input';
      case 'sample': return 'Sample Content';
      default: return 'Not Selected';
    }
  };

  const getCurriculumLabel = (curriculum: string) => {
    if (curriculum === 'state') return 'State Board';
    return curriculum;
  };

  return (
    <Card className={styles.summaryCard}>
      <div className={styles.summaryHeader}>
        <Title level={3}>
          <CheckCircleOutlined style={{ color: '#52c41a', marginRight: 8 }} />
          Worksheet Summary
        </Title>
        <Text type="secondary">
          Review your selections before generating the worksheet
        </Text>
      </div>

      <Row gutter={[24, 24]}>
        <Col xs={24} lg={16}>
          <Descriptions 
            title="Configuration Details" 
            bordered 
            column={{ xs: 1, sm: 2, md: 3 }}
            className={styles.descriptions}
          >
            <Descriptions.Item label="Input Method">
              <Tag color="blue">{getInputMethodLabel(worksheet.inputMethod)}</Tag>
            </Descriptions.Item>
            
            <Descriptions.Item label="Curriculum">
              <Tag color="green">{getCurriculumLabel(worksheet.curriculum)}</Tag>
            </Descriptions.Item>
            
            {worksheet.curriculum === 'state' && worksheet.stateBoardState && (
              <Descriptions.Item label="State">
                <Tag color="purple">{worksheet.stateBoardState}</Tag>
              </Descriptions.Item>
            )}
            
            <Descriptions.Item label="Grade">
              <Tag color="orange">{worksheet.gradeName || worksheet.grade}</Tag>
            </Descriptions.Item>
            
            <Descriptions.Item label="Subject">
              <Tag color="cyan">{worksheet.subjectName || worksheet.subject}</Tag>
            </Descriptions.Item>
            
            <Descriptions.Item label="Number of Questions">
              <Tag color="magenta">{worksheet.numberOfQuestions}</Tag>
            </Descriptions.Item>
            
            <Descriptions.Item label="Question Category">
              <Tag color="geekblue">{worksheet.questionCategory || 'Not Selected'}</Tag>
            </Descriptions.Item>
            
            <Descriptions.Item label="Question Types">
              {worksheet.questionTypes && worksheet.questionTypes.length > 0 ? (
                <Space wrap>
                  {worksheet.questionTypes.map((type, index) => (
                    <Tag key={index} color="volcano">{type}</Tag>
                  ))}
                </Space>
              ) : (
                <Tag color="default">Not Selected</Tag>
              )}
            </Descriptions.Item>

            {worksheet.additionalFeatures && worksheet.additionalFeatures.length > 0 && (
              <Descriptions.Item label="Additional Features">
                <Space wrap>
                  {worksheet.additionalFeatures.map((feature, index) => {
                    const featureLabels: { [key: string]: string } = {
                      answerKey: 'Answer Key',
                      brainTeasers: 'Brain Teasers',
                      funFacts: 'Fun Facts',
                      realApplications: 'Real Applications'
                    };
                    return (
                      <Tag key={index} color="gold">{featureLabels[feature] || feature}</Tag>
                    );
                  })}
                </Space>
              </Descriptions.Item>
            )}

            {worksheet.inputMethod === 'type' && worksheet.topic && (
              <Descriptions.Item label="Topic" span={2}>
                <Text>{worksheet.topic}</Text>
              </Descriptions.Item>
            )}

            {worksheet.inputMethod === 'upload' && worksheet.files.length > 0 && (
              <Descriptions.Item label="Uploaded Files" span={2}>
                <Space direction="vertical" style={{ width: '100%' }}>
                  {worksheet.files.map((file, index) => (
                    <Text key={index} code>{file.name}</Text>
                  ))}
                </Space>
              </Descriptions.Item>
            )}

            {worksheet.customizations.length > 0 && (
              <Descriptions.Item label="Customizations" span={2}>
                <Space wrap>
                  {worksheet.customizations.map((customization, index) => (
                    <Tag key={index} color="gold">{customization}</Tag>
                  ))}
                </Space>
              </Descriptions.Item>
            )}
          </Descriptions>
        </Col>
      </Row>

      <div className={styles.navigationButtons}>
        <CustomButton
          text="Previous"
          type="default"
          prefixIcon={<ArrowLeftOutlined />}
          onClick={onBack}
        />
        <CustomButton
          text="Generate Worksheet"
          type="primary"
          postfixIcon={<ArrowRightOutlined />}
          onClick={onGenerate}
          className={styles.generateButton}
        />
      </div>
    </Card>
  );
};

export default NewWorksheetPage;
