"use client";

import type React from "react";
import {
  Heart,
  MapPin,
  Star,
  Facebook,
  Twitter,
  Linkedin,
  Instagram,
  Youtube,
} from "lucide-react";
import { useTranslation } from "react-i18next";
import styles from "../styles/PageFooter.module.less";

const PageFooter: React.FC = () => {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { key: "features", href: "#" },
    { key: "pricing", href: "#" },
    { key: "templates", href: "#" },
    { key: "blog", href: "#" },
    { key: "helpCenter", href: "#" },
    { key: "api", href: "#" },
  ];

  const supportLinks = [
    { key: "contact", href: "#" },
    { key: "privacy", href: "#" },
    { key: "terms", href: "#" },
    { key: "gdpr", href: "#" },
    { key: "status", href: "#" },
    { key: "security", href: "#" },
  ];

  return (
    <footer className={styles.footer}>
      <div className={styles.topSection}>
        <div className={styles.topContainer}>
          <div className={styles.topGrid}>
            <div className={styles.madeInIndiaSection}>
              <div className={styles.madeInIndiaText}>
                {t("footer.madeInIndia")}
              </div>
              <div className={styles.prideText}>{t("footer.prideText")}</div>
            </div>

            <div className={styles.locationSection}>
              <div className={styles.locationInfo}>
                <MapPin size={16} className={styles.locationIcon} />
                <div>
                  <div className={styles.craftedText}>
                    {t("footer.craftedText")}
                  </div>
                  <div className={styles.cityText}>{t("footer.cityText")}</div>
                </div>
              </div>
            </div>
            <div className={styles.qualitySection}>
              <div className={styles.qualityBadge}>
                <div className={styles.stars}>
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={12} fill="#FFD700" color="#FFD700" />
                  ))}
                </div>
                <span className={styles.qualityText}>
                  {t("footer.qualityText")}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.container}>
        <div className={styles.footerContent}>
          <div className={styles.brandSection}>
            <div className={styles.logoSection}>
              <div className={styles.logoCircle}>
                <span className={styles.logoText}>AI</span>
              </div>
              <span className={styles.brandName}>WorksheetPro</span>
            </div>
            <p className={styles.tagline}>{t("footer.tagline")}</p>=
            <div className={styles.newsletterSection}>
              <h4 className={styles.newsletterTitle}>
                {t("footer.newsletterTitle")}
              </h4>
              <div className={styles.newsletterForm}>
                <input
                  type="email"
                  placeholder={t("footer.newsletterPlaceholder")}
                  className={styles.emailInput}
                />
                <button className={styles.subscribeButton}>
                  {t("footer.subscribeButton")}
                </button>
              </div>
            </div>
            <div className={styles.socialIcons}>
              {[Facebook, Twitter, Linkedin, Instagram, Youtube].map(
                (Icon, i) => (
                  <div key={i} className={styles.socialIcon}>
                    <Icon size={16} />
                  </div>
                )
              )}
            </div>
          </div>

          <div className={styles.linkSection}>
            <h4 className={styles.sectionTitle}>
              {t("footer.quickLinksTitle")}
            </h4>
            <ul className={styles.linkList}>
              {quickLinks.map((link) => (
                <li key={link.key}>
                  <a href={link.href} className={styles.footerLink}>
                    {t(`footer.quickLinks.${link.key}`)}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className={styles.linkSection}>
            <h4 className={styles.sectionTitle}>{t("footer.supportTitle")}</h4>
            <ul className={styles.linkList}>
              {supportLinks.map((link) => (
                <li key={link.key}>
                  <a href={link.href} className={styles.footerLink}>
                    {t(`footer.supportLinks.${link.key}`)}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div></div>
        </div>

        <div className={styles.copyrightSection}>
          <div className={styles.copyrightContent}>
            <div className={styles.copyrightText}>
              © {currentYear} AI WorksheetPro. {t("footer.copyright")}
            </div>
            <div className={styles.bottomRight}>
              <div className={styles.madeWithLove}>
                <Heart size={14} className={styles.heartIcon} />
                <span>{t("footer.madeWithLove")}</span>
              </div>
              <div className={styles.systemStatus}>
                <div className={styles.statusDot}></div>
                <span className={styles.statusText}>
                  {t("footer.allSystems")}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default PageFooter;
