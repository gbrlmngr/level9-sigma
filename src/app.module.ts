import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

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
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
