export interface Project {
  projectId: number;
  region: string;
  tags: string[];
  thumbnailUrl: string;
  title: string;
  achieveRate: number;
  deadline: string;
  fundingStatus: 'FUNDING' | 'CLOSING' | 'SUCCESS' | 'FAIL';
  isScheduled: boolean;
  opening: string;
  attachmentImageUrl: string | null;
  dday: number;
}

export type ProjectListResponse = {
  success: boolean;
  data: Project[];
  page: { offset: number; limit: number; total: number };
  error?: { code: string; message: string; detail: string };
};

export interface InterestProjectCardProps {
  location: string;
  status: string;
  tags: string[];
  title: string;
  progress: number;
  dday: string;
  projectId: number;
}
