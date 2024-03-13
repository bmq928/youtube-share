import { faker } from '@faker-js/faker'
import { AccountEntity } from '../src/accounts'
import { VideoEntity } from '../src/videos'
import { PaginatedDto, SortEnum } from '../src/common'

export const genFakeAccounts = (num = 3): AccountEntity[] =>
  [...Array(num)].map(() => ({
    id: faker.string.uuid(),
    email: faker.internet.email(),
    password: faker.internet.password({ prefix: '!QAZ2wsx' }),
    createdAt: faker.date.past(),
    updatedAt: faker.date.future(),
    videos: [],
  }))

export const genFakeVideos = (num = 3): VideoEntity[] =>
  [...Array(num)].map(() => ({
    id: faker.string.uuid(),
    link: faker.internet.url(),
    createdAt: faker.date.past(),
    updatedAt: faker.date.future(),
  }))

const omit = <T extends Record<string, unknown>>(
  o: T,
  keys: (keyof T)[]
): Partial<T> =>
  Object.keys(o)
    .filter((k) => !keys.includes(k))
    .reduce((acc, cur) => ({ ...acc, [cur]: o[cur] }), {})

export const genValidQuery = <T>({
  omitRandKeys,
  sortByKeys = [],
}: {
  omitRandKeys: boolean
  sortByKeys: (keyof T & string)[]
}): Partial<PaginatedDto> =>
  [
    {
      page: faker.number.int({ min: 1 }),
      perPage: faker.number.int({ min: 1, max: 100 }),
      sort: faker.helpers.enumValue(SortEnum),
      sortBy: faker.helpers.arrayElement(sortByKeys),
    },
  ].map((q) =>
    omitRandKeys
      ? omit(q, faker.helpers.arrayElements(Object.keys(q)) as any[])
      : q
  )[0]

const accounts = genFakeAccounts()
const videos = genFakeVideos()

for (const video of videos)
  accounts[faker.number.int({ min: 0, max: videos.length - 1 })].videos?.push(
    video
  )

export { accounts, videos }
