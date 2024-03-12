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
import { Link, generatePath, useNavigate } from 'react-router-dom';
import Paths from '@/routes/paths';
import { MoreVert, Delete, Edit } from '@mui/icons-material';
import { useCallback, useState } from 'react';
import { DeleteDialog } from '@/components/common';
import { WebsitesTableProps } from './WebsitesTable';

export function WebsitesTable({
  websites,
  isLoading,
  isSuccess,
  error,
}: WebsitesTableProps) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedWebsite, setSelectedWebsite] = useState<string | null>(null);
  const open = Boolean(anchorEl);
  const navigate = useNavigate();

  const handleEditNavigation = useCallback(() => {
    if (selectedWebsite) {
      navigate(generatePath(Paths.WEBSITE_EDIT, { id: selectedWebsite }));
    }
  }, [navigate, selectedWebsite]);

  const handleClick = (
    event: React.MouseEvent<HTMLButtonElement>,
    id: string
  ) => {
    setAnchorEl(event.currentTarget);
    setSelectedWebsite(id);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const handleDeleteDialogOpen = () => {
    setDeleteDialogOpen(true);
  };

  const handleDeleteDialogClose = () => {
    setDeleteDialogOpen(false);
  };

  const deleteWebsite = useCallback(() => {
    console.log('delete website', selectedWebsite);
    setDeleteDialogOpen(false);
  }, [selectedWebsite]);

  return (
    <>
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
                onClick={(e) => handleClick(e, website.id)}
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
                <MenuItem onClick={handleEditNavigation}>
                  <Edit /> Edit
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    handleDeleteDialogOpen();
                    handleClose();
                  }}
                >
                  <Delete /> Delete
                </MenuItem>
              </Menu>
            </TableCell>
          </TableRow>
        ))}
      </AppTable>
      <DeleteDialog
        title="Delete website"
        content={`Are you sure you want to delete website with id ${selectedWebsite}?`}
        open={deleteDialogOpen}
        handleClose={handleDeleteDialogClose}
        handleAgree={deleteWebsite}
      />
    </>
  );
}
