import { Link } from 'react-router-dom';
import { Button } from '@mui/material';

import { WebsitesTable } from '@/components/websites';
import {
  useDeleteWebsiteMutation,
  useGetWebsitesQuery,
} from '@/redux/features/websites/websitesApiSlice';
import Paths from '@/routes/paths';
import { useState } from 'react';

export default function WebsitesListPage() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(25);

  const {
    data: websites,
    isLoading,
    isSuccess,
    error,
    refetch,
  } = useGetWebsitesQuery({ skip: page * rowsPerPage, limit: rowsPerPage });
  const [deleteWebsite] = useDeleteWebsiteMutation();
  return (
    <div style={{ width: '100%' }}>
      <h1>Websites</h1>
      <Button
        variant="outlined"
        sx={{ mb: 2, borderRadius: '8px' }}
        component={Link}
        to={Paths.WEBSITE_CREATE}
      >
        Create new website
      </Button>
      <WebsitesTable
        websites={websites?.data || []}
        isLoading={isLoading}
        isSuccess={isSuccess}
        page={page}
        setPage={setPage}
        rowsPerPage={rowsPerPage}
        setRowsPerPage={setRowsPerPage}
        count={websites?.count || 0}
        error={error?.toString() || ''}
        deleteWebsiteAction={async (id) => {
          await deleteWebsite(id);
          await refetch();
        }}
      />
    </div>
  );
}
