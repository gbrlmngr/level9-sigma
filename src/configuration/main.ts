import { registerAs } from '@nestjs/config';

export const mainConfiguration = registerAs('main', () => ({
  applicationPort: Number.parseInt(String(process.env.APPLICATION_PORT), 10),
  cacheTTL: Number.parseInt(String(process.env.CACHE_TTL), 10),
  throttleTTL: Number.parseInt(String(process.env.THROTTLE_TTL), 10),
  throttleLimit: Number.parseInt(String(process.env.THROTTLE_LIMIT), 10),
  logger: {
    level: process.env.NODE_ENV === 'production' ? 'info' : 'debug',
    redactedParameters: [],
  },
}));
