import {
  Box,
  LinearProgress,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import { AppTablePagination } from '../AppTablePagination/AppTablePagination';
import { SetStateAction } from 'react';

interface AppTableProps {
  children: React.ReactElement[] | React.ReactElement;
  headCells: {
    id: string;
    label: string;
    align?: 'right' | 'left' | 'center' | 'justify' | 'inherit' | undefined;
  }[];
  isLoading: boolean;
  isSuccess: boolean;
  error: string;
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  rowsPerPage: number;
  setRowsPerPage: React.Dispatch<React.SetStateAction<number>>;
  count: number;
  sort?: {
    field: string;
    order: 'asc' | 'desc';
  };
  setSort?: React.Dispatch<
    SetStateAction<{ field: string; order: 'asc' | 'desc' } | undefined>
  >;
  sortableHeadCells?: string[];
}

export function AppTable({
  children,
  isLoading,
  isSuccess,
  error,
  headCells,
  page,
  setPage,
  rowsPerPage,
  setRowsPerPage,
  count,
  sort,
  setSort,
  sortableHeadCells,
}: AppTableProps) {
  const handleChangePage = (
    _event: React.MouseEvent<HTMLButtonElement, MouseEvent> | null,
    newPage: number
  ) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage: React.ChangeEventHandler<
    HTMLTextAreaElement | HTMLInputElement
  > = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <TableContainer component={Paper} sx={{ width: '100%' }}>
      <Table sx={{ width: '100%' }}>
        <TableHead>
          <TableRow>
            {headCells.map((headCell) => (
              <TableCell
                key={headCell.id}
                align={headCell.align}
                style={{ fontWeight: 700, fontSize: '1rem', cursor: 'pointer' }}
                onClick={() => {
                  if (setSort && sortableHeadCells?.includes(headCell.id)) {
                    setSort((prev) => {
                      if (prev && prev.field === headCell.id) {
                        if (prev.order === 'asc') {
                          return {
                            field: headCell.id,
                            order: 'desc',
                          };
                        } else return undefined;
                      } else
                        return {
                          field: headCell.id,
                          order: 'asc',
                        };
                    });
                  }
                }}
              >
                {headCell.label}
                {sort?.field === headCell.id ? (
                  sort.order === 'asc' ? (
                    <span>&uarr;</span>
                  ) : (
                    <span>&darr;</span>
                  )
                ) : null}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        {!isLoading ? (
          <TableBody>
            {isSuccess ? (
              children
            ) : (
              <TableRow>
                <TableCell colSpan={headCells.length} align="center">
                  {error}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        ) : (
          <TableBody>
            <TableRow>
              <TableCell colSpan={headCells.length} align="center">
                <Box sx={{ width: '100%' }}>
                  <LinearProgress />
                </Box>
              </TableCell>
            </TableRow>
          </TableBody>
        )}
      </Table>
      <AppTablePagination
        count={count}
        rowsPerPage={rowsPerPage}
        page={page}
        handleChangePage={handleChangePage}
        handleChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </TableContainer>
  );
}
