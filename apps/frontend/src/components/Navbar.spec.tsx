import { render } from '@testing-library/react'
import { Navbar } from './Navbar'

describe('<Navbar />', () => {
  vi.mock('../hooks', () => ({
    useBearerToken: vi
      .fn()
      .mockReturnValueOnce({ data: { token: '' } })
      .mockReturnValueOnce({ data: { token: '' } })
      .mockReturnValueOnce({
        data: {
          token: 'somethign',
          email: 'kame@joko.com.vn',
        },
      }),
    useLogout: () => ({ mutate: vi.fn() }),
  }))

  vi.mock('@tanstack/react-router', () => ({
    Link: (props: any) => <a {...props} />,
  }))

  afterAll(() => {
    vi.restoreAllMocks()
  })

  it('should have icon and brand', () => {
    const el = render(<Navbar />)
    expect(el.queryByText('Funny Movies')).toBeTruthy()
    expect(el.container.querySelector('svg')).toBeTruthy()
  })

  it('should display login and register btn when not logged in', () => {
    const el = render(<Navbar />)
    expect(el.queryByText('Login')).toBeTruthy()
    expect(el.queryByText('Register')).toBeTruthy()
  })

  it('should display logout btn and logged user email when logged in', () => {
    const el = render(<Navbar />)
    expect(el.queryByText('Share a movie')).toBeTruthy()
    expect(el.queryByText('kame@joko.com.vn')).toBeTruthy()
  })
})
