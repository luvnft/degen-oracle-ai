import React from 'react';

interface ProgressBarProps {
  value: number;
  max?: number;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'gradient';
  showValue?: boolean;
  animate?: boolean;
}

const ProgressBar = ({
  value,
  max = 100,
  size = 'md',
  variant = 'default',
  showValue = false,
  animate = true,
}: ProgressBarProps) => {
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100);

  const sizes = {
    sm: 'h-1',
    md: 'h-2',
    lg: 'h-3',
  };

  const variants = {
    default: 'bg-[#00FF00]',
    gradient: 'bg-gradient-to-r from-[#00FF00] to-[#00FF00]/60',
  };

  return (
    <div className="space-y-1">
      {showValue && (
        <div className="flex justify-between text-sm">
          <span className="text-gray-400">Progress</span>
          <span>{Math.round(percentage)}%</span>
        </div>
      )}
      <div className={`w-full bg-[#333333] rounded-full overflow-hidden ${sizes[size]}`}>
        <div
          className={`
            ${variants[variant]}
            rounded-full
            ${animate ? 'transition-all duration-500' : ''}
          `}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};

export default ProgressBar; 