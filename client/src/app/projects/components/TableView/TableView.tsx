import { useAppSelector } from '@/app/redux';
import Header from '@/components/Header/Header';
import { useGetTasksQuery } from '@/state/api';
import { Dispatch, SetStateAction } from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { dataGridClassNames, dataGridSxStyles } from '@/lib/utils';

type Props = {
  projectId: string;
  setIsModalNewTaskOpen: Dispatch<SetStateAction<boolean>>;
};

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

const TableView = ({ projectId, setIsModalNewTaskOpen }: Props) => {
  const isDarkMode = useAppSelector((state) => state.global.isDarkMode);
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
    <div className="h-[540px] w-full px-4 pb-8 xl:px-6">
      <div className="pt-5">
        <Header
          name="Table"
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
      <DataGrid
        rows={tasks || []}
        columns={columns}
        className={dataGridClassNames}
        sx={dataGridSxStyles(isDarkMode)}
      />
    </div>
  );
};

export default TableView;
