import api from '../../../../api/axiosInstance';
import ENDPOINTS from '../../../../api/endpoints';
import type {
  Settlement,
  SettlementResponse,
} from '../../../../types/settlement';
import { useEffect, useState } from 'react';

interface SettlementTabProps {
  projectId?: number;
}

const SettlementTab = ({ projectId }: SettlementTabProps) => {
  const [settlement, setSettlement] = useState<Settlement | null>(null);

  useEffect(() => {
    if (!projectId) return;

    const fetchSettlement = async () => {
      try {
        const response = await api.get<SettlementResponse>(
          ENDPOINTS.CREATOR_PROJECT_SETTLEMENT(projectId)
        );

        if (!response.data.success) {
          console.error(response.data.error);
          return;
        }

        setSettlement(response.data.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchSettlement();
  }, [projectId]);

  return (
    <section className="w-[768px] p-8 bg-white rounded-2xl border border-white80 flex flex-col gap-6">
      {/* 제목 */}
      <header>
        <h2 className="text-[#1F2937] text-xl font-boldFont leading-7">정산</h2>
      </header>

      <dl className="w-[702px] flex flex-col gap-6">
        {/* 총 모금액 */}
        <div className="flex flex-col gap-2">
          <dt className="text-[#374151] text-sm font-mediumFont leading-5">
            총 모금액
          </dt>
          <dd className="h-14 px-4 bg-white rounded-xl border border-white60 flex items-center">
            <span className="text-black80 text-base font-mainFont leading-6">
              {settlement?.totalAmount?.toLocaleString() ?? '0'}원
            </span>
          </dd>
        </div>

        {/* 수수료 */}
        <div className="flex flex-col gap-2">
          <dt className="text-[#374151] text-sm font-mediumFont leading-5">
            수수료
          </dt>
          <dd className="h-14 px-4 bg-white rounded-xl border border-white60 flex items-center">
            <span className="text-black40 text-base font-mainFont leading-6">
              {settlement?.feeAmount?.toLocaleString() ?? '0'}원
            </span>
          </dd>
        </div>

        {/* 정산 예정액 */}
        <div className="flex flex-col gap-2">
          <dt className="text-[#374151] text-sm font-mediumFont leading-5">
            정산 예정액
          </dt>
          <dd className="h-14 px-4 bg-black rounded-xl flex items-center">
            <span className="text-[#F2F1F1] text-base font-mainFont leading-6">
              {settlement?.payoutAmount?.toLocaleString() ?? '0'}원
            </span>
          </dd>
        </div>
      </dl>
    </section>
  );
};

export default SettlementTab;
