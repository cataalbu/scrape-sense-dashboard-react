import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAppSelector } from '../redux/hooks';
import { Role } from '../constants/enums';

export default function RequireAuth({
  requiredRoles,
}: {
  requiredRoles: Role[];
}) {
  const { user } = useAppSelector((state) => state.auth);
  const location = useLocation();

  if (user?.roles?.find((role: Role) => requiredRoles?.includes(role)))
    return <Outlet />;

  return user?.email ? (
    <>
      {/* Replace their location to /unauthorized inside their navigation history */}
      <Navigate to="/unauthorized" state={{ from: location }} replace />
    </>
  ) : (
    <>
      {/* Replace their location to /login inside their navigation history */}
      <Navigate to="/login" state={{ from: location }} replace />
    </>
  );
}
