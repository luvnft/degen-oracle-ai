import React from 'react';
import { useToast } from '../../context/ToastContext';

const ToastContainer = () => {
  const { toasts, hideToast } = useToast();

  const getToastStyles = (type: 'success' | 'error' | 'info') => {
    switch (type) {
      case 'success':
        return 'border-[#00FF00]/20 text-[#00FF00]';
      case 'error':
        return 'border-red-500/20 text-red-500';
      case 'info':
        return 'border-blue-500/20 text-blue-500';
    }
  };

  return (
    <div className="fixed bottom-4 right-4 space-y-2 z-50">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`bg-[#111111] rounded-lg border p-4 min-w-[300px] animate-slide-up ${getToastStyles(toast.type)}`}
        >
          <div className="flex items-center justify-between">
            <p>{toast.message}</p>
            <button
              onClick={() => hideToast(toast.id)}
              className="text-gray-400 hover:text-white ml-4"
            >
              ✕
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ToastContainer; 