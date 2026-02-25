import ProjectCard from './ProjectCard';
import type { Project, ProjectListResponse } from '../../types/projects';
import { useEffect, useState } from 'react';
import axios from 'axios';
import ENDPOINTS from '../../api/endpoints';

export default function ProjectList() {
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    const fetchProjects = async () => {
      const response = await axios.get<ProjectListResponse>(
        ENDPOINTS.PROJECT_LIST
      );
      if (!response.data.success) {
        console.error(response.data.error);
        return;
      }
      setProjects(response.data.data as Project[]);
      console.log(response.data.data);
    };

    fetchProjects();
  }, []);

  return (
    <div className="w-full max-w-[1232px]">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-8 gap-y-16">
        {projects.map((project: Project) => (
          <ProjectCard key={project.projectId} project={project} />
        ))}
      </div>
    </div>
  );
}
