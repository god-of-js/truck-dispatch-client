import { Navigate } from 'react-router-dom';

interface PrivateRouteProps {
  allowNavigation?: boolean;
  children?: React.ReactNode;
  reRouteUrl: string;
  reRouteCheck?: (search: string) => boolean;
}
export function ProtectedRoute({
  allowNavigation,
  children,
  reRouteUrl,
}: PrivateRouteProps) {
  if (!allowNavigation) return <Navigate to={reRouteUrl} />;

  return <>{children}</>;
}
