import { WebsiteType } from '@/constants/enums';
import { useGetWebsiteByIdQuery } from '@/redux/features/websites/websitesApiSlice';
import { useParams } from 'react-router-dom';

export default function WebsiteDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const {
    data: website,
    isLoading,
    isSuccess,
    error,
  } = useGetWebsiteByIdQuery(id || '');
  return (
    <div style={{ width: '100%' }}>
      <h1>Website Details</h1>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <>
          {isSuccess ? (
            <div>
              <h2>{website.name}</h2>
              <p>{website.url}</p>
              <p>
                {website.type === WebsiteType.CSR
                  ? 'Client-side rendered'
                  : 'Server-side rendered'}
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
