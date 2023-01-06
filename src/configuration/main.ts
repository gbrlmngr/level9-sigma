import { registerAs } from '@nestjs/config';

export const mainConfiguration = registerAs('main', () => ({
  applicationPort: Number.parseInt(process.env.APPLICATION_PORT, 10),
  cacheTTL: Number.parseInt(process.env.CACHE_TTL, 10),
}));
