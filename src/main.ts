import { NestFactory } from '@nestjs/core';
import { VersioningType } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import helmet from 'helmet';
import * as compression from 'compression';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bodyParser: true,
    rawBody: true,
    forceCloseConnections: true,
    cors: {},
  });

  app.enableVersioning({ type: VersioningType.URI, defaultVersion: '0' });

  const configService = app.get(ConfigService);
  const applicationPort = configService.get<number>('main.applicationPort');

  app.use(
    helmet({
      hidePoweredBy: true,
    }),
  );

  app.use(compression());

  await app.listen(applicationPort);
}
bootstrap();
