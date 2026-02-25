import { ChevronRight } from 'lucide-react';
import { type OrderItem } from '../types/order';

interface Props {
  item: OrderItem;
  onSelect: (orderId: number) => void;
}

const DonationItem = ({ item, onSelect }: Props) => {
  const initial = item.title?.charAt(0) ?? '';

  return (
    <div className="self-stretch p-6 bg-white rounded-[32px] border border-white80 shadow inline-flex items-center gap-6">
      {/* initial 영역 복구 */}
      <div className="w-14 h-14 bg-[#EEF2FF] rounded-2xl flex justify-center items-center">
        <div className="text-solidBlue text-2xl font-boldFont">
          {initial}
        </div>
      </div>

      <div className="flex-1 flex flex-col gap-1">
        <div className="flex justify-between">
          <div className="px-2 py-0.5 bg-[#EEF2FF] rounded text-[#4F46E5] text-xs font-boldFont">
            {item.status === 'PAID' ? '결제완료' : '예약중'}
          </div>
          <div className="text-black40 text-xs">{item.date}</div>
        </div>

        <div className="text-mainBlack text-base font-boldFont">
          {item.title}
        </div>

        <div className="text-black60 text-sm font-boldFont">
          {item.amount.toLocaleString()}원
        </div>
      </div>

      <button
        onClick={() => onSelect(item.orderId)}
        className="text-white60 hover:text-black40 cursor-pointer transition"
      >
        <ChevronRight className="w-5 h-5" />
      </button>
    </div>
  );
};

export default DonationItem;
