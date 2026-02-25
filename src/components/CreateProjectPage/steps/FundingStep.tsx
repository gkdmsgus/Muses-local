import type { StepProps } from './StepProps';
import type { FundingData } from '../../../pages/CreateProjectPage';
import { Field, InputFrame } from '../components/FormField';

export default function FundingStep({ data, onChange }: StepProps) {
  const funding = data.funding;

  const updateFunding = (patch: Partial<FundingData>) => {
    onChange('funding', { ...funding, ...patch });
  };

  return (
    <div className="self-stretch pb-4 flex flex-col gap-8">
      <h2 className="text-mainBlack text-2xl font-boldFont leading-8">
        Step 2. 펀딩 계획
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Field label="목표 금액">
          <InputFrame
            rightAdornment={
              <span className="font-boldFont text-black60">원</span>
            }
          >
            <input
              type="number"
              min={0}
              value={funding.target_amount}
              onChange={(e) =>
                updateFunding({
                  target_amount:
                    e.target.value === '' ? '' : Number(e.target.value),
                })
              }
              placeholder="0"
              className="w-full text-mainBlack placeholder:text-black40 font-mainFont focus:outline-none"
            />
          </InputFrame>
        </Field>

        <Field label="진행 방식">
          <InputFrame>
            <span className="w-full text-mainBlack font-mainFont">
              성공해야 리워드 (All or Nothing)
            </span>
          </InputFrame>
        </Field>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Field label="펀딩 시작일">
          <InputFrame>
            <input
              type="date"
              value={funding.startDate}
              onChange={(e) => updateFunding({ startDate: e.target.value })}
              className="w-full text-mainBlack font-mainFont focus:outline-none"
            />
          </InputFrame>
        </Field>

        <Field label="희망 오픈 시간">
          <InputFrame>
            <input
              type="time"
              value={funding.opening}
              onChange={(e) => updateFunding({ opening: e.target.value })}
              className="w-full text-mainBlack font-mainFont focus:outline-none"
            />
          </InputFrame>
        </Field>
      </div>

      <Field label="펀딩 마감일">
        <InputFrame>
          <input
            type="date"
            value={funding.deadline}
            onChange={(e) => updateFunding({ deadline: e.target.value })}
            className="w-full text-mainBlack placeholder:text-black40 font-mainFont focus:outline-none"
          />
        </InputFrame>
      </Field>
    </div>
  );
}
