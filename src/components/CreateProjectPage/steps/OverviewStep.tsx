import type { StepProps } from './StepProps';
import { Field, InputFrame } from '../components/FormField';
import { Upload } from 'lucide-react';

export default function OverviewStep({ data, onChange }: StepProps) {
  const age = data.age_limit;

  return (
    <div className="self-stretch pb-4 flex flex-col gap-8">
      <h2 className="text-mainBlack text-2xl font-boldFont leading-8">
        Step 1. 프로젝트 기본 정보
      </h2>

      <Field label="프로젝트 제목 *">
        <InputFrame>
          <input
            type="text"
            value={data.title}
            onChange={(e) => onChange('title', e.target.value)}
            aria-required="true"
            placeholder="예) 밴드 '새벽'의 첫 단독 콘서트"
            className="w-full text-mainBlack placeholder:text-black40 font-mainFont focus:outline-none"
          />
        </InputFrame>
      </Field>

      <Field label="대표 이미지 (포스터)">
        <label
          className="
            h-48 rounded-2xl
            border-2 border-dashed border-[#D1D5DB]
            flex flex-col justify-center items-center
            bg-mainWhite cursor-pointer
            hover:bg-[#EEF2FF] hover:border-[#818CF8]
          "
        >
          <Upload className="text-black40 mb-2" />
          <span className="text-black40 text-sm font-mainFont leading-5">
            이미지를 드래그하거나 클릭하여 업로드
          </span>
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => {
              const file = e.target.files?.[0] ?? null;
              onChange('thumbnail', file);
            }}
          />
        </label>
      </Field>

      <Field
        label={
          <div className="flex items-center gap-4">
            <span>태그 정보</span>
            <span className="text-black40 text-[10px] font-mainFont leading-4">
              *최대 4개까지 입력 가능
            </span>
          </div>
        }
      >
        <InputFrame>
          <input
            type="text"
            placeholder="#태그 입력 (Enter)"
            className="w-full text-mainBlack placeholder:text-black40 font-mainFont focus:outline-none"
          />
        </InputFrame>
      </Field>

      {/* 후원 가능 연령 */}
      <Field label="후원 가능 연령">
        <div className="flex gap-4">
          {/* 전체 이용가 */}
          <label
            className={`
              flex-1 p-4 bg-white rounded-xl cursor-pointer
              flex items-center gap-3 border
              ${age === 'ALL' ? 'border-mainBlack' : 'border-white60'}
            `}
            onClick={() => onChange('age_limit', 'ALL')}
          >
            <input
              type="radio"
              name="age"
              value="ALL"
              checked={age === 'ALL'}
              readOnly
              className="hidden"
            />

            <div
              className={`
                w-4 h-4 rounded-full border flex items-center justify-center
                ${age === 'ALL' ? 'border-mainBlack' : 'border-black40'}
              `}
            >
              {age === 'ALL' && (
                <div className="w-2.5 h-2.5 bg-mainBlack rounded-full" />
              )}
            </div>

            <span className="text-mainBlack text-sm font-mediumFont">
              전체 이용가
            </span>
          </label>

          {/* 성인 */}
          <label
            className={`
              flex-1 p-4 bg-white rounded-xl cursor-pointer
              flex items-center gap-3 border
              ${age === 'ADULT' ? 'border-mainBlack' : 'border-white60'}
            `}
            onClick={() => onChange('age_limit', 'ADULT')}
          >
            <input
              type="radio"
              name="age"
              value="ADULT"
              checked={age === 'ADULT'}
              readOnly
              className="hidden"
            />

            <div
              className={`
                w-4 h-4 rounded-full border flex items-center justify-center
                ${age === 'ADULT' ? 'border-mainBlack' : 'border-black40'}
              `}
            >
              {age === 'ADULT' && (
                <div className="w-2.5 h-2.5 bg-mainBlack rounded-full" />
              )}
            </div>

            <span className="text-mainBlack text-sm font-mediumFont">
              성인 (만 19세 이상)
            </span>
          </label>
        </div>
      </Field>

      {/* 프로젝트 간략 소개 */}
      <Field label="프로젝트 간략 소개">
        <InputFrame>
          <textarea
            value={data.summary}
            onChange={(e) => onChange('summary', e.target.value)}
            placeholder="프로젝트를 한 문장으로 소개해 주세요."
            className="
              w-full resize-none min-h-[120px]
              text-mainBlack placeholder:text-black40
              font-mainFont focus:outline-none
            "
          />
        </InputFrame>
      </Field>
    </div>
  );
}
