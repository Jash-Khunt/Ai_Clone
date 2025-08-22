import React from "react";
import { Typography } from "antd";
import DropdownField from "./DropdownField";
import { useDispatch, useSelector } from "react-redux";
import { setNumberOfQuestions } from "../store/slices/worksheetSlice";
import { RootState } from "../store";
import { useTranslation } from "react-i18next";

const { Title } = Typography;

interface Props {
  className?: string;
}

const NumberOfQuestionsSelector: React.FC<Props> = ({ className }) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const numberOfQuestions = useSelector(
    (state: RootState) => state.worksheet.numberOfQuestions
  );

  return (
    <div className={className}>
      <Title level={5}>{t("numberOfQuestions.title")}</Title>
      <div style={{ marginTop: "8px" }}>
        <DropdownField
          label=""
          value={numberOfQuestions}
          options={[
            { label: "5", value: "5" },
            { label: "10", value: "10" },
            { label: "15", value: "15" },
            { label: "20", value: "20" },
            { label: "25", value: "25" },
          ]}
          placeholder={t("numberOfQuestions.placeholder")}
          onChange={(value) => dispatch(setNumberOfQuestions(value))}
        />
      </div>
    </div>
  );
};

export default NumberOfQuestionsSelector;
