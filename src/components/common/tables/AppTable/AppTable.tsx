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
}

export function AppTable({
  children,
  isLoading,
  isSuccess,
  error,
  headCells,
}: AppTableProps) {
  return (
    <TableContainer component={Paper} sx={{ width: '100%' }}>
      <Table sx={{ width: '100%' }}>
        <TableHead>
          <TableRow>
            {headCells.map((headCell) => (
              <TableCell key={headCell.id} align={headCell.align}>
                {headCell.label}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        {!isLoading ? (
          <TableBody>
            {isSuccess ? children : <TableRow>{error}</TableRow>}
          </TableBody>
        ) : (
          <Box sx={{ width: '100%' }}>
            <LinearProgress />
          </Box>
        )}
      </Table>
    </TableContainer>
  );
}
