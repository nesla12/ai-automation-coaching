import React, { useState, useEffect, useCallback } from 'react';
import { useTranslation } from '../../hooks/useTranslation';

interface TypewriterAnimationProps {
  className?: string;
}

export const TypewriterAnimation: React.FC<TypewriterAnimationProps> = ({ className = '' }) => {
  const { t } = useTranslation();
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0);
  const [showCursor, setShowCursor] = useState(true);

  // Get the static text and typewriter phrases for current language
  const staticText = t('typewriter.staticText') as string;
  const phrases = t('typewriter.phrases', { returnObjects: true }) as string[];

  const typeWriter = useCallback(() => {
    if (!phrases || phrases.length === 0) return;

    const currentPhrase = phrases[currentPhraseIndex];
    
    if (!isDeleting) {
      // Typing phase
      if (currentIndex < currentPhrase.length) {
        setDisplayText(currentPhrase.substring(0, currentIndex + 1));
        setCurrentIndex(currentIndex + 1);
        setTimeout(typeWriter, 80); // Slightly slower for better readability
      } else {
        // Finished typing, wait before deleting
        setTimeout(() => setIsDeleting(true), 2500);
      }
    } else {
      // Deleting phase
      if (currentIndex > 0) {
        setDisplayText(currentPhrase.substring(0, currentIndex - 1));
        setCurrentIndex(currentIndex - 1);
        setTimeout(typeWriter, 40); // Faster deletion
      } else {
        // Finished deleting, move to next phrase
        setIsDeleting(false);
        setCurrentPhraseIndex((prev) => (prev + 1) % phrases.length);
        setTimeout(typeWriter, 200); // Brief pause before next phrase
      }
    }
  }, [currentIndex, isDeleting, currentPhraseIndex, phrases]);

  useEffect(() => {
    const timer = setTimeout(typeWriter, 100);
    return () => clearTimeout(timer);
  }, [typeWriter]);

  // Cursor blinking effect
  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 600);

    return () => clearInterval(cursorInterval);
  }, []);

  if (!phrases || phrases.length === 0 || !staticText) {
    return (
      <span className="text-xl font-extrabold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
        AI Automation Coach
      </span>
    );
  }

  return (
    <div className={`inline-block ${className}`}>
      <span className="text-xl font-extrabold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
        {staticText}{' '}
        <span className="inline-block">
          {displayText}
          <span 
            className={`inline-block w-0.5 h-6 bg-gradient-to-b from-primary to-secondary ml-1 transition-opacity duration-200 ${
              showCursor ? 'opacity-100' : 'opacity-0'
            }`}
          />
        </span>
      </span>
    </div>
  );
};