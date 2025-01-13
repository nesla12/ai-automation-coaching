import React, { useState } from 'react';
import { useLanguageStore } from '../../store/languageStore';
import { Globe, Check } from 'lucide-react';
import { useTranslation } from '../../hooks/useTranslation';
import { motion, AnimatePresence } from 'framer-motion';
import { useMediaQuery } from '../../hooks/useMediaQuery';

const languages = [
  { code: 'en', name: 'English' },
  { code: 'de', name: 'Deutsch' },
  { code: 'it', name: 'Italiano' },
] as const;

type LanguageCode = typeof languages[number]['code'];

export const LanguageSelector = () => {
  const { currentLanguage, setLanguage } = useLanguageStore();
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useTranslation();
  const isMobile = useMediaQuery('(max-width: 768px)');

  const handleLanguageChange = async (code: LanguageCode) => {
    await setLanguage(code);
    setIsOpen(false);
  };

  return (
    <div className="relative inline-block">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 px-3 py-2 rounded-lg bg-primary/10 dark:bg-white/10 hover:bg-primary/15 dark:hover:bg-primary/20 text-primary dark:text-white hover:text-primary-dark dark:hover:text-primary transition-all duration-300 backdrop-blur-sm shadow-lg hover:shadow-xl relative z-50"
        aria-label={t('common.selectLanguage')}
      >
        <Globe className="w-5 h-5" />
        <span className="hidden md:inline">{languages.find(l => l.code === currentLanguage)?.name}</span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute left-0 mt-2 z-50 py-2 w-auto min-w-[200px] bg-white/95 dark:bg-gray-800/95 backdrop-blur-xl rounded-lg shadow-xl border border-primary/10 dark:border-primary/20 transform origin-top-left"
            style={{ 
              maxHeight: '80vh',
              overflowY: 'auto'
            }}
          >
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => {
                setLanguage(lang.code);
                setIsOpen(false);
              }}
              className="flex items-center justify-between w-full px-4 py-2 text-left hover:bg-primary/10 dark:hover:bg-primary/20 transition-colors duration-200"
            >
              <span>{lang.name}</span>
              {currentLanguage === lang.code && (
                <Check className="w-4 h-4 text-primary" />
              )}
            </button>
          ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};