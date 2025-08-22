"use client";

import type React from "react";
import { Mail, MessageCircle, Phone } from "lucide-react";
import styles from "../styles/custom/contactPage.module.less";
import { useTranslation } from "react-i18next";

const ContactPage: React.FC = () => {
  const { t } = useTranslation();

  const contactMethods = [
    {
      icon: <Mail size={24} />,
      title: t("contact.methods.email.title"),
      description: t("contact.methods.email.description"),
      contact: t("contact.methods.email.contact"),
      action: () => window.open("mailto:support@aiworksheetpro.com"),
    },
    {
      icon: <MessageCircle size={24} />,
      title: t("contact.methods.whatsapp.title"),
      description: t("contact.methods.whatsapp.description"),
      contact: t("contact.methods.whatsapp.contact"),
      action: () => window.open("https://wa.me/9925012027"),
    },
    {
      icon: <Phone size={24} />,
      title: t("contact.methods.call.title"),
      description: t("contact.methods.call.description"),
      contact: t("contact.methods.call.contact"),
      action: () => window.open("tel:+15551234567"),
    },
  ];

  return (
    <div className={styles.contactPageWrapper}>
      {/* Header Section */}
      <div className={styles.contactPageHeader}>
        <h2 className={styles.title}>{t("contact.header")}</h2>
        <p className={styles.subtitle}>{t("contact.subtitle")}</p>
      </div>

      {/* Contact Methods */}
      <div className={styles.contactMethods}>
        <div className={styles.contactGrid}>
          {contactMethods.map((method, index) => (
            <div
              key={index}
              className={styles.contactCard}
              onClick={method.action}
            >
              <div className={styles.iconWrapper}>{method.icon}</div>
              <h3 className={styles.methodTitle}>{method.title}</h3>
              <p className={styles.methodDescription}>{method.description}</p>
              <div className={styles.contactInfo}>{method.contact}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
