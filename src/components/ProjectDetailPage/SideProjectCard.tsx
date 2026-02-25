import type { Project } from '../../types/projects';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import fallbackPoster from '../../assets/images/fallbackPoster.png';

interface SideProjectCardProps {
  project: Project;
  position: 'prev' | 'next';
  onClick: () => void;
}

export default function SideProjectCard({
  project,
  position,
  onClick,
}: SideProjectCardProps) {
  const isPrev = position === 'prev';
  const posterSrc = project.posterImage ?? fallbackPoster;
  const wrapperStyle = {
    left: '50%',
    transform: isPrev ? 'translateX(-336px)' : 'translateX(46px)',
  };
  const buttonStyle = isPrev
    ? { left: '50px', top: '50%', transform: 'translateY(-50%)' }
    : { right: '50px', top: '50%', transform: 'translateY(-50%)' };
  const buttonHoverClass = isPrev
    ? 'hover:-translate-x-1'
    : 'hover:translate-x-1';
  const cardHoverClass = isPrev
    ? 'peer-hover:-translate-x-3 peer-hover:-rotate-2'
    : 'peer-hover:translate-x-3 peer-hover:rotate-2';

  return (
    <div className="absolute z-0" style={wrapperStyle}>
      <div className="relative">
        <button
          type="button"
          aria-label={isPrev ? '이전 프로젝트' : '다음 프로젝트'}
          className={`peer absolute z-20 w-14 h-14 rounded-full bg-white80/50 text-black80 flex items-center justify-center shadow cursor-pointer transition-transform duration-300 ease-out ${buttonHoverClass}`}
          style={buttonStyle}
          onClick={onClick}
        >
          {isPrev ? (
            <ChevronLeft className="w-8 h-8 text-white" />
          ) : (
            <ChevronRight className="w-8 h-8 text-white" />
          )}
        </button>
        <div
          className={`relative w-[290px] h-[460px] rounded-3xl shadow-md overflow-hidden transition-transform duration-300 ease-out bg-cover bg-center ${cardHoverClass}`}
          style={{ backgroundImage: `url(${posterSrc})` }}
        >
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />
        </div>
      </div>
    </div>
  );
}
