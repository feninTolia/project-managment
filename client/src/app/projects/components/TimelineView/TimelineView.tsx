import { useAppSelector } from '@/app/redux';
import { useGetTasksQuery } from '@/state/api';
import {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  useMemo,
  useState,
} from 'react';
import { DisplayOption, Gantt, ViewMode } from 'gantt-task-react';
import 'gantt-task-react/dist/index.css';
import Header from '@/components/Header/Header';

type TaskTypeItems = 'task' | 'milestone' | 'project';

type Props = {
  projectId: string;
  setIsModalNewTaskOpen: Dispatch<SetStateAction<boolean>>;
};

const TimelineView = ({ projectId, setIsModalNewTaskOpen }: Props) => {
  const isDarkMode = useAppSelector((state) => state.global.isDarkMode);
  const [displayOptions, setDisplayOptions] = useState<DisplayOption>({
    viewMode: ViewMode.Month,
    locale: 'en-US',
  });
  const {
    data: tasks,
    isError,
    isLoading,
  } = useGetTasksQuery({ projectId: Number(projectId) });

  const ganttTasks = useMemo(() => {
    return (
      tasks?.map((task) => ({
        start: new Date(task.startDate as string),
        end: new Date(task.dueDate as string),
        name: task.title,
        id: `Task-${task.id}`,
        type: 'task' as TaskTypeItems,
        progress: task.points ? (task.points / 10) * 100 : 0,
        isDisabled: false,
      })) || []
    );
  }, [tasks]);

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
    return <p>An error occurred while fetching tasks</p>;
  }

  if (!tasks || !(tasks.length > 0)) {
    return (
      <div className="px-4  pt-5 xl:px-6">
        <Header
          name="No tasks yet"
          isSmallText
          buttonComponent={
            <button
              className="flex items-center rounded bg-blue-primary px-3 py-2 text-white hover:bg-blue-600"
              onClick={() => setIsModalNewTaskOpen(true)}
            >
              Add Task
            </button>
          }
        />
      </div>
    );
  }

  return (
    <div className="px-4 xl:px-6">
      <div className="flex flex-wrap items-center justify-between gap-2 py-5">
        <Header name="Project Tasks Timeline" className="w-fit mb-0" />
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
            tasks={ganttTasks}
            {...displayOptions}
            columnWidth={displayOptions.viewMode === ViewMode.Month ? 150 : 100}
            listCellWidth="100px"
            barBackgroundColor={isDarkMode ? '#101214' : '#aeb8c2'}
            barBackgroundSelectedColor={isDarkMode ? '#000' : '#9ba1a6'}
          />
        </div>

        <div className="px-4 pb-5 pt-1">
          <button
            className="flex items-center rounded bg-blue-primary px-3 py-2 text-white hover:bg-blue-600"
            onClick={() => setIsModalNewTaskOpen(true)}
          >
            Add new task
          </button>
        </div>
      </div>
    </div>
  );
};

export default TimelineView;
