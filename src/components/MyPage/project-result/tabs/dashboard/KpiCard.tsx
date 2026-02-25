interface KpiCardProps {
  title: string;
  value: string;
  subText: string;
  subTextColor: string;
  icon: React.ReactNode;
}

export const KpiCard = ({
  title,
  value,
  subText,
  subTextColor,
  icon,
}: KpiCardProps) => {
  return (
    <div className="flex-1 rounded-2xl bg-white p-6 shadow border border-white80">
      <div className="flex justify-between items-start">
        <span className="text-sm text-black80 font-mainFont">{title}</span>
        <span className={`${subTextColor}`}>{icon}</span>
      </div>

      <div className="mt-4 text-3xl font-boldFont text-mainBlack">
        {value}
      </div>

      <div className={`mt-2 text-sm font-mainFont ${subTextColor}`}>
        {subText}
      </div>
    </div>
  );
};
