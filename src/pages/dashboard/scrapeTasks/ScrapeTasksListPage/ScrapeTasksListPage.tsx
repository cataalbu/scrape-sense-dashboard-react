import { useState } from 'react';
import { Button } from '@mui/material';

import { useGetScrapeTasksQuery } from '@/redux/features/scrapeTasks/scrapeTasksApiSlice';
import ScrapeTasksTable from '@/components/scrapeTasks/ScrapeTasksTable/ScrapeTasksTable';
import { StartScrapeTaskModal } from '@/components/scrapeTasks/StartScrapeTaskModal/StartScrapeTaskModal';

export default function ScrapeTasksListPage() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(25);
  const [startScrapeTaskModalOpen, setStartScrapeTaskModalOpen] =
    useState(false);

  const {
    data: scrapeTasks,
    isLoading,
    isSuccess,
    error,
  } = useGetScrapeTasksQuery({ skip: page * rowsPerPage, limit: rowsPerPage });

  return (
    <div style={{ width: '100%' }}>
      <h1>Scrape tasks</h1>
      <Button
        variant="outlined"
        sx={{ mb: 2, borderRadius: '8px' }}
        onClick={() => setStartScrapeTaskModalOpen(true)}
      >
        Start scrape task
      </Button>
      <ScrapeTasksTable
        scrapeTasks={scrapeTasks?.data || []}
        isLoading={isLoading}
        isSuccess={isSuccess}
        error={error?.toString() || ''}
        page={page}
        setPage={setPage}
        rowsPerPage={rowsPerPage}
        setRowsPerPage={setRowsPerPage}
        count={scrapeTasks?.count || 0}
      />
      <StartScrapeTaskModal
        open={startScrapeTaskModalOpen}
        handleModalClose={setStartScrapeTaskModalOpen}
      />
    </div>
  );
}
