import React from 'react';

interface SuccessMessageProps {
  message: string;
  onClose?: () => void;
}

const SuccessMessage = ({ message, onClose }: SuccessMessageProps) => {
  return (
    <div className="bg-[#111111] rounded-lg border border-[#00FF00]/20 p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <span className="text-[#00FF00]">✓</span>
          <p className="text-[#00FF00]">{message}</p>
        </div>
        {onClose && (
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            ✕
          </button>
        )}
      </div>
    </div>
  );
};

export default SuccessMessage; 