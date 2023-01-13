import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcrypt';

import { User } from 'src/users/user.entity';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthenticationService {
  private readonly logger = new Logger(AuthenticationService.name);

  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validateCredentials(emailAddress: string, plainPassword: string) {
    const existingUser = await this.usersService.findOneByCredentials(
      emailAddress,
    );
    const { passwordHash, ...user } = existingUser;

    if (!existingUser) throw new UnauthorizedException();
    if (!(await compare(plainPassword, passwordHash)))
      throw new UnauthorizedException();

    return user;
  }

  async generateAccessToken(user: Partial<User>) {
    return this.jwtService.sign({
      usr: user,
      sub: user.id,
    });
  }
}
