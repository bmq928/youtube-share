import { Entity, Column, ManyToOne } from 'typeorm'
import { EntityPostgres as BaseEntity } from '../common'
import { AccountEntity } from '../accounts'

@Entity()
export class VideoEntity extends BaseEntity {
  @Column()
  link: string

  @ManyToOne(() => AccountEntity, (acc) => acc.videos, {
    createForeignKeyConstraints: false,
  })
  createdBy?: AccountEntity
}
