import React, { useEffect } from 'react';
import { Layout } from '../layout/Layout';
import { Sparkles } from 'lucide-react';

export const ConsultationBooking = () => {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://asset-tidycal.b-cdn.net/js/embed.js';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      // Find and remove the script to prevent memory leaks
      const existingScript = document.querySelector('script[src="https://asset-tidycal.b-cdn.net/js/embed.js"]');
      if (existingScript && existingScript.parentNode) {
        existingScript.parentNode.removeChild(existingScript);
      }
    };
  }, []);

  return (
    <Layout>
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold mb-6">
            Book Your Free{' '}
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              AI Consultation
            </span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Schedule a 30-minute consultation to discuss your automation needs and discover how AI can transform your business
          </p>
          <div className="flex items-center justify-center mt-6">
            <Sparkles className="w-6 h-6 text-primary mr-2" />
            <span className="text-lg text-primary font-medium">No cost, no obligation</span>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300">
          <div className="prose dark:prose-invert max-w-none mb-8">
            <h2 className="text-2xl font-bold mb-4">What to Expect</h2>
            <ul className="space-y-3">
              <li>Assessment of your current automation needs</li>
              <li>Discussion of potential AI solutions</li>
              <li>ROI estimation and implementation timeline</li>
              <li>Clear next steps and recommendations</li>
            </ul>
          </div>
          <div className="tidycal-embed" data-path="lorenzonesla/30-minute-meeting"></div>
        </div>
      </div>
    </Layout>
  );
};