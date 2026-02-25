import { useState } from 'react';
import { AuthButton } from './AuthButton';
import { loginAPI } from '../../api/auth';
import { useNavigate } from 'react-router-dom';

export function LoginFormFields() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!email || !password) {
      alert('이메일과 비밀번호를 모두 입력해주세요.');
      return;
    }

    try {
      const response = await loginAPI({ email, password });

      if (response.success) {
        localStorage.setItem('accessToken', response.data.accessToken);
        localStorage.setItem('role', response.data.role);
        alert(`${response.data.name}님 환영합니다!`);
        navigate('/');
        window.location.reload();
      } else {
        alert(response.error?.message || '로그인에 실패했습니다.');
      }
    } catch (error: any) {
      console.error(error);
      alert('서버 통신 중 오류가 발생했습니다.');
    }
  };
  return (
    <div className="w-full max-w-[382px] flex flex-col gap-[16px]">
      <div className="flex flex-col items-start gap-[8px] self-stretch">
        <label className="text-black80 font-mediumFont text-[14px] leading-[20px] self-stretch">
          이메일
        </label>
        <div className="relative w-full h-[50px]">
          <div className="absolute left-[12px] top-[14px] w-[20px] h-[20px]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
            >
              <path
                d="M16.6667 3.33301H3.33341C2.41294 3.33301 1.66675 4.0792 1.66675 4.99967V14.9997C1.66675 15.9201 2.41294 16.6663 3.33341 16.6663H16.6667C17.5872 16.6663 18.3334 15.9201 18.3334 14.9997V4.99967C18.3334 4.0792 17.5872 3.33301 16.6667 3.33301Z"
                stroke="#9CA3AF"
                strokeWidth="1.66667"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M18.3334 5.83301L10.8584 10.583C10.6011 10.7442 10.3037 10.8297 10.0001 10.8297C9.69648 10.8297 9.39902 10.7442 9.14175 10.583L1.66675 5.83301"
                stroke="#9CA3AF"
                strokeWidth="1.66667"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="example@muses.com"
            className="w-full h-full bg-white border border-[#C3C5C8] rounded-[12px] pl-[40px] pr-[16px] py-[14.5px] font-mainFont text-[16px] placeholder:text-black40 focus:outline-none focus:border-solidPurple transition-colors"
          />
        </div>
      </div>

      <div className="flex flex-col items-start gap-[8px] self-stretch">
        <label className="text-black80 font-mediumFont text-[14px] leading-[20px] self-stretch">
          비밀번호
        </label>
        <div className="relative w-full h-[50px]">
          <div className="absolute left-[12px] top-[14px] w-[20px] h-[20px]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
            >
              <path
                d="M10.0001 14.1667C10.4603 14.1667 10.8334 13.7936 10.8334 13.3333C10.8334 12.8731 10.4603 12.5 10.0001 12.5C9.53984 12.5 9.16675 12.8731 9.16675 13.3333C9.16675 13.7936 9.53984 14.1667 10.0001 14.1667Z"
                stroke="#9CA3AF"
                strokeWidth="1.66667"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M15.8333 8.33301H4.16667C3.24619 8.33301 2.5 9.0792 2.5 9.99967V16.6663C2.5 17.5868 3.24619 18.333 4.16667 18.333H15.8333C16.7538 18.333 17.5 17.5868 17.5 16.6663V9.99967C17.5 9.0792 16.7538 8.33301 15.8333 8.33301Z"
                stroke="#9CA3AF"
                strokeWidth="1.66667"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M5.83325 8.33366V5.83366C5.83325 4.72859 6.27224 3.66878 7.05364 2.88738C7.83504 2.10598 8.89485 1.66699 9.99992 1.66699C11.105 1.66699 12.1648 2.10598 12.9462 2.88738C13.7276 3.66878 14.1666 4.72859 14.1666 5.83366V8.33366"
                stroke="#9CA3AF"
                strokeWidth="1.66667"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            className="w-full h-full bg-white border border-[#C3C5C8] rounded-[12px] pl-[40px] pr-[16px] py-[14.5px] font-mainFont text-[16px] placeholder:text-black40 focus:outline-none focus:border-solidPurple transition-colors"
          />
        </div>
      </div>

      <div className="mt-[8px]">
        <AuthButton text="로그인" variant="primary" onClick={handleLogin} />
      </div>
    </div>
  );
}
