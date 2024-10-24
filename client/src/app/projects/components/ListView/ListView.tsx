import Header from '@/components/Header/Header';
import { useGetTasksQuery } from '@/state/api';
import { Dispatch, SetStateAction } from 'react';
import TaskCard from '../TaskCard';

type Props = {
  projectId: string;
  setIsModalNewTaskOpen: Dispatch<SetStateAction<boolean>>;
};

const ListView = ({ projectId, setIsModalNewTaskOpen }: Props) => {
  const {
    data: tasks,
    isError,
    isLoading,
  } = useGetTasksQuery({ projectId: Number(projectId) });

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (isError) {
    return <p>An error occurred while fetching tasks</p>;
  }

  return (
    <div className="px-4 pb-8 xl:px-6">
      <div className="pt-5">
        <Header
          name="List"
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
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 lg:gap-6">
        {tasks?.map((task) => <TaskCard task={task} key={task.id} />)}
      </div>
    </div>
  );
};

export default ListView;
