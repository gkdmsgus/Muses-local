export type ProjectDetailResponse = {
  success: boolean;
  data: ProjectDetailData;
  page?: { offset: number; limit: number; total: number };
  error?: { code: string; message: string; detail: string };
};

export type RewardType = 'TICKET' | 'NONE';
export type AgeLimit = 'ALL' | 'ADULT';
export type FundingStatus = 'FUNDING' | 'CLOSING' | 'SUCCESS' | 'FAIL';
export type ProjectStatus =
  | 'DRAFT'
  | 'PENDING'
  | 'REVISION_REQUESTED'
  | 'APPROVED'
  | 'REJECTED'
  | FundingStatus;

export type ProjectReward = {
  rewardId: number;
  rewardName: string;
  price: number;
  description: string;
  totalQuantity: number;
  soldQuantity: number;
  remainingQuantity: number;
  type: RewardType;
};

export type ProjectFile = {
  id: number;
  fileUrl: string;
  originalFilename: string;
  extension: string;
};

export type ProjectDetailData = {
  projectId: number;
  status: ProjectStatus;
  lastSavedStep: number;
  title: string;
  description: string;
  thumbnailUrl: string | null;
  tags: string[];
  ageLimit: AgeLimit;
  region: string;
  targetAmount: number;
  opening: string;
  deadline: string;
  fundingStatus: FundingStatus;
  rewards: ProjectReward[];
  storyHtml: string;
  refundPolicy: string;
  attachments: ProjectFile[];
  creatorName: string;
  creatorNickname: string;
  hostProfileImg: string | null;
  hostPhone: string;
  hostBio: string;
  managerName: string;
  managerPhone: string;
  documents: ProjectFile[];
  makerDocuments: ProjectFile[];
  achieveRate: number;
  supporterCount: number;
  createdAt: string;
  updatedAt: string;
};
