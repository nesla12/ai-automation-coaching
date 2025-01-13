import React, { useEffect } from 'react';
import { motion } from 'framer-motion';

interface WorkshopBookingProps {
  onClose?: () => void;
}

export const WorkshopBooking: React.FC<WorkshopBookingProps> = ({ onClose }) => {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://asset-tidycal.b-cdn.net/js/embed.js';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50"
    >
      <motion.div
        initial={{ y: 20 }}
        animate={{ y: 0 }}
        className="bg-white dark:bg-gray-800 rounded-xl p-8 max-w-md w-full shadow-2xl relative"
      >
        {onClose && (
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
          >
            ×
          </button>
        )}
        <div className="tidycal-embed" data-path="lorenzonesla/1-day-workshop"></div>
      </motion.div>
    </motion.div>
  );
};