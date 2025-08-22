import React, { useState } from "react";
import { notification, Avatar, Dropdown } from "antd";
import {
  DashboardOutlined,
  SettingOutlined,
  UserOutlined,
  HeartOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import styles from "../styles/PageHeader.module.less";
import { ItemType } from "antd/es/menu/interface";
import { useTranslation } from "react-i18next";

export default function ProfileDropdown() {
  const navigate = useNavigate();
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const { t } = useTranslation();

  const user = (() => {
    try {
      return JSON.parse(localStorage.getItem("user") || "{}");
    } catch {
      return {};
    }
  })();

  const userName = user?.name || "";
  const role = user?.role || "";
  const firstLetter = userName.charAt(0).toUpperCase();
  const initials =
    userName.split(" ").length > 1
      ? `${userName.split(" ")[0][0]}${userName.split(" ")[1][0]}`.toUpperCase()
      : firstLetter;

  const handleLogout = () => {
    if (isLoggingOut) return;

    setIsLoggingOut(true);

    notification.info({
      message: t("profileDropdown.logoutNotice.title"),
      description: t("profileDropdown.logoutNotice.desc"),
      placement: "topRight",
      duration: 2,
      style: {
        backgroundColor: "#e6f7ff",
        border: "1px solid #91d5ff",
      },
    });

    setTimeout(() => {
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      setIsLoggingOut(false);
      navigate("/");
    }, 2000);
  };

  const items: ItemType[] = [
    {
      key: "header",
      label: (
        <>
          <div style={{ fontWeight: 700 }}>
            {userName || t("profileDropdown.userName")}
          </div>
          {role || t("profileDropdown.role")}
          <div style={{ padding: "0 5rem" }} />
        </>
      ),
    },
    { type: "divider" as "divider" },
    {
      key: "dashboard",
      icon: <DashboardOutlined />,
      label: t("profileDropdown.dashboard"),
      onClick: () => navigate("/dashboard"),
    },
    {
      key: "settings",
      icon: <SettingOutlined />,
      label: t("profileDropdown.settings"),
      onClick: () => navigate("/profile"),
    },
    {
      key: "profile",
      icon: <UserOutlined />,
      label: t("profileDropdown.profile"),
      onClick: () => navigate("/profile"),
    },
    {
      key: "preferences",
      icon: <HeartOutlined />,
      label: t("profileDropdown.preferences"),
      onClick: () => navigate("/profile"),
    },
    { type: "divider" as "divider" },
    {
      key: "logout",
      icon: <LogoutOutlined style={{ color: "red" }} />,
      label: (
        <span style={{ color: "red" }}>{t("profileDropdown.logout")}</span>
      ),
      onClick: handleLogout,
      disabled: isLoggingOut,
    },
  ];

  return (
    <Dropdown
      menu={{ items }}
      placement="bottomRight"
      arrow={false}
      overlayStyle={{ marginTop: 8 }}
    >
      <Avatar size="large" className={styles.avatar}>
        {initials || "?"}
      </Avatar>
    </Dropdown>
  );
}
