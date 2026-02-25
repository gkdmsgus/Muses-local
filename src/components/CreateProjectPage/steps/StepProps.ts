import type { ProjectData } from '../../../pages/CreateProjectPage';

export interface StepProps {
  data: ProjectData;
  onChange: (key: keyof ProjectData, value: unknown) => void;
}
