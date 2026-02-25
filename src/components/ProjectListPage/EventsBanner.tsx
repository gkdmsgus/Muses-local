import { useState, useEffect } from 'react';
import { School } from 'lucide-react';

interface Event {
  id: number;
  title: string;
  description: string;
  backgroundColor: string;
  tag: string;
}

//더미데이터, 추후 API 연동 시 삭제
const EVENTS: Event[] = [
  {
    id: 1,
    title: 'University Collaboration Week',
    description:
      '전국 대학생 졸업작품 특별 기획전. \n동아리, 학과 단위 프로젝트라면 누구나 참여 가능!',
    backgroundColor:
      'bg-gradient-to-br from-teal-400 via-emerald-500 to-green-500',
    tag: 'EVENT',
  },
  {
    id: 2,
    title: 'Spring Art Festival 2025',
    description:
      '봄을 맞이하여 개최되는 예술 페스티벌. \n다양한 장르의 작품과 공연을 만나보세요!',
    backgroundColor: 'bg-gradient-to-br from-pink-400 via-rose-500 to-red-500',
    tag: 'EVENT',
  },
  {
    id: 3,
    title: 'Indie Music Showcase',
    description:
      '독립 음악 아티스트들의 특별 무대. \n새로운 사운드를 발견하고 함께 즐겨요!',
    backgroundColor:
      'bg-gradient-to-br from-purple-400 via-indigo-500 to-blue-500',
    tag: 'EVENT',
  },
  {
    id: 4,
    title: 'Creative Design Expo',
    description:
      '창의적인 디자인 작품들이 한 자리에 모입니다. \n트렌드를 선도하는 디자이너들을 만나보세요!',
    backgroundColor:
      'bg-gradient-to-br from-amber-400 via-orange-500 to-yellow-500',
    tag: 'EVENT',
  },
];

export default function EventsBanner() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % EVENTS.length);
    }, 5000); // 5초마다 실행

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className="relative w-full h-fit min-h-[320px] max-w-[1247px] rounded-[40px] overflow-hidden mb-16 font-mainFont"
      style={{
        boxShadow:
          '0 20px 25px -5px rgba(0, 0, 0, 0.10), 0 8px 10px -6px rgba(0, 0, 0, 0.10)',
      }}
    >
      {/* 슬라이드 컨테이너 */}
      <div
        className="flex transition-transform duration-500 ease-in-out h-full"
        style={{
          transform: `translateX(-${currentIndex * 100}%)`,
        }}
      >
        {EVENTS.map((event) => (
          <div
            key={event.id}
            className="relative w-full shrink-0 min-h-[320px] py-[43px] px-16"
          >
            {/* 배경 */}
            <div className={`absolute inset-0 ${event.backgroundColor}`}>
              <div className="absolute inset-0 opacity-20">
                <div
                  className="absolute inset-0"
                  style={{
                    backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(255,255,255,0.1) 10px, rgba(255,255,255,0.1) 20px)`,
                  }}
                ></div>
              </div>
            </div>

            {/* 콘텐츠 */}
            <div className="relative z-10 h-full flex flex-col justify-center">
              {/* EVENT 태그 */}
              <div className="flex items-center gap-2 mb-4 text-white bg-white/20 px-4 py-1.5 rounded-full w-fit border border-white/30">
                <School className="w-3 h-3 text-white" />
                <span className="text-[12px] font-boldFont">{event.tag}</span>
              </div>

              {/* 메인 타이틀 */}
              <h1 className="text-5xl text-white mb-4 font-blackFont">
                {event.title}
              </h1>

              {/* 설명 텍스트 */}
              <p className="text-base text-white/90 max-w-2xl whitespace-pre-line mb-8">
                {event.description}
              </p>
              {/* 버튼 */}
              <button
                className="w-fit bg-white text-[#4F46E5] rounded-full font-boldFont px-8 py-3 hover:bg-[#EEF2FF] transition-colors cursor-pointer"
                style={{
                  boxShadow:
                    '0 10px 15px -3px rgba(0, 0, 0, 0.10), 0 4px 6px -4px rgba(0, 0, 0, 0.10)',
                }}
              >
                기획전 보기
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* 하단 인디케이터 */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-20 flex gap-2">
        {EVENTS.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`rounded-full transition-all cursor-pointer ${
              index === currentIndex
                ? 'w-5 h-2 bg-white'
                : 'w-2 h-2 bg-white/50 hover:bg-white/70'
            }`}
            aria-label={`이벤트 ${index + 1}로 이동`}
          />
        ))}
      </div>
    </div>
  );
}
