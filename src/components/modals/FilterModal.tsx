import React, { useState } from 'react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { Input } from '../form/Input';
import Select from '../form/Select';

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

interface FilterModalProps {
  isOpen: boolean;
  onClose: () => void;
  filters: FilterSettings;
  onApply: (filters: FilterSettings) => void;
}

export const FilterModal = ({ isOpen, onClose, filters, onApply }: FilterModalProps) => {
  const [localFilters, setLocalFilters] = useState(filters);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-[#111111] rounded-xl border border-[#333333] w-full max-w-md">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#333333]">
          <div>
            <h2 className="text-lg font-medium">Filter Tokens</h2>
            <p className="text-sm text-gray-400">Set conditions to filter your watchlist</p>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-white">
            <XMarkIcon className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Price Range */}
          <div className="space-y-4">
            <h3 className="font-medium">Price Range</h3>
            <div className="grid grid-cols-2 gap-4">
              <Input
                label="Min Price"
                type="number"
                value={localFilters.minPrice}
                onChange={(e) => setLocalFilters(prev => ({
                  ...prev,
                  minPrice: e.target.value
                }))}
                placeholder="0.00"
              />
              <Input
                label="Max Price"
                type="number"
                value={localFilters.maxPrice}
                onChange={(e) => setLocalFilters(prev => ({
                  ...prev,
                  maxPrice: e.target.value
                }))}
                placeholder="0.00"
              />
            </div>
          </div>

          {/* Volume Range */}
          <div className="space-y-4">
            <h3 className="font-medium">Volume Range</h3>
            <div className="grid grid-cols-2 gap-4">
              <Input
                label="Min Volume"
                type="number"
                value={localFilters.minVolume}
                onChange={(e) => setLocalFilters(prev => ({
                  ...prev,
                  minVolume: e.target.value
                }))}
                placeholder="0"
              />
              <Input
                label="Max Volume"
                type="number"
                value={localFilters.maxVolume}
                onChange={(e) => setLocalFilters(prev => ({
                  ...prev,
                  maxVolume: e.target.value
                }))}
                placeholder="0"
              />
            </div>
          </div>

          {/* Performance */}
          <div className="space-y-4">
            <h3 className="font-medium">Performance</h3>
            <div className="grid grid-cols-2 gap-4">
              <Input
                label="Min 1h Change (%)"
                type="number"
                value={localFilters.minPerformance1h}
                onChange={(e) => setLocalFilters(prev => ({
                  ...prev,
                  minPerformance1h: e.target.value
                }))}
                placeholder="-100"
              />
              <Input
                label="Max 1h Change (%)"
                type="number"
                value={localFilters.maxPerformance1h}
                onChange={(e) => setLocalFilters(prev => ({
                  ...prev,
                  maxPerformance1h: e.target.value
                }))}
                placeholder="100"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <Input
                label="Min 24h Change (%)"
                type="number"
                value={localFilters.minPerformance24h}
                onChange={(e) => setLocalFilters(prev => ({
                  ...prev,
                  minPerformance24h: e.target.value
                }))}
                placeholder="-100"
              />
              <Input
                label="Max 24h Change (%)"
                type="number"
                value={localFilters.maxPerformance24h}
                onChange={(e) => setLocalFilters(prev => ({
                  ...prev,
                  maxPerformance24h: e.target.value
                }))}
                placeholder="100"
              />
            </div>
          </div>

          {/* Risk Level */}
          <div className="space-y-4">
            <h3 className="font-medium">Risk Level</h3>
            <Select
              value={localFilters.riskLevel}
              onChange={(value) => setLocalFilters(prev => ({
                ...prev,
                riskLevel: value
              }))}
              options={[
                { value: 'all', label: 'All' },
                { value: 'low', label: 'Low Risk' },
                { value: 'medium', label: 'Medium Risk' },
                { value: 'high', label: 'High Risk' }
              ]}
            />
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