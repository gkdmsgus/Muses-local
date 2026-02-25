import type { ProjectDashboard } from '../components/MyPage/types/project';
import api from './axiosInstance';
import { ENDPOINTS } from './endpoints';

export const fetchProjectDashboard = async (
  projectId: string
): Promise<ProjectDashboard> => {
  const res = await api.get(
    `${ENDPOINTS.PROJECT_DASHBOARD}/${projectId}/dashboard`
  );
  return res.data.data;
};
