import type { Alarm } from '../types/alarm';

export const MOCK_ALARMS: Alarm[] = [
  {
    memberAlarmId: 1,
    content: "밴드 '새벽' 단독 콘서트 프로젝트가 목표 금액을 달성했습니다!",
    alarmTime: '2025-10-15T09:00:00',
    template: 'PROJECT_SUCCESS',
    alarmParams: { projectId: 2 },
  },
  {
    memberAlarmId: 2,
    content: "A대 시각디자인 졸전 'Trace' 펀딩 마감이 3일 남았습니다.",
    alarmTime: '2025-10-17T10:00:00',
    template: 'DEADLINE_APPROACHING',
    alarmParams: { projectId: 1, dday: 3 },
  },
  {
    memberAlarmId: 3,
    content: '후원하신 콘서트 티켓이 발급되었습니다. 마이페이지에서 확인하세요.',
    alarmTime: '2025-10-16T14:00:00',
    template: 'TICKET_ISSUED',
    alarmParams: { ticketId: 301 },
  },
];
