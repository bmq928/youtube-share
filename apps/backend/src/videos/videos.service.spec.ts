import * as _ from 'lodash'
import { randomUUID } from 'node:crypto'
import { testState } from '../../test/setup'
import * as seedData from '../../test/seed-data'
import { VideosService } from './videos.service'
import { PaginatedDto } from '../common'
import { DataSource } from 'typeorm'
import { VideoEntity } from './video.entity'

describe('VideosService', () => {
  let service: VideosService

  beforeAll(() => {
    service = testState.app.get(VideosService)
  })

  describe('list()', () => {
    it.each([
      { page: 2, perPage: 2, sort: 'asc', sortBy: 'createdAt' },
    ] as PaginatedDto[])(
      'should return list of videos \n%j',
      ({ page, perPage, sort, sortBy }) =>
        expect(
          service.list({ page, perPage, sort, sortBy })
        ).resolves.toMatchObject(
          _.orderBy(seedData.videos, [sortBy], sort)
            .slice((page - 1) * perPage, page * perPage)
            .map(({ id }) => ({ id }))
        )
    )
  })

  describe('share()', () => {
    it.each(seedData.videos)(
      'should return bad request if video is already shared \n%j',
      ({ link }) =>
        expect(service.share(randomUUID(), { link })).rejects.toMatchObject({
          message: 'this video already shared',
        })
    )

    it.each(seedData.genFakeVideos())(
      'should save link to db',
      async ({ link }) => {
        const resp = await service.share(randomUUID(), { link })
        expect(resp).toMatchObject({ link })
        await expect(
          testState.app
            .get(DataSource)
            .getRepository(VideoEntity)
            .findBy({ link })
        ).resolves.toBeDefined()
      }
    )
  })
})
