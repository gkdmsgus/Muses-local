import type { EventData } from '../../api/eventAPI';

interface EventDetailBodyProps {
  event: EventData;
  onGoToList: () => void;
}

export default function EventDetailBody({
  event,
  onGoToList,
}: EventDetailBodyProps) {
  return (
    <section className="mx-auto w-[768px] max-w-[768px] py-[48px] px-[24px] flex flex-col items-start gap-[64px] bg-white">
      <div className="flex flex-col items-start gap-[48px] self-stretch">
        <p className="self-stretch text-mainBlack font-boldFont text-[20px] leading-[28px]">
          {event.description}
        </p>

        <div
          className="self-stretch text-[#374151] font-mainFont text-[16px]"
          dangerouslySetInnerHTML={{ __html: event.content }}
        />
      </div>

      <div className="flex pt-[32px] justify-center items-start self-stretch border-t border-[#F3F4F6]">
        <button
          className="flex px-[32px] py-[12px] justify-center items-center rounded-full bg-[#F3F4F6] text-[#4B5563] font-boldFont text-[16px] leading-[24px] hover:bg-[#E5E7EB] transition-colors"
          onClick={onGoToList}
        >
          목록으로 돌아가기
        </button>
      </div>
    </section>
  );
}
