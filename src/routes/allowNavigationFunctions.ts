import { isTokenValid } from 'utils/helpers';

export function resetPasswordAccessChecks(searchUrl: string) {
  console.log(searchUrl);
  const searchParams = new URLSearchParams(searchUrl);

  const token = searchParams.get('token');

  return !!token && isTokenValid(token);
}
