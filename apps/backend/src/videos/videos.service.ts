import { BadRequestException, Injectable } from '@nestjs/common'
import { VideoEntity } from './video.entity'
import { Repository } from 'typeorm'
import { InjectRepository } from '@nestjs/typeorm'
import { ShareVideoDto } from './videos.dto'
import { PaginatedDto } from '../common'

@Injectable()
export class VideosService {
  constructor(
    @InjectRepository(VideoEntity)
    private readonly videosRepo: Repository<VideoEntity>
  ) {}

  async list({
    page,
    perPage,
    sort,
    sortBy,
  }: PaginatedDto): Promise<VideoEntity[]> {
    return this.videosRepo.find({
      skip: (page - 1) * perPage,
      take: perPage,
      order: {
        [sortBy]: sort,
      },
      relations: {
        createdBy: true,
      },
    })
  }

  async share(idUser: string, { link }: ShareVideoDto): Promise<VideoEntity> {
    const existed = await this.videosRepo.findOneBy({ link })
    if (existed) throw new BadRequestException('this video already shared')

    return this.videosRepo.save(
      this.videosRepo.create({
        link,
        createdBy: {
          id: idUser,
        },
      })
    )
  }
}
