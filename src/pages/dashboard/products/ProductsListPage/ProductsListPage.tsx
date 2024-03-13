import { ProductsTable } from '@/components/products';
import { useGetProductsQuery } from '@/redux/features/products/productsApiSlice';

export default function ProductsListPage() {
  const { data: products, error, isLoading } = useGetProductsQuery();
  console.log(products, error, isLoading);
  return (
    <div style={{ width: '100%' }}>
      <h1>Products</h1>
      <ProductsTable
        products={products?.slice(1, 10) || []}
        isLoading={isLoading}
        isSuccess={true}
        error={error?.toString() || ''}
      />
    </div>
  );
}
