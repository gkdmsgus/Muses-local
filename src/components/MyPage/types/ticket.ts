// ticket.ts
import axios from 'axios';
import ENDPOINTS from '../../../api/endpoints';

export interface TicketItem {
  id: number;           // 내부 key용
  ticketId: string;     // 체크인 API에 쓸 실제 ID
  title: string;
  date: string;
  seatLabel: string;
  selectedSeat: string;
  bgClassName: string;
  ticketToken: string;
}

export interface CheckinTokenResponse {
  success: boolean;
  data: {
    ticketToken: string;
  };
}

export const mapTicketToItem = (ticket: TicketResponse): TicketItem => ({
  id: ticket.ticketId,
  ticketId: String(ticket.ticketId),
  bgClassName:
    'bg-[linear-gradient(135deg,var(--color-blue-34,#312E81)_0%,var(--color-violet-32,#581C87)_50%,var(--color-black-solid,#000)_100%)]',
  title: ticket.projectTitle,
  date: new Date(ticket.opening).toLocaleString(),
  seatLabel: ticket.optionLabel,
  selectedSeat: ticket.optionLabel,
  ticketToken: ticket.ticketToken
});

export const getMyTickets = async (): Promise<TicketResponse[]> => {
  const token = localStorage.getItem('accessToken');
  if (!token) throw new Error('로그인 필요');

  const res = await axios.get(ENDPOINTS.TICKET_INFO, {
    headers: { Authorization: `Bearer ${token}` },
  });

  return res.data.data;
};

export const getCheckinToken = async (ticketId: string): Promise<{ ticketToken: string }> => {
  const token = localStorage.getItem('accessToken');
  if (!token) throw new Error('로그인 필요');

  const res = await axios.get(`${ENDPOINTS.TICKET_TOKEN}/${ticketId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  return res.data.data; // { ticketToken: "..." }
};

export interface TicketResponse {
  ticketId: number;
  projectTitle: string;
  opening: string;
  optionLabel: string;
  ticketToken: string;
  status: string;
}
