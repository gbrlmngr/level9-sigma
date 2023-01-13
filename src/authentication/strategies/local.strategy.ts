import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';

import { AuthenticationService } from '../authentication.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authenticationService: AuthenticationService) {
    super({
      usernameField: 'emailAddress',
      passwordField: 'password',
    });
  }

  async validate(emailAddress: string, plainPassword: string) {
    return await this.authenticationService.validateCredentials(
      emailAddress,
      plainPassword,
    );
  }
}
