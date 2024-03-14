import { useParams } from 'react-router-dom';

import { useGetScrapeTaskQuery } from '@/redux/features/scrapeTasks/scrapeTasksApiSlice';
import { ServerError } from '@/constants/types';

export default function ScrapeTasksDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const {
    data: scrapeTask,
    isLoading,
    isSuccess,
    error,
  } = useGetScrapeTaskQuery(id || '');
  console.log(scrapeTask);
  return (
    <div style={{ width: '100%' }}>
      <h1>Scrape Task Details</h1>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <>
          {isSuccess ? (
            <>
              {scrapeTask ? (
                <div>
                  <h2>{scrapeTask.id}</h2>
                  <p>Website</p>
                  <p>{scrapeTask.website?.name || '-'}</p>
                  <p>Type</p>
                  <p>{scrapeTask.type}</p>
                  <p>Status</p>
                  <p>{scrapeTask.status}</p>
                  <p>Start time</p>
                  <p>{scrapeTask.startTime}</p>
                  <p>End time</p>
                  <p>{scrapeTask.endTime}</p>
                  <p>Scrape count</p>
                  <p>{scrapeTask.scrapeCount}</p>
                </div>
              ) : (
                <p>Scrape task not found</p>
              )}
            </>
          ) : (
            <p>Error: {(error as ServerError).data.message}</p>
          )}
        </>
      )}
    </div>
  );
}
