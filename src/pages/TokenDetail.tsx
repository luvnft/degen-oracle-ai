import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useTokenStore } from '../store/tokenStore';
import { FaTwitter, FaTelegram, FaGlobe, FaChartLine, FaUsers, FaLock, FaExclamationTriangle, FaMoneyBillWave, FaExchangeAlt, FaShieldAlt, FaCode, FaChartBar, FaCoins, FaWater, FaChartArea, FaArrowRight, FaSignal, FaRobot, FaCrosshairs, FaUserSecret, FaHandHoldingUsd, FaHistory, FaUserClock, FaUsers as FaUsersGroup, FaChartPie, FaExclamationCircle, FaCheckCircle, FaHourglassHalf, FaArrowUp, FaCircle, FaDiscord, FaUserTie, FaTrendUp } from 'react-icons/fa';
import { DocumentDuplicateIcon, ChartBarIcon, CurrencyDollarIcon, ClockIcon, ShieldCheckIcon, ExclamationCircleIcon, ArrowTrendingUpIcon } from '@heroicons/react/24/outline';
import { formatNumber, formatPercent } from '../utils/format';
import { PieChart } from '../components/charts/PieChart';
import LineChart from '../components/charts/LineChart';
import AreaChart from '../components/charts/AreaChart';
import { Skeleton } from '../components/shared/Skeleton';
import { TokenDetailInfo } from '../types/index';
import { Checkbox } from '../components/form/Checkbox';
import { Input } from '../components/form/Input';

const TokenDetail = () => {
  const { address } = useParams();
  const { tokens, loading } = useTokenStore();
  const token = tokens.find(t => t.address === address) as TokenDetailInfo | undefined;
  const [activeTab, setActiveTab] = useState('overview');
  const [isAlertModalOpen, setIsAlertModalOpen] = useState(false);
  const [alertSettings, setAlertSettings] = useState({
    priceChange: true,
    priceChangeThreshold: 10,
    volumeChange: true, 
    volumeChangeThreshold: 100,
    holdersChange: true,
    holdersChangeThreshold: 20
  });

  if (loading) {
    return (
      <div className="space-y-6">
        {/* Basic Info Skeleton */}
        <div className="card">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Skeleton className="w-12 h-12 rounded-full" />
              <div className="space-y-2">
                <Skeleton className="h-8 w-48" />
                <Skeleton className="h-4 w-24" />
              </div>
            </div>
            <div className="flex space-x-4">
              <Skeleton className="h-10 w-32" />
              <Skeleton className="h-10 w-24" />
            </div>
          </div>
        </div>

        {/* Market Overview & Trading Analysis Skeleton */}
        <div className="grid grid-cols-2 gap-6">
          <div className="card">
            <Skeleton className="h-6 w-36 mb-4" />
            <div className="grid grid-cols-2 gap-4">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="space-y-2">
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-6 w-32" />
                </div>
              ))}
            </div>
          </div>
          <div className="card">
            <Skeleton className="h-6 w-36 mb-4" />
            <div className="space-y-4">
              <Skeleton className="h-[200px]" />
            </div>
          </div>
        </div>

        {/* Holder Analysis Skeleton */}
        <div className="card">
          <Skeleton className="h-6 w-36 mb-4" />
          <div className="grid grid-cols-3 gap-6">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="space-y-2">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-6 w-32" />
              </div>
            ))}
          </div>
        </div>

        {/* Risk Assessment Skeleton */}
        <div className="card">
          <Skeleton className="h-6 w-36 mb-4" />
          <div className="grid grid-cols-3 gap-6">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="space-y-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (!token) return <div>Token not found</div>;

  const handleCopyAddress = () => {
    navigator.clipboard.writeText(token.address);
    // TODO: Add toast notification
  };

  const volumeDistributionData = [
    { name: 'DEX 1', value: 60, color: '#88D693' },
    { name: 'DEX 2', value: 30, color: '#4CAF50' },
    { name: 'Others', value: 10, color: '#2E7D32' },
  ];

  const holderDistributionData = [
    { name: 'Top 10', value: token.top10HoldersPercent, color: '#88D693' },
    { name: 'Others', value: 100 - token.top10HoldersPercent, color: '#4CAF50' },
  ];

  const priceImpactData = Array.from({ length: 10 }, (_, i) => ({
    time: `${i * 1000}`,
    value: Math.random() * 2 + 1 // Price impact 1-3%
  }));

  const holderGrowthData = Array.from({ length: 30 }, (_, i) => ({
    time: `Day ${i + 1}`,
    value: 1000 + Math.floor(Math.random() * 100) * (i + 1)
  }));

  const socialEngagementData = Array.from({ length: 30 }, (_, i) => ({
    time: `Day ${i + 1}`,
    value: 500 + Math.floor(Math.random() * 50) * (i + 1)
  }));

  const communityGrowthData = Array.from({ length: 30 }, (_, i) => ({
    time: `Day ${i + 1}`,
    value: 1000 + Math.floor(Math.random() * 100) * (i + 1)
  }));

  const aiConfidenceData = Array.from({ length: 10 }, (_, i) => ({
    time: `Day ${i + 1}`,
    value: Math.random() * 100
  }));

  const tabs = [
    { id: 'overview', label: 'Overview', icon: FaChartLine },
    { id: 'market', label: 'Market', icon: FaMoneyBillWave },
    { id: 'holders', label: 'Holders', icon: FaUsers },
    { id: 'social', label: 'Social', icon: FaTwitter },
    { id: 'risk', label: 'Risk', icon: FaShieldAlt },
    { id: 'development', label: 'Development', icon: FaCode },
  ];

  const handleOpenAlertModal = () => {
    setIsAlertModalOpen(true);
  };

  const handleCloseAlertModal = () => {
    setIsAlertModalOpen(false);
  };

  const handleSaveAlertSettings = () => {
    // TODO: Save alert settings to backend/store
    handleCloseAlertModal();
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold">Token Details</h1>
        <p className="text-gray-400">Comprehensive analysis and real-time data</p>
      </div>

      {/* Basic Information */}
      <div className="card">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <img src={token.logo} alt={token.name} className="w-12 h-12 rounded-full" />
            <div>
              <div className="flex items-center space-x-4">
                <h1 className="text-2xl font-bold flex items-center">
                  {token.name}
                  <div className="flex items-center ml-3 bg-[#1A1A1A] px-2 py-0.5 rounded-lg">
                    <FaRobot className="w-4 h-4 text-[#88D693] mr-1.5" />
                    <span className="text-sm font-medium text-[#88D693]">92</span>
                    <span className="text-xs text-gray-400">/100</span>
                  </div>
                </h1>
              </div>
              <div className="flex items-center space-x-4 mt-2">
                <span className="text-gray-400">{token.symbol}</span>
                <button 
                  onClick={handleCopyAddress}
                  className="text-sm bg-[#1A1A1A] px-3 py-1 rounded-lg hover:bg-[#222222] flex items-center space-x-2"
                >
                  <span>{token.address.slice(0, 6)}...{token.address.slice(-4)}</span>
                  <DocumentDuplicateIcon className="w-4 h-4 text-gray-400" />
                </button>
                <div className="flex items-center space-x-2">
                  {token.twitter && (
                    <a href={token.twitter} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[#1DA1F2]">
                      <FaTwitter size={20} />
                    </a>
                  )}
                  {token.telegram && (
                    <a href={token.telegram} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[#0088cc]">
                      <FaTelegram size={20} />
                    </a>
                  )}
                  {token.website && (
                    <a href={token.website} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white">
                      <FaGlobe size={20} />
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <button className="px-4 py-2 bg-[#88D693] text-black rounded-lg hover:bg-[#88D693]/90">
              Add to Watchlist
            </button>
            <button 
              onClick={handleOpenAlertModal}
              className="px-4 py-2 bg-[#1A1A1A] text-white rounded-lg hover:bg-[#222222]"
            >
              Set Alerts
            </button>
          </div>
        </div>
      </div>

      {/* Key Metrics Overview */}
      <div className="grid grid-cols-8 gap-4">
        <div className="card p-4">
          <div className="text-sm text-gray-400">MC</div>
          <div className="text-lg font-medium text-[rgb(255,208,57)]">${formatNumber(token.marketCap)}</div>
          <div className="text-xs text-[#88D693]">+12.5% (24h)</div>
        </div>
        <div className="card p-4">
          <div className="text-sm text-gray-400">Liq</div>
          <div className="text-lg font-medium">${formatNumber(token.liquidity)}</div>
          <div className="text-xs text-[#88D693]">Healthy</div>
        </div>
        <div className="card p-4">
          <div className="text-sm text-gray-400">Snipers</div>
          <div className="text-lg font-medium flex items-center">
            <FaCrosshairs className="w-4 h-4 mr-1" />
            <span>1/70</span>
          </div>
          <div className="text-xs text-[#88D693]">Low Risk</div>
        </div>
        <div className="card p-4">
          <div className="text-sm text-gray-400">BlueChip</div>
          <div className="text-lg font-medium text-[#88D693]">2.2%</div>
          <div className="text-xs text-gray-400">of Supply</div>
        </div>
        <div className="card p-4">
          <div className="text-sm text-gray-400">Holders</div>
          <div className="text-lg font-medium text-[rgb(147,197,253)]">{formatNumber(token.holders)}</div>
          <div className="text-xs text-[#88D693]">+125 (24h)</div>
        </div>
        <div className="card p-4">
          <div className="text-sm text-gray-400">Top 10</div>
          <div className="text-lg font-medium text-[#88D693]">{token.top10HoldersPercent}%</div>
          <div className="text-xs text-gray-400">Concentration</div>
        </div>
        <div className="card p-4">
          <div className="text-sm text-gray-400">Audit</div>
          <div className="text-lg font-medium text-[#88D693] flex items-center">
            <FaShieldAlt className="w-4 h-4 mr-1" />
            <span>Safe 4/4</span>
          </div>
          <div className="text-xs text-gray-400">Verified</div>
        </div>
        <div className="card p-4">
          <div className="text-sm text-gray-400">Volume 24h</div>
          <div className="text-lg font-medium text-[rgb(147,197,253)]">${formatNumber(token.hourlyVolume * 24)}</div>
          <div className="text-xs text-[#88D693]">+45%</div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="flex space-x-1 bg-[#1A1A1A] p-1 rounded-lg">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
              activeTab === tab.id 
                ? 'bg-[#88D693] text-black' 
                : 'hover:bg-[#222222] text-gray-400'
            }`}
          >
            <tab.icon className="w-4 h-4" />
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="space-y-6">
        {activeTab === 'overview' && (
          <>
            {/* Market Overview & Trading Analysis */}
            <div className="grid grid-cols-2 gap-6">
              <div className="card">
                <h2 className="text-lg font-medium mb-4 flex items-center space-x-2">
                  <FaChartLine className="w-5 h-5 text-[#88D693]" />
                  <span>Market Overview</span>
                  <span className={`ml-2 text-sm px-2 py-0.5 rounded ${
                    token.priceChange24h >= 0 
                      ? 'bg-[#88D693]/20 text-[#88D693]' 
                      : 'bg-[rgb(240,148,164)]/20 text-[rgb(240,148,164)]'
                  }`}>
                    {token.priceChange24h >= 0 ? 'Bullish' : 'Bearish'}
                  </span>
                </h2>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-sm text-gray-400 flex items-center space-x-1">
                      <CurrencyDollarIcon className="w-4 h-4" />
                      <span>Price</span>
                    </div>
                    <div className="text-xl font-medium">${formatNumber(token.currentPrice)}</div>
                    <div className={`text-sm ${token.priceChange1h >= 0 ? 'text-[#88D693]' : 'text-[rgb(240,148,164)]'}`}>
                      {formatPercent(token.priceChange1h)} (1h)
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-400 flex items-center space-x-1">
                      <FaMoneyBillWave className="w-4 h-4" />
                      <span>Market Cap</span>
                    </div>
                    <div className="text-xl font-medium text-[rgb(255,208,57)]">${formatNumber(token.marketCap)}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-400">24h Volume</div>
                    <div className="text-xl font-medium text-[rgb(147,197,253)]">${formatNumber(token.hourlyVolume * 24)}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-400">Liquidity</div>
                    <div className="text-xl font-medium">${formatNumber(token.liquidity)}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-400">Fully Diluted Valuation</div>
                    <div className="text-xl font-medium">${formatNumber(token.fdv || token.marketCap)}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-400">Liquidity Pairs</div>
                    <div className="text-xl font-medium">
                      SOL-USDC, SOL-USDT
                    </div>
                  </div>
                </div>
                <div className="mt-6 grid grid-cols-2 gap-4">
                  {/* Volume Distribution Chart */}
                  <div className="bg-[#1A1A1A] p-4 rounded-lg">
                    <h3 className="text-sm font-medium mb-2">Volume Distribution</h3>
                    <div className="h-48">
                      <PieChart data={volumeDistributionData} />
                    </div>
                  </div>
                  
                  {/* Holder Distribution Chart */}
                  <div className="bg-[#1A1A1A] p-4 rounded-lg">
                    <h3 className="text-sm font-medium mb-2">Holder Distribution</h3>
                    <div className="h-48">
                      <PieChart data={holderDistributionData} />
                    </div>
                  </div>
                </div>
              </div>

              <div className="card">
                <h2 className="text-lg font-medium mb-4">Trading Analysis</h2>
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-sm font-medium mb-2">Price Impact Analysis</h3>
                    <div className="bg-[#1A1A1A] p-4 rounded-lg">
                      <LineChart data={priceImpactData} />
                    </div>
                    <div className="mt-2 text-sm text-gray-400">
                      Shows estimated price impact at different trade sizes
                    </div>
                  </div>
                  <div className="space-y-6">
                    <div>
                      <div className="text-sm text-gray-400">Buy/Sell Ratio (24h)</div>
                      <div className="text-xl font-medium">1.5</div>
                      <div className="text-sm text-[#88D693]">Bullish</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-400">Large Transactions</div>
                      <div className="text-xl font-medium">24</div>
                      <div className="text-sm text-gray-400">of total supply</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-400">Average Trade Size</div>
                      <div className="text-xl font-medium">$2,500</div>
                    </div>
                  </div>
                </div>
                <div className="mt-6">
                  <h3 className="text-sm font-medium mb-2">Market Momentum</h3>
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <div className="text-sm text-gray-400">Volume/MCap Ratio</div>
                      <div className="flex items-center">
                        <div className="text-xl font-medium">0.42</div>
                        <FaArrowUp className="w-4 h-4 ml-2 text-[#88D693]" />
                      </div>
                      <div className="text-sm text-[#88D693]">High Activity</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-400">Buy Pressure</div>
                      <div className="text-xl font-medium">72%</div>
                      <div className="text-sm text-[#88D693]">Strong</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-400">Price Volatility</div>
                      <div className="text-xl font-medium">Medium</div>
                      <div className="text-sm text-gray-400">±5.2% avg</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Additional Quick Stats */}
            <div className="grid grid-cols-4 gap-4">
              <div className="card p-4">
                <div className="text-sm text-gray-400">Price Impact (100K)</div>
                <div className="text-lg font-medium">2.5%</div>
                <div className="text-xs text-[#88D693]">Low Impact</div>
              </div>
              <div className="card p-4">
                <div className="text-sm text-gray-400">Buy Tax</div>
                <div className="text-lg font-medium text-[#88D693]">0%</div>
                <div className="text-xs text-gray-400">No Tax</div>
              </div>
              <div className="card p-4">
                <div className="text-sm text-gray-400">Sell Tax</div>
                <div className="text-lg font-medium text-[#88D693]">0%</div>
                <div className="text-xs text-gray-400">No Tax</div>
              </div>
              <div className="card p-4">
                <div className="text-sm text-gray-400">Liquidity Lock</div>
                <div className="text-lg font-medium text-[#88D693]">365d</div>
                <div className="text-xs text-gray-400">Time Lock</div>
              </div>
            </div>

            {/* AI Analysis Summary */}
            <div className="card">
              <h2 className="text-lg font-medium mb-4 flex items-center space-x-2">
                <FaRobot className="w-5 h-5 text-[#1DA1F2]" />
                <span>AI Analysis Summary</span>
                <div className="flex items-center ml-2 bg-[#88D693]/20 px-2 py-0.5 rounded">
                  <span className="text-sm text-[#88D693]">92% Confidence</span>
                </div>
              </h2>
              <div className="grid grid-cols-3 gap-6">
                {/* Key Metrics */}
                <div className="bg-[#1A1A1A] p-4 rounded-lg">
                  <div className="text-center">
                    <div className="text-sm text-gray-400 mb-2">AI Recommendation</div>
                    <div className="text-3xl font-bold text-[#88D693] mb-2">Strong Buy</div>
                    <div className="inline-block bg-[#88D693]/20 px-3 py-1 rounded-full">
                      <div className="text-sm text-[#88D693]">High Confidence</div>
                    </div>
                  </div>
                </div>

                {/* Strengths */}
                <div className="bg-[#1A1A1A] p-4 rounded-lg">
                  <div className="text-sm text-gray-400">Strengths</div>
                  <div className="mt-2 space-y-2">
                    {[
                      'Strong community growth',
                      'Active development',
                      'High liquidity',
                      'Positive sentiment'
                    ].map((strength, i) => (
                      <div key={i} className="flex items-center text-[#88D693] bg-[#88D693]/10 px-2 py-1 rounded">
                        <FaCheckCircle className="w-3 h-3 mr-2 flex-shrink-0" />
                        <span className="text-sm">{strength}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Risks */}
                <div className="bg-[#1A1A1A] p-4 rounded-lg">
                  <div className="text-sm text-gray-400">Risks & Considerations</div>
                  <div className="mt-2 space-y-2">
                    {[
                      'High volatility',
                      'Mint function',
                      'High competition'
                    ].map((risk, i) => (
                      <div key={i} className="flex items-center text-[rgb(240,148,164)] bg-[rgb(240,148,164)]/10 px-2 py-1 rounded">
                        <FaExclamationTriangle className="w-3 h-3 mr-2 flex-shrink-0" />
                        <span className="text-sm">{risk}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* AI Metrics */}
              <div className="grid grid-cols-4 gap-4 mt-6">
                {[
                  { label: 'Growth Potential', value: '85%', color: '#88D693' },
                  { label: 'Risk Level', value: 'Low', color: '#88D693' },
                  { label: 'Market Timing', value: 'Optimal', color: 'rgb(255,208,57)' },
                  { label: 'Overall Score', value: '92/100', color: '#88D693' }
                ].map((metric, i) => (
                  <div key={i} className="bg-[#1A1A1A] p-3 rounded-lg text-center">
                    <div className="text-sm text-gray-400 mb-1">{metric.label}</div>
                    <div className="text-lg font-medium" style={{ color: metric.color }}>{metric.value}</div>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

        {activeTab === 'market' && (
          <>
            {/* Market Overview & Trading Analysis */}
            <div className="grid grid-cols-2 gap-6">
              <div className="card">
                <h2 className="text-lg font-medium mb-4 flex items-center space-x-2">
                  <FaChartLine className="w-5 h-5 text-[#88D693]" />
                  <span>Market Overview</span>
                  <span className={`ml-2 text-sm px-2 py-0.5 rounded ${
                    token.priceChange24h >= 0 
                      ? 'bg-[#88D693]/20 text-[#88D693]' 
                      : 'bg-[rgb(240,148,164)]/20 text-[rgb(240,148,164)]'
                  }`}>
                    {token.priceChange24h >= 0 ? 'Bullish' : 'Bearish'}
                  </span>
                </h2>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-sm text-gray-400 flex items-center space-x-1">
                      <CurrencyDollarIcon className="w-4 h-4" />
                      <span>Price</span>
                    </div>
                    <div className="text-xl font-medium">${formatNumber(token.currentPrice)}</div>
                    <div className={`text-sm ${token.priceChange1h >= 0 ? 'text-[#88D693]' : 'text-[rgb(240,148,164)]'}`}>
                      {formatPercent(token.priceChange1h)} (1h)
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-400 flex items-center space-x-1">
                      <FaMoneyBillWave className="w-4 h-4" />
                      <span>Market Cap</span>
                    </div>
                    <div className="text-xl font-medium text-[rgb(255,208,57)]">${formatNumber(token.marketCap)}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-400">24h Volume</div>
                    <div className="text-xl font-medium text-[rgb(147,197,253)]">${formatNumber(token.hourlyVolume * 24)}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-400">Liquidity</div>
                    <div className="text-xl font-medium">${formatNumber(token.liquidity)}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-400">Fully Diluted Valuation</div>
                    <div className="text-xl font-medium">${formatNumber(token.fdv || token.marketCap)}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-400">Liquidity Pairs</div>
                    <div className="text-xl font-medium">
                      SOL-USDC, SOL-USDT
                    </div>
                  </div>
                </div>
                <div className="mt-6 grid grid-cols-2 gap-4">
                  {/* Volume Distribution Chart */}
                  <div className="bg-[#1A1A1A] p-4 rounded-lg">
                    <h3 className="text-sm font-medium mb-2">Volume Distribution</h3>
                    <div className="h-48">
                      <PieChart data={volumeDistributionData} />
                    </div>
                  </div>
                  
                  {/* Holder Distribution Chart */}
                  <div className="bg-[#1A1A1A] p-4 rounded-lg">
                    <h3 className="text-sm font-medium mb-2">Holder Distribution</h3>
                    <div className="h-48">
                      <PieChart data={holderDistributionData} />
                    </div>
                  </div>
                </div>
              </div>

              <div className="card">
                <h2 className="text-lg font-medium mb-4">Trading Analysis</h2>
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-sm font-medium mb-2">Price Impact Analysis</h3>
                    <div className="bg-[#1A1A1A] p-4 rounded-lg">
                      <LineChart data={priceImpactData} />
                    </div>
                    <div className="mt-2 text-sm text-gray-400">
                      Shows estimated price impact at different trade sizes
                    </div>
                  </div>
                  <div className="space-y-6">
                    <div>
                      <div className="text-sm text-gray-400">Buy/Sell Ratio (24h)</div>
                      <div className="text-xl font-medium">1.5</div>
                      <div className="text-sm text-[#88D693]">Bullish</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-400">Large Transactions</div>
                      <div className="text-xl font-medium">24</div>
                      <div className="text-sm text-gray-400">of total supply</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-400">Average Trade Size</div>
                      <div className="text-xl font-medium">$2,500</div>
                    </div>
                  </div>
                </div>
                <div className="mt-6">
                  <h3 className="text-sm font-medium mb-2">Market Momentum</h3>
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <div className="text-sm text-gray-400">Volume/MCap Ratio</div>
                      <div className="flex items-center">
                        <div className="text-xl font-medium">0.42</div>
                        <FaArrowUp className="w-4 h-4 ml-2 text-[#88D693]" />
                      </div>
                      <div className="text-sm text-[#88D693]">High Activity</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-400">Buy Pressure</div>
                      <div className="text-xl font-medium">72%</div>
                      <div className="text-sm text-[#88D693]">Strong</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-400">Price Volatility</div>
                      <div className="text-xl font-medium">Medium</div>
                      <div className="text-sm text-gray-400">±5.2% avg</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Price Action */}
            <div className="card">
              <h2 className="text-lg font-medium mb-4 flex items-center space-x-2">
                <FaChartArea className="w-5 h-5 text-[#88D693]" />
                <span>Price Action Metrics</span>
              </h2>
              <div className="grid grid-cols-3 gap-6">
                <div>
                  <div className="text-sm text-gray-400">ATH</div>
                  <div className="text-xl font-medium text-[#88D693]">${formatNumber(3.75)}</div>
                  <div className="text-sm text-gray-400">-65% from ATH</div>
                </div>
                <div>
                  <div className="text-sm text-gray-400">24h Range</div>
                  <div className="flex items-baseline space-x-2">
                    <span className="text-sm text-[rgb(240,148,164)]">${formatNumber(1.15)}</span>
                    <FaArrowRight className="w-3 h-3 text-gray-400" />
                    <span className="text-sm text-[#88D693]">${formatNumber(1.45)}</span>
                  </div>
                </div>
                <div>
                  <div className="text-sm text-gray-400">Price Discovery</div>
                  <div className="text-xl font-medium text-[rgb(255,208,57)]">Active</div>
                  <div className="text-sm text-gray-400">New ATH likely</div>
                </div>
              </div>
            </div>

            {/* Trading Signals */}
            <div className="card">
              <h2 className="text-lg font-medium mb-4 flex items-center space-x-2">
                <FaSignal className="w-5 h-5 text-[rgb(255,208,57)]" />
                <span>Trading Signals</span>
              </h2>
              <div className="grid grid-cols-3 gap-6">
                <div className="bg-[#1A1A1A] p-4 rounded-lg">
                  <div className="text-sm text-gray-400">Technical Indicators</div>
                  <div className="text-xl font-medium text-[#88D693]">Bullish</div>
                  <div className="mt-2 space-y-1">
                    <div className="flex justify-between">
                      <span className="text-sm">RSI (14)</span>
                      <span className="text-sm text-[#88D693]">65</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">MACD</span>
                      <span className="text-sm text-[#88D693]">Bullish Cross</span>
                    </div>
                  </div>
                </div>
                <div className="bg-[#1A1A1A] p-4 rounded-lg">
                  <div className="text-sm text-gray-400">Whale Activity</div>
                  <div className="text-xl font-medium text-[#88D693]">Accumulating</div>
                  <div className="mt-2 space-y-1">
                    <div className="flex justify-between">
                      <span className="text-sm">24h Net</span>
                      <span className="text-sm text-[#88D693]">+$250K</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Large Txs</span>
                      <span className="text-sm">15</span>
                    </div>
                  </div>
                </div>
                <div className="bg-[#1A1A1A] p-4 rounded-lg">
                  <div className="text-sm text-gray-400">Market Sentiment</div>
                  <div className="text-xl font-medium text-[#88D693]">Very Bullish</div>
                  <div className="mt-2 space-y-1">
                    <div className="flex justify-between">
                      <span className="text-sm">Fear & Greed</span>
                      <span className="text-sm text-[#88D693]">75</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Trend</span>
                      <span className="text-sm text-[#88D693]">Strong Up</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Market Comparison */}
            <div className="card">
              <h2 className="text-lg font-medium mb-4 flex items-center space-x-2">
                <FaChartBar className="w-5 h-5 text-[rgb(255,208,57)]" />
                <span>Market Comparison</span>
              </h2>
              <div className="grid grid-cols-3 gap-6">
                <div>
                  <div className="text-sm text-gray-400">Market Rank</div>
                  <div className="text-xl font-medium">#12</div>
                  <div className="text-sm text-gray-400">in AI Tokens</div>
                </div>
                <div>
                  <div className="text-sm text-gray-400">Volume Rank</div>
                  <div className="text-xl font-medium">#8</div>
                  <div className="text-sm text-[#88D693]">Top 10</div>
                </div>
                <div>
                  <div className="text-sm text-gray-400">Growth Rate</div>
                  <div className="text-xl font-medium">+125%</div>
                  <div className="text-sm text-[#88D693]">vs Category Avg. +45%</div>
                </div>
              </div>
              
              {/* Category Performance */}
              <div className="mt-6">
                <h3 className="text-sm font-medium mb-2">Category Performance</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-[#1A1A1A] p-4 rounded-lg">
                    <div className="text-sm text-gray-400">Market Share</div>
                    <div className="text-xl font-medium">5.2%</div>
                    <div className="text-sm text-[#88D693]">of AI Token Market</div>
                  </div>
                  <div className="bg-[#1A1A1A] p-4 rounded-lg">
                    <div className="text-sm text-gray-400">Relative Strength</div>
                    <div className="text-xl font-medium">Strong</div>
                    <div className="text-sm text-[#88D693]">Outperforming 85%</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Supply Analysis */}
            <div className="card">
              <h2 className="text-lg font-medium mb-4 flex items-center space-x-2">
                <FaCoins className="w-5 h-5 text-[rgb(255,208,57)]" />
                <span>Supply Analysis</span>
              </h2>
              <div className="grid grid-cols-3 gap-6">
                <div>
                  <div className="text-sm text-gray-400">Total Supply</div>
                  <div className="text-xl font-medium">{formatNumber(token.totalSupply)}</div>
                  <div className="text-sm text-gray-400">Tokens</div>
                </div>
                <div>
                  <div className="text-sm text-gray-400">Circulating Supply</div>
                  <div className="text-xl font-medium">
                    {formatPercent(token.circulatingSupply / token.totalSupply * 100)}
                  </div>
                  <div className="text-sm text-gray-400">of Total Supply</div>
                </div>
                <div>
                  <div className="text-sm text-gray-400">Burn Rate (24h)</div>
                  <div className="text-xl font-medium text-[#88D693]">+2.5%</div>
                  <div className="text-sm text-gray-400">Tokens Burned</div>
                </div>
              </div>
            </div>

            {/* Liquidity Analysis */}
            <div className="card">
              <h2 className="text-lg font-medium mb-4 flex items-center space-x-2">
                <FaWater className="w-5 h-5 text-[rgb(147,197,253)]" />
                <span>Liquidity Analysis</span>
              </h2>
              <div className="grid grid-cols-2 gap-6">
                <div className="bg-[#1A1A1A] p-4 rounded-lg">
                  <div className="text-sm text-gray-400">Liquidity Depth</div>
                  <div className="text-xl font-medium">$500K</div>
                  <div className="mt-2 space-y-1">
                    <div className="flex justify-between">
                      <span className="text-sm">2% Price Impact</span>
                      <span className="text-sm">$25K</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">5% Price Impact</span>
                      <span className="text-sm">$75K</span>
                    </div>
                  </div>
                </div>
                <div className="bg-[#1A1A1A] p-4 rounded-lg">
                  <div className="text-sm text-gray-400">Liquidity Distribution</div>
                  <div className="mt-2 space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Raydium</span>
                      <span className="text-sm">65%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Orca</span>
                      <span className="text-sm">35%</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}

        {activeTab === 'holders' && (
          <>
            {/* Holder Analysis */}
            <div className="card">
              <h2 className="text-lg font-medium mb-4 flex items-center space-x-2">
                <FaUsers className="w-5 h-5 text-[rgb(147,197,253)]" />
                <span>Holder Analysis</span>
              </h2>

              {/* Holder Composition Analysis */}
              <div className="mb-6">
                <h3 className="text-sm font-medium mb-2">Holder Composition</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-[#1A1A1A] p-4 rounded-lg">
                    <div className="text-sm text-gray-400">Distribution by Type</div>
                    <div className="mt-2 space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm flex items-center">
                          <FaCrosshairs className="w-4 h-4 text-[rgb(147,197,253)] mr-2" />
                          Snipers/Traders
                        </span>
                        <span className="text-sm text-[rgb(147,197,253)]">25%</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm flex items-center">
                          <FaUserSecret className="w-4 h-4 text-[rgb(255,208,57)] mr-2" />
                          Team & Insiders
                        </span>
                        <span className="text-sm text-[rgb(255,208,57)]">15%</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm flex items-center">
                          <FaHandHoldingUsd className="w-4 h-4 text-[#88D693] mr-2" />
                          Long-term Holders
                        </span>
                        <span className="text-sm text-[#88D693]">45%</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm flex items-center">
                          <div className="w-2 h-2 rounded-full bg-gray-400 mr-2" />
                          Others
                        </span>
                        <span className="text-sm">15%</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-[#1A1A1A] p-4 rounded-lg">
                    <div className="text-sm text-gray-400">Risk Analysis</div>
                    <div className="mt-2 space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm flex items-center">
                          <FaCrosshairs className="w-3 h-3 mr-1 text-[rgb(240,148,164)]" />
                          Sniper Concentration
                        </span>
                        <span className="text-sm text-[rgb(240,148,164)]">Medium Risk</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm flex items-center">
                          <FaUserClock className="w-3 h-3 mr-1 text-[#88D693]" />
                          Team Token Lock
                        </span>
                        <span className="text-sm text-[#88D693]">12 months</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm flex items-center">
                          <ExclamationCircleIcon className="w-3 h-3 mr-1 text-[rgb(240,148,164)]" />
                          Insider Trading
                        </span>
                        <span className="text-sm text-[#88D693]">Low Activity</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm flex items-center">
                          <FaChartPie className="w-3 h-3 mr-1 text-[rgb(255,208,57)]" />
                          Whale Dominance
                        </span>
                        <span className="text-sm text-[rgb(255,208,57)]">Moderate</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Recent Insider/Team Activity */}
                <div className="mt-4">
                  <div className="text-sm text-gray-400 mb-2">Recent Team/Insider Activity</div>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center bg-[#1A1A1A] p-2 rounded">
                      <div className="text-sm flex items-center">
                        <FaLock className="w-3 h-3 mr-2 text-[#88D693]" />
                        Team Tokens Locked
                      </div>
                      <div className="text-sm text-[#88D693]">+500K tokens</div>
                      <div className="text-sm text-gray-400">1 day ago</div>
                    </div>
                    <div className="flex justify-between items-center bg-[#1A1A1A] p-2 rounded">
                      <div className="text-sm flex items-center">
                        <FaExchangeAlt className="w-3 h-3 mr-2 text-[rgb(255,208,57)]" />
                        Insider Transfer
                      </div>
                      <div className="text-sm text-[rgb(255,208,57)]">50K tokens</div>
                      <div className="text-sm text-gray-400">3 days ago</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-6">
                <div>
                  <div className="text-sm text-gray-400">Total Holders</div>
                  <div className="text-xl font-medium text-[rgb(147,197,253)]">{formatNumber(token.holders)}</div>
                  <div className="text-sm text-[#88D693]">+{formatNumber(125)} (24h)</div>
                </div>
                
                <div>
                  <div className="text-sm text-gray-400">Top 10 Holders</div>
                  <div className="text-xl font-medium">{token.top10HoldersPercent}%</div>
                  <div className="text-sm text-gray-400">of total supply</div>
                </div>

                <div>
                  <div className="text-sm text-gray-400">Holder Types</div>
                  <div className="mt-2 space-y-1">
                    <div className="flex justify-between">
                      <span className="text-sm">Normal Wallets</span>
                      <span className="text-sm">75%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Contracts</span>
                      <span className="text-sm">15%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">DEX Pairs</span>
                      <span className="text-sm">10%</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6">
                <h3 className="text-sm font-medium mb-2">Recent Holder Changes</h3>
                <div className="space-y-2">
                  <div className="flex justify-between items-center bg-[#1A1A1A] p-2 rounded">
                    <div className="text-sm">New Holder</div>
                    <div className="text-sm text-[#88D693]">+$25,000</div>
                    <div className="text-sm text-gray-400">2 mins ago</div>
                  </div>
                  <div className="flex justify-between items-center bg-[#1A1A1A] p-2 rounded">
                    <div className="text-sm">Wallet Sold</div>
                    <div className="text-sm text-[rgb(240,148,164)]">-$12,000</div>
                    <div className="text-sm text-gray-400">5 mins ago</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Supply Analysis */}
            <div className="card">
              <h2 className="text-lg font-medium mb-4 flex items-center space-x-2">
                <FaCoins className="w-5 h-5 text-[rgb(255,208,57)]" />
                <span>Supply Analysis</span>
              </h2>
              <div className="grid grid-cols-3 gap-6">
                <div>
                  <div className="text-sm text-gray-400">Total Supply</div>
                  <div className="text-xl font-medium">{formatNumber(token.totalSupply)}</div>
                  <div className="text-sm text-gray-400">Tokens</div>
                </div>
                <div>
                  <div className="text-sm text-gray-400">Circulating Supply</div>
                  <div className="text-xl font-medium">
                    {formatPercent(token.circulatingSupply / token.totalSupply * 100)}
                  </div>
                  <div className="text-sm text-gray-400">of Total Supply</div>
                </div>
                <div>
                  <div className="text-sm text-gray-400">Burn Rate (24h)</div>
                  <div className="text-xl font-medium text-[#88D693]">+2.5%</div>
                  <div className="text-sm text-gray-400">Tokens Burned</div>
                </div>
              </div>
            </div>
          </>
        )}

        {activeTab === 'social' && (
          <>
            {/* Social & Community */}
            <div className="card">
              <h2 className="text-lg font-medium mb-4 flex items-center space-x-2">
                <FaTwitter className="w-5 h-5 text-[#1DA1F2]" />
                <span>Social & Community</span>
                <span className="ml-2 text-sm px-2 py-0.5 rounded bg-[#88D693]/20 text-[#88D693]">
                  High Activity
                </span>
              </h2>

              {/* Sentiment Analysis */}
              <div className="mb-6">
                <h3 className="text-sm font-medium mb-2">Sentiment Analysis (24h)</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-[#1A1A1A] p-4 rounded-lg">
                    <div className="text-sm text-gray-400">Overall Sentiment</div>
                    <div className="text-xl font-medium text-[#88D693]">Bullish (78%)</div>
                    <div className="mt-2 space-y-1">
                      <div className="flex justify-between">
                        <span className="text-sm">Positive</span>
                        <span className="text-sm text-[#88D693]">78%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Neutral</span>
                        <span className="text-sm text-gray-400">12%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Negative</span>
                        <span className="text-sm text-[rgb(240,148,164)]">10%</span>
                      </div>
                    </div>
                  </div>
                  <div className="bg-[#1A1A1A] p-4 rounded-lg">
                    <div className="text-sm text-gray-400">Key Influencers</div>
                    <div className="mt-2 space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm">@crypto_expert</span>
                        <span className="text-sm text-[#88D693]">Bullish</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm">@defi_analyst</span>
                        <span className="text-sm text-[#88D693]">Bullish</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6">
                {/* Twitter Metrics */}
                <div>
                  <h3 className="text-sm font-medium mb-2">Twitter Metrics</h3>
                  <div className="space-y-4">
                    <div>
                      <div className="text-sm text-gray-400">Followers</div>
                      <div className="text-xl font-medium">12.5K</div>
                      <div className="text-sm text-[#88D693]">+5.2% (24h)</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-400">Engagement Rate</div>
                      <div className="text-xl font-medium">3.2%</div>
                    </div>
                  </div>
                </div>

                {/* Telegram Metrics */}
                <div>
                  <h3 className="text-sm font-medium mb-2">Telegram Metrics</h3>
                  <div className="space-y-4">
                    <div>
                      <div className="text-sm text-gray-400">Members</div>
                      <div className="text-xl font-medium">8.2K</div>
                      <div className="text-sm text-[#88D693]">+2.8% (24h)</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-400">Active Members</div>
                      <div className="text-xl font-medium">1.5K</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Community Engagement */}
            <div className="card">
              <h2 className="text-lg font-medium mb-4 flex items-center space-x-2">
                <FaUsers className="w-5 h-5 text-[#1DA1F2]" />
                <span>Community Engagement</span>
                <span className="ml-2 text-sm px-2 py-0.5 rounded bg-[#88D693]/20 text-[#88D693]">
                  High Activity
                </span>
              </h2>
              <div className="grid grid-cols-2 gap-6">
                <div className="bg-[#1A1A1A] p-4 rounded-lg">
                  <div className="text-sm text-gray-400">Discussion Activity</div>
                  <div className="mt-2 space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm flex items-center">
                        <FaDiscord className="w-4 h-4 text-[#7289DA] mr-2" />
                        Discord Members
                      </span>
                      <span className="text-sm text-[#88D693]">15.2K</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Daily Messages</span>
                      <span className="text-sm text-[#88D693]">2.5K</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Active Channels</span>
                      <span className="text-sm">12</span>
                    </div>
                  </div>
                </div>
                <div className="bg-[#1A1A1A] p-4 rounded-lg">
                  <div className="text-sm text-gray-400">Community Growth</div>
                  <div className="mt-2 space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">New Members (24h)</span>
                      <span className="text-sm text-[#88D693]">+1.2K</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Retention Rate</span>
                      <span className="text-sm text-[#88D693]">85%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Community Score</span>
                      <span className="text-sm text-[rgb(255,208,57)]">High</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-4">
                <LineChart 
                  data={communityGrowthData}
                  title="Community Growth Trend"
                  color="#88D693"
                />
              </div>
            </div>
          </>
        )}

        {activeTab === 'risk' && (
          <>
            {/* Risk Assessment */}
            <div className="card">
              <h2 className="text-lg font-medium mb-4 flex items-center space-x-2">
                <FaShieldAlt className="w-5 h-5 text-[#88D693]" />
                <span>Risk Assessment</span>
              </h2>

              {/* Key Risk Indicators */}
              <div className="flex items-center space-x-4 mb-6 bg-[#1A1A1A] p-3 rounded-lg">
                <div className="flex items-center">
                  <span className="text-sm text-gray-400">NoMint:</span>
                  <span className="text-sm text-[#88D693] ml-1">Yes ✓</span>
                </div>
                <div className="flex items-center">
                  <span className="text-sm text-gray-400">Blacklist:</span>
                  <span className="text-sm text-[#88D693] ml-1">No ✓</span>
                </div>
                <div className="flex items-center">
                  <span className="text-sm text-gray-400">Burnt:</span>
                  <span className="text-sm text-[#88D693] ml-1">100% 🔥</span>
                </div>
                <div className="flex items-center">
                  <span className="text-sm text-gray-400">Top 10:</span>
                  <span className="text-sm text-[#88D693] ml-1">{token.top10HoldersPercent}% ✓</span>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-6">
                {/* Contract Risk */}
                <div>
                  <h3 className="text-sm font-medium mb-2 flex items-center space-x-1">
                    <ExclamationCircleIcon className="w-4 h-4 text-[rgb(240,148,164)]" />
                    <span>Contract Risk</span>
                  </h3>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-400">Code Analysis</span>
                      <span className="text-sm text-[#88D693]">Low Risk</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-400">Ownership</span>
                      <span className="text-sm text-[#88D693]">Renounced</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-400">Mint Function</span>
                      <span className="text-sm text-[rgb(240,148,164)]">Present</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-400">Contract Age</span>
                      <span className="text-sm">{token.age}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-400">Verified Source</span>
                      <span className="text-sm text-[#88D693]">Yes</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-400">Proxy Contract</span>
                      <span className="text-sm text-[rgb(240,148,164)]">No</span>
                    </div>
                  </div>
                </div>

                {/* Liquidity Risk */}
                <div>
                  <h3 className="text-sm font-medium mb-2 flex items-center space-x-1">
                    <FaLock className="w-4 h-4" />
                    <span>Liquidity Risk</span>
                  </h3>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-400">Lock Status</span>
                      <span className="text-sm text-[#88D693]">Locked</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-400">Lock Duration</span>
                      <span className="text-sm">365 days</span>
                    </div>
                  </div>
                </div>

                {/* Trading Risk */}
                <div>
                  <h3 className="text-sm font-medium mb-2">Trading Risk</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-400">Manipulation</span>
                      <span className="text-sm text-[#88D693]">No Signs</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-400">Wash Trading</span>
                      <span className="text-sm text-[#88D693]">Not Detected</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Overall Risk Score */}
              <div className="mt-6 p-4 bg-[#1A1A1A] rounded-lg">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-medium">Overall Risk Score</span>
                  <span className="text-lg font-medium text-[#88D693]">Low Risk</span>
                </div>
              </div>
            </div>

            {/* Investment Metrics */}
            <div className="card">
              <h2 className="text-lg font-medium mb-4 flex items-center space-x-2">
                <FaChartLine className="w-5 h-5 text-[rgb(255,208,57)]" />
                <span>Investment Metrics</span>
                <div className="flex items-center ml-2 bg-[#88D693]/20 px-2 py-0.5 rounded">
                  <ArrowTrendingUpIcon className="w-4 h-4 text-[#88D693] mr-1" />
                  <span className="text-sm text-[#88D693]">Outperforming Market</span>
                </div>
              </h2>
              <div className="grid grid-cols-3 gap-6">
                <div>
                  <div className="text-sm text-gray-400">ROI Since Launch</div>
                  <div className="text-xl font-medium text-[#88D693]">+425%</div>
                  <div className="text-sm text-gray-400">vs Market +85%</div>
                </div>
                <div>
                  <div className="text-sm text-gray-400">Volatility Score</div>
                  <div className="text-xl font-medium">Medium</div>
                  <div className="text-sm text-gray-400">Based on 30d data</div>
                </div>
                <div>
                  <div className="text-sm text-gray-400">Investment Rating</div>
                  <div className="text-xl font-medium text-[#88D693]">Strong Buy</div>
                  <div className="text-sm text-gray-400">Based on all metrics</div>
                </div>
              </div>
            </div>
          </>
        )}

        {activeTab === 'development' && (
          <>
            {/* Development Activity */}
            <div className="card">
              <h2 className="text-lg font-medium mb-4 flex items-center space-x-2">
                <FaCode className="w-5 h-5 text-[#1DA1F2]" />
                <span>Development Activity</span>
              </h2>
              <div className="grid grid-cols-2 gap-6">
                <div className="bg-[#1A1A1A] p-4 rounded-lg">
                  <div className="text-sm text-gray-400">GitHub Activity</div>
                  <div className="text-xl font-medium">High</div>
                  <div className="mt-2 space-y-1">
                    <div className="flex justify-between">
                      <span className="text-sm">Commits (7d)</span>
                      <span className="text-sm text-[#88D693]">32</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Contributors</span>
                      <span className="text-sm">8</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Last Update</span>
                      <span className="text-sm">2h ago</span>
                    </div>
                  </div>
                </div>
                <div className="bg-[#1A1A1A] p-4 rounded-lg">
                  <div className="text-sm text-gray-400">Recent Updates</div>
                  <div className="mt-2 space-y-2">
                    <div className="text-sm">• New roadmap released</div>
                    <div className="text-sm">• Weekly dev update</div>
                    <div className="text-sm">• Smart contract audit completed</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Team & Project Info */}
            <div className="card">
              <h2 className="text-lg font-medium mb-4 flex items-center space-x-2">
                <FaUserTie className="w-5 h-5 text-[rgb(255,208,57)]" />
                <span>Team & Project Information</span>
                <div className="flex items-center ml-2">
                  <FaCheckCircle className="w-4 h-4 text-[#88D693]" />
                  <span className="ml-1 text-sm text-[#88D693]">KYC Verified</span>
                </div>
              </h2>
              <div className="grid grid-cols-2 gap-6">
                <div className="bg-[#1A1A1A] p-4 rounded-lg">
                  <div className="text-sm text-gray-400">Team Background</div>
                  <div className="mt-2 space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Team Size</span>
                      <span className="text-sm">12 Members</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">KYC Status</span>
                      <span className="text-sm text-[#88D693]">Verified</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Previous Projects</span>
                      <span className="text-sm">3 Successful</span>
                    </div>
                  </div>
                </div>
                <div className="bg-[#1A1A1A] p-4 rounded-lg">
                  <div className="text-sm text-gray-400">Project Milestones</div>
                  <div className="mt-2 space-y-2">
                    <div className="text-sm">• Mainnet Launch: Completed</div>
                    <div className="text-sm">• DEX Integration: In Progress</div>
                    <div className="text-sm">• Mobile App: Q2 2024</div>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Quick Actions - Always visible */}
      <div className="flex items-center space-x-2">
        <div className="flex items-center space-x-2 mr-4">
          <span className="text-sm text-gray-400">Charts:</span>
          <a 
            href={`https://dexscreener.com/solana/${token.address}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm bg-[#1A1A1A] px-3 py-1 rounded-lg hover:bg-[#222222] flex items-center space-x-1"
          >
            <FaChartLine className="w-4 h-4" />
            <span>DexScreener</span>
          </a>
          <a 
            href={`https://www.geckoterminal.com/solana/pools/${token.address}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm bg-[#1A1A1A] px-3 py-1 rounded-lg hover:bg-[#222222] flex items-center space-x-1"
          >
            <FaChartLine className="w-4 h-4" />
            <span>GeckoTerminal</span>
          </a>
          <a 
            href={`https://birdeye.so/token/${token.address}?chain=solana`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm bg-[#1A1A1A] px-3 py-1 rounded-lg hover:bg-[#222222] flex items-center space-x-1"
          >
            <FaChartLine className="w-4 h-4" />
            <span>Birdeye</span>
          </a>
        </div>
        <div className="border-l border-[#333333] h-6 mx-2" />
        <button className="text-sm bg-[#1A1A1A] px-3 py-1 rounded-lg hover:bg-[#222222] flex items-center space-x-1">
          <FaExchangeAlt className="w-4 h-4" />
          <span>View on Explorer</span>
        </button>
        <button className="text-sm bg-[#1A1A1A] px-3 py-1 rounded-lg hover:bg-[#222222] flex items-center space-x-1">
          <ChartBarIcon className="w-4 h-4" />
          <span>Share Token</span>
        </button>
      </div>

      {/* Token Tags - Always visible */}
      {token.tags && token.tags.length > 0 && (
        <div className="flex items-center space-x-2 mt-2">
          {token.tags.map(tag => (
            <span key={tag} className="text-xs bg-[#1A1A1A] px-2 py-1 rounded">
              {tag}
            </span>
          ))}
        </div>
      )}

      {/* Data Sources - Always visible */}
      <div className="text-xs text-gray-400 mt-4">
        Data provided by: Birdeye, Jupiter, LunarCrush, Solscan
      </div>

      {/* Alert Settings Modal */}
      {isAlertModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-[#111111] rounded-xl p-6 w-[480px] border border-[#222222]">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-white">Alert Settings</h2>
              <button 
                onClick={handleCloseAlertModal}
                className="text-gray-400 hover:text-white"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <div className="space-y-6">
              {/* Price Change Alert */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Checkbox
                    checked={alertSettings.priceChange}
                    onChange={(checked) => setAlertSettings({
                      ...alertSettings,
                      priceChange: checked
                    })}
                    label="Price Change"
                  />
                  <Input
                    type="number"
                    value={alertSettings.priceChangeThreshold}
                    onChange={(e) => setAlertSettings({
                      ...alertSettings,
                      priceChangeThreshold: Number(e.target.value)
                    })}
                    disabled={!alertSettings.priceChange}
                    className="w-20"
                    suffix="%"
                  />
                </div>
                <p className="text-sm text-gray-400">Get notified when price changes by this percentage</p>
              </div>

              {/* Volume Change Alert */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Checkbox
                    checked={alertSettings.volumeChange}
                    onChange={(checked) => setAlertSettings({
                      ...alertSettings,
                      volumeChange: checked
                    })}
                    label="Volume Increase"
                  />
                  <Input
                    type="number"
                    value={alertSettings.volumeChangeThreshold}
                    onChange={(e) => setAlertSettings({
                      ...alertSettings,
                      volumeChangeThreshold: Number(e.target.value)
                    })}
                    disabled={!alertSettings.volumeChange}
                    className="w-20"
                    suffix="%"
                  />
                </div>
                <p className="text-sm text-gray-400">Get notified when volume increases by this percentage</p>
              </div>

              {/* Holders Change Alert */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Checkbox
                    checked={alertSettings.holdersChange}
                    onChange={(checked) => setAlertSettings({
                      ...alertSettings,
                      holdersChange: checked
                    })}
                    label="Holders Increase"
                  />
                  <Input
                    type="number"
                    value={alertSettings.holdersChangeThreshold}
                    onChange={(e) => setAlertSettings({
                      ...alertSettings,
                      holdersChangeThreshold: Number(e.target.value)
                    })}
                    disabled={!alertSettings.holdersChange}
                    className="w-20"
                    suffix="%"
                  />
                </div>
                <p className="text-sm text-gray-400">Get notified when holder count increases by this percentage</p>
              </div>
            </div>

            <div className="flex justify-end space-x-3 mt-8">
              <button
                onClick={handleCloseAlertModal}
                className="px-4 py-2 bg-[#222222] text-white rounded-lg hover:bg-[#333333] transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveAlertSettings}
                className="px-4 py-2 bg-[#88D693] text-black font-medium rounded-lg hover:bg-[#88D693]/90 transition-colors"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TokenDetail; 