import { useQuery } from '@tanstack/react-query'
import { useBearerToken } from './useBearerToken'
import { useLogout } from './useLogout'

export type GetVideosProps = {
  page?: number
  perPage?: number
}
export type GetVideosResponse = { createdBy: { email: string }; link: string }
export const VIDEOS_QUERY_KEY = 'VIDEOS_QUERY_KEY'
export function useVideos({ page = 1, perPage = 10 }: GetVideosProps = {}) {
  const { data } = useBearerToken()
  const { mutate: logout } = useLogout()

  return useQuery({
    queryKey: [VIDEOS_QUERY_KEY, { page, perPage }],
    queryFn: async () => {
      const resp = await fetch(
        `/api/v1/videos?page=${page}&perPage=${perPage}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${data?.token}`,
          },
        }
      )
      const respData = await resp.json()
      if (!resp.ok) {
        if (resp.status === 401) logout()
        throw new Error(respData.message)
      }
      return respData
    },
  })
}
