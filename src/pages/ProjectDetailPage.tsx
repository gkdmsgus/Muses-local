import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import ProjectMain from '../components/ProjectDetailPage/ProjectMain';
import ProjectInfo from '../components/ProjectDetailPage/ProjectInfo';
import { ENDPOINTS } from '../api/endpoints';
import type {
  ProjectDetailData,
  ProjectDetailResponse,
} from '../types/projectDetails';

export default function ProjectDetailPage() {
  const { id } = useParams();
  const projectId = Number.parseInt(id ?? '', 10);
  const [detail, setDetail] = useState<ProjectDetailData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    if (!Number.isFinite(projectId)) {
      setErrorMessage('프로젝트를 찾을 수 없어요.');
      setIsLoading(false);
      return;
    }
    setIsLoading(true);
    setErrorMessage('');
    axios
      .get<ProjectDetailResponse>(
        ENDPOINTS.PROJECT_DETAIL.replace('{projectId}', String(projectId))
      )
      .then((response) => {
        if (!response.data.success) {
          throw new Error(
            response.data.error?.message ?? '프로젝트를 불러오지 못했습니다.'
          );
        }
        setDetail(response.data.data);
      })
      .catch((error) => {
        setDetail(null);
        setErrorMessage(
          error instanceof Error
            ? error.message
            : '프로젝트를 불러오지 못했습니다.'
        );
      })
      .finally(() => setIsLoading(false));
  }, [projectId]);

  if (isLoading) {
    return (
      <div className="min-h-screen pt-24 pb-[230px] w-full bg-mainWhite flex flex-col items-center">
        <div className="text-black60 font-mainFont">
          프로젝트를 불러오는 중이에요.
        </div>
      </div>
    );
  }

  if (!detail) {
    return (
      <div className="min-h-screen pt-24 pb-[230px] w-full bg-mainWhite flex flex-col items-center">
        <div className="text-black60 font-mainFont">
          {errorMessage || '프로젝트를 찾을 수 없어요.'}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-[230px] w-full bg-mainWhite flex flex-col items-center overflow-x-hidden">
      <ProjectMain detail={detail} />
      <ProjectInfo detail={detail} />
    </div>
  );
}
