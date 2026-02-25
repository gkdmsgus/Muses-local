import { useNavigate } from 'react-router-dom';

interface ProfileHeaderProps {
  name: string;
}

const ProfileHeader = ({name}: ProfileHeaderProps) => {
  const navigate = useNavigate();

  return (
    <div className="flex justify-between items-center">
      <div className="text-2xl font-boldFont text-mainBlack">
        {name}
      </div>
      <button
        type='button'
        onClick={() => navigate('/mypage/editprofile')}
        className="px-5 py-2 bg-black text-white rounded-full text-sm font-boldFont"
      >
        프로필 편집
      </button>
    </div>
  );
};

export default ProfileHeader;
