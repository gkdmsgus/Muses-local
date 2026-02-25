import { useEffect, useState } from 'react';
import DashboardContainer from './DashBoardContainer';
import DashboardKpiSection from './DashboardKpiSection';
import DashboardMainSection from './DashboardMainSection';
import { useParams } from 'react-router-dom';
import type { ProjectDashboard } from '../../../types/project';
import { fetchProjectDashboard } from '../../../../../api/project';

const DashboardTab = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const [dashboard, setDashboard] = useState<ProjectDashboard | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!projectId) return;

    const load = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await fetchProjectDashboard(projectId);
        setDashboard(data);
      } catch (err) {
        console.error('대시보드 데이터 로딩 실패:', err);
        setError(
          err instanceof Error
            ? err.message
            : '대시보드 데이터를 불러오는데 실패했습니다.'
        );
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [projectId]);

  if (loading) {
    return (
      <div className="w-[1425px] min-h-[713px] pb-8 flex flex-col items-center justify-center gap-8">
        <div className="text-black60 text-lg">
          대시보드 데이터를 불러오는 중...
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-[1425px] min-h-[713px] pb-8 flex flex-col items-center justify-center gap-8">
        <div className="text-[#EF4444] text-lg">{error}</div>
      </div>
    );
  }

  return (
    <div className="w-[1425px] min-h-[713px] pb-8 flex flex-col items-center gap-8">
      <DashboardContainer>
        <DashboardKpiSection
          totalFunding={dashboard?.totalFunding ?? 0}
          participantCount={dashboard?.participantCount ?? 0}
          likeCount={dashboard?.likeCount ?? 0}
          dday={dashboard?.dday ?? 0}
        />
        <DashboardMainSection
          rewardSales={dashboard?.rewardSales ?? []}
          genderRatio={dashboard?.genderRatio ?? { male: 0, female: 0 }}
          ageRatio={
            dashboard?.ageRatio ?? { '20s': 0, '30s': 0, '40s': 0, '50s+': 0 }
          }
        />
      </DashboardContainer>
    </div>
  );
};

export default DashboardTab;
