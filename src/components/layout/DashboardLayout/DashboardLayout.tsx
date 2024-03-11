import { Outlet } from 'react-router-dom';
import { Box } from '@mui/material';
import {
  Dashboard as DashboardIcon,
  Web as WebIcon,
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
        ]}
      />
      <Box component="main" sx={{ p: 3, width: '100%' }}>
        <Outlet />
      </Box>
    </Box>
  );
}
