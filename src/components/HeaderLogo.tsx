import React from "react";
import { Typography, Space } from "antd";
import { Link } from "react-router-dom";
import styles from "../styles/HeaderLogo.module.less";

const { Title, Text } = Typography;

interface HeaderLogoProps {
  logoSrc: string;
  title: string;
  to: string;
  hideSubtitle?: boolean;
}

const HeaderLogo: React.FC<HeaderLogoProps> = ({
  logoSrc,
  title,
  to,
  hideSubtitle = false,
}) => {
  return (
    <Link to={to} className={styles.logoLink}>
      <Space align="center" size="middle">
        {/* <div className={styles.logoContainer}> */}
          <img
            src={logoSrc || "/placeholder.svg"}
            alt="AI WorksheetPro"
            className={styles.logo}
          />
        {/* </div> */}
        {/* <div className={styles.logoText}>
          <Title level={4} className={styles.logoTitle}>
            AI WorksheetPro
          </Title>
          {!hideSubtitle && (
            <Text className={styles.logoSubtitle}>{title}</Text>
          )}
        </div> */}
      </Space>
    </Link>
  );
};

export default HeaderLogo;
