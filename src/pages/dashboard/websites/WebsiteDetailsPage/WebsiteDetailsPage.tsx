import { InfoCard } from '@/components/common';
import { WebsiteType } from '@/constants/enums';
import { useGetWebsiteByIdQuery } from '@/redux/features/websites/websitesApiSlice';
import { useParams } from 'react-router-dom';

import styles from './WebsiteDetailsPage.module.scss';

export default function WebsiteDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const {
    data: website,
    isLoading,
    isSuccess,
    error,
  } = useGetWebsiteByIdQuery(id || '');
  return (
    <div className={styles['website-details-page']}>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <>
          {isSuccess ? (
            <>
              <h1 className={styles['title']}>{website.name}</h1>
              <div>
                <div className={styles['info-cards-container']}>
                  <InfoCard
                    title="Website url"
                    value={website.url}
                    className={styles['card']}
                  />
                  <InfoCard
                    title="Type"
                    value={
                      website.type === WebsiteType.CSR
                        ? 'Client-side rendered'
                        : 'Server-side rendered'
                    }
                    className={styles['card']}
                  />
                </div>
              </div>
            </>
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
