import { useParams } from 'react-router-dom';
import { LineChart } from '@mui/x-charts/LineChart';

import { useGetProductByIdQuery } from '@/redux/features/products/productsApiSlice';
import { fStringDate } from '@/utils';
import { fCurrency } from '@/utils/formatNumber';

import styles from './ProductsDetailsPage.module.scss';
import { InfoCard } from '@/components/common';

export default function ProductsDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const { data: product, error, isLoading } = useGetProductByIdQuery(id || '');

  return (
    <div className={styles['products-details-page']}>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <>
          {product ? (
            <div>
              <h1 className={styles['title']}>{product.name}</h1>
              <div className={styles['product-info']}>
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  style={{
                    width: '300px',
                    height: '300px',
                    objectFit: 'cover',
                    marginRight: '3rem',
                  }}
                />
                <div className={styles['info-cards-container']}>
                  <InfoCard
                    title="Website"
                    value={product.website.name}
                    className={styles['card']}
                  />
                  <InfoCard
                    title="Id on website"
                    value={product.websiteId}
                    className={styles['card']}
                  />
                  <InfoCard
                    title="Lasst price"
                    value={`${fCurrency(
                      product.prices[product.prices.length - 1].price
                    )} at 
                  ${fStringDate(
                    product.prices[product.prices.length - 1].date
                  )}`}
                    className={styles['card']}
                  />
                </div>
              </div>
              <p className={styles['price-history-title']}>Price history</p>
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
                yAxis={[
                  {
                    label: 'Price',
                    scaleType: 'linear',
                  },
                ]}
                series={[
                  {
                    data: product.prices.map((p) => p.price),
                    showMark: ({ index }) => index % 2 === 0,
                  },
                ]}
                width={500}
                height={400}
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
