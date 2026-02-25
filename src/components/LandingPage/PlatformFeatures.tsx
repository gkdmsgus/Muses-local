import safepayment from '../../assets/images/safepayment.png';
import cheering from '../../assets/images/cheering.png';
import smartentrysolution from '../../assets/images/smartentrysolution.png';
import FadeIn from './FadeIn';

export default function PlatformFeatures() {
  return (
    <section className="relative w-full px-[72.5px] py-40 bg-color-white--50%/50 inline-flex flex-col justify-center items-center">
      <div className="w-full max-w-[1280px] px-6 flex flex-col justify-start items-start gap-20">
        {/* PlatForm Features */}
        <div className="self-stretch flex flex-col justify-start items-center">
          <FadeIn delay={200}>
            <div className="text-center justify-center text-color-azure-17 text-3xl font-boldFont leading-9">
              Platform Features
            </div>
          </FadeIn>
        </div>

        {/* 카드 배치 */}
        <div className="w-full grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 justify-items-center">
          {/* Safe Payment */}
          <FadeIn delay={300}>
            <div className="w-96 h-[377px] pt-[38.79px] pb-16 flex justify-center items-center gap-10 flex-1 relative bg-white/70 rounded-[40px] shadow-[0px_8px_10px_-6px_rgba(224,231,255,0.50)] outline-1 outline-offset-1 outline-white backdrop-blur-md overflow-hidden transition-all duration-300 ease-out hover:-translate-y-2 hover:shadow-[0px_12px_20px_-6px_rgba(165,180,252,0.6)]">
              <div className="flex flex-col items-center gap-10">
                <img
                  src={safepayment}
                  alt="Safe Payment"
                  className="w-[224px] h-[172px]"
                />

                <div className="flex flex-col items-start">
                  <div className="w-48 h-8 text-mainBlack text-2xl font-boldFont leading-8">
                    Safe Payment
                  </div>
                  <div className="w-[302px] h-[30px] text-black80 text-lg font-mainFont leading-7">
                    후원부터 최종 정산까지 모든 결제 과정을 안전하게 보호합니다.
                  </div>
                </div>
              </div>
            </div>
          </FadeIn>

          {/* Cheering */}
          <FadeIn delay={400}>
            <div className="w-96 h-[377px] relative bg-white/70 rounded-[40px] shadow-[0px_8px_10px_-6px_rgba(224,231,255,0.50)] outline-1 outline-offset-1 outline-white backdrop-blur-md overflow-hidden transition-all duration-300 ease-out hover:-translate-y-2 hover:shadow-[0px_12px_20px_-6px_rgba(165,180,252,0.6)]">
              <img
                src={cheering}
                alt="Cheering"
                className="w-[355px] h-[222px] left-[13.83px] top-[12.28px] absolute"
              />

              <div className="w-48 h-8 left-[40.84px] top-[250.33px] absolute justify-center text-mainBlack text-2xl font-boldFont leading-8">
                Cheering
              </div>
              <div className="w-72 h-7 left-[40.84px] top-[285px] absolute justify-center text-black80 text-lg font-mainFont leading-7">
                후원과 동시에 전하는 응원 메시지로 끈끈한 유대를 형성합니다.
              </div>
            </div>
          </FadeIn>

          {/* Smart Entry Solution */}
          <FadeIn delay={500}>
            <div className="w-96 h-[377px] relative bg-white/70 rounded-[40px] shadow-[0px_8px_10px_-6px_rgba(224,231,255,0.50)] outline-1 outline-offset-1 outline-white backdrop-blur-md overflow-hidden transition-all duration-300 ease-out hover:-translate-y-2 hover:shadow-[0px_12px_20px_-6px_rgba(165,180,252,0.6)]">
              <img
                src={smartentrysolution}
                alt="Smart Entry Solution"
                className="w-[200px] h-[172px] left-[92.33px] top-[37.34px] absolute"
              />

              <div className="w-64 h-8 left-[40.84px] top-[250.33px] absolute justify-center text-mainBlack text-2xl font-boldFont leading-8">
                Smart Entry Solution
              </div>
              <div className="w-72 h-7 left-[40.84px] top-[285px] absolute justify-center text-black80 text-lg font-mainFont leading-7">
                모바일 QR 시스템 하나로 복잡한 입장 절차를 스마트하게
                관리하세요.
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
