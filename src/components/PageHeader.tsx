"use client";
import React, { useEffect, useState } from "react";
import { Layout, Menu, Button, Select, Space, Drawer } from "antd";
import { GlobalOutlined, MenuOutlined, DownOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import HeaderLogo from "./HeaderLogo";
import ProfileDropdown from "./ProfileDropdown";
import logoSrc from "../assets/aiworksheetprologo.png";
import styles from "../styles/PageHeader.module.less";
import { languageOptions } from "../statics/languageOptions";
import { regionOptions } from "../statics/RegionOptions";
import { useAppLanguage } from "../hooks/useAppLanguage";

const { Header } = Layout;
const { Option } = Select;

const PageHeader: React.FC = () => {
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isTabletOrMobile, setIsTabletOrMobile] = useState(false);
  const token = localStorage.getItem("token");
  const [userName, setUserName] = useState("");
  const [role, setRole] = useState("");

  const { t } = useTranslation();

  useEffect(() => {
    try {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        const parsedUser = JSON.parse(storedUser);
        setUserName(parsedUser.name || "");
        setRole(parsedUser.role || "");
      }
    } catch (error) {
      console.error("Error parsing user from localStorage", error);
    }
  }, []);

  const {
    selectedLanguage,
    selectedRegion,
    handleLanguageChange,
    setSelectedRegion,
  } = useAppLanguage();

  useEffect(() => {
    const checkScreenSize = () => {
      setIsTabletOrMobile(window.innerWidth <= 1280); 
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  const handleTryFree = () => {
    navigate("/register");
  };

  const handleSignUp = () => {
    navigate("/register");
  };

  const handleMenuClick = (key: string) => {
    navigate(key === "home" ? "/" : `/${key}`);
    setMobileMenuOpen(false);
  };

  const menuItems = [
    { key: "home", label: t("menu.home") },
    { key: "features", label: t("menu.features") },
    { key: "samples", label: t("menu.samples") },
    { key: "pricing", label: t("menu.pricing") },
    {
      key: "resources",
      label: t("menu.resources"),
      children: [
        { key: "blog", label: t("menu.blog") },
        { key: "guides", label: t("menu.guides") },
        { key: "templates", label: t("menu.templates") },
      ],
    },
    { key: "contact", label: t("menu.contact") },
  ];

  const renderDesktopHeader = () => (
    <div className={styles.headerContent}>
      <div className={styles.logoSection}>
        <HeaderLogo logoSrc={logoSrc} title={t("header.title")} to="/" />
      </div>

      <div className={styles.navigationSection}>
        <Menu
          mode="horizontal"
          items={menuItems}
          onClick={({ key }) => handleMenuClick(key)}
          className={styles.navigationMenu}
          style={{ border: "none", background: "transparent" }}
        />
      </div>

      <div className={styles.actionsSection}>
        <Space size="middle">
          <Select
            value={selectedLanguage}
            onChange={handleLanguageChange}
            className={styles.languageSelector}
            suffixIcon={<DownOutlined />}
            bordered={false}
          >
            {languageOptions.map((option) => (
              <Option key={option.code} value={option.code}>
                <Space>
                  <GlobalOutlined />
                  {option.label}
                </Space>
              </Option>
            ))}
          </Select>

          <Select
            value={selectedRegion}
            onChange={setSelectedRegion}
            placeholder={t("header.region")}
            className={styles.regionSelector}
            suffixIcon={<DownOutlined />}
            bordered={false}
          >
            {regionOptions.map((option) => (
              <Option key={option.code} value={option.code}>
                {option.label}
              </Option>
            ))}
          </Select>

          {token ? (
            <>
              <span className={styles.profileSet}>
                <div style={{ fontWeight: 700 }}>{userName}</div>
                <div>{role}</div>
              </span>
              <ProfileDropdown />
            </>
          ) : (
            <>
              <Button
                type="text"
                onClick={handleTryFree}
                className={styles.tryFreeButton}
              >
                {t("header.tryFree")}
              </Button>
              <Button
                type="primary"
                onClick={handleSignUp}
                className={styles.signUpButton}
              >
                {t("header.signUp")}
              </Button>
            </>
          )}
        </Space>
      </div>
    </div>
  );

  const renderMobileHeader = () => (
    <div className={styles.headerContent}>
      <div className={styles.logoSection}>
        <HeaderLogo logoSrc={logoSrc} title={t("header.title")} to="/" />
      </div>

      <Button
        type="text"
        icon={<MenuOutlined />}
        onClick={() => setMobileMenuOpen(true)}
        className={styles.mobileMenuButton}
      />

      <Drawer
        title={t("header.menu")}
        placement="right"
        onClose={() => setMobileMenuOpen(false)}
        open={mobileMenuOpen}
        className={styles.mobileDrawer}
      >
        <Menu
          mode="vertical"
          items={menuItems}
          onClick={({ key }) => handleMenuClick(key)}
          className={styles.mobileNavigationMenu}
        />

        <div className={styles.mobileSelectors}>
          <Select
            value={selectedLanguage}
            onChange={handleLanguageChange}
            style={{ width: "100%", marginBottom: 16 }}
          >
            {languageOptions.map((option) => (
              <Option key={option.code} value={option.code}>
                <Space>
                  <GlobalOutlined />
                  {option.label}
                </Space>
              </Option>
            ))}
          </Select>

          <Select
            value={selectedRegion}
            onChange={setSelectedRegion}
            placeholder={t("header.region")}
            style={{ width: "100%", marginBottom: 24 }}
          >
            {regionOptions.map((option) => (
              <Option key={option.code} value={option.code}>
                {option.label}
              </Option>
            ))}
          </Select>
        </div>

        <div className={styles.mobileActions}>
          {token ? (
            <ProfileDropdown />
          ) : (
            <>
              <Button
                type="text"
                onClick={handleTryFree}
                block
                className={styles.mobileTryFreeButton}
              >
                {t("header.tryFree")}
              </Button>
              <Button
                type="primary"
                onClick={handleSignUp}
                block
                className={styles.mobileSignUpButton}
              >
                {t("header.signUp")}
              </Button>
            </>
          )}
        </div>
      </Drawer>
    </div>
  );

  return (
    <Header className={styles.header}>
      {isTabletOrMobile ? renderMobileHeader() : renderDesktopHeader()}
    </Header>
  );
};

export default PageHeader;
