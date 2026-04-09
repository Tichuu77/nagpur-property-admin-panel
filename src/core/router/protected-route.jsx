import { Navigate, Outlet } from 'react-router-dom';

export default function ProtectedRoute({ isAuthenticated = false, redirectTo = '/login' }) {
  return isAuthenticated ? <Outlet /> : <Navigate to={redirectTo} replace />;
}
