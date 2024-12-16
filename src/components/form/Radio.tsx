import React from 'react';

interface RadioOption {
  value: string;
  label: string;
}

interface RadioProps {
  options: RadioOption[];
  value: string;
  onChange: (value: string) => void;
  name: string;
  disabled?: boolean;
  error?: string;
  direction?: 'horizontal' | 'vertical';
}

const Radio = ({
  options,
  value,
  onChange,
  name,
  disabled,
  error,
  direction = 'vertical'
}: RadioProps) => {
  return (
    <div className="space-y-2">
      <div className={`space-${direction === 'vertical' ? 'y' : 'x'}-4`}>
        {options.map((option) => (
          <label
            key={option.value}
            className={`
              inline-flex items-center
              ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
            `}
          >
            <div className="relative">
              <input
                type="radio"
                className="sr-only"
                name={name}
                value={option.value}
                checked={value === option.value}
                onChange={(e) => onChange(e.target.value)}
                disabled={disabled}
              />
              <div
                className={`
                  w-5 h-5 rounded-full border-2
                  ${value === option.value
                    ? 'border-[#00FF00]'
                    : 'border-[#333333]'
                  }
                  ${error ? 'border-red-500' : ''}
                `}
              >
                {value === option.value && (
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full bg-[#00FF00]" />
                )}
              </div>
            </div>
            <span className="ml-3">{option.label}</span>
          </label>
        ))}
      </div>
      {error && (
        <p className="text-sm text-red-500">{error}</p>
      )}
    </div>
  );
};

export default Radio; 