import { ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';

import { SKIP_JWT_AUTHENTICATION_TOKEN } from '../authentication.decorators';

@Injectable()
export class JwtAuthenticationGuard extends AuthGuard('jwt') {
  constructor(private readonly reflector: Reflector) {
    super();
  }

  async canActivate(context: ExecutionContext): Promise<boolean | any> {
    const isJWTSkipped = this.reflector.getAllAndOverride<boolean>(
      SKIP_JWT_AUTHENTICATION_TOKEN,
      [context.getHandler(), context.getClass()],
    );

    if (isJWTSkipped) return true;
    return super.canActivate(context);
  }
}
