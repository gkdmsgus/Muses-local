import defaultProfileImg from '../../../../assets/images/profileimg.svg';

interface Props {
  profileImgUrl?: string;
}

const ProfileAvatar = ({ profileImgUrl }: Props) => {
   console.log('profileImgUrl:', profileImgUrl);  
  return (
    <div className="w-32 h-32 rounded-full flex items-center justify-center">
      <div className="w-full h-full bg-white rounded-full border border-white40 overflow-hidden flex items-center justify-center">
        <img
          src={ defaultProfileImg}
          alt="profile"
          className="object-cover"
        />
      </div>
    </div>
  );
};

export default ProfileAvatar;
