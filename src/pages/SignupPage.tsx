import { useNavigate } from 'react-router-dom';
import { BackButton } from '../components/LoginPage/BackButton';
import { LoginHeader } from '../components/LoginPage/LoginHeader';
import SignupFormFields from '../components/SignupPage/SignupFormFields';
import SignupFooter from '../components/SignupPage/SignupFooter';
import loginBackground from '../assets/images/backgrounds/login_bg.png';

export default function SignupPage() {
  const navigate = useNavigate();

  return (
    <div
      className="w-full min-h-screen pt-24 flex justify-center bg-white bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: `url(${loginBackground})`,
      }}
    >
      <div className="w-[448px] flex flex-col gap-[24px]">
        <BackButton onClick={() => navigate(-1)} />

        <div className="w-full h-auto min-h-[697px] bg-white/80 border border-white rounded-[24px] shadow-[0px_25px_50px_-12px_rgba(0,0,0,0.25)] backdrop-blur-[20px] px-[33px] py-[26px]">
          <LoginHeader subtitle="새 계정을 만드세요" />

          <div className="mt-[26px] flex flex-col">
            <SignupFormFields />
          </div>

          <div className="mt-[21px]">
            <SignupFooter />
          </div>
        </div>
      </div>
    </div>
  );
}
