import { create } from 'zustand';
import { mockTokens } from '../mocks/tokens';

interface TokenStore {
  tokens: typeof mockTokens;
  loading: boolean;
  error: string | null;
  fetchTokens: (filters?: any) => Promise<void>;
}

export const useTokenStore = create<TokenStore>((set) => ({
  tokens: mockTokens,
  loading: false,
  error: null,
  fetchTokens: async (filters) => {
    set({ loading: true });
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      set({ tokens: mockTokens, loading: false });
    } catch (error) {
      set({ error: 'Failed to fetch tokens', loading: false });
    }
  },
})); 