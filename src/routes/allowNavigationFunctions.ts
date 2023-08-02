import { isTokenValid } from 'utils/helpers';

export function resetPasswordAccessChecks(searchUrl: string) {
  const searchParams = new URLSearchParams(searchUrl);

  const token = searchParams.get('token');

  return !!token && isTokenValid(token);
}
