import { createLazyFileRoute } from '@tanstack/react-router'
import { Navbar } from '../components'

export const Route = createLazyFileRoute('/')({
  component: Page,
})

function Page() {
  return (
    <div className="px-10">
      <Navbar isLogin={false} />
    </div>
  )
}
