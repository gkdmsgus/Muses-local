import { useNavigate } from 'react-router-dom';
import { PROJECT_STATUS_STYLE, type Project } from '../types/project';

interface MyProjectItemProps {
  project: Project;
}

const MyProjectItem = ({ project }: MyProjectItemProps) => {
  const statusInfo = PROJECT_STATUS_STYLE[project.fundingStatus];
  const navigate = useNavigate();

  return (
    <div className="inline-flex items-start gap-5">
      <div className="w-[661px] p-4 rounded-2xl border border-white80 flex items-center ">
        <div className="w-16 h-16 bg-[#C7D2FE] rounded-xl flex items-center justify-center text-white text-lg font-boldFont shrink-0">
          {project.title[0]}
        </div>

        <div className="ml-4 flex-1 flex flex-col gap-1">
          <div className="flex items-center gap-2">
            <div
              className={`px-2 py-0.5 rounded text-[10px] font-boldFont ${statusInfo.badgeClass} ${statusInfo.textClass}`}
            >
              {statusInfo.label}
            </div>

            {project.dday > 0 && (
              <span className="text-xs text-black40 font-mainFont">
                D-{project.dday}
              </span>
            )}
          </div>

          <div className="text-sm font-boldFont text-mainBlack">
            {project.title}
          </div>

          <div className="w-[450px] h-1.5 bg-white80 rounded-full overflow-hidden">
            <div
              className="h-1.5 bg-solidBlue"
              style={{ width: `${Math.min(project.achieveRate, 100)}%` }}
            />
          </div>
        </div>

        <div className="ml-4 w-[72px] flex flex-col items-end shrink-0">
          <div className="text-[#4F46E5] text-base font-boldFont">
            {project.achieveRate}%
          </div>
          <div className="text-black40 text-xs font-mainFont">
            {project.raisedAmount.toLocaleString()}원
          </div>
        </div>
      </div>

      <button
        type="button"
        onClick={() => navigate(`/mypage/projectresult/${project.projectId}`)}
        className="w-24 h-24 p-6 bg-[#EEF2FF] rounded-2xl border border-[#EEF2FF] flex items-center justify-center text-[12px] font-boldFont text-black cursor-pointer transition duration-200 hover:scale-105 "
      >
        상세보기
      </button>
    </div>
  );
};

export default MyProjectItem;
