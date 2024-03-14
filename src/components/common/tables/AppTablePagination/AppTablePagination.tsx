import React from 'react';
import { Box, IconButton, TablePagination } from '@mui/material';
import { KeyboardArrowRight, KeyboardArrowLeft } from '@mui/icons-material';

function AppTablePaginationActions({
  count,
  rowsPerPage,
  page,
  onPageChange,
}: // eslint-disable-next-line @typescript-eslint/no-explicit-any
any) {
  const handlePreviousButtonClick = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent> | null
  ) => {
    onPageChange(e, page - 1);
  };
  const handleNextButtonClick = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent> | null
  ) => {
    onPageChange(e, page + 1);
  };
  return (
    <Box sx={{ flexShrink: 0, ml: 2.5 }}>
      <IconButton
        onClick={handlePreviousButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        <KeyboardArrowLeft />
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        <KeyboardArrowRight />
      </IconButton>
    </Box>
  );
}

interface AppTablePaginationProps {
  count: number;
  rowsPerPage: number;
  page: number;
  handleChangePage: (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent> | null,
    page: number
  ) => void;
  handleChangeRowsPerPage:
    | React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>
    | undefined;
}

export function AppTablePagination({
  count,
  rowsPerPage,
  page,
  handleChangePage,
  handleChangeRowsPerPage,
}: AppTablePaginationProps) {
  return (
    <TablePagination
      rowsPerPageOptions={[5, 10, 25, 100]}
      component="div"
      count={count || 0}
      rowsPerPage={rowsPerPage}
      page={page}
      onPageChange={handleChangePage}
      onRowsPerPageChange={handleChangeRowsPerPage}
      ActionsComponent={AppTablePaginationActions}
    />
  );
}
