import { ArrowRight } from 'lucide-react';
import FadeIn from './FadeIn';
import green3D from '../../assets/images/3D/green3D.png';
import glass3D from '../../assets/images/3D/glass3D.png';
import pink3D from '../../assets/images/3D/pink3D.png';
import string3D from '../../assets/images/3D/string3D.png';
import yellowclover3D from '../../assets/images/3D/yellowclover3D.png';
import yellowcircle3D from '../../assets/images/3D/yellowcircle3D.png';
import cube3D from '../../assets/images/3D/cube3D.png';
import nut3D from '../../assets/images/3D/nut3D.png';
import pufferball3D from '../../assets/images/3D/pufferball3D.png';
import { useNavigate } from 'react-router-dom';

export default function LandingBanner() {
  const navigate = useNavigate();

  return (
    <section className="relative min-h-[675px] flex justify-center overflow-hidden">
      <style>{`
        @keyframes float-slow { 0%, 100% { transform: translate3d(0, 0, 0) rotate(0deg); } 50% { transform: translate3d(0, -20px, 0) rotate(5deg); } }

        @keyframes float-medium { 0%, 100% { transform: translate3d(0, 0, 0) rotate(0deg); } 50% { transform: translate3d(0, -15px, 0) rotate(-5deg); } }

        @keyframes spin-slow { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        
        .animate-float-slow { animation: float-slow 8s ease-in-out infinite; }
        .animate-float-medium { animation: float-medium 6s ease-in-out infinite; }
        .animate-spin-slow { animation: spin-slow 40s linear infinite; }
      `}</style>

      {/* 그라데이션 원 */}
      <div className="absolute top-[0%] right-[-3%] w-[800px] h-[800px] absolute opacity-60 bg-gradient-to-br from-pastelPurple to-pastelBlue rounded-full blur-3xl" />
      <div className="absolute top-[3%] left-[-15%] w-[600px] h-[600px] absolute opacity-60 bg-gradient-to-l from-pastelPink to-pastelPurple rounded-full blur-[50px]" />

      {/* 3D 오브젝트 */}
      <div className="absolute top-[1%] left-[7%] animate-float-slow">
        <img src={green3D} alt="Green3DImage" />
      </div>
      <div className="absolute top-[80%] left-[12%] animate-float-slow">
        <img src={glass3D} alt="Glass3DImage" />
      </div>
      <div className="absolute top-[23%] left-[-12%] animate-float-medium">
        <img src={pink3D} alt="Pink3DImage" />
      </div>
      <div className="absolute top-[-30%] left-[4%] animate-float-slow">
        <img src={string3D} alt="String3DImage" />
      </div>
      {/* <div className="absolute top-[100%] left-[-15%] animate-float-slow">
        <img src={nut3D} alt="Nut3DImage" />
      </div> */}
      <div className="absolute top-[28%] right-[8%] animate-spin-slow">
        <img src={yellowclover3D} alt="Yellowclover3DImage" />
      </div>
      <div className="absolute top-[-45%] right-[-6%] animate-float-medium">
        <img src={yellowcircle3D} alt="Yellowcircle3DImage" />
      </div>
      <div className="absolute top-[50%] right-[-14%] animate-float-medium">
        <img src={cube3D} alt="Black&WhiteCube3DImage" />
      </div>
      {/* <div className="absolute top-[120%] right-[2%] animate-float-slow">
        <img src={pufferball3D} alt="PufferBall3DImage" />
      </div> */}

      {/* 내용없는 컨테이너(위치 잡는 용도) */}
      <div className="relative flex w-full max-w-[1280px] min-h-[684px] items-center justify-center pt-13 px-20">
        {/* 실제 내용 컨테이너 */}
        <div className="flex flex-col items-center w-full max-w-[1231px] gap-8">
          {/* 내용 */}
          <div className="self-stretch inline-flex flex-col justify-start items-center">
            <h1 className="text-center">
              <FadeIn delay={200}>
                <span className="block font-blackFont text-8xl leading-8xl text-mainBlack">
                  Your Space,
                </span>
              </FadeIn>
              <FadeIn delay={400}>
                <span className="block font-blackFont text-8xl leading-[108px] bg-gradient-to-r from-solidPurple to-solidBlue bg-clip-text text-transparent">
                  Our Stage
                </span>
              </FadeIn>
            </h1>
          </div>

          <FadeIn delay={600}>
            <div className="w-[672px] max-w-[672px] inline-flex flex-col justify-start items-center">
              <p className="text-black80 font-mediumFont text-xl text-center">
                기다렸던 팬들과 만나는 가장 확실한 방법,
                <br />
                당신의 시작을 함께 만들어갑니다.
              </p>
            </div>
          </FadeIn>

          <FadeIn delay={800}>
            <div className="pt-4">
              <button
                onClick={() => navigate('/projects')}
                className="flex gap-2 items-center px-10 py-5 shadow-[0px_8px_10px_-6px_rgba(233,213,255,1.00)] shadow-[0px_20px_25px_-5px_rgba(233,213,255,1.00)] rounded-full bg-mainBlack text-white font-boldFont text-xl transition-transform cursor-pointer hover:scale-105"
              >
                프로젝트 시작하기
                <ArrowRight className="w-5 h-5 relative" />
              </button>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
