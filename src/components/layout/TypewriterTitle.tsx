import React, { useState, useEffect, useContext } from 'react';
import { TranslationContext } from '../../contexts/TranslationContext';

interface TypewriterTitleProps {
  className?: string;
}

export const TypewriterTitle: React.FC<TypewriterTitleProps> = ({ className = '' }) => {
  const context = useContext(TranslationContext);
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [currentTermIndex, setCurrentTermIndex] = useState(0);

  if (!context) {
    return <span className={className}>AI Automation Coach</span>;
  }

  const { t, currentLanguage } = context;

  // Get the base text and terms from translations
  const baseText = t('home.hero.typewriter.base');
  const terms = t('home.hero.typewriter.terms', { returnObjects: true }) as string[];
  
  const currentTerm = terms[currentTermIndex] || '';

  useEffect(() => {
    const typeSpeed = 100; // milliseconds per character
    const deleteSpeed = 50; // milliseconds per character when deleting
    const pauseTime = 2000; // pause time between terms

    const timer = setTimeout(() => {
      if (!isDeleting) {
        // Typing
        if (currentIndex < currentTerm.length) {
          setDisplayText(currentTerm.substring(0, currentIndex + 1));
          setCurrentIndex(currentIndex + 1);
        } else {
          // Finished typing, pause then start deleting
          setTimeout(() => {
            setIsDeleting(true);
          }, pauseTime);
        }
      } else {
        // Deleting
        if (currentIndex > 0) {
          setDisplayText(currentTerm.substring(0, currentIndex - 1));
          setCurrentIndex(currentIndex - 1);
        } else {
          // Finished deleting, move to next term
          setIsDeleting(false);
          setCurrentTermIndex((prevIndex) => (prevIndex + 1) % terms.length);
        }
      }
    }, isDeleting ? deleteSpeed : typeSpeed);

    return () => clearTimeout(timer);
  }, [currentIndex, isDeleting, currentTerm, terms.length, currentTermIndex]);

  // Reset when language changes
  useEffect(() => {
    setDisplayText('');
    setCurrentIndex(0);
    setIsDeleting(false);
    setCurrentTermIndex(0);
  }, [currentLanguage]);

  return (
    <span className={`${className} relative`}>
      {baseText} {displayText}
      <span className="animate-pulse text-primary dark:text-primary-light ml-1">|</span>
    </span>
  );
};