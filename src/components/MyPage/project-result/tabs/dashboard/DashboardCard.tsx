import { Target, Users } from 'lucide-react';
import type { AgeRatio, GenderRatio, RewardSale } from '../../../types/project';

interface RewardStatusCardProps {
  rewardSales: RewardSale[];
}
interface MakerAnalyticsCardProps {
  genderRatio: GenderRatio;
  ageRatio: AgeRatio;
}
export const RewardStatusCard = ({ rewardSales }: RewardStatusCardProps) => {
  const totalSold = rewardSales.reduce((sum, r) => sum + r.soldQuantity, 0);
  return (
    <div className="flex-1 p-6 bg-white rounded-2xl shadow border border-white80">
      <div className="w-[554px] inline-flex justify-between items-center mb-7">
        <div className="text-[#1F2937] text-lg font-boldFont leading-7">
          리워드 판매 현황
        </div>
        <Target size={20} className="text-black40" />
      </div>

      <div className="w-[554px] flex flex-col gap-4">
        {rewardSales.map((r) => {
          const percent =
            totalSold === 0 ? 0 : (r.soldQuantity / totalSold) * 100;

          return (
            <div key={r.rewardId} className="self-stretch h-14 relative">
              <div className="w-[554px] left-0 top-0 absolute inline-flex justify-between items-center">
                <div className="text-[#374151] text-sm font-mediumFont">
                  {r.rewardName}
                </div>
                <div className="text-black80 text-sm font-mainFont">
                  {r.soldQuantity}개
                </div>
              </div>

              <div className="w-[554px] h-3 left-0 top-[28px] absolute bg-white80 rounded-full overflow-hidden">
                <div
                  className="h-3 bg-gradient-to-r from-[#4ADE80] to-[#16A34A] rounded-full"
                  style={{ width: `${percent}%` }}
                />
              </div>

              <div className="w-[554px] left-0 top-[44px] absolute text-black60 text-xs font-mainFont">
                {r.revenue.toLocaleString()}원
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export const MakerAnalyticsCard = ({
  genderRatio,
  ageRatio,
}: MakerAnalyticsCardProps) => {
  return (
    <div className="flex-1 p-6 bg-white rounded-2xl shadow border border-white80">
      <div className="w-[554px] inline-flex justify-between items-center mb-7">
        <div className="text-[#1F2937] text-lg font-boldFont leading-7">
          참여 메이커 분석
        </div>
        <Users size={20} className="text-black40" />
      </div>

      <div className="w-[554px] flex flex-col gap-6">
        {/* 성별 */}
        <div className="flex flex-col gap-3">
          <div className="text-[#374151] text-sm font-mediumFont">성별</div>

          <div className="inline-flex">
            <div className="w-72 p-3 bg-[#DCFCE7] rounded-lg flex flex-col items-center">
              <div className="text-[#2563EB] text-2xl font-boldFont">
                {genderRatio.male}%
              </div>
              <div className="text-black80 text-xs font-mainFont">남성</div>
            </div>

            <div className="w-72 pl-2">
              <div className="p-3 bg-[#F3E8FF] rounded-lg flex flex-col items-center">
                <div className="text-[#DB2777] text-2xl font-boldFont">
                  {genderRatio.female}%
                </div>
                <div className="text-black80 text-xs font-mainFont">여성</div>
              </div>
            </div>
          </div>
        </div>

        {/* 연령 */}
        <div className="flex flex-col gap-3">
          <div className="text-[#374151] text-sm font-mediumFont">연령대</div>

          <div className="inline-flex gap-2">
            {(['20s', '30s', '40s', '50s+'] as const).map((age) => (
              <div
                key={age}
                className="flex-1 p-2 bg-[#F8F9FC] rounded-lg flex flex-col items-center"
              >
                <div className="text-[#9333EA] text-lg font-boldFont">
                  {ageRatio[age]}%
                </div>
                <div className="text-black80 text-xs font-boldFont">{age}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
