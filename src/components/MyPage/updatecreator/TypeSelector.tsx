import { Briefcase, Building2, User } from 'lucide-react';

type Creator = 'person' | 'solo' | 'corporate';

interface TypeSelectorProps {
  onSelect: (type: Creator) => void;
}

export const TypeSelector = ({ onSelect }: TypeSelectorProps) => {
  return (
    <div className="self-stretch flex flex-col justify-start items-start gap-8">
      {/* 설명 영역 */}
      <div className="self-stretch flex flex-col justify-start items-start gap-2">
        <div className="self-stretch flex flex-col justify-start items-center">
          <div className="text-center justify-center text-color-azure-11 text-2xl font-black font-['Pretendard'] leading-8">
            어떤 유형으로 활동하시나요?
          </div>
        </div>
        <div className="self-stretch flex flex-col justify-start items-center">
          <div className="text-center justify-center text-color-grey-46 text-base font-normal font-['Pretendard_Variable'] leading-6">
            유형에 따라 필요한 서류가 달라집니다.
          </div>
        </div>
      </div>

      {/* 버튼 영역 */}
      <div className="self-stretch inline-flex justify-center items-start gap-4">
        {/* 개인 */}
        <button
          type="button"
          onClick={() => onSelect('person')}
          data-variant="1"
          className="group w-48 h-42 flex-1 self-stretch relative rounded-3xl border border-white80 transition hover:border-solidBlue hover:bg-pastelBlue cursor-pointer"
        >
          <div className="w-14 h-14 left-[68px] top-[26px] absolute bg-white80 rounded-full inline-flex justify-center items-center">
            <User className="transition group-hover:text-solidBlue" />
          </div>
          <div className="w-36 left-[26px] top-[98px] absolute inline-flex flex-col justify-start items-center">
            <div className="text-center justify-center text-[#1F2937] text-base font-boldFont leading-6">
              개인
            </div>
          </div>
          <div className="w-36 left-[26px] top-[126px] absolute inline-flex flex-col justify-start items-center">
            <div className="text-center justify-center text-black40 text-xs font-mainFont leading-4">
              주민등록번호 기반
            </div>
          </div>
        </button>

        {/* 개인사업자 */}
        <button
          type="button"
          onClick={() => onSelect('solo')}
          data-variant="2"
          className="group w-48 h-42 flex-1 self-stretch relative rounded-3xl border border-white80 transition hover:border-solidBlue hover:bg-pastelBlue cursor-pointer"
        >
          <div className="w-14 h-14 left-[68px] top-[26px] absolute bg-white80 rounded-full inline-flex justify-center items-center">
            <Briefcase className="transition group-hover:text-solidBlue" />
          </div>
          <div className="w-36 left-[26px] top-[98px] absolute inline-flex flex-col justify-start items-center">
            <div className="text-center justify-center text-[#1F2937] text-base font-boldFont leading-6">
              개인사업자
            </div>
          </div>
          <div className="w-36 left-[26px] top-[126px] absolute inline-flex flex-col justify-start items-center">
            <div className="text-center justify-center text-black40 text-xs font-mainFont leading-4">
              사업자등록번호 필요
            </div>
          </div>
        </button>

        {/* 법인 */}
        <button
          type="button"
          onClick={() => onSelect('corporate')}
          data-variant="3"
          className="group w-48 h-42 flex-1 self-stretch relative rounded-3xl border border-white80 transition hover:border-solidBlue hover:bg-pastelBlue cursor-pointer"
        >
          <div className="w-14 h-14 left-[68px] top-[26px] absolute bg-white80 rounded-full inline-flex justify-center items-center">
            <Building2 className="transition group-hover:text-solidBlue" />
          </div>
          <div className="w-36 left-[26px] top-[98px] absolute inline-flex flex-col justify-start items-center">
            <div className="text-center justify-center text-[#1F2937] text-base font-boldFont leading-6">
              법인사업자
            </div>
          </div>
          <div className="w-36 left-[26px] top-[126px] absolute inline-flex flex-col justify-start items-center">
            <div className="text-center justify-center text-black40 text-xs font-mainFont leading-4">
              법인등록번호 필요
            </div>
          </div>
        </button>
      </div>
    </div>
  );
};

