import { HttpStatus } from '@nestjs/common'
import request from 'supertest'
import { AccountEntity } from '../src/accounts'
import * as seedData from './seed-data'
import { testState } from './setup'

describe.each(['/accounts/register'])('[POST] %s', (baseUrl: string) => {
  it.each(seedData.genFakeAccounts())(
    'should return a jwt if account not existed \n%j',
    ({ email, password }: AccountEntity) =>
      request(testState.app?.getHttpServer())
        .post(baseUrl)
        .send({ email, password })
        .expect(HttpStatus.CREATED)
        .expect(({ body }) =>
          expect(body).toMatchObject({
            token: expect.stringMatching(
              /^([A-Za-z0-9-_=]+)\.([A-Za-z0-9-_=]+)\.([A-Za-z0-9-_.+/=]+)$/
            ),
          })
        )
  )

  it.each(seedData.accounts)(
    'should return bad request if account existed \n%j',
    ({ email, password }: AccountEntity) =>
      request(testState.app?.getHttpServer())
        .post(baseUrl)
        .send({ email, password })
        .expect(HttpStatus.BAD_REQUEST)
        .expect(({ body }) =>
          expect(body).toMatchObject({
            message: 'email is existed'
          })
        )
  )
})
