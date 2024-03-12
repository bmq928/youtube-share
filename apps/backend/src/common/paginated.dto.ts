import { Type } from 'class-transformer'
import { IsEnum, IsInt, IsNumber, IsString, Max, Min } from 'class-validator'

/* eslint-disable @typescript-eslint/no-inferrable-types */
export enum SortEnum {
  ASC = 'asc',
  DESC = 'desc',
}

export class PaginatedDto {
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @IsNumber()
  page: number = 1

  @Type(() => Number)
  @IsInt()
  @Max(100)
  @Min(1)
  perPage: number = 10

  @IsEnum(SortEnum)
  sort: SortEnum = SortEnum.DESC

  @IsString()
  sortBy: string = 'createdAt'
}

export class PageInfo extends PaginatedDto {
  total: number
}

export class PaginatedResponse {
  pageInfo: PageInfo
}
