import { useEffect, useState } from 'react';
import { ProjectCreatorCard } from './ProjectCreatorCard';
import { ProjectRewardList } from './ProjectRewardList';
import { Heart, Share2 } from 'lucide-react';
import type { ProjectDetailData } from '../../types/projectDetails';

export interface ProjectInfoProps {
  detail: ProjectDetailData;
}

export default function ProjectInfo({ detail }: ProjectInfoProps) {
  const [isLiked, setIsLiked] = useState(false);
  const [likePulseKey, setLikePulseKey] = useState(0);
  const [particles, setParticles] = useState<number[]>([]);
  const likeCount = isLiked ? 1 : 0;
  useEffect(() => {
    if (particles.length === 0) return;
    const timer = window.setTimeout(() => setParticles([]), 600);
    return () => window.clearTimeout(timer);
  }, [particles]);

  return (
    <div className="w-full font-mainFont mb-12">
      <div className="w-full border-b border-white60">
        <div className="w-full mx-auto max-w-[976px] px-6 h-[54px] text-sm font-boldFont text-solidBlue">
          <div className="flex items-center justify-center w-fit h-full border-b-2 border-solidBlue">
            프로젝트 스토리
          </div>
        </div>
      </div>

      <div className="mt-12 flex gap-12 lg:flex-row flex-col justify-center">
        <div className="max-w-[720px] w-full">
          <p className="text-2xl font-boldFont text-mainBlack">프로젝트 소개</p>
          <div
            className="project-detail-content mt-6 text-base text-black80 leading-relaxed"
            dangerouslySetInnerHTML={{ __html: detail.storyHtml }}
          />
        </div>
        {/* 크리에이터 및 리워드 목록 */}
        <div className="w-[336px]">
          <ProjectCreatorCard detail={detail} />
          <ProjectRewardList detail={detail} />
          {/* 좋아요 및 공유하기 */}
          <div className="flex gap-2 w-full">
            <button
              type="button"
              aria-pressed={isLiked}
              className="relative w-1/2 border border-white60 rounded-xl hover:bg-mainWhite transition-all duration-300 py-3 flex items-center justify-center cursor-pointer"
              onClick={() => {
                setIsLiked((prev) => {
                  const nextLiked = !prev;
                  if (nextLiked) {
                    setLikePulseKey((key) => key + 1);
                    const timestamp = Date.now();
                    setParticles(
                      Array.from({ length: 2 }, (_, index) => timestamp + index)
                    );
                  }
                  return nextLiked;
                });
              }}
            >
              <span className="like-heart-wrapper">
                {particles.map((particle, index) => (
                  <span
                    key={particle}
                    className="like-particle like-particle--heart"
                    style={{
                      top: `${-6 - index * 10}px`,
                      animationDelay: `${index * 40}ms`,
                    }}
                  />
                ))}
                <Heart
                  key={likePulseKey}
                  className={`w-4 h-4 transition-colors ${
                    isLiked ? 'like-heart--active' : 'text-black80'
                  }`}
                />
              </span>
              <span
                className={`text-sm font-boldFont ml-2 transition-colors ${
                  isLiked ? 'text-[#EF4444]' : 'text-black80'
                }`}
              >
                {likeCount}
              </span>
            </button>
            <button
              type="button"
              className="w-1/2 border border-white60 rounded-xl hover:bg-mainWhite transition-all duration-300 py-3 flex items-center justify-center cursor-pointer"
            >
              <Share2 className="w-4 h-4 text-black80" />
              <span className="text-sm font-boldFont text-black80 ml-2">
                공유하기
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
