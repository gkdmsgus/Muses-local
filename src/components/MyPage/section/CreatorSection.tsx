import { ChartLine, Wallet } from 'lucide-react';
import MyProjectList from '../projects/MyProjectList';
import type { Project } from '../types/project';

interface Props {
  projects: Project[];
}

const CreatorSection = ({ projects }: Props) => {
  const totalSupportAmount =
    projects.reduce((sum, p) => sum + p.raisedAmount, 0) / 10000;

 const activeProjects = projects.filter(
  (p) => p.fundingStatus === 'FUNDING'
);

  const activeProjectCount = activeProjects.length;

  return (
    <section className="w-full max-w-[848px] flex flex-col gap-6">
      {/* 상단 요약 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <div className="text-xs text-gray-400 mb-1 inline-flex items-center">
            <Wallet className="h-3 w-3 mr-1" />총 후원금
          </div>
          <div className="text-xl font-bold">
            {totalSupportAmount}
            <span className="ml-1 text-xs font-semibold text-gray-400">
              만원
            </span>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <div className="text-xs text-gray-400 mb-1 inline-flex items-center">
            <ChartLine className="h-3 w-3 mr-1" />
            진행중 프로젝트
          </div>
          <div className="text-xl font-bold">
            {activeProjectCount}
            <span className="ml-1 text-xs font-semibold text-gray-400">개</span>
          </div>
        </div>
      </div>

      <MyProjectList projects={projects} />
    </section>
  );
};

export default CreatorSection;
