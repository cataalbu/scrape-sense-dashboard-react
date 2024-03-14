import { Product, ProductListDto } from '@/constants/types';
import { apiSlice } from '@/redux/api/apiSlice';

export const productsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query<
      ProductListDto,
      { skip?: number; limit?: number }
    >({
      query: ({ skip, limit }) => {
        let queryString = '/products';
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
      providesTags: ['Products'],
    }),
    getProductById: builder.query<Product, string>({
      query: (id) => `/products/${id}`,
      providesTags: (_result, _error, id) => [{ type: 'Products', id }],
    }),
  }),
});

export const { useGetProductsQuery, useGetProductByIdQuery } = productsApiSlice;
