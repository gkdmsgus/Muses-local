import { useEffect, useState } from 'react';
import type { ProjectDetailData } from '../../types/projectDetails';
import fallbackPoster from '../../assets/images/fallbackPoster.png';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import {
  formatDeadlineDisplay,
  formatOpenDateTime,
  isFutureOpen,
} from '../../utils/date';

export interface ProjectMainProps {
  detail: ProjectDetailData;
}

export default function ProjectMain({ detail }: ProjectMainProps) {
  const posterCandidates = [
    detail.thumbnailUrl,
    ...detail.attachments.map((file) => file.fileUrl),
  ].filter((value): value is string => Boolean(value));
  const posters =
    posterCandidates.length > 0 ? posterCandidates : [fallbackPoster];
  const [posterIndex, setPosterIndex] = useState(0);

  useEffect(() => {
    setPosterIndex(0);
  }, [detail.projectId]);

  const openDateLabel = detail.opening
    ? formatOpenDateTime(detail.opening)
    : '';
  const isOpenFuture = detail.opening ? isFutureOpen(detail.opening) : false;

  const deadlineLabel = detail.deadline
    ? isOpenFuture
      ? '오픈예정'
      : formatDeadlineDisplay(detail.deadline)
    : '';

  const hasPrev = posterIndex > 0;
  const hasNext = posterIndex < posters.length - 1;
  const prevIndex = hasPrev ? posterIndex - 1 : 0;
  const nextIndex = hasNext ? posterIndex + 1 : posters.length - 1;
  const currentPoster = posters[posterIndex];

  return (
    <div className="w-full max-w-[1247px] pt-20 px-4 flex flex-col items-center font-mainFont mb-12">
      {/* 프로젝트 카드 */}
      <div className="relative w-full flex items-center justify-center mb-[30px]">
        {posters.length > 1 && (
          <button
            type="button"
            aria-label="이전 포스터"
            className={`absolute left-1/2 top-1/2 -translate-y-1/2 -translate-x-[290px] z-20 w-14 h-14 rounded-full bg-white80/50 text-black80 flex items-center justify-center shadow ${hasPrev ? 'cursor-pointer' : 'opacity-40 cursor-default'}`}
            disabled={!hasPrev}
            onClick={() => {
              if (!hasPrev) return;
              setPosterIndex((prev) => Math.max(0, prev - 1));
            }}
          >
            <ChevronLeft className="w-8 h-8 text-white" />
          </button>
        )}
        {posters.length > 1 && (
          <>
            {hasPrev && (
              <div
                className="absolute z-0 left-1/2 -translate-x-[340px] w-[290px] h-[460px] rounded-3xl shadow-md overflow-hidden bg-cover bg-center opacity-70"
                style={{ backgroundImage: `url(${posters[prevIndex]})` }}
              >
                <div className="absolute inset-0 backdrop-blur-sm" />
              </div>
            )}
            {hasNext && (
              <div
                className="absolute z-0 left-1/2 translate-x-[50px] w-[290px] h-[460px] rounded-3xl shadow-md overflow-hidden bg-cover bg-center opacity-70"
                style={{ backgroundImage: `url(${posters[nextIndex]})` }}
              >
                <div className="absolute inset-0 backdrop-blur-sm" />
              </div>
            )}
          </>
        )}
        <div className="relative z-10 w-[416px] h-[564px]">
          <div
            className="absolute inset-0 rounded-3xl shadow-2xl bg-cover bg-center"
            style={{ backgroundImage: `url(${currentPoster})` }}
          />
        </div>
        {posters.length > 1 && (
          <button
            type="button"
            aria-label="다음 포스터"
            className={`absolute left-1/2 top-1/2 -translate-y-1/2 translate-x-[230px] z-20 w-14 h-14 rounded-full bg-white80/50 text-black80 flex items-center justify-center shadow ${hasNext ? 'cursor-pointer' : 'opacity-40 cursor-default'}`}
            disabled={!hasNext}
            onClick={() => {
              if (!hasNext) return;
              setPosterIndex((prev) => Math.min(posters.length - 1, prev + 1));
            }}
          >
            <ChevronRight className="w-8 h-8 text-white" />
          </button>
        )}
      </div>
      {/* 프로젝트 태그 */}
      <div className="flex flex-wrap justify-center gap-2 mb-5 z-10">
        {detail.tags.map((tag) => (
          <span
            key={tag}
            className="text-xs text-black80 bg-white/40 px-4 py-1 rounded-full border border-white/30 font-boldFont shadow-xs"
          >
            #{tag}
          </span>
        ))}
      </div>

      {/* 프로젝트 제목 */}
      <h1 className="text-[48px] font-blackFont text-mainBlack text-center mb-4">
        {detail.title}
      </h1>
      {detail.description && (
        <p className="text-lg text-black80 text-center font-mediumFont">
          {detail.description}
        </p>
      )}
      {/* 프로젝트 달성율 박스 */}
      <div className="w-full max-w-[720px] bg-white rounded-[32px] shadow-2xl p-8 mt-10 progress-box">
        <div className="flex items-end justify-between mb-3">
          <div className="flex items-baseline gap-2">
            <span className="text-[36px] font-blackFont text-mainBlack leading-none">
              {detail.achieveRate}%
            </span>
            <span className="text-sm font-boldFont text-black60">달성</span>
          </div>
          {deadlineLabel && (
            <span
              className={
                isOpenFuture
                  ? 'text-xl font-blackFont text-mainBlack'
                  : 'text-2xl font-blackFont text-[#EF4444]'
              }
            >
              {deadlineLabel}
            </span>
          )}
        </div>
        <div className="w-full h-4 bg-white60 rounded-full overflow-hidden mb-6">
          <div
            key={detail.projectId}
            className="h-full rounded-full animate-progress-slide"
            style={{
              width: 'var(--progress-width)',
              background: 'linear-gradient(to right, #6366F1, #A855F7)',
              ['--progress-width' as string]: `${Math.min(
                detail.achieveRate,
                100
              )}%`,
            }}
          />
        </div>
        <div className="flex items-center justify-between text-sm text-black60 border-t border-white80 pt-2">
          <div className="flex items-center gap-3">
            <div className="flex items-center">
              <span className="w-8 h-8 rounded-full bg-solidBlue border-2 border-white" />
              <span className="-ml-1.5 w-8 h-8 rounded-full bg-solidPurple border-2 border-white" />
              <span className="-ml-1.5 w-8 h-8 rounded-full bg-solidPink border-2 border-white" />
            </div>
            <span className="text-mainBlack font-boldFont pt-1">
              <span className="text-solidBlue font-blackFont">
                {detail.supporterCount}명의 메이커
              </span>
              가 함께해요
            </span>
          </div>
          <span className="text-xs text-black40 font-mediumFont pt-1">
            {openDateLabel}
          </span>
        </div>
      </div>
    </div>
  );
}
