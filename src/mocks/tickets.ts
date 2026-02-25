import type { TicketResponse } from '../components/MyPage/types/ticket';

export const MOCK_TICKET_RESPONSES: TicketResponse[] = [
  {
    ticketId: 301,
    projectTitle: "밴드 '새벽' 단독 콘서트 : 밤을 걷는 시간",
    opening: '2025-10-22T19:00:00',
    optionLabel: '현장 스탠딩 A구역',
    ticketToken: 'mock-token-301-abc123',
    status: 'ACTIVE',
  },
  {
    ticketId: 302,
    projectTitle: '전통공예 체험 클래스',
    opening: '2025-06-01T10:00:00',
    optionLabel: '오전 클래스 (10:00 ~ 12:00)',
    ticketToken: 'mock-token-302-def456',
    status: 'USED',
  },
];

export const MOCK_TICKET_TOKENS: Record<string, string> = {
  '301': 'mock-token-301-abc123',
  '302': 'mock-token-302-def456',
};
