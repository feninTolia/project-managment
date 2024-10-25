'use client';

import Header from '@/components/Header/Header';
import { dataGridClassNames, dataGridSxStyles } from '@/lib/utils';
import { useGetUsersQuery } from '@/state/api';
import { User } from '@/state/types';
import {
  DataGrid,
  GridColDef,
  GridToolbarContainer,
  GridToolbarExport,
  GridToolbarFilterButton,
} from '@mui/x-data-grid';
import Image from 'next/image';
import { useAppSelector } from '../redux';

const CustomToolbar = () => (
  <GridToolbarContainer className=" toolbar flex gap-2">
    <GridToolbarFilterButton />
    <GridToolbarExport />
  </GridToolbarContainer>
);

const columns: GridColDef<User>[] = [
  { field: 'userId', headerName: 'ID', width: 100 },
  { field: 'username', headerName: 'Username', width: 150 },
  {
    field: 'profilePictureUrl',
    headerName: 'Profile Picture',
    width: 100,
    renderCell: (params) => (
      <div className="flex w-full h-full items-center justify-center">
        <div className="h-9 w-9">
          <Image
            src={`https://ftoe-pm-s3-images.s3.eu-central-1.amazonaws.com/${params.value}`}
            alt={params.row.username}
            width={100}
            height={50}
            className="h-full rounded-full object-cover"
          />
        </div>
      </div>
    ),
  },
];

const Users = () => {
  const { data: users, isError, isLoading } = useGetUsersQuery();
  const isDarkMode = useAppSelector((state) => state.global.isDarkMode);
  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (isError || !users) {
    return <p>An error occurred while fetching tasks</p>;
  }

  return (
    <div className="flex w-full flex-col p-8">
      <Header name="Users" />
      <div style={{ height: 650, width: '100%' }}>
        <DataGrid
          rows={users || []}
          columns={columns}
          getRowId={(row) => row.userId}
          pagination
          slots={{ toolbar: CustomToolbar }}
          className={dataGridClassNames}
          sx={dataGridSxStyles(isDarkMode)}
        />
      </div>
    </div>
  );
};

export default Users;
