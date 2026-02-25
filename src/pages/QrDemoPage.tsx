import { QRCodeSVG } from 'qrcode.react';
import logo from '../assets/images/icons/logo.png';

const DEMO_NAME = '김*정';
const DEMO_NICK = '푸른 오렌지';
const DEMO_QTY = '1';
const DEMO_REWARD = 'VIP 일반석';

const QrDemoPage = () => {
  const checkinUrl = `https://gkdmsgus.github.io/Muses-/checkin/result?name=${encodeURIComponent(DEMO_NAME)}&nick=${encodeURIComponent(DEMO_NICK)}&qty=${DEMO_QTY}&reward=${encodeURIComponent(DEMO_REWARD)}`;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-purple-50 via-white to-yellow-50 p-8">
      {/* 로고 */}
      <div className="flex items-center gap-2 mb-10">
        <img src={logo} alt="muses" className="w-10 h-10 rounded-xl" />
        <span className="font-black text-2xl text-gray-900">muses</span>
      </div>

      {/* QR 카드 */}
      <div className="bg-white/80 backdrop-blur-sm border border-white rounded-3xl shadow-xl p-8 flex flex-col items-center gap-6 w-80">
        <p className="text-gray-500 text-sm font-medium tracking-wide text-center">
          아래 QR을 스캔하세요
        </p>

        <div className="p-4 bg-white rounded-2xl border border-gray-100 shadow-sm">
          <QRCodeSVG value={checkinUrl} size={200} />
        </div>

        <div className="w-full border-t border-dashed border-gray-200 pt-5 flex flex-col gap-2">
          <InfoRow label="닉네임" value={DEMO_NICK} />
          <InfoRow label="이름" value={DEMO_NAME} />
          <InfoRow label="수량" value={DEMO_QTY} />
          <InfoRow label="리워드" value={DEMO_REWARD} />
        </div>

        <p className="text-gray-400 text-xs text-center break-all">{checkinUrl}</p>
      </div>

      <p className="mt-6 text-gray-400 text-xs text-center">
        핸드폰도 같은 와이파이(또는 핫스팟)에 연결 후 스캔
      </p>
    </div>
  );
};

const InfoRow = ({ label, value }: { label: string; value: string }) => (
  <div className="flex items-center justify-between">
    <span className="text-gray-500 text-sm font-bold">{label}</span>
    <span className="text-gray-800 text-sm">{value}</span>
  </div>
);

export default QrDemoPage;
