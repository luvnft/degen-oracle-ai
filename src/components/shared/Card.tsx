import React from 'react';

interface CardProps {
  children: React.ReactNode;
  title?: string;
  subtitle?: string;
  actions?: React.ReactNode;
  variant?: 'default' | 'hover' | 'active';
  className?: string;
}

const Card = ({
  children,
  title,
  subtitle,
  actions,
  variant = 'default',
  className = ''
}: CardProps) => {
  const variants = {
    default: '',
    hover: 'hover:border-[#00FF00]/50 transition-colors cursor-pointer',
    active: 'border-[#00FF00]'
  };

  return (
    <div className={`
      bg-[#111111] rounded-lg border border-[#333333]
      ${variants[variant]}
      ${className}
    `}>
      {(title || subtitle || actions) && (
        <div className="p-6 border-b border-[#333333]">
          <div className="flex justify-between items-start">
            <div>
              {title && (
                <h3 className="text-lg font-semibold">{title}</h3>
              )}
              {subtitle && (
                <p className="mt-1 text-sm text-gray-400">{subtitle}</p>
              )}
            </div>
            {actions && (
              <div className="ml-4">{actions}</div>
            )}
          </div>
        </div>
      )}
      <div className="p-6">{children}</div>
    </div>
  );
};

export default Card; 