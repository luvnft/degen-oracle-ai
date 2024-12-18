import React from 'react';
import Table from '../shared/Table';
import { formatNumber, formatPercent, shortenAddress } from '../../utils/format';
import { TokenDetailInfo } from '../../types';
import { FaTwitter, FaTelegram, FaGlobe } from 'react-icons/fa';
import { DocumentDuplicateIcon } from '@heroicons/react/24/outline';
import { TagIcon } from '@heroicons/react/24/solid';
import { StarIcon as StarOutline } from '@heroicons/react/24/outline';
import { StarIcon as StarSolid } from '@heroicons/react/24/solid';
import { Link } from 'react-router-dom';

interface TokenTableProps {
  data: TokenDetailInfo[];
  loading?: boolean;
  error?: string | null;
}

const getValueColor = (value: number, type: 'price' | 'change' | 'volume' | 'mcap' | 'holders') => {
  switch(type) {
    case 'mcap':
      if (value >= 1_000_000) return 'text-[rgb(255,208,57)]';
      return 'text-gray-300';
    
    case 'price':
    case 'volume':
      if (value >= 1_000_000) return 'text-[rgb(147,197,253)]';
      return 'text-gray-300';
    
    case 'change':
      if (value >= 100) return 'text-[rgb(147,197,253)]';
      if (value > 0) return 'text-[#88D693]';
      if (value <= -20) return 'text-[rgb(240,148,164)]';
      return 'text-[rgb(240,148,164)]';
    
    case 'holders':
      if (value >= 1000) return 'text-[rgb(147,197,253)]';
      return 'text-gray-300';
    
    default:
      return 'text-gray-300';
  }
};

const TokenTable = ({ data, loading = false, error = null }: TokenTableProps) => {
  const [watchlist, setWatchlist] = React.useState<Set<string>>(new Set());

  const handleCopyAddress = (address: string) => {
    navigator.clipboard.writeText(address);
    // TODO: Show toast notification
  };

  const handleAddToWatchlist = (tokenAddress: string) => {
    setWatchlist(prev => {
      const newWatchlist = new Set(prev);
      if (newWatchlist.has(tokenAddress)) {
        newWatchlist.delete(tokenAddress);
      } else {
        newWatchlist.add(tokenAddress);
      }
      return newWatchlist;
    });
  };

  const columns = [
    {
      key: 'name',
      title: 'Token',
      width: 'w-64',
      render: (value: string, record: TokenDetailInfo) => (
        <div className="flex items-center space-x-2">
          <button
            onClick={() => handleAddToWatchlist(record.address)}
            className="text-gray-500 hover:text-[#88D693] transition-colors"
          >
            {watchlist.has(record.address) ? (
              <StarSolid className="w-4 h-4 text-[rgb(255,208,57)]" />
            ) : (
              <StarOutline className="w-4 h-4" />
            )}
          </button>
          <div className="w-8 h-8 bg-[#1A1A1A] rounded-full overflow-hidden flex-shrink-0">
            {record.logo && (
              <img src={record.logo} alt={value} className="w-full h-full object-cover" />
            )}
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <Link to={`/token/${record.address}`} className="hover:text-[#88D693]">
                <span className="text-sm font-medium">{value}</span>
              </Link>
              <button
                onClick={() => handleCopyAddress(record.address)}
                className="text-gray-500 hover:text-gray-300"
              >
                <DocumentDuplicateIcon className="w-3.5 h-3.5" />
              </button>
            </div>
            <div className="flex items-center space-x-2 text-xs">
              <span className="text-gray-500">{shortenAddress(record.address)}</span>
              <div className="flex items-center space-x-1.5">
                {record.twitter && (
                  <a 
                    href={record.twitter} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-gray-500 hover:text-[#1DA1F2]"
                  >
                    <FaTwitter size={12} />
                  </a>
                )}
                {record.telegram && (
                  <a 
                    href={record.telegram} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-gray-500 hover:text-[#0088cc]"
                  >
                    <FaTelegram size={12} />
                  </a>
                )}
                {record.website && (
                  <a 
                    href={record.website} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-gray-500 hover:text-white"
                  >
                    <FaGlobe size={12} />
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      key: 'age',
      title: 'Age',
      width: 'w-14',
      render: (value: number) => (
        <span className="text-xs text-gray-300">{value}d</span>
      )
    },
    {
      key: 'marketCap',
      title: 'Liq/MCap',
      width: 'w-28',
      render: (value: number, record: TokenDetailInfo) => (
        <div className="text-xs">
          <div className="text-gray-300">
            ${formatNumber(record.liquidity)}
          </div>
          <div className={getValueColor(value, 'mcap')}>
            ${formatNumber(value)}
          </div>
        </div>
      ),
      sortable: true
    },
    {
      key: 'holders',
      title: 'Holders',
      width: 'w-20',
      render: (value: number) => (
        <span className={`text-xs ${getValueColor(value, 'holders')}`}>
          {formatNumber(value)}
        </span>
      ),
      sortable: true
    },
    {
      key: 'hourlyTransactions',
      title: '1h Txns',
      width: 'w-20',
      render: (value: number) => (
        <span className="text-xs text-gray-300">{formatNumber(value)}</span>
      ),
      sortable: true
    },
    {
      key: 'hourlyVolume',
      title: '1h Volume',
      width: 'w-24',
      render: (value: number) => (
        <span className={`text-xs ${getValueColor(value, 'volume')}`}>
          ${formatNumber(value)}
        </span>
      ),
      sortable: true
    },
    {
      key: 'currentPrice',
      title: 'Price',
      width: 'w-20',
      render: (value: number) => (
        <span className={`text-xs ${getValueColor(value, 'price')}`}>
          ${formatNumber(value)}
        </span>
      ),
      sortable: true
    },
    {
      key: 'priceChange1h',
      title: '1h',
      width: 'w-16',
      render: (value: number) => (
        <span className={`text-xs ${getValueColor(value, 'change')}`}>
          {formatPercent(value)}
        </span>
      ),
      sortable: true
    },
    {
      key: 'priceChange5m',
      title: '5m',
      width: 'w-16',
      render: (value: number) => (
        <span className={`text-xs ${getValueColor(value, 'change')}`}>
          {formatPercent(value)}
        </span>
      ),
      sortable: true
    },
    {
      key: 'priceChange1m',
      title: '1m',
      width: 'w-16',
      render: (value: number) => (
        <span className={`text-xs ${getValueColor(value, 'change')}`}>
          {formatPercent(value)}
        </span>
      ),
      sortable: true
    },
    {
      key: 'top10HoldersPercent',
      title: 'Top 10',
      width: 'w-16',
      render: (value: number) => (
        <span className="text-xs text-gray-300">{value}%</span>
      ),
      sortable: true
    },
    {
      key: 'devActivity',
      title: 'Dev',
      width: 'w-16',
      render: (value: { action: 'hold' | 'add' | 'sell' }) => {
        const colors = {
          hold: 'text-[rgb(255,208,57)]',
          add: 'text-[#88D693]',
          sell: 'text-[rgb(240,148,164)]'
        };
        return (
          <span className={`text-xs ${colors[value.action]}`}>
            {value.action.toUpperCase()}
          </span>
        );
      }
    }
  ];

  return (
    <div className="h-full">
      <Table
        data={data}
        columns={columns}
        loading={loading}
        error={error}
        emptyText="No tokens found"
        className="h-full"
      />
    </div>
  );
};

export default TokenTable; 