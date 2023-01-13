import { registerAs } from '@nestjs/config';
import { JwtModuleOptions } from '@nestjs/jwt';

export const jwtConfiguration = registerAs(
  'jwt',
  () =>
    ({
      secret: process.env.JWT_SECRET,
      signOptions: {
        issuer: 'level9.gg',
        expiresIn: '24h',
      },
    } as JwtModuleOptions),
);
