import React from "react";
import { useDispatch } from "react-redux";
import {
  useCurriculumData,
  useGradeData,
  useSubjectData,
  useStateOptions,
} from "../hooks/useCurriculumGrade";
import { getCountryCode } from "../utils/country";
import {
  handleCurriculumChange,
  handleGradeChange,
  handleStateChange,
  handleSubjectChange,
} from "../utils/worksheetHelpers";
import DropdownField from "./DropdownField";
import { Col, FormInstance, Row } from "antd";
import { useTranslation } from "react-i18next";

interface Props {
  curriculum: string;
  stateBoardState: string;
  grade: string;
  subject: string;
  onCurriculumNameChange?: (name: string) => void;
  form?: FormInstance<any>;
}

const CurriculumGradeSelector: React.FC<Props> = ({
  curriculum,
  stateBoardState,
  grade,
  subject,
  onCurriculumNameChange = () => {},
}) => {
  const dispatch = useDispatch();
  const countryCode = getCountryCode();
  const { t } = useTranslation();

  const { curriculumOptions } = useCurriculumData(countryCode);
  const { gradeOptions } = useGradeData(curriculum, stateBoardState, (id) =>
    dispatch({ type: "worksheet/setBoardId", payload: id })
  );
  const { subjectOptions } = useSubjectData(grade);

  const curriculumName =
    curriculumOptions.find((opt) => opt.value === curriculum)?.name || "";
  const showState = curriculumName === "State Board";

  const { stateOptions } = useStateOptions(showState, countryCode);

  return (
    <>
      <Row gutter={16} style={{ marginBottom: "1rem" }}>
        <Col span={showState ? 12 : 24}>
          <DropdownField
            label={t("curriculum.label")}
            value={curriculum}
            options={curriculumOptions}
            placeholder={t("curriculum.placeholder")}
            onChange={(v) =>
              handleCurriculumChange(
                v,
                curriculumOptions,
                dispatch,
                onCurriculumNameChange
              )
            }
          />
        </Col>

        {showState && (
          <Col span={12}>
            <DropdownField
              label={t("state.label")}
              value={stateBoardState}
              options={stateOptions}
              placeholder={t("state.placeholder")}
              onChange={(v) => handleStateChange(v, dispatch)}
            />
          </Col>
        )}
      </Row>

      <Row gutter={16}>
        <Col span={12}>
          <DropdownField
            label={t("grade.label")}
            value={grade}
            options={gradeOptions}
            placeholder={t("grade.placeholder")}
            onChange={(v) => handleGradeChange(v, gradeOptions, dispatch)}
          />
        </Col>

        <Col span={12}>
          <DropdownField
            label={t("subject.label")}
            value={subject}
            options={subjectOptions}
            placeholder={t("subject.placeholder")}
            onChange={(v) => handleSubjectChange(v, subjectOptions, dispatch)}
          />
        </Col>
      </Row>
    </>
  );
};

export default CurriculumGradeSelector;
