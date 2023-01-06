import { registerAs } from '@nestjs/config';

export const mainConfiguration = registerAs('main', () => ({
  applicationPort: Number.parseInt(process.env.APPLICATION_PORT, 10),
}));
