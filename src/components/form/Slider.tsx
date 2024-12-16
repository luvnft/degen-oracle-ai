import React, { useState, useRef, useEffect } from 'react';

interface SliderProps {
  min: number;
  max: number;
  step?: number;
  value: number;
  onChange: (value: number) => void;
  label?: string;
  showValue?: boolean;
  disabled?: boolean;
  formatValue?: (value: number) => string;
}

const Slider = ({
  min,
  max,
  step = 1,
  value,
  onChange,
  label,
  showValue = true,
  disabled = false,
  formatValue = (val) => val.toString()
}: SliderProps) => {
  const [isDragging, setIsDragging] = useState(false);
  const sliderRef = useRef<HTMLDivElement>(null);

  const getPercentage = () => {
    return ((value - min) / (max - min)) * 100;
  };

  const handleMove = (clientX: number) => {
    if (!sliderRef.current || disabled) return;

    const rect = sliderRef.current.getBoundingClientRect();
    const percentage = Math.max(0, Math.min(100, ((clientX - rect.left) / rect.width) * 100));
    const newValue = Math.round((percentage * (max - min)) / 100 / step) * step + min;
    onChange(newValue);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (disabled) return;
    setIsDragging(true);
    handleMove(e.clientX);
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging) {
        handleMove(e.clientX);
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging]);

  return (
    <div className="space-y-2">
      {(label || showValue) && (
        <div className="flex justify-between items-center">
          {label && (
            <span className="text-sm text-gray-400">{label}</span>
          )}
          {showValue && (
            <span className="text-sm font-medium">
              {formatValue(value)}
            </span>
          )}
        </div>
      )}
      <div
        ref={sliderRef}
        className={`
          h-2 relative rounded-full cursor-pointer
          ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
        `}
        onClick={(e) => !disabled && handleMove(e.clientX)}
      >
        <div className="absolute inset-0 rounded-full bg-[#333333]" />
        <div
          className="absolute inset-y-0 left-0 rounded-full bg-[#00FF00]"
          style={{ width: `${getPercentage()}%` }}
        />
        <div
          className={`
            absolute w-4 h-4 -mt-1 -ml-2 rounded-full bg-white border-2 border-[#00FF00]
            transform transition-transform
            ${isDragging ? 'scale-125' : ''}
          `}
          style={{ left: `${getPercentage()}%` }}
          onMouseDown={handleMouseDown}
        />
      </div>
    </div>
  );
};

export default Slider; 