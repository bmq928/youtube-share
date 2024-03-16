import { render } from '@testing-library/react'
import { VideoPreviewProps, VideoPreview } from './VideoPreview'

describe('<VideoPreview />', () => {
  it('should render all passing props', () => {
    const props: VideoPreviewProps = {
      link: 'https://www.youtube.com/embed/kame',
      createdBy: { email: 'kame@joko.com' },
    }
    const el = render(<VideoPreview {...props} />)
    expect(el.queryByText(props.createdBy.email)).toBeTruthy()
    expect(el.container.querySelector('iframe')?.src).toEqual(props.link)
  })
})
