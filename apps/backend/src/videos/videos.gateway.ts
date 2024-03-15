import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  WsResponse,
} from '@nestjs/websockets'

@WebSocketGateway()
export class VideosGateway {
  @SubscribeMessage('videos.shared')
  async onVideosShared(
    @MessageBody() payload: { link: string }
  ): Promise<WsResponse> {
    return { data: payload, event: 'videos.shared' }
  }
}
