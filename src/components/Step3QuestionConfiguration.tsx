import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store";
import {
  setQuestionTypes,
  setQuestionCategory,
  setAdditionalFeatures,
  setDifficultyLevel,
} from "../store/slices/worksheetSlice";
import {
  Card,
  Row,
  Col,
  Select,
  Slider,
  Typography,
  Spin,
  Alert,
  Checkbox,
} from "antd";
import {
  ArrowLeftOutlined,
  ArrowRightOutlined,
  KeyOutlined,
  GiftOutlined,
} from "@ant-design/icons";
import { Brain, Lightbulb } from "lucide-react";
import styles from "../styles/custom/step3.module.less";
import NumberOfQuestionsSelector from "./NumberOfQuestionsSelector";
import { useQuestionTypes } from "../hooks/useCurriculumGrade";
import { useQuestionCategories } from "../hooks/useQuestionCategories";
import CustomButton from "./CustomButton";

const { Title, Text } = Typography;

interface Props {
  onNext: () => void;
  onBack: () => void;
}

const difficultyLabels: Record<number, string> = {
  1: "Easy",
  2: "Medium",
  3: "Hard",
};

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

const Step3QuestionConfiguration: React.FC<Props> = ({ onNext, onBack }) => {
  const dispatch = useDispatch();
  const worksheet = useSelector((state: RootState) => state.worksheet);

  const [selectedCategory, setSelectedCategory] = useState<string>(
    worksheet.questionCategory || ""
  );
  const [selectedQuestionTypes, setSelectedQuestionTypes] = useState<string[]>(
    worksheet.questionTypes || []
  );
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>(
    worksheet.additionalFeatures || []
  );

  // map difficulty string -> numeric slider value
  const difficultyValue =
    Object.keys(difficultyLabels).find(
      (key) => difficultyLabels[Number(key)] === worksheet.difficultyLevel
    ) !== undefined
      ? Number(
          Object.keys(difficultyLabels).find(
            (key) => difficultyLabels[Number(key)] === worksheet.difficultyLevel
          )
        )
      : 2;

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    setSelectedQuestionTypes([]);
  };

  // Hooks
  // @ts-ignore
  const { questionTypes, loadingQuestionTypes, boardError } = useQuestionTypes(
    worksheet.boardId?.toString() || "",
    selectedCategory
  );
  const {
    categories,
    loading: loadingCategories,
    error: categoryError,
  } = useQuestionCategories({
    boardId: worksheet.boardId,
    gradeId: worksheet.grade,
    subjectId: worksheet.subject,
  });

  const handleNext = () => {
    dispatch(setQuestionTypes(selectedQuestionTypes));
    dispatch(setQuestionCategory(selectedCategory));
    dispatch(setAdditionalFeatures(selectedFeatures));

    // Ensure difficulty level is set - use current slider value or default to Medium
    const currentDifficulty = difficultyLabels[difficultyValue] as
      | "Easy"
      | "Medium"
      | "Hard";
    dispatch(setDifficultyLevel(currentDifficulty));

    onNext();
  };

  const isDisabled =
    !selectedCategory ||
    selectedQuestionTypes.length === 0 ||
    loadingQuestionTypes ||
    loadingCategories ||
    !!boardError ||
    !!categoryError ||
    !worksheet.numberOfQuestions ||
    categories.length === 0 ||
    (selectedCategory && questionTypes.length === 0);

  const features = [
    {
      key: "answerKey",
      icon: <KeyOutlined style={{ fontSize: 20, color: "#8b5cf6" }} />,
      title: "Answer Key",
      description: "Include detailed solutions and answers",
    },
    {
      key: "brainTeasers",
      icon: <Brain size={20} color="#8b5cf6" />,
      title: "Brain Teasers",
      description: "Add challenging puzzle questions",
    },
    {
      key: "funFacts",
      icon: <Lightbulb size={20} color="#8b5cf6" />,
      title: "Fun Facts",
      description: "Include interesting trivia and facts",
    },
    {
      key: "realApplications",
      icon: <GiftOutlined style={{ fontSize: 20, color: "#8b5cf6" }} />,
      title: "Real Applications",
      description: "Show real-world use cases",
    },
  ];

  const toggleFeature = (key: string) => {
    setSelectedFeatures((prev) =>
      prev.includes(key) ? prev.filter((f) => f !== key) : [...prev, key]
    );
  };

  return (
    <Card className={styles.cardContainer}>
      <Title level={3} style={{ textAlign: "center", marginBottom: "1rem" }}>
        Question Configuration
      </Title>
      <div style={{ margin: "0.8rem" }}>
        {(boardError || categoryError) && (
          <Alert
            message="Error"
            description={boardError || categoryError}
            type="error"
            showIcon
            style={{ marginBottom: 20 }}
          />
        )}

        <Row gutter={[24, 24]}>
          {/* Question Category */}
          <Col span={24} className={styles.wrapper}>
            <Title level={5}>Question Category *</Title>
            {loadingCategories ? (
              <Spin />
            ) : categories.length > 0 ? (
              <Select
                placeholder="Choose a question category"
                style={{ width: "100%" }}
                value={selectedCategory}
                onChange={handleCategoryChange}
                options={categories.map((cat: string) => ({
                  value: cat,
                  label: cat,
                }))}
              />
            ) : (
              <div style={{ color: "#999", fontStyle: "italic" }}>
                No question categories found for the selected board, grade, and
                subject.
              </div>
            )}

            {/* Question Types */}
            <Title level={5} style={{ margin: "1rem 0 0.6rem 0" }}>
              Question Types *
            </Title>
            {loadingQuestionTypes ? (
              <Spin />
            ) : selectedCategory ? (
              questionTypes.length > 0 ? (
                <Select
                  mode="multiple"
                  placeholder="Choose question types"
                  style={{ width: "100%" }}
                  value={selectedQuestionTypes}
                  onChange={setSelectedQuestionTypes}
                  options={questionTypes.map((qt: string) => ({
                    value: qt, // Store the original database value
                    label: questionTypeMapping[qt] || qt, // Display mapped English name
                  }))}
                />
              ) : (
                <div style={{ color: "#999", fontStyle: "italic" }}>
                  No question types found for the selected category "
                  {selectedCategory}".
                </div>
              )
            ) : (
              <div style={{ color: "#999", fontStyle: "italic" }}>
                Please select a question category first to see available
                question types.
              </div>
            )}
          </Col>

          {/* Difficulty & Number of Questions */}
          <Col xs={24} md={12} style={{ paddingRight: "8px" }}>
            <div className={styles.difficultySection}>
              <Title level={5}>Difficulty Level</Title>
              <Slider
                min={1}
                max={3}
                marks={{
                  1: {
                    style: { color: "#36c900", fontWeight: "bold" },
                    label: "Easy",
                  },
                  2: {
                    style: { color: "#fb2626", fontWeight: "bold" },
                    label: "Medium",
                  },
                  3: {
                    style: { color: "#333333", fontWeight: "bold" },
                    label: "Hard",
                  },
                }}
                value={difficultyValue}
                onChange={(val: number) =>
                  dispatch(
                    setDifficultyLevel(
                      difficultyLabels[val] as "Easy" | "Medium" | "Hard"
                    )
                  )
                }
              />
            </div>
          </Col>
          <Col xs={24} md={12} style={{ paddingLeft: "8px" }}>
            <div className={styles.numberOfQuestionsSection}>
              <NumberOfQuestionsSelector />
            </div>
          </Col>

          {/* Additional Features */}
          <Col span={24} className={styles.wrapper}>
            <Title level={5} style={{ marginBottom: "0.6rem" }}>
              Additional Features
            </Title>
            <Row gutter={[16, 16]}>
              {features.map((f) => (
                <Col xs={24} md={12} key={f.key}>
                  <Card
                    hoverable
                    onClick={() => toggleFeature(f.key)}
                    className={`${styles.featureCard} ${
                      selectedFeatures.includes(f.key)
                        ? styles.activeFeature
                        : ""
                    }`}
                  >
                    <Row gutter={12} align="middle">
                      <Col>{f.icon}</Col>
                      <Col flex="auto">
                        <Text strong>{f.title}</Text>
                        <div style={{ fontSize: "0.85rem", color: "#666" }}>
                          {f.description}
                        </div>
                      </Col>
                      <Col>
                        <Checkbox
                          checked={selectedFeatures.includes(f.key)}
                          onChange={() => toggleFeature(f.key)}
                        />
                      </Col>
                    </Row>
                  </Card>
                </Col>
              ))}
            </Row>
          </Col>
        </Row>
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
          onClick={handleNext}
          disabled={isDisabled}
        />
      </div>
    </Card>
  );
};

export default Step3QuestionConfiguration;
