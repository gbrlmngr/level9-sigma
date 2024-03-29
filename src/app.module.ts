import { readFileSync } from 'fs';
import { join } from 'path';
import { randomUUID } from 'crypto';
import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { CacheInterceptor, CacheModule, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { LoggerModule } from 'nestjs-pino';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClsModule } from 'nestjs-cls';

import { mainConfiguration } from './configuration/main';
import { databaseConfiguration } from './configuration/database';
import { jwtConfiguration } from './configuration/jwt';
import { emailConfiguration } from './configuration/email';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { environmentSchema } from './env.schema';
import { SpacesModule } from './spaces/spaces.module';
import { GeneratorModule } from './generator/generator.module';
import { AuditModule } from './audit/audit.module';
import { UsersModule } from './users/users.module';
import { SpacesMembershipsModule } from './spaces-memberships/spaces-memberships.module';
import { MessagesModule } from './messages/messages.module';
import { AuthenticationModule } from './authentication/authentication.module';
import { JwtAuthenticationGuard } from './authentication/guards/jwt-authentication.guard';
import { EmailModule } from './email/email.module';

const isEnvironment = (environment: NodeJS.ProcessEnv['NODE_ENV']) => {
  return process.env.NODE_ENV === environment;
};

@Module({
  imports: [
    ClsModule.forRoot({
      global: true,
      middleware: { mount: true },
    }),
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      expandVariables: true,
      ignoreEnvFile: isEnvironment('production'),
      envFilePath: ['.env.development.local'],
      load: [
        mainConfiguration,
        databaseConfiguration,
        jwtConfiguration,
        emailConfiguration,
      ],
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
    LoggerModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        pinoHttp: {
          level: configService.get<string>('main.logger.level'),
          redact: configService.get<string[]>('main.logger.redactedParameters'),
          customSuccessMessage: (req, res) => {
            return `[${req.id}] ${req.method} ${req.url} ${res.statusCode}`;
          },
          customErrorMessage: (req, res) => {
            return `[${req.id}] ${req.method} ${req.url} ${res.statusCode}`;
          },
          genReqId: (req, res) => {
            if (req.id) return req.id;
            if (req.headers['x-request-id']) return req.headers['x-request-id'];

            const requestId = randomUUID();
            res.setHeader('x-request-id', requestId);
            return requestId;
          },
          transport: isEnvironment('production')
            ? undefined
            : {
                target: 'pino-pretty',
                options: {
                  colorize: true,
                  singleLine: true,
                  levelFirst: false,
                  ignore: 'pid,hostname,req,res',
                },
              },
        },
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
    EmailModule.forRoot({ env: process.env.NODE_ENV }),

    AuthenticationModule,
    GeneratorModule,
    AuditModule,
    MessagesModule,
    SpacesModule,
    UsersModule,
    SpacesMembershipsModule,
  ],
  controllers: [AppController],
  providers: [
    { provide: APP_INTERCEPTOR, useClass: CacheInterceptor },
    { provide: APP_GUARD, useClass: ThrottlerGuard },
    { provide: APP_GUARD, useClass: JwtAuthenticationGuard },
    AppService,
  ],
})
export class AppModule {}
