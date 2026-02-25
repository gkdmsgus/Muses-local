import { Bell, Calendar, Award } from 'lucide-react';
import type { Project } from '../../types/projects';
import { formatDeadlineDisplay, formatOpenDate } from '../../utils/date';

interface ProjectCardFooterProps {
  project: Project;
}

export default function ProjectCardFooter({ project }: ProjectCardFooterProps) {
  return (
    <>
      {/* 달성률, 마감일 */}
      {!project.isScheduled && project.fundingStatus === 'FUNDING' && (
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <span className="text-[18px] font-blackFont text-[#4F46E5]">
              {project.achieveRate || 0}%
            </span>
            {project.deadline && (
              <span className="text-xs font-boldFont text-black60 bg-white80 px-2 py-1 rounded">
                {formatDeadlineDisplay(project.deadline)}
              </span>
            )}
          </div>
          {/* 진행 바 */}
          <div className="w-full h-2 bg-white60 rounded-full overflow-hidden">
            <div
              className="h-full rounded-full transition-all"
              style={{
                width: `${Math.min(project.achieveRate || 0, 100)}%`,
                background: 'linear-gradient(to right, #A855F7, #6366F1)',
              }}
            />
          </div>
        </div>
      )}

      {project.isScheduled && (
        <div className="flex items-center justify-between">
          {project.opening && (
            <div className="flex items-center gap-1">
              <Calendar className="w-4 h-4 text-solidBlue" />
              <span className="text-[14px] text-[#1F2937] font-boldFont">
                {formatOpenDate(project.opening)}
              </span>
            </div>
          )}
          <button
            className="cursor-pointer flex items-center gap-2 bg-[#EEF2FF] hover:bg-[#E0E7FF] text-solidBlue px-3 py-1.5 rounded-full text-xs font-boldFont transition-colors"
            onClick={(event) => {
              event.preventDefault();
              event.stopPropagation();
            }}
          >
            <Bell className="w-3 h-3" />
            알림신청
          </button>
        </div>
      )}

      {(project.fundingStatus === 'SUCCESS' ||
        project.fundingStatus === 'FAIL') && (
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1">
            <Award className="w-4 h-4 text-black60" />
            <span className="text-sm text-black60">펀딩 마감</span>
          </div>
          {project.achieveRate && (
            <span className="text-sm font-boldFont text-[#374151]">
              {project.achieveRate}% 달성
            </span>
          )}
        </div>
      )}
    </>
  );
}
