import { AppTable } from '@/components/common';
import { ScrapeTask } from '@/constants/types';
import Paths from '@/routes/paths';
import { fStringDate } from '@/utils';
import { Button, TableCell, TableRow } from '@mui/material';
import { Link, generatePath } from 'react-router-dom';

interface ScrapeTasksTableProps {
  scrapeTasks: ScrapeTask[];
  isLoading: boolean;
  isSuccess: boolean;
  error: string;
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  rowsPerPage: number;
  setRowsPerPage: React.Dispatch<React.SetStateAction<number>>;
  count: number;
}

export default function ScrapeTasksTable({
  scrapeTasks,
  isLoading,
  isSuccess,
  error,
  page,
  setPage,
  rowsPerPage,
  setRowsPerPage,
  count,
}: ScrapeTasksTableProps) {
  return (
    <AppTable
      isLoading={isLoading}
      isSuccess={isSuccess}
      error={error}
      page={page}
      setPage={setPage}
      rowsPerPage={rowsPerPage}
      setRowsPerPage={setRowsPerPage}
      count={count}
      headCells={[
        {
          id: 'id',
          label: 'ID',
        },
        {
          id: 'website',
          label: 'Website',
        },
        {
          id: 'type',
          label: 'Type',
        },
        {
          id: 'status',
          label: 'Status',
        },
        {
          id: 'startTime',
          label: 'Start time',
        },
        {
          id: 'endTime',
          label: 'End time',
        },
        {
          id: 'scrapeCount',
          label: 'Scrape count',
        },
        {
          id: 'action',
          label: '',
        },
      ]}
    >
      {scrapeTasks.map((scrapeTask) => (
        <TableRow key={scrapeTask.id}>
          <TableCell>{scrapeTask.id}</TableCell>
          <TableCell>{scrapeTask.website?.name || '-'}</TableCell>
          <TableCell>{scrapeTask.type}</TableCell>
          <TableCell>{scrapeTask.status}</TableCell>
          <TableCell>{fStringDate(scrapeTask?.startTime)}</TableCell>
          <TableCell>{fStringDate(scrapeTask?.endTime)}</TableCell>
          <TableCell>{scrapeTask.scrapeCount}</TableCell>
          <TableCell>
            <Button
              component={Link}
              to={generatePath(Paths.SCRAPE_TASK_DETAILS, {
                id: scrapeTask.id,
              })}
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
