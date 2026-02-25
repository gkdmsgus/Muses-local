import {
  Delete,
  Layers,
  Lightbulb,
  Lock,
  PencilLine,
  QrCode,
  Ticket,
  Trash2,
} from 'lucide-react';
import { useEffect, useState } from 'react';
import {
  getProjectSetting,
  updateProjectSetting,
} from '../../../../types/setting';

interface TabProps {
  projectId?: number;
}

const SettingTab = ({ projectId }: TabProps) => {
  const [isEditing, setIsEditing] = useState(false);

  const [description, setDescription] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [newTag, setNewTag] = useState('');
  const [targetAmount, setTargetAmount] = useState(0);
  const [deadline, setDeadline] = useState('');

  const formattedDeadline = deadline ? deadline.split('T')[0] : '';

  useEffect(() => {
    if (!projectId) return;

    const fetchSetting = async () => {
      if (!projectId) return;

      try {
        const { data } = await getProjectSetting(projectId);
        const setting = data?.data;

        setDescription(setting?.description ?? '');
        setTags(Array.isArray(setting?.tags) ? setting.tags : []);
        setTargetAmount(setting?.targetAmount ?? 0);
        setDeadline(setting?.deadline ?? '');
      } catch (error) {
        console.error(error);
      }
    };

    fetchSetting();
  }, [projectId]);

  const handleDeleteTag = (tag: string) => {
    setTags((prev) => prev.filter((t) => t !== tag));
  };

  const handleAddTag = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && newTag.trim()) {
      e.preventDefault();

      const trimmed = newTag.trim();

      if (!tags.includes(trimmed)) {
        setTags((prev) => [...prev, trimmed]);
      }

      setNewTag('');
    }
  };

  const handleSave = async () => {
    if (!projectId) return;

    try {
      await updateProjectSetting(projectId, { description, tags });

      setIsEditing(false);
    } catch (error) {
      console.error(error);
      alert('저장 실패');
    }
  };

  return (
    <div>
      {!isEditing ? (
        // 기존 SettingTab UI
        <div className="w-[768px] p-8 bg-white rounded-2xl shadow-[0_1px_2px_rgba(0,0,0,0.05)] border border-white80 flex flex-col gap-6">
          {/* header */}
          <div className="flex items-center justify-between">
            <div className="text-mainBlack text-xl font-boldFont leading-7">
              프로젝트 설정
            </div>

            <button
              className="px-4 py-2 bg-[#9333EA] rounded-lg flex items-center gap-2 text-white cursor-pointer"
              onClick={() => setIsEditing(true)}
            >
              <PencilLine size={16} />
              <div className="text-base font-mainFont leading-6">수정</div>
            </button>
          </div>

          <div className="flex flex-col gap-6">
            {/* description */}
            <div className="flex flex-col gap-2">
              <div className="text-[#374151] text-sm font-mediumFont leading-5">
                프로젝트 설명
              </div>
              <input
                value={description}
                readOnly
                className="p-4 bg-[#F8F9FC] rounded-xl text-black80 text-base font-mainFont focus:outline-none leading-6"
              />
            </div>

            {/* tags */}
            <div className="flex flex-col gap-2">
              <div className="text-[#374151] text-sm font-mediumFont leading-5">
                태그
              </div>
              <div className="flex flex-wrap gap-2">
                {tags.map((tag) => (
                  <div
                    key={tag}
                    className="px-3 py-1 bg-[#F3E8FF] rounded-full text-[#7E22CE] text-sm font-mainFont leading-5"
                  >
                    {tag}
                  </div>
                ))}
              </div>
            </div>

            {/* info */}
            <div className="pt-6 border-t border-white60 flex gap-4">
              <div className="flex-1 flex flex-col gap-2">
                <div className="text-black60 text-sm font-mediumFont leading-5">
                  목표 금액
                </div>
                <div className="px-4 py-3 bg-white80 rounded-xl flex items-center gap-2 text-black60">
                  <Lock size={16} />
                  <div className="text-base font-mainFont leading-6">
                    {targetAmount.toLocaleString()}원
                  </div>
                </div>
              </div>

              <div className="flex-1 flex flex-col gap-2">
                <div className="text-black60 text-sm font-mediumFont leading-5">
                  마감일
                </div>
                <div className="px-4 py-3 bg-white80 rounded-xl flex items-center gap-2 text-black60">
                  <Lock size={16} />
                  <div className="text-base font-mainFont leading-6">
                    {formattedDeadline}
                  </div>
                </div>
              </div>
            </div>

            {/* tip */}
            <div className="p-4 bg-[#EEF2FF] text-[#1D4ED8] text-sm font-mainFont rounded-xl flex gap-3">
              <Lightbulb size={20} className="mt-0.5" />
              <div className="flex flex-col gap-1">
                <div className="text-[#1E40AF] text-base font-semiBoldFont leading-6">
                  프로젝트 관리 팁
                </div>
                <div className="leading-5">
                  • 메이커와 주기적으로 소통하세요
                  <br />
                  • 프로젝트 진행 상황을 업데이트하세요
                  <br />• 리워드 재고를 정기적으로 확인하세요
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        // 수정 모드 UI
        <div className="w-[768px] p-8 bg-white rounded-2xl shadow-[0_1px_2px_rgba(0,0,0,0.05)] border border-white80 flex flex-col gap-6">
          {/* header */}
          <div className="flex items-center justify-between">
            <div className="text-mainBlack text-xl font-boldFont leading-7">
              프로젝트 설정
            </div>

            <button
              className="px-4 py-2 bg-[#9333EA] rounded-lg flex items-center gap-2 text-white cursor-pointer"
              onClick={handleSave}
            >
              <PencilLine size={16} />
              <div className="text-base font-mainFont leading-6">저장</div>
            </button>
          </div>

          <div className="flex flex-col gap-6">
            {/* description */}
            <div className="flex flex-col gap-2">
              <div className="text-[#374151] text-sm font-mediumFont leading-5">
                프로젝트 설명
              </div>
              <input
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="p-4 border border-[#E5E7EB] rounded-xl text-black80 text-base font-mainFont leading-6"
              />
            </div>

            <div className="flex flex-wrap gap-2 text-[#7E22CE]">
              {tags.map((tag) => (
                <div
                  key={tag}
                  className="px-3 h-7 bg-[#F3E8FF] rounded-full inline-flex items-center gap-1"
                >
                  <span className="text-sm font-mainFont leading-5">{tag}</span>
                  <Delete
                    size={12}
                    className="cursor-pointer"
                    onClick={() => handleDeleteTag(tag)}
                  />
                </div>
              ))}
            </div>

            <input
              value={newTag}
              onChange={(e) => setNewTag(e.target.value)}
              onKeyDown={handleAddTag}
              placeholder="#태그 입력 (Enter)"
              className="px-4 py-4 bg-white rounded-xl border border-white60 placeholder:text-black40 placeholder:font-mainFont"
            />
            <div className="self-stretch pt-6 border-t border-white60 flex flex-col justify-start items-start gap-4">
              <div className="self-stretch p-4 bg-[#F3E8FF] rounded-xl inline-flex justify-start items-start text-[#854D0E]">
                <div className="w-5 h-5 pt-0.5 inline-flex flex-col justify-start items-start text-[#CA8A04]">
                  <Lock size={20} />
                </div>
                <div className="pl-3 inline-flex flex-col justify-start items-start">
                  <div className="flex flex-col justify-start items-start gap-1">
                    <div className="self-stretch flex flex-col justify-start items-start">
                      <div className="justify-center text-base font-semiBoldFont leading-6">
                        수정 불가 항목
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="self-stretch inline-flex justify-center items-start gap-4">
                <div className="flex-1 self-stretch inline-flex flex-col justify-start items-start gap-2">
                  <div className="self-stretch flex flex-col justify-start items-start">
                    <div className="self-stretch justify-center text-black60 text-sm font-mediumFont leading-5">
                      목표 금액
                    </div>
                  </div>
                  <div className="self-stretch px-4 py-3 bg-white80 rounded-xl text-[#6B7280] inline-flex justify-start items-center">
                    <div data-variant="4" className="w-4 h-4 relative">
                      <Lock size={16} />
                    </div>
                    <div className="pl-2 inline-flex flex-col justify-start items-start">
                      <div className="justify-center text-base font-mainFont leading-6">
                        {targetAmount.toLocaleString()}원
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex-1 self-stretch inline-flex flex-col justify-start items-start gap-2">
                  <div className="self-stretch flex flex-col justify-start items-start">
                    <div className="self-stretch justify-center text-black60 text-sm font-mediumFont leading-5">
                      마감일
                    </div>
                  </div>
                  <div className="self-stretch px-4 py-3 bg-white80 rounded-xl text-[#6B7280] inline-flex justify-start items-center">
                    <div data-variant="4" className="w-4 h-4 relative">
                      <Lock size={16} />
                    </div>
                    <div className="pl-2 inline-flex flex-col justify-start items-start">
                      <div className="justify-center text-base font-mainFont leading-6">
                        {formattedDeadline}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="self-stretch px-6 pt-12 pb-6 relative bg-white rounded-2xl shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] border  border-white60 flex flex-col justify-start items-start gap-4">
                <div className="left-[586.46px] top-[17px] absolute inline-flex justify-start items-start gap-2">
                  <div className="self-stretch px-2 py-1 bg-[#EFEFEF] rounded inline-flex flex-col justify-start items-start">
                    <div className="justify-center text-black text-xs font-boldFont leading-4">
                      Reward #1
                    </div>
                  </div>
                  <div
                    data-:hover="false"
                    data-variant="1"
                    className="py-1 inline-flex flex-col justify-start items-start"
                  >
                    <div
                      data-variant="3"
                      className="w-4 h-4 relative  text-black60"
                    >
                      <Trash2 size={16} />
                    </div>
                  </div>
                </div>
                <div className="w-[670px] pb-4 border-b border-white80 flex justify-between items-center">
                  <div className="flex items-center gap-1">
                    <Ticket size={16} />
                    <div className="text-black text-sm font-boldFont leading-5">
                      티켓형
                    </div>
                  </div>

                  <div className="p-4 bg-[#EFEFEF] rounded-xl border border-white80 flex items-center">
                    <div className="flex items-center gap-6">
                      <div className="flex items-center gap-1">
                        <QrCode size={24} />
                        <div className="text-black text-xs font-boldFont leading-4">
                          QR 발급
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 bg-white rounded-sm border border-black60" />
                        <div className="text-xs font-mainFont leading-4">
                          사용함
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="w-[670px] flex gap-4">
                  {/* 리워드 이름 */}
                  <div className="flex-1 flex flex-col gap-1.5">
                    <div className="text-black60 text-xs font-boldFont leading-4">
                      리워드 이름
                    </div>
                    <div className="h-11 px-3 bg-white rounded-lg border border-white60 flex items-center">
                      <div className="text-black40 text-sm font-mainFont">
                        예) VIP 관람권
                      </div>
                    </div>
                  </div>

                  {/* 후원 금액 */}
                  <div className="flex-1 flex flex-col gap-1.5">
                    <div className="text-black60 text-xs font-boldFont leading-4">
                      후원 금액
                    </div>
                    <div className="h-11 px-3 bg-white rounded-lg border border-white60 flex items-center">
                      <div className="text-black40 text-sm font-mainFont">
                        0
                      </div>
                    </div>
                  </div>
                </div>

                <div className="w-[670px] p-4 bg-[#EFEFEF] rounded-xl border border-white80 flex flex-col justify-center items-start">
                  <div className="inline-flex justify-start items-center gap-[520px]">
                    <div className="flex justify-start items-center gap-1">
                      <div className="w-3 h-3 relative overflow-hidden">
                        <Layers size={12} />
                      </div>
                      <div className="justify-center text-black text-xs font-boldFont leading-4">
                        수량 설정
                      </div>
                    </div>
                    <div className="flex justify-start items-center gap-2">
                      <div className="w-4 h-4 bg-white rounded-sm border border-black60" />
                      <div className="inline-flex flex-col justify-start items-start">
                        <div className="justify-center textmainBlack text-xs font-mainFont leading-4">
                          사용함
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="w-[670px] py-1.5 flex flex-col justify-start items-start gap-1.5">
                  <div className="justify-center text-black60 text-xs font-boldFont leading-4">
                    리워드 설명
                  </div>
                  <div className="self-stretch px-3 pt-3 pb-8 bg-white rounded-lg border border-white60 inline-flex justify-center items-start overflow-hidden">
                    <div className="flex-1 inline-flex flex-col justify-start items-start">
                      <div className="self-stretch justify-center text-black40 text-sm font-mainFont leading-5">
                        리워드 구성품 상세 설명
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SettingTab;
