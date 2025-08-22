import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import translationEN from '../i18n/locales/en/translation.json';
import translationGU from '../i18n/locales/gu/translation.json';
import translationAR from '../i18n/locales/ar/translation.json';
import translationHI from '../i18n/locales/hi/translation.json'; 

const resources = {
  en: { translation: translationEN },
  gu: { translation: translationGU },
  ar: { translation: translationAR },
  hi: { translation: translationHI }, 
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    debug: false,
    interpolation: { escapeValue: false },
    detection: {
      order: ['querystring', 'cookie', 'localStorage', 'navigator', 'htmlTag'],
      caches: ['localStorage', 'cookie'],
    },
  });

export default i18n;
