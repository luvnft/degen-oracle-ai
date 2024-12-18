import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  hoverable?: boolean;
  noPadding?: boolean;
}

const Card: React.FC<CardProps> = ({ 
  children, 
  className = '', 
  onClick,
  hoverable = false,
  noPadding = false
}) => {
  return (
    <div 
      className={`
        bg-[#1A1A1A] 
        rounded-lg 
        ${!noPadding ? 'p-4 md:p-6' : ''}
        ${hoverable ? 'hover:bg-[#222222] transition-colors cursor-pointer' : ''}
        ${className}
      `}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

export default Card; 