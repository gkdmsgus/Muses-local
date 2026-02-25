import { useState } from 'react';
import { AuthButton } from '../LoginPage/AuthButton';
import { checkEmailAPI, signupAPI, loginAPI } from '../../api/auth';
import { useNavigate } from 'react-router-dom';

const MailIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
  >
    <path
      d="M16.6666 3.33325H3.33329C2.41282 3.33325 1.66663 4.07944 1.66663 4.99992V14.9999C1.66663 15.9204 2.41282 16.6666 3.33329 16.6666H16.6666C17.5871 16.6666 18.3333 15.9204 18.3333 14.9999V4.99992C18.3333 4.07944 17.5871 3.33325 16.6666 3.33325Z"
      stroke="#9CA3AF"
      strokeWidth="1.66667"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M18.3333 5.83325L10.8583 10.5833C10.601 10.7444 10.3036 10.8299 9.99996 10.8299C9.69636 10.8299 9.3989 10.7444 9.14163 10.5833L1.66663 5.83325"
      stroke="#9CA3AF"
      strokeWidth="1.66667"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const LockIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
  >
    <path
      d="M9.99996 14.1667C10.4602 14.1667 10.8333 13.7936 10.8333 13.3333C10.8333 12.8731 10.4602 12.5 9.99996 12.5C9.53972 12.5 9.16663 12.8731 9.16663 13.3333C9.16663 13.7936 9.53972 14.1667 9.99996 14.1667Z"
      stroke="#9CA3AF"
      strokeWidth="1.66667"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M15.8333 8.33325H4.16667C3.24619 8.33325 2.5 9.07944 2.5 9.99992V16.6666C2.5 17.5871 3.24619 18.3333 4.16667 18.3333H15.8333C16.7538 18.3333 17.5 17.5871 17.5 16.6666V9.99992C17.5 9.07944 16.7538 8.33325 15.8333 8.33325Z"
      stroke="#9CA3AF"
      strokeWidth="1.66667"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M5.83337 8.33341V5.83341C5.83337 4.72835 6.27236 3.66854 7.05376 2.88714C7.83516 2.10573 8.89497 1.66675 10 1.66675C11.1051 1.66675 12.1649 2.10573 12.9463 2.88714C13.7277 3.66854 14.1667 4.72835 14.1667 5.83341V8.33341"
      stroke="#9CA3AF"
      strokeWidth="1.66667"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default function SignupFormFields() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const [isEmailChecked, setIsEmailChecked] = useState(false);

  const handleCheckEmail = async (e: React.MouseEvent) => {
    e.preventDefault();

    if (!formData.email) {
      alert('이메일을 입력해주세요.');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      alert('유효한 이메일 형식이 아닙니다.');
      return;
    }

    try {
      const response = await checkEmailAPI(formData.email);

      if (response.success && response.data === true) {
        alert('이미 사용 중인 이메일입니다.');
        setIsEmailChecked(false);
      } else {
        alert('사용 가능한 이메일입니다.');
        setIsEmailChecked(true);
      }
    } catch (error) {
      console.error('API 호출 자체 실패:', error);
    }
  };

  const handleSignup = async () => {
    const { name, email, password } = formData;

    if (!name.trim() || !email.trim() || !password.trim()) {
      alert('모든 항목을 정확히 입력해주세요.');
      return;
    }

    if (!isEmailChecked) {
      alert('이메일 중복 확인을 먼저 해주세요.');
      return;
    }

    try {
      const response = await signupAPI({
        name,
        email,
        password,
      });

      if (response.success) {
        const loginRes = await loginAPI({ email, password });

        if (loginRes.success) {
          localStorage.setItem('accessToken', loginRes.data.accessToken);
          localStorage.setItem('refreshToken', loginRes.data.refreshToken);

          alert('회원가입이 완료되었습니다!');
          navigate('/onboarding');
        }
      }
    } catch (error) {
      alert('회원가입 처리 중 오류가 발생했습니다.');
    }
  };

  return (
    <div className="w-[382px] h-auto flex flex-col gap-[12px] font-['Pretendard']">
      <div className="w-full flex flex-col gap-[8px]">
        <label className="text-[14px] font-[500] text-[#374151]">이름</label>
        <div className="relative w-full h-[53px]">
          <div className="absolute left-[12px] top-[15px]">
            <MailIcon />
          </div>
          <input
            type="text"
            placeholder="이름을 입력해주세요"
            className="w-full h-full px-[16px] pl-[40px] rounded-[12px] border border-[#D1D5DB] focus:outline-none"
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
        </div>
      </div>

      <div className="w-full flex flex-col gap-[8px]">
        <div className="flex justify-between items-center w-full h-[28px]">
          <label className="text-[14px] font-[500] text-[#374151]">
            이메일
          </label>
          <button
            type="button"
            onClick={handleCheckEmail}
            className="px-[8px] h-[20px] rounded-[5px] bg-[#E7E7E7] text-[10px] text-[#374151] font-medium"
          >
            중복확인
          </button>
        </div>
        <div className="relative w-full h-[53px]">
          <div className="absolute left-[12px] top-[15.5px]">
            <MailIcon />
          </div>
          <input
            type="email"
            value={formData.email}
            placeholder="example@muses.com"
            className="w-full h-full px-[16px] pl-[40px] rounded-[12px] border border-[#D1D5DB] focus:outline-none"
            onChange={(e) => {
              setFormData({ ...formData, email: e.target.value });
              setIsEmailChecked(false);
            }}
          />
        </div>
      </div>

      <div className="w-full flex flex-col gap-[8px] mb-[38px]">
        <label className="text-[14px] font-[500] text-[#374151]">
          비밀번호
        </label>
        <div className="relative w-full h-[53px]">
          <div className="absolute left-[9px] top-[14.5px]">
            <LockIcon />
          </div>
          <input
            type="password"
            placeholder="비밀번호를 입력해주세요"
            className="w-full h-full px-[16px] pl-[40px] rounded-[12px] border border-[#D1D5DB] focus:outline-none"
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
          />
        </div>
      </div>

      <AuthButton
        text="계속하기"
        variant="primary"
        className="flex-shrink-0 border-mainBlack font-semiBoldFont text-[16px] leading-[24px] cursor-pointer"
        onClick={handleSignup}
      />
    </div>
  );
}
