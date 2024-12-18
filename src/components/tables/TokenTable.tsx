import React from 'react';
import { Link } from 'react-router-dom';
import { FaFilter, FaStar, FaTwitter, FaTelegram, FaGlobe, FaRobot, FaSort, FaTimes } from 'react-icons/fa';
import { DocumentDuplicateIcon } from '@heroicons/react/24/outline';
import { formatNumber } from '../../utils/format';
import { mockTokens } from '../../mocks/tokens';

// Convert TokenDetailInfo to Token interface format
export const convertedMockTokens = mockTokens.map((token, index) => ({
  id: index + 1,
  name: token.name,
  address: token.address,
  shortAddress: `${token.address.slice(0, 6)}...${token.address.slice(-3)}`,
  logo: token.logo,
  age: token.age,
  liquidity: token.liquidity,
  marketCap: token.marketCap,
  holders: {
    total: token.holders,
    active: token.socialMetrics?.telegram?.active.toString() || '0',
    distribution: `${token.circulatingSupply}/${token.totalSupply - token.circulatingSupply}`
  },
  smartMoney: '1/70', // Example value
  transactions1h: token.transactions1h.toString(),
  volume1h: `$${formatNumber(token.volume1h)}`,
  price: token.price,
  change: {
    m1: `${(token.priceChange1m ?? 0) > 0 ? '+' : ''}${token.priceChange1m ?? 0}%`,
    m5: `${(token.priceChange5m ?? 0) > 0 ? '+' : ''}${token.priceChange5m ?? 0}%`,
    h1: `${(token.priceChange1h ?? 0) > 0 ? '+' : ''}${token.priceChange1h ?? 0}%`
  },
  devAction: token.devActivity.action === 'hold' ? 'HODL' : 
             token.devActivity.action === 'sell' ? 'Sell All' : '--',
  aiScore: 95, // Example value
  social: {
    twitter: token.twitter,
    telegram: token.telegram,
    website: token.website
  }
}));

export interface Token {
  id: number;
  name: string;
  address: string;
  shortAddress: string;
  logo: string;
  age: string;
  liquidity: number;
  marketCap: number;
  holders: {
    total: number | string;
    active: string;
    distribution: string;
  };
  smartMoney: string;
  transactions1h: string;
  volume1h: string;
  price: number;
  change: {
    m1: string;
    m5: string;
    h1: string;
  };
  devAction: string;
  aiScore: number;
  social: {
    twitter?: string;
    telegram?: string;
    website?: string;
  };
}

const TableHeader = () => (
  <tr className="text-left text-xs text-gray-400 border-b border-[#222222]">
    <th className="py-4 pl-4 pr-6">Token</th>
    <th className="py-4 px-6">Age</th>
    <th className="py-4 px-6">
      <div className="flex items-center space-x-1">
        <span>Liq $/MC $</span>
        <FaSort className="w-2.5 h-2.5 text-gray-600 cursor-pointer hover:text-gray-400" />
      </div>
    </th>
    <th className="py-4 px-6">
      <div className="flex items-center space-x-1">
        <span>Holders</span>
        <FaSort className="w-2.5 h-2.5 text-gray-600 cursor-pointer hover:text-gray-400" />
      </div>
    </th>
    <th className="py-4 px-6">
      <div className="flex items-center space-x-1">
        <span>Smart $/KOL</span>
        <FaFilter className="w-2.5 h-2.5 text-gray-600 cursor-pointer hover:text-gray-400" />
      </div>
    </th>
    <th className="py-4 px-6">
      <div className="flex items-center space-x-1">
        <span>1h TXs</span>
        <FaSort className="w-2.5 h-2.5 text-gray-600 cursor-pointer hover:text-gray-400" />
      </div>
    </th>
    <th className="py-4 px-6">
      <div className="flex items-center space-x-1">
        <span>1h Vol</span>
        <FaSort className="w-2.5 h-2.5 text-gray-600 cursor-pointer hover:text-gray-400" />
      </div>
    </th>
    <th className="py-4 px-6">
      <div className="flex items-center space-x-1">
        <span>Price</span>
        <FaSort className="w-2.5 h-2.5 text-gray-600 cursor-pointer hover:text-gray-400" />
      </div>
    </th>
    <th className="py-4 px-6">
      <div className="flex items-center space-x-1">
        <span>1m%</span>
        <FaSort className="w-2.5 h-2.5 text-gray-600 cursor-pointer hover:text-gray-400" />
      </div>
    </th>
    <th className="py-4 px-6">
      <div className="flex items-center space-x-1">
        <span>5m%</span>
        <FaSort className="w-2.5 h-2.5 text-gray-600 cursor-pointer hover:text-gray-400" />
      </div>
    </th>
    <th className="py-4 px-6">
      <div className="flex items-center space-x-1">
        <span>1h%</span>
        <FaSort className="w-2.5 h-2.5 text-gray-600 cursor-pointer hover:text-gray-400" />
      </div>
    </th>
    <th className="py-4 px-6">
      <div className="flex items-center space-x-1">
        <span>DEV</span>
        <FaFilter className="w-2.5 h-2.5 text-gray-600 cursor-pointer hover:text-gray-400" />
      </div>
    </th>
    <th className="py-4 px-6"></th>
  </tr>
);

const getChangeColor = (value: string) => {
  if (!value || value === '0%') return 'text-gray-400';
  return value.startsWith('+') ? 'text-[#88D693]' : 'text-[rgb(240,148,164)]';
};

const getDevActionColor = (action: string) => {
  switch (action) {
    case 'Sell All': return 'text-[rgb(240,148,164)]';
    case 'HODL': return 'text-[rgb(255,208,57)]';
    case '--': return 'text-gray-400';
    default: return 'text-gray-400';
  }
};

const TokenRow = ({ token, isWatchlist, onRemoveFromWatchlist }: { token: Token; isWatchlist?: boolean; onRemoveFromWatchlist?: (address: string) => void }) => {
  return (
    <tr className="border-b border-[#222222] hover:bg-[#1A1A1A]">
      <td className="py-2 pl-4 pr-6">
        <div className="flex items-center space-x-3">
          {!isWatchlist && (
            <button className="text-gray-400 hover:text-[#88D693]">
              <FaStar className="w-3.5 h-3.5" />
            </button>
          )}
          <img src={token.logo} alt={token.name} className="w-8 h-8 rounded-full" />
          <div className="min-w-0">
            <div className="flex items-center space-x-2">
              <Link 
                to={`/token/${token.address}`}
                className="text-sm font-medium whitespace-nowrap hover:text-[#88D693]"
              >
                {token.name}
              </Link>
              <button 
                onClick={() => navigator.clipboard.writeText(token.address)}
                className="text-gray-400 hover:text-white"
              >
                <DocumentDuplicateIcon className="w-3.5 h-3.5" />
              </button>
              <div className="flex items-center space-x-1 bg-[#1A1A1A] px-1.5 py-0.5 rounded">
                <FaRobot className="w-3 h-3 text-[#88D693]" />
                <span className="text-[#88D693] text-xs">{token.aiScore}</span>
              </div>
            </div>
            <div className="flex items-center space-x-2 mt-0.5">
              <span className="text-xs text-gray-500">{token.shortAddress}</span>
              <div className="flex items-center gap-2">
                {token.social?.twitter && (
                  <a href={token.social.twitter} target="_blank" rel="noopener noreferrer" 
                     className="text-gray-400 hover:text-[#1DA1F2]">
                    <FaTwitter className="w-3 h-3" />
                  </a>
                )}
                {token.social?.telegram && (
                  <a href={token.social.telegram} target="_blank" rel="noopener noreferrer"
                     className="text-gray-400 hover:text-[#0088cc]">
                    <FaTelegram className="w-3 h-3" />
                  </a>
                )}
                {token.social?.website && (
                  <a href={token.social.website} target="_blank" rel="noopener noreferrer"
                     className="text-gray-400 hover:text-white">
                    <FaGlobe className="w-3 h-3" />
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </td>
      <td className="py-2 px-6">
        <span className="text-sm text-gray-400">{token.age}</span>
      </td>
      <td className="py-2 px-6">
        <div className="text-sm text-gray-400">${formatNumber(token.liquidity)}</div>
        <div className="text-sm text-[rgb(255,208,57)]">${formatNumber(token.marketCap)}</div>
      </td>
      <td className="py-2 px-6">
        <div className="text-sm text-[rgb(147,197,253)]">{token.holders.total}</div>
        <div className="text-sm text-gray-400">{token.holders.distribution}</div>
      </td>
      <td className="py-2 px-6">
        <span className="text-sm text-gray-400">{token.smartMoney}</span>
      </td>
      <td className="py-2 px-6">
        <span className="text-sm text-gray-400">{token.transactions1h}</span>
      </td>
      <td className="py-2 px-6">
        <span className="text-sm text-[rgb(147,197,253)]">{token.volume1h}</span>
      </td>
      <td className="py-2 px-6">
        <span className="text-sm text-gray-400">${token.price}</span>
      </td>
      <td className="py-2 px-6">
        <span className={`text-sm ${getChangeColor(token.change.m1)}`}>{token.change.m1}</span>
      </td>
      <td className="py-2 px-6">
        <span className={`text-sm ${getChangeColor(token.change.m5)}`}>{token.change.m5}</span>
      </td>
      <td className="py-2 px-6">
        <span className={`text-sm ${getChangeColor(token.change.h1)}`}>{token.change.h1}</span>
      </td>
      <td className="py-2 px-6">
        <span className={`text-sm ${getDevActionColor(token.devAction)}`}>
          {token.devAction}
        </span>
      </td>
      {isWatchlist && (
        <td className="py-2 px-6">
          <button 
            onClick={() => onRemoveFromWatchlist?.(token.address)}
            className="text-gray-400 hover:text-[rgb(240,148,164)] p-1 rounded-md transition-colors"
            title="Remove from watchlist"
          >
            <FaTimes className="w-3.5 h-3.5" />
          </button>
        </td>
      )}
    </tr>
  );
};

interface TokenTableProps {
  tokens: Token[];
  isWatchlist?: boolean;
  onRemoveFromWatchlist?: (address: string) => void;
}

const TokenTable: React.FC<TokenTableProps> = ({ tokens, isWatchlist, onRemoveFromWatchlist }) => {
  return (
    <div className="bg-[#111111] rounded-lg">
      <div className="overflow-x-auto">
        <div className="min-w-[1400px]">
          <table className="w-full">
            <thead>
              <TableHeader />
            </thead>
            <tbody>
              {tokens.map(token => (
                <TokenRow 
                  key={token.id} 
                  token={token} 
                  isWatchlist={isWatchlist}
                  onRemoveFromWatchlist={onRemoveFromWatchlist}
                />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default TokenTable; 