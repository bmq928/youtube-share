import { Navigate, createLazyFileRoute } from '@tanstack/react-router'
import { useForm } from 'react-hook-form'
import { useBearerToken, useShareVideo } from '../hooks'

export const Route = createLazyFileRoute('/share')({
  component: Page,
})

function Page() {
  const { register, handleSubmit } = useForm()
  const { mutate } = useShareVideo()
  const { data: authData } = useBearerToken()

  if (!authData?.token) return <Navigate to="/login" />

  return (
    <div className="px-10 flex w-full h-screen justify-center items-center flex-col gap-2">
      <form
        className="border-[2px] border-black px-24 py-4 flex flex-col gap-3 rounded-lg"
        onSubmit={handleSubmit((data: any) => mutate(data))}
      >
        <div className="translate-y-[-29px] translate-x-[-80px] bg-white text-center w-40 text-sm">
          Share a Youtube movie
        </div>
        <div className="flex gap-4">
          <label htmlFor="share">Youtube URL</label>
          <input
            className="border-[1px] border-black rounded-sm"
            type="text"
            id="share"
            {...register('link')}
          />
        </div>
        <button className="px-4 border-[2px] border-black" type="submit">
          Share
        </button>
      </form>
    </div>
  )
}
