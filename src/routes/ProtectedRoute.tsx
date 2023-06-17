import { Navigate } from 'react-router-dom';

interface PrivateRouteProps {
  allowNavigation?: boolean;
  children?: React.ReactNode;
  reRouteUrl: string;
}
export function ProtectedRoute({
  allowNavigation,
  children,
  reRouteUrl,
}: PrivateRouteProps) {
  if (!allowNavigation) return <Navigate to={reRouteUrl} />;

  return <>{children}</>;
}
