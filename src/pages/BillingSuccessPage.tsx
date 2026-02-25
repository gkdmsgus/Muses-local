import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { CheckIcon } from 'lucide-react';
import axios from 'axios';
import { ENDPOINTS } from '../api/endpoints';

export default function BillingSuccessPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>(
    'loading'
  );
  const [message, setMessage] = useState('');
  const [visible, setVisible] = useState(false);

  const amount = searchParams.get('amount');
  const isMock = searchParams.get('mock') === 'true';

  useEffect(() => {
    // Mock 흐름: 바로 성공 처리
    if (isMock) {
      setStatus('success');
      setTimeout(() => setVisible(true), 50);
      return;
    }

    // 실제 결제 흐름
    const orderId = searchParams.get('orderId');
    const authKey = searchParams.get('authKey');
    const customerKey = searchParams.get('customerKey');

    if (!orderId || !authKey || !customerKey) {
      setStatus('error');
      setMessage('빌링 인증 정보를 확인할 수 없습니다.');
      setTimeout(() => setVisible(true), 50);
      return;
    }

    window.history.replaceState({}, document.title, '/billing/success');

    const token = localStorage.getItem('accessToken');
    if (!token) {
      setStatus('error');
      setMessage('로그인 정보가 없습니다.');
      setTimeout(() => setVisible(true), 50);
      return;
    }

    axios
      .post(
        ENDPOINTS.BILLING_ISSUE,
        { authKey, customerKey },
        {
          params: { orderId },
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((response) => {
        if (!response.data?.success) {
          throw new Error(
            response.data?.error?.message ?? '빌링키 발급에 실패했습니다.'
          );
        }
        setStatus('success');
        setTimeout(() => setVisible(true), 50);
      })
      .catch((error) => {
        setStatus('error');
        setMessage(
          error instanceof Error ? error.message : '빌링키 발급에 실패했습니다.'
        );
        setTimeout(() => setVisible(true), 50);
      });
  }, [searchParams, isMock]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-6 font-mainFont">
      <button
        type="button"
        aria-label="프로젝트 목록으로 이동"
        className="absolute inset-0 bg-black/40 backdrop-blur-xs"
        onClick={() => navigate('/projects')}
      />
      <div
        className={`relative w-full max-w-[560px] rounded-[48px] bg-white p-12 text-center flex flex-col items-center transition-all duration-500 ${
          visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        }`}
      >
        {/* 아이콘 */}
        <div
          className={`flex items-center justify-center rounded-full w-24 h-24 mb-8 transition-transform duration-500 ${
            status === 'error' ? 'bg-[#FEE2E2]' : 'bg-pastelBlue'
          } ${visible ? 'scale-100' : 'scale-75'}`}
        >
          <CheckIcon
            className={`w-12 h-12 ${status === 'error' ? 'text-[#EF4444]' : 'text-solidBlue'}`}
          />
        </div>

        {status === 'loading' && (
          <>
            <div className="w-8 h-8 border-2 border-solidBlue border-t-transparent rounded-full animate-spin mb-4" />
            <p className="text-base text-black60 font-mediumFont">
              결제 인증을 확인 중입니다.
            </p>
          </>
        )}

        {status === 'success' && (
          <>
            <p className="text-4xl font-boldFont text-mainBlack mb-3">
              후원 성공!
            </p>
            {amount && (
              <p className="text-xl font-boldFont text-solidBlue mb-2">
                {parseInt(amount).toLocaleString()}원을 후원했어요
              </p>
            )}
            <p className="text-base text-black40 font-mediumFont mb-10">
              마이페이지에서 티켓을 확인하세요
            </p>
            <div className="flex flex-col gap-3 w-full">
              <button
                type="button"
                onClick={() => navigate('/mypage')}
                className="w-full h-14 rounded-xl bg-mainBlack text-mainWhite font-boldFont text-base cursor-pointer"
              >
                마이페이지 바로가기
              </button>
              <button
                type="button"
                onClick={() => navigate('/projects')}
                className="w-full h-14 rounded-xl border border-[#D1D5DB] text-mainBlack font-boldFont text-base cursor-pointer"
              >
                더 둘러보기
              </button>
            </div>
          </>
        )}

        {status === 'error' && (
          <>
            <p className="text-2xl font-boldFont text-mainBlack mb-2">
              오류가 발생했어요
            </p>
            <p className="text-base text-[#EF4444] font-mediumFont mb-10">
              {message || '카드 등록에 실패했습니다.'}
            </p>
            <div className="flex flex-col gap-3 w-full">
              <button
                type="button"
                onClick={() => navigate(-1)}
                className="w-full h-14 rounded-xl bg-mainBlack text-mainWhite font-boldFont text-base cursor-pointer"
              >
                다시 시도하기
              </button>
              <button
                type="button"
                onClick={() => navigate('/projects')}
                className="w-full h-14 rounded-xl border border-[#D1D5DB] text-mainBlack font-boldFont text-base cursor-pointer"
              >
                프로젝트 목록 보기
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
