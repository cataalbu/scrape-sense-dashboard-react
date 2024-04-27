import {
  ScrapeTask,
  CreateScrapeTaskDto,
  ScrapeTaskListDto,
} from '@/constants/types';
import { apiSlice } from '../../api/apiSlice';

export const scrapeTasksApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getScrapeTasks: builder.query<
      ScrapeTaskListDto,
      { skip?: number; limit?: number }
    >({
      query: ({ skip, limit }) => {
        let queryString = '/scrape-tasks';
        const params = new URLSearchParams();
        if (skip !== undefined) {
          params.append('skip', skip.toString());
        }
        if (limit !== undefined) {
          params.append('limit', limit.toString());
        }
        if (params.toString()) {
          queryString += '?' + params.toString();
        }
        console.log('queryString', queryString);
        return queryString;
      },
      providesTags: ['ScrapeTasks'],
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
      invalidatesTags: ['ScrapeTasks'],
    }),
  }),
});

export const {
  useGetScrapeTasksQuery,
  useGetScrapeTaskQuery,
  useCreateScrapeTaskMutation,
} = scrapeTasksApiSlice;
