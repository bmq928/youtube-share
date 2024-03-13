import { HttpStatus, INestApplication } from '@nestjs/common'
import request from 'supertest'
import { AccountsService } from '../src/accounts'
import { VideoEntity } from '../src/videos'
import * as seedData from './seed-data'
import { testState } from './setup'

describe.each(['/videos/share'])('[POST] %s', (baseUrl: string) => {
  let token: string

  beforeEach(async () => {
    const app = testState.app as INestApplication
    const { email, password } =
      seedData.accounts[Math.floor(Math.random() * seedData.accounts.length)]
    const resp = await app.get(AccountsService).login({ email, password })
    token = resp.token
  })

  it.each(seedData.genFakeVideos())(
    'should response un authorized if not logged in \n%j',
    ({ link }: VideoEntity) =>
      request(testState.app?.getHttpServer())
        .post(baseUrl)
        .send({ link })
        .expect(HttpStatus.UNAUTHORIZED)
  )

  it.each(seedData.genFakeVideos())(
    'should response a list of video with createdBy user attached to it if not logged in \n%j',
    ({ link }: VideoEntity) =>
      request(testState.app?.getHttpServer())
        .post(baseUrl)
        .set('Authorization', `Bearer ${token}`)
        .send({ link })
        .expect(({ body }) => expect(body).toMatchObject({ link }))
        .expect(HttpStatus.CREATED)
  )

  it.each(seedData.videos)(
    'should response bad request if user post the same video again \n%j',
    ({ link }: VideoEntity) =>
      request(testState.app?.getHttpServer())
        .post(baseUrl)
        .set('Authorization', `Bearer ${token}`)
        .send({ link })
        .expect(HttpStatus.BAD_REQUEST)
        .expect(({ body }) =>
          expect(body).toMatchObject({
            message: 'this video already shared',
          })
        )
  )
})
