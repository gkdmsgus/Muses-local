import { Lock, Check } from 'lucide-react';

interface Props {
  status: 'PENDING' | 'PROCESSING' | 'DONE';
}

const statusMap = {
  PENDING: {
    text: '지급 대기중',
    icon: <Lock size={20} />,
    color: 'text-[#CA8A04]',
  },
  PROCESSING: {
    text: '처리 중',
    icon: <Lock size={20} />,
    color: 'text-[#CA8A04]',
  },
  DONE: {
    text: '지급 완료',
    icon: <Check size={20} />,
    color: 'text-[#16A34A]',
  },
};

export const PaymentStatusCard = ({ status }: Props) => {
  const { text, icon, color } = statusMap[status];

  return (
    <div className="self-stretch p-4 bg-[#F3E8FF] rounded-xl flex items-center">
      {icon && <div className={`w-5 h-5 ${color}`}>{icon}</div>}
      <div className="pl-3 text-base font-semiBoldFont leading-6">{text}</div>
    </div>
  );
};
