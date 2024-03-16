import { testState } from '../../test/setup'
import * as seedData from '../../test/seed-data'
import { AccountsService } from './accounts.service'

describe('AccountsService', () => {
  let service: AccountsService

  beforeAll(() => {
    service = testState.app.get(AccountsService)
  })

  describe('login()', () => {
    it.each(seedData.accounts)(
      'should return jwt if both email and password are correct \n%j',
      ({ email, password }) =>
        expect(service.login({ email, password })).resolves.toMatchObject({
          token: expect.stringMatching(
            /^([A-Za-z0-9-_=]+)\.([A-Za-z0-9-_=]+)\.([A-Za-z0-9-_.+/=]+)$/
          ),
        })
    )
    it.each(seedData.genFakeAccounts())(
      'should throw BadRequest if email is incorrect',
      ({ email, password }) =>
        expect(service.login({ email, password })).rejects.toMatchObject({
          message: 'email or password is wrong',
        })
    )
    it.each(seedData.genFakeAccounts())(
      'should throw BadRequest if password is incorrect',
      ({ email, password }) =>
        expect(service.login({ email, password })).rejects.toMatchObject({
          message: 'email or password is wrong',
        })
    )
  })

  describe('register()', () => {
    it.each(seedData.genFakeAccounts())(
      'should return jwt if both email and password are correct \n%j',
      ({ email, password }) =>
        expect(service.register({ email, password })).resolves.toMatchObject({
          token: expect.stringMatching(
            /^([A-Za-z0-9-_=]+)\.([A-Za-z0-9-_=]+)\.([A-Za-z0-9-_.+/=]+)$/
          ),
        })
    )

    it.each(seedData.accounts)(
      'should throw BadRequest if email is existed',
      ({ email, password }) =>
        expect(service.register({ email, password })).rejects.toMatchObject({
          message: 'email is existed',
        })
    )

    it.each(seedData.genFakeAccounts())(
      'should hash password before saving to db \n%j',
      ({ email, password }) =>
        expect(
          service.register({ email, password })
        ).resolves.not.toMatchObject({
          password,
        })
    )
  })
})
