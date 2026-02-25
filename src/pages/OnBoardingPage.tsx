import React, { useState } from 'react'; // useState 추가
import { useNavigate } from 'react-router-dom';
import { BackButton } from '../components/LoginPage/BackButton';
import { LoginHeader } from '../components/LoginPage/LoginHeader';
import { AuthButton } from '../components/LoginPage/AuthButton';
import ProfileImageUpload from '../components/OnBoardingPage/ProfileImageUpload';
import OnboardingFormFields from '../components/OnBoardingPage/OnboardingFormFields';
import { createProfileAPI } from '../api/auth';

interface OnboardingFormData {
  nickName: string;
  introduction: string;
  birthday: string;
  gender: string;
}

const OnBoardingPage: React.FC = () => {
  const navigate = useNavigate();

  const [profileImage, setProfileImage] = useState<File | null>(null);

  const [formData, setFormData] = useState<OnboardingFormData>({
    nickName: '',
    introduction: '',
    birthday: '',
    gender: '여자',
  });

  const handleFinalSignup = async () => {
    if (!formData.nickName.trim() || !formData.birthday.trim()) {
      alert('닉네임과 생년월일은 필수입니다.');
      return;
    }

    try {
      const submitData = {
        nickName: formData.nickName,
        introduction: formData.introduction,
        birthday: formData.birthday,
        profileImage: profileImage,
        gender: formData.gender === '남자' ? 0 : 1,
      };

      const response = await createProfileAPI(submitData);

      if (response.success) {
        alert('프로필 생성이 완료되었습니다!');

        if (response.data?.accessToken) {
          localStorage.setItem('accessToken', response.data.accessToken);
          localStorage.setItem('refreshToken', response.data.refreshToken);
        }

        navigate('/');
      }
    } catch (error: any) {
      console.error('Signup Error:', error);
      alert(error.response?.data?.error?.message || '오류가 발생했습니다.');
    }
  };

  return (
    <div
      className="min-h-screen w-full flex flex-col items-center justify-center bg-white bg-cover bg-center bg-no-repeat py-12"
      style={{
        backgroundImage: 'url("src/assets/images/backgrounds/login_bg.png")',
      }}
    >
      <div className="w-[448px] pt-11 flex flex-col gap-[24px]">
        <BackButton onClick={() => navigate(-1)} />

        <div className="w-full h-[732px] bg-white/80 border border-white rounded-[24px] shadow-[0px_25px_50px_-12px_rgba(0,0,0,0.4)] backdrop-blur-[20px] px-[33px] pt-[33px] flex flex-col relative overflow-hidden">
          <div className="w-[382px] h-[218px] flex flex-col items-center gap-[12px] mx-auto shrink-0">
            <div className="w-[382px] h-[78px] shrink-0">
              <LoginHeader subtitle="프로필을 만드세요" />
            </div>

            <div className="w-[128px] h-[128px] shrink-0">
              <ProfileImageUpload onImageChange={setProfileImage} />
            </div>
          </div>

          <div className="w-[382px] h-[426px] flex flex-col gap-[110px] mx-auto mt-[20px] shrink-0">
            <div className="shrink-0">
              <OnboardingFormFields
                values={formData}
                onChange={(newData) =>
                  setFormData((prev) => ({ ...prev, ...newData }))
                }
              />
            </div>

            <AuthButton
              text="회원가입"
              variant="primary"
              className="h-[48px] shrink-0"
              onClick={handleFinalSignup}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default OnBoardingPage;
