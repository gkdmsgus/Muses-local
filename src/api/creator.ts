import axiosInstance from './axiosInstance';
import { ENDPOINTS } from './endpoints';

export const getCreatorSummary = async () => {
  const res = await axiosInstance.get(ENDPOINTS.CREATOR_SUMMARY);
  return res.data.data;
};
