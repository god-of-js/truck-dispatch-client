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

export function savePresentAuthStage(presentAuthStage: string) {
  localStorage.setItem('present-auth-stage', presentAuthStage);
}

export function getPresentAuthStage() {
  return localStorage.getItem('present-auth-stage');
}
export function removePresentAuthStage() {
  localStorage.removeItem('present-auth-stage');
  localStorage.removeItem('auth-token');
}
export function setPendingRoute(route: string) {
  localStorage.setItem('pending-route', route);
}
export function getPendingRoute() {
  return localStorage.getItem('pending-route');
}
