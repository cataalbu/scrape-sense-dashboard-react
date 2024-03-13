import { ScrapeTask, CreateScrapeTaskDto } from '@/constants/types';
import { apiSlice } from '../../api/apiSlice';

export const scrapeTasksApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getScrapeTasks: builder.query<ScrapeTask[], void>({
      query: () => '/scrape-tasks',
    }),
    getScrapeTask: builder.query<ScrapeTask, string>({
      query: (id) => `/scrape-tasks/${id}`,
    }),
    createScrapeTask: builder.mutation<ScrapeTask, CreateScrapeTaskDto>({
      query: (body) => ({
        url: '/scrape-tasks',
        method: 'POST',
        body,
      }),
    }),
  }),
});

export const {
  useGetScrapeTasksQuery,
  useGetScrapeTaskQuery,
  useCreateScrapeTaskMutation,
} = scrapeTasksApiSlice;
