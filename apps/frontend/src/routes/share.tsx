import { createFileRoute, redirect } from '@tanstack/react-router'
import { useForm } from 'react-hook-form'
import { useShareVideo } from '../hooks'
import { isLoggedIn } from '../utils'

export const Route = createFileRoute('/share')({
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
  const { register, handleSubmit } = useForm()
  const { mutate } = useShareVideo()

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
