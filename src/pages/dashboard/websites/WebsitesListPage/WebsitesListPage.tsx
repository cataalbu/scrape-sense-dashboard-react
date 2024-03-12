import { Link } from 'react-router-dom';
import { Button } from '@mui/material';

import { WebsitesTable } from '@/components/websites';
import {
  useDeleteWebsiteMutation,
  useGetWebsitesQuery,
} from '@/redux/features/websites/websitesApiSlice';
import Paths from '@/routes/paths';

export default function WebsitesListPage() {
  const {
    data: websites,
    isLoading,
    isSuccess,
    error,
    refetch,
  } = useGetWebsitesQuery();
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
        websites={websites || []}
        isLoading={isLoading}
        isSuccess={isSuccess}
        error={error?.toString() || ''}
        deleteWebsiteAction={async (id) => {
          await deleteWebsite(id);
          await refetch();
        }}
      />
    </div>
  );
}
