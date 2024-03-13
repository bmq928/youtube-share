import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common'
import { ShareVideoDto } from './videos.dto'
import { VideosService } from './videos.service'
import { AuthGuard, AuthUser, AuthUserType, PaginatedDto } from '../common'

@UseGuards(AuthGuard)
@Controller('videos')
export class VideosController {
  constructor(private readonly videosService: VideosService) {}

  @Get()
  list(@Query() q: PaginatedDto) {
    return this.videosService.list(q)
  }

  @Post('/share')
  share(@Body() dto: ShareVideoDto, @AuthUser() { id }: AuthUserType) {
    return this.videosService.share(id, dto)
  }
}
