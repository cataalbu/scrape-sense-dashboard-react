import { Product } from '@/constants/types';
import { apiSlice } from '@/redux/api/apiSlice';

export const productsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query<Omit<Product, 'prices'>[], void>({
      query: () => '/products',
      providesTags: ['Products'],
    }),
    getProductById: builder.query<Product, string>({
      query: (id) => `/products/${id}`,
      providesTags: (_result, _error, id) => [{ type: 'Products', id }],
      transformResponse: (response: Product) => ({
        ...response,
        prices: response.prices.map((price) => ({
          ...price,
          date: new Date(price.date),
        })),
      }),
    }),
  }),
});

export const { useGetProductsQuery, useGetProductByIdQuery } = productsApiSlice;
