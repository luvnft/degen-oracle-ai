import React from 'react';

interface TokenDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  tokenAddress?: string;
}

const TokenDetailModal = ({ isOpen, onClose, tokenAddress }: TokenDetailModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-[#111111] rounded-lg border border-[#333333] w-full max-w-4xl mx-4">
        <div className="flex justify-between items-center p-6 border-b border-[#333333]">
          <h2 className="text-xl font-semibold">Token Details</h2>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-white"
          >
            ✕
          </button>
        </div>
        <div className="p-6">
          {/* Token Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <h3 className="text-lg font-semibold mb-4">Market Info</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-400">Price</span>
                  <span>$0.00</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Market Cap</span>
                  <span>$0</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Liquidity</span>
                  <span>$0</span>
                </div>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Social Metrics</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-400">Twitter Followers</span>
                  <span>0</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Telegram Members</span>
                  <span>0</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Social Score</span>
                  <span>0</span>
                </div>
              </div>
            </div>
          </div>

          {/* Charts Section */}
          <div className="space-y-6">
            <div className="bg-black rounded border border-[#333333] p-4 h-64">
              <div className="text-center text-gray-400">
                Price Chart Coming Soon
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TokenDetailModal; 