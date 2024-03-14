import { Website, WebsiteDto, WebsiteListDto } from '../../../constants/types';
import { apiSlice } from '../../api/apiSlice';

export const websitesApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getWebsites: builder.query<
      WebsiteListDto,
      { skip?: number; limit?: number }
    >({
      query: ({ skip, limit }) => {
        let queryString = '/websites';
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
        return queryString;
      },
      providesTags: ['Websites'],
    }),
    getWebsiteById: builder.query<Website, string>({
      query: (id) => `/websites/${id}`,
      providesTags: (_result, _error, id) => [{ type: 'Websites', id }],
    }),
    createWebsite: builder.mutation<Website, WebsiteDto>({
      query: (website) => ({
        url: '/websites',
        method: 'POST',
        body: website,
      }),
      invalidatesTags: ['Websites'],
    }),
    updateWebsite: builder.mutation<
      Website,
      Partial<Website> & Pick<Website, 'id'>
    >({
      query: (website) => ({
        url: '/websites',
        method: 'PATCH',
        body: website,
      }),
      invalidatesTags: (_result, _error, arg) => [
        'Websites',
        { type: 'Websites', id: arg.id },
      ],
    }),

    deleteWebsite: builder.mutation<Website, string>({
      query: (id) => ({
        url: `/websites/${id}`,
        method: 'DELETE',
        invalidatesTags: ['Websites'],
      }),
    }),
  }),
});

export const {
  useGetWebsiteByIdQuery,
  useGetWebsitesQuery,
  useCreateWebsiteMutation,
  useUpdateWebsiteMutation,
  useDeleteWebsiteMutation,
} = websitesApiSlice;
