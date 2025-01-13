import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, XCircle, X } from 'lucide-react';

interface ToastProps {
  message: string;
  type: 'success' | 'error';
  onClose: () => void;
}

export const Toast: React.FC<ToastProps> = ({ message, type, onClose }) => {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 50 }}
        className={`fixed bottom-4 right-4 flex items-center p-4 rounded-lg shadow-lg ${
          type === 'success' ? 'bg-green-500' : 'bg-red-500'
        } text-white z-50`}
      >
        {type === 'success' ? (
          <CheckCircle className="w-5 h-5 mr-2" />
        ) : (
          <XCircle className="w-5 h-5 mr-2" />
        )}
        <span>{message}</span>
        <button
          onClick={onClose}
          className="ml-4 hover:opacity-75 transition-opacity"
        >
          <X className="w-4 h-4" />
        </button>
      </motion.div>
    </AnimatePresence>
  );
};