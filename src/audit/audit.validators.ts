import * as joi from 'joi';

import { IDENTIFIER_PREFIX, AuditEntry, AuditActions } from './audit.entity';
import { IDENTIFIER_PREFIX as USER_IDENTIFIER_PREFIX } from 'src/users/user.entity';

const { Create, Update, Delete, SoftDelete, Recover } = AuditActions;

export const auditEntrySchema = joi.object<AuditEntry>({
  id: joi
    .string()
    .trim()
    .pattern(new RegExp(`^${IDENTIFIER_PREFIX}[a-z0-9]+$`))
    .max(64)
    .required(),
  principalId: joi
    .string()
    .trim()
    .pattern(new RegExp(`^${USER_IDENTIFIER_PREFIX}[a-z0-9]+$`))
    .max(64)
    .required(),
  action: joi
    .string()
    .trim()
    .allow(Create, Update, Delete, SoftDelete, Recover)
    .required(),
  resourceId: joi
    .string()
    .trim()
    .pattern(new RegExp('^[a-z]{3}_[a-z0-9]+$'))
    .required(),
  beforeStateJSON: joi.string().required(),
  afterStateJSON: joi.string().required(),
  loggedAt: joi.date().required(),
});
