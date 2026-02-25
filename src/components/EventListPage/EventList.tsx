import { useState, useEffect, useRef, useCallback } from 'react';
import EventCard from './EventCard';
import { fetchEventsAPI, type EventData } from '../../api/eventAPI';

interface EventListProps {
  keyword: string;
}

export default function EventList({ keyword }: EventListProps) {
  const ITEMS_PER_PAGE = 3;
  const [events, setEvents] = useState<EventData[]>([]);
  const [page, setPage] = useState(0);
  const [isFetching, setIsFetching] = useState(false);
  const [hasNextPage, setHasNextPage] = useState(true);

  const observerTarget = useRef<HTMLDivElement>(null);

  const fetchNextPage = useCallback(
    async (isReset = false) => {
      if (isFetching || (!isReset && !hasNextPage)) return;

      setIsFetching(true);
      const targetPage = isReset ? 0 : page;

      try {
        const response = await fetchEventsAPI({
          keyword: keyword,
          page: targetPage,
          size: ITEMS_PER_PAGE,
        });

        if (response.success && response.data) {
          const newEvents = response.data;

          setEvents((prev) => (isReset ? newEvents : [...prev, ...newEvents]));

          const totalCount = response.page?.total ?? 0;
          const currentTotal = (isReset ? 0 : events.length) + newEvents.length;

          if (newEvents.length < ITEMS_PER_PAGE || currentTotal >= totalCount) {
            setHasNextPage(false);
          } else {
            setPage(targetPage + 1);
            setHasNextPage(true);
          }
        }
      } catch (error) {
        console.error('이벤트 로딩 실패:', error);
        setHasNextPage(false);
      } finally {
        setIsFetching(false);
      }
    },

    [page, isFetching, hasNextPage, events.length, keyword]
  );

  useEffect(() => {
    setEvents([]);
    setPage(0);
    setHasNextPage(true);

    fetchNextPage(true);
  }, [keyword]);

  useEffect(() => {
    if (!observerTarget.current || !hasNextPage || isFetching) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          fetchNextPage();
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(observerTarget.current);
    return () => observer.disconnect();
  }, [fetchNextPage, hasNextPage, isFetching]);

  return (
    <div className="flex flex-col gap-[32px] w-full items-center">
      {events.map((event) => (
        <EventCard key={event.eventId} event={event} />
      ))}

      {!isFetching && events.length === 0 && (
        <p className="mt-10 text-gray-500 font-mainFont">
          검색 결과가 없습니다.
        </p>
      )}

      {hasNextPage && (
        <div
          ref={observerTarget}
          className="w-full h-[20px] flex items-center justify-center"
        >
          {isFetching && (
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-solidPink"></div>
          )}
        </div>
      )}
    </div>
  );
}
