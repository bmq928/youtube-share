import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/login')({
  component: Page,
})

function Page() {
  return (
    <div className="px-10 flex w-full h-screen justify-center items-center flex-col gap-2">
      <form className="border-[2px] border-black px-24 py-4 flex flex-col gap-3 rounded-lg">
        <div className="translate-y-[-29px] translate-x-[-80px] bg-white text-center w-16 text-sm">
          Login
        </div>
        <div className="flex gap-11">
          <label htmlFor="login-email" className="mr-[1px]">
            Email
          </label>
          <input
            className="border-[1px] border-black rounded-sm"
            type="text"
            id="login-email"
          />
        </div>
        <div className="flex gap-4">
          <label htmlFor="login-password">Password</label>
          <input
            className="border-[1px] border-black rounded-sm"
            type="password"
            id="login-password"
          />
        </div>
        <button className="px-4 border-[2px] border-black" type="submit">
          Login
        </button>
      </form>
    </div>
  )
}
