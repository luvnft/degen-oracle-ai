import React from 'react';
import PageLayout from '../components/layout/PageLayout';
import Card from '../components/ui/Card';
import { FaArrowUp, FaArrowDown } from 'react-icons/fa';
import TradingViewWidget from '../components/widgets/TradingViewWidget';

const MarketTrends = () => {
  const marketStats = {
    totalMarketCap: '$1.23B',
    volume24h: '$456.7M',
    totalTokens: '2,345',
    hotTrend: 'AI Agents'
  };

  const trendingCategories = [
    {
      category: 'AI Agents',
      volume24h: '$123.4M',
      volumeChange: '+12.3%',
      tokens: 234,
      topToken: 'AGENT',
      price: '$0.0234',
      change: '+5.67%'
    },
    {
      category: 'Neural Networks',
      volume24h: '$98.7M',
      volumeChange: '+8.9%',
      tokens: 189,
      topToken: 'NEURAL',
      price: '$0.0567',
      change: '+3.45%'
    },
    {
      category: 'Machine Learning',
      volume24h: '$76.5M',
      volumeChange: '-2.3%',
      tokens: 156,
      topToken: 'LEARN',
      price: '$0.0123',
      change: '-1.23%'
    }
  ];

  const getChangeColor = (value: string) => {
    return value.startsWith('+') ? 'text-[#88D693]' : 'text-[rgb(240,148,164)]';
  };

  return (
    <div className="min-h-screen bg-black">
      {/* Time Range Selector */}
      <div className="flex justify-end mb-4">
        <div className="bg-[#111111] rounded-lg overflow-hidden">
          <div className="flex">
            <button className="px-4 py-2 text-white bg-[#222222]">24h</button>
            <button className="px-4 py-2 text-gray-400">7d</button>
            <button className="px-4 py-2 text-gray-400">30d</button>
          </div>
        </div>
      </div>

      {/* Market Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <Card className="bg-[#111111] h-[120px]">
          <div className="p-4">
            <div className="flex items-center gap-2">
              <h3 className="text-gray-400">Total AI Market</h3>
              <div className="flex items-center">
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M3 3V19.5C3 20.163 3.26339 20.7989 3.73223 21.2678C4.20107 21.7366 4.83696 22 5.5 22H21" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M7 17L11 13L15 17L21 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </div>
            <div className="mt-2">
              <p className="text-2xl font-medium">{marketStats.totalMarketCap}</p>
              <p className="text-[#88D693] text-sm">+15.2%</p>
            </div>
          </div>
        </Card>
        <Card className="bg-[#111111] h-[120px]">
          <div className="p-4">
            <div className="flex items-center gap-2">
              <h3 className="text-gray-400">24h Volume</h3>
              <div className="flex items-center">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C7.59 20 4 16.41 4 12C4 7.59 7.59 4 12 4C16.41 4 20 7.59 20 12C20 16.41 16.41 20 12 20ZM12.31 11.14C10.54 10.69 9.97 10.2 9.97 9.47C9.97 8.63 10.76 8.04 12.07 8.04C13.45 8.04 13.97 8.7 14.01 9.68H15.72C15.67 8.34 14.85 7.11 13.23 6.71V5H10.9V6.69C9.39 7.01 8.18 7.99 8.18 9.5C8.18 11.29 9.67 12.19 11.84 12.71C13.79 13.17 14.18 13.86 14.18 14.58C14.18 15.11 13.79 15.97 12.08 15.97C10.48 15.97 9.85 15.25 9.76 14.33H8.04C8.14 16.03 9.4 16.99 10.9 17.3V19H13.24V17.33C14.76 17.04 15.96 16.17 15.97 14.56C15.96 12.36 14.07 11.6 12.31 11.14Z" fill="currentColor"/>
                </svg>
              </div>
            </div>
            <div className="mt-2">
              <p className="text-2xl font-medium">{marketStats.volume24h}</p>
              <p className="text-[#88D693] text-sm">+22.3%</p>
            </div>
          </div>
        </Card>
        <Card className="bg-[#111111] h-[120px]">
          <div className="p-4">
            <div className="flex items-center gap-2">
              <h3 className="text-gray-400">Total AI Tokens</h3>
              <div className="flex items-center">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 12.75C8.83 12.75 6.25 10.17 6.25 7C6.25 3.83 8.83 1.25 12 1.25C15.17 1.25 17.75 3.83 17.75 7C17.75 10.17 15.17 12.75 12 12.75ZM12 2.75C9.66 2.75 7.75 4.66 7.75 7C7.75 9.34 9.66 11.25 12 11.25C14.34 11.25 16.25 9.34 16.25 7C16.25 4.66 14.34 2.75 12 2.75Z" fill="currentColor"/>
                  <path d="M20.5901 22.75C20.1801 22.75 19.8401 22.41 19.8401 22C19.8401 18.55 16.3202 15.75 12.0002 15.75C7.68015 15.75 4.16016 18.55 4.16016 22C4.16016 22.41 3.82016 22.75 3.41016 22.75C3.00016 22.75 2.66016 22.41 2.66016 22C2.66016 17.73 6.85015 14.25 12.0002 14.25C17.1502 14.25 21.3401 17.73 21.3401 22C21.3401 22.41 21.0001 22.75 20.5901 22.75Z" fill="currentColor"/>
                </svg>
              </div>
            </div>
            <div className="mt-2">
              <p className="text-2xl font-medium">156</p>
              <p className="text-[#88D693] text-sm">+12</p>
            </div>
          </div>
        </Card>
        <Card className="bg-[#111111] h-[120px]">
          <div className="p-4">
            <div className="flex items-center gap-2">
              <h3 className="text-gray-400">Hot Trend</h3>
              <div className="flex items-center">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" fill="currentColor"/>
                </svg>
              </div>
            </div>
            <div className="mt-2">
              <p className="text-2xl font-medium">Agent AI</p>
              <p className="text-[rgb(240,148,164)] text-sm flex items-center">
                <FaArrowUp className="text-[rgb(240,148,164)] mr-1" />
                Trending
              </p>
            </div>
          </div>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <Card className="bg-[#111111] h-[400px]">
          <div className="p-4">
            <h3 className="text-2xl font-medium mb-4">Volume Trends</h3>
            <div className="h-[350px]">
              <TradingViewWidget />
            </div>
          </div>
        </Card>
        <Card className="bg-[#111111] h-[400px]">
          <div className="p-4">
            <h3 className="text-2xl font-medium mb-4">Category Growth</h3>
            <div className="h-[350px]">
              <TradingViewWidget />
            </div>
          </div>
        </Card>
      </div>

      {/* Top AI Tokens */}
      <Card className="bg-[#111111]">
        <div className="p-4">
          <div className="flex items-center gap-4 mb-4">
            <h3 className="text-2xl font-medium">Top AI Tokens</h3>
            <span className="text-gray-400">Showing top performing tokens in the last 24h</span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left text-sm text-gray-400">
                  <th className="pb-4">Category</th>
                  <th className="pb-4">24h Volume</th>
                  <th className="pb-4">Volume Change</th>
                  <th className="pb-4">Tokens</th>
                  <th className="pb-4">Top Token</th>
                  <th className="pb-4">Price</th>
                  <th className="pb-4">Change</th>
                </tr>
              </thead>
              <tbody>
                {trendingCategories.map((category, index) => (
                  <tr key={index} className="border-t border-[#222222]">
                    <td className="py-4">
                      <span className="font-medium">{category.category}</span>
                    </td>
                    <td className="py-4">{category.volume24h}</td>
                    <td className="py-4">
                      <span className={getChangeColor(category.volumeChange)}>
                        {category.volumeChange}
                      </span>
                    </td>
                    <td className="py-4">{category.tokens}</td>
                    <td className="py-4">{category.topToken}</td>
                    <td className="py-4">{category.price}</td>
                    <td className="py-4">
                      <span className={getChangeColor(category.change)}>
                        {category.change}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default MarketTrends; 