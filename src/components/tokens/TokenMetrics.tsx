import React from 'react';
import { formatNumber } from '../../utils/format';
import { Skeleton } from '../shared/Skeleton';

interface TokenMetricsProps {
  title: string;
  value: string | number;
  change?: number;
  subtext?: string;
  loading?: boolean;
}

const TokenMetrics = ({ title, value, change, subtext, loading = false }: TokenMetricsProps) => {
  if (loading) {
    return (
      <div className="bg-[#111111] p-4 rounded-lg border border-[#333333]">
        <Skeleton className="h-5 w-24 mb-3" />
        <Skeleton className="h-7 w-32 mb-2" />
        <Skeleton className="h-4 w-16" />
      </div>
    );
  }

  return (
    <div className="bg-[#111111] p-4 rounded-lg border border-[#333333] hover:border-[#444444] transition-colors">
      <h3 className="text-sm text-gray-400 mb-1">{title}</h3>
      <div className="flex items-baseline space-x-2">
        <span className="text-xl font-medium">
          {typeof value === 'number' ? formatNumber(value) : value}
        </span>
        {change !== undefined && (
          <span className={`text-sm ${change >= 0 ? 'text-[#88D693]' : 'text-[rgb(240,148,164)]'}`}>
            {change >= 0 ? '+' : ''}{change}%
          </span>
        )}
      </div>
      {subtext && (
        <span className="text-xs text-gray-500">{subtext}</span>
      )}
    </div>
  );
};

export default TokenMetrics; 