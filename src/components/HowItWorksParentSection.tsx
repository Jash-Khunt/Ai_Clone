import { Typography, Button, message } from "antd";
import { ArrowRightOutlined } from "@ant-design/icons";
import styles from "../styles/custom/HowItWorksParentSection.module.less";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import { useTranslation } from "react-i18next";

const { Title, Text } = Typography;

interface Step {
  title: string;
  desc: string;
}

const HowItWorksParentSection = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const selectedMethod = useSelector(
    (state: RootState) => state.worksheet.inputMethod
  );

  const onHandleStart = () => {
    if (selectedMethod === "upload" || selectedMethod === "type") {
      navigate("/worksheet-generator");
    } else {
      message.info(t("createWorksheet.comingSoon")); // reuseable message key
    }
  };

  // ✅ Cast translations properly
  const steps = t("howItWorks.steps", { returnObjects: true }) as Step[];
  const tags = t("howItWorks.tags", { returnObjects: true }) as string[];

  return (
    <div className={styles.howItWorks}>
      <Title level={3}>{t("howItWorks.heading")}</Title>

      <div className={styles.steps}>
        {steps.map((step, i) => (
          <div className={styles.step} key={i}>
            <div className={styles.stepCircle}>{i + 1}</div>
            <Text strong>{step.title}</Text>
            <p>{step.desc}</p>
          </div>
        ))}
      </div>

      <div className={styles.tags}>
        {tags.map((tag, i) => (
          <span key={i}>{tag}</span>
        ))}
      </div>

      <Button
        type="primary"
        size="large"
        className={styles.startButton}
        icon={<ArrowRightOutlined />}
        onClick={onHandleStart}
      >
        {t("howItWorks.button")}
      </Button>
    </div>
  );
};

export default HowItWorksParentSection;
