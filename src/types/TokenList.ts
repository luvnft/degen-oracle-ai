import { TokenDetailInfo } from './index';

// Table Column Definition
export interface TokenListColumn {
  id: string;
  label: string;
  width: number;
  sortable: boolean;
  render: (token: TokenDetailInfo) => React.ReactNode;
}