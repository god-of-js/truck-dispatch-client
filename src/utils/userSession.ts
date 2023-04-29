export function removeUserSessionId() {
  localStorage.removeItem('jwt');
}

export function saveUserSessionId(jwt: string) {
  localStorage.setItem('jwt', jwt);
}
export function getUserSessionId() {
  return localStorage.getItem('jwt');
}
export function removeAuthSessionId() {
  localStorage.removeItem('auth-token');
}
export function saveAuthSessionId(jwt: string) {
  localStorage.setItem('auth-token', jwt);
}

export function getAuthSessionId() {
  return localStorage.getItem('auth-token');
}
