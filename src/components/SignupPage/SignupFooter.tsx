import { Link } from 'react-router-dom';

export default function SignupFooter() {
  return (
    <div className="w-[382px] h-[24px] flex items-center justify-center mx-auto ">
      <div className="font-['Pretendard'] text-[16px] leading-[24px] text-center flex items-center gap-1">
        <span className="text-[#374151]">이미 계정이 있으신가요?</span>
        <Link
          to="/login"
          className="text-[#374151] font-bold underline underline-offset-4 hover:text-solidPurple transition-colors"
        >
          로그인
        </Link>
      </div>
    </div>
  );
}
