import React, { useState } from 'react';
import TokenTable from '../components/tokens/TokenTable';
import { useTokenStore } from '../store/tokenStore';
import { MagnifyingGlassIcon, FunnelIcon } from '@heroicons/react/24/outline';
import { FilterModal } from '../components/modals/FilterModal';
import { TokenDetailInfo } from '../types';

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
  const [filters, setFilters] = useState<FilterSettings>(initialFilters);
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold">Watchlist</h1>
        <p className="text-gray-400">Track and monitor your selected AI tokens</p>
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
          data={(tokens?.filter(token => token.isWatchlisted) ?? []) as TokenDetailInfo[]}
          loading={loading}
          error={error}
        />
      </div>

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
