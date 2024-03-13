import { BadRequestException, Inject, Injectable } from '@nestjs/common'
import { pbkdf2Sync } from 'node:crypto'
import { InjectRepository } from '@nestjs/typeorm'
import { JwtService } from '@nestjs/jwt'
import { Repository } from 'typeorm'
import { LoginDto, RegisterDto } from './accounts.dto'
import { TokenResponse } from './accounts.response'
import { AccountEntity } from './account.entity'
import { jwtConfig, pbkdf2Config } from '../common'
import { ConfigType } from '@nestjs/config'

@Injectable()
export class AccountsService {
  constructor(
    @InjectRepository(AccountEntity)
    private readonly accountsRepo: Repository<AccountEntity>,
    @Inject(pbkdf2Config.KEY)
    private readonly pbkdf2Env: ConfigType<typeof pbkdf2Config>,
    @Inject(jwtConfig.KEY)
    private readonly jwtEnv: ConfigType<typeof jwtConfig>,
    private readonly jwtService: JwtService
  ) {}

  async login({ email, password }: LoginDto): Promise<TokenResponse> {
    const founded = await this.accountsRepo.findOneBy({
      email,
      password: pbkdf2Sync(
        password,
        this.pbkdf2Env.pbkdf2Salt,
        this.pbkdf2Env.pbkdf2Iterations,
        this.pbkdf2Env.pbkdf2KeyLens,
        this.pbkdf2Env.pbkdf2Digest
      ).toString('hex'),
    })
    if (!founded) throw new BadRequestException('email or password is wrong')

    return {
      token: await this.jwtService.signAsync(
        { id: founded.id },
        {
          expiresIn: this.jwtEnv.accessTokenExpire,
          secret: this.jwtEnv.secret,
        }
      ),
    }
  }

  async register({ email, password }: RegisterDto): Promise<TokenResponse> {
    const existed = await this.accountsRepo.findOneBy({ email })
    if (existed) throw new BadRequestException('email is existed')

    const created = await this.accountsRepo.save(
      this.accountsRepo.create({
        email,
        password: pbkdf2Sync(
          password,
          this.pbkdf2Env.pbkdf2Salt,
          this.pbkdf2Env.pbkdf2Iterations,
          this.pbkdf2Env.pbkdf2KeyLens,
          this.pbkdf2Env.pbkdf2Digest
        ).toString('hex'),
      })
    )

    return {
      token: await this.jwtService.signAsync(
        { id: created.id },
        {
          expiresIn: this.jwtEnv.accessTokenExpire,
          secret: this.jwtEnv.secret,
        }
      ),
    }
  }
}
