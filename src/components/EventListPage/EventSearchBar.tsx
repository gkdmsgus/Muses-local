import { useState, type KeyboardEvent } from 'react';

interface EventSearchBarProps {
  onSearch: (keyword: string) => void;
}
export default function EventSearchBar({ onSearch }: EventSearchBarProps) {
  const [keyword, setKeyword] = useState('');

  // 엔터 키 입력 시 검색 실행
  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      onSearch(keyword);
    }
  };
  return (
    <div className="w-[448px] mx-auto flex flex-col items-start">
      {/* 검색 아이콘과 입력창을 감싸는 컨테이너 */}
      <div className="relative w-full">
        {/* 검색 아이콘 (SVG) */}
        <div
          className="absolute left-[16px] top-[14px] w-[20px] h-[20px]"
          onClick={() => onSearch(keyword)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
          >
            <path
              d="M9.16667 15.8333C12.8486 15.8333 15.8333 12.8486 15.8333 9.16667C15.8333 5.48477 12.8486 2.5 9.16667 2.5C5.48477 2.5 2.5 5.48477 2.5 9.16667C2.5 12.8486 5.48477 15.8333 9.16667 15.8333Z"
              stroke="#9CA3AF"
              strokeWidth="1.66667"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M17.4998 17.5001L13.9165 13.9167"
              stroke="#9CA3AF"
              strokeWidth="1.66667"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        {/* 실제 입력창 */}
        <input
          type="text"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="이벤트 검색"
          className="w-full h-[48px] pl-[48px] pr-[16px] py-[13.5px] rounded-full border border-white60 bg-mainWhite shadow-sm focus:outline-none placeholder:text-black40 font-mainFont"
        />
      </div>
    </div>
  );
}
