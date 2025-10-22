import React, { useState, useEffect, useContext } from 'react';
import { TranslationContext } from '../../contexts/TranslationContext';

export const TypewriterTitle: React.FC = () => {
  const context = useContext(TranslationContext);
  
  // Get translation values directly from context (synchronous)
  const staticText = context?.t('home.hero.typewriter.staticText') || '';
  const rotatingWordsRaw = context?.t('home.hero.typewriter.rotatingWords', { returnObjects: true });
  const rotatingWords = Array.isArray(rotatingWordsRaw) ? rotatingWordsRaw : [];

  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [showCursor, setShowCursor] = useState(true);

  // Typing speed settings
  const typingSpeed = 100; // ms per character when typing
  const deletingSpeed = 50; // ms per character when deleting
  const pauseAfterWord = 2000; // ms to pause after completing a word
  const pauseAfterDeleting = 500; // ms to pause after deleting

  useEffect(() => {
    if (rotatingWords.length === 0) return;

    const currentWord = rotatingWords[currentWordIndex];

    const timeout = setTimeout(() => {
      if (!isDeleting) {
        // Typing
        if (currentText.length < currentWord.length) {
          setCurrentText(currentWord.substring(0, currentText.length + 1));
        } else {
          // Finished typing, pause then start deleting
          setTimeout(() => setIsDeleting(true), pauseAfterWord);
        }
      } else {
        // Deleting
        if (currentText.length > 0) {
          setCurrentText(currentText.substring(0, currentText.length - 1));
        } else {
          // Finished deleting, move to next word
          setIsDeleting(false);
          setCurrentWordIndex((prev) => (prev + 1) % rotatingWords.length);
        }
      }
    }, isDeleting ? deletingSpeed : typingSpeed);

    return () => clearTimeout(timeout);
  }, [currentText, isDeleting, currentWordIndex, rotatingWords]);

  // Cursor blink effect
  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, 530);

    return () => clearInterval(cursorInterval);
  }, []);

  return (
    <h1 className="text-4xl md:text-5xl font-bold mb-6">
      {staticText}{' '}
      <span className="relative inline-block">
        <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
          {currentText}
        </span>
        <span
          className={`ml-0.5 inline-block w-0.5 h-[0.9em] bg-gradient-to-b from-primary to-secondary align-middle transition-opacity duration-100 ${
            showCursor ? 'opacity-100' : 'opacity-0'
          }`}
          style={{ verticalAlign: 'baseline', transform: 'translateY(0.05em)' }}
        />
      </span>
    </h1>
  );
};
