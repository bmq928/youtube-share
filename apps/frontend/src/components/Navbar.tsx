import { Link } from '@tanstack/react-router'
import { useBearerToken, useLogout } from '../hooks'

export function Navbar() {
  const { data } = useBearerToken()
  const { mutate: logout } = useLogout()
  const isLogin = !!data?.token
  return (
    <nav className="flex border-b-[1px] border-b-black">
      <Link className="flex gap-2" to="/">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width={64}
          height={64}
          fill="none"
          viewBox="0 0 24 24"
        >
          <g stroke="#1C274C" strokeWidth={1.5}>
            <path
              strokeLinecap="round"
              d="M22 22H2M2 11l8.126-6.5a3 3 0 0 1 3.748 0L22 11"
            />
            <path
              strokeLinecap="round"
              d="M15.5 5.5v-2A.5.5 0 0 1 16 3h2.5a.5.5 0 0 1 .5.5v5"
              opacity={0.5}
            />
            <path strokeLinecap="round" d="M4 22V9.5M20 22V9.5" />
            <path
              d="M15 22v-5c0-1.414 0-2.121-.44-2.56C14.122 14 13.415 14 12 14c-1.414 0-2.121 0-2.56.44C9 14.878 9 15.585 9 17v5M14 9.5a2 2 0 1 1-4 0 2 2 0 0 1 4 0Z"
              opacity={0.5}
            />
          </g>
        </svg>
        <div className="flex justify-center items-center text-3xl">
          Funny Movies
        </div>
      </Link>
      <div className="ml-auto flex">
        {isLogin ? (
          <div className="flex gap-3 items-center justify-center">
            <div>{data.email}</div>
            <Link to="/share">
              <button className="px-4 border-[2px] border-black">
                Share a movie
              </button>
            </Link>
            <button
              className="px-4 border-[2px] border-black"
              onClick={() => logout()}
            >
              Logout
            </button>
          </div>
        ) : (
          <div className="flex gap-3 items-center justify-center">
            <Link to="/login">
              <button className="px-4 border-[2px] border-black">Login</button>
            </Link>
            <Link to="/register">
              <button className="px-4 border-[2px] border-black">
                Register
              </button>
            </Link>
          </div>
        )}
      </div>
    </nav>
  )
}
