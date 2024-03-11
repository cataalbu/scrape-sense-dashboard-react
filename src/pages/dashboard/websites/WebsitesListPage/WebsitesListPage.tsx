import { WebsitesTable } from '@/components/websites';
import { useGetWebsitesQuery } from '@/redux/features/websites/websitesApiSlice';

export default function WebsitesListPage() {
  const { data: websites, isLoading, isSuccess, error } = useGetWebsitesQuery();

  return (
    <div style={{ width: '100%' }}>
      <h1>Websites</h1>
      <WebsitesTable
        websites={websites || []}
        isLoading={isLoading}
        isSuccess={isSuccess}
        error={error?.toString() || ''}
      />
    </div>
  );
}
