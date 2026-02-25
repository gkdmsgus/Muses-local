import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';

import ProjectTabs from './components/ProjectTabs';
import DashboardTab from './tabs/dashboard/DashboardTab';
import SettingTab from './tabs/SettingTab';
import MakersTab from './tabs/MakersTab';
import SettlementTab from './tabs/SettlementTab';

import type { Project } from '../types/project';
import { fetchMyCreatorProjects } from '../../../api/user';

type ProjectTab = 'dashboard' | 'setting' | 'makers' | 'settlement';

const ProjectResultPage = () => {
  const { projectId } = useParams<{ projectId: string }>();

  const [project, setProject] = useState<Project | null>(null);
  const [activeTab, setActiveTab] = useState<ProjectTab>('dashboard');

  const numericProjectId = projectId ? Number(projectId) : undefined;

  useEffect(() => {
    if (!projectId) return;

    const load = async () => {
      try {
        const list = await fetchMyCreatorProjects();
        const found = list.find(
          (p: Project) => String(p.projectId) === projectId
        );
        setProject(found ?? null);
      } catch (error) {
        console.error('프로젝트 로딩 실패:', error);
      }
    };

    load();
  }, [projectId]);

  const renderTab = () => {
    if (!numericProjectId) {
      return (
        <div className="w-[1425px] min-h-[713px] pb-8 flex flex-col items-center justify-center gap-8">
          <div className="text-black60 text-lg">
            프로젝트를 찾을 수 없습니다.
          </div>
        </div>
      );
    }

    switch (activeTab) {
      case 'dashboard':
        return <DashboardTab />;
      case 'setting':
        return <SettingTab projectId={numericProjectId} />;
      case 'makers':
        return <MakersTab projectId={numericProjectId} />;
      case 'settlement':
        return <SettlementTab projectId={numericProjectId} />;
      default:
        return null;
    }
  };

  return (
    <div className="w-full min-h-screen mt-30 bg-[#F8F9FC] to-color-grey-96">
      <ProjectTabs
        activeTab={activeTab}
        onChange={setActiveTab}
        projectTitle={project?.title ?? ''}
        projectStatus={project?.fundingStatus}
      />

      <div className="flex justify-center pt-10">{renderTab()}</div>
    </div>
  );
};

export default ProjectResultPage;
