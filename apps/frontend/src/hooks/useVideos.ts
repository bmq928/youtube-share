import { useQuery } from '@tanstack/react-query'

export type GetVideosResponse = { createdBy: string; link: string }
export const VIDEOS_QUERY_KEY = 'VIDEOS_QUERY_KEY'
export function useVideos() {
  return useQuery({
    queryKey: [VIDEOS_QUERY_KEY],
    queryFn: () =>
      Promise.resolve([
        {
          createdBy: 'kame@joko.com',
          link: 'https://www.youtube.com/embed/fRUJjOViokk',
          like: 0,
          dislike: 0,
        },
        {
          createdBy: 'kame@joko.com',
          link: 'https://www.youtube.com/embed/kq4jUTgwQeE',
          like: 0,
          dislike: 0,
        },
      ]),
  })
}
