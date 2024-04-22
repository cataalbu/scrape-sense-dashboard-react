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
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  rowsPerPage: number;
  setRowsPerPage: React.Dispatch<React.SetStateAction<number>>;
  count: number;
}

export function ProductsTable({
  products,
  isLoading,
  isSuccess,
  error,
  page,
  setPage,
  rowsPerPage,
  setRowsPerPage,
  count,
}: ProductsTableProps) {
  return (
    <>
      <AppTable
        isLoading={isLoading}
        isSuccess={isSuccess}
        error={error}
        page={page}
        setPage={setPage}
        rowsPerPage={rowsPerPage}
        setRowsPerPage={setRowsPerPage}
        count={count}
        headCells={[
          {
            id: 'id',
            label: 'ID',
          },
          {
            id: 'imageURL',
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
                src={product.imageURL}
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
