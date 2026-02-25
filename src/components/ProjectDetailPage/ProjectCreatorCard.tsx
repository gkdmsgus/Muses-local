import { ChevronRight, Users } from 'lucide-react';
import type { ProjectDetailData } from '../../types/projectDetails';

interface ProjectInfoProps {
  detail: ProjectDetailData;
}

export const ProjectCreatorCard = ({ detail }: ProjectInfoProps) => {
  console.log(detail);
  return (
    <div className="w-full flex flex-col bg-white rounded-[32px] shadow-xs p-6 border border-white80 mb-6 gap-5">
      <div className="flex items-center justify-between gap-4">
        {/* {detail.hostProfileImg ? (
          <img
            src={detail.hostProfileImg}
            alt="creator profile"
            className="w-14 h-14 rounded-full object-cover"
          />
        ) : ( */}
        <div className="w-14 h-14 bg-[#C7D2FE] rounded-full p-4">
          <Users className="w-full h-full text-[#4F46E5]" />
        </div>
        {/* )} */}
        <div className="flex flex-col gap-1 justify-start w-[166px]">
          <p className="text-xs font-boldFont text-black40">Creator</p>
          <p className="text-lg font-boldFont text-mainBlack">
            {detail.creatorName}
          </p>
        </div>
        <div className="w-8 h-8 bg-mainWhite rounded-full p-2 cursor-pointer hover:bg-white60 transition-all duration-300">
          <ChevronRight className="w-full h-full text-mainBlack" />
        </div>
      </div>
      <div className="flex justify-between items-center">
        <p className="text-xs font-boldFont text-black40">담당자</p>
        <p className="text-lg font-boldFont text-mainBlack">
          {detail.managerName}
        </p>
        <p className="text-base font-mediumFont text-mainBlack">
          {detail.managerPhone}
        </p>
      </div>
    </div>
  );
};
