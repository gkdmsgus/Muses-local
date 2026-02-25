import { X } from 'lucide-react';
import { type OrderDetail } from '../types/order';

interface Props {
  item: OrderDetail;
  onClose: () => void;
}

const DetailDonationItem = ({ item, onClose }: Props) => {
  const formatDateTime = (iso: string) => {
    const d = new Date(iso);

    const date = d
      .toLocaleDateString('ko-KR', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
      })
      .replace(/\. /g, '.')
      .replace('.', '');

    const weekday = d.toLocaleDateString('ko-KR', {
      weekday: 'short',
    });

    const time = d.toLocaleTimeString('ko-KR', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    });

    return `${date} (${weekday}) ${time}`;
  };
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-[6px]">
      <div className="relative w-[672px] max-w-[672px] h-[607px] p-8 bg-white rounded-[32px] shadow-2xl flex flex-col items-center gap-3 overflow-hidden">
        {/* 헤더 */}
        <div className="self-stretch pb-4 border-b border-white80 flex justify-between items-center">
          <div className="text-mainBlack text-xl font-boldFont leading-7">
            응원 상세 정보
          </div>

          <button
            onClick={onClose}
            className="p-2 bg-white80 rounded-full transition hover:bg-white60 cursor-pointer"
          >
            <X size={20} />
          </button>
        </div>

        {/* 공연 정보 */}
        <div className="px-5 py-6 bg-stone-50 rounded-[32px] flex flex-col justify-start items-center gap-2.5">
          <div className="w-[531px] flex flex-col justify-start items-start gap-3">
            {/* 공연명 */}
            <div className="w-44 flex flex-col justify-start items-start">
              <div className="text-[#9198A7] text-sm font-boldFont leading-7">
                공연명
              </div>
              <div className="text-mainBlack text-base font-boldFont leading-7 whitespace-nowrap">
                {item.projectTitle}
              </div>
            </div>

            {/* 일시 / 장소 */}
            <div className="self-stretch inline-flex justify-start items-start gap-20">
              {/* 일시 */}
              <div className="w-52 flex flex-col gap-1 min-h-[56px]">
                <div className="text-[#9198A7] text-sm font-boldFont leading-7">
                  일시
                </div>
                <div className="text-mainBlack text-base font-boldFont leading-7 line-clamp-2">
                  {formatDateTime(item.opening)}
                </div>
              </div>

              {/* 장소 */}
              <div className="w-56 flex flex-col gap-1 min-h-[56px]">
                <div className="text-[#9198A7] text-sm font-boldFont leading-7">
                  장소
                </div>
                <div className="text-mainBlack text-base font-boldFont leading-7 line-clamp-2 break-words">
                  {item.locationDetail}
                </div>
              </div>
            </div>

            {/* 옵션 / 수량 */}
            <div className="self-stretch inline-flex justify-start items-start gap-20">
              {/* 옵션 */}
              <div className="w-52 flex flex-col justify-start items-start">
                <div className="text-[#9198A7] text-sm font-boldFont leading-7">
                  옵션
                </div>

                <div className="w-full inline-flex items-center gap-3">
                  <div className="text-mainBlack text-base font-boldFont leading-6">
                    {item.optionTitle}
                  </div>

                  <div className="flex-1 min-w-0 text-black60 text-sm font-mainFont leading-5 truncate">
                    {item.optionDescription}
                  </div>
                </div>
              </div>

              {/* 수량 */}
              <div className="w-56 flex flex-col justify-start items-start">
                <div className="text-[#9198A7] text-sm font-boldFont leading-7">
                  수량
                </div>
                <div className="text-mainBlack text-base font-mediumFont leading-6">
                  {item.quantity}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 결제 정보 */}
        <div className="px-5 py-3 border-b border-white80 flex flex-col justify-start items-start gap-1">
          <div className="w-[548px] flex justify-between items-center">
            <div className="text-[#9198A7] text-base font-mediumFont leading-7">
              결제일시
            </div>
            <div className="text-[#222] text-base font-mediumFont leading-7">
              {new Date(item.paidAt).toLocaleDateString('ko-KR')}
            </div>
          </div>

          <div className="w-[548px] flex justify-between items-center">
            <div className="text-[#9198A7] text-base font-mediumFont leading-7">
              결제수단
            </div>
            <div className="text-[#222] text-base font-mediumFont leading-7">
              {item.paymentProvider}
            </div>
          </div>
        </div>

        {/* 하단 */}
        <div className="flex flex-col justify-start items-center gap-6 w-full">
          <div className="w-[548px] flex justify-between items-center">
            <div className="text-black text-base font-boldFont leading-7">
              결제금액
            </div>
            <div className="text-[#645DE8] text-base font-boldFont leading-7">
              {Number(item.amount).toLocaleString()}원
            </div>
          </div>

          <button
            onClick={onClose}
            className="justify-center mt-10  mb-5  text-[#F00] text-base font-mainFont leading-7 cursor-pointer transition hover:underline"
          >
            결제 취소
          </button>
        </div>
      </div>
    </div>
  );
};

export default DetailDonationItem;
