import React, { useState } from 'react';
import { Card, Typography, Row, Col, Collapse, Space, Upload, Table, Modal, Image, message, Tag } from 'antd';
import { UploadOutlined, EditOutlined, FileTextOutlined, InfoCircleOutlined, ArrowLeftOutlined, ArrowRightOutlined, FileDoneOutlined, CheckCircleOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { setInputMethod, setTopic, setFiles } from '../store/slices/worksheetSlice';
import styles from '../styles/custom/Step1.module.less';
import CustomButton from './CustomButton';
import { useFileUploadHandler, FileMeta } from '../hooks/useFileUploadHandler';
import FileActions from './FileActions';
import InfoSection from './InfoSection';
import TextArea from 'antd/es/input/TextArea';
import { useGenerateWorksheet } from '../hooks/useGenerateWorksheet';

const { Title, Text, Paragraph } = Typography;
const { Panel } = Collapse;

interface Step1Props {
  onNext?: () => void;
  onBack?: () => void;
}

const Step1: React.FC<Step1Props> = ({ onNext, onBack }) => {
  const dispatch = useDispatch();
  const selected = useSelector((state: RootState) => state.worksheet.inputMethod);
  const topic = useSelector((state: RootState) => state.worksheet.topic);
  const worksheet = useSelector((state: RootState) => state.worksheet);

  const { fileList, handleFileChange, handleRemove } = useFileUploadHandler();
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const { generateWorksheet, submitting } = useGenerateWorksheet();

  const handleSelect = (type: 'upload' | 'type' | 'sample') => {
    dispatch(setInputMethod(type));
  };

  const isSelected = (type: 'upload' | 'type' | 'sample') => selected === type;

  let errorShown = false;

    const beforeUpload = (_file: File, newFiles: File[]) => {
        const totalFiles = fileList.length + newFiles.length;

        if (totalFiles > 5) {
            if (!errorShown) {
                message.error('You can only upload a maximum of 5 files.');
                errorShown = true;
                setTimeout(() => {
                    errorShown = false; 
                }, 1000);
            }
            return Upload.LIST_IGNORE; 
        }
        return true;
    };

  const handleGenerateFromSample = async () => {
    if (fileList.length === 0) {
      message.error('Please upload a sample worksheet first');
      return;
    }
    
    // Update the worksheet state with the uploaded files
    dispatch(setFiles(fileList));
    
    // Generate worksheet directly from sample
    await generateWorksheet({ 
      worksheet: { 
        inputMethod: worksheet.inputMethod || undefined,
        curriculum: worksheet.curriculum,
        boardId: worksheet.boardId ? Number(worksheet.boardId) : undefined,
        grade: worksheet.grade ? Number(worksheet.grade) : undefined,
        gradeName: worksheet.gradeName,
        subject: worksheet.subject,
        subjectName: worksheet.subjectName,
        numberOfQuestions: worksheet.numberOfQuestions ? Number(worksheet.numberOfQuestions) : undefined,
        topic: worksheet.topic,
        stateBoardState: worksheet.stateBoardState,
        questionCategory: worksheet.questionCategory,
        additionalFeatures: worksheet.additionalFeatures,
        difficultyLevel: worksheet.difficultyLevel,
        files: fileList as any // Cast to avoid type issues
      }, 
      selectedOptions: [] 
    });
  };

  const columns = [
    {
      title: <div className={styles.columnFileName}>File Name</div>,
      dataIndex: 'name',
      key: 'name',
      render: (text: string) => <div className={styles.columnFileName}>{text}</div>,
    },
    {
      title: <div className={styles.columnActions}>Actions</div>,
      key: 'actions',
      align: 'right' as const,
      render: (_: any, record: FileMeta) => {
        const isImage = record.type?.startsWith('image/');
        return (
          <FileActions
            isImage={isImage}
            url={record.url}
            onPreview={() => setPreviewImage(record.url || '')}
            onDelete={() => handleRemove(record.uid)}
          />
        );
      },
    },
  ];

  return (
    <div className={styles.inputMethodWrapper}>
        {/* Title */}
        <div className={styles.titleWrapper}>
            <Title level={3}>Input Source</Title>
            <Text className={styles.subtitle}>
                Choose your preferred input method
            </Text>
        </div>

        {/* Option Cards */}
        <Row gutter={[16, 16]} className={styles.optionCardsRow}>
            <Col xs={24} sm={12} md={8}>
                <Card
                    hoverable
                    className={`${styles.optionCard} ${isSelected('upload') ? styles.selectedCard : ''}`}
                    onClick={() => handleSelect('upload')}
                >
                    <UploadOutlined className={`${styles.iconLarge} ${styles.upload}`} />
                    <Title level={4}>Upload Image</Title>
                    <Text>Take a photo of your textbook or worksheet</Text>
                    <Tag color='blue' className={styles.combo3}>Perfect match to your curriculum</Tag>

                    {isSelected('upload') && (
                        <div>
                            <CheckCircleOutlined style={{fontSize: 20, marginTop: 16, color: 'purple'}}/>
                        </div>
                    )}
                </Card>
            </Col>

            <Col xs={24} sm={12} md={8}>
                <Card
                    hoverable
                    className={`${styles.optionCard} ${isSelected('type') ? styles.selectedCard : ''}`}
                    onClick={() => handleSelect('type')}
                >
                    <EditOutlined className={`${styles.iconLarge} ${styles.type}`} />
                    <Title level={4}>Type Topic</Title>
                    <Text>Simply type what you want to practice</Text><br />
                    <Tag color='green' className={styles.combo3}>Quick and easy</Tag>
                    {isSelected('type') && (
                        <div>
                            <CheckCircleOutlined style={{fontSize: 20, marginTop: 16, color: 'purple'}}/>
                        </div>
                    )}
                </Card>
            </Col>

            <Col xs={24} sm={12} md={8}>
                <Card
                    hoverable
                    className={`${styles.optionCard} ${isSelected('sample') ? styles.selectedCard : ''}`}
                    onClick={() => handleSelect('sample')}
                >
                    <FileTextOutlined className={`${styles.iconLarge} ${styles.sample}`} />
                    <Title level={4}>Sample Worksheet</Title>
                    <Text>Upload a worksheet for similar questions</Text>
                    <Tag color='purple' className={styles.combo3}>Same style, different content</Tag>
                    {isSelected('sample') && (
                        <div>
                            <CheckCircleOutlined style={{fontSize: 20, marginTop: 16, color: 'purple'}}/>
                        </div>
                    )}
                </Card>
            </Col>
        </Row>

        {/* Upload section */}
        {isSelected('upload') && (
            <>
            <Tag color='purple' className={styles.myBox}><CheckCircleOutlined style={{marginRight: 8}}/>Great choice! Now upload your file below:</Tag>
                <Upload.Dragger
                    multiple
                    accept=".jpg,.jpeg,.png,.gif,.pdf"
                    fileList={[]} 
                    beforeUpload={beforeUpload}
                    onChange={handleFileChange}
                    showUploadList={false}
                    action="#"
                    customRequest={() => {}}
                    style={{
                    marginBottom: 24,
                    background: '#ffffff',
                    padding: '24px 0',
                    borderRadius: '8px',
                    border: '2px dashed #c6c6c6ff',
                    }}
                >
                    <p>
                        <UploadOutlined className={styles.uploadIcon} />
                    </p>
                    <p className={styles.uploadInstructions}>
                        Drag and drop image or PDF files here, or click to browse
                    </p>
                    <p className={styles.uploadNote}>
                        Supports JPG, PNG, GIF, PDF (Max PDF size: 10MB, Max 5 files)
                    </p>
                    <CustomButton text="Choose Files" className={styles.generateButton} />
                </Upload.Dragger>
                {/* Info Section */}
                <div className={styles.infoSectionWrapper}>
                    <InfoSection
                        title="Works great for:"
                        titleColor="darkgreen"
                        text="When every school follows a different syllabus or textbook, exercises in books are limited and your child needs more practice"
                        textColor="green"
                        className={styles.greateWork}
                    />
                    <InfoSection
                        title="Pro tip:"
                        titleColor="darkblue"
                        text="Simply upload a photo of the topic, and we'll generate a worksheet with fresh questions based on that content"
                        textColor="rgb(29, 78, 216)"
                        className={styles.proTip}
                    />
                </div>

                {fileList.length > 0 && (
                    <div className={styles.tableWrapper}>
                        <Typography.Title level={5}>Uploaded Files:</Typography.Title>
                        <div className={styles.tableContainer}>
                            <Table
                                dataSource={fileList}
                                columns={columns}
                                pagination={false}
                                rowKey="uid"
                                size="small"
                                scroll={{ y: 200 }}
                            />
                        </div>
                    </div>
                )}

                <Modal
                    open={!!previewImage}
                    footer={null}
                    onCancel={() => setPreviewImage(null)}
                    centered
                    width={600}
                >
                    {previewImage && (
                        <Image
                            src={previewImage}
                            alt="Preview"
                            className={styles.modalImage}
                        />
                    )}
                </Modal>
            </>
            
        )}

        {isSelected('type') && (<>
            <Tag color='purple' className={styles.myBox}><CheckCircleOutlined style={{marginRight: 8}}/>Great choice! Now Type your Topic below:</Tag>
            {/* Type Topic */}
            <div className={styles.typeTopic}>
                <Title level={4}>What do you want to practice?</Title>
                <TextArea 
                    placeholder="e.g., Fractions, Multiplication tables, or English grammar" 
                    className={styles.textAreaWrapper}
                    value={topic}
                    onChange={(e) => dispatch(setTopic(e.target.value))}
                />
            </div>
            <div className={styles.infoSectionWrapper}>
                <InfoSection
                    title="Works great for:"
                    titleColor="darkgreen"
                    text="When you know the specific topic or concept you want to focus on and want quick worksheet generation"
                    textColor="green"
                    className={styles.greateWork}
                />
                <InfoSection
                    title="Pro tip:"
                    titleColor="darkblue"
                    text="Be specific about the topic (e.g., 'Fractions - Addition and Subtraction' instead of just 'Math')"
                    textColor="rgb(29, 78, 216)"
                    className={styles.proTip}
                />
            </div>
        </>)}

        {/* Sample Worksheet Upload Section */}
        {isSelected('sample') && (
            <>
                <Tag color="purple" className={styles.myBox}><CheckCircleOutlined style={{marginRight: 8}}/>
                   Great choice! Now upload your sample worksheet below:
                </Tag>

                <Upload.Dragger
                    multiple
                    accept=".jpg,.jpeg,.png,.gif,.pdf"
                    fileList={[]} 
                    beforeUpload={beforeUpload}
                    onChange={handleFileChange}
                    showUploadList={false}
                    action="#"
                    customRequest={() => {}}
                    style={{
                        marginBottom: 24,
                        background: '#ffffff',
                        padding: '24px 0',
                        borderRadius: '8px',
                        border: '2px dashed #c6c6c6ff',
                    }}
                >
                    <p>
                        <FileTextOutlined className={styles.uploadIcon} />
                    </p>
                    <div style={{lineHeight: 1, marginBottom: '1.5rem'}}>
                        <p className={styles.uploadInstructions}>
                            Upload Sample Worksheet 
                        </p>
                        <p className={styles.uploadNote}>
                            We'll create new questions in the same style
                        </p>
                    </div>
                    <CustomButton text="Choose Files" className={styles.generateButton} />
                </Upload.Dragger>

                {/* Info Section for Sample Upload */}
                <div className={styles.infoSectionWrapper}>
                    <InfoSection
                        title="Works great for:"
                        titleColor="darkgreen"
                        text="Maths (sums, word problems), English Grammar (tenses, articles), Hindi Grammar (vachan, ling)"
                        textColor="green"
                        className={styles.greateWork}
                    />
                    <InfoSection
                        title="Pro tip:"
                        titleColor="red"
                        text="Full textbook chapters like Science or Social Studies"
                        textColor="rgba(216, 29, 29, 1)"
                        className={styles.proTipRed}
                    />
                </div>

                {/* File List for Sample Upload */}
                {fileList.length > 0 && (
                    <div className={styles.tableWrapper}>
                        <Typography.Title level={5}>Uploaded Sample Worksheet:</Typography.Title>
                        <div className={styles.tableContainer}>
                            <Table
                                dataSource={fileList}
                                columns={columns}
                                pagination={false}
                                rowKey="uid"
                                size="small"
                                scroll={{ y: 200 }}
                            />
                        </div>
                    </div>
                )}

                {/* Generate Worksheet Button for Sample Upload */}
                {fileList.length > 0 && (
                    <div className={styles.generateButtonWrapper}>
                        <CustomButton
                            text={submitting ? "Generating..." : "Generate Worksheet"}
                            type="primary"
                            postfixIcon={submitting ? undefined : <FileDoneOutlined />}
                            onClick={handleGenerateFromSample}
                            disabled={submitting}
                            className={styles.generateButton}
                        />
                    </div>
                )}

                <Modal
                    open={!!previewImage}
                    footer={null}
                    onCancel={() => setPreviewImage(null)}
                    centered
                    width={600}
                >
                    {previewImage && (
                        <Image
                            src={previewImage}
                            alt="Preview"
                            className={styles.modalImage}
                        />
                    )}
                </Modal>
            </>
        )}

        {/* Tips */}
        <Collapse defaultActiveKey={['1']} bordered={false} className={styles.tipsCollapse}>
            <Panel
                header={
                    <Space>
                    <InfoCircleOutlined />
                    <Text strong>Tips for Best Results</Text>
                    </Space>
                }
                key="1"
            >
                <div className={styles.tipBoxBlue}>
                    <Text strong className={styles.tipTextBlue}>Topic-Specific Uploads Work Best</Text>
                    <div className={styles.tipContent}>Upload worksheets focused on a single topic or chapter (like "Nouns", "Plants", "Fractions"). Avoid mixing topics.</div>
                </div>
                <div className={styles.tipBoxYellow}>
                    <Text strong className={styles.tipTextYellow}>Graphs, Tables & Complex Layouts Not Supported</Text>
                    <div className={styles.tipContentYellow}>Charts, graphs, or table-based questions aren't supported yet. Use clear, text-only formats.</div>
                </div>
                <div className={styles.tipBoxPurple}>
                    <Text strong className={styles.tipTextPurple}>Upload Clear Images or PDFs Only</Text>
                    <div className={styles.tipContent}>Ensure readability. Limit: 5 images or 3 PDF pages (10 MB max).</div>
                </div>
            </Panel>
        </Collapse>

        {/* Navigation - Hide Next button for sample upload since we have Generate Worksheet button */}
        <div className={styles.navigationButtons}>
            <CustomButton
                text="Previous"
                type="default"
                prefixIcon={<ArrowLeftOutlined />}
                onClick={onBack}
            />

            {!isSelected('sample') && (
                <CustomButton
                    text="Next"
                    type="primary"
                    postfixIcon={<ArrowRightOutlined />}
                    disabled={
                        (isSelected('upload') && fileList.length === 0) ||
                        (isSelected('type') && topic.trim().length === 0) ||
                        !selected
                    }
                    className={styles.next}
                    onClick={onNext}
                />
            )}
        </div>
    </div>
  );
};

export default Step1;
