import { useQuery } from '@tanstack/react-query'

export const BEARER_TOKEN_QUERY_KEY = 'BEARER_TOKEN_QUERY_KEY'
export const BEARER_TOKEN_LOCAL_STORAGE_KEY = 'authToken'
export function useBearerToken() {
  const token = localStorage.getItem(BEARER_TOKEN_LOCAL_STORAGE_KEY) ?? ''
  const { id: userId, email } = JSON.parse(atob(token.split('.')[1] ?? 'e30='))

  return useQuery({
    queryKey: [BEARER_TOKEN_QUERY_KEY],
    queryFn: () =>
      Promise.resolve({
        token,
        userId,
        email,
      }),
  })
}
