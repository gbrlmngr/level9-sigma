import { registerAs } from '@nestjs/config';
import SMTPTransport from 'nodemailer/lib/smtp-transport';

export const emailConfiguration = registerAs('email', () => ({
  development: {
    transport: {
      host: 'smtp.ethereal.email',
      port: 587,
      auth: {
        user: process.env.SMTP_ACCOUNT_USERNAME,
        pass: process.env.SMTP_ACCOUNT_PASSWORD,
      },
    } as SMTPTransport.Options,
  },
  production: {
    transport: {} as SMTPTransport.Options,
  },
}));
