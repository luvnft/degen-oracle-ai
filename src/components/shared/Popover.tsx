import React, { useState, useRef, useEffect } from 'react';

interface PopoverProps {
  trigger: React.ReactNode;
  content: React.ReactNode;
  position?: 'top' | 'right' | 'bottom' | 'left';
  className?: string;
  closeOnClick?: boolean;
}

const Popover = ({
  trigger,
  content,
  position = 'bottom',
  className = '',
  closeOnClick = true
}: PopoverProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const popoverRef = useRef<HTMLDivElement>(null);

  const positions = {
    top: 'bottom-full left-1/2 -translate-x-1/2 mb-2',
    right: 'left-full top-1/2 -translate-y-1/2 ml-2',
    bottom: 'top-full left-1/2 -translate-x-1/2 mt-2',
    left: 'right-full top-1/2 -translate-y-1/2 mr-2'
  };

  const arrows = {
    top: 'bottom-[-6px] left-1/2 -translate-x-1/2 border-t-[#333333]',
    right: 'left-[-6px] top-1/2 -translate-y-1/2 border-r-[#333333]',
    bottom: 'top-[-6px] left-1/2 -translate-x-1/2 border-b-[#333333]',
    left: 'right-[-6px] top-1/2 -translate-y-1/2 border-l-[#333333]'
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (popoverRef.current && !popoverRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative inline-block" ref={popoverRef}>
      <div onClick={() => setIsOpen(!isOpen)}>{trigger}</div>
      
      {isOpen && (
        <div
          className={`
            absolute z-50 min-w-[200px]
            bg-[#111111] rounded-lg border border-[#333333]
            shadow-lg
            ${positions[position]}
            ${className}
          `}
          onClick={closeOnClick ? () => setIsOpen(false) : undefined}
        >
          {content}
          <div
            className={`
              absolute w-0 h-0
              border-4 border-transparent
              ${arrows[position]}
            `}
          />
        </div>
      )}
    </div>
  );
};

export default Popover; 