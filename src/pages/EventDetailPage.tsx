import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { fetchEventDetailAPI, type EventDetailData } from '../api/eventAPI';
import EventDetailBanner from '../components/EventDetailPage/EventDetailBanner';
import EventDetailBody from '../components/EventDetailPage/EventDetailBody';

export default function EventDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [detailData, setDetailData] = useState<EventDetailData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getDetail = async () => {
      if (!id) return;
      setLoading(true);
      try {
        const res = await fetchEventDetailAPI(id);
        if (res.success) {
          setDetailData(res.data);
        }
      } catch (err) {
        console.error('상세 정보 로드 실패:', err);
      } finally {
        setLoading(false);
      }
    };

    getDetail();
    window.scrollTo(0, 0);
  }, [id]);

  const goToList = () => {
    navigate('/events');
  };

  const goToPost = (postId: number | null) => {
    if (postId) navigate(`/events/${postId}`);
  };

  if (loading) return <div className="pt-[100px] text-center">로딩 중...</div>;
  if (!detailData)
    return (
      <div className="pt-[100px] text-center">이벤트를 찾을 수 없습니다.</div>
    );
  return (
    <main className="min-h-screen w-full bg-white pt-[72px]">
      <EventDetailBanner
        event={detailData.event}
        onPrev={() => goToPost(detailData.prevId)}
        hasPrev={!!detailData.prevId}
      />
      <EventDetailBody event={detailData.event} onGoToList={goToList} />
    </main>
  );
}
