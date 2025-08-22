import React from "react";
import { Card, Button, Typography, Space } from "antd";
import { UploadOutlined, EditOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import { setInputMethod } from "../store/slices/worksheetSlice";
import { useTranslation } from "react-i18next";

import styles from "../styles/custom/worksheetPage.module.less";

const { Title, Text } = Typography;

interface Props {
  onSelect: (type: "upload" | "type" | "sample") => void;
}

const Step1InputMethod: React.FC<Props> = ({ onSelect }) => {
  const dispatch = useDispatch();
  const selected = useSelector(
    (state: RootState) => state.worksheet.inputMethod
  );
  const { t } = useTranslation();

  const handleSelect = (type: "upload" | "type" | "sample") => {
    dispatch(setInputMethod(type));
  };

  const isSelected = (type: "upload" | "type" | "sample") => selected === type;

  return (
    <div>
      <Card>
        <div className={styles.titleWrapper}>
          <Title level={3}>{t("step1.heading")}</Title>
          <Title level={5} style={{ color: "gray" }}>
            {t("step1.subheading")}
          </Title>
        </div>

        <Space direction="vertical" size="large" style={{ width: "100%" }}>
          <Button
            block
            size="large"
            onClick={() => handleSelect("upload")}
            className={`${styles.hoverCardButton} ${
              isSelected("upload") ? styles.selectedCard : ""
            }`}
          >
            <div style={{ lineHeight: 1.4 }}>
              <UploadOutlined className={styles.uploadIcon} />
              <div className={styles.titleMain}>
                {t("step1.options.upload.title")}
              </div>
              <Text type="secondary">{t("step1.options.upload.desc")}</Text>
            </div>
          </Button>

          <Button
            block
            size="large"
            onClick={() => handleSelect("type")}
            className={`${styles.hoverCardButton} ${
              isSelected("type") ? styles.selectedCard : ""
            }`}
          >
            <div>
              <EditOutlined className={styles.editIcon} />
              <div className={styles.titleMain}>
                {t("step1.options.type.title")}
              </div>
              <Text type="secondary">{t("step1.options.type.desc")}</Text>
            </div>
          </Button>
        </Space>

        {selected && (
          <div style={{ marginTop: "2rem", textAlign: "right" }}>
            <Button
              block
              size="large"
              onClick={() => onSelect(selected)}
              className={styles.gradientButton}
            >
              {t("step1.continue")}
            </Button>
          </div>
        )}
      </Card>
    </div>
  );
};

export default Step1InputMethod;
