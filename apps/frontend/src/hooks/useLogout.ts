import {
  BEARER_TOKEN_LOCAL_STORAGE_KEY,
  BEARER_TOKEN_QUERY_KEY,
} from './useBearerToken'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export function useLogout() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async () =>
      localStorage.removeItem(BEARER_TOKEN_LOCAL_STORAGE_KEY),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: [BEARER_TOKEN_QUERY_KEY] }),
  })
}
