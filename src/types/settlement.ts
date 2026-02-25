import type { ApiResponse } from '../api/auth';

export type Settlement = {
  totalAmount: number;
  feeAmount: number;
  payoutAmount: number;
};

export type SettlementResponse = ApiResponse<Settlement>;
