import React from "react";
import { Card, Typography } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import StepButtonGroup from "./StepButtonGroup";
import { getCountryCode } from "../utils/country";
import styles from "../styles/custom/worksheetPage.module.less";
import CurriculumGradeSelector from "./CurriculumGradeSelector";
import NumberOfQuestionsSelector from "./NumberOfQuestionsSelector";
import { useTranslation } from "react-i18next";

const { Title, Text } = Typography;

interface Props {
  onNext: () => void;
  onBack: () => void;
}

const Step2CurriculumGrade: React.FC<Props> = ({ onNext, onBack }) => {
  const dispatch = useDispatch();
  const { curriculum, grade, subject, numberOfQuestions, stateBoardState } =
    useSelector((state: RootState) => state.worksheet);

  const [selectedCurriculumName, setSelectedCurriculumName] =
    React.useState("");
  const countryCode = getCountryCode();
  const showState = selectedCurriculumName === "State Board";

  const isDisabled =
    !curriculum ||
    !grade ||
    !subject ||
    !numberOfQuestions ||
    (showState && !stateBoardState);

  const { t } = useTranslation();

  return (
    <Card>
      <div className={styles.step2Continer}>
        <Title level={3}>{t("step2.heading")}</Title>
        <Text type="secondary">{t("step2.subheading")}</Text>
      </div>

      <div>
        <CurriculumGradeSelector
          curriculum={curriculum}
          stateBoardState={stateBoardState}
          grade={grade}
          subject={subject}
          onCurriculumNameChange={setSelectedCurriculumName}
        />
      </div>

      <NumberOfQuestionsSelector />

      <StepButtonGroup onBack={onBack} onNext={onNext} disabled={isDisabled} />
    </Card>
  );
};

export default Step2CurriculumGrade;
