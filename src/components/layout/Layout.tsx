import React from 'react';
import { Footer } from './Footer';
import { Header } from './Header';
import { EarthBackground } from './EarthBackground';
import { Breadcrumbs } from '../navigation/Breadcrumbs';
import { useThemeStore } from '../../store/themeStore';
import { useLocation } from 'react-router-dom';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const isDark = useThemeStore((state) => state.isDark);
  const location = useLocation();
  const showBreadcrumbs = location.pathname !== '/';

  return (
    <div className={isDark ? 'dark' : ''}>
      <EarthBackground />
      <div className="relative min-h-screen flex flex-col backdrop-blur-[2px] overflow-x-hidden">
        <Header />
        <main className="flex-grow bg-transparent text-text-light dark:text-text-dark relative z-10">
          {showBreadcrumbs && (
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
              <Breadcrumbs />
            </div>
          )}
          {children}
        </main>
        <Footer />
      </div>
    </div>
  );
};