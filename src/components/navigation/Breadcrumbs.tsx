import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';

export const Breadcrumbs = () => {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter(x => x);

  const breadcrumbMap: { [key: string]: string } = {
    guides: 'Guides',
    services: 'Services',
    'make-automation': 'Make Automation',
    workshops: 'Workshops',
    assessment: 'Assessment',
    contact: 'Contact',
    about: 'About',
    legal: 'Legal',
    privacy: 'Privacy Policy',
    terms: 'Terms of Service'
  };

  return (
    <nav className="flex items-center space-x-2 text-sm mb-8 p-4 rounded-2xl bg-gradient-to-r from-primary/5 to-secondary/5 backdrop-blur-sm">
      <Link to="/" className="hover:text-primary transition-colors">
        <Home className="w-4 h-4" />
      </Link>
      {pathnames.map((name, index) => {
        const routeTo = `/${pathnames.slice(0, index + 1).join('/')}`;
        const isLast = index === pathnames.length - 1;

        return (
          <React.Fragment key={name}>
            <ChevronRight className="w-4 h-4" />
            {isLast ? (
              <span className="text-primary font-medium bg-primary/10 px-3 py-1 rounded-full">
                {breadcrumbMap[name] || name}
              </span>
            ) : (
              <Link
                to={routeTo}
                className="hover:text-primary transition-colors px-3 py-1 rounded-full hover:bg-primary/5"
              >
                {breadcrumbMap[name] || name}
              </Link>
            )}
          </React.Fragment>
        );
      })}
    </nav>
  );
};