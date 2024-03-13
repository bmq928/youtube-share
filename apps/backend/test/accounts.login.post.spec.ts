import * as seedData from './seed-data'
import request from 'supertest'
import { testState } from './setup'
import { AccountEntity } from '../src/accounts'
import * as _ from 'lodash'
import { HttpStatus } from '@nestjs/common'

describe.each(['/accounts/login'])('[POST] %s', (baseUrl: string) => {
  it.each(seedData.accounts)(
    'should return a jwt if account existed \n%j',
    ({ email, password }: AccountEntity) =>
      request(testState.app?.getHttpServer())
        .post(baseUrl)
        .send({ email, password })
        .expect(({ body }) =>
          expect(body).toMatchObject({
            token: expect.stringMatching(
              /^([A-Za-z0-9-_=]+)\.([A-Za-z0-9-_=]+)\.([A-Za-z0-9-_.+/=]+)$/
            ),
          })
        )
        .expect(HttpStatus.CREATED)
  )

  it.each(seedData.genFakeAccounts())(
    'should return bad request if account not existed \n%j',
    ({ email, password }: AccountEntity) =>
      request(testState.app?.getHttpServer())
        .post(baseUrl)
        .send({ email, password })
        .expect(({ body }) =>
          expect(body).toMatchObject({
            message: 'email or password is wrong',
          })
        )
        .expect(HttpStatus.BAD_REQUEST)
  )
})
