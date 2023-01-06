import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { CacheInterceptor, CacheModule, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';

import { mainConfiguration } from './configuration/main';
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
      load: [mainConfiguration],
      validationSchema: environmentSchema,
      validationOptions: {
        abortEarly: isEnvironment('production'),
      },
    }),
    CacheModule.registerAsync({
      isGlobal: true,
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        ttl: configService.get<number>('main.cacheTTL'),
      }),
      inject: [ConfigService],
    }),
    ThrottlerModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        ttl: configService.get<number>('main.throttleTTL'),
        limit: configService.get<number>('main.throttleLimit'),
      }),
      inject: [ConfigService],
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
