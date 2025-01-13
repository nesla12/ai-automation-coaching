import { useContext, useCallback } from 'react';
import { TranslationContext } from '../contexts/TranslationContext';
import type { TranslationContextType } from '../contexts/TranslationContext';
import { translateText } from '../services/translationService';

export const useTranslation = (): TranslationContextType => {
  const context = useContext(TranslationContext);

  if (!context) {
    throw new Error('useTranslation must be used within TranslationProvider');
  }

  const t = useCallback(async (key: string, options?: any) => {
    const baseTranslation = context.t(key, options);
    
    // Only translate if not in default language (English)
    if (context.currentLanguage !== 'en') {
      return translateText(baseTranslation, context.currentLanguage);
    }
    
    return baseTranslation;
  }, [context]);

  return {
    t,
    currentLanguage: context.currentLanguage,
    changeLanguage: context.changeLanguage
  };
};