import React from 'react';
import { TokenDetailInfo } from '../../types';
import { formatNumber, formatPercent, shortenAddress } from '../../utils/format';
import { FaTwitter, FaTelegram, FaGlobe } from 'react-icons/fa';

interface TokenCardProps {
  token: TokenDetailInfo;
}

const TokenCard = ({ token }: TokenCardProps) => {
  return (
    <div className="bg-[#111111] rounded-lg border border-[#333333] p-4 w-96">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-[#1A1A1A] rounded-full overflow-hidden">
            {token.logo && (
              <img src={token.logo} alt={token.name} className="w-full h-full object-cover" />
            )}
          </div>
          <div>
            <h3 className="font-medium">{token.name}</h3>
            <div className="flex items-center space-x-2 text-sm text-gray-400">
              <span>{token.symbol}</span>
              <span>•</span>
              <span>{shortenAddress(token.address)}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <div className="text-sm text-gray-400 mb-1">Price</div>
          <div className="font-medium">${formatNumber(token.currentPrice)}</div>
        </div>
        <div>
          <div className="text-sm text-gray-400 mb-1">Market Cap</div>
          <div className="font-medium">${formatNumber(token.marketCap)}</div>
        </div>
        <div>
          <div className="text-sm text-gray-400 mb-1">24h Volume</div>
          <div className="font-medium">${formatNumber(token.hourlyVolume * 24)}</div>
        </div>
        <div>
          <div className="text-sm text-gray-400 mb-1">Holders</div>
          <div className="font-medium">{formatNumber(token.holders)}</div>
        </div>
      </div>

      {/* Social Links */}
      <div className="flex space-x-3 text-gray-400">
        {token.twitter && (
          <a
            href={token.twitter}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#1DA1F2]"
          >
            <FaTwitter size={20} />
          </a>
        )}
        {token.telegram && (
          <a
            href={token.telegram}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#0088cc]"
          >
            <FaTelegram size={20} />
          </a>
        )}
        {token.website && (
          <a
            href={token.website}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white"
          >
            <FaGlobe size={20} />
          </a>
        )}
      </div>
    </div>
  );
};

export default TokenCard; 