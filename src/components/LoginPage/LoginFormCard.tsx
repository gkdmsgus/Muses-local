import { BackButton } from './BackButton';
import { LoginHeader } from './LoginHeader';
import { LoginFormFields } from './LoginFormFields';
import { SocialLoginSection } from './SocialLoginSection';
import { GoogleLoginSection } from './GoogleLoginSection';
import { LoginFooter } from './LoginFooter';

export function LoginFormCard() {
  return (
    <div className="flex flex-col items-center justify-center p-4 font-mainFont min-h-screen">
      <div className="w-[448px] flex flex-col gap-[24px]">
        <BackButton onClick={() => window.history.back()} />

        <div className="w-full h-[638px] bg-white/80 border border-white rounded-[24px] shadow-[0_25px_50px_-12px_rgba(0,0,0,0.25)] backdrop-blur-[20px] overflow-hidden">
          <div className="flex flex-col h-full pt-[33px] px-[33px] pb-[33px]">
            <div className="w-full">
              <LoginHeader subtitle="계정에 로그인하세요" />
            </div>

            <div className="mt-[26px] w-full">
              <LoginFormFields />
            </div>

            <div className="mt-[24px]">
              <SocialLoginSection />
            </div>

            <div className="mt-[12.5px]">
              <GoogleLoginSection />
            </div>

            <div className="mt-auto">
              <LoginFooter />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
