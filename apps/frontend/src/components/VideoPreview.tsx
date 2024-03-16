export type VideoPreviewProps = {
  link: string
  createdBy: { email: string }
}
export function VideoPreview({ link, createdBy }: VideoPreviewProps) {
  return (
    <div className="flex">
      <iframe title={link} src={link} />
      <div className="flex flex-col gap-4 px-10">
        <div className="text-xl">Shared by</div>
        <div className=""> {createdBy.email}</div>
      </div>
    </div>
  )
}
