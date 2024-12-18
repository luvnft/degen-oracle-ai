import React from 'react';

const TradingViewWidget: React.FC = () => {
  return (
    <div className="w-full h-full bg-[#111111] rounded-lg">
      <div className="flex items-center justify-center h-full text-gray-400">
        <div className="w-full h-full bg-[#111111] rounded-lg" style={{ minHeight: '300px' }}>
          {/* Placeholder for chart */}
          <div className="w-full h-full flex items-center justify-center">
            <div className="text-gray-400">Chart Loading...</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TradingViewWidget; 