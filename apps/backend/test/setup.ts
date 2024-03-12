import { INestApplication, ValidationPipe } from '@nestjs/common'
import { ConfigType } from '@nestjs/config'
import { Test } from '@nestjs/testing'
import { pbkdf2Sync } from 'node:crypto'
import { DataSource } from 'typeorm'
import { AppModule } from '../src/app.module'
import { AccountEntity } from '../src/accounts'
import { VideoEntity } from '../src/videos'
import { accounts, videos } from './seed-data'
import { pbkdf2Config } from '../src/common'

export interface TestState {
  app: INestApplication | null
  ds: DataSource | null
}

export const testState: TestState = {
  app: null,
  ds: null,
}

beforeAll(async () => {
  const moduleFixture = await Test.createTestingModule({
    imports: [AppModule],
  }).compile()

  testState.app = moduleFixture.createNestApplication()
  testState.app.useGlobalPipes(new ValidationPipe({ transform: true }))
  await testState.app.init()

  testState.ds = await testState.app?.resolve(DataSource)
  await testState.ds?.runMigrations()
})

afterAll(async () => {
  await testState.ds?.destroy()
  await testState.app?.close()
  testState.app = null
  testState.ds = null
})

beforeEach(async () => {
  const {
    pbkdf2Digest,
    pbkdf2Iterations,
    pbkdf2KeyLens,
    pbkdf2Salt,
  }: ConfigType<typeof pbkdf2Config> = (testState.app as INestApplication).get(pbkdf2Config.KEY)
  await testState.ds?.getRepository(AccountEntity).insert(
    accounts.map(({ password, ...acc }) => ({
      ...acc,
      password: pbkdf2Sync(
        password,
        pbkdf2Salt,
        pbkdf2Iterations,
        pbkdf2KeyLens,
        pbkdf2Digest
      ).toString('hex'),
    }))
  )
  await testState.ds?.getRepository(VideoEntity).insert(videos)
})

afterEach(async () => {
  jest.resetAllMocks()
  await testState.ds?.getRepository(AccountEntity).delete({})
  await testState.ds?.getRepository(VideoEntity).delete({})
})
