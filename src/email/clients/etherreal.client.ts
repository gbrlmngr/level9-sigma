import { Injectable, Logger } from '@nestjs/common';
import { createTransport, Transporter, SendMailOptions } from 'nodemailer';
import SMTPTransport from 'nodemailer/lib/smtp-transport';

import { EmailClientInterface } from '../email.service';

@Injectable()
export class EtherrealClient implements EmailClientInterface {
  private readonly logger = new Logger(EtherrealClient.name);
  private transporter: Transporter<SMTPTransport.SentMessageInfo>;

  constructor(transportOptions: SMTPTransport.Options = {}) {
    this.transporter = createTransport(transportOptions);
  }

  async send(options: SendMailOptions) {
    try {
      return await this.transporter.sendMail(options);
    } catch (exception) {
      this.logger.error(
        `Unable to send email due to exception: ${exception.message}`,
      );
      return null;
    }
  }
}
