import { useParams } from 'react-router-dom';

import { useGetScrapeTaskQuery } from '@/redux/features/scrapeTasks/scrapeTasksApiSlice';
import { ServerError } from '@/constants/types';

import styles from './ScrapeTaskDetailsPage.module.scss';
import { InfoCard } from '@/components/common';
import { fDate } from '@/utils';
import { ScrapeTaskStatus } from '@/constants/enums';

export default function ScrapeTasksDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const {
    data: scrapeTask,
    isLoading,
    isSuccess,
    error,
  } = useGetScrapeTaskQuery(id || '');

  return (
    <div className={styles['scrape-task-details-page']}>
      <h1 className={styles['title']}>Scrape Task Details</h1>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <>
          {isSuccess ? (
            <>
              {scrapeTask ? (
                <div className={styles['info-cards-container']}>
                  <InfoCard
                    className={styles['card']}
                    title="ID"
                    value={scrapeTask.id}
                  />
                  <InfoCard
                    className={styles['card']}
                    title="Website"
                    value={scrapeTask.website?.name}
                  />
                  <InfoCard
                    className={styles['card']}
                    title="Type"
                    value={scrapeTask.type}
                  />
                  <InfoCard
                    className={styles['card']}
                    title="Status"
                    value={scrapeTask.status}
                  />
                  {scrapeTask.status === ScrapeTaskStatus.FINISHED ? (
                    <>
                      <InfoCard
                        className={styles['card']}
                        title="Start time"
                        value={fDate(new Date(scrapeTask.startTime!))}
                      />
                      <InfoCard
                        className={styles['card']}
                        title="End time"
                        value={fDate(new Date(scrapeTask.endTime!))}
                      />
                      <InfoCard
                        className={styles['card']}
                        title="Scrape count"
                        value={`${scrapeTask.scrapeCount} items`}
                      />
                    </>
                  ) : null}
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
