import type { ApiResponse } from '../api/auth';

export type Makers = {
  memberId: number;
  nickname?: string | null;
  name: string;
  phone?: string | null;
  email?: string | null;
  quantity: number;
  rewardName: string;
  qrStatus: 'ACTIVE' | 'INACTIVE' | 'NONE';
  orderId: number;
};

export type MakersData = {
  projectId: number;
  items: Makers[];
};

export type MakersResponse = ApiResponse<MakersData>;
