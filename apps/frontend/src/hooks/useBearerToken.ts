import { useQuery } from '@tanstack/react-query'
import { getAuthToken } from '../utils'

export const BEARER_TOKEN_QUERY_KEY = 'BEARER_TOKEN_QUERY_KEY'
export const BEARER_TOKEN_LOCAL_STORAGE_KEY = 'authToken'
export function useBearerToken() {
  const token = getAuthToken()
  const userId = JSON.parse(atob(token.split('.')[1] ?? 'e30=')).id

  return useQuery({
    queryKey: [BEARER_TOKEN_QUERY_KEY],
    queryFn: () =>
      Promise.resolve({
        token,
        userId,
      }),
  })
}
