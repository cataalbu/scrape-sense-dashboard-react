import { Product } from '@/constants/types';
import { apiSlice } from '@/redux/api/apiSlice';

export const productsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query<Product[], void>({
      query: () => '/products',
      providesTags: ['Products'],
    }),
    getProductById: builder.query<Product, string>({
      query: (id) => `/products/${id}`,
      providesTags: (_result, _error, id) => [{ type: 'Products', id }],
    }),
    createProduct: builder.mutation<Product, Partial<Product>>({
      query: (product) => ({
        url: '/products',
        method: 'POST',
        body: product,
      }),
      invalidatesTags: ['Products'],
    }),
    updateProduct: builder.mutation<
      Product,
      Partial<Product> & Pick<Product, 'id'>
    >({
      query: (product) => ({
        url: '/products',
        method: 'PATCH',
        body: product,
      }),
      invalidatesTags: (_result, _error, arg) => [
        'Products',
        { type: 'Products', id: arg.id },
      ],
    }),
    deleteProduct: builder.mutation<Product, string>({
      query: (id) => ({
        url: `/products/${id}`,
        method: 'DELETE',
        invalidatesTags: ['Products'],
      }),
    }),
  }),
});
