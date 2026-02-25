interface BackButtonProps {
  onClick?: () => void;
  text?: string;
}

export function BackButton({ onClick, text = '뒤로 가기' }: BackButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="w-[88px] h-[24px] flex items-center bg-transparent border-none p-0 cursor-pointer group font-mainFont"
    >
      <div className="flex w-[28px] h-[20px] pr-[8px] items-start justify-center transition-transform group-hover:-translate-x-1">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
        >
          <path
            d="M10.0001 15.8337L4.16675 10.0003L10.0001 4.16699"
            stroke="#111827"
            strokeWidth="1.66667"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M15.8334 10H4.16675"
            stroke="#111827"
            strokeWidth="1.66667"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>

      <span className="text-mainBlack font-normal text-[16px] leading-[24px]">
        {text}
      </span>
    </button>
  );
}
