// QrCard.tsx
import { QRCodeSVG } from 'qrcode.react';

interface QrCardProps {
  title: string;
  seat: string;
  ticketToken: string;
  memberName: string;
  memberNick: string;
  onClose: () => void;
}

const QrCard = ({
  title,
  seat,
  ticketToken,
  memberName,
  memberNick,
  onClose,
}: QrCardProps) => {
  const checkinUrl = `https://gkdmsgus.github.io/Muses-/checkin/result?name=${encodeURIComponent('김*정')}&nick=${encodeURIComponent('푸른 오렌지')}&qty=1&reward=${encodeURIComponent('VIP 일반석')}`;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-[6px]">
      <div className="w-96 bg-white rounded-2xl overflow-hidden">
        {/* 상단 */}
        <div className="flex items-center w-96 h-32 bg-[#ff9a00] justify-center">
          <div className="self-stretch inline-flex flex-col justify-start items-start gap-2 p-6">
            <div className="self-stretch opacity-80 flex flex-col justify-start items-center">
              <div className="text-center justify-center text-white text-xs font-boldFont leading-4 tracking-[2.40px]">
                {seat}
              </div>
            </div>
            <div className="self-stretch flex flex-col justify-start items-center">
              <div className="text-center justify-center text-white text-2xl font-boldFont leading-8">
                {title}
              </div>
            </div>
          </div>
        </div>

        {/* QR */}
        <div className="w-96 p-8 bg-[linear-gradient(135deg,var(--color-grey-95,#F3E8FF)_0%,var(--color-grey-96,#F3E8FF)_50%,var(--color-yellow-88,#FEF9C3)_100%)] inline-flex flex-col justify-center items-center">
          <div className="pb-6 flex flex-col justify-start items-start">
            <div className="p-4 bg-white/80 rounded-[32px] border border-white/60 flex flex-col justify-center items-center min-h-[180px] min-w-[180px]">
              <QRCodeSVG value={checkinUrl} size={160} />
            </div>
          </div>
          <div className="self-stretch flex flex-col items-center gap-1">
            <div className="text-black40 text-[10px] font-boldFont leading-4 tracking-wide">
              TICKET ID
            </div>
            <div className="text-[#1F2937] text-[10px] font-boldFont leading-7 tracking-widest text-center">
              {ticketToken}
            </div>
          </div>
        </div>

        {/* 닫기 */}
        <div className="w-96 p-6 bg-white border-t border-dashed border-[#D1D5DB] inline-flex flex-col justify-start items-start">
          <button
            onClick={onClose}
            className="self-stretch py-3.5 bg-mainBlack rounded-xl shadow-lg inline-flex justify-center items-center overflow-hidden hover:bg-black cursor-pointer"
          >
            <div className="text-center justify-center text-white text-sm font-boldFont leading-5">
              닫기
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default QrCard;
