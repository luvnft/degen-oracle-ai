export interface Token {
  address: string;
  name: string;
  symbol: string;
  age: string;
  marketCap: number;
  liquidity: number;
  holders: number;
  transactions1h: number;
  volume1h: number;
  price: number;
  change1m: number;
  change5m: number;
  change1h: number;
  topHoldersPercent: number;
  devActivity: 'hold' | 'add' | 'sell';
  isWatchlisted?: boolean;
  priceChange5m?: number;
  priceChange1m?: number;
  priceChange1h?: number;
  priceChange24h?: number;
}

export interface ScanParams {
  minMarketCap?: number;
  minHolders?: number;
  minLiquidity?: number;
}

export interface TokenDetailInfo extends Token {
  fdv?: number;
  liquidityPairs?: string[];
  contractVerified: boolean;
  proxyContract: boolean;
  lockDuration?: number;
  socialMetrics: {
    twitter: {
      followers: number;
      engagement: number;
      growth24h: number;
    };
    telegram: {
      members: number;
      active: number;
      growth24h: number;
    };
  };
  logo?: string;
  twitter?: string;
  telegram?: string;
  website?: string;
  tags?: string[];
  currentPrice: number;
  priceChange1h: number;
  priceChange24h: number;
  hourlyVolume: number;
  totalSupply: number;
  circulatingSupply: number;
  topHoldersPercent: number;
}

export interface ChartDataPoint {
  time: string;
  value: number;
}

export interface PieChartDataPoint {
  name: string;
  value: number;
  color: string;
}

export interface TabItem {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string; size?: number }>;
}

export interface AlertSettings {
  priceChange: boolean;
  priceChangeThreshold: number;
  volumeChange: boolean;
  volumeChangeThreshold: number;
  holdersChange: boolean;
  holdersChangeThreshold: number;
} 