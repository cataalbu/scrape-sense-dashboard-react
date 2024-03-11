import { apiSlice } from '../../api/apiSlice';

export const scrapeTasksApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getScrapeTasks: builder.query<unknown, void>({
      query: () => '/scrape-tasks',
    }),
  }),
});

export const { useGetScrapeTasksQuery } = scrapeTasksApiSlice;
