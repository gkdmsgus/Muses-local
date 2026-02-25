import type { Member } from '../types/apitypes/members';
import ProfileAvatar from './detailprofile/ProfileAvatar';
import ProfileBadges from './detailprofile/ProfileBadges';
import ProfileHeader from './detailprofile/ProfileHeader';
import ProfileIntro from './detailprofile/ProfileIntro';
import ProfileStats from './detailprofile/ProfileStats';

interface ProfileCardProps {
  isCreator: boolean;
  member: Member;
  ongoingProjectCount?: number;
}

export default function ProfileCard({
  isCreator,
  member,
  ongoingProjectCount,
}: ProfileCardProps) {
  return (
    <div className="h-64 p-8 bg-white rounded-[40px] shadow-[0_1px_2px_rgba(0,0,0,0.05)] border border-white80 flex gap-6">
      <ProfileAvatar profileImgUrl={member.profileImgUrl} />

      <div className="flex flex-col flex-1 h-full">
        <ProfileBadges
          isCreator={isCreator}
          certifiedCreator="인증된 크리에이터"
          supporterClass={`Lv${member.supportLevel} 열정적인 서포터`}
        />

        <ProfileHeader name={member.nickName} />

        <div className="flex-1">
          <ProfileIntro introduction={member.introduction} />
        </div>

        <ProfileStats
          isCreator={isCreator}
          ticketCount={member.ticketCount}
          supportCount={member.supportCount}
          ongoingProjectCount={ongoingProjectCount ?? 0}
        />
      </div>
    </div>
  );
}
