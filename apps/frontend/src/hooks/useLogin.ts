import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import {
  BEARER_TOKEN_LOCAL_STORAGE_KEY,
  BEARER_TOKEN_QUERY_KEY,
} from './useBearerToken'

export type UseLoginProps = { email: string; password: string }
export function useLogin() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (body: UseLoginProps) => {
      const resp = await fetch(`/api/v1/accounts/login`, {
        method: 'POST',
        body: JSON.stringify(body),
        headers: {
          'Content-Type': 'application/json',
        },
      })
      const respData = await resp.json()
      if (!resp.ok) throw new Error(respData.message)
      return respData
    },
    onSuccess: (data: { token: string }) => {
      localStorage.setItem(BEARER_TOKEN_LOCAL_STORAGE_KEY, data.token)
      // localstorage update is too slow, queryClient.invalidateQueries take effect faster => the query is wrong
      setTimeout(
        () =>
          queryClient.invalidateQueries({ queryKey: [BEARER_TOKEN_QUERY_KEY] }),
        10
      )
    },
    onError: (err) => {
      toast.error(err.message, { hideProgressBar: true })
    },
  })
}
