import { Typography } from "antd";
import DemoVideoCard from "../components/DemoVideoCard";
import FeatureCard from "../components/FeatureCard";
import WhyChooseSection from "../components/WhyChooseSection";
import FooterAction from "../components/FooterAction";
import styles from "../styles/custom/demoPage.module.less";
import PageHeader from "../components/PageHeader";
import { useTranslation } from "react-i18next";

const { Title, Text } = Typography;

const DemoPage = () => {
  const { t } = useTranslation();

  return (
    <div className={styles.demopage}>
      <PageHeader />
      <div className={styles.side}>
        <Title level={2} style={{ textAlign: "center" }}>
          {t("demoPage.title")}
        </Title>
        <Text
          style={{
            display: "block",
            textAlign: "center",
            marginBottom: 40,
          }}
        >
          {t("demoPage.subtitle")}
        </Text>

        <DemoVideoCard />
        <FeatureCard />
        <WhyChooseSection />
        <FooterAction />
      </div>
    </div>
  );
};

export default DemoPage;