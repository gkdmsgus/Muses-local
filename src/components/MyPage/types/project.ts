export type ProjectStatus = 'FUNDING' | 'SUCCESS' | 'SCHEDULED';


export const PROJECT_STATUS_STYLE = {
  FUNDING: {
    label: '진행중',
    badgeClass: 'bg-[#E0E7FF]',
    textClass: 'text-[#4F46E5]',
  },
  SUCCESS: {
    label: '완료',
    badgeClass: 'bg-[#CDE6B7]',
    textClass: 'text-[#4E833E]',
  },
  SCHEDULED: {
    label: '예정',
    badgeClass: 'bg-[#E6BDB7]',
    textClass: 'text-[#983A22]',
  },
} as const;


export interface Project {
  projectId: number;
  title: string;
  fundingStatus: ProjectStatus;
  achieveRate: number;
  raisedAmount: number;
  tags: string[];
  dday: number;
}
  

export interface RewardSale {
  rewardId: number;
  rewardName: string;
  soldQuantity: number;
  revenue: number;
}


export interface GenderRatio {
  male: number;
  female: number;
}

export interface AgeRatio {
  '20s': number;
  '30s': number;
  '40s': number;
  '50s+': number;
}

export interface ProjectDashboard {
  totalFunding: number;
  participantCount: number;
  likeCount: number;
  rewardSales: RewardSale[];
  genderRatio: GenderRatio;
  ageRatio: AgeRatio;
  dday: number;
}
