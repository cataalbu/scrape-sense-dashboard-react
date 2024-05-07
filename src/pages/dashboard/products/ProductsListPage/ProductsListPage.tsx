import { useState } from 'react';
import { ProductsTable } from '@/components/products';
import { useGetProductsQuery } from '@/redux/features/products/productsApiSlice';
import { useGetWebsitesQuery } from '@/redux/features/websites/websitesApiSlice';
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from '@mui/material';

export default function ProductsListPage() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(25);

  const { data: websites } = useGetWebsitesQuery();
  const [website, setWebsite] = useState('');
  const handleWebsiteChange = (event: SelectChangeEvent) => {
    setWebsite(event.target.value as string);
  };

  const {
    data: products,
    error,
    isLoading,
  } = useGetProductsQuery({
    skip: page * rowsPerPage,
    limit: rowsPerPage,
    website: website !== '' ? website : undefined,
  });
  return (
    <div style={{ width: '100%' }}>
      <h1>Products</h1>
      <div
        style={{
          display: 'flex',
          marginBottom: '2rem',
        }}
      >
        {websites && (
          <FormControl
            variant="outlined"
            sx={{
              width: '8rem',
              marginRight: '0',
              marginLeft: 'auto',
            }}
          >
            <InputLabel id="demo-simple-select-label">Website</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={website}
              label="Website"
              onChange={handleWebsiteChange}
            >
              <MenuItem value={''}>All</MenuItem>
              {websites.data.map((website) => (
                <MenuItem key={website.id} value={website.id}>
                  {website.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        )}
      </div>
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
