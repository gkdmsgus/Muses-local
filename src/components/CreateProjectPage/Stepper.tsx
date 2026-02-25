import { Check } from 'lucide-react';

interface StepperProps {
  currentStep: number;
}

const STEPS = ['개요', '펀딩', '리워드', '스토리', '정보'];

export default function Stepper({ currentStep }: StepperProps) {
  return (
    <div className="relative flex justify-between items-center self-stretch w-full">
      {/* 가로 줄 (항상 뒤) */}
      <div className="absolute left-0 right-0 top-[16px] h-0.5 bg-white60 z-0" />

      <div
        className="absolute top-[16px] left-0 h-0.5 bg-mainBlack z-0 transition-all origin-left"
        style={{
          width: `${((currentStep - 1) / (STEPS.length - 1)) * 100}%`,
        }}
      />

      {STEPS.map((label, index) => {
        const stepNumber = index + 1;
        const isCompleted = stepNumber < currentStep;
        const isCurrent = stepNumber === currentStep;
        const isActive = isCompleted || isCurrent;

        return (
          <div
            key={label}
            className="z-10 inline-flex flex-col items-center gap-2"
          >
            <div
              className={`w-8 h-8 bg-white rounded-full outline outline-2 outline-offset-[-2px]
                flex justify-center items-center
                ${isActive ? 'outline-mainBlack' : 'outline-white60'}
              `}
            >
              <span
                className={`text-sm font-boldFont ${
                  isActive ? 'text-mainBlack' : 'text-black40'
                }`}
              >
                {isCompleted ? (
                  <Check className="w-4 h-4 text-mainBlack" />
                ) : (
                  stepNumber
                )}
              </span>
            </div>

            <span
              className={`text-[10px] font-boldFont ${
                isActive ? 'text-mainBlack' : 'text-black40'
              }`}
            >
              {label}
            </span>
          </div>
        );
      })}
    </div>
  );
}
