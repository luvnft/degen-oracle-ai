import React from 'react';

interface SwitchProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
  description?: string;
  disabled?: boolean;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const Switch = ({
  checked,
  onChange,
  label,
  description,
  disabled = false,
  size = 'md',
  className = ''
}: SwitchProps) => {
  const sizes = {
    sm: {
      switch: 'w-8 h-4',
      dot: 'w-3 h-3',
      translate: 'translate-x-4',
    },
    md: {
      switch: 'w-11 h-6',
      dot: 'w-5 h-5',
      translate: 'translate-x-5',
    },
    lg: {
      switch: 'w-14 h-7',
      dot: 'w-6 h-6',
      translate: 'translate-x-7',
    },
  };

  return (
    <label className={`relative inline-flex items-center ${disabled ? 'cursor-not-allowed' : 'cursor-pointer'} ${className}`}>
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        disabled={disabled}
        className="sr-only peer"
      />
      
      <div
        className={`
          ${sizes[size].switch}
          bg-[#333333] rounded-full
          peer peer-focus:ring-2 peer-focus:ring-[#88D693]/20
          peer-checked:bg-[#88D693]
          peer-disabled:opacity-50
          transition-colors
        `}
      >
        <div
          className={`
            ${sizes[size].dot}
            absolute left-0.5 top-0.5
            bg-white rounded-full transition-transform
            peer-checked:${sizes[size].translate}
          `}
        />
      </div>
      
      {label && (
        <span className={`ml-3 ${disabled ? 'opacity-50' : ''}`}>
          {label}
        </span>
      )}
    </label>
  );
};

export default Switch; 