import { Outlet } from 'react-router-dom';
import { Box } from '@mui/material';
import { Inbox } from '@mui/icons-material';

// import styles from './DashboardLayout.module.scss';
import Paths from '../../../routes/paths';

import Sidebar from '../Sidebar/Sidebar';

export default function DashboardLayout() {
  return (
    <Box sx={{ display: 'flex' }}>
      <Sidebar
        listItems={[
          { label: 'Dashboard', icon: <Inbox />, to: Paths.DASHBOARD },
          { label: 'ABOUT', icon: <Inbox />, to: Paths.ABOUT },
        ]}
      />
      <Box component="main" sx={{ p: 3 }}>
        <Outlet />
      </Box>
    </Box>
  );
}
