'use client';
import { useAppSelector } from '@/app/redux';
import Header from '@/components/Header/Header';
import { useGetProjectsQuery } from '@/state/api';
import { DisplayOption, Gantt, ViewMode } from 'gantt-task-react';
import 'gantt-task-react/dist/index.css';
import { ChangeEvent, useMemo, useState } from 'react';

type TaskTypeItems = 'task' | 'milestone' | 'project';

const Timeline = () => {
  const isDarkMode = useAppSelector((state) => state.global.isDarkMode);
  const { data: projects, isError, isLoading } = useGetProjectsQuery();
  const [displayOptions, setDisplayOptions] = useState<DisplayOption>({
    viewMode: ViewMode.Month,
    locale: 'en-US',
  });

  const ganttProjects = useMemo(() => {
    return (
      projects?.map((project) => ({
        start: new Date(project.startDate as string),
        end: new Date(project.endDate as string),
        name: project.name,
        id: `Project-${project.id}`,
        type: 'project' as TaskTypeItems,
        progress: 50,
        isDisabled: false,
      })) || []
    );
  }, [projects]);

  const handleViewModeChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setDisplayOptions((prev) => ({
      ...prev,
      viewMode: event?.target.value as ViewMode,
    }));
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (isError) {
    return <p>An error occurred while fetching projects</p>;
  }

  if (!projects || !(projects.length > 0)) {
    return (
      <div className="px-4  pt-5 xl:px-6">
        <Header name="No projects yet" />
      </div>
    );
  }

  return (
    <div className="max-w-full p-8">
      <div className="flex flex-wrap items-center justify-between gap-2 py-5">
        <Header name="Projects Timeline" className="w-fit mb-0" />
        <div className=" relative inline-block w-64">
          <select
            value={displayOptions.viewMode}
            onChange={handleViewModeChange}
            className=" focus:shadow-outline block w-full appearance-none rounded border border-gray-400 bg-white px-4 py-2 pr-8 leading-tight shadow hover:border-gray-500 focus:outline-none dark:border-dark-secondary dark:bg-dark-secondary"
          >
            <option value={ViewMode.Day} label="Day" />
            <option value={ViewMode.Week} label="Week" />
            <option value={ViewMode.Month} label="Month" />
          </select>
        </div>
      </div>

      <div className="overflow-hidden rounded-md bg-white shadow dark:bg-dark-secondary">
        <div className="timeline">
          <Gantt
            tasks={ganttProjects}
            {...displayOptions}
            columnWidth={displayOptions.viewMode === ViewMode.Month ? 150 : 100}
            listCellWidth="100px"
            projectBackgroundColor={isDarkMode ? '#101214' : '#1f2937'}
            projectProgressColor={isDarkMode ? '#1f2937' : '#aeb8c2'}
            projectProgressSelectedColor={isDarkMode ? '#000' : '#9ba1a6'}
          />
        </div>
      </div>
    </div>
  );
};

export default Timeline;
