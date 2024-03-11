import { Website } from '../../../constants/types';
import { apiSlice } from '../../api/apiSlice';

export const websitesApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getWebsites: builder.query<Website[], void>({
      query: () => '/websites',
    }),
    getWebsiteById: builder.query<Website, string>({
      query: (id) => `/websites/${id}`,
    }),
  }),
});

export const { useGetWebsiteByIdQuery, useGetWebsitesQuery } = websitesApiSlice;
