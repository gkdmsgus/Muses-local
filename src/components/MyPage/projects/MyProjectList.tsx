import { Plus } from 'lucide-react';
import MyProjectItem from './MyProjectItem';
import type { Project } from '../types/project';

interface MyProjectListProps {
  projects: Project[];
}

const MyProjectList = ({ projects }: MyProjectListProps) => {
  return (
    <div className="self-stretch p-8 bg-white rounded-[40px] border border-white80 flex flex-col gap-6">
      {/* 헤더 */}
      <div className="w-[782px] flex justify-between items-center">
        <div className="text-lg font-boldFont text-mainBlack">내 프로젝트</div>

        <button className="px-3 py-1.5 bg-[#EEF2FF] rounded-lg flex items-center gap-1 transition cursor-pointer">
          <span className="flex items-center justify-center gap-1 text-xs font-boldFont text-[#4F46E5]">
            <Plus size={12} />새 프로젝트
          </span>
        </button>
      </div>

      {/* 리스트 */}
      <div className="flex flex-col gap-4">
        {projects.map((project) => (
          <MyProjectItem key={project.projectId} project={project} />
        ))}
      </div>
    </div>
  );
};

export default MyProjectList;
