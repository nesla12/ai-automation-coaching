import React, { useContext } from 'react';
import { Quote } from 'lucide-react';
import { TranslationContext } from '../../contexts/TranslationContext';

export const TestimonialsSection = () => {
  const { t } = useContext(TranslationContext)!;

  const title = t('home.testimonials.title');
  const company = t('home.testimonials.pensplanCentrum.company');
  const text = t('home.testimonials.pensplanCentrum.text');

  return (
    <section className="py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center mb-12">{title}</h2>
        <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-xl">
          <Quote className="w-8 h-8 text-primary mb-4" />
          <p className="text-lg text-gray-600 dark:text-gray-300 italic mb-6">
            "{text}"
          </p>
          <div className="flex items-center">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-bold text-sm mr-3">
              {company.charAt(0)}
            </div>
            <span className="font-semibold text-gray-900 dark:text-white">{company}</span>
          </div>
        </div>
      </div>
    </section>
  );
};
