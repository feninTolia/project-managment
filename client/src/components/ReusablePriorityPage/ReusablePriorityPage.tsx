'use client';
import ModalNewTask from '@/app/projects/components/ModalNewTask/ModalNewTask';
import TaskCard from '@/app/projects/components/TaskCard';
import { useAppSelector } from '@/app/redux';
import Header from '@/components/Header/Header';
import { dataGridClassNames, dataGridSxStyles } from '@/lib/utils';
import { useGetAuthUserQuery, useGetTasksByUserQuery } from '@/state/api';
import { Priority } from '@/state/types';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { useState } from 'react';

const columns: GridColDef[] = [
  { field: 'title', headerName: 'Title', width: 100 },
  { field: 'description', headerName: 'Description', width: 200 },
  {
    field: 'status',
    headerName: 'Status',
    width: 130,
    renderCell: (params) => (
      <span className="inline-flex rounded-full bg-green-100 px-2 text-xs font-semibold leading-5 text-green-800">
        {params.value}
      </span>
    ),
  },
  { field: 'priority', headerName: 'Priority', width: 75 },
  { field: 'tags', headerName: 'Tags', width: 130 },
  { field: 'startDate', headerName: 'Start Date', width: 130 },
  { field: 'dueDate', headerName: 'Due Date', width: 130 },
  {
    field: 'author',
    headerName: 'Author',
    width: 150,
    renderCell: (params) => params.value.username || 'Unknown',
  },
  {
    field: 'assignee',
    headerName: 'Assignee',
    width: 150,
    renderCell: (params) => params.value.username || 'Unassigned',
  },
];

type Props = { priority: Priority };

const ReusablePriorityPage = ({ priority }: Props) => {
  const [view, setView] = useState('list');
  const [isModalNewTaskOpen, setIsModalNewTaskOpen] = useState(false);
  const { data: currentUser } = useGetAuthUserQuery({});

  const userId = currentUser?.userDetails.userId ?? null;
  const {
    data: tasks,
    isError,
    isLoading,
  } = useGetTasksByUserQuery(userId ?? 0, { skip: userId === null });
  const isDarkMode = useAppSelector((state) => state.global.isDarkMode);
  const filteredTasks = tasks?.filter((task) => task.priority === priority);

  if (isLoading) {
    return <p>Loading...</p>;
  }
  if (isError || !tasks) {
    return <p>Error fetching data</p>;
  }

  return (
    <div className="m-5 p-4">
      <ModalNewTask
        isOpen={isModalNewTaskOpen}
        onClose={() => setIsModalNewTaskOpen(false)}
      />
      <Header
        name="Priority Page"
        buttonComponent={
          <button
            className="mr-3 rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
            onClick={() => setIsModalNewTaskOpen(true)}
          >
            Add Task
          </button>
        }
      />
      <div className="mb-4 flex justify-start">
        <button
          className={`px-4 py-2 rounded-l  ${view === 'list' ? 'bg-gray-300 dark:bg-dark-tertiary' : 'bg-white dark:bg-dark-secondary'}`}
          onClick={() => setView('list')}
        >
          List
        </button>
        <button
          className={`px-4 py-2 rounded-r ${view === 'table' ? 'bg-gray-300 dark:bg-dark-tertiary' : 'bg-white dark:bg-dark-secondary'}`}
          onClick={() => setView('table')}
        >
          Table
        </button>
      </div>
      {isLoading ? (
        <p>Loading..</p>
      ) : view === 'list' ? (
        <div className="grid grid-cols-1 gap-4">
          {filteredTasks?.map((task) => <TaskCard task={task} key={task.id} />)}
        </div>
      ) : (
        view === 'table' && (
          <div className="w-full ">
            <DataGrid
              rows={filteredTasks}
              columns={columns}
              checkboxSelection
              className={dataGridClassNames}
              sx={dataGridSxStyles(isDarkMode)}
              // getRowId={(row) => row.id}
            />
          </div>
        )
      )}
    </div>
  );
};

export default ReusablePriorityPage;
