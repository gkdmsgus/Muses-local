import { ChevronLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import type { PrevNextProps } from './NavigationButtons';

const CreateNavbar = ({ step, onNext }: PrevNextProps) => {
  const navigate = useNavigate();

  return (
    <nav className="absolute left-0 top-0 w-full h-[64px] flex px-6 border-b border-white60 items-center justify-between">
      {/* 왼쪽 영역 */}
      <div className="flex items-center gap-[16px]">
        <button
          onClick={() => navigate('/')}
          className="flex justify-center items-center w-6 h-6 cursor-pointer"
        >
          <ChevronLeft className="text-mainBlack" />
        </button>
        <div className="justify-center text-mainBlack text-lg font-boldFont leading-7">
          프로젝트 만들기
        </div>
      </div>

      <div className="flex items-center gap-[16px]">
        <button className="text-center justify-center text-black40 text-sm font-boldFont leading-5 cursor-pointer hover:text-black80">
          임시저장
        </button>
        <div className="px-5 py-2 bg-mainBlack rounded-full inline-flex flex-col justify-center items-center hover:bg-solidBlue">
          <button
            onClick={onNext}
            className="text-center justify-center text-white text-sm font-boldFont leading-5 cursor-pointer"
          >
            {step === 5 ? '제출하기' : '다음 단계'}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default CreateNavbar;
