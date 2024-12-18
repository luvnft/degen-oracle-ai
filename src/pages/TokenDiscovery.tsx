import React, { useState } from 'react';
import PageLayout from '../components/layout/PageLayout';
import Card from '../components/ui/Card';
import { FaRobot, FaSearch } from 'react-icons/fa';
import { Switch } from '@headlessui/react';
import TokenTable, { Token, convertedMockTokens } from '../components/tables/TokenTable';

type ScanMode = 'ai' | 'manual';

const TokenDiscovery = () => {
  const [mode, setMode] = useState<ScanMode>('ai');
  const [isScanning, setIsScanning] = useState(false);
  const [tokens, setTokens] = useState(convertedMockTokens);
  const [filters, setFilters] = useState({
    minMarketCap: 50000,
    minLiquidity: 30000,
    minHolders: 100,
    verifiedOnly: true,
    socialRequired: true
  });

  const handleScan = async () => {
    setIsScanning(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      // Update tokens
      setTokens(convertedMockTokens);
    } finally {
      setIsScanning(false);
    }
  };

  const ModeSwitcher = () => (
    <div className="grid grid-cols-2 gap-6 mb-6">
      <button
        onClick={() => setMode('ai')}
        className={`relative p-6 rounded-lg transition-all duration-200 ${
          mode === 'ai'
            ? 'bg-gradient-to-br from-[#88D693]/20 to-[#88D693]/5 border border-[#88D693]/20'
            : 'bg-[#111111] hover:bg-[#1A1A1A]'
        }`}
      >
        <div className="flex flex-col items-center space-y-4">
          <div className={`p-4 rounded-full ${
            mode === 'ai' ? 'bg-[#88D693]/10' : 'bg-[#1A1A1A]'
          }`}>
            <FaRobot className={`w-8 h-8 ${
              mode === 'ai' ? 'text-[#88D693]' : 'text-gray-400'
            }`} />
          </div>
          <div className="text-center">
            <h3 className={`text-lg font-medium ${
              mode === 'ai' ? 'text-white' : 'text-gray-400'
            }`}>
              AI Recommendations
            </h3>
            <p className="text-sm text-gray-400 mt-1">
              Smart scanning with AI-powered analysis
            </p>
          </div>
        </div>
      </button>

      <button
        onClick={() => setMode('manual')}
        className={`relative p-6 rounded-lg transition-all duration-200 ${
          mode === 'manual'
            ? 'bg-gradient-to-br from-[#FFD039]/20 to-[#FFD039]/5 border border-[#FFD039]/20'
            : 'bg-[#111111] hover:bg-[#1A1A1A]'
        }`}
      >
        <div className="flex flex-col items-center space-y-4">
          <div className={`p-4 rounded-full ${
            mode === 'manual' ? 'bg-[#FFD039]/10' : 'bg-[#1A1A1A]'
          }`}>
            <FaSearch className={`w-8 h-8 ${
              mode === 'manual' ? 'text-[#FFD039]' : 'text-gray-400'
            }`} />
          </div>
          <div className="text-center">
            <h3 className={`text-lg font-medium ${
              mode === 'manual' ? 'text-white' : 'text-gray-400'
            }`}>
              Manual Scanner
            </h3>
            <p className="text-sm text-gray-400 mt-1">
              Customize your own scanning parameters
            </p>
          </div>
        </div>
      </button>
    </div>
  );

  const FilterPanel = () => (
    <Card className="mb-6">
      <div className="flex flex-col md:flex-row gap-6">
        {/* Market Data */}
        <div className="flex-1">
          <h3 className="text-sm font-medium mb-3">Market Data</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm text-gray-400">Min Market Cap (USD)</label>
              <input
                type="number"
                value={filters.minMarketCap}
                onChange={(e) => setFilters({...filters, minMarketCap: Number(e.target.value)})}
                className="w-full bg-[#111111] text-white px-3 py-2 rounded-lg mt-1 border border-[#333333] focus:outline-none focus:border-[#88D693]"
              />
            </div>
            <div>
              <label className="text-sm text-gray-400">Min Liquidity (USD)</label>
              <input
                type="number"
                value={filters.minLiquidity}
                onChange={(e) => setFilters({...filters, minLiquidity: Number(e.target.value)})}
                className="w-full bg-[#111111] text-white px-3 py-2 rounded-lg mt-1 border border-[#333333] focus:outline-none focus:border-[#88D693]"
              />
            </div>
          </div>
        </div>

        {/* Holders & Distribution */}
        <div className="flex-1">
          <h3 className="text-sm font-medium mb-3">Holders & Distribution</h3>
          <div>
            <label className="text-sm text-gray-400">Min Holders</label>
            <input
              type="number"
              value={filters.minHolders}
              onChange={(e) => setFilters({...filters, minHolders: Number(e.target.value)})}
              className="w-full bg-[#111111] text-white px-3 py-2 rounded-lg mt-1 border border-[#333333] focus:outline-none focus:border-[#88D693]"
            />
          </div>
        </div>

        {/* Validation */}
        <div className="flex-1">
          <h3 className="text-sm font-medium mb-3">Validation</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <label className="text-sm text-gray-400">Verified Contract Only</label>
              <Switch
                checked={filters.verifiedOnly}
                onChange={(checked) => setFilters({...filters, verifiedOnly: checked})}
                className={`${
                  filters.verifiedOnly ? 'bg-[#88D693]' : 'bg-[#333333]'
                } relative inline-flex h-6 w-11 items-center rounded-full transition-colors`}
              >
                <span className={`${
                  filters.verifiedOnly ? 'translate-x-6' : 'translate-x-1'
                } inline-block h-4 w-4 transform rounded-full bg-white transition-transform`}/>
              </Switch>
            </div>
            <div className="flex items-center justify-between">
              <label className="text-sm text-gray-400">Require Social Media</label>
              <Switch
                checked={filters.socialRequired}
                onChange={(checked) => setFilters({...filters, socialRequired: checked})}
                className={`${
                  filters.socialRequired ? 'bg-[#88D693]' : 'bg-[#333333]'
                } relative inline-flex h-6 w-11 items-center rounded-full transition-colors`}
              >
                <span className={`${
                  filters.socialRequired ? 'translate-x-6' : 'translate-x-1'
                } inline-block h-4 w-4 transform rounded-full bg-white transition-transform`}/>
              </Switch>
            </div>
          </div>
        </div>

        {/* Scan Button */}
        <div className="flex items-end">
          <button
            onClick={handleScan}
            disabled={isScanning}
            className="
              bg-[#88D693] hover:bg-[#88D693]/90
              text-black font-medium
              px-8 py-2.5 rounded-lg
              flex items-center space-x-2
              transform transition-all duration-200
              hover:scale-[1.02] active:scale-[0.98]
              disabled:opacity-50 disabled:cursor-not-allowed
              h-10
            "
          >
            {isScanning ? (
              <>
                <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
                <span>Scanning...</span>
              </>
            ) : (
              <>
                <FaSearch className="w-4 h-4" />
                <span>Start Scan</span>
              </>
            )}
          </button>
        </div>
      </div>
    </Card>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold">Token Discovery</h1>
        <p className="text-gray-400">Find and analyze new AI tokens</p>
      </div>

      {/* Mode Switcher */}
      <ModeSwitcher />

      {/* Filter Panel */}
      {mode === 'manual' && <FilterPanel />}

      {/* Results */}
      <TokenTable tokens={tokens} />
    </div>
  );
};

export default function TokenDiscoveryPage() {
  return (
    <PageLayout>
      <TokenDiscovery />
    </PageLayout>
  );
} 