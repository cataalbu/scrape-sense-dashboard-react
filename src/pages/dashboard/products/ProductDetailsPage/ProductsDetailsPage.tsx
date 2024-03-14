import { useParams } from 'react-router-dom';
import { LineChart } from '@mui/x-charts/LineChart';

import { useGetProductByIdQuery } from '@/redux/features/products/productsApiSlice';
import { fStringDate } from '@/utils';
import { fCurrency } from '@/utils/formatNumber';

export default function ProductsDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const { data: product, error, isLoading } = useGetProductByIdQuery(id || '');

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
                {fStringDate(product.prices[product.prices.length - 1].date)}
              </p>
              <LineChart
                xAxis={[
                  {
                    label: 'Date',
                    scaleType: 'time',
                    valueFormatter: (date) => fStringDate(date),
                    data: product.prices.map((p) => new Date(p.date)),
                    tickInterval: product.prices.map((p) => new Date(p.date)),
                  },
                ]}
                series={[
                  {
                    data: product.prices.map((p) => p.price),
                    showMark: ({ index }) => index % 2 === 0,
                  },
                ]}
                width={500}
                height={300}
              />
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
