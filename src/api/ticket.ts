import { ENDPOINTS } from './endpoints';
import { type TicketResponse } from '../components/MyPage/types/ticket';
import api from './axiosInstance';

export const getMyTickets = async (): Promise<TicketResponse[]> => {
  const res = await api.get(ENDPOINTS.TICKET_INFO);
  return res.data.data;
};

export const getCheckinToken = async (ticketId: string) => {
  const res = await api.get(`${ENDPOINTS.TICKET_TOKEN}/${ticketId}`);
  return res.data.data; // { ticketToken: "..." }
};

export const getTicketQrImageUrl = async (
  ticketId: string
): Promise<string> => {
  const res = await api.get(`${ENDPOINTS.TICKET_TOKEN}/${ticketId}/qr.png`, {
    responseType: 'blob',
  });
  return URL.createObjectURL(res.data);
};
