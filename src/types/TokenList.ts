export interface TokenInfo {
  address: string;
  name: string;
  symbol: string;
  logo?: string;
  currentPrice: number;
  marketCap: number;
  holders: number;
  hourlyVolume: number;
  priceChange1h: number;
  priceChange5m: number;
  priceChange1m: number;
  top10HoldersPercent: number;
  tags?: string[];
  devActivity: {
    action: 'HOLD' | 'ADD' | 'SELL_ALL';
  };
  twitter?: string;
  telegram?: string;
  website?: string;
  isWatchlisted: boolean;
  age: string;
  priceChange24h: number;
  liquidity: number;
}

// Table Column Definition
export interface TokenListColumn {
  id: string;
  label: string;
  width: number;
  sortable: boolean;
  render: (token: TokenInfo) => React.ReactNode;
}