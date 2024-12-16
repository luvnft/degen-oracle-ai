export interface AlertConfig {
  // Price Alerts
  priceChangeThreshold: number;     // Default: 10%
  volumeChangeThreshold: number;    // Default: 100%
  holdersChangeThreshold: number;   // Default: 20%
  
  // Custom Alert per Token
  customAlerts?: {
    tokenAddress: string;
    priceThreshold?: number;
    volumeThreshold?: number;
    holdersThreshold?: number;
  }[];
  
  // Alert Limits
  maxAlertsPerDay: number;         // Default: 50
  cooldownMinutes: number;         // Default: 30
}
