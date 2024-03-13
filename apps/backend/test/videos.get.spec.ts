import { HttpStatus, INestApplication } from '@nestjs/common'
import request from 'supertest'
import { AccountsService } from '../src/accounts'
import { PaginatedDto } from '../src/common'
import { VideoEntity } from '../src/videos'
import * as seedData from './seed-data'
import { testState } from './setup'

describe.each(['/videos'])('[GET] %s', (baseUrl: string) => {
  let token: string

  beforeEach(async () => {
    const app = testState.app as INestApplication
    const { email, password } = seedData.accounts[0]
    const resp = await app.get(AccountsService).login({ email, password })
    token = resp.token
  })

  it.each(
    [...Array(3)].map(() =>
      seedData.genValidQuery<VideoEntity>({
        omitRandKeys: true,
        sortByKeys: ['createdAt', 'createdBy', 'link'],
      })
    )
  )(
    'should response un authorized if not logged in \n%j',
    (q: Partial<PaginatedDto>) =>
      request(testState.app?.getHttpServer())
        .get(baseUrl)
        .query(q)
        .send()
        .expect(HttpStatus.UNAUTHORIZED)
  )

  it.each(
    [...Array(3)].map(() =>
      seedData.genValidQuery<VideoEntity>({
        omitRandKeys: true,
        sortByKeys: ['createdAt', 'createdBy', 'link'],
      })
    )
  )(
    'should response a list of video with createdBy user attached to it if not logged in \n%j',
    (q: Partial<PaginatedDto>) =>
      request(testState.app?.getHttpServer())
        .get(baseUrl)
        .set('Authorization', `Bearer ${token}`)
        .query(q)
        .send()
        .expect(HttpStatus.OK)
  )
})
