import { Global, Module } from '@nestjs/common';
import SMTPTransport from 'nodemailer/lib/smtp-transport';
import { ConfigurableModuleClass } from './email.module-def';
import { EmailService } from './email.service';

export interface EmailModuleOptions {
  env: NodeJS.ProcessEnv['NODE_ENV'];
  transport?: SMTPTransport.Options;
}

@Global()
@Module({
  providers: [EmailService],
  exports: [EmailService],
})
export class EmailModule extends ConfigurableModuleClass {}
