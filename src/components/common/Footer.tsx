const footerLinks = ['서비스 소개', '이용약관', '개인정보처리방침', '고객센터'];
const musesInfo =
  '뮤즈(주) | 대표이사 김뮤즈 | 사업자등록번호 000-00-00000 | 통신판매업신고번호 2020-어디어디C-0000 | 호스팅 서비스사업자 : 뮤즈(주)';
const musesAddress = '경기 수박시 박봉구 123 어디건물 A동 101호';

const Footer = () => {
  return (
    <footer className="w-full border-t border-white80 bg-white py-16 px-[72.5px]">
      <div className="mx-auto flex h-full w-full max-w-[1280px] flex-col justify-center px-6 items-center">
        <div className="flex flex-col justify-center items-start text-sm font-mediumFont text-black mb-6 pt-9">
          <span>{musesInfo}</span>
          <span>{musesAddress}</span>
        </div>
        <div className="text-center text-sm font-boldFont text-black60 mb-8">
          뮤즈(주)는 통신판매중개자로서 통신판매의 당사자가 아니며, 입점
          판매자가 등록한 상품, 거래정보 및 거래에 대하여 책임을 지지 않습니다.
        </div>
        <div className="flex justify-center items-start gap-10 mb-10">
          {footerLinks.map((text) => (
            <span
              key={text}
              className="text-center text-sm font-mediumFont text-black60 cursor-pointer hover:text-black"
            >
              {text}
            </span>
          ))}
        </div>

        <div className="text-center text-sm font-mainFont text-black40">
          © 2025 Muses Platform. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
