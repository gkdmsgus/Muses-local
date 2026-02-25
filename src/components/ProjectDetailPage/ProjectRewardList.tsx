import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  type ProjectDetailData,
  type ProjectReward,
} from '../../types/projectDetails';
import { ProjectRewardCard } from './ProjectRewardCard';
import { Loader2 } from 'lucide-react';

interface ProjectRewardListProps {
  detail: ProjectDetailData;
}

type PaymentMethod = 'card' | 'easy';
type EasyPayOption = 'kakao' | 'naver' | 'toss' | null;

export const ProjectRewardList = ({ detail }: ProjectRewardListProps) => {
  const navigate = useNavigate();

  const [selectedQuantities, setSelectedQuantities] = useState<
    Record<number, number>
  >({});
  const [isPaymentOpen, setIsPaymentOpen] = useState(false);
  const [showSelectNotice, setShowSelectNotice] = useState(false);

  const selectedRewards =
    detail?.rewards?.filter(
      (reward) => (selectedQuantities[reward.rewardId] ?? 0) > 0
    ) ?? [];
  const totalAmount = selectedRewards.reduce(
    (sum, reward) =>
      sum + reward.price * (selectedQuantities[reward.rewardId] ?? 0),
    0
  );

  // 결제 수단 상태
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('card');
  const [selectedEasyPay, setSelectedEasyPay] = useState<EasyPayOption>(null);

  // 카드 입력 상태
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvc, setCvc] = useState('');
  const [cardHolder, setCardHolder] = useState('');

  // 처리 상태
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSelectReward = (reward: ProjectReward) => {
    setSelectedQuantities((prev) => {
      if (prev[reward.rewardId]) return prev;
      return { ...prev, [reward.rewardId]: 1 };
    });
  };

  const handleQuantityChange = (rewardId: number, quantity: number) => {
    setSelectedQuantities((prev) => {
      if (quantity <= 0) {
        const next = { ...prev };
        delete next[rewardId];
        return next;
      }
      const reward = detail?.rewards?.find(
        (item) => item.rewardId === rewardId
      );
      const maxAvailable =
        reward?.remainingQuantity !== undefined
          ? Math.max(0, reward.remainingQuantity)
          : quantity;
      return {
        ...prev,
        [rewardId]: Math.min(quantity, maxAvailable),
      };
    });
  };

  useEffect(() => {
    if (!isPaymentOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isPaymentOpen]);

  useEffect(() => {
    if (selectedRewards.length > 0) {
      setShowSelectNotice(false);
    }
  }, [selectedRewards.length]);

  // 카드번호 포맷 (xxxx xxxx xxxx xxxx)
  const handleCardNumberChange = (value: string) => {
    const digits = value.replace(/\D/g, '').slice(0, 16);
    const formatted = digits.replace(/(.{4})/g, '$1 ').trim();
    setCardNumber(formatted);
  };

  // 유효기간 포맷 (MM / YY)
  const handleExpiryChange = (value: string) => {
    const digits = value.replace(/\D/g, '').slice(0, 4);
    if (digits.length >= 3) {
      setExpiry(`${digits.slice(0, 2)} / ${digits.slice(2)}`);
    } else {
      setExpiry(digits);
    }
  };

  // Mock 결제 처리
  const handlePayment = () => {
    if (selectedRewards.length === 0) return;
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setIsPaymentOpen(false);
      navigate(`/billing/success?amount=${totalAmount}&mock=true`);
    }, 1500);
  };

  const inputClass =
    'w-full border border-[#E5E7EB] rounded-xl px-4 h-12 text-mainBlack font-mediumFont text-sm focus:border-solidBlue outline-none transition-colors bg-white placeholder:text-black40';

  return (
    <div className="flex flex-col gap-4 mb-6">
      <p className="text-lg font-boldFont text-mainBlack px-2">리워드 선택</p>
      <div className="flex flex-col gap-4">
        {detail?.rewards?.map((reward) => {
          const selectedQuantity = selectedQuantities[reward.rewardId] ?? 0;
          return (
            <ProjectRewardCard
              key={reward.rewardId}
              reward={reward}
              onClick={handleSelectReward}
              isSelected={selectedQuantity > 0}
              quantity={selectedQuantity > 0 ? selectedQuantity : undefined}
              onQuantityChange={
                selectedQuantity > 0
                  ? (nextQuantity) =>
                      handleQuantityChange(reward.rewardId, nextQuantity)
                  : undefined
              }
            />
          );
        })}
      </div>
      {showSelectNotice && (
        <p className="text-sm font-mediumFont text-[#EF4444] px-2">
          리워드를 선택해주세요!
        </p>
      )}
      <button
        type="button"
        className={`w-full h-14 mb-2 rounded-xl font-boldFont text-base cursor-pointer transition-colors ${
          selectedRewards.length === 0
            ? 'bg-black40 text-mainWhite'
            : 'bg-mainBlack text-mainWhite'
        }`}
        onClick={() => {
          if (selectedRewards.length === 0) {
            setShowSelectNotice(true);
            return;
          }
          setIsPaymentOpen(true);
        }}
      >
        {selectedRewards.length === 0
          ? '응원하기'
          : `총 ${totalAmount.toLocaleString()}원 응원하기`}
      </button>

      {/* 결제 모달 */}
      {isPaymentOpen && selectedRewards.length > 0 && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-xs"
            onClick={() => !isProcessing && setIsPaymentOpen(false)}
          />
          <div
            className="relative z-10 w-fit min-w-[620px] max-h-[90vh] overflow-y-auto rounded-[48px] bg-white p-10 mx-4"
            role="dialog"
            aria-modal="true"
          >
            <h3 className="text-2xl font-boldFont text-mainBlack mb-8">
              응원하기
            </h3>

            {/* 선택한 리워드 요약 */}
            <div className="rounded-2xl border border-[#E5E7EB] bg-white p-8 mb-6 w-full">
              <p className="text-base text-solidBlue mb-5 font-boldFont">
                선택한 리워드
              </p>
              <div className="flex flex-col gap-5 border-b border-[#E5E7EB] pb-6 mb-6">
                {selectedRewards.map((reward) => (
                  <div
                    key={reward.rewardId}
                    className="flex items-start justify-between gap-4"
                  >
                    <div>
                      <div className="flex gap-4 items-center mb-1.5">
                        <p className="text-base font-boldFont text-mainBlack">
                          {reward.rewardName}
                        </p>
                        <p className="text-sm text-black60 font-mediumFont">
                          x {selectedQuantities[reward.rewardId]}
                        </p>
                      </div>
                      <p className="text-sm text-black60 font-mediumFont">
                        {reward.description}
                      </p>
                    </div>
                    <p className="text-base font-boldFont text-solidBlue whitespace-nowrap">
                      {(
                        reward.price *
                        (selectedQuantities[reward.rewardId] ?? 0)
                      ).toLocaleString()}
                      원
                    </p>
                  </div>
                ))}
              </div>
              <div className="flex items-center justify-between">
                <p className="text-lg text-mainBlack font-boldFont">
                  결제 금액
                </p>
                <p className="text-2xl font-blackFont text-solidBlue">
                  {totalAmount.toLocaleString()}원
                </p>
              </div>
            </div>

            {/* 결제 수단 탭 */}
            <div className="mb-4">
              <p className="text-base font-boldFont text-mainBlack mb-3">
                결제 수단
              </p>
              <div className="flex gap-2 mb-6">
                <button
                  type="button"
                  onClick={() => setPaymentMethod('card')}
                  className={`flex-1 h-11 rounded-xl text-sm font-boldFont transition-colors cursor-pointer ${
                    paymentMethod === 'card'
                      ? 'bg-mainBlack text-mainWhite'
                      : 'border border-[#E5E7EB] text-black60'
                  }`}
                >
                  신용카드
                </button>
                <button
                  type="button"
                  onClick={() => setPaymentMethod('easy')}
                  className={`flex-1 h-11 rounded-xl text-sm font-boldFont transition-colors cursor-pointer ${
                    paymentMethod === 'easy'
                      ? 'bg-mainBlack text-mainWhite'
                      : 'border border-[#E5E7EB] text-black60'
                  }`}
                >
                  간편결제
                </button>
              </div>

              {/* 신용카드 탭 */}
              {paymentMethod === 'card' && (
                <div className="rounded-2xl border border-[#E5E7EB] p-6 flex flex-col gap-4">
                  <div>
                    <label className="block text-xs font-boldFont text-black60 mb-1.5">
                      카드번호
                    </label>
                    <input
                      type="text"
                      inputMode="numeric"
                      placeholder="0000 0000 0000 0000"
                      maxLength={19}
                      value={cardNumber}
                      onChange={(e) => handleCardNumberChange(e.target.value)}
                      className={inputClass}
                    />
                  </div>
                  <div className="flex gap-3">
                    <div className="flex-1">
                      <label className="block text-xs font-boldFont text-black60 mb-1.5">
                        유효기간
                      </label>
                      <input
                        type="text"
                        inputMode="numeric"
                        placeholder="MM / YY"
                        maxLength={7}
                        value={expiry}
                        onChange={(e) => handleExpiryChange(e.target.value)}
                        className={inputClass}
                      />
                    </div>
                    <div className="flex-1">
                      <label className="block text-xs font-boldFont text-black60 mb-1.5">
                        CVC
                      </label>
                      <input
                        type="password"
                        inputMode="numeric"
                        placeholder="•••"
                        maxLength={3}
                        value={cvc}
                        onChange={(e) =>
                          setCvc(e.target.value.replace(/\D/g, '').slice(0, 3))
                        }
                        className={inputClass}
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-boldFont text-black60 mb-1.5">
                      카드 소유자명
                    </label>
                    <input
                      type="text"
                      placeholder="홍길동"
                      value={cardHolder}
                      onChange={(e) => setCardHolder(e.target.value)}
                      className={inputClass}
                    />
                  </div>
                </div>
              )}

              {/* 간편결제 탭 */}
              {paymentMethod === 'easy' && (
                <div className="rounded-2xl border border-[#E5E7EB] p-6">
                  <div className="grid grid-cols-2 gap-3 mb-3">
                    <button
                      type="button"
                      onClick={() => setSelectedEasyPay('kakao')}
                      className={`h-14 rounded-xl font-boldFont text-sm cursor-pointer transition-all bg-[#FEE500] text-[#3C1E1E] ${
                        selectedEasyPay === 'kakao'
                          ? 'ring-2 ring-solidBlue ring-offset-2'
                          : ''
                      }`}
                    >
                      <span className="flex items-center justify-center gap-2">
                        <span className="text-lg">K</span>
                        카카오페이
                      </span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setSelectedEasyPay('naver')}
                      className={`h-14 rounded-xl font-boldFont text-sm cursor-pointer transition-all bg-[#03C75A] text-white ${
                        selectedEasyPay === 'naver'
                          ? 'ring-2 ring-solidBlue ring-offset-2'
                          : ''
                      }`}
                    >
                      <span className="flex items-center justify-center gap-2">
                        <span className="text-lg">N</span>
                        네이버페이
                      </span>
                    </button>
                  </div>
                  <button
                    type="button"
                    onClick={() => setSelectedEasyPay('toss')}
                    className={`w-full h-14 rounded-xl font-boldFont text-sm cursor-pointer transition-all bg-[#0064FF] text-white ${
                      selectedEasyPay === 'toss'
                        ? 'ring-2 ring-solidBlue ring-offset-2'
                        : ''
                    }`}
                  >
                    <span className="flex items-center justify-center gap-2">
                      <span className="text-lg">T</span>
                      토스페이
                    </span>
                  </button>
                </div>
              )}
            </div>

            {/* 결제하기 버튼 */}
            <button
              type="button"
              disabled={isProcessing}
              className={`w-full h-16 rounded-xl font-boldFont text-lg transition-all cursor-pointer flex items-center justify-center gap-2 ${
                isProcessing
                  ? 'bg-black40 text-mainWhite'
                  : 'bg-mainBlack text-mainWhite'
              }`}
              onClick={handlePayment}
            >
              {isProcessing ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  결제 처리 중...
                </>
              ) : (
                `${totalAmount.toLocaleString()}원 결제하기`
              )}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
