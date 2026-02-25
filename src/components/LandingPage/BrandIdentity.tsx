import FadeIn from './FadeIn';

export default function BrandIdentity() {
  return (
    <section className="relative w-full border-t border-white/40 backdrop-blur-[2px] flex justify-center px-6 sm:px-12 lg:px-[264.5px] py-24 lg:py-[160px]">
      <div className="w-full max-w-[896px] px-6 flex flex-col justify-center items-center gap-16 lg:gap-40">
        {/* Brand Identity & 텍스트 */}
        <div className="self-stretch inline-flex flex-col justify-center items-center gap-5">
          <div className="self-stretch flex flex-col justify-center items-center">
            <FadeIn delay={200}>
              <div className="text-center justify-center text-solidBlue text-sm font-boldFont uppercase leading-5 tracking-wider">
                Brand Identity
              </div>
            </FadeIn>
          </div>
          <div className="self-stretch flex flex-col justify-center items-center">
            <FadeIn delay={200}>
              <div className="text-center justify-center text-mainBlack text-6xl font-boldFont leading-[78px]">
                우리는 상상력이 현실로 구현되는
                <br />
                가장 아름다운 과정을 지원합니다
              </div>
            </FadeIn>
          </div>
        </div>

        {/* Connect */}
        <div className="self-stretch inline-flex justify-start items-start ml-16">
          <FadeIn delay={200}>
            <div className="inline-flex flex-col justify-center items-start gap-2.5">
              <h3 className="font-boldFont text-4xl text-solidBlue">Connect</h3>
              <p className="text-black80 font-mediumFont text-xl leading-8">
                흩어져 있던 영감과 사람을 연결합니다.
                <br />
                크리에이터와 팬, 기획자와 공간이 만나는 접점에서
                <br />
                새로운 문화가 피어납니다.
              </p>
            </div>
          </FadeIn>
        </div>

        {/* Support */}
        <div className="self-stretch pt-8 flex justify-end mr-16">
          <FadeIn delay={200}>
            <div className="inline-flex flex-col justify-center items-start gap-2.5">
              <h3 className="font-boldFont text-4xl text-solidPink">Support</h3>
              <p className="text-black80 font-mediumFont text-xl leading-8">
                막막했던 대관료, 복잡한 입장 관리.
                <br />
                뮤즈는 크리에이터가 오롯이 무대에만 집중할 수 있도록
                <br />
                가장 든든한 서포터가 됩니다.
              </p>
            </div>
          </FadeIn>
        </div>

        {/* Realize */}
        <div className="self-stretch pt-8 inline-flex justify-start items-start ml-16">
          <FadeIn delay={200}>
            <div className="inline-flex flex-col justify-center items-start gap-2.5">
              <h3 className="font-boldFont text-4xl text-solidPurple">
                Realize
              </h3>
              <p className="text-black80 font-mediumFont text-xl leading-8">
                화면 속의 아이디어가
                <br />
                손에 잡히는 티켓이 되고, 눈앞의 무대가 됩니다.
                <br />
                당신의 꿈을 현실로 만드세요.
              </p>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
