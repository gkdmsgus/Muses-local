import axios from 'axios';
import { setupMockInterceptor } from '../mocks/mockInterceptor';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('accessToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

if (import.meta.env.VITE_USE_MOCK === 'true') {
  setupMockInterceptor(api);
}

export default api;
