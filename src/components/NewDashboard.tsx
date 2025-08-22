import { useState } from "react";
import { Typography, Button, Avatar, Progress, Segmented } from "antd";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { profileData } from "../statics/profileData";
import styles from "../styles/custom/newDashboard.module.less";
import {
  RocketOutlined,
  PlayCircleOutlined,
  CrownOutlined,
  GlobalOutlined,
  CalendarOutlined,
  FileTextOutlined,
  BarChartOutlined,
  BookOutlined,
} from "@ant-design/icons";
import { Sparkles } from "lucide-react";
import CreateOptions from "./CreateOptions";
import CommingSoon from "./CommingSoon";
import CustomButton from "./CustomButton";
import AiTools from "./AiTools";
import RecentWorksheets from "./RecentWorksheets";
import WorksheetListing from "./WorksheetListing";
import SuccessStoriesSection from "./SuccessStoriesSection";
import PageHeader from "./PageHeader";

const { Title, Text } = Typography;

const NewDashboard = () => {
  const [activeTab, setActiveTab] = useState<string>("Create");
  const navigate = useNavigate();
  const { t } = useTranslation();

  const navigationItems = [
    { key: "Create", icon: <RocketOutlined />, label: t("nav.create") },
    { key: "AITools", icon: <Sparkles />, label: t("nav.aiTools") },
    {
      key: "Worksheets",
      icon: <FileTextOutlined />,
      label: t("nav.worksheets"),
    },
    { key: "Library", icon: <BarChartOutlined />, label: t("nav.library") },
    { key: "Stories", icon: <BookOutlined />, label: t("nav.stories") },
  ];

  const handleCreateWorksheet = () => {
    navigate("/worksheet-generator");
  };

  const handleTakeTour = () => {
    navigate("/demo-page");
  };

  const handleNavigationClick = (key: string) => {
    setActiveTab(key);
  };

  return (
    <>
      <PageHeader />
      <div style={{ backgroundColor: "#ffffff" }}>
        <div className={styles.dashboardContainer}>
          {/* Main Content Area */}
          <div className={styles.mainContent}>
            {/* Left Section - Welcome and CTA */}
            <div className={styles.welcomeSection}>
              <Title level={2} className={styles.welcomeTitle}>
                {t("welcomeTitle", { name: profileData.fullName })} 👋
              </Title>
              <Text className={styles.welcomeSubtitle}>
                {t("welcomeSubtitle")}
              </Text>

              <div className={styles.ctaButtons}>
                <CustomButton
                  text={t("createWorksheetNow")}
                  type="primary"
                  size="middle"
                  prefixIcon={<RocketOutlined />}
                  className={styles.createButton}
                  onClick={handleCreateWorksheet}
                />

                <CustomButton
                  type="primary"
                  text={t("takeTour")}
                  size="middle"
                  prefixIcon={<PlayCircleOutlined />}
                  className={styles.tourButton}
                  onClick={handleTakeTour}
                />
              </div>
            </div>

            {/* Right Section - User Info and Stats */}
            <div className={styles.userInfoSection}>
              {/* User Profile and Account Type */}
              <div className={styles.userProfile}>
                <Avatar className={styles.userAvatar}>
                  {profileData.initials}
                </Avatar>
                <Button className={styles.accountTypeButton}>
                  {profileData.role}
                </Button>
                <Button type="primary" className={styles.proButton}>
                  <CrownOutlined /> {t("pro")}
                </Button>
              </div>

              {/* Curriculum Info */}
              <div className={styles.curriculumInfo}>
                <GlobalOutlined className={styles.curriculumIcon} />
                <Text className={styles.curriculumText}>
                  {t("curriculumInfo")}
                </Text>
              </div>

              {/* Usage Stats */}
              <div className={styles.usageSection}>
                <div className={styles.usageHeader}>
                  <CalendarOutlined className={styles.usageIcon} />
                  <Text className={styles.usageLabel}>{t("usage")}</Text>
                </div>

                <div className={styles.progressContainer}>
                  <Progress
                    percent={46}
                    showInfo={false}
                    strokeColor={{
                      from: "#5a4bff",
                      to: "#8f45ff",
                    }}
                    className={styles.usageProgress}
                  />
                  <Text className={styles.usageCount}>
                    {t("usageCount", { used: 23, total: 50 })}
                  </Text>
                </div>

                <div className={styles.usageFooter}>
                  <Text className={styles.remainingText}>
                    {t("remaining", { remaining: 27 })}
                  </Text>
                  <Text className={styles.percentageText}>
                    {t("percentageRemaining", { percentage: 92 })}
                  </Text>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Navigation */}
          <Segmented
            block
            size="large"
            value={activeTab}
            onChange={(value) => handleNavigationClick(value as string)}
            options={navigationItems.map((item) => ({
              label: (
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: "4px",
                    padding: "8px 0",
                    lineHeight: "1.2",
                  }}
                >
                  <div style={{ fontSize: "18px" }}>{item.icon}</div>
                  <div style={{ fontSize: "12px", fontWeight: "500" }}>
                    {item.label}
                  </div>
                </div>
              ),
              value: item.key,
            }))}
            style={{
              width: "100%",
              marginTop: "24px",
              borderRadius: "12px",
              padding: "4px",
            }}
          />

          {/* Bottom Text */}
          <div className={styles.bottomText}>
            {activeTab === "Create" && <CreateOptions />}
          </div>

          {activeTab === "AITools" && <AiTools />}
          {activeTab === "Worksheets" && <RecentWorksheets />}
          {activeTab === "Library" && <WorksheetListing />}
          {activeTab === "Stories" && <SuccessStoriesSection />}
        </div>
      </div>
    </>
  );
};

export default NewDashboard;
