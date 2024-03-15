import {
  BEARER_TOKEN_LOCAL_STORAGE_KEY,
  BEARER_TOKEN_QUERY_KEY,
} from './useBearerToken'
import { toast } from 'react-toastify'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export function useLogout() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async () =>
      localStorage.removeItem(BEARER_TOKEN_LOCAL_STORAGE_KEY),
    onSuccess: () =>
      setTimeout(
        () =>
          queryClient.invalidateQueries({ queryKey: [BEARER_TOKEN_QUERY_KEY] }),
        10
      ), // localstorage update is too slow, queryClient.invalidateQueries take effect faster => the query is wrong
    onError: (err) => {
      toast.error(err.message, { hideProgressBar: true })
    },
  })
}
