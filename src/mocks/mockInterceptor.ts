import type { AxiosInstance, InternalAxiosRequestConfig } from 'axios';
import axios from 'axios';
import { MOCK_PROJECTS, MOCK_TRENDING } from './project';
import { MOCK_PROJECT_DETAILS } from './projectDetail';
import { MOCK_MEMBER, MOCK_CREATOR_SUMMARY, MOCK_CREATOR_PROJECTS } from './users';
import { MOCK_EVENTS, MOCK_EVENT_DETAILS } from './events';
import { MOCK_ORDER_ITEMS_RAW, MOCK_ORDER_DETAILS } from './orders';
import { MOCK_TICKET_RESPONSES, MOCK_TICKET_TOKENS } from './tickets';
import { MOCK_ALARMS } from './alarms';
import { MOCK_DASHBOARD, MOCK_MAKERS, MOCK_SETTING, MOCK_SETTLEMENT, MOCK_LIKED_PROJECTS } from './dashboard';

// URL에서 pathname 추출
function getPath(url: string): string {
  try {
    if (url.startsWith('http')) {
      return new URL(url).pathname;
    }
    // relative URL - remove query string
    return url.split('?')[0];
  } catch {
    return url.split('?')[0];
  }
}

// URL에서 query params 추출
function getParams(url: string): URLSearchParams {
  try {
    if (url.startsWith('http')) {
      return new URL(url).searchParams;
    }
    const q = url.split('?')[1] || '';
    return new URLSearchParams(q);
  } catch {
    return new URLSearchParams();
  }
}

// 성공 응답 래퍼
function ok<T>(data: T, page?: { offset: number; limit: number; total: number }) {
  return {
    data: {
      success: true,
      data,
      page: page ?? null,
      error: null,
    },
    status: 200,
    statusText: 'OK',
    headers: {},
  };
}

// axios adapter: 실제 네트워크 요청 없이 mock 데이터 반환
const mockAdapter = async (config: InternalAxiosRequestConfig) => {
  const url = config.url || '';
  const method = (config.method || 'get').toLowerCase();
  const path = getPath(url);
  const params = getParams(url);

  // config.params도 확인 (axios가 params 객체로 넘길 때)
  const axiosParams = config.params || {};

  // ──────────────────────────────────────────────────────
  // AUTH
  // ──────────────────────────────────────────────────────
  if (path.includes('/api/auth/login')) {
    localStorage.setItem('accessToken', 'mock-access-token');
    localStorage.setItem('role', 'CREATOR');
    return ok({ accessToken: 'mock-access-token', role: 'CREATOR' });
  }

  if (path.includes('/api/auth/logout')) {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('role');
    return ok(null);
  }

  if (path.includes('/api/auth/signup')) {
    return ok({ memberId: 1 });
  }

  if (path.includes('/api/auth/profile/create')) {
    return ok({ memberId: 1 });
  }

  if (path.includes('/api/auth/profile/check-nickname')) {
    return ok({ available: true });
  }

  if (path.includes('/api/auth/signup/check-email')) {
    return ok({ available: true });
  }

  if (path.includes('/api/auth/withdraw')) {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('role');
    return ok(null);
  }

  // ──────────────────────────────────────────────────────
  // LANDING (Trending)
  // ──────────────────────────────────────────────────────
  if (path.includes('/api/landing')) {
    return ok(MOCK_TRENDING, { offset: 0, limit: 6, total: MOCK_TRENDING.length });
  }

  // ──────────────────────────────────────────────────────
  // PROJECTS
  // ──────────────────────────────────────────────────────

  // 프로젝트 상세 (먼저 체크 - 더 구체적)
  const projectDetailMatch = path.match(/\/api\/projects\/(\d+)$/);
  if (projectDetailMatch) {
    const id = parseInt(projectDetailMatch[1]);
    const detail = MOCK_PROJECT_DETAILS.find((p) => p.projectId === id);
    if (detail) {
      return ok(detail);
    }
    return { data: { success: false, data: null, error: { code: 'NOT_FOUND', message: '프로젝트를 찾을 수 없습니다.', detail: '' } }, status: 404, statusText: 'Not Found', headers: {}, config };
  }

  // 프로젝트 목록
  if (path.includes('/api/projects') && !path.includes('/creators/')) {
    const keyword = params.get('keyword') || axiosParams.keyword || '';
    let filtered = MOCK_PROJECTS;
    if (keyword) {
      filtered = MOCK_PROJECTS.filter(
        (p) =>
          p.title.includes(keyword) ||
          p.tags.some((t) => t.includes(keyword)) ||
          p.region.includes(keyword)
      );
    }
    return ok(filtered, { offset: 0, limit: filtered.length, total: filtered.length });
  }

  // ──────────────────────────────────────────────────────
  // EVENTS
  // ──────────────────────────────────────────────────────

  // 이벤트 상세 (먼저 체크)
  const eventDetailMatch = path.match(/\/api\/events\/(\d+)$/);
  if (eventDetailMatch) {
    const id = parseInt(eventDetailMatch[1]);
    const detail = MOCK_EVENT_DETAILS[id];
    if (detail) {
      return ok(detail);
    }
    return ok({ event: MOCK_EVENTS[0], prevId: null, nextId: null });
  }

  // 이벤트 목록
  if (path.includes('/api/events')) {
    const keyword = params.get('keyword') || axiosParams.keyword || '';
    const page = parseInt(params.get('page') || axiosParams.page || '0');
    const size = parseInt(params.get('size') || axiosParams.size || '3');
    let filtered = MOCK_EVENTS;
    if (keyword) {
      filtered = MOCK_EVENTS.filter(
        (e) =>
          e.title.includes(keyword) ||
          e.description.includes(keyword)
      );
    }
    const start = page * size;
    const paged = filtered.slice(start, start + size);
    const hasNext = start + size < filtered.length;
    return ok(paged, { offset: start, limit: size, total: filtered.length });
  }

  // ──────────────────────────────────────────────────────
  // USERS / MY PAGE
  // ──────────────────────────────────────────────────────

  // 내 정보 (정확히 /api/users/me)
  if (path === '/api/users/me' || path.endsWith('/api/users/me')) {
    return ok(MOCK_MEMBER);
  }

  // 프로필 업데이트
  if (path.includes('/api/users/me/profile')) {
    return ok(MOCK_MEMBER);
  }

  // 내 주문 상세
  if (path.includes('/api/users/me/orders/detail')) {
    const orderId = parseInt(params.get('orderId') || axiosParams.orderId || '0');
    const detail = MOCK_ORDER_DETAILS[orderId] || MOCK_ORDER_DETAILS[1001];
    return ok(detail);
  }

  // 내 주문 목록
  if (path.includes('/api/users/me/orders')) {
    return ok({ items: MOCK_ORDER_ITEMS_RAW });
  }

  // 내 티켓
  if (path.includes('/api/users/me/tickets')) {
    return ok(MOCK_TICKET_RESPONSES);
  }

  // 관심 프로젝트
  if (path.includes('/api/users/me/likes/projects')) {
    return ok(MOCK_LIKED_PROJECTS, { offset: 0, limit: 10, total: MOCK_LIKED_PROJECTS.length });
  }

  // ──────────────────────────────────────────────────────
  // CREATORS
  // ──────────────────────────────────────────────────────

  // 크리에이터 요약
  if (path.includes('/api/creators/me/summary')) {
    return ok(MOCK_CREATOR_SUMMARY);
  }

  // 크리에이터 프로젝트 목록
  if (path.includes('/api/creators/me/projects')) {
    return ok({ items: MOCK_CREATOR_PROJECTS });
  }

  // 크리에이터 신청
  if (path.includes('/api/creators/applications/me/submit')) {
    return ok({ status: 'PENDING' });
  }
  if (path.includes('/api/creators/applications/me/docs')) {
    return ok({ docId: 1, docType: 'ID_CARD', attachmentId: 1, fileUrl: 'https://picsum.photos/seed/doc/200/200', originalFilename: 'id_card.jpg', extension: 'jpg' });
  }
  if (path.includes('/api/creators/applications')) {
    return ok({ applicationId: 1, creatorType: 'INDIVIDUAL', status: 'PENDING' });
  }

  // Creator Center: QR 상태 변경 (먼저 체크)
  const qrStatusMatch = path.match(/\/api\/creators\/creator-center\/projects\/(\d+)\/makers\/orderId\/(\d+)\/status\/(\w+)/);
  if (qrStatusMatch) {
    return ok({ success: true });
  }

  // Creator Center: 대시보드
  const dashboardMatch = path.match(/\/api\/creators\/creator-center\/projects\/(\d+)\/dashboard/);
  if (dashboardMatch) {
    return ok(MOCK_DASHBOARD);
  }

  // Creator Center: 메이커 목록
  const makersMatch = path.match(/\/api\/creators\/creator-center\/projects\/(\d+)\/makers$/);
  if (makersMatch) {
    const projectId = parseInt(makersMatch[1]);
    return ok({ projectId, items: MOCK_MAKERS.items });
  }

  // Creator Center: 정산
  const settlementMatch = path.match(/\/api\/creators\/creator-center\/projects\/(\d+)\/settlement/);
  if (settlementMatch) {
    return ok(MOCK_SETTLEMENT);
  }

  // Creator Center: 설정 변경 (PATCH)
  if (method === 'patch' && path.includes('/api/creators/creator-center/projects/') && path.includes('/details')) {
    return ok({ success: true });
  }

  // Creator Center: 설정 조회
  const settingMatch = path.match(/\/api\/creators\/creator-center\/projects\/(\d+)\/setting/);
  if (settingMatch) {
    return ok(MOCK_SETTING);
  }

  // ──────────────────────────────────────────────────────
  // ALARMS
  // ──────────────────────────────────────────────────────

  // 알람 삭제
  const alarmDeleteMatch = path.match(/\/api\/alarms\/(\d+)$/);
  if (alarmDeleteMatch && method === 'delete') {
    return ok(null);
  }

  // 알람 카운트
  if (path.includes('/api/alarms/count')) {
    return ok(MOCK_ALARMS.length);
  }

  // 알람 목록
  if (path.includes('/api/alarms')) {
    return ok(MOCK_ALARMS);
  }

  // ──────────────────────────────────────────────────────
  // CHECKIN / TICKETS
  // ──────────────────────────────────────────────────────

  // 체크인 토큰
  const ticketTokenMatch = path.match(/\/api\/checkin\/tickets\/(\w+)/);
  if (ticketTokenMatch) {
    const ticketId = ticketTokenMatch[1];
    const token = MOCK_TICKET_TOKENS[ticketId] || 'mock-token-default';
    return ok({ ticketToken: token });
  }

  // ──────────────────────────────────────────────────────
  // ORDERS (prepare)
  // ──────────────────────────────────────────────────────
  if (path.includes('/api/orders/prepare')) {
    return ok({ orderId: 9999, paymentKey: 'mock-payment-key' });
  }

  if (path.includes('/api/billing-auth/issue')) {
    return ok({ billingKey: 'mock-billing-key' });
  }

  // 기본 fallback: 404
  console.warn(`[MockInterceptor] 매칭되지 않은 URL: ${method.toUpperCase()} ${path}`);
  return ok(null);
};

export function setupMockInterceptor(apiInstance: AxiosInstance) {
  apiInstance.defaults.adapter = mockAdapter;
  axios.defaults.adapter = mockAdapter;
}
