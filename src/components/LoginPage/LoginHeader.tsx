import logo from '../../assets/images/icons/logo.png';

interface LoginHeaderProps {
  subtitle: string;
}

export function LoginHeader({ subtitle }: LoginHeaderProps) {
  return (
    <div className="w-full max-w-[382px] flex flex-col items-start gap-[8px]">
      <div className="w-full h-[46px] flex flex-col items-center self-stretch">
        <div className="flex items-center gap-[8px] w-[114px] h-[46px]">
          <div className="w-[46px] h-[46px] flex items-center justify-center rounded-[12px] overflow-hidden">
            <img
              src={logo}
              alt="Muses Logo"
              className="w-full h-full object-cover"
            />
          </div>

          <span className="text-mainBlack font-logoFont font-bold text-[20px] leading-[28px] tracking-[-0.5px]">
            muses
          </span>
        </div>
      </div>

      <div className="w-full h-[24px] flex flex-col items-center self-stretch">
        <p className="text-mainBlack font-mainFont font-normal text-[16px] leading-[24px] text-center">
          {subtitle}
        </p>
      </div>
    </div>
  );
}
