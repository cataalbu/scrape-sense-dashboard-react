import { Website, WebsiteDto } from '../../../constants/types';
import { apiSlice } from '../../api/apiSlice';

export const websitesApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getWebsites: builder.query<Website[], void>({
      query: () => '/websites',
    }),
    getWebsiteById: builder.query<Website, string>({
      query: (id) => `/websites/${id}`,
    }),
    createWebsite: builder.mutation<Website, WebsiteDto>({
      query: (website) => ({
        url: '/websites',
        method: 'POST',
        body: website,
      }),
    }),
  }),
});

export const {
  useGetWebsiteByIdQuery,
  useGetWebsitesQuery,
  useCreateWebsiteMutation,
} = websitesApiSlice;
