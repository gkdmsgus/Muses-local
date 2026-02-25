import axios from 'axios';
import { ENDPOINTS } from './endpoints';
import type { Member } from '../components/MyPage/types/apitypes/members';
import type { ProjectListResponse } from '../types/projects';

export const getMyInfo = async () => {
  const res = await axios.get(ENDPOINTS.MY_INFO, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
    },
  });

  return res.data.data; // 🔥 이게 핵심
};

export const updateMyProfile = async (payload: {
  nickName: string;
  introduction: string;
  birthday: string;
  gender: number;
}) => {
  const res = await axios.post(
    ENDPOINTS.MY_PROFILE_UPDATE, // "/api/users/me/profile"
    payload,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      },
    }
  );

  return res.data.data as Member;
};

export const fetchMyLikedProjects = async (
  page = 0,
  size = 10
): Promise<ProjectListResponse> => {
  const res = await axios.get(ENDPOINTS.MY_LIKES_PROJECTS, {
    params: { page, size },
    headers: {
      Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
    },
  });

  return res.data;
};


export const fetchMyCreatorProjects = async () => {
  const res = await axios.get(ENDPOINTS.CREATOR_PROJECT_LIST, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
    },
  });

  return res.data.data.items;
};
