interface ProfileStatProps {
  value: number;
  label: string;
  highlight?: boolean;
}

export default function ProfileStat({
  value,
  label,
  highlight,
}: ProfileStatProps) {
  return (
    <div className="inline-flex flex-col items-start">
      <div
        className={`text-lg font-boldFont leading-7 ${
          highlight ? 'text-[#EA580C]' : 'text-mainBlack'
        }`}
      >
        {value}
      </div>
      <div
  className={`text-xs leading-4 h-8 text-center ${
    highlight ? 'text-[#EA580C]' : 'text-black40'
  }`}
>
  {label}
</div>

    </div>
  );
}
