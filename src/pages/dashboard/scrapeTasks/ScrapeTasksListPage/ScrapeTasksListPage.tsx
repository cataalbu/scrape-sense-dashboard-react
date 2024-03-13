import ScrapeTasksTable from '@/components/scrapeTasks/ScrapeTasksTable/ScrapeTasksTable';
import { useGetScrapeTasksQuery } from '@/redux/features/scrapeTasks/scrapeTasksApiSlice';

export default function ScrapeTasksListPage() {
  const {
    data: scrapeTasks,
    isLoading,
    isSuccess,
    error,
  } = useGetScrapeTasksQuery();

  console.log('scrapeTasks:', scrapeTasks);
  return (
    <ScrapeTasksTable
      scrapeTasks={scrapeTasks || []}
      isLoading={isLoading}
      isSuccess={isSuccess}
      error={error?.toString() || ''}
    />
  );
}
