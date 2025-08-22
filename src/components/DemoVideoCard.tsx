import { Card, Typography, Button } from "antd";
import { PlayCircleOutlined } from "@ant-design/icons";
import styles from "../styles/custom/demoPage.module.less";
import { useTranslation } from "react-i18next";

const { Text } = Typography;

interface Props {
  onClick?: () => void;
}

const DemoVideoCard: React.FC<Props> = ({ onClick }) => {
  const { t } = useTranslation();

  return (
    <Card className={styles.demoVideoCard} onClick={onClick}>
      <Button
        shape="circle"
        size="large"
        icon={<PlayCircleOutlined className={styles.playIcon} />}
        className={styles.playButton}
      />
      <Text className={styles.videoTitle}>{t("demoVideoCard.title")}</Text>
      <Text className={styles.videoSubtitle}>
        {t("demoVideoCard.subtitle")}
      </Text>
    </Card>
  );
};

export default DemoVideoCard;
