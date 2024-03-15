import { Matches } from 'class-validator'

export class ShareVideoDto {
  @Matches(/^https:\/\/www\.youtube\.com\/embed\/[a-zA-Z0-9]+$/g)
  link: string
}
