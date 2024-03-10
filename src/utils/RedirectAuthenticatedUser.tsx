import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAppSelector } from '../redux/hooks';
import Paths from '../routes/paths';

export default function RedirectAuthenticatedUser() {
  const { user } = useAppSelector((state) => state.auth);
  const location = useLocation();

  return user ? (
    <>
      {/* Replace their location to /dashboard inside their navigation history */}
      <Navigate to={Paths.DASHBOARD} state={{ from: location }} replace />
    </>
  ) : (
    <Outlet />
  );
}
