import { MapPin } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import type { InterestProjectCardProps } from '../../../types/projects';

const InterestProjectCard = ({
  projectId,
  location,
  status,
  tags,
  title,
  progress,
  dday,
}: InterestProjectCardProps) => {
  const navigate = useNavigate();

  return (
    <div className="w-72 flex flex-col gap-4">
      <div className="rounded-[32px] overflow-hidden shadow">
        <div
          className="h-96 relative bg-[#D9F99D] cursor-pointer"
          onClick={() => navigate(`/project/${projectId}`)}
        >
          <div className="absolute left-4 top-4 flex gap-2">
            <div className="px-2.5 py-1 bg-white rounded-lg flex items-center gap-1">
              <MapPin className="text-[#6366F1]" size={12} />
              <span className="text-[10px] font-boldFont text-[#1F2937]">
                {location}
              </span>
            </div>

            <div className="flex items-center px-2 py-0.5 bg-[#6366F1] rounded">
              <span className="text-[10px] font-boldFont text-white">
                {status}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="px-2 flex flex-col gap-2">
        <div className="flex gap-1 flex-wrap">
          {tags.map(tag => (
            <span
              key={tag}
              className="px-2 py-0.5 rounded bg-white80 border border-white60 text-[10px] text-black60 leading-4 font-mainFont"
            >
              #{tag}
            </span>
          ))}
        </div>

        <div className="text-xl font-boldFont text-mainBlack">{title}</div>

        <div className="flex justify-between items-center pt-2">
          <span className="text-lg font-blackFont text-[#4F46E5]">
            {progress}%
          </span>
          <div className="px-2 py-1 bg-white80 rounded">
            <span className="text-xs font-boldFont text-black40">{dday}</span>
          </div>
        </div>

        <div className="h-1.5 bg-white80 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-[#A855F7] to-[#6366F1]"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  );
};

export default InterestProjectCard;
