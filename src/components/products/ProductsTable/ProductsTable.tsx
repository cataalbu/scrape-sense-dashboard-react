import { Button, TableCell, TableRow } from '@mui/material';
import { Link, generatePath } from 'react-router-dom';

import { AppTable } from '@/components/common/tables/AppTable/AppTable';
import Paths from '@/routes/paths';
import { Product } from '../../../constants/types';

interface ProductsTableProps {
  products: Omit<Product, 'prices'>[];
  isLoading: boolean;
  isSuccess: boolean;
  error: string;
}

export function ProductsTable({
  products,
  isLoading,
  isSuccess,
  error,
}: ProductsTableProps) {
  return (
    <>
      <AppTable
        isLoading={isLoading}
        isSuccess={isSuccess}
        error={error}
        headCells={[
          {
            id: 'id',
            label: 'ID',
          },
          {
            id: 'imageUrl',
            label: 'Image',
          },
          {
            id: 'name',
            label: 'Name',
          },

          {
            id: 'websiteId',
            label: 'Id on website',
          },
          {
            id: 'website',
            label: 'Website',
          },
          {
            id: 'navigate',
            label: '',
          },
        ]}
      >
        {products.map((product) => (
          <TableRow key={product.id}>
            <TableCell>{product.id}</TableCell>
            <TableCell>
              <img
                src={product.imageUrl}
                alt={product.name}
                style={{
                  width: '70px',
                  height: '70px',
                  objectFit: 'cover',
                  borderRadius: '50%',
                }}
              />
            </TableCell>
            <TableCell>{product.name}</TableCell>
            <TableCell>{product.websiteId}</TableCell>
            <TableCell>{product.website.name}</TableCell>

            <TableCell>
              <Button
                component={Link}
                to={generatePath(Paths.PRODUCT_DETAILS, { id: product.id })}
                variant="contained"
              >
                Details
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </AppTable>
    </>
  );
}
