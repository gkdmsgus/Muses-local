import { useSearchParams } from 'react-router-dom';
import logo from '../assets/images/icons/logo.png';
import bg from '../assets/images/backgrounds/result_bg.png';

const CheckinResultPage = () => {
  const [searchParams] = useSearchParams();

  const name = searchParams.get('name');
  const nick = searchParams.get('nick');
  const qty = searchParams.get('qty');
  const reward = searchParams.get('reward');

  const hasInfo = name && nick && qty && reward;

  return (
    <div
      className="flex justify-center items-center w-full min-h-screen bg-white80 p-4"
      style={{ backgroundImage: `url(${bg})` }}
    >
      {hasInfo ? (
        <div className="flex flex-col items-center w-[385px] h-[352px] rounded-[40px] border border-white bg-white/70 shadow-[0_20px_25px_-5px_rgba(224,231,255,0.5),0_8px_10px_-6px_rgba(224,231,255,0.5)] backdrop-blur-[12px] p-5 box-border overflow-hidden">
          <LogoSection />

          <div className="flex flex-col items-start w-full h-[236px] pt-[20px] pl-[55px]">
            <div className="flex flex-col items-start w-[156px] gap-[12px]">
              <div className="flex items-center gap-[40px] self-stretch">
                <span className="text-black font-boldFont text-[16px] leading-[32px] shrink-0">
                  닉네임
                </span>
                <span className="text-black font-mainFont text-[16px] leading-[32px]">
                  {nick}
                </span>
              </div>

              <div className="flex items-center gap-[54px]">
                <span className="text-black font-boldFont text-[16px] leading-[32px] shrink-0">
                  이름
                </span>
                <span className="text-black font-mainFont text-[16px] leading-[32px]">
                  {name}
                </span>
              </div>

              <div className="flex flex-col items-start justify-center gap-[4px] w-full min-h-[68px]">
                <span className="text-black font-boldFont text-[16px] leading-[32px]">
                  수량
                </span>
                <span className="text-black font-mainFont text-[16px] leading-[32px]">
                  {qty}
                </span>
              </div>

              <div className="flex flex-col items-start justify-center gap-[4px] w-full">
                <span className="text-black font-boldFont text-[16px] leading-[32px]">
                  리워드
                </span>
                <span className="text-black font-mainFont text-[16px] leading-[32px]">
                  {reward}
                </span>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center w-[384.66px] h-[274px] pt-[46px] pb-[105px] px-[94.33px] gap-[45px] rounded-[40px] border border-white bg-white/70 shadow-[0_20px_25px_-5px_rgba(224,231,255,0.5),0_8px_10px_-6px_rgba(224,231,255,0.5)] backdrop-blur-[12px] box-border">
          <LogoSection />
          <p className="text-black font-boldFont text-[16px] leading-[32px] text-center break-keep">
            현장 관리자에게 문의 바랍니다.
          </p>
        </div>
      )}
    </div>
  );
};

const LogoSection = () => (
  <div className="inline-flex justify-center items-center gap-2 w-[118px] h-[46px] shrink-0 mt-[10px]">
    <div
      className="flex w-[46px] h-[46px] justify-center items-center aspect-square rounded-[12px]  bg-cover bg-no-repeat bg-center"
      style={{ backgroundImage: `url(${logo})` }}
    />
    <span className="text-mainBlack font-blackFont text-[20px] leading-[28px] tracking-[-0.5px]">
      muses
    </span>
  </div>
);

export default CheckinResultPage;
