import { ProductsTable } from '@/components/products';
import { useGetProductsQuery } from '@/redux/features/products/productsApiSlice';
import { useState } from 'react';

export default function ProductsListPage() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(25);
  const {
    data: products,
    error,
    isLoading,
  } = useGetProductsQuery({ skip: page * rowsPerPage, limit: rowsPerPage });

  return (
    <div style={{ width: '100%' }}>
      <h1>Products</h1>
      <ProductsTable
        products={products?.data || []}
        isLoading={isLoading}
        isSuccess={true}
        error={error?.toString() || ''}
        page={page}
        setPage={setPage}
        rowsPerPage={rowsPerPage}
        setRowsPerPage={setRowsPerPage}
        count={products?.count || 0}
      />
    </div>
  );
}
