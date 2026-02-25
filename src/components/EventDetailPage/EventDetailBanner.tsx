import type { EventData } from '../../api/eventAPI';
import detailBg from '../../assets/images/backgrounds/event_detail_bg.png';

interface EventDetailBannerProps {
  event: EventData;
  onPrev: () => void;
  hasPrev: boolean;
}

export default function EventDetailBanner({
  event,
  onPrev,
  hasPrev,
}: EventDetailBannerProps) {
  const formattedDate = new Date(event.date)
    .toLocaleDateString('ko-KR')
    .replace(/\.$/, '');
  return (
    <section className="relative w-full h-[285.2px]  px-[48px] pb-[48px] flex justify-center items-end self-stretch">
      <div className="absolute inset-0 z-0">
        <img src={detailBg} alt={event.title} />
      </div>
      {hasPrev && (
        <button
          onClick={onPrev}
          className="absolute z-10 left-[48px] top-[96px] w-[48px] h-[48px] p-[12px] flex items-center justify-center rounded-[9999px] bg-[rgba(178,178,178,0.40)] border border-white/20 backdrop-blur-[6px] transition-colors hover:bg-[rgba(178,178,178,0.60)]"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path
              d="M15 18L9 12L15 6"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      )}

      <div className=" z-10 w-[896px] max-w-[896px] h-[184px] flex flex-col items-start gap-[16px]">
        <div className="flex px-[16px] py-[6px] items-start rounded-full bg-black/30 backdrop-blur-[6px]">
          <span className="text-white font-boldFont text-[12px] leading-[16px] uppercase">
            {event.category}
          </span>
        </div>

        <h1 className=" z-10 w-full text-[#000000] font-blackFont text-[48px] leading-[48px] self-stretch">
          {event.title}
        </h1>

        <div className="w-full flex items-center gap-[8px] opacity-90 self-stretch">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
          >
            <path
              d="M6.6665 1.6665V4.99984"
              stroke="black"
              stroke-width="1.66667"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M13.3335 1.6665V4.99984"
              stroke="black"
              stroke-width="1.66667"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M15.8333 3.3335H4.16667C3.24619 3.3335 2.5 4.07969 2.5 5.00016V16.6668C2.5 17.5873 3.24619 18.3335 4.16667 18.3335H15.8333C16.7538 18.3335 17.5 17.5873 17.5 16.6668V5.00016C17.5 4.07969 16.7538 3.3335 15.8333 3.3335Z"
              stroke="black"
              stroke-width="1.66667"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M2.5 8.3335H17.5"
              stroke="black"
              stroke-width="1.66667"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
          <span className="z-10 text-[#000000] font-mainFont text-[18px] leading-[28px]">
            {formattedDate}
          </span>
        </div>
      </div>
    </section>
  );
}
