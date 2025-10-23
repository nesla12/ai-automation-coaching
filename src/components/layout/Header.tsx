import React, { useState, useEffect } from 'react';
import { Book, Users, Workflow, Menu, X, Sun, Moon, Sparkles } from 'lucide-react';
import { Button } from '../ui/Button';
import { Link, useLocation } from 'react-router-dom';
import { LanguageSelector } from './LanguageSelector';
import { TypewriterTitle } from './TypewriterTitle';
import { useThemeStore } from '../../store/themeStore';
import { motion, AnimatePresence } from 'framer-motion';

export const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const isDark = useThemeStore((state) => state.isDark);
  const toggleTheme = useThemeStore((state) => state.toggleTheme);
  const location = useLocation();

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  const menuVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 }
  };

  return (
    <header className="sticky top-0 z-50 menu-background border-b border-gray-200/50 dark:border-gray-800/50">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group">
            <span className="text-xl font-extrabold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              <TypewriterTitle />
            </span>
          </Link>

          {/* Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg bg-primary/10 dark:bg-white/10 hover:bg-primary/15 dark:hover:bg-primary/20 text-primary dark:text-white hover:text-primary-dark dark:hover:text-primary transition-all duration-300 backdrop-blur-sm shadow-lg hover:shadow-xl relative"
              aria-label="Toggle theme"
            >
              {isDark ? (
                <Sun className="w-5 h-5" />
              ) : (
                <Moon className="w-5 h-5" />
              )}
            </button>
            <Link to="/about" className="font-bold text-lg text-gray-800 dark:text-gray-200 hover:text-primary dark:hover:text-primary transition-all duration-300">
              About
            </Link>
            
            <Link to="/services/make-automation" className="font-bold text-lg text-gray-800 dark:text-gray-200 hover:text-primary dark:hover:text-primary transition-all duration-300">
              AI Automations
            </Link>
            
            <Link to="/workshops" className="font-bold text-lg text-gray-800 dark:text-gray-200 hover:text-primary dark:hover:text-primary transition-all duration-300">
              Team Training
            </Link>
            
            <Link 
              to="/guides" 
              className="relative group font-bold text-lg"
            >
              <span className="absolute -top-2 -right-2 px-2 py-0.5 text-xs font-bold bg-gradient-to-r from-primary to-secondary text-white rounded-full scale-0 group-hover:scale-100 transition-all duration-300 shadow-lg">
                Free
              </span>
              <span className="bg-gradient-to-r from-gray-800 to-gray-600 dark:from-gray-200 dark:to-gray-400 group-hover:from-primary group-hover:to-secondary bg-clip-text text-transparent transition-all duration-300">
                Guides
              </span>
            </Link>

            <Link to="/assessment">
              <Button 
                size="sm" 
                className="relative group overflow-hidden font-bold"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-primary to-secondary opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <span className="relative z-10 flex items-center">
                  Free Assessment
                  <Sparkles className="ml-2 w-4 h-4 opacity-0 group-hover:opacity-100 transition-all duration-300" />
                </span>
              </Button>
            </Link>
            <LanguageSelector />
          </div>

          {/* Mobile menu button */}
          <button
            className="lg:hidden p-2 rounded-md text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={{
                hidden: { opacity: 0, height: 0, y: -20 },
                visible: { opacity: 1, height: 'auto', y: 0 },
                exit: { opacity: 0, height: 0, y: -20 }
              }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className="lg:hidden py-4 space-y-4"
            >
            <div className="space-y-4 px-2">
              <div className="flex items-center justify-between px-3 py-2">
                <LanguageSelector />
                <button
                  onClick={toggleTheme}
                  className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                  aria-label="Toggle theme"
                >
                  {isDark ? (
                    <Sun className="w-5 h-5" />
                  ) : (
                    <Moon className="w-5 h-5" />
                  )}
                </button>
              </div>
              <Link
                to="/about"
                className="block px-3 py-2 rounded-md text-base font-bold text-gray-800 dark:text-gray-200 hover:text-primary dark:hover:text-primary"
              >
                About
              </Link>
              <Link
                to="/services/make-automation"
                className="block px-3 py-2 rounded-md text-base font-bold text-gray-800 dark:text-gray-200 hover:text-primary dark:hover:text-primary"
              >
                AI Automations
              </Link>
              <Link
                to="/workshops"
                className="block px-3 py-2 rounded-md text-base font-bold text-gray-800 dark:text-gray-200 hover:text-primary dark:hover:text-primary"
              >
                Team Training
              </Link>
              <Link
                to="/guides"
                className="block px-3 py-2 rounded-md text-base font-bold text-gray-800 dark:text-gray-200 hover:text-primary dark:hover:text-primary"
              >
                Free Guides
              </Link>
              <Link
                to="/assessment"
                className="block px-3 py-2 rounded-md text-base font-bold text-primary hover:text-primary-dark"
              >
                Free Assessment
              </Link>
            </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
};