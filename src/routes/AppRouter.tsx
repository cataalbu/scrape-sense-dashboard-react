import { Route, Routes } from 'react-router-dom';

import WebsitesListPage from '@/pages/dashboard/websites/WebsitesListPage/WebsitesListPage';
import DashboardHomePage from '@/pages/dashboard/DashboardHomePage/DashboradHomePage';
import { DashboardLayout } from '@/components/layout';
import LoginPage from '@/pages/LoginPage/LoginPage';
import { RedirectAuthenticatedUser, RequireAuth } from '@/utils';

import { Role } from '@/constants/enums';

export default function AppRouter() {
  return (
    <Routes>
      {/* Public routes */}

      <Route path="unauthorized" element={<div>Unauthorized</div>} />

      <Route element={<RedirectAuthenticatedUser />}>
        <Route path="/" element={<div />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="register" element={<div />} />
      </Route>

      {/* Private routes */}

      {/* Guest */}
      <Route element={<RequireAuth requiredRoles={[Role.GUEST]} />}>
        <Route path="/dashboard/*" element={<DashboardLayout />}>
          <Route path="websites" element={<WebsitesListPage />} />
          <Route path="" element={<DashboardHomePage />} />
        </Route>
      </Route>

      {/* User */}
      <Route element={<RequireAuth requiredRoles={[Role.USER]} />}></Route>

      {/* Admin */}
      <Route element={<RequireAuth requiredRoles={[Role.ADMIN]} />}></Route>

      <Route path="*" element={<div>404</div>} />
    </Routes>
  );
}
