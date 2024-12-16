import React from 'react';
import { ChartBarIcon, CurrencyDollarIcon, UserGroupIcon, ArrowTrendingUpIcon } from '@heroicons/react/24/outline';

interface TrendMetric {
  title: string;
  value: string;
  change: string;
  icon: React.ReactNode;
}

interface TrendOverviewProps {
  metrics: TrendMetric[];
}

export const TrendOverview = ({ metrics }: TrendOverviewProps) => {
  return (
    <div className="grid grid-cols-4 gap-4">
      {metrics.map((metric, index) => (
        <div key={index} className="bg-[#111111] rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-400 text-sm">{metric.title}</span>
            <div className="text-gray-400">
              {metric.icon}
            </div>
          </div>
          <div className="text-2xl font-bold">{metric.value}</div>
          <div className={`text-sm mt-1 ${
            metric.change.startsWith('+') ? 'text-[#88D693]' : 'text-red-400'
          }`}>
            {metric.change}
          </div>
        </div>
      ))}
    </div>
  );
}; 