import { registerAs } from '@nestjs/config';

export const databaseConfiguration = registerAs('database', () => ({
  mysql: {
    url: process.env.DATABASE_MYSQL_URL,
    ca: process.env.DATABASE_MYSQL_CA,
  },
}));
