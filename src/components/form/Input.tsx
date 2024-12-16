import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  suffix?: React.ReactNode;
  containerClassName?: string;
}

export const Input: React.FC<InputProps> = ({
  label,
  error,
  suffix,
  className = '',
  containerClassName = '',
  disabled = false,
  ...props
}) => {
  return (
    <div className={`space-y-1 ${containerClassName}`}>
      {label && (
        <label className="block text-sm text-gray-400">
          {label}
        </label>
      )}
      <div className="relative flex items-center">
        <input
          className={`
            w-full px-3 py-1.5 
            bg-[#222222] 
            rounded-lg 
            border border-[#333333] 
            text-white 
            focus:outline-none focus:border-[#88D693]
            disabled:opacity-50 disabled:cursor-not-allowed
            ${error ? 'border-red-500' : ''}
            ${className}
          `}
          disabled={disabled}
          {...props}
        />
        {suffix && (
          <div className="absolute right-3 text-gray-400">
            {suffix}
          </div>
        )}
      </div>
      {error && (
        <p className="text-sm text-red-500">{error}</p>
      )}
    </div>
  );
}; 