import type { EventData, EventDetailData } from '../api/eventAPI';

export const MOCK_EVENTS: EventData[] = [
  {
    eventId: 1,
    title: '[공지] 뮤즈 플랫폼 오픈 안내',
    description: '뮤즈 플랫폼이 정식 오픈하였습니다. 다양한 크리에이터들의 프로젝트를 응원해주세요!',
    content: `
      <p>안녕하세요, 뮤즈 플랫폼입니다.</p>
      <p>뮤즈는 크리에이터와 팬을 연결하는 문화 공연 펀딩 플랫폼으로, 2025년 2월 정식 오픈하였습니다.</p>
      <h3>뮤즈에서 할 수 있는 것들</h3>
      <ul>
        <li>다양한 공연 및 전시 프로젝트 후원</li>
        <li>티켓 구매 및 QR 체크인</li>
        <li>크리에이터 직접 신청</li>
      </ul>
      <p>앞으로 더 많은 크리에이터와 함께 성장하겠습니다. 많은 관심 부탁드립니다.</p>
    `,
    category: 'NOTICE',
    date: '2025-02-01T09:00:00',
  },
  {
    eventId: 2,
    title: '[콜라보] 인디뮤직 레이블 × 뮤즈 파트너십 체결',
    description: '국내 대표 인디뮤직 레이블과 뮤즈가 파트너십을 맺었습니다.',
    content: `
      <p>뮤즈 플랫폼과 인디뮤직 레이블 <strong>INDIE STAGE</strong>가 공식 파트너십을 체결했습니다.</p>
      <p>이번 협력을 통해 레이블 소속 아티스트들의 단독 공연 펀딩 프로젝트가 뮤즈에서 우선 오픈됩니다.</p>
      <p>파트너십 기념으로 3월 중 특별 할인 후원 이벤트가 예정되어 있으니 많은 기대 부탁드립니다.</p>
    `,
    category: 'COLLAB',
    date: '2025-02-10T10:00:00',
  },
  {
    eventId: 3,
    title: '[뮤즈] 2025 상반기 트렌딩 크리에이터 선정',
    description: '2025년 상반기 뮤즈 플랫폼 트렌딩 크리에이터가 선정되었습니다.',
    content: `
      <p>2025년 상반기, 뮤즈 플랫폼에서 가장 사랑받은 크리에이터들을 소개합니다.</p>
      <h3>트렌딩 크리에이터 TOP 5</h3>
      <ol>
        <li>Band Dawn - 단독 콘서트 시리즈</li>
        <li>빛 스튜디오 - 사진전 Moment</li>
        <li>Jazz Lane - 뉴이어 재즈 페스티벌</li>
        <li>Craft Lab - 전통공예 체험 클래스</li>
        <li>무대 극단 - 창작극 시간의 방</li>
      </ol>
      <p>선정된 크리에이터들에게는 다음 프로젝트 플랫폼 수수료 혜택이 제공됩니다.</p>
    `,
    category: 'MUSES',
    date: '2025-02-15T11:00:00',
  },
  {
    eventId: 4,
    title: '[공지] 서비스 점검 안내 (2월 20일)',
    description: '2025년 2월 20일 새벽 2시부터 4시까지 서버 점검이 있을 예정입니다.',
    content: `
      <p>안녕하세요, 뮤즈 플랫폼입니다.</p>
      <p>보다 안정적인 서비스 제공을 위해 다음과 같이 서버 점검을 진행합니다.</p>
      <ul>
        <li>점검 일시: 2025년 2월 20일 (목) 02:00 ~ 04:00</li>
        <li>점검 사유: 인프라 업그레이드 및 보안 패치</li>
        <li>점검 중 모든 서비스 이용 불가</li>
      </ul>
      <p>이용에 불편을 드려 죄송합니다. 보다 나은 서비스로 찾아뵙겠습니다.</p>
    `,
    category: 'NOTICE',
    date: '2025-02-18T09:00:00',
  },
  {
    eventId: 5,
    title: '[콜라보] 예술의전당 × 뮤즈 공동 기획전',
    description: '예술의전당과 뮤즈가 함께 기획한 특별 전시가 진행됩니다.',
    content: `
      <p>뮤즈 플랫폼과 예술의전당이 공동으로 기획한 <strong>2025 신진 예술가 특별전</strong>이 오픈합니다.</p>
      <p>뮤즈에서 펀딩에 성공한 크리에이터들의 작품이 예술의전당 전시관에서 전시됩니다.</p>
      <p>전시 기간: 2025년 3월 1일 ~ 3월 31일</p>
      <p>관람 시간: 오전 10시 ~ 오후 8시 (월요일 휴관)</p>
      <p>입장료: 무료 (뮤즈 후원자 우선 입장 혜택 제공)</p>
    `,
    category: 'COLLAB',
    date: '2025-02-20T10:00:00',
  },
  {
    eventId: 6,
    title: '[뮤즈] 크리에이터 신청 기준 개선 안내',
    description: '더 많은 크리에이터가 참여할 수 있도록 신청 기준이 완화됩니다.',
    content: `
      <p>뮤즈 플랫폼의 크리에이터 신청 기준이 개선됩니다.</p>
      <h3>주요 변경 사항</h3>
      <ul>
        <li>개인 크리에이터 신청 시 필요 서류 간소화</li>
        <li>인스타그램/유튜브 팔로워 수 기준 완화</li>
        <li>신규 크리에이터 대상 첫 프로젝트 수수료 50% 할인</li>
      </ul>
      <p>변경된 기준은 2025년 3월 1일부터 적용됩니다.</p>
    `,
    category: 'MUSES',
    date: '2025-02-22T09:00:00',
  },
  {
    eventId: 7,
    title: '[공지] 결제 시스템 업데이트 안내',
    description: '더욱 안전하고 편리한 결제 환경을 위해 결제 시스템이 업데이트됩니다.',
    content: `
      <p>뮤즈 플랫폼의 결제 시스템이 업데이트됩니다.</p>
      <ul>
        <li>간편결제 토스페이, 카카오페이 추가</li>
        <li>해외 신용카드 지원</li>
        <li>결제 후 영수증 이메일 자동 발송</li>
      </ul>
      <p>기존에 등록된 카드 정보는 자동으로 이관됩니다.</p>
    `,
    category: 'NOTICE',
    date: '2025-02-24T10:00:00',
  },
  {
    eventId: 8,
    title: '[뮤즈] 2025 봄 시즌 특별 기획전 오픈',
    description: '봄을 맞이하여 뮤즈 특별 기획전이 열립니다.',
    content: `
      <p>2025년 봄 시즌, 뮤즈 플랫폼에서 특별 기획전을 준비했습니다.</p>
      <h3>봄 시즌 기획전 주요 프로젝트</h3>
      <ul>
        <li>인디 음악 페스티벌 시리즈</li>
        <li>신진 작가 사진전</li>
        <li>봄 주제 연극 공연 3편</li>
      </ul>
      <p>기획전 기간 동안 후원 시 특별 리워드가 추가로 제공됩니다.</p>
    `,
    category: 'MUSES',
    date: '2025-02-25T09:00:00',
  },
];

export const MOCK_EVENT_DETAILS: Record<number, EventDetailData> = {
  1: {
    event: MOCK_EVENTS[0],
    prevId: null,
    nextId: 2,
  },
  2: {
    event: MOCK_EVENTS[1],
    prevId: 1,
    nextId: 3,
  },
  3: {
    event: MOCK_EVENTS[2],
    prevId: 2,
    nextId: 4,
  },
  4: {
    event: MOCK_EVENTS[3],
    prevId: 3,
    nextId: 5,
  },
  5: {
    event: MOCK_EVENTS[4],
    prevId: 4,
    nextId: 6,
  },
  6: {
    event: MOCK_EVENTS[5],
    prevId: 5,
    nextId: 7,
  },
  7: {
    event: MOCK_EVENTS[6],
    prevId: 6,
    nextId: 8,
  },
  8: {
    event: MOCK_EVENTS[7],
    prevId: 7,
    nextId: null,
  },
};
