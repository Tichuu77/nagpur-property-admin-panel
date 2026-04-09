import { Navigate, Outlet } from 'react-router-dom';

export default function PermissionRoute({ allowed = [], userPermissions = [], redirectTo = '/403' }) {
  const hasAccess = allowed.length === 0 || allowed.some((permission) => userPermissions.includes(permission));

  return hasAccess ? <Outlet /> : <Navigate to={redirectTo} replace />;
}
