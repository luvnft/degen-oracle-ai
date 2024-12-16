import React from 'react';

interface ErrorMessageProps {
  message: string;
  onRetry?: () => void;
}

const ErrorMessage = ({ message, onRetry }: ErrorMessageProps) => {
  return (
    <div className="bg-[#111111] rounded-lg border border-red-500/20 p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <span className="text-red-500">⚠️</span>
          <p className="text-red-500">{message}</p>
        </div>
        {onRetry && (
          <button
            onClick={onRetry}
            className="text-[#00FF00] hover:text-[#00FF00]/80 transition-colors"
          >
            Try Again
          </button>
        )}
      </div>
    </div>
  );
};

export default ErrorMessage; 