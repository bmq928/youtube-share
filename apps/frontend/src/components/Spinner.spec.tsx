import { render } from '@testing-library/react'
import { Spinner } from './Spinner'

describe('<Spinner />', () => {
  it('should have svg icon', () => {
    const { container } = render(<Spinner />)
    expect(container.querySelector('svg')).toBeDefined()
  })

  it('should have text if svg cannot display', () => {
    const { container } = render(<Spinner />)
    expect(container.querySelector('.sr-only')?.innerHTML).toEqual('Loading...')
  })
})
