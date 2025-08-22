import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import { Card, Row, Col, Typography, List, Tag, Divider, Alert } from "antd";
import styles from "../styles/custom/step4.module.less";
import {
  ArrowLeftOutlined,
  ArrowRightOutlined,
  FileDoneOutlined,
} from "@ant-design/icons";
import CustomButton from "./CustomButton";
import { useGenerateWorksheet } from "../hooks/useGenerateWorksheet";

const { Title, Text } = Typography;

interface Step4Props {
  onBack: () => void;
}

// Question type mapping for display
const questionTypeMapping: Record<string, string> = {
  "बहुविकल्पीय प्रश्न (Multiple Choice Questions)": "Multiple Choice",
  "रिक्त स्थान भरो (Fill in the Blanks)": "Fill in the Blanks",
  "सही या गलत (True or False)": "True/False",
  "मिलान कीजिए (Match the Following)": "Match the Following",
  "एक शब्द में उत्तर (One-word Answer)": "One-word Answer",
  "Multiple Choice Questions": "Multiple Choice",
  "Fill in the Blanks": "Fill in the Blanks",
  "True or False": "True/False",
  "Match the Following": "Match the Following",
  "One-word Answer": "One-word Answer",
};

const features = [
  { key: "answerKey", title: "Answer Key" },
  { key: "brainTeasers", title: "Brain Teasers" },
  { key: "funFacts", title: "Fun Facts" },
  { key: "illustrations", title: "Illustrations" },
];

const Step4: React.FC<Step4Props> = ({ onBack }) => {
  const worksheet = useSelector((state: RootState) => state.worksheet);
  const { generateWorksheet, submitting } = useGenerateWorksheet();

  const handleGenerate = async () => {
    // Use the question types from the worksheet state
    const selectedOptions = worksheet.questionTypes || [];
    //@ts-ignore
    generateWorksheet({ worksheet, selectedOptions });
  };

  // Map question types for display
  const mappedQuestionTypes =
    worksheet.questionTypes?.map(
      (type: string) => questionTypeMapping[type] || type
    ) || [];

  return (
    <div className={styles.cardWrapper}>
      <Title level={3} className={styles.title}>
        Ready to Generate
      </Title>
      <Text className={styles.subtitle}>
        Your worksheet configuration is complete
      </Text>
      <Divider />

      {/* Error Alert */}
      {submitting && (
        <Alert
          message="Generating Worksheet"
          description="Please wait while we generate your worksheet..."
          type="info"
          showIcon
          style={{ marginBottom: 20 }}
        />
      )}

      {/* General Info */}
      <div style={{ marginBottom: "1rem", fontWeight: 600, fontSize: 20 }}>
        General Information
      </div>
      <Row gutter={[16, 16]} className={styles.infoRow}>
        <Col xs={24} sm={12} md={6}>
          <Text strong className={styles.number}>
            Input Method:
          </Text>
          <Text className={styles.label}>{worksheet.inputMethod}</Text>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Text strong className={styles.number}>
            Curriculum:
          </Text>
          <Text className={styles.label}>{worksheet.curriculum}</Text>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Text strong className={styles.number}>
            Grade:
          </Text>
          <Text className={styles.label}>
            {worksheet.gradeName || worksheet.grade}
          </Text>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Text strong className={styles.number}>
            Subject:
          </Text>
          <Text className={styles.label}>
            {worksheet.subjectName || worksheet.subject}
          </Text>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Text strong className={styles.number}>
            Number of Questions:
          </Text>
          <Text className={styles.label}>{worksheet.numberOfQuestions}</Text>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Text strong className={styles.number}>
            Difficulty:
          </Text>
          <Text className={styles.label}>{worksheet.difficultyLevel}</Text>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Text strong className={styles.number}>
            Topic:
          </Text>
          <Text className={styles.label}>{worksheet.topic}</Text>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Text strong className={styles.number}>
            Question Category:
          </Text>
          <Text className={styles.label}>{worksheet.questionCategory}</Text>
        </Col>
      </Row>

      {/* Files */}
      {worksheet.files?.length > 0 && (
        <>
          <Divider />
          <div style={{ marginBottom: "1rem", fontWeight: 600, fontSize: 20 }}>
            Uploaded Files
          </div>
          <Row
            gutter={[8, 8]}
            style={{ display: "flex", justifyContent: "center" }}
          >
            {worksheet.files.map((file, i) => (
              <Col key={i}>
                <Tag color="volcano" style={{ fontSize: 13 }}>
                  {file.name}{" "}
                  <Text
                    type="secondary"
                    style={{ marginLeft: 4, fontSize: 13 }}
                  >
                    ({file.type})
                  </Text>
                </Tag>
              </Col>
            ))}
          </Row>
        </>
      )}

      {/* Question Types */}
      {mappedQuestionTypes.length > 0 && (
        <>
          <Divider />
          <div style={{ marginBottom: "1rem", fontWeight: 600, fontSize: 20 }}>
            Question Types
          </div>
          <Row
            gutter={[8, 8]}
            style={{ display: "flex", justifyContent: "center" }}
          >
            {mappedQuestionTypes.map((type, i) => (
              <Col key={i}>
                <Tag color="green" style={{ fontSize: 13 }}>
                  {String(type)}
                </Tag>
              </Col>
            ))}
          </Row>
        </>
      )}

      {(worksheet.customizations?.length > 0 ||
        worksheet.additionalFeatures?.length > 0) && (
        <>
          <Divider />
          <div style={{ marginBottom: "1rem", fontWeight: 600, fontSize: 20 }}>
            Additional Features
          </div>
          <Row
            gutter={[8, 8]}
            style={{ display: "flex", justifyContent: "center" }}
          >
            {(worksheet.customizations || []).map((item, i) => (
              <Col key={`custom-${i}`}>
                <Tag color="blue">{item}</Tag>
              </Col>
            ))}
            {(worksheet.additionalFeatures || []).map((featureKey, i) => {
              const feature = features.find((f) => f.key === featureKey);
              return feature ? (
                <Col key={`feature-${i}`}>
                  <Tag color="purple" style={{ fontSize: 13 }}>
                    {feature.title}
                  </Tag>
                </Col>
              ) : null;
            })}
          </Row>
        </>
      )}

      {/* Footer Buttons */}
      <Divider />
      {/* Navigation */}
      <div className={styles.navigationButtons}>
        <CustomButton
          text="Previous"
          type="default"
          prefixIcon={<ArrowLeftOutlined />}
          onClick={onBack}
        />
        <CustomButton
          text={submitting ? "Generating..." : "Generate Worksheet"}
          type="primary"
          postfixIcon={submitting ? undefined : <FileDoneOutlined />}
          className={styles.next}
          onClick={handleGenerate}
          disabled={submitting}
        />
      </div>
    </div>
  );
};

export default Step4;
