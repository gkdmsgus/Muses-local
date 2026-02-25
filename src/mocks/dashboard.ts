import type {
  ProjectDashboard,
  RewardSale,
} from '../components/MyPage/types/project';
import type { Project } from '../types/projects';

export const MOCK_DASHBOARD: ProjectDashboard = {
  totalFunding: 17400000,
  participantCount: 142,
  likeCount: 287,
  rewardSales: [
    { rewardId: 3, rewardName: '온라인 라이브 관람권', soldQuantity: 46, revenue: 690000 },
    { rewardId: 4, rewardName: '현장 스탠딩 티켓', soldQuantity: 46, revenue: 2070000 },
    { rewardId: 5, rewardName: 'MD 패키지', soldQuantity: 30, revenue: 1950000 },
  ] as RewardSale[],
  genderRatio: { male: 38, female: 62 },
  ageRatio: { '20s': 55, '30s': 30, '40s': 12, '50s+': 3 },
  dday: 34,
};

export const MOCK_MAKERS = {
  projectId: 2,
  items: [
    {
      memberId: 201,
      nickname: 'jazzfan01',
      name: '이재원',
      phone: '010-1111-2222',
      email: 'jaewon.lee@example.com',
      quantity: 2,
      rewardName: '현장 스탠딩 티켓',
      qrStatus: 'ACTIVE' as const,
      orderId: 1001,
    },
    {
      memberId: 202,
      nickname: 'music_lover',
      name: '박소희',
      phone: '010-2222-3333',
      email: 'sohee.park@example.com',
      quantity: 1,
      rewardName: '온라인 라이브 관람권',
      qrStatus: 'INACTIVE' as const,
      orderId: 1002,
    },
    {
      memberId: 203,
      nickname: 'indie_night',
      name: '김태양',
      phone: '010-3333-4444',
      email: 'taeyang.kim@example.com',
      quantity: 1,
      rewardName: 'MD 패키지',
      qrStatus: 'NONE' as const,
      orderId: 1003,
    },
    {
      memberId: 204,
      nickname: 'bandlover',
      name: '최유나',
      phone: '010-4444-5555',
      email: 'yuna.choi@example.com',
      quantity: 2,
      rewardName: '현장 스탠딩 티켓',
      qrStatus: 'ACTIVE' as const,
      orderId: 1004,
    },
    {
      memberId: 205,
      nickname: null,
      name: '정민수',
      phone: null,
      email: 'minsoo.jung@example.com',
      quantity: 1,
      rewardName: '온라인 라이브 관람권',
      qrStatus: 'ACTIVE' as const,
      orderId: 1005,
    },
  ],
};

export const MOCK_SETTING = {
  description: '홍대 웨스트브릿지에서 펼쳐지는 가장 감성적인 밤. 지난 3년간의 음악을 무대에서 선보입니다.',
  tags: ['인디밴드', '라이브', '홍대', '콘서트'],
  targetAmount: 15000000,
  deadline: '2026-03-31',
};

export const MOCK_SETTLEMENT = {
  totalAmount: 17400000,
  feeAmount: 870000,
  payoutAmount: 16530000,
};

export const MOCK_LIKED_PROJECTS: Project[] = [
  {
    projectId: 7,
    region: '서울',
    tags: ['#사진전', '#전시'],
    thumbnailUrl: 'https://picsum.photos/seed/photo7/600/400',
    title: "사진작가 '빛' 개인전 'Moment'",
    achieveRate: 150,
    deadline: '2025-09-10T00:00:00',
    fundingStatus: 'SUCCESS',
    isScheduled: false,
    opening: '2025-09-01T00:00:00',
    attachmentImageUrl: null,
    dday: 0,
  },
  {
    projectId: 4,
    region: '서울',
    tags: ['#재즈', '#페스티벌'],
    thumbnailUrl: 'https://picsum.photos/seed/jazz4/600/400',
    title: '2025 뉴이어 재즈 페스티벌',
    achieveRate: 55,
    deadline: '2026-06-01T00:00:00',
    fundingStatus: 'FUNDING',
    isScheduled: false,
    opening: '2026-01-01T00:00:00',
    attachmentImageUrl: null,
    dday: 96,
  },
  {
    projectId: 13,
    region: '서울',
    tags: ['#클래식', '#오케스트라'],
    thumbnailUrl: 'https://picsum.photos/seed/classic13/600/400',
    title: '청년 오케스트라 정기 연주회',
    achieveRate: 88,
    deadline: '2026-04-10T00:00:00',
    fundingStatus: 'FUNDING',
    isScheduled: false,
    opening: '2026-02-01T00:00:00',
    attachmentImageUrl: null,
    dday: 44,
  },
];
