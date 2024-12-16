import React from 'react';

interface LegendItem {
  label: string;
  value: string | number;
  color: string;
  percentage?: number;
}

interface ChartLegendProps {
  items: LegendItem[];
  variant?: 'horizontal' | 'vertical';
}

const ChartLegend = ({ items, variant = 'vertical' }: ChartLegendProps) => {
  return (
    <div className={`flex ${variant === 'vertical' ? 'flex-col space-y-3' : 'space-x-6'}`}>
      {items.map((item, index) => (
        <div key={index} className="flex items-center space-x-3">
          <div className="flex items-center space-x-2">
            <div
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: item.color }}
            />
            <span className="text-sm text-gray-400">{item.label}</span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="font-medium">{item.value}</span>
            {item.percentage && (
              <span className={`
                text-sm
                ${item.percentage > 0 ? 'text-[#00FF00]' : 'text-red-500'}
              `}>
                {item.percentage > 0 ? '+' : ''}{item.percentage}%
              </span>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ChartLegend; 