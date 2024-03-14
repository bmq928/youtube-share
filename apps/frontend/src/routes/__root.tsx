import { createRootRoute, Outlet } from '@tanstack/react-router'
import { QueryClientProvider, QueryClient } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import React, { Suspense } from 'react'
import { Spinner } from '../components/Spinner'
import { Navbar } from '../components'

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
        <TanStackRouterDevtools />
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </Suspense>
  ),
})
