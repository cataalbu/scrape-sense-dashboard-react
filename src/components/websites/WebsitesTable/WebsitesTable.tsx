import { Website } from '../../../constants/types';
import { WebsiteType } from '../../../constants/enums';
import { AppTable } from '@/components/common/tables/AppTable/AppTable';
import {
  Button,
  IconButton,
  Menu,
  MenuItem,
  TableCell,
  TableRow,
} from '@mui/material';
import { Link, generatePath } from 'react-router-dom';
import Paths from '@/routes/paths';
import { MoreVert, Delete, Edit } from '@mui/icons-material';
import { useState } from 'react';

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
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

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
        {
          id: 'actions',
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
              to={generatePath(Paths.WEBSITE_DETAILS, { id: website.id })}
              variant="contained"
            >
              Details
            </Button>
          </TableCell>
          <TableCell>
            <IconButton
              id="more-menu"
              aria-controls={open ? 'basic-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={open ? 'true' : undefined}
              onClick={handleClick}
            >
              <MoreVert />
            </IconButton>
            <Menu
              id="more-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                'aria-labelledby': 'basic-button',
              }}
            >
              <MenuItem
                component={Link}
                to={generatePath(Paths.WEBSITE_EDIT, { id: website.id })}
              >
                <Edit /> Edit
              </MenuItem>
              <MenuItem>
                <Delete /> Delete
              </MenuItem>
            </Menu>
          </TableCell>
        </TableRow>
      ))}
    </AppTable>
  );
}
