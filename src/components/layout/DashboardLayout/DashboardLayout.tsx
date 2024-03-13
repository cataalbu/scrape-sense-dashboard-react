import { Outlet } from 'react-router-dom';
import { Box } from '@mui/material';
import {
  Dashboard as DashboardIcon,
  Web as WebIcon,
  SportsMotorsports as SportsMotorsportsIcon,
} from '@mui/icons-material';

// import styles from './DashboardLayout.module.scss';
import Paths from '../../../routes/paths';

import { Sidebar } from '../Sidebar/Sidebar';

export function DashboardLayout() {
  return (
    <Box sx={{ display: 'flex' }}>
      <Sidebar
        listItems={[
          { label: 'Dashboard', icon: <DashboardIcon />, to: Paths.DASHBOARD },
          { label: 'Websites', icon: <WebIcon />, to: Paths.WEBSITES },
          {
            label: 'Products',
            icon: <SportsMotorsportsIcon />,
            to: Paths.PRODUCTS,
          },
          {
            label: 'Scrape tasks',
            icon: <SportsMotorsportsIcon />,
            to: Paths.SCRAPE_TASKS,
          },
        ]}
      />
      <Box component="main" sx={{ p: 3, width: '100%' }}>
        <Outlet />
      </Box>
    </Box>
  );
}
