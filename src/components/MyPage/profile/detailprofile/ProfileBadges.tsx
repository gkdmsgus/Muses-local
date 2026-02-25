interface Props {
  isCreator: boolean;
  certifiedCreator? : string;
  supporterClass: string;
}

const ProfileBadges = ({ isCreator,certifiedCreator,supporterClass }: Props) => {
  return (
    <div className="flex gap-2 items-center">
      {isCreator && (
        <span className="px-3 py-1 bg-[#E9D5FF] rounded-full text-xs font-boldFont text-[#EA580C]">
          {certifiedCreator}
        </span>
      )}
      <span className="px-3 py-1 bg-[#EEF2FF] rounded-full text-xs font-boldFont text-[#4F46E5]">
        {supporterClass}
      </span>
    </div>
  );
};

export default ProfileBadges;
