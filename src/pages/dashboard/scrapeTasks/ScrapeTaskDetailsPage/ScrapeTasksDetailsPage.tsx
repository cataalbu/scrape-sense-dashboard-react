import { useParams } from 'react-router-dom';

import { useGetScrapeTaskQuery } from '@/redux/features/scrapeTasks/scrapeTasksApiSlice';
import { ServerError } from '@/constants/types';

import styles from './ScrapeTaskDetailsPage.module.scss';
import { InfoCard } from '@/components/common';
import { fDate, fMinutesAndSeconds, fStringDate } from '@/utils';
import { ScrapeTaskStatus } from '@/constants/enums';
import { LineChart } from '@mui/x-charts/LineChart';

export default function ScrapeTasksDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const {
    data: scrapeTask,
    isLoading,
    isSuccess,
    error,
  } = useGetScrapeTaskQuery(id || '');

  console.log(isSuccess);

  return (
    <div className={styles['scrape-task-details-page']}>
      <h1 className={styles['title']}>Scrape Task Details</h1>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <>
          {isSuccess ? (
            <div className={styles['scrape-task-info-container']}>
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
                      title="Duration"
                      value={fMinutesAndSeconds(
                        new Date(scrapeTask.startTime!),
                        new Date(scrapeTask.endTime!)
                      )}
                    />
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
              </div>{' '}
              {scrapeTask.status === ScrapeTaskStatus.FINISHED ? (
                <div
                  className={styles['metrics-container']}
                  style={{ display: 'flex', flexWrap: 'wrap' }}
                >
                  <div
                    className={styles['metrics']}
                    style={{ marginBottom: '1rem' }}
                  >
                    <p className={styles['metrics']}>Average CPU Usage</p>
                    <LineChart
                      xAxis={[
                        {
                          label: 'Date',
                          scaleType: 'time',

                          valueFormatter: (date) => fStringDate(date),
                          data: scrapeTask.metrics?.cpuMetric.timestamps
                            .map((t) => new Date(t))
                            .reverse(),

                          tickInterval: scrapeTask.metrics?.cpuMetric.timestamps
                            .map((t) => new Date(t))
                            .reverse(),
                        },
                      ]}
                      yAxis={[
                        {
                          label: 'Value',
                          scaleType: 'linear',
                        },
                      ]}
                      series={[
                        {
                          data: scrapeTask.metrics?.cpuMetric.values
                            .map((v) => v)
                            .reverse(),
                        },
                      ]}
                      width={500}
                      height={400}
                    />
                  </div>
                  <div
                    className={styles['metrics']}
                    style={{ marginBottom: '1rem' }}
                  >
                    <p className={styles['metrics']}>Average Memory Usage</p>
                    <LineChart
                      xAxis={[
                        {
                          label: 'Date',
                          scaleType: 'time',

                          valueFormatter: (date) => fStringDate(date),
                          data: scrapeTask.metrics?.memoryUsedPercentMetric.timestamps
                            .map((t) => new Date(t))
                            .reverse(),

                          tickInterval:
                            scrapeTask.metrics?.memoryUsedPercentMetric.timestamps
                              .map((t) => new Date(t))
                              .reverse(),
                        },
                      ]}
                      yAxis={[
                        {
                          label: 'Value',
                          scaleType: 'linear',
                        },
                      ]}
                      series={[
                        {
                          data: scrapeTask.metrics?.memoryUsedPercentMetric.values
                            .map((v) => v)
                            .reverse(),
                        },
                      ]}
                      width={500}
                      height={400}
                    />
                  </div>
                  <div
                    className={styles['metrics']}
                    style={{ marginBottom: '1rem' }}
                  >
                    <p className={styles['metrics']}>Average Network in</p>
                    <LineChart
                      xAxis={[
                        {
                          label: 'Date',
                          scaleType: 'time',

                          valueFormatter: (date) => fStringDate(date),
                          data: scrapeTask.metrics?.networkInMetric.timestamps
                            .map((t) => new Date(t))
                            .reverse(),

                          tickInterval:
                            scrapeTask.metrics?.networkInMetric.timestamps
                              .map((t) => new Date(t))
                              .reverse(),
                        },
                      ]}
                      yAxis={[
                        {
                          label: 'Value',
                          scaleType: 'linear',
                        },
                      ]}
                      series={[
                        {
                          data: scrapeTask.metrics?.networkInMetric.values
                            .map((v) => v)
                            .reverse(),
                        },
                      ]}
                      width={500}
                      height={400}
                    />
                  </div>
                  <div
                    className={styles['metrics']}
                    style={{ marginBottom: '1rem' }}
                  >
                    <p className={styles['metrics']}>Average Network out</p>
                    <LineChart
                      xAxis={[
                        {
                          label: 'Date',
                          scaleType: 'time',

                          valueFormatter: (date) => fStringDate(date),
                          data: scrapeTask.metrics?.networkOutMetric.timestamps
                            .map((t) => new Date(t))
                            .reverse(),

                          tickInterval:
                            scrapeTask.metrics?.networkOutMetric.timestamps
                              .map((t) => new Date(t))
                              .reverse(),
                        },
                      ]}
                      yAxis={[
                        {
                          label: 'Value',
                          scaleType: 'linear',
                        },
                      ]}
                      series={[
                        {
                          data: scrapeTask.metrics?.networkOutMetric.values
                            .map((v) => v)
                            .reverse(),
                        },
                      ]}
                      width={500}
                      height={400}
                    />
                  </div>
                </div>
              ) : null}
            </div>
          ) : (
            <p>Error: {(error as ServerError).data.message}</p>
          )}
        </>
      )}
    </div>
  );
}
