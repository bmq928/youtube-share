import { createFileRoute, redirect, useRouter } from '@tanstack/react-router'
import { VideoPreview } from '../components'
import { Spinner } from '../components/Spinner'
import { GetVideosResponse, useVideos } from '../hooks'
import { isLoggedIn } from '../utils'

export const Route = createFileRoute('/')({
  component: Page,
  beforeLoad: () => {
    if (!isLoggedIn())
      throw redirect({
        to: '/login',
        search: {
          redirect: window.location.href,
        },
      })
  },
})

function Page() {
  const { data: videos, isLoading } = useVideos()
  if (isLoading) return <Spinner />
  return (
    <div className="px-10">
      <div className="py-10 px-40 flex gap-10 flex-col">
        {videos?.map(({ link, createdBy: { email } }: GetVideosResponse) => (
          <VideoPreview
            key={link}
            link={link}
            createdBy={{ email }}
            like={0}
            dislike={0}
          />
        ))}
      </div>
    </div>
  )
}
