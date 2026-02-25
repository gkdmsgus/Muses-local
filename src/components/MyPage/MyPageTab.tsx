import { Lock } from 'lucide-react';
import { useEffect, useRef } from 'react';
import { type MyPageTabType } from './hooks/useMyPageTab';

interface Props {
  activeTab: MyPageTabType;
  onChange: (tab: MyPageTabType) => void;
  isCreator: boolean;
}

const MyPageTab = ({ activeTab, onChange, isCreator }: Props) => {
  const activityRef = useRef<HTMLButtonElement>(null);
  const creatorRef = useRef<HTMLButtonElement>(null);
  const underlineRef = useRef<HTMLDivElement>(null);

  const moveUnderline = () => {
    const target =
      activeTab === 'activity' ? activityRef.current : creatorRef.current;

    if (!target || !underlineRef.current) return;

    underlineRef.current.style.width = `${target.offsetWidth}px`;
    underlineRef.current.style.left = `${target.offsetLeft}px`;
  };

  useEffect(() => {
    moveUnderline();
  }, [activeTab]);

  return (
    <div className="relative self-stretch border-b border-white60 inline-flex justify-start items-start gap-6">
      <button
        ref={activityRef}
        onClick={() => onChange('activity')}
        className="pb-4 relative inline-flex flex-col justify-center items-center"
      >
        <div
          className={`text-center justify-center text-base font-boldFont leading-6 ${
            activeTab === 'activity'
              ? 'text-[#4F46E5]'
              : 'text-black40 hover:text-black80 cursor-pointer transition'
          }`}
        >
          내 활동
        </div>
      </button>

      <button
        ref={creatorRef}
        onClick={() => onChange('creator')}
        data-:hover="false"
        data-variant="1"
        className="pb-4 flex justify-start items-center gap-1"
      >
        <div
          className={`inline-flex items-center gap-1 text-center justify-center text-base font-boldFont leading-6 whitespace-nowrap ${
            activeTab === 'creator'
              ? 'text-[#EA580C]'
              : 'text-black40 hover:text-black80 cursor-pointer transition'
          }`}
        >
          크리에이터 센터 {!isCreator && <Lock size={12} />}
        </div>
      </button>

      <div
        ref={underlineRef}
        className={`absolute bottom-0 h-0.5 rounded-full transition-all duration-300 ${
          activeTab === 'activity' ? 'bg-[#4F46E5]' : 'bg-[#EA580C]'
        }`}
      />
    </div>
  );
};

export default MyPageTab;
