import React, { useState } from 'react';
import TokenTable from '../components/tokens/TokenTable';
import { useTokenStore } from '../store/tokenStore';
import { MagnifyingGlassIcon, FunnelIcon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { Input } from '../components/form/Input';
import Switch from '../components/form/Switch';
import { AlertSettingsModal } from '../components/modals/AlertSettingsModal';
import { FilterModal } from '../components/modals/FilterModal';

export interface AlertSettings {
  enabled: boolean;
  telegram: {
    priceChange: number;
    volumeSpike: number;
    holdersChange: number;
    socialEngagement: number;
  };
}

const initialAlertSettings: AlertSettings = {
  enabled: false,
  telegram: {
    priceChange: 10,
    volumeSpike: 100,
    holdersChange: 20,
    socialEngagement: 50
  }
};

interface FilterSettings {
  minPrice: string;
  maxPrice: string;
  minVolume: string;
  maxVolume: string;
  minPerformance1h: string;
  maxPerformance1h: string;
  minPerformance24h: string;
  maxPerformance24h: string;
  riskLevel: string;
}

const initialFilters: FilterSettings = {
  minPrice: '',
  maxPrice: '',
  minVolume: '',
  maxVolume: '',
  minPerformance1h: '',
  maxPerformance1h: '',
  minPerformance24h: '',
  maxPerformance24h: '',
  riskLevel: ''
};

export default function Watchlist() {
  const { tokens, loading, error } = useTokenStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [isAlertSettingsOpen, setIsAlertSettingsOpen] = useState(false);
  const [filters, setFilters] = useState<FilterSettings>(initialFilters);
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [alertSettings, setAlertSettings] = useState<AlertSettings>(initialAlertSettings);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Watchlist</h1>
          <p className="text-gray-400">Track and monitor your selected AI tokens</p>
        </div>

        {/* Alert Settings Button */}
        <button
          onClick={() => setIsAlertSettingsOpen(true)}
          className="
            flex items-center px-4 py-2 space-x-2
            bg-black rounded-xl border border-[#333333]
            text-gray-400 hover:text-white
            transition-colors duration-200
          "
        >
          <BellIcon className="w-5 h-5" />
          <span>Alert Settings</span>
        </button>
      </div>

      {/* Search & Filters */}
      <div className="bg-[#111111] rounded-lg p-6">
        <div className="flex items-center space-x-4">
          {/* Search */}
          <div className="flex-1">
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search watchlist..."
                className="
                  w-full bg-black rounded-xl px-4 py-3
                  border border-[#333333]
                  text-white placeholder-gray-500
                  focus:outline-none focus:border-[#88D693]
                  transition-colors duration-200
                  pl-10
                "
              />
              <MagnifyingGlassIcon className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
            </div>
          </div>

          {/* Filter Toggle */}
          <button
            onClick={() => setIsFilterModalOpen(true)}
            className="flex items-center px-4 py-3 space-x-2 bg-black rounded-xl border border-[#333333] text-gray-400 hover:text-white"
          >
            <FunnelIcon className="w-5 h-5" />
            <span>Filters</span>
          </button>
        </div>
      </div>

      {/* Token Table */}
      <div className="bg-[#111111] rounded-lg">
        <TokenTable
          data={tokens?.filter(token => token.isWatchlisted) ?? []}
          loading={loading}
          error={error}
        />
      </div>

      {/* Alert Settings Modal */}
      <AlertSettingsModal
        isOpen={isAlertSettingsOpen}
        onClose={() => setIsAlertSettingsOpen(false)}
        settings={alertSettings}
        onSave={(newSettings) => {
          setAlertSettings(newSettings);
          setIsAlertSettingsOpen(false);
        }}
      />

      {/* Filter Modal */}
      <FilterModal
        isOpen={isFilterModalOpen}
        onClose={() => setIsFilterModalOpen(false)}
        filters={filters}
        onApply={(newFilters) => {
          setFilters(newFilters);
          setIsFilterModalOpen(false);
        }}
      />
    </div>
  );
}
