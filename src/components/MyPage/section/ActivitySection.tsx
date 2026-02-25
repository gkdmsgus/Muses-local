interface ActivitySectionProps {
  title: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
}

const ActivitySection = ({ title, icon, children }: ActivitySectionProps) => {
  return (
    <div className="flex flex-col gap-[24px]">
      <div className="font-semibold inline-flex items-center">
        {icon && <span className="mr-2">{icon}</span>}
        <div className="justify-center text-[#1F2937] text-xl font-boldFont leading-7">
          {title}
        </div>
      </div>
      {children}
    </div>
  );
};

export default ActivitySection;
