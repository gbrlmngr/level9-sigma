import { ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { ClsService } from 'nestjs-cls';

import { PRINCIPAL_TOKEN } from 'src/audit/audit.constants';
import { SKIP_JWT_AUTHENTICATION_TOKEN } from '../authentication.decorators';

@Injectable()
export class JwtAuthenticationGuard extends AuthGuard('jwt') {
  constructor(
    private readonly reflector: Reflector,
    private readonly clsService: ClsService,
  ) {
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

  handleRequest<User = any>(
    err: any,
    user: any,
    info: any,
    context: ExecutionContext,
    status?: any,
  ): User {
    this.clsService.set(PRINCIPAL_TOKEN, user.sub);
    return user;
  }
}
