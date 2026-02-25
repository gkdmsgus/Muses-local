// TicketItemCard.tsx
import { QrCode } from 'lucide-react';
import type { TicketItem } from '../types/ticket';

interface Props {
  item: TicketItem;
  onSelect: (ticketId: string) => void;
}
const TicketItemCard = ({ item, onSelect }: Props) => {
  return (
    <div
  className={`flex-shrink-0 w-[320px] p-6 relative 
  ${item.bgClassName} 
  rounded-[32px] shadow-xl flex flex-col`}
>

      {/* 디자인 QR */}
      <div className="absolute top-6 right-6 opacity-20 pointer-events-none">
        <QrCode className="text-white" size={96} />
      </div>

      {/* 상단 영역 */}
      <div className="flex flex-col gap-2 ">
        <div className="text-white/60 text-xs font-mainFont">
          #{item.ticketId}
        </div>

        <div className="text-white text-xl font-boldFont leading-7 break-words">
          {item.title}
        </div>

        <div className="text-white/80 text-sm font-mainFont">{item.date}</div>
      </div>

      {/* 하단 영역 */}
      <div className="flex justify-between items-end mt-auto pt-6">

        <div className="px-3 py-1 bg-white/20 rounded-lg backdrop-blur-sm text-white text-xs font-mainFont">
          {item.seatLabel}
        </div>

        <button
          type="button"
          className="px-4 py-2 bg-white rounded-full duration-100 transition-transform  hover:scale-105 text-black text-xs font-boldFont"
          onClick={() => onSelect(item.ticketId)}
        >
          QR 보기
        </button>
      </div>
    </div>
  );
};

export default TicketItemCard;
