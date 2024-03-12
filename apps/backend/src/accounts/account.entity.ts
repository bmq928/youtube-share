import { Entity, Column, OneToMany } from 'typeorm'
import { EntityPostgres } from '../common'
import { VideoEntity } from '../videos'

@Entity()
export class AccountEntity extends EntityPostgres {
  @Column({ unique: true })
  email: string

  @Column()
  password: string

  @OneToMany(() => VideoEntity, (v) => v.createdBy)
  videos?: VideoEntity[]
}
