import { useGetTasksQuery, useUpdateTaskStatusMutation } from '@/state/api';
import { Status } from '@/state/types';
import { Dispatch, SetStateAction, useCallback } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { TaskColumn } from './TaskColumn';

type Props = {
  projectId: string;
  setIsModalNewTaskOpen: Dispatch<SetStateAction<boolean>>;
};

const taskStatus = ['To Do', 'Work In Progress', 'Under Review', 'Completed'];

const BoardView = ({ projectId, setIsModalNewTaskOpen }: Props) => {
  const {
    data: tasks,
    isLoading,
    isError,
  } = useGetTasksQuery({ projectId: Number(projectId) });
  const [updateTaskStatus] = useUpdateTaskStatusMutation();

  const moveTask = useCallback(
    (taskId: number, status: Status) => {
      updateTaskStatus({ taskId, status });
    },
    [updateTaskStatus]
  );

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (isError) {
    return <p>An error occurred while fetching tasks</p>;
  }

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="grid grid-cols-1 gap-4 p-4 md:grid-cols-2 xl:grid-cols-4">
        {taskStatus.map((status) => (
          <TaskColumn
            key={status}
            status={status as Status}
            tasks={tasks ?? []}
            moveTask={moveTask}
            setIsModalNewTaskOpen={setIsModalNewTaskOpen}
          />
        ))}
      </div>
    </DndProvider>
  );
};

export default BoardView;
