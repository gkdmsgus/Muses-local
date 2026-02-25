import type { Member } from '../components/MyPage/types/apitypes/members';
import type { Project } from '../components/MyPage/types/project';

export const MOCK_MEMBER: Member = {
  memberId: 1,
  name: '김뮤즈',
  email: 'muses@example.com',
  nickName: '뮤즈팬1호',
  introduction: '안녕하세요! 다양한 크리에이터를 응원하는 뮤즈 플랫폼 유저입니다.',
  birthday: '1995-03-15',
  gender: 1,
  profileImgUrl: 'https://picsum.photos/seed/profile1/100/100',
  ticketCount: 2,
  supportCount: 5,
  supportLevel: 3,
};

export const MOCK_CREATOR_SUMMARY = {
  totalFunding: 32500000,
  ongoingProjectCount: 2,
};

export const MOCK_CREATOR_PROJECTS: Project[] = [
  {
    projectId: 1,
    title: "A대 시각디자인 졸전 'Trace'",
    fundingStatus: 'FUNDING',
    achieveRate: 120,
    raisedAmount: 14400000,
    tags: ['#졸업전시', '#미디어아트'],
    dday: 28,
  },
  {
    projectId: 2,
    title: "밴드 '새벽' 단독 콘서트 : 밤을 걷는 시간",
    fundingStatus: 'FUNDING',
    achieveRate: 116,
    raisedAmount: 17400000,
    tags: ['#인디밴드', '#라이브'],
    dday: 34,
  },
  {
    projectId: 7,
    title: "사진작가 '빛' 개인전 'Moment'",
    fundingStatus: 'SUCCESS',
    achieveRate: 150,
    raisedAmount: 7500000,
    tags: ['#사진전', '#전시'],
    dday: 0,
  },
];
