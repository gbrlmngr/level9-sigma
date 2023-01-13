import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { compare } from 'bcrypt';

import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthenticationService {
  private readonly logger = new Logger(AuthenticationService.name);

  constructor(private readonly usersService: UsersService) {}

  async validateCredentials(emailAddress: string, plainPassword: string) {
    const existingUser = await this.usersService.findOneByCredentials(
      emailAddress,
    );
    const { passwordHash, otpSecret, ...user } = existingUser;

    if (!existingUser) throw new UnauthorizedException();
    if (!(await compare(plainPassword, passwordHash)))
      throw new UnauthorizedException();

    return user;
  }
}
