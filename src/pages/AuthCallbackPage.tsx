import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function AuthCallbackPage() {
  const navigate = useNavigate();

  useEffect(() => {
    const hash = window.location.hash;

    if (hash) {
      const params = new URLSearchParams(hash.substring(1));
      const accessToken = params.get('accessToken');
      const role = params.get('role');

      if (accessToken) {
        localStorage.setItem('accessToken', accessToken);

        if (role === 'GUEST') {
          navigate('/onboarding');
        } else {
          navigate('/');
        }
      }
    } else {
      navigate('/login');
    }
  }, [navigate]);

  return (
    <div className="w-full h-screen flex flex-col items-center justify-center bg-white font-mainFont">
      <div className="flex flex-col items-center gap-6">
        <div className="w-12 h-12 border-4 border-solidPurple border-t-transparent rounded-full animate-spin"></div>
        <div className="flex flex-col items-center gap-2">
          <p className="text-[20px] font-semibold text-mainBlack">
            로그인 처리 중
          </p>
          <p className="text-[14px] text-black60">잠시만 기다려주세요...</p>
        </div>
      </div>
    </div>
  );
}
