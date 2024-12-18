import React from 'react';

interface PageLayoutProps {
  title?: string;
  subtitle?: string;
  children: React.ReactNode;
  rightContent?: React.ReactNode;
}

const PageLayout: React.FC<PageLayoutProps> = ({ title, subtitle, children, rightContent }) => {
  return (
    <div className="min-h-screen bg-black">
      {/* Header */}
      {(title || subtitle || rightContent) && (
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 p-4 md:p-6">
          {(title || subtitle) && (
            <div>
              {title && <h1 className="text-2xl md:text-3xl font-bold text-white">{title}</h1>}
              {subtitle && (
                <p className="text-sm md:text-base text-gray-400 mt-1">{subtitle}</p>
              )}
            </div>
          )}
          {rightContent && (
            <div className="mt-4 md:mt-0 w-full md:w-auto">
              {rightContent}
            </div>
          )}
        </div>
      )}

      {/* Content */}
      <div>
        {children}
      </div>
    </div>
  );
};

export default PageLayout; 