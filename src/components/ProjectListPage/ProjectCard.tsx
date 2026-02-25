import { MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';
import ProjectCardFooter from './ProjectCardFooter';
import fallbackPoster from '../../assets/images/fallbackPoster.png';
import type { Project } from '../../types/projects';

interface ProjectCardProps {
  project: Project;
  posterClassNameValue?: string;
  contentClassNameValue?: string;
}

export default function ProjectCard({
  project,
  posterClassNameValue,
  contentClassNameValue,
}: ProjectCardProps) {
  const regionLabels: Record<string, string> = {
    SEOUL: '서울',
    GYEONGGI: '경기',
    INCHEON: '인천',
    BUSAN: '부산',
    GWANGJU: '광주',
    DAEGU: '대구',
    DAEJEON: '대전',
    ULSAN: '울산',
    JEJU: '제주',
    GANGWON: '강원',
    GYEONGNAM: '경남',
    GYEONGBUK: '경북',
    JEONNAM: '전남',
    JEONBUK: '전북',
  };
  const regionLabel = regionLabels[project.region] ?? project.region;
  const posterSrc = project.thumbnailUrl || fallbackPoster;
  const posterClassName =
    posterClassNameValue ?? 'h-[380px] w-[285px] rounded-3xl';
  const isScheduled = project.isScheduled;
  const isClosed =
    project.fundingStatus === 'SUCCESS' || project.fundingStatus === 'FAIL';
  return (
    <Link
      to={`/project/${project.projectId}`}
      className="flex flex-col group cursor-pointer font-mainFont h-fit"
    >
      {/* 위치 및 상태, 썸네일 */}
      <div
        className={`${posterClassName} p-4 shadow-sm cursor-pointer mb-5 relative overflow-hidden bg-cover bg-center`}
        style={{ backgroundImage: `url(${posterSrc})` }}
      >
        <div
          className="absolute bottom-0 left-0 right-0 h-full rounded-b-3xl"
          style={{
            background:
              'linear-gradient(to top, rgba(0, 0, 0, 0.5) 0%, transparent 50%)',
          }}
        />
        <div className="flex items-center mb-4 relative">
          <div className="flex items-center gap-1 bg-white/90 rounded-lg px-2.5 py-1 shadow-sm mr-2">
            <MapPin className="w-4 h-4 text-solidBlue" />
            <span className="text-[10px] font-boldFont text-[#1F2937]">
              {regionLabel}
            </span>
          </div>
          <span
            className={`px-2 py-1 rounded text-[10px] font-boldFont ${
              isScheduled
                ? 'bg-[#FACC15] text-black'
                : project.fundingStatus === 'FUNDING'
                  ? 'bg-solidBlue text-white'
                  : 'bg-black60 text-white'
            }`}
          >
            {isScheduled
              ? '오픈예정'
              : project.fundingStatus === 'FUNDING'
                ? '진행중'
                : '마감'}
          </span>
        </div>

        {/* 종료 상태 오버레이 */}
        {isClosed && (
          <>
            <div className="absolute bottom-0 left-0 right-0 h-full rounded-b-3xl bg-black/40" />
            <div className="absolute inset-0 flex items-center justify-center z-20">
              <div
                className="px-4 py-2 border-2 border-white"
                style={{ transform: 'rotate(-15deg)' }}
              >
                <span className="text-xl font-blackFont text-white tracking-wider">
                  CLOSED
                </span>
              </div>
            </div>
          </>
        )}
      </div>
      <div className={`${contentClassNameValue ?? ''}`}>
        {/* 태그 */}
        <div className="flex gap-2 mb-2 flex-wrap">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="text-[10px] text-black60 bg-white80 px-2 py-0.5 rounded border border-white60"
            >
              #{tag}
            </span>
          ))}
        </div>

        {/* 제목 */}
        <h3 className="text-[20px] font-boldFont text-mainBlack mb-4 group-hover:text-solidBlue transition-all duration-500">
          <span
            className={`title-clamp ${
              project.fundingStatus === 'FUNDING' ? 'title-clamp--fixed' : ''
            }`}
          >
            {project.title}
          </span>
        </h3>

        {/* 달성률, 마감일 */}
        <ProjectCardFooter project={project} />
      </div>
    </Link>
  );
}
