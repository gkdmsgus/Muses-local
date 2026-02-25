import ProfileStat from '../ProfileStat';

interface Props {
  isCreator: boolean;
  ticketCount: number;
  supportCount: number;
  ongoingProjectCount: number;
}

const ProfileStats = ({
  isCreator,
  ticketCount,
  supportCount,
  ongoingProjectCount,
}: Props) => {
  return (
    <div className="flex items-center gap-4 font-mainFont">
      <ProfileStat value={ticketCount} label="보유 티켓" />
      <div className="w-px h-8 bg-white60" />
      <ProfileStat value={supportCount} label="후원 참여" />

      {isCreator && (
        <>
          <div className="w-px h-8 bg-white60 font-mainFont" />
          <ProfileStat
            value={ongoingProjectCount}
            label="내 프로젝트"
            highlight
          />
        </>
      )}
    </div>
  );
};

export default ProfileStats;
