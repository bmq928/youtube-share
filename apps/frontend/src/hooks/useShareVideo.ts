import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import { useBearerToken } from './useBearerToken'
import { useLogout } from './useLogout'
import { VIDEOS_QUERY_KEY } from './useVideos'

export type UseShareVideoProps = {
  link: string
}
export function useShareVideo() {
  const queryClient = useQueryClient()
  const { mutate: logout } = useLogout()
  const { data } = useBearerToken()

  return useMutation({
    mutationFn: async (body: UseShareVideoProps) => {
      if (!data?.token) return

      const resp = await fetch('/api/v1/videos/share', {
        method: 'POST',
        body: JSON.stringify(body),
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${data?.token}`,
        },
      })
      const respData = await resp.json()
      if (!resp.ok) {
        if (resp.status === 401) logout()
        throw new Error(respData.message)
      }
      return respData
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [VIDEOS_QUERY_KEY] })
    },
    onError: (err) => {
      toast.error(err.message, { hideProgressBar: true })
    },
  })
}
