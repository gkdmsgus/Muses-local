import { useEffect, useState } from 'react';
import { Check, FilePlus2, MoveLeft, MoveRight } from 'lucide-react';
import ENDPOINTS from '../../../../api/endpoints';
import api from '../../../../api/axiosInstance';
import type { Makers, MakersResponse } from '../../../../types/makers';

const headers = [
  { label: '닉네임', w: 'w-16' },
  { label: '이름', w: 'w-16' },
  { label: '전화번호', w: 'w-24' },
  { label: '이메일', w: 'w-28' },
  { label: '수량', w: 'w-10' },
  { label: '리워드', w: 'w-24' },
  { label: 'QR 현황', w: 'w-24' },
];

interface MakersTabProps {
  projectId?: number;
}

const getQrUI = (status: Makers['qrStatus']) => {
  switch (status) {
    case 'ACTIVE':
      return {
        displayText: '활성화',
        pillClass: 'bg-mainBlack text-mainWhite',
        circleClass: 'bg-mainWhite text-mainBlack',
        isNone: false,
        showCheck: true,
      };

    case 'INACTIVE':
      return {
        displayText: '비활성화',
        pillClass: 'bg-white80 text-mainBlack',
        circleClass: 'bg-mainBlack text-mainWhite',
        isNone: false,
        showCheck: true,
      };

    case 'NONE':
    default:
      return {
        displayText: '해당 없음',
        pillClass: 'bg-white60 text-black40',
        circleClass: '',
        isNone: true,
        showCheck: false,
      };
  }
};

const MakersTab = ({ projectId }: MakersTabProps) => {
  const [makers, setMakers] = useState<Makers[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const pageSize = 20;
  const totalPages = Math.ceil(makers.length / pageSize);

  const pagedMakers = makers.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const fetchMakers = async () => {
    if (!projectId) {
      setError('프로젝트 ID가 없습니다.');
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const response = await api.get<MakersResponse>(
        ENDPOINTS.CREATOR_PROJECT_MAKERS(projectId)
      );

      const items = response.data?.data?.items ?? [];
      setMakers(Array.isArray(items) ? items : []);
      setCurrentPage(1); // 프로젝트 변경 시 페이지 초기화
    } catch (err) {
      console.error('메이커 명단 로딩 실패:', err);
      setError(
        err instanceof Error
          ? err.message
          : '메이커 명단을 불러오는데 실패했습니다.'
      );
      setMakers([]);
    } finally {
      setLoading(false);
    }
  };

  const toggleQrStatus = async (
    memberId: number,
    orderId: number,
    currentStatus: Makers['qrStatus']
  ) => {
    if (currentStatus === 'NONE') return;
    if (!projectId) return;

    const nextStatus = currentStatus === 'ACTIVE' ? 'INACTIVE' : 'ACTIVE';

    try {
      const response = await api.post(
        ENDPOINTS.CREATOR_PROJECT_MAKER_QR_STATUS(
          projectId,
          orderId,
          currentStatus // ← 여기 중요
        )
      );

      if (!response.data.success) {
        throw new Error(response.data.error?.message ?? 'QR 상태 변경 실패');
      }

      setMakers((prev) =>
        prev.map((maker) =>
          maker.memberId === memberId && maker.orderId === orderId
            ? { ...maker, qrStatus: nextStatus }
            : maker
        )
      );
    } catch (error: any) {
      console.error(error);
      alert(error.message ?? 'QR 상태 변경 실패');
    }
  };

  useEffect(() => {
    fetchMakers();
  }, [projectId]);

  if (loading) {
    return (
      <div className="w-fit p-8 bg-white rounded-2xl shadow-sm border border-white80 flex flex-col items-center justify-center gap-6 min-h-[400px]">
        <div className="text-black60 text-lg">메이커 명단을 불러오는 중...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-fit p-8 bg-white rounded-2xl shadow-sm border border-white80 flex flex-col items-center justify-center gap-6 min-h-[400px]">
        <div className="text-[#EF4444] text-lg">{error}</div>
      </div>
    );
  }

  return (
    <div className="w-fit p-8 bg-white rounded-2xl shadow-sm border border-white80 flex flex-col items-center gap-6">
      {/* header */}
      <div className="w-[702px] flex justify-between items-center">
        <div className="text-xl font-boldFont leading-7">메이커 명단</div>
        <div className="px-2.5 py-[4.8px] bg-black text-white font-mainFont text-[9.6px] rounded-[4.8px] flex items-center gap-1">
          <FilePlus2 size={12} />
          다운받기
        </div>
      </div>

      {/* table */}
      <div className="flex flex-col gap-2">
        {/* header row */}
        <div className="flex gap-11 mb-2">
          {headers.map((h) => (
            <div
              key={h.label}
              className={`${h.w} text-center text-black text-[12px] font-boldFont leading-4`}
            >
              {h.label}
            </div>
          ))}
        </div>

        {/* body rows */}
        {pagedMakers.map((maker) => {
          const { displayText, pillClass, circleClass, isNone, showCheck } =
            getQrUI(maker.qrStatus);

          return (
            <div key={maker.orderId} className="flex gap-11 items-center">
              <div className="w-16 font-mainFont text-center text-black text-[12px]">
                {maker.nickname ?? '-'}
              </div>
              <div className="w-16 text-center font-mainFont text-black text-[12px]">
                {maker.name}
              </div>
              <div className="w-24 text-center font-mainFont text-black text-[12px]">
                {maker.phone ?? '-'}
              </div>
              <div className="w-28 text-center font-mainFont text-black text-[12px]">
                {maker.email ?? '-'}
              </div>
              <div className="w-10 text-center font-mainFont text-black text-[12px]">
                {maker.quantity}
              </div>
              <div className="w-24 text-center font-mainFont text-black text-[12px]">
                {maker.rewardName}
              </div>
              <div className="w-24 flex items-center justify-center">
                <button
                  type="button"
                  disabled={isNone}
                  className={`cursor-pointer h-6 w-[80px] flex items-center rounded-full gap-2 text-[9px] ${pillClass}`}
                  onClick={() =>
                    toggleQrStatus(
                      maker.memberId,
                      maker.orderId,
                      maker.qrStatus
                    )
                  }
                >
                  {showCheck && (
                    <span
                      className={`w-3.5 h-3.5 ml-3 rounded-full flex items-center justify-center ${circleClass}`}
                    >
                      <Check className="w-3 h-3" />
                    </span>
                  )}
                  <span>{displayText}</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* pagination */}
      <div className="flex items-center gap-2">
        <button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          className="w-6 h-6 rounded-full border border-white60 flex items-center justify-center cursor-pointer"
        >
          <MoveLeft size={8} />
        </button>

        {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
          <div
            key={n}
            onClick={() => setCurrentPage(n)}
            className={`w-6 h-6 rounded-full border flex items-center justify-center text-[10px] font-boldFont cursor-pointer
              ${
                n === currentPage
                  ? 'bg-mainBlack text-white border-mainBlack'
                  : 'border-white60 text-black'
              }
            `}
          >
            {n}
          </div>
        ))}

        <button
          disabled={currentPage === totalPages || totalPages === 0}
          onClick={() =>
            setCurrentPage((prev) => Math.min(prev + 1, totalPages))
          }
          className="w-6 h-6 border border-white60 text-black rounded-full flex items-center justify-center cursor-pointer"
        >
          <MoveRight size={8} />
        </button>
      </div>
    </div>
  );
};

export default MakersTab;
