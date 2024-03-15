import { HttpStatus } from '@nestjs/common'
import request from 'supertest'
import { AccountEntity } from '../src/accounts'
import * as seedData from './seed-data'
import { testState } from './setup'
import { RegisterDto } from '../src/accounts/accounts.dto'

describe.each(['/accounts/register'])('[POST] %s', (baseUrl: string) => {
  it.each(seedData.genFakeAccounts())(
    'should return a jwt if account not existed \n%j',
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

  it.each(seedData.accounts)(
    'should return bad request if account existed \n%j',
    ({ email, password }: AccountEntity) =>
      request(testState.app?.getHttpServer())
        .post(baseUrl)
        .send({ email, password })
        .expect(({ body }) =>
          expect(body).toMatchObject({
            message: 'email is existed',
          })
        )
        .expect(HttpStatus.BAD_REQUEST)
  )

  it.each([
    { email: '', password: '!@#$ASDFzxcv123' },
    { email: 'kame@joko.com', password: '' },
    { email: 'kame@joko.com', password: 'asdflaksjf' },
    { email: 'kame@joko.com', password: 'asdflak3434' },
    { email: 'kame@joko.com', password: 'asdflaksjf' },
  ] as RegisterDto[])(
    'should return bad request if dto is invalid \n%j',
    ({ email, password }: RegisterDto) =>
      request(testState.app?.getHttpServer())
        .post(baseUrl)
        .send({ email, password })
        .expect(({ body }) =>
          expect(body).toMatchObject({
            message: expect.arrayContaining([]),
          })
        )
        .expect(HttpStatus.BAD_REQUEST)
  )
})
