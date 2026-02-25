import { useState } from 'react';
import CreatorType from '../updatecreator/CreatorType';

const CreatorEmptySection = () => {
  const [open, setOpen] = useState(false);
  return (
    <div className="self-stretch p-16 bg-white rounded-[40px] shadow-xs border border-white80 inline-flex flex-col justify-start items-center">
      <div className="w-24 h-28 pb-6 flex flex-col justify-start items-start">
        <div className="w-24 h-24 bg-white80 rounded-full inline-flex justify-center items-center">
          <div className="text-center justify-center text-mainBlack text-4xl font-mainFont leading-10">
            🚀
          </div>
        </div>
      </div>
      <div className="pb-3 flex flex-col justify-start items-start">
        <div className="flex flex-col justify-start items-center">
          <div className="text-center justify-center text-mainBlack text-2xl font-boldFont leading-8">
            아직 크리에이터가 아니신가요?
          </div>
        </div>
      </div>
      <div className="w-72 h-20 max-w-96 relative">
        <div className="max-w-96 left-0 top-[-0.63px] absolute inline-flex flex-col justify-start items-center">
          <div className="text-center justify-center text-black60 text-sm font-mainFont leading-6">
            나만의 프로젝트를 개설하고, 팬들과 소통해보세요.
            <br />
            간단한 인증 절차 후 바로 시작할 수 있습니다.
          </div>
        </div>
      </div>
      <button
        onClick={() => setOpen(true)}
        className="px-8 py-4 bg-[#F97316] rounded-xl shadow-lg shadow-[rgba(254,215,170,1.00)] flex flex-col justify-center items-center overflow-hidden transition cursor-pointer hover:bg-[#EA580C]"
      >
        <div className="text-center justify-center text-white text-lg font-boldFont leading-7">
          크리에이터 전환 신청하기
        </div>
      </button>
      {open && <CreatorType onClose={() => setOpen(false)} />}
    </div>
  );
};

export default CreatorEmptySection;
