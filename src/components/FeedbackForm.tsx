import React, { useState } from "react";
import {
  Card,
  Typography,
  Rate,
  Input,
  Row,
  Col,
  Checkbox,
  message,
} from "antd";
import { SendOutlined } from "@ant-design/icons";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import CustomButton from "./CustomButton";
import styles from "../styles/custom/FeedbackForm.module.less";
import api from "../utils/api";
import { useNavigate } from "react-router-dom";
import PageHeader from "./PageHeader";

const { Title, Text } = Typography;
const { TextArea } = Input;

const feedbackOptions = [
  "Easy to use",
  "Quality of worksheets",
  "Fast generation",
  "Variety of questions",
  "Answer keys",
  "Sharing options",
];

const FeedbackForm: React.FC = () => {
  const navigate = useNavigate();
  const historyId = useSelector(
    (state: RootState) => state.worksheet.worksheetId
  );
  const userString = localStorage.getItem("user");
  const userId = userString ? JSON.parse(userString)?.id : null;

  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [allowToShare, setAllowToShare] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleOptionClick = (option: string) => {
    if (!selectedOptions.includes(option)) {
      setSelectedOptions((prev) => [...prev, option]);
      setComment((prev) => (prev ? `${prev}\n${option}` : option));
    }
  };

  const handleSubmit = async () => {
    if (!rating) return message.warning("Please rate your experience.");
    if (!historyId) return message.error("Missing required data.");

    try {
      setLoading(true);
      await api.post(`/feedback`, {
        history_id: historyId,
        user_id: userId,
        rating,
        comment,
        allow_to_share: allowToShare,
      });

      message.success("Feedback submitted successfully.");
      setRating(0);
      setComment("");
      setSelectedOptions([]);
      setAllowToShare(false);
      navigate("/");
    } catch (err) {
      console.error(err);
      message.error("❌ Submission failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <PageHeader />
      <Card className={styles.feedbackCard}>
        <div className={styles.header}>
          <Title level={3} className={styles.title}>
            How was your experience?
          </Title>
          <Text className={styles.subtitle}>
            Help us improve AIWorksheetPro with your valuable feedback
          </Text>
        </div>

        <div>
          <Title level={4} className={styles.centeredText}>
            Rate your experience:
          </Title>
          <Rate value={rating} onChange={setRating} className={styles.stars} />
        </div>

        <div className={styles.section}>
          <Text strong>Tell us more about your experience:</Text>
          <TextArea
            rows={4}
            placeholder="What did you like? What could be improved? Any suggestions?"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className={styles.textArea}
          />
        </div>

        <div className={styles.section}>
          <Text strong>What did you like most?</Text>
          <Row gutter={[12, 12]} className={styles.optionRow}>
            {feedbackOptions.map((option) => (
              <Col key={option} xs={24} sm={12} md={8}>
                <CustomButton
                  text={option}
                  block
                  size="large"
                  type={
                    selectedOptions.includes(option) ? "primary" : "default"
                  }
                  onClick={() => handleOptionClick(option)}
                />
              </Col>
            ))}
          </Row>
        </div>

        <div className={styles.section}>
          <Checkbox
            checked={allowToShare}
            onChange={(e) => setAllowToShare(e.target.checked)}
          >
            Allow us to share your feedback
          </Checkbox>
        </div>

        <div className={styles.footer}>
          <CustomButton
            text="Submit Feedback"
            prefixIcon={<SendOutlined />}
            onClick={handleSubmit}
            loading={loading}
            className={styles.submitBtn}
            disabled={!rating || !comment.trim() || !historyId}
            block
          />
        </div>
      </Card>
    </>
  );
};

export default FeedbackForm;
