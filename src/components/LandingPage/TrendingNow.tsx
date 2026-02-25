import { ArrowRight, ArrowLeft } from 'lucide-react';
import TrendingList from './TrendingList';
import { useState } from 'react';
import FadeIn from './FadeIn';

export default function TrendingNow() {
  const [index, setIndex] = useState(0);

  const MAX_INDEX = 1;

  const handleNext = () => {
    setIndex((prev) => Math.min(prev + 1, MAX_INDEX));
  };

  const handlePrev = () => {
    setIndex((prev) => Math.max(prev - 1, 0));
  };
  return (
    <section className="relative w-full px-20 pt-40 bg-linear-to-b from-color-white--0%/0 to-color-white--80%/80 inline-flex flex-col justify-center items-center overflow-hidden">
      <div className="w-full max-w-[1280px] h-[836.5px] px-6 inline-flex flex-col justify-start items-start gap-6">
        {/* 상단 제목과 버튼 */}
        <div className="self-stretch inline-flex justify-between items-end">
          <FadeIn delay={200}>
            <div className="inline-flex flex-col justify-start items-start gap-4">
              <h2 className="justify-center font-blackFont text-5xl leading-[48px]">
                Trending Now
              </h2>
              <p className="justify-center font-mediumFont text-xl text-black60 leading-7">
                지금 가장 뜨거운 크리에이터들의 무대
              </p>
            </div>
          </FadeIn>
          <FadeIn delay={200}>
            <div className="inline-flex justify-start items-start gap-2">
              <button
                onClick={handlePrev}
                className="w-14 h-14 rounded-full border border-white60 inline-flex justify-center items-center cursor-pointer hover:text-white hover:bg-mainBlack"
              >
                <ArrowLeft className="w-6 h-6 relative" />
              </button>
              <button
                onClick={handleNext}
                className="w-14 h-14 rounded-full border border-white60 inline-flex justify-center items-center cursor-pointer hover:text-white hover:bg-mainBlack"
              >
                <ArrowRight className="w-6 h-6 relative" />
              </button>
            </div>
          </FadeIn>
        </div>

        {/* 카드 */}
        <FadeIn delay={200}>
          <TrendingList index={index} />
        </FadeIn>
      </div>
    </section>
  );
}
