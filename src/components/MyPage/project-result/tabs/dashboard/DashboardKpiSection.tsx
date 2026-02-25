import { Calendar, ThumbsUp, TrendingUp, Users } from "lucide-react";
import { KpiCard } from "./KpiCard";

interface Props {
  totalFunding: number;
  participantCount: number;
  likeCount: number;
  dday: number;
}

const DashboardKpiSection = ({
  totalFunding,
  participantCount,
  likeCount,
  dday,
}: Props) => {
  return (
    <div className="flex gap-4">
      <KpiCard
        title="총 모금액"
        value={totalFunding.toLocaleString()}
        subText="+12% vs 지난주"
        subTextColor="text-[#22C55E]"
        icon={<TrendingUp size={20}/>}
      />

      <KpiCard
        title="참여 메이커"
        value={participantCount.toString()}
        subText="+8명 오늘"
        subTextColor="text-[#3B82F6]"
        icon={<Users size={20}/>}
      />

      <KpiCard
        title="관심"
        value={likeCount.toString()}
        subText="전환율 41%"
        subTextColor="text-[#9333EA]"
        icon={<ThumbsUp size={20}/>}
      />

      <KpiCard
        title="남은 기간"
        value={`${dday}일`}
        subText="1월 10일 마감"
        subTextColor="text-[#F97316]"
        icon={<Calendar size={20}/>}
      />
    </div>
  );
};
export default DashboardKpiSection