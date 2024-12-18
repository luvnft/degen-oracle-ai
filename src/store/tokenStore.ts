import { create } from 'zustand';
import { TokenDetailInfo } from '../types';
import { mockTokens } from '../mocks/tokens';

interface TokenStore {
  tokens: TokenDetailInfo[];
  loading: boolean;
  error: string | null;
  setTokens: (tokens: TokenDetailInfo[]) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
}

export const useTokenStore = create<TokenStore>((set) => ({
  tokens: mockTokens,
  loading: false,
  error: null,
  setTokens: (tokens) => set({ tokens }),
  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error })
})); 