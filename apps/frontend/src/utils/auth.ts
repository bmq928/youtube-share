export const BEARER_TOKEN_LOCAL_STORAGE_KEY = 'authToken'
export function isLoggedIn() {
  return !!localStorage.getItem(BEARER_TOKEN_LOCAL_STORAGE_KEY)
}
export function setAuthToken(token: string): void {
  localStorage.setItem(BEARER_TOKEN_LOCAL_STORAGE_KEY, token)
}
export function getAuthToken(): string {
  return localStorage.getItem(BEARER_TOKEN_LOCAL_STORAGE_KEY) ?? ''
}
