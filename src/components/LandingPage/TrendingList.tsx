import ProjectCard from '../ProjectListPage/ProjectCard';
import axios from 'axios';
import ENDPOINTS from '../../api/endpoints';
import { useEffect, useState } from 'react';
import type { TrendingItem, TrendingListResponse } from '../../types/trending';

interface TrendingListProps {
  index: number;
}

const STEP = 1232;

export default function TrendingList({ index }: TrendingListProps) {
  const [trending, setTrending] = useState<TrendingItem[]>([]);

  useEffect(() => {
    const fetchTrendingList = async () => {
      try {
        const response = await axios.post<TrendingListResponse>(
          ENDPOINTS.LANDING_TRENDING
        );

        if (!response.data.success) {
          console.error(response.data.error);
          return;
        }

        setTrending(response.data.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchTrendingList();
  }, []);

  return (
    <div className="relative w-[1232px] overflow-hidden">
      <div
        className="flex px-1 transition-transform duration-500 ease-out gap-[30px]"
        style={{
          transform: `translateX(-${index * STEP}px)`,
        }}
      >
        {trending.map((project) => (
          <div
            key={project.projectId}
            className="w-fit p-5 border border-white80 rounded-[40px] shadow-xs"
          >
            <ProjectCard
              project={{
                ...project,
                isScheduled: false,
                opening: '',
                attachmentImageUrl: null,
              }}
              posterClassNameValue="h-[422.5px] w-[338px] rounded-[32px] group-hover:shadow-lg transition-all"
              contentClassNameValue="group-hover:-translate-y-[-8px] transition-all"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
