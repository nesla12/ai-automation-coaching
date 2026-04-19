import { useContext } from 'react';
import { TranslationContext } from '../contexts/TranslationContext';
import type { TranslationContextType } from '../contexts/TranslationContext';

export const useTranslation = (): TranslationContextType => {
  const context = useContext(TranslationContext);

  if (!context) {
    throw new Error('useTranslation must be used within TranslationProvider');
  }

  return {
    t: context.t,
    currentLanguage: context.currentLanguage,
    changeLanguage: context.changeLanguage,
  };
};