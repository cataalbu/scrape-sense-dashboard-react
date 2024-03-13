import { useGetProductByIdQuery } from '@/redux/features/products/productsApiSlice';
import { fDate } from '@/utils';
import { fCurrency } from '@/utils/formatNumber';
import { useParams } from 'react-router-dom';

export default function ProductsDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const { data: product, error, isLoading } = useGetProductByIdQuery(id || '');
  console.log(product, error, isLoading);
  return (
    <div style={{ width: '100%' }}>
      <h1>Website Details</h1>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <>
          {product ? (
            <div>
              <h2>{product.name}</h2>
              <img
                src={product.imageUrl}
                alt={product.name}
                style={{
                  width: '200px',
                  height: '200px',
                  objectFit: 'cover',
                  borderRadius: '50%',
                }}
              />
              <p>Id on website</p>
              <p>{product.websiteId}</p>
              <p>Website</p>
              <p>{product.website.name}</p>
              <p>Last price</p>
              <p>
                {fCurrency(product.prices[product.prices.length - 1].price)} at{' '}
                {fDate(product.prices[product.prices.length - 1].date)}
              </p>
            </div>
          ) : (
            <div>
              <h2>{error?.toString()}</h2>
            </div>
          )}
        </>
      )}
    </div>
  );
}
