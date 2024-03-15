import { Navigate, createLazyFileRoute } from '@tanstack/react-router'
import { VideoPreview } from '../components'
import { Spinner } from '../components/Spinner'
import { GetVideosResponse, useBearerToken, useVideos } from '../hooks'

export const Route = createLazyFileRoute('/')({
  component: Page,
})

function Page() {
  const { data: videos, isLoading } = useVideos()
  const { data: authData } = useBearerToken()

  if (isLoading) return <Spinner />
  if (!authData?.token) return <Navigate to="/login" />
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
