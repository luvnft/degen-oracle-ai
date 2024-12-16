import React, { useState, useEffect } from 'react';
import { ChartBarIcon, CurrencyDollarIcon, UserGroupIcon, ArrowTrendingUpIcon } from '@heroicons/react/24/outline';
import { TrendOverview } from '../components/trends/TrendOverview';
import { PieChart } from '../components/charts/PieChart';
import Select from '../components/form/Select';
import { TrendCharts } from '../components/trends/TrendCharts';
import TokenTable from '../components/tokens/TokenTable';

export default function Trends() {
  const [timeRange, setTimeRange] = useState<'24h' | '7d' | '30d'>('24h');
  const [loading, setLoading] = useState(false);

  const metrics = [
    {
      title: 'Total AI Market Cap',
      value: '$125.5M',
      change: '+15.2%',
      icon: <ChartBarIcon className="h-6 w-6" />
    },
    {
      title: '24h Volume',
      value: '$45.2M',
      change: '+22.3%',
      icon: <CurrencyDollarIcon className="h-6 w-6" />
    },
    {
      title: 'Total AI Tokens',
      value: '156',
      change: '+12',
      icon: <UserGroupIcon className="h-6 w-6" />
    },
    {
      title: 'Hot Trend',
      value: 'Agent AI',
      change: '↑',
      icon: <ArrowTrendingUpIcon className="h-6 w-6" />
    }
  ];

  // Mock data for charts
  const volumeData = Array.from({ length: 30 }, (_, i) => ({
    time: new Date(Date.now() - (30 - i) * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    value: Math.random() * 1000000 + 500000
  }));

  const growthData = Array.from({ length: 30 }, (_, i) => ({
    time: new Date(Date.now() - (30 - i) * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    value: Math.random() * 1000000 + 500000
  }));

  // Mock data for top tokens
  const topTokens = [
    {
      name: 'DegenAI',
      symbol: 'DGNAI',
      address: '0xabcd...ef12',
      age: '5d',
      liquidity: 150000,
      marketCap: 800000,
      holders: 2200,
      hourlyTransactions: 0,
      hourlyVolume: 35000,
      price: 0.45,
      currentPrice: 0.45,
      priceChange1h: -2.50,
      priceChange5m: -1.20,
      priceChange1m: -0.80,
      top10HoldersPercent: 38,
      devActivity: { action: 'ADD' },
      twitter: 'https://twitter.com/degenai',
      telegram: 'https://t.me/degenai',
      website: 'https://degenai.io',
      logo: '/path/to/logo.png',
      isWatchlisted: false,
    },
    {
      name: 'Neural Net',
      symbol: 'NNET',
      address: '0x1357...4680',
      age: '3d',
      liquidity: 150000,
      marketCap: 950000,
      holders: 1200,
      hourlyTransactions: 0,
      hourlyVolume: 45000,
      price: 0.85,
      currentPrice: 0.85,
      priceChange1h: -1.50,
      priceChange5m: -0.80,
      priceChange1m: -0.30,
      top10HoldersPercent: 35,
      devActivity: { action: 'HOLD' },
      twitter: 'https://twitter.com/neuralnet',
      telegram: 'https://t.me/neuralnet',
      website: 'https://neuralnet.io',
      logo: '/path/to/logo.png',
      isWatchlisted: false,
    },
    // ... Add more tokens as needed
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Market Trends</h1>
          <p className="text-gray-400">Current market trends and top performing tokens</p>
        </div>
        <div className="bg-[#111111] rounded-lg flex">
          {['24h', '7d', '30d'].map((range) => (
            <button
              key={range}
              onClick={() => setTimeRange(range as '24h' | '7d' | '30d')}
              className={`px-4 py-2 text-sm font-medium ${
                timeRange === range
                  ? 'text-white bg-[#1A1A1A]'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              {range}
            </button>
          ))}
        </div>
      </div>

      {/* Overview */}
      <TrendOverview metrics={metrics} />

      {/* Charts */}
      <TrendCharts
        volumeData={volumeData}
        growthData={growthData}
      />

      {/* Top Tokens */}
      <div className="bg-[#111111] rounded-lg">
        <div className="px-6 py-4 border-b border-[#333333]">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-medium">Top AI Tokens</h2>
            <span className="text-sm text-gray-400">
              Showing top performing tokens in the last {timeRange}
            </span>
          </div>
        </div>
        <TokenTable
          data={topTokens}
          loading={loading}
          error={null}
        />
      </div>
    </div>
  );
} 