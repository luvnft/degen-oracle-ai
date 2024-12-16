import React, { useState } from 'react';
import TokenTable from '../components/tokens/TokenTable';
import { useTokenStore } from '../store/tokenStore';
import { MagnifyingGlassIcon, FunnelIcon, BellIcon } from '@heroicons/react/24/outline';
import { Input } from '../components/form/Input';
import { Disclosure } from '@headlessui/react';
import { Switch } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';

export default function Watchlist() {
  const { tokens, loading, error } = useTokenStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [isAlertSettingsOpen, setIsAlertSettingsOpen] = useState(false);
  const [filters, setFilters] = useState({
    minPrice: '',
    maxPrice: '',
    minVolume: '',
    maxVolume: '',
    minPerformance1h: '',
    maxPerformance1h: '',
    minPerformance24h: '',
    maxPerformance24h: '',
    riskLevel: 'all', // 'all', 'low', 'medium', 'high'
  });

  // Add Alert Settings state
  const [alertSettings, setAlertSettings] = useState({
    enabled: true,
    telegram: {
      priceChange: 10, // Alert when price changes by 10%
      volumeSpike: 100, // Alert when volume increases by 100%
      holdersChange: 20, // Alert when holders increase by 20%
      socialEngagement: 50, // Alert when social engagement increases by 50%
    }
  });

  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);

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

// Create new AlertSettingsModal component
interface AlertSettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  settings: typeof initialAlertSettings;
  onSave: (settings: typeof initialAlertSettings) => void;
}

const AlertSettingsModal = ({ isOpen, onClose, settings, onSave }: AlertSettingsModalProps) => {
  const [localSettings, setLocalSettings] = useState(settings);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-[#111111] rounded-xl border border-[#333333] w-full max-w-md">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#333333]">
          <div>
            <h2 className="text-lg font-medium">Telegram Alert Settings</h2>
            <p className="text-sm text-gray-400">Configure when to receive alerts</p>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-white">
            <XMarkIcon className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Enable/Disable Alerts */}
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium">Enable Alerts</h3>
              <p className="text-sm text-gray-400">Receive notifications on Telegram</p>
            </div>
            <Switch
              checked={localSettings.enabled}
              onChange={(checked) => setLocalSettings(prev => ({ ...prev, enabled: checked }))}
            />
          </div>

          {/* Alert Conditions */}
          <div className="space-y-4">
            <h3 className="font-medium">Alert Conditions</h3>
            <div className="grid gap-4">
              <Input
                label="Price Change (%)"
                type="number"
                value={localSettings.telegram.priceChange}
                onChange={(e) => setLocalSettings(prev => ({
                  ...prev,
                  telegram: { ...prev.telegram, priceChange: Number(e.target.value) }
                }))}
                placeholder="10"
              />
              <Input
                label="Volume Spike (%)"
                type="number"
                value={localSettings.telegram.volumeSpike}
                onChange={(e) => setLocalSettings(prev => ({
                  ...prev,
                  telegram: { ...prev.telegram, volumeSpike: Number(e.target.value) }
                }))}
                placeholder="100"
              />
              <Input
                label="Holders Change (%)"
                type="number"
                value={localSettings.telegram.holdersChange}
                onChange={(e) => setLocalSettings(prev => ({
                  ...prev,
                  telegram: { ...prev.telegram, holdersChange: Number(e.target.value) }
                }))}
                placeholder="20"
              />
              <Input
                label="Social Engagement Increase (%)"
                type="number"
                value={localSettings.telegram.socialEngagement}
                onChange={(e) => setLocalSettings(prev => ({
                  ...prev,
                  telegram: { ...prev.telegram, socialEngagement: Number(e.target.value) }
                }))}
                placeholder="50"
              />
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end px-6 py-4 border-t border-[#333333] space-x-4">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-400 hover:text-white"
          >
            Cancel
          </button>
          <button
            onClick={() => onSave(localSettings)}
            className="
              bg-[#88D693] hover:bg-[#88D693]/90
              text-black font-medium
              px-4 py-2 rounded-lg
              transition-colors duration-200
            "
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

// Filter Modal Component
interface FilterModalProps {
  isOpen: boolean;
  onClose: () => void;
  filters: typeof initialFilters;
  onApply: (filters: typeof initialFilters) => void;
}

const FilterModal = ({ isOpen, onClose, filters, onApply }: FilterModalProps) => {
  const [localFilters, setLocalFilters] = useState(filters);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-[#111111] rounded-xl border border-[#333333] w-full max-w-2xl">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#333333]">
          <div>
            <h2 className="text-lg font-medium">Filter Tokens</h2>
            <p className="text-sm text-gray-400">Customize your watchlist view</p>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-white">
            <XMarkIcon className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Price Range */}
          <div className="grid grid-cols-2 gap-6">
            <Input
              label="Min Price (USD)"
              type="number"
              value={localFilters.minPrice}
              onChange={(e) => setLocalFilters(prev => ({
                ...prev,
                minPrice: e.target.value
              }))}
            />
            <Input
              label="Max Price (USD)"
              type="number"
              value={localFilters.maxPrice}
              onChange={(e) => setLocalFilters(prev => ({
                ...prev,
                maxPrice: e.target.value
              }))}
            />
          </div>

          {/* Volume Range */}
          <div className="grid grid-cols-2 gap-6">
            <Input
              label="Min Volume (USD)"
              type="number"
              value={localFilters.minVolume}
              onChange={(e) => setLocalFilters(prev => ({
                ...prev,
                minVolume: e.target.value
              }))}
            />
            <Input
              label="Max Volume (USD)"
              type="number"
              value={localFilters.maxVolume}
              onChange={(e) => setLocalFilters(prev => ({
                ...prev,
                maxVolume: e.target.value
              }))}
            />
          </div>

          {/* Performance */}
          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-4">
              <h3 className="font-medium">1h Performance</h3>
              <div className="grid grid-cols-2 gap-4">
                <Input
                  label="Min %"
                  type="number"
                  value={localFilters.minPerformance1h}
                  onChange={(e) => setLocalFilters(prev => ({
                    ...prev,
                    minPerformance1h: e.target.value
                  }))}
                />
                <Input
                  label="Max %"
                  type="number"
                  value={localFilters.maxPerformance1h}
                  onChange={(e) => setLocalFilters(prev => ({
                    ...prev,
                    maxPerformance1h: e.target.value
                  }))}
                />
              </div>
            </div>
            <div className="space-y-4">
              <h3 className="font-medium">24h Performance</h3>
              <div className="grid grid-cols-2 gap-4">
                <Input
                  label="Min %"
                  type="number"
                  value={localFilters.minPerformance24h}
                  onChange={(e) => setLocalFilters(prev => ({
                    ...prev,
                    minPerformance24h: e.target.value
                  }))}
                />
                <Input
                  label="Max %"
                  type="number"
                  value={localFilters.maxPerformance24h}
                  onChange={(e) => setLocalFilters(prev => ({
                    ...prev,
                    maxPerformance24h: e.target.value
                  }))}
                />
              </div>
            </div>
          </div>

          {/* Risk Level */}
          <div className="space-y-4">
            <h3 className="font-medium">Risk Level</h3>
            <select
              value={localFilters.riskLevel}
              onChange={(e) => setLocalFilters(prev => ({
                ...prev,
                riskLevel: e.target.value
              }))}
              className="
                w-full bg-black rounded-xl px-4 py-3
                border border-[#333333]
                text-white
                focus:outline-none focus:border-[#88D693]
                transition-colors duration-200
              "
            >
              <option value="all">All Levels</option>
              <option value="low">Low Risk</option>
              <option value="medium">Medium Risk</option>
              <option value="high">High Risk</option>
            </select>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end px-6 py-4 border-t border-[#333333] space-x-4">
          <button
            onClick={() => {
              setLocalFilters({
                minPrice: '',
                maxPrice: '',
                minVolume: '',
                maxVolume: '',
                minPerformance1h: '',
                maxPerformance1h: '',
                minPerformance24h: '',
                maxPerformance24h: '',
                riskLevel: 'all'
              });
            }}
            className="px-4 py-2 text-gray-400 hover:text-white"
          >
            Reset
          </button>
          <button
            onClick={() => onApply(localFilters)}
            className="
              bg-[#88D693] hover:bg-[#88D693]/90
              text-black font-medium
              px-4 py-2 rounded-lg
              transition-colors duration-200
            "
          >
            Apply Filters
          </button>
        </div>
      </div>
    </div>
  );
};
