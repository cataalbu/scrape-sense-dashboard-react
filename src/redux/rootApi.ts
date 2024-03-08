import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const rootApi = createApi({
  reducerPath: 'rootApi',
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_SCRAPE_SENSE_API_URL,
    credentials: 'include',
    prepareHeaders: (headers: Headers) => {
      headers.set('Content-Type', 'application/json');
    },
  }),
  tagTypes: [],
  endpoints: () => ({}),
});
