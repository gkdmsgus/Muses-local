import { useRef, useEffect, type ChangeEvent, useState } from 'react';

function DropdownIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
    >
      <path
        d="M4 6L8 10L12 6"
        stroke="#4B5563"
        strokeWidth="1.33333"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

interface FormProps {
  onChange: (data: any) => void;
  values: {
    nickName: string;
    introduction: string;
    birthday: string;
    gender: string;
  };
}

export default function OnboardingFormFields({ onChange, values }: FormProps) {
  const [isGenderOpen, setIsGenderOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [values.introduction]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsGenderOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleBirthChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^0-9]/g, '');
    let result = '';

    if (value.length <= 4) {
      result = value;
    } else if (value.length <= 6) {
      result = `${value.substring(0, 4)}-${value.substring(4)}`;
    } else {
      result = `${value.substring(0, 4)}-${value.substring(4, 6)}-${value.substring(6, 8)}`;
    }

    onChange({ birthday: result });
  };

  return (
    <div className="w-[382px] flex flex-col shrink-0 gap-[11px] font-['Pretendard']">
      <div className="flex flex-col gap-[8px] h-[86px] shrink-0">
        <label className="text-[14px] font-medium text-[#374151] h-[20px]">
          닉네임*
        </label>
        <input
          type="text"
          value={values.nickName}
          onChange={(e) => onChange({ nickName: e.target.value })}
          placeholder="푸른 오렌지"
          className="w-full h-[58px] px-[17px] bg-white border border-[#C3C5C8] rounded-[12px] focus:outline-none focus:border-[#8B5CF6] transition-all text-[16px]"
        />
      </div>

      <div className="flex flex-col gap-[8px] shrink-0">
        <div className="flex justify-between items-center h-[20px]">
          <label className="text-[14px] font-medium text-[#374151]">
            소개글
          </label>
          <span
            className={`text-[12px] ${values.introduction.length >= 150 ? 'text-red-500' : 'text-[#9CA3AF]'}`}
          >
            {values.introduction.length}/150
          </span>
        </div>
        <textarea
          ref={textareaRef}
          value={values.introduction}
          onChange={(e) => {
            if (e.target.value.length <= 150) {
              onChange({ introduction: e.target.value });
            }
          }}
          placeholder="150자 이내로 소개글을 적어주세요!"
          rows={1}
          className="w-full min-h-[58px] px-[17px] py-[16px] bg-white border border-[#C3C5C8] rounded-[12px] focus:outline-none focus:border-[#8B5CF6] transition-all text-[16px] resize-none overflow-hidden leading-[1.5]"
        />
      </div>

      <div className="flex items-start gap-[28px] w-full h-[74px] shrink-0 mt-[5px]">
        <div className="flex flex-col gap-[4px] w-[177px] h-full items-start">
          <label className="text-[14px] font-medium text-[#374151] leading-[20px]">
            생년월일
          </label>
          <div className="w-full h-[49px] px-[16px] py-[14px] flex items-center bg-white border border-[#D1D5DB] focus-within:border-[#8B5CF6] rounded-[12px]">
            <input
              type="text"
              value={values.birthday}
              onChange={handleBirthChange}
              maxLength={10}
              placeholder="YYYY-MM-DD"
              className="w-full bg-transparent outline-none text-[16px] font-normal text-[#111111] placeholder:text-[#9CA3AF] transition-all"
            />
          </div>
        </div>

        <div
          className="flex flex-col gap-[4px] w-[121px] h-full items-start "
          ref={dropdownRef}
        >
          <label className="text-[14px] font-medium text-[#374151] leading-[20px]">
            성별
          </label>
          <div className="relative w-full ">
            <button
              type="button"
              onClick={() => setIsGenderOpen(!isGenderOpen)}
              className={`w-full h-[49px] px-[16px] py-[14px] flex items-center justify-between bg-white border rounded-[12px] cursor-pointer hover:bg-gray-50 transition-all outline-none 
    ${isGenderOpen ? 'border-[#8B5CF6]' : 'border-[#D1D5DB]'} 
    focus:border-[#8B5CF6]`}
            >
              <span className="text-[16px] font-normal text-[#111111]">
                {values.gender}
              </span>
              <div
                className={`transition-transform duration-200 ${isGenderOpen ? 'rotate-180' : ''}`}
              >
                <DropdownIcon />
              </div>
            </button>

            {isGenderOpen && (
              <div className="absolute top-[54px] left-0 w-full bg-white border border-[#D1D5DB] rounded-[12px] shadow-lg z-10 overflow-hidden">
                <button
                  type="button"
                  onClick={() => {
                    onChange({ gender: '여자' });
                    setIsGenderOpen(false);
                  }}
                  className="w-full px-[16px] py-[12px] text-left text-[15px] hover:bg-gray-100 transition-colors border-b border-[#F3F4F6]"
                >
                  여자
                </button>
                <button
                  type="button"
                  onClick={() => {
                    onChange({ gender: '남자' });
                    setIsGenderOpen(false);
                  }}
                  className="w-full px-[16px] py-[12px] text-left text-[15px] hover:bg-gray-100 transition-colors"
                >
                  남자
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
