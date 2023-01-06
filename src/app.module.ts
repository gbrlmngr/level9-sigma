import { readFileSync } from 'fs';
import { join } from 'path';
import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { CacheInterceptor, CacheModule, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { TypeOrmModule } from '@nestjs/typeorm';

import { mainConfiguration } from './configuration/main';
import { databaseConfiguration } from './configuration/database';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { environmentSchema } from './env.schema';

const isEnvironment = (environment: NodeJS.ProcessEnv['NODE_ENV']) => {
  return process.env.NODE_ENV === environment;
};

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      expandVariables: true,
      ignoreEnvFile: isEnvironment('production'),
      envFilePath: ['.env.development.local'],
      load: [mainConfiguration, databaseConfiguration],
      validationSchema: environmentSchema,
      validationOptions: {
        abortEarly: isEnvironment('production'),
      },
    }),
    CacheModule.registerAsync({
      isGlobal: true,
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        ttl: configService.get<number>('main.cacheTTL'),
      }),
    }),
    ThrottlerModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        ttl: configService.get<number>('main.throttleTTL'),
        limit: configService.get<number>('main.throttleLimit'),
      }),
    }),

    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        type: 'mysql',
        url: configService.getOrThrow<string>('database.mysql.url'),
        timezone: '+00:00',
        autoLoadEntities: true,
        synchronize: false,
        ssl: {
          ca: isEnvironment('production')
            ? configService.get<string>('database.mysql.ca')
            : readFileSync(
                join(__dirname, '..', 'certs/digitalocean/mysql-ca.crt'),
              ),
        },
      }),
    }),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    { provide: APP_INTERCEPTOR, useClass: CacheInterceptor },
    { provide: APP_GUARD, useClass: ThrottlerGuard },
  ],
})
export class AppModule {}
