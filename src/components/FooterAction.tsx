import { ArrowRightOutlined } from "@ant-design/icons";
import { Button, Typography } from "antd";
import styles from "../styles/custom/demoPage.module.less";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const { Text } = Typography;

const FooterAction = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  function onTryItSelf() {
    navigate("/parent-worksheet");
  }

  return (
    <div className={styles.footerActionWrapper}>
      <Button size="large" className={styles.tryButton} onClick={onTryItSelf}>
        {t("footerAction.tryButton")} <ArrowRightOutlined />
      </Button>
      <Text className={styles.footerNote}>{t("footerAction.note")}</Text>
    </div>
  );
};

export default FooterAction;
