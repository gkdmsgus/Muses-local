import axios from 'axios';
import { ENDPOINTS } from './endpoints';

// 공통타입
export interface ApiResponse<T> {
  success: boolean;
  data: T;
  page?: {
    offset: number;
    limit: number;
    total: number;
  };
  error?: {
    code: string;
    message: string;
    detail: string;
  };
}

// 유저 공통 데이터
interface UserAuthData {
  accessToken: string;
  refreshToken: string;
  role: string;
  name: string;
}

// 로그인
export const loginAPI = async (credentials: {
  email: string;
  password: string;
}) => {
  const response = await axios.post<ApiResponse<UserAuthData>>(
    ENDPOINTS.AUTH.LOGIN,
    credentials
  );
  return response.data;
};

export const socialLoginAPI = async (
  provider: 'kakao' | 'google',
  code: string
) => {
  const endpoint =
    provider === 'kakao'
      ? ENDPOINTS.AUTH.KAKAO_OAUTH_CODE
      : ENDPOINTS.AUTH.GOOGLE_OAUTH_CODE;

  const response = await axios.post<ApiResponse<UserAuthData>>(endpoint, {
    code,
  });
  return response.data;
};

//로그아웃
export const logoutAPI = async () => {
  const response = await axios.post<ApiResponse<string>>(ENDPOINTS.AUTH.LOGOUT);
  return response.data;
};

//닉네임 중복 확인
export const checkNicknameAPI = async (nickname: string) => {
  // 쿼리 파라미터로 보낼 경우
  const response = await axios.get<ApiResponse<boolean>>(
    `${ENDPOINTS.AUTH.CHECK_NICKNAME}`,
    { params: { nickname } }
  );
  return response.data;
};

//회원가입
export const signupAPI = async (userData: {
  name: string;
  email: string;
  password: string;
}) => {
  const response = await axios.post<ApiResponse<number>>(
    ENDPOINTS.AUTH.SIGNUP,
    userData
  );
  return response.data;
};

//이메일 중복 확인
export const checkEmailAPI = async (email: string) => {
  const response = await axios.get<ApiResponse<boolean>>(
    ENDPOINTS.AUTH.CHECK_EMAIL,
    { params: { email: email } }
  );
  return response.data;
};

//초기 프로필 설정
export const createProfileAPI = async (profileData: {
  profileImage?: File | null;
  nickName: string;
  introduction?: string;
  birthday: string;
  gender: number;
}) => {
  const formData = new FormData();

  if (profileData.profileImage) {
    formData.append('profileImage', profileData.profileImage);
  }
  formData.append('nickName', profileData.nickName);
  formData.append('introduction', profileData.introduction || '');
  formData.append('birthday', profileData.birthday);
  formData.append('gender', profileData.gender.toString());

  const token = localStorage.getItem('accessToken');

  const response = await axios.post<ApiResponse<UserAuthData>>(
    ENDPOINTS.AUTH.CREATE_PROFILE,
    formData,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};

//회원탈퇴
export const withdrawAPI = async () => {
  const response = await axios.delete<ApiResponse<string>>(
    ENDPOINTS.AUTH.WITHDRAW
  );
  return response.data;
};
