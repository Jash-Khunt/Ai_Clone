import { Divider } from "antd";
import styles from "../styles/custom/QuotesSection.module.less";
import { useTranslation } from "react-i18next";

interface Quote {
  label: string;
  text: string;
}

const QuotesSection = () => {
  const { t } = useTranslation();

  // Cast the return type to Quote[]
  const quotes = t("quotesSection.items", {
    returnObjects: true,
  }) as Quote[];

  return (
    <div className={styles.quoteSection}>
      <Divider orientation="left">
        <span className={styles.titleWithIcon}>
          {t("quotesSection.heading")}
        </span>
      </Divider>
      <div className={styles.quotes}>
        {quotes.map((q, index) => (
          <div className={styles.quoteCard} key={index}>
            <b>{q.label}</b>
            <p>{q.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuotesSection;
