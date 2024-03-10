import { Route, Routes } from 'react-router-dom';
import LoginPage from '../pages/LoginPage/LoginPage';
import RequireAuth from '../utils/RequireAuth';
import RedirectAuthenticatedUser from '../utils/RedirectAuthenticatedUser';
import { Role } from '../constants/enums';
import DashboardLayout from '../components/layout/DashboardLayout/DashboardLayout';

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
          <Route path="" element={<div>Welcome to dashboard</div>} />
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
