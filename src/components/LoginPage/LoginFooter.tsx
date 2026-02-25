import React from 'react';
import { Link } from 'react-router-dom';

export function LoginFooter() {
  return (
    <div className="w-full max-w-[382px] h-[24px] flex flex-col items-center justify-center">
      <div className="flex items-center justify-center gap-[8px]">
        <span className="text-mainBlack font-mediumFont text-[16px] leading-[24px] text-center">
          계정이 없으신가요?
        </span>

        <Link
          to="/signup"
          className="text-mainBlack font-mediumFont text-[16px] leading-[24px] underline decoration-solid underline-offset-[auto] hover:text-black80 transition-colors"
        >
          회원가입
        </Link>
      </div>
    </div>
  );
}
