import type { StepProps } from './StepProps';
import { Field, InputFrame } from '../components/FormField';
import { Ticket, QrCode, Trash2, Layers, Plus } from 'lucide-react';
import type { RewardData } from '../../../pages/CreateProjectPage';
import { useState } from 'react';

export default function RewardStep({ data, onChange }: StepProps) {
  const rewards: RewardData[] = data.rewards ?? [];

  // ---------- 이 컴포넌트만 쓰는 UI 상태 ----------
  // "수량 설정 사용함" 켜짐 여부만 로컬에 둠. useQr은 RewardData에서 관리
  type RewardUiState = { useQuantity: boolean };
  const [uiState, setUiState] = useState<Record<number, RewardUiState>>(() => {
    const initial: Record<number, RewardUiState> = {};
    rewards.forEach((reward) => {
      initial[reward.reward_id] = {
        useQuantity: reward.total_quantity !== '',
      };
    });
    return initial;
  });

  // ----------  부모한테 리워드 배열 바꿔달라고 알려주는 함수 ----------
  const setRewards = (next: RewardData[]) => {
    onChange('rewards', next);
  };

  /**
   * 특정 리워드 하나만 일부 필드만 수정할 때 사용
   * - rewardId: 어떤 리워드인지 (reward_id)
   * - patch: 바꿀 필드만 넣은 객체 (예: { reward_name: 'VIP권' })
   * - map으로 그 리워드만 {...reward, ...patch} 로 바꾼 새 배열을 setRewards에 넘김
   */
  const handleRewardChange = (rewardId: number, patch: Partial<RewardData>) => {
    const updated = rewards.map((reward) =>
      reward.reward_id === rewardId ? { ...reward, ...patch } : reward
    );
    setRewards(updated);
  };

  /**
   * "리워드 추가" 버튼 클릭 시
   * - 새 id = 기존 id들 중 최댓값 + 1 (없으면 1)
   * - 빈 리워드 객체 하나 만들어서 배열 맨 뒤에 추가
   * - uiState에도 이 리워드용 { useQuantity: false } 추가
   */
  const addReward = () => {
    const nextId =
      rewards.length > 0
        ? Math.max(...rewards.map((reward) => reward.reward_id)) + 1
        : 1;

    const newReward: RewardData = {
      reward_id: nextId,
      reward_name: '',
      price: '',
      description: '',
      type: 'TICKET',
      useQr: false,
      total_quantity: '',
    };

    setUiState((prev) => ({
      ...prev,
      [nextId]: { useQuantity: false },
    }));

    setRewards([...rewards, newReward]);
  };

  /**
   * 리워드 삭제 버튼 클릭 시
   * - 해당 reward_id 제외한 배열로 갱신
   * - 다 지우면 안 되니까, 0개가 되면 빈 리워드 1개(reward_id: 1)로 초기화
   * - uiState에서도 그 id 키 제거 (또는 0개일 땐 { 1: ... } 만 남김)
   */
  const removeReward = (rewardId: number) => {
    const remaining = rewards.filter((reward) => reward.reward_id !== rewardId);

    if (remaining.length === 0) {
      const resetReward: RewardData = {
        reward_id: 1,
        reward_name: '',
        price: '',
        description: '',
        type: 'TICKET',
        useQr: false,
        total_quantity: '',
      };
      setUiState({ 1: { useQuantity: false } });
      setRewards([resetReward]);
      return;
    }

    setUiState((prev) => {
      const next = { ...prev };
      delete next[rewardId];
      return next;
    });
    setRewards(remaining);
  };

  /**
   * "수량 설정" 옆 "사용함" 체크박스 토글
   * - useQuantity를 true ↔ false 로 바꿈
   * - 사용함을 끄면 total_quantity를 ''로 초기화 (수량 입력란도 사라지니까)
   */
  const toggleQuantityOption = (rewardId: number) => {
    const currentState = uiState[rewardId] || { useQuantity: false };
    const newUseQuantity = !currentState.useQuantity;

    setUiState((prev) => ({
      ...prev,
      [rewardId]: { ...currentState, useQuantity: newUseQuantity },
    }));

    if (!newUseQuantity) {
      handleRewardChange(rewardId, { total_quantity: '' });
    }
  };

  /**
   * "QR 발급" 옆 "사용함" 체크박스 토글
   * - RewardData.useQr 로 저장 (스텝 이동해도 유지됨)
   */
  const toggleQrUsed = (rewardId: number) => {
    const reward = rewards.find((r) => r.reward_id === rewardId);
    if (!reward) return;
    handleRewardChange(rewardId, { useQr: !reward.useQr });
  };

  return (
    <div className="self-stretch pb-4 flex flex-col gap-8">
      {/* 상단: 제목 + 리워드 추가 버튼 */}
      <div className="flex items-center justify-between">
        <h2 className="text-mainBlack text-2xl font-boldFont leading-8">
          Step 3. 리워드 설정
        </h2>
        <button
          type="button"
          onClick={addReward}
          className="flex justify-center items-center px-4 py-2 rounded-lg bg-mainBlack text-white text-sm font-semiBoldFont gap-1 hover:bg-[#EEF2FF] hover:text-[#4F46E5] cursor-pointer transition-colors"
        >
          <Plus className="w-5 h-5" />
          리워드 추가
        </button>
      </div>

      {/* 리워드가 여러 개면 카드가 여러 개 나옴. map으로 하나씩 그려줌 */}
      {rewards.map((reward, index) => {
        // 이 카드에 해당하는 UI 상태 (수량 사용함만). useQr은 reward.useQr
        const currentUiState = uiState[reward.reward_id] || {
          useQuantity: false,
        };

        return (
          <div
            key={reward.reward_id}
            className="self-stretch px-6 pt-7 pb-6 rounded-2xl outline outline-1 outline-offset-[-1px] outline-[#E0E7FF] inline-flex flex-col justify-center items-start gap-4"
          >
            {/* 카드 맨 위: "Reward #1" 라벨 + 삭제 버튼 */}
            <div className="flex items-center gap-2 ml-auto">
              <span className="px-2 py-1 rounded bg-[#EFEFEF] text-xs font-boldFont">
                Reward #{index + 1}
              </span>
              <button
                type="button"
                onClick={() => removeReward(reward.reward_id)}
                className="flex items-center justify-center "
                aria-label="리워드 삭제"
              >
                <Trash2 className="w-4 h-4 text-black40 hover:text-black transition-colors cursor-pointer" />
              </button>
            </div>

            {/* 카드 상단: 티켓형 / QR 발급 영역 */}
            <div className="w-full flex pb-4 items-center justify-between border-b border-[#E0E7FF] gap-6">
              {/* 왼쪽: 티켓형 배지 */}
              <div className="inline-flex pl-3 items-center gap-1">
                <Ticket className="w-4 h-4" />
                <span className="text-sm font-boldFont leading-5">티켓형</span>
              </div>

              {/* 오른쪽: QR 발급 + "사용함" 체크 (RewardData.useQr) */}
              <div className="flex flex-col">
                <div className="w-[240px] rounded-xl bg-[#EFEFEF] border border-white80 px-4 py-4 flex items-center justify-between text-[11px] font-mainFont">
                  <div className="flex items-center gap-2 text-mainBlack font-boldFont">
                    <QrCode className="w-5 h-5" />
                    <span className="font-boldFont text-xs">QR 발급</span>
                  </div>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={reward.useQr}
                      onChange={() => toggleQrUsed(reward.reward_id)}
                      className="w-4 h-4 rounded border border-black80 accent-mainBlack"
                    />
                    <span className="text-mainBlack text-xs font-mainFont">
                      사용함
                    </span>
                  </label>
                </div>
              </div>
            </div>

            {/* 리워드 이름, 후원 금액 */}
            <div className="w-full flex gap-4">
              <div className="flex-1">
                <Field label="리워드 이름">
                  <InputFrame>
                    <input
                      type="text"
                      value={reward.reward_name}
                      onChange={(e) =>
                        handleRewardChange(reward.reward_id, {
                          reward_name: e.target.value,
                        })
                      }
                      placeholder="예) VIP 관람권"
                      className="w-full text-mainBlack placeholder:text-black40 font-mainFont focus:outline-none"
                    />
                  </InputFrame>
                </Field>
              </div>

              <div className="flex-1">
                <Field label="후원 금액">
                  <InputFrame>
                    <input
                      type="number"
                      inputMode="numeric"
                      min={0}
                      value={reward.price}
                      onChange={(e) => {
                        const value = e.target.value;
                        handleRewardChange(reward.reward_id, {
                          price: value === '' ? '' : Number(value),
                        });
                      }}
                      placeholder="0"
                      className="w-full text-mainBlack placeholder:text-black40 font-mainFont focus:outline-none"
                    />
                  </InputFrame>
                </Field>
              </div>
            </div>

            {/* 수량 설정: "사용함" 체크 시에만 숫자 입력란 표시, total_quantity 저장 */}
            <div className="w-full border rounded-xl border-white80">
              <label className="w-full px-4 py-4 bg-[#EFEFEF] rounded-xl flex items-center justify-between cursor-pointer">
                <div className="flex justify-center items-center gap-1">
                  <Layers className="w-2.5 h-2.5" />
                  <span className="text-xs font-boldFont leading-4">
                    수량 설정
                  </span>
                </div>
                <div className="flex gap-10">
                  {currentUiState.useQuantity && (
                    <input
                      type="number"
                      inputMode="numeric"
                      min={0}
                      value={reward.total_quantity}
                      onChange={(e) => {
                        const value = e.target.value;
                        handleRewardChange(reward.reward_id, {
                          total_quantity: value === '' ? '' : Number(value),
                        });
                      }}
                      placeholder="0"
                      className="w-[120px] h-[46px] px-4 py-4 bg-white rounded-xl border border-white60 focus-within:ring-1 focus-within:ring-mainBlack"
                    />
                  )}
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={currentUiState.useQuantity}
                      onChange={() => toggleQuantityOption(reward.reward_id)}
                      className="w-4 h-4 rounded border border-black80 accent-mainBlack"
                    />
                    <span className="text-mainBlack text-xs font-mainFont">
                      사용함
                    </span>
                  </div>
                </div>
              </label>
            </div>

            {/* 리워드 설명 (긴 글, description에 저장) */}
            <Field label="리워드 설명">
              <InputFrame>
                <textarea
                  value={reward.description}
                  onChange={(e) =>
                    handleRewardChange(reward.reward_id, {
                      description: e.target.value,
                    })
                  }
                  placeholder="리워드 구성품 상세 설명"
                  className="w-full resize-none min-h-[66px] text-mainBlack placeholder:text-black40 font-mainFont focus:outline-none"
                />
              </InputFrame>
            </Field>
          </div>
        );
      })}
    </div>
  );
}
