import api from '../api/axiosInstance';
import ENDPOINTS from '../api/endpoints';

export const getProjectSetting = (projectId: number) => {
  return api.get(ENDPOINTS.CREATOR_PROJECT_SETTING(projectId));
};

export const updateProjectSetting = (
  projectId: number,
  payload: {
    description: string;
    tags: string[];
  }
) => {
  return api.patch(
    ENDPOINTS.CREATOR_PROJECT_SETTING_DETAILS(projectId),
    payload
  );
};
