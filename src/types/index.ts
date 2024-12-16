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