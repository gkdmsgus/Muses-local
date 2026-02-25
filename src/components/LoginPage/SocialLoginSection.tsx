import { AuthButton } from './AuthButton';
import kakaoLogo from '../../assets/images/icons/kakao_logo.png';
import { ENDPOINTS } from '../../api/endpoints';

export function SocialLoginSection() {
  const handleKakaoLogin = () => {
    window.location.href = ENDPOINTS.AUTH.KAKAO_LOGIN;
  };
  return (
    <div className="w-full max-w-[382px] flex flex-col gap-[24px]">
      <div className="relative w-full h-[20px] flex items-center justify-center">
        <div className="absolute w-full h-px bg-[#C3C5C8]" />

        <div className="relative bg-white px-[16px] flex items-center h-full">
          <span className="text-black60 font-normal text-[14px] leading-[20px] font-mainFont">
            또는
          </span>
        </div>
      </div>

      <AuthButton
        text="카카오로 계속하기"
        variant="kakao"
        onClick={handleKakaoLogin}
        className="border-mainBlack font-semiBoldFont text-[16px] leading-[24px] cursor-pointer"
        iconClassName="left-[20px]"
        icon={
          <div className="w-[28px] h-[28px] rounded-[23px] overflow-hidden">
            <img
              src={kakaoLogo}
              alt="Kakao"
              className="w-full h-full object-cover"
            />
          </div>
        }
      />
    </div>
  );
}
