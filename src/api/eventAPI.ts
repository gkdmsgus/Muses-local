import axios from 'axios';
import { ENDPOINTS } from './endpoints';

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  page?: {
    offset: number;
    limit: number;
    total: number;
  };
  error: {
    code: string;
    message: string;
    detail: string;
  } | null;
}

export interface EventData {
  eventId: number;
  title: string;
  description: string;
  content: string;
  category: 'NOTICE' | 'COLLAB' | 'MUSES';
  date: string;
}

export interface EventDetailData {
  event: EventData;
  prevId: number | null;
  nextId: number | null;
}

export const fetchEventsAPI = async (params: {
  keyword?: string;
  page?: number;
  size?: number;
}) => {
  const response = await axios.get<ApiResponse<EventData[]>>(
    ENDPOINTS.EVENTS.LIST,
    {
      params: {
        keyword: params.keyword,
        page: params.page ?? 0,
        size: params.size ?? 3,
      },
    }
  );
  return response.data;
};

export const fetchEventDetailAPI = async (eventId: string) => {
  const response = await axios.get<ApiResponse<EventDetailData>>(
    `${ENDPOINTS.EVENTS.LIST}/${eventId}`
  );

  return response.data;
};
