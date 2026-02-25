import { MoveLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { PROJECT_STATUS_STYLE } from '../../types/project';

export type ProjectTab = 'dashboard' | 'setting' | 'makers' | 'settlement';

const TABS: { key: ProjectTab; label: string }[] = [
  { key: 'dashboard', label: '대시보드' },
  { key: 'setting', label: '프로젝트 설정' },
  { key: 'makers', label: '메이커 명단' },
  { key: 'settlement', label: '정산' },
];
type ProjectStatus = 'FUNDING' | 'SUCCESS' | 'SCHEDULED';

interface Props {
  activeTab: ProjectTab;
  onChange: (tab: ProjectTab) => void;
  projectTitle: string;
  projectStatus?: ProjectStatus;
}

const ProjectTabs = ({
  activeTab,
  onChange,
  projectTitle,
  projectStatus,
}: Props) => {
  const navigate = useNavigate();
  const statusInfo = projectStatus ? PROJECT_STATUS_STYLE[projectStatus] : null;

  return (
    <div className="w-full mx-auto px-20 bg-white border-b border-white60">
      <div className="w-full mx-auto px-6 py-4 flex flex-col gap-4">
        {/* 헤더 */}
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <button
              type="button"
              onClick={() => navigate('/mypage?tab=creator')}
              className="p-2 rounded-lg cursor-pointer transition durastion-200 hover:-translate-x-0.5"
              aria-label="마이페이지로 돌아가기"
            >
              <MoveLeft size={20} />
            </button>

            <div className="pl-4 text-mainBlack text-2xl font-boldFont leading-8">
              {projectTitle}
            </div>
          </div>

          {statusInfo && (
            <div
              className={`px-2 py-0.5 rounded flex items-center ${statusInfo.badgeClass}`}
            >
              <span
                className={`text-[10px] font-boldFont leading-4 ${statusInfo.textClass}`}
              >
                {statusInfo.label}
              </span>
            </div>
          )}
        </div>

        {/* 탭 */}
        <div className="flex">
          {TABS.map((tab, index) => {
            const isActive = tab.key === activeTab;

            return (
              <button
                key={tab.key}
                type="button"
                onClick={() => onChange(tab.key)}
                className={`px-1 pb-3 cursor-pointer hover:scale-103 ${
                  index !== 0 ? 'ml-6' : ''
                } border-b-2 transition-colors
                ${
                  isActive
                    ? 'border-[#9333EA] text-[#9333EA] font-semiBoldFont'
                    : 'border-black/0 text-black60 font-mainFont'
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ProjectTabs;
