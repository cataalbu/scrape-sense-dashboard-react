import ScrapeTasksTable from '@/components/scrapeTasks/ScrapeTasksTable/ScrapeTasksTable';
import { useGetScrapeTasksQuery } from '@/redux/features/scrapeTasks/scrapeTasksApiSlice';
import { useState } from 'react';

export default function ScrapeTasksListPage() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(25);

  const {
    data: scrapeTasks,
    isLoading,
    isSuccess,
    error,
  } = useGetScrapeTasksQuery({ skip: page * rowsPerPage, limit: rowsPerPage });

  return (
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
  );
}
