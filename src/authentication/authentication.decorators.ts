import { SetMetadata } from '@nestjs/common';

export const SKIP_JWT_AUTHENTICATION_TOKEN = 'SKIP_JWT_AUTHENTICATION';
export const SkipJWTAuthentication = () =>
  SetMetadata(SKIP_JWT_AUTHENTICATION_TOKEN, true);
