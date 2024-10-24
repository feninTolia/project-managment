'use client';

import Header from '@/components/Header/Header';
import { dataGridClassNames, dataGridSxStyles } from '@/lib/utils';
import { useGetTeamsQuery } from '@/state/api';
import { ITeam } from '@/state/types';
import {
  DataGrid,
  GridColDef,
  GridToolbarContainer,
  GridToolbarExport,
  GridToolbarFilterButton,
} from '@mui/x-data-grid';
import { useAppSelector } from '../redux';

const CustomToolbar = () => (
  <GridToolbarContainer className=" toolbar flex gap-2">
    <GridToolbarFilterButton />
    <GridToolbarExport />
  </GridToolbarContainer>
);

const columns: GridColDef<ITeam>[] = [
  { field: 'id', headerName: 'ID', width: 100 },
  { field: 'teamName', headerName: 'Team Name', width: 150 },
  {
    field: 'productOwnerUsername',
    headerName: 'Product Owner',
    width: 200,
  },
  {
    field: 'projectManagerUsername',
    headerName: 'Project Manager',
    width: 200,
  },
];

const Teams = () => {
  const { data: teams, isError, isLoading } = useGetTeamsQuery();
  const isDarkMode = useAppSelector((state) => state.global.isDarkMode);
  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (isError || !teams) {
    return <p>An error occurred while fetching tasks</p>;
  }

  return (
    <div className="flex w-full flex-col p-8">
      <Header name="Teams" />
      <div style={{ height: 650, width: '100%' }}>
        <DataGrid
          rows={teams || []}
          columns={columns}
          pagination
          slots={{ toolbar: CustomToolbar }}
          className={dataGridClassNames}
          sx={dataGridSxStyles(isDarkMode)}
        />
      </div>
    </div>
  );
};

export default Teams;
