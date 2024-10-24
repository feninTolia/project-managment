import { Project } from '@/state/types';
import { format } from 'date-fns';
import React from 'react';

type Props = {
  project: Project;
};

const ProjectCard = ({ project }: Props) => {
  return (
    <div className="mb-3 bg-white dark:bg-dark-secondary shadow rounded-md p-6 flex flex-col gap-2">
      <p>
        <strong>ID: </strong>
        {project.id}
      </p>
      <p>
        <strong>Name: </strong>
        {project.name}
      </p>
      <p>
        <strong>Description: </strong>
        {project.description}
      </p>
      <p>
        <strong>Start Date: </strong>
        {project.startDate
          ? format(new Date(project.startDate), 'P')
          : 'Not set'}
      </p>
      <p>
        <strong>End Date: </strong>
        {project.endDate ? format(new Date(project.endDate), 'P') : 'Not set'}
      </p>
    </div>
  );
};

export default ProjectCard;
