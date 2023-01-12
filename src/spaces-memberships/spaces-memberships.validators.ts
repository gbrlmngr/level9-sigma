import * as joi from 'joi';

import { IDENTIFIER_PREFIX as USER_IDENTIFIER_PREFIX } from 'src/users/user.entity';
import { IDENTIFIER_PREFIX as SPACE_IDENTIFIER_PREFIX } from 'src/spaces/space.entity';
import {
  IDENTIFIER_PREFIX,
  SpacesMembership,
  MembershipStatuses,
} from './spaces-membership.entity';

const { Pending, Accepted, Rejected } = MembershipStatuses;

export const spacesMembershipSchema = joi.object<SpacesMembership>({
  id: joi
    .string()
    .trim()
    .pattern(new RegExp(`^${IDENTIFIER_PREFIX}[a-z0-9]+$`))
    .max(64)
    .required(),
  space: joi
    .object({
      id: joi
        .string()
        .trim()
        .pattern(new RegExp(`^${SPACE_IDENTIFIER_PREFIX}[a-z0-9]+$`))
        .max(64)
        .required(),
    })
    .required(),
  user: joi
    .object({
      id: joi
        .string()
        .trim()
        .pattern(new RegExp(`^${USER_IDENTIFIER_PREFIX}[a-z0-9]+$`))
        .max(64)
        .required(),
    })
    .required(),
  invitedBy: joi
    .object({
      id: joi
        .string()
        .trim()
        .pattern(new RegExp(`^${USER_IDENTIFIER_PREFIX}[a-z0-9]+$`))
        .max(64)
        .required(),
    })
    .required(),
  status: joi
    .string()
    .trim()
    .valid(Pending, Accepted, Rejected)
    .default(Pending),
  createdAt: joi.date(),
});
