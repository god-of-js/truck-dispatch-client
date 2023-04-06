export function removeUserSessionId() {
  localStorage.removeItem('jwt');
}

export function saveUserSessionId(jwt: string) {
  localStorage.setItem('jwt', jwt);
}

export function getUserSessionId() {
  return localStorage.getItem('jwt');
}
