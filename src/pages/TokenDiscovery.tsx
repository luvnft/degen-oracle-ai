import React, { useState } from 'react';
import TokenTable from '../components/tokens/TokenTable';
import { useTokenStore } from '../store/tokenStore';
import { ChartBarIcon, MagnifyingGlassIcon, CurrencyDollarIcon, UserGroupIcon, ShieldCheckIcon } from '@heroicons/react/24/outline';
import { Input } from '../components/form/Input';
import Select from '../components/form/Select';
import Switch from '../components/form/Switch';
import Button from '../components/form/Button';
import { Disclosure } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/24/outline';

type ScanMode = 'ai' | 'manual';

export default function TokenDiscovery() {
  const [mode, setMode] = useState<ScanMode>('ai');
  const [isScanning, setIsScanning] = useState(false);
  const { tokens, loading, error, fetchTokens } = useTokenStore();
  
  const [filters, setFilters] = useState({
    // Market Data
    minMarketCap: 50000,
    maxMarketCap: undefined as number | undefined,
    minLiquidity: 30000,
    maxLiquidity: undefined as number | undefined,
    minPrice: undefined as number | undefined,
    maxPrice: undefined as number | undefined,

    // Holders
    minHolders: 100,
    maxHolders: undefined as number | undefined,
    minTop10Percent: undefined as number | undefined,
    maxTop10Percent: undefined as number | undefined,

    // Volume & Activity
    minHourlyVolume: undefined as number | undefined,
    minHourlyTxns: undefined as number | undefined,
    maxAge: undefined as number | undefined, // in days

    // Performance
    min1hChange: undefined as number | undefined,
    min24hChange: undefined as number | undefined,
    minWeekChange: undefined as number | undefined,

    // Tags & Categories
    selectedTags: [] as string[],
    selectedCategories: [] as string[],

    // Risk & Validation
    requireVerifiedContract: true,
    maxRiskScore: undefined as number | undefined,
    requireSocialMedia: true,
  });

  const handleScan = async () => {
    setIsScanning(true);
    try {
      await fetchTokens(filters);
    } finally {
      setIsScanning(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold">Token Discovery</h1>
        <p className="text-gray-400">Find and analyze new AI tokens with high potential</p>
      </div>

      {/* Mode Selector */}
      <div className="grid grid-cols-2 gap-6">
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
              <ChartBarIcon className={`w-8 h-8 ${
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
              <MagnifyingGlassIcon className={`w-8 h-8 ${
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

      {/* Manual Scan Filters */}
      {mode === 'manual' && (
        <div className="bg-[#111111] rounded-lg">
          {/* Market Data */}
          <Disclosure defaultOpen>
            {({ open }) => (
              <>
                <Disclosure.Button className="w-full px-6 py-4 flex items-center justify-between border-b border-[#333333]">
                  <div className="flex items-center">
                    <CurrencyDollarIcon className="w-5 h-5 mr-2 text-gray-400" />
                    <span className="text-lg font-medium">Market Data</span>
                  </div>
                  <ChevronDownIcon className={`w-5 h-5 text-gray-400 transition-transform ${open ? 'transform rotate-180' : ''}`} />
                </Disclosure.Button>
                <Disclosure.Panel className="px-6 py-4">
                  <div className="grid grid-cols-3 gap-6">
                    <Input
                      label="Min Market Cap (USD)"
                      type="number"
                      value={filters.minMarketCap}
                      onChange={(e) => setFilters(prev => ({
                        ...prev,
                        minMarketCap: Number(e.target.value)
                      }))}
                      placeholder="50,000"
                    />
                    <Input
                      label="Min Liquidity (USD)"
                      type="number"
                      value={filters.minLiquidity}
                      onChange={(e) => setFilters(prev => ({
                        ...prev,
                        minLiquidity: Number(e.target.value)
                      }))}
                      placeholder="30,000"
                    />
                    <Input
                      label="Min Price (USD)"
                      type="number"
                      value={filters.minPrice}
                      onChange={(e) => setFilters(prev => ({
                        ...prev,
                        minPrice: Number(e.target.value)
                      }))}
                    />
                  </div>
                </Disclosure.Panel>
              </>
            )}
          </Disclosure>

          {/* Holders & Distribution */}
          <Disclosure>
            {({ open }) => (
              <>
                <Disclosure.Button className="w-full px-6 py-4 flex items-center justify-between border-b border-[#333333]">
                  <div className="flex items-center">
                    <UserGroupIcon className="w-5 h-5 mr-2 text-gray-400" />
                    <span className="text-lg font-medium">Holders & Distribution</span>
                  </div>
                  <ChevronDownIcon className={`w-5 h-5 text-gray-400 transition-transform ${open ? 'transform rotate-180' : ''}`} />
                </Disclosure.Button>
                <Disclosure.Panel className="px-6 py-4">
                  <div className="grid grid-cols-2 gap-6">
                    <Input
                      label="Min Holders"
                      type="number"
                      value={filters.minHolders}
                      onChange={(e) => setFilters(prev => ({
                        ...prev,
                        minHolders: Number(e.target.value)
                      }))}
                      placeholder="100"
                    />
                    <Input
                      label="Max Top 10 Holders %"
                      type="number"
                      value={filters.maxTop10Percent}
                      onChange={(e) => setFilters(prev => ({
                        ...prev,
                        maxTop10Percent: Number(e.target.value)
                      }))}
                    />
                  </div>
                </Disclosure.Panel>
              </>
            )}
          </Disclosure>

          {/* Volume & Activity */}
          <Disclosure>
            {({ open }) => (
              <>
                <Disclosure.Button className="w-full px-6 py-4 flex items-center justify-between border-b border-[#333333]">
                  <div className="flex items-center">
                    <ChartBarIcon className="w-5 h-5 mr-2 text-gray-400" />
                    <span className="text-lg font-medium">Volume & Activity</span>
                  </div>
                  <ChevronDownIcon className={`w-5 h-5 text-gray-400 transition-transform ${open ? 'transform rotate-180' : ''}`} />
                </Disclosure.Button>
                <Disclosure.Panel className="px-6 py-4">
                  <div className="grid grid-cols-3 gap-6">
                    <Input
                      label="Min Hourly Volume (USD)"
                      type="number"
                      value={filters.minHourlyVolume}
                      onChange={(e) => setFilters(prev => ({
                        ...prev,
                        minHourlyVolume: Number(e.target.value)
                      }))}
                    />
                    <Input
                      label="Min Hourly Transactions"
                      type="number"
                      value={filters.minHourlyTxns}
                      onChange={(e) => setFilters(prev => ({
                        ...prev,
                        minHourlyTxns: Number(e.target.value)
                      }))}
                    />
                    <Input
                      label="Max Token Age (days)"
                      type="number"
                      value={filters.maxAge}
                      onChange={(e) => setFilters(prev => ({
                        ...prev,
                        maxAge: Number(e.target.value)
                      }))}
                    />
                  </div>
                </Disclosure.Panel>
              </>
            )}
          </Disclosure>

          {/* Risk & Validation */}
          <Disclosure>
            {({ open }) => (
              <>
                <Disclosure.Button className="w-full px-6 py-4 flex items-center justify-between">
                  <div className="flex items-center">
                    <ShieldCheckIcon className="w-5 h-5 mr-2 text-gray-400" />
                    <span className="text-lg font-medium">Risk & Validation</span>
                  </div>
                  <ChevronDownIcon className={`w-5 h-5 text-gray-400 transition-transform ${open ? 'transform rotate-180' : ''}`} />
                </Disclosure.Button>
                <Disclosure.Panel className="px-6 py-4">
                  <div className="flex space-x-8">
                    <Switch
                      checked={filters.requireVerifiedContract}
                      onChange={(checked) => setFilters(prev => ({
                        ...prev,
                        requireVerifiedContract: checked
                      }))}
                      label="Require Verified Contract"
                    />
                    <Switch
                      checked={filters.requireSocialMedia}
                      onChange={(checked) => setFilters(prev => ({
                        ...prev,
                        requireSocialMedia: checked
                      }))}
                      label="Require Social Media"
                    />
                  </div>
                </Disclosure.Panel>
              </>
            )}
          </Disclosure>

          {/* Scan Button */}
          <div className="px-6 py-4 border-t border-[#333333] flex justify-end">
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
              "
            >
              {isScanning ? (
                <>
                  <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
                  <span>Scanning...</span>
                </>
              ) : (
                <>
                  <MagnifyingGlassIcon className="w-4 h-4" />
                  <span>Start Scanning</span>
                </>
              )}
            </button>
          </div>
        </div>
      )}

      {/* Results */}
      <div className="bg-[#111111] rounded-lg">
        <TokenTable
          data={tokens}
          loading={loading}
          error={error}
        />
      </div>
    </div>
  );
} 