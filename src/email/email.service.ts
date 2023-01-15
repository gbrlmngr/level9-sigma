import { Inject, Injectable } from '@nestjs/common';
import { SendMailOptions } from 'nodemailer';
import SMTPTransport from 'nodemailer/lib/smtp-transport';

import { EmailModuleOptions } from './email.module';
import { MODULE_OPTIONS_TOKEN } from './email.module-def';
import { EtherrealClient } from './clients/etherreal.client';
import { ConfigService } from '@nestjs/config';

export interface EmailClientInterface {
  send(options: SendMailOptions): Promise<SMTPTransport.SentMessageInfo | null>;
}

@Injectable()
export class EmailService {
  private readonly emailClients = {
    production: null,
    development: EtherrealClient,
  };

  constructor(
    @Inject(MODULE_OPTIONS_TOKEN)
    private readonly emailModuleOptions: EmailModuleOptions,
    private readonly configService: ConfigService,
  ) {}

  private getClient(
    environmentOverride?: EmailModuleOptions['env'],
  ): EmailClientInterface {
    const emailTransportOptions = this.configService.get<{
      development: { transport: Record<string, any> };
      production: { transport: Record<string, any> };
    }>('email');

    if (environmentOverride) {
      return this.emailClients[environmentOverride];
    }

    switch (this.emailModuleOptions.env) {
      case 'production':
        return this.emailClients['production'];

      default:
        return new this.emailClients['development'](
          emailTransportOptions?.development?.transport,
        );
    }
  }

  async send(options: SendMailOptions) {
    return await this.getClient()?.send(options);
  }
}
