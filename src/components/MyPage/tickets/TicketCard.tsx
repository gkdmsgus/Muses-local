// TicketCard.tsx
import { useEffect, useState } from 'react';
import TicketItemCard from './TicketItemCard';
import QrCard from './QrCard';
import { getMyTickets, getCheckinToken } from '../../../api/ticket';
import { mapTicketToItem, type TicketItem } from '../types/ticket';
import { getMyInfo } from '../../../api/user';

interface Props {
  onCountChange?: (count: number) => void;
}

const TicketCard = ({ onCountChange }: Props) => {
  const [tickets, setTickets] = useState<TicketItem[]>([]);
  const [selectedTicket, setSelectedTicket] = useState<TicketItem | null>(null);
  const [selectedToken, setSelectedToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [memberName, setMemberName] = useState('');
  const [memberNick, setMemberNick] = useState('');

  // 티켓 리스트 + 회원 정보 불러오기
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [data, member] = await Promise.all([getMyTickets(), getMyInfo()]);
        const mapped = data.map(mapTicketToItem);
        setTickets(mapped);
        onCountChange?.(mapped.length);
        setMemberName(member.name ?? '');
        setMemberNick(member.nickName ?? '');
      } catch {
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // 카드 선택 시 토큰 발급
  const handleSelect = async (ticketId: string) => {
    try {
      const token = await getCheckinToken(ticketId);
      setSelectedToken(token.ticketToken);

      const found = tickets.find((t) => t.ticketId === ticketId);
      if (found) setSelectedTicket(found);
    } catch {
      console.error('토큰 발급 실패');
    }
  };

  if (loading) return <div>로딩중...</div>;
  if (error) return <div>티켓을 불러오지 못했습니다.</div>;

  return (
    <>
      <div className="flex gap-6 overflow-x-auto pb-6">
        {tickets.map((item) => (
          <TicketItemCard key={item.id} item={item} onSelect={handleSelect} />
        ))}
      </div>

      {selectedTicket && selectedToken && (
        <QrCard
          title={selectedTicket.title}
          seat={selectedTicket.selectedSeat}
          ticketToken={selectedToken}
          memberName={memberName}
          memberNick={memberNick}
          onClose={() => {
            setSelectedTicket(null);
            setSelectedToken(null);
          }}
        />
      )}
    </>
  );
};

export default TicketCard;
