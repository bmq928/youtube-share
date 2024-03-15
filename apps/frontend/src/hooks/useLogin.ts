import { useMutation, useQueryClient } from '@tanstack/react-query'
import { setAuthToken } from '../utils'

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
      setAuthToken(data.token)
    },
  })
}