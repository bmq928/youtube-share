import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'
import * as joi from 'joi'
import { DataSourceOptions } from 'typeorm'
import { AccountEntity, AccountsModule } from './accounts'
import {
  TYPEORM_CONFIG_TOKEN,
  baseConfig,
  baseConfigSchema,
  jwtConfig,
  jwtConfigSchema,
  pbkdf2Config,
  pbkdf2ConfigSchema,
  typeormConfig,
  typeormConfigSchema,
} from './common'
import { VideoEntity, VideosModule } from './videos'

@Module({
  imports: [
    AccountsModule,
    VideosModule,
    ConfigModule.forRoot({
      isGlobal: true,
      load: [baseConfig, typeormConfig, jwtConfig, pbkdf2Config],
      validationSchema: joi
        .object()
        .concat(baseConfigSchema)
        .concat(typeormConfigSchema)
        .concat(jwtConfigSchema)
        .concat(pbkdf2ConfigSchema),
    }),
    TypeOrmModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        ...configService.get<DataSourceOptions>(TYPEORM_CONFIG_TOKEN),
        entities: [AccountEntity, VideoEntity],
      }),
      inject: [ConfigService],
    }),
  ],
})
export class AppModule {}
