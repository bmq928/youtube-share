import { IsUrl } from 'class-validator'

export class ShareVideoDto {
  @IsUrl()
  link: string
}
