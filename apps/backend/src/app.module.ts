import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'
import * as joi from 'joi'
import { ServeStaticModule } from '@nestjs/serve-static'
import { DataSourceOptions } from 'typeorm'
import { AccountEntity, AccountsModule } from './accounts'
import {
  BASE_CONFIG_TOKEN,
  BaseConfig,
  JWT_CONFIG_TOKEN,
  JwtConfig,
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
import { JwtModule } from '@nestjs/jwt'

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
    JwtModule.registerAsync({
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<JwtConfig>(JWT_CONFIG_TOKEN).secret,
      }),
      inject: [ConfigService],
      global: true,
    }),
    ServeStaticModule.forRootAsync({
      useFactory: (configService: ConfigService) => [
        {
          rootPath:
            configService.get<BaseConfig>(BASE_CONFIG_TOKEN).frontendDir,
          exclude: [
            `${configService.get<BaseConfig>(BASE_CONFIG_TOKEN).basePath}/(.*)`,
          ],
        },
      ],
      inject: [ConfigService],
      isGlobal: true,
    }),
  ],
})
export class AppModule {}
