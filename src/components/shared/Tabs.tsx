import React from 'react';

interface Tab {
  id: string;
  label: string;
  icon?: React.ReactNode;
}

interface TabsProps {
  tabs: Tab[];
  activeTab: string;
  onChange: (tabId: string) => void;
  variant?: 'default' | 'pills';
}

const Tabs = ({ tabs, activeTab, onChange, variant = 'default' }: TabsProps) => {
  const getTabStyles = (isActive: boolean) => {
    if (variant === 'pills') {
      return isActive
        ? 'bg-[#00FF00] text-black'
        : 'text-gray-400 hover:text-white hover:bg-[#1A1A1A]';
    }
    
    return isActive
      ? 'text-[#00FF00] border-b-2 border-[#00FF00]'
      : 'text-gray-400 hover:text-white border-b-2 border-transparent';
  };

  return (
    <div className={variant === 'default' ? 'border-b border-[#333333]' : ''}>
      <nav className="-mb-px flex space-x-4">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onChange(tab.id)}
            className={`
              px-4 py-2 font-medium text-sm
              transition-colors
              ${variant === 'pills' ? 'rounded-full' : ''}
              ${getTabStyles(activeTab === tab.id)}
            `}
          >
            <div className="flex items-center space-x-2">
              {tab.icon && <span>{tab.icon}</span>}
              <span>{tab.label}</span>
            </div>
          </button>
        ))}
      </nav>
    </div>
  );
};

export default Tabs; 