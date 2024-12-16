import axios from 'axios';

const BIRDEYE_API_KEY = import.meta.env.VITE_BIRDEYE_API_KEY;
const BIRDEYE_API_URL = 'https://public-api.birdeye.so';

const api = axios.create({
  baseURL: BIRDEYE_API_URL,
  headers: {
    'X-API-KEY': BIRDEYE_API_KEY
  }
});

export const getTokens = async (params: {
  minMarketCap?: number;
  minHolders?: number;
  minLiquidity?: number;
}) => {
  try {
    // TODO: Implement actual API call
    return [];
  } catch (error) {
    console.error('Failed to fetch tokens:', error);
    throw error;
  }
}; 