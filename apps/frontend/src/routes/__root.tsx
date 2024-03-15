import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { createRootRoute, Outlet } from '@tanstack/react-router'
import React, { Suspense } from 'react'
import { ToastContainer } from 'react-toastify'
import { Navbar } from '../components'
import { Spinner } from '../components/Spinner'

const TanStackRouterDevtools =
  process.env.NODE_ENV === 'production'
    ? () => null
    : React.lazy(() =>
        import('@tanstack/router-devtools').then((res) => ({
          default: res.TanStackRouterDevtools,
        }))
      )
const queryClient = new QueryClient()

export const Route = createRootRoute({
  component: () => (
    <Suspense fallback={<Spinner />}>
      <QueryClientProvider client={queryClient}>
        <div className="px-10">
          <Navbar />
        </div>
        <Outlet />
        <ToastContainer />
        <TanStackRouterDevtools />
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </Suspense>
  ),
})
