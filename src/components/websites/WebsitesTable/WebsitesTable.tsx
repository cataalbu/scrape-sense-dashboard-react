import { Website } from '../../../constants/types';
import { WebsiteType } from '../../../constants/enums';
import { AppTable } from '@/components/common/tables/AppTable/AppTable';
import { Button, TableCell, TableRow } from '@mui/material';
import { Link, generatePath } from 'react-router-dom';
import Paths from '@/routes/paths';

interface WebsitesTableProps {
  websites: Website[];
  isLoading: boolean;
  isSuccess: boolean;
  error: string;
}

export function WebsitesTable({
  websites,
  isLoading,
  isSuccess,
  error,
}: WebsitesTableProps) {
  return (
    <AppTable
      isLoading={isLoading}
      isSuccess={isSuccess}
      error={error}
      headCells={[
        {
          id: 'id',
          label: 'ID',
        },
        {
          id: 'name',
          label: 'Name',
        },
        {
          id: 'url',
          label: 'URL',
        },
        {
          id: 'type',
          label: 'Type',
        },
        {
          id: 'navigate',
          label: '',
        },
      ]}
    >
      {websites.map((website) => (
        <TableRow key={website.id}>
          <TableCell>{website.id}</TableCell>
          <TableCell>{website.name}</TableCell>
          <TableCell>{website.url}</TableCell>
          <TableCell>
            {website.type === WebsiteType.CSR
              ? 'Client-side rendered'
              : 'Server-side rendered'}
          </TableCell>
          <TableCell>
            <Button
              component={Link}
              to={generatePath(Paths.WEBSITE, { id: website.id })}
              variant="contained"
            >
              Details
            </Button>
          </TableCell>
        </TableRow>
      ))}
    </AppTable>
  );
}
