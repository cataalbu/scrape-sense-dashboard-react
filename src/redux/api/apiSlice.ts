import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RootState } from '../store';

const baseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_SCRAPE_SENSE_API_URL,
  credentials: 'include',

  prepareHeaders: (headers: Headers, { getState }) => {
    const token = (getState() as RootState).auth.token;
    console.log(token);
    headers.set('Content-Type', 'application/json');
    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
    }
    return headers;
  },
});

export const apiSlice = createApi({
  reducerPath: 'rootApi',
  baseQuery,
  tagTypes: ['ScrapeTasks', 'Products', 'Websites'],
  endpoints: () => ({}),
});
