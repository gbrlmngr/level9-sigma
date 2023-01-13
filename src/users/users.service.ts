import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { User } from './user.entity';

@Injectable()
export class UsersService {
  private readonly logger = new Logger(UsersService.name);

  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  async findOneBy<T = any>(
    attributes: Partial<User> = {},
    fields?: Parameters<typeof getUserFields>[0],
    includeLocked?: boolean,
  ) {
    if (!attributes || !Object.keys(attributes).length) {
      throw new Error('No attributes provided to the User query.');
    }

    return await this.usersRepository.findOne({
      where: attributes,
      withDeleted: includeLocked,
      order: { createdAt: 'desc' },
      select: getUserFields(fields ?? 'ignore-sensitive'),
    });
  }

  async findOneByEmailAddress(emailAddress: User['emailAddress']) {
    return await this.findOneBy<typeof emailAddress>({ emailAddress });
  }

  async findOneByCredentials(emailAddress: User['emailAddress']) {
    return await this.findOneBy<typeof emailAddress>({ emailAddress }, 'all');
  }
}

/**
 * Returns the User entity fields as an array
 * Used inside the `select` parameter of TypeORM Find*Options
 *
 * @param {Array | 'all' | 'ignore-sensitive'} fields
 * @returns {(keyof User)[]} User fields
 */
function getUserFields(
  fields: (keyof User)[] | 'all' | 'ignore-sensitive',
): (keyof User)[] {
  /* Fields are provided explicitly */
  if (Array.isArray(fields) && fields.length > 0) {
    return fields;
  }

  const allUserFields: (keyof User)[] = [
    'id',
    'emailAddress',
    'displayName',
    'profileImageURL',
    'handle',
    'passwordHash',
    'otpSecret',
    'flagBits',
    'permissionBits',
    'functionalVariantsJSON',
    'hasEnabledOTP',
    'hasVerifiedEmail',
    'lastLoginAt',
    'createdAt',
    'updatedAt',
    'lockedAt',
  ];

  switch (fields) {
    case 'all':
      return allUserFields;

    case 'ignore-sensitive':
      return allUserFields.filter(
        (field) => !['passwordHash', 'otpSecret'].includes(field),
      );

    default:
      return ['id'];
  }
}
