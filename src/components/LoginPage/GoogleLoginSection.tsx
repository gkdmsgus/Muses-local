import { AuthButton } from './AuthButton';
import { ENDPOINTS } from '../../api/endpoints';
import googleLogo from '../../assets/images/icons/google_logo.png';

export function GoogleLoginSection() {
  const handleGoogleLogin = () => {
    window.location.href = ENDPOINTS.AUTH.GOOGLE_LOGIN;
  };

  return (
    <div className="w-full max-w-[382px] h-[48px]">
      <AuthButton
        text="구글로 계속하기"
        variant="google"
        onClick={handleGoogleLogin}
        className="border-mainBlack font-semiBoldFont text-[16px] leading-[24px] cursor-pointer"
        iconClassName="left-[20px]"
        icon={
          <div className="w-[26px] h-[26px] flex items-center justify-center">
            <img
              src={googleLogo}
              alt="Google"
              className="w-full h-full object-contain"
            />
          </div>
        }
      />
    </div>
  );
}
