import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import usePersistentState from '../utils/usePersistentState';
import { useLanguageDirection } from './useLanguageDirection';

export function useAppLanguage() {
  const { i18n } = useTranslation();

  const [selectedLanguage, setSelectedLanguage] = usePersistentState(
    'language',
    localStorage.getItem('language')?.toUpperCase() || i18n.language.toUpperCase()
  );
  const [selectedRegion, setSelectedRegion] = usePersistentState('region', 'IN');

  const { isRTL } = useLanguageDirection(selectedLanguage);

  useEffect(() => {
    i18n.changeLanguage(selectedLanguage.toLowerCase());
  }, [selectedLanguage, i18n]);

  const handleLanguageChange = (lang: string) => {
    setSelectedLanguage(lang.toUpperCase());
    i18n.changeLanguage(lang.toLowerCase());
  };

  return {
    selectedLanguage,
    setSelectedLanguage,
    selectedRegion,
    setSelectedRegion,
    isRTL,
    handleLanguageChange,
  };
}
