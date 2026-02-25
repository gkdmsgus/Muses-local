import type { StepProps } from './StepProps';
import type { InfoData } from '../../../pages/CreateProjectPage';
import { Info, FileText, CreditCard } from 'lucide-react';
import { InputFrame } from '../components/FormField';

export default function InfoStep({ data, onChange }: StepProps) {
  const info = data.info;

  const updateInfo = (patch: Partial<InfoData>) => {
    onChange('info', { ...info, ...patch });
  };

  return (
    <div className="self-stretch pb-4 flex flex-col gap-8">
      {/* 회색 영역 */}
      <h2 className="text-mainBlack text-2xl font-boldFont leading-8">
        Step 5. 진행자 및 정산 정보
      </h2>

      <div className="self-stretch px-6 pt-6 pb-8 bg-white80 rounded-2xl outline outline-1 outline-offset-[-1px] outline-white80 inline-flex flex-col justify-center items-start gap-4">
        <h3 className="justify-center text-mainBlack text-lg font-boldFont leading-7">
          대표자 기본 정보
        </h3>

        <div className="w-full h-full relative grid grid-cols-2 gap-4">
          <InputFrame>
            <input
              type="text"
              value={info.host_name}
              onChange={(e) => updateInfo({ host_name: e.target.value })}
              placeholder="이름 (실명)"
              className="w-full text-mainBlack placeholder:text-black40 font-mainFont focus:outline-none"
            />
          </InputFrame>
          <InputFrame>
            <input
              type="text"
              value={info.host_birth}
              onChange={(e) => updateInfo({ host_birth: e.target.value })}
              placeholder="생년월일 (YYYY-MM-DD)"
              className="w-full text-mainBlack placeholder:text-black40 font-mainFont focus:outline-none"
            />
          </InputFrame>
          <InputFrame>
            <input
              type="tel"
              value={info.host_phone}
              onChange={(e) => updateInfo({ host_phone: e.target.value })}
              placeholder="연락처"
              className="w-full text-mainBlack placeholder:text-black40 font-mainFont focus:outline-none"
            />
          </InputFrame>
          <InputFrame>
            <input
              type="email"
              value={info.host_email}
              onChange={(e) => updateInfo({ host_email: e.target.value })}
              placeholder="이메일"
              className="w-full text-mainBlack placeholder:text-black40 font-mainFont focus:outline-none"
            />
          </InputFrame>
        </div>

        <div className="w-full">
          <InputFrame>
            <input
              type="text"
              value={info.host_address}
              onChange={(e) => updateInfo({ host_address: e.target.value })}
              placeholder="주소"
              className="w-full text-mainBlack placeholder:text-black40 font-mainFont focus:outline-none"
            />
          </InputFrame>
        </div>
      </div>

      {/* 담당자 정보 영역 */}
      <div className="self-stretch inline-flex flex-col justify-center items-start gap-4">
        <div className="flex items-center self-stretch h-7 gap-2">
          <h3 className="text-mainBlack text-lg font-boldFont leading-7">
            담당자 정보
          </h3>
          <span className="text-black40 text-xs font-mainFont leading-4">
            *Muses와 소통할 담당자의 정보를 입력해주세요.
          </span>
        </div>

        <div className="self-stretch inline-flex justify-center items-start gap-4">
          <InputFrame>
            <input
              type="text"
              value={info.manager_name}
              onChange={(e) => updateInfo({ manager_name: e.target.value })}
              placeholder="담당자 이름"
              className="w-full text-mainBlack placeholder:text-black40 font-mainFont focus:outline-none"
            />
          </InputFrame>
          <InputFrame>
            <input
              type="tel"
              value={info.manager_phone}
              onChange={(e) => updateInfo({ manager_phone: e.target.value })}
              placeholder="담당자 연락처"
              className="w-full text-mainBlack placeholder:text-black40 font-mainFont focus:outline-none"
            />
          </InputFrame>
          <InputFrame>
            <input
              type="email"
              value={info.manager_email}
              onChange={(e) => updateInfo({ manager_email: e.target.value })}
              placeholder="담당자 이메일"
              className="w-full text-mainBlack placeholder:text-black40 font-mainFont focus:outline-none"
            />
          </InputFrame>
        </div>
      </div>

      {/* 정산 서류 제출 영역 */}
      <div className="self-stretch pt-6 border-t border-white80 inline-flex flex-col justify-start items-start gap-4">
        <div className="self-stretch inline-flex justify-start items-center gap-2">
          <CreditCard className="w-5 h-5" />
          <h3 className="justify-center text-mainBlack text-lg font-boldFont leading-7">
            정산 서류 제출
          </h3>
        </div>

        <div className="self-stretch inline-flex justify-center items-start gap-4">
          <label
            className="
            w-full h-[130px] rounded-2xl
            border-2 border-dashed border-[#D1D5DB]
            flex flex-col justify-center items-center
            bg-mainWhite cursor-pointer
            hover:bg-[#EEF2FF] hover:border-[#818CF8]
          "
          >
            <FileText className="w-8 h-8 text-black40 mb-2" />
            <span className="text-black80 text-sm font-boldFont leading-5 mb-1">
              신분증/사업자등록증 사본
            </span>
            <span className="text-black40 text-xs font-mainFont leading-4">
              JPG, PNG, PDF (최대 10MB)
            </span>
            <input type="file" className="hidden" />
          </label>
          <label
            className="
            w-full h-[130px] rounded-2xl
            border-2 border-dashed border-[#D1D5DB]
            flex flex-col justify-center items-center
            bg-mainWhite cursor-pointer
            hover:bg-[#EEF2FF] hover:border-[#818CF8]
          "
          >
            <FileText className="w-8 h-8 text-black40 mb-2" />
            <span className="text-black80 text-sm font-boldFont leading-5 mb-1">
              통장 사본
            </span>
            <span className="text-black40 text-xs font-mainFont leading-4">
              본인/사업자 명의 일치 필수
            </span>
            <input type="file" className="hidden" />
          </label>
        </div>

        <div className="self-stretch p-4 bg-[#F7EBEB] rounded-lg inline-flex justify-start items-start gap-2">
          <Info className="w-4 h-4" />
          <span className="justify-center text-mainBlack text-xs font-mainFont leading-5">
            제출하신 서류는 정산 및 신원 확인 용도로만 사용되며, 개인정보
            처리방침에 따라 안전하게 보관됩니다.
          </span>
        </div>
      </div>
    </div>
  );
}
