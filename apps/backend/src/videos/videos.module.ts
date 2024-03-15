import { Module } from '@nestjs/common'
import { VideosController } from './videos.controller'
import { VideosService } from './videos.service'
import { TypeOrmModule } from '@nestjs/typeorm'
import { VideoEntity } from './video.entity'
import { VideosGateway } from './videos.gateway'

@Module({
  imports: [TypeOrmModule.forFeature([VideoEntity])],
  controllers: [VideosController],
  providers: [VideosService, VideosGateway],
})
export class VideosModule {}
