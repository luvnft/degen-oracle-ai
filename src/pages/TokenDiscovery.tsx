// In TokenTable.ts
export type Token = {
  id: number;
  name: string;
  address: string;
  shortAddress: string;
  logo?: string; // Make the logo optional
  age: string;
  liquidity: number;
  marketCap: number;
  holders: {
    total: number;
    active: string;
    distribution: string;
  };
  // other fields...
};
