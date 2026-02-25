import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { X } from 'lucide-react';

export default function BillingFailPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [visible, setVisible] = useState(false);

  const errorMessage = searchParams.get('message');
  const errorCode = searchParams.get('code');

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 50);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-6 font-mainFont">
      <button
        type="button"
        aria-label="프로젝트 목록으로 이동"
        className="absolute inset-0 bg-black/40 backdrop-blur-xs"
        onClick={() => navigate('/projects')}
      />
      <div
        className={`relative w-full max-w-[560px] rounded-[48px] bg-white p-12 text-center flex flex-col items-center transition-all duration-500 ${
          visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        }`}
      >
        {/* X 아이콘 */}
        <div
          className={`flex items-center justify-center rounded-full bg-[#FEE2E2] w-24 h-24 mb-8 transition-transform duration-500 ${
            visible ? 'scale-100' : 'scale-75'
          }`}
        >
          <X className="w-12 h-12 text-[#EF4444]" />
        </div>

        <p className="text-4xl font-boldFont text-mainBlack mb-3">후원 실패</p>
        <p className="text-base text-black60 font-mediumFont mb-3">
          결제 오류로 후원을 실패했어요
        </p>
        {(errorMessage || errorCode) && (
          <p className="text-sm text-black40 font-mediumFont mb-10">
            {errorCode && `[${errorCode}] `}
            {errorMessage}
          </p>
        )}
        {!errorMessage && !errorCode && <div className="mb-10" />}

        <div className="flex flex-col gap-3 w-full">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="w-full h-14 rounded-xl bg-mainBlack text-mainWhite font-boldFont text-base cursor-pointer"
          >
            다시 시도하기
          </button>
          <button
            type="button"
            onClick={() => navigate('/projects')}
            className="w-full h-14 rounded-xl border border-[#D1D5DB] text-mainBlack font-boldFont text-base cursor-pointer"
          >
            프로젝트 목록 보기
          </button>
        </div>
      </div>
    </div>
  );
}
