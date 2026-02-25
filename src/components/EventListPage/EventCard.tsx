import { useNavigate } from 'react-router-dom';
import type { EventData } from '../../api/eventAPI';
import { getEventThumbnail } from '../../utils/getEventThumbnail';
import DEFAULT_EVENT_IMAGE from '../../assets/images/icons/logo.png';

export default function EventCard({ event }: { event: EventData }) {
  const navigate = useNavigate();
  let thumbnail = getEventThumbnail(event.content);
  if (!thumbnail) {
    thumbnail = DEFAULT_EVENT_IMAGE;
  }

  // 카테고리별 색상/텍스트 매핑
  const categoryMap: Record<string, { label: string; color: string }> = {
    COLLAB: { label: 'Collaboration', color: 'bg-solidPink' },
    NOTICE: { label: 'Notice', color: 'bg-[#1F2937]' },
    MUSES: { label: 'Muses', color: 'bg-solidPurple' },
  };

  const categoryInfo = categoryMap[event.category] || {
    label: event.category,
    color: 'bg-gray-500',
  };
  const formatDate = (dateString: string) => {
    return new Date(dateString)
      .toLocaleDateString('ko-KR', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
      })
      .replace(/\. /g, '.')
      .replace(/\.$/, '');
  };
  return (
    <div>
      <div className="relative w-[848px] pt-[24px] pr-[24px] pb-[24px] pl-[240px] rounded-[40px] border border-[#F3F4F6] bg-white shadow-[0_1px_2px_0_rgba(0,0,0,0.05)] flex items-start">
        <div className="absolute left-[19.94px] top-[17.82px] w-[180px] h-[170px] bg-[#E5E7EB] rounded-[16px] overflow-hidden">
          <img
            src={thumbnail}
            alt={event.title}
            className="w-full h-full object-cover"
            onError={(e) => {
              const target = e.target as HTMLImageElement;

              if (target.src !== window.location.origin + DEFAULT_EVENT_IMAGE) {
                target.src = DEFAULT_EVENT_IMAGE;
              }
            }}
          />
        </div>

        {/* 글자 영역*/}
        <div className="flex-1 h-[159.75px] py-[8px] pr-[16px] pl-0 flex flex-col justify-center items-start">
          {/* 카테고리 + 날짜 */}
          <div className="w-full pb-[12px] flex items-center gap-[8px]">
            <span
              className={`${categoryInfo.color} text-white text-[10px] font-bold leading-[15px] px-[12px] py-[4px] rounded-full uppercase`}
            >
              {categoryInfo.label}
            </span>
            <span className="text-[#9CA3AF] text-[12px] font-medium leading-[16px]">
              {formatDate(event.date)}
            </span>
          </div>

          {/* 타이틀 */}
          <h3 className="w-full pb-[12px] text-[#000000] text-[24px] font-boldFont leading-[30px]">
            {event.title}
          </h3>

          {/* 디스크립션 */}
          <p className="w-full text-[#6B7280] text-[14px] font-mainFont leading-normal line-clamp-1">
            {event.description}
          </p>

          {/* 자세히 보기 버튼 */}
          <button
            onClick={() => navigate(`/events/${event.eventId}`)}
            className="pt-[24px] flex items-center gap-0 text-[#4F46E5] text-[14px] font-boldFont leading-[20px] group cursor-pointer"
          >
            자세히 보기
            <div className="pl-[4px] w-[20px] h-[16px] flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
              >
                <path
                  d="M6 12L10 8L6 4"
                  stroke="#4F46E5"
                  strokeWidth="1.33333"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}
