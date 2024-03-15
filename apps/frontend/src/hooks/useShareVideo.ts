import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useBearerToken } from './useBearerToken'
import { VIDEOS_QUERY_KEY } from './useVideos'

export type UseShareVideoProps = {
  link: string
}
export function useShareVideo() {
  const queryClient = useQueryClient()
  const { data } = useBearerToken()

  return useMutation({
    mutationFn: async (body: UseShareVideoProps) => {
      const resp = await fetch('/api/v1/videos/share', {
        method: 'POST',
        body: JSON.stringify(body),
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${data?.token}`,
        },
      })
      const respData = await resp.json()
      if (!resp.ok) throw new Error(respData.message)
      return respData
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [VIDEOS_QUERY_KEY] })
    },
  })
}
