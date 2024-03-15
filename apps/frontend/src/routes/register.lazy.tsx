import { Navigate, createLazyFileRoute } from '@tanstack/react-router'
import { useForm } from 'react-hook-form'
import { useBearerToken, useRegister } from '../hooks'

export const Route = createLazyFileRoute('/register')({
  component: Page,
})

function Page() {
  const { register, handleSubmit } = useForm()
  const { mutate } = useRegister()
  const { data: authData } = useBearerToken()

  if (authData?.token) return <Navigate to="/" />

  return (
    <div className="px-10 flex w-full h-screen justify-center items-center flex-col gap-2">
      <form
        className="border-[2px] border-black px-24 py-4 flex flex-col gap-3 rounded-lg"
        onSubmit={handleSubmit((data: any) => mutate(data))}
      >
        <div className="translate-y-[-29px] translate-x-[-80px] bg-white text-center w-20 text-sm">
          Register
        </div>
        <div className="flex gap-11">
          <label htmlFor="login-email" className="mr-[1px]">
            Email
          </label>
          <input
            className="border-[1px] border-black rounded-sm"
            type="email"
            id="login-email"
            {...register('email')}
          />
        </div>
        <div className="flex gap-4">
          <label htmlFor="login-password">Password</label>
          <input
            className="border-[1px] border-black rounded-sm"
            type="password"
            id="login-password"
            {...register('password')}
          />
        </div>
        <button className="px-4 border-[2px] border-black" type="submit">
          Register
        </button>
      </form>
    </div>
  )
}
