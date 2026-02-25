import type {
  CreatorApiType,
  CreatorApplication,
  CreatorSubmitResult,
  UploadDocResponse,
  CreatorDocType,
} from '../components/MyPage/types/creatorDocumentConfig';
import api from './axiosInstance';
import ENDPOINTS from './endpoints';

// 1. 신청 생성
export const createCreatorApplication = async (
  creatorType: CreatorApiType
): Promise<CreatorApplication> => {
  const res = await api.post<{ success: boolean; data: CreatorApplication }>(
    ENDPOINTS.UPDATE_CREATOR.CREATE_APPLICATION,
    { creatorType }
  );
  return res.data.data;
};

// 2. 서류 업로드
export const uploadCreatorDoc = async (
  docType: CreatorDocType,
  file: File
): Promise<UploadDocResponse> => {
  const formData = new FormData();
  formData.append('docType', docType);
  formData.append('file', file);

  const res = await api.post<{ success: boolean; data: UploadDocResponse }>(
    ENDPOINTS.UPDATE_CREATOR.MY_DOCS,
    formData
  );
  return res.data.data;
};

// 3. 신청 제출
export const submitCreatorApplication = async (): Promise<CreatorSubmitResult> => {
  const res = await api.post<{ success: boolean; data: CreatorSubmitResult }>(
    ENDPOINTS.UPDATE_CREATOR.SUBMIT_APPLICATION,
    {}
  );
  return res.data.data;
};
