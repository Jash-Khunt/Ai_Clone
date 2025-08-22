import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

export function useLanguageDirection(selectedLanguage: string) {
  const { i18n } = useTranslation();
  const isRTL = selectedLanguage.toLowerCase() === 'ar';

  useEffect(() => {
    document.documentElement.setAttribute('dir', isRTL ? 'rtl' : 'ltr');
    i18n.changeLanguage(selectedLanguage.toLowerCase());
  }, [selectedLanguage, isRTL, i18n]);

  return { isRTL };
}
