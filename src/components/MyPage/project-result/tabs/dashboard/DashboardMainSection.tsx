import type { AgeRatio, GenderRatio, RewardSale } from "../../../types/project";
import { MakerAnalyticsCard, RewardStatusCard } from "./DashboardCard";

interface Props {
  rewardSales: RewardSale[];
  genderRatio: GenderRatio;
  ageRatio: AgeRatio;
}

const DashboardMainSection = ({
  rewardSales,
  genderRatio,
  ageRatio,
}: Props) => {
  return (
    <div className="self-stretch inline-flex gap-6">
      <RewardStatusCard rewardSales={rewardSales} />
      <MakerAnalyticsCard
        genderRatio={genderRatio}
        ageRatio={ageRatio}
      />
    </div>
  );
};


export default DashboardMainSection;
