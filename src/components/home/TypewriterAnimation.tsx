import React, { useState, useEffect } from 'react';
import { useTranslation } from '../../hooks/useTranslation';

interface TypewriterAnimationProps {
  className?: string;
}

export const TypewriterAnimation: React.FC<TypewriterAnimationProps> = ({ className = '' }) => {
  const { t, currentLanguage } = useTranslation();
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [showCursor, setShowCursor] = useState(true);
  const [prefix, setPrefix] = useState('');
  const [words, setWords] = useState<string[]>([]);

  // Load translations
  useEffect(() => {
    const loadTranslations = async () => {
      const loadedPrefix = await t('home.hero.typewriter.prefix');
      const loadedWords = await Promise.all([
        t('home.hero.typewriter.words.0'),
        t('home.hero.typewriter.words.1'),
        t('home.hero.typewriter.words.2'),
        t('home.hero.typewriter.words.3'),
        t('home.hero.typewriter.words.4'),
      ]);
      setPrefix(loadedPrefix);
      setWords(loadedWords);
      // Reset animation when language changes
      setCurrentText('');
      setCurrentWordIndex(0);
      setIsDeleting(false);
    };

    loadTranslations();
  }, [currentLanguage, t]);

  // Blinking cursor effect
  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, 530);

    return () => clearInterval(cursorInterval);
  }, []);

  // Typewriter effect
  useEffect(() => {
    if (words.length === 0) return;
    
    const currentWord = words[currentWordIndex];
    
    const timeout = setTimeout(() => {
      if (!isDeleting) {
        // Typing
        if (currentText.length < currentWord.length) {
          setCurrentText(currentWord.slice(0, currentText.length + 1));
        } else {
          // Wait before starting to delete
          setTimeout(() => setIsDeleting(true), 2000);
        }
      } else {
        // Deleting
        if (currentText.length > 0) {
          setCurrentText(currentText.slice(0, -1));
        } else {
          // Move to next word
          setIsDeleting(false);
          setCurrentWordIndex((prev) => (prev + 1) % words.length);
        }
      }
    }, isDeleting ? 50 : 100); // Faster deletion, slower typing

    return () => clearTimeout(timeout);
  }, [currentText, isDeleting, currentWordIndex, words]);

  return (
    <h1 className={`text-4xl md:text-5xl lg:text-6xl font-bold ${className}`}>
      {prefix}{' '}
      <span className="relative inline-block">
        <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
          {currentText}
        </span>
        <span 
          className={`ml-1 inline-block w-0.5 h-[0.9em] bg-gradient-to-b from-primary to-secondary align-middle transition-opacity duration-100 ${
            showCursor ? 'opacity-100' : 'opacity-0'
          }`}
        />
      </span>
    </h1>
  );
};
