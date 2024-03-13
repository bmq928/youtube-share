import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { AccountsController } from './accounts.controller'
import { AccountsService } from './accounts.service'
import { AccountEntity } from './account.entity'
import { JwtModule } from '@nestjs/jwt'
import { ConfigService } from '@nestjs/config'
import { JWT_CONFIG_TOKEN, JwtConfig } from '../common'

@Module({
  imports: [
    TypeOrmModule.forFeature([AccountEntity]),
    JwtModule.registerAsync({
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<JwtConfig>(JWT_CONFIG_TOKEN).secret,
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [AccountsController],
  providers: [AccountsService],
})
export class AccountsModule {}
