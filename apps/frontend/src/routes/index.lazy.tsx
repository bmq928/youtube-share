import { createLazyFileRoute } from '@tanstack/react-router'
import { VideoPreview } from '../components'
import { Spinner } from '../components/Spinner'
import { useVideos } from '../hooks'

export const Route = createLazyFileRoute('/')({
  component: Page,
})

function Page() {
  const { data: videos, isLoading } = useVideos()
  if (isLoading) return <Spinner />
  return (
    <div className="px-10">
      <div className="py-10 px-40 flex gap-10 flex-col">
        {videos?.map(({ link, createdBy, like, dislike }) => (
          <VideoPreview
            key={link}
            link={link}
            createdBy={createdBy}
            like={like}
            dislike={dislike}
          />
        ))}
      </div>
    </div>
  )
}
