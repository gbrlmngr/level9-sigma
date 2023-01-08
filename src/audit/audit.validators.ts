import * as joi from 'joi';
import { IDENTIFIER_PREFIX, AuditEntry, AuditActions } from './audit.entity';

const { Create, Update, Delete, SoftDelete, Recover } = AuditActions;

export const auditEntrySchema = joi.object<AuditEntry>({
  id: joi
    .string()
    .trim()
    .pattern(new RegExp(`^${IDENTIFIER_PREFIX}[a-z0-9]+$`))
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
  beforeStateJSON: joi.string().allow('').required(),
  afterStateJSON: joi.string().allow('').required(),
  loggedAt: joi.date().required(),

  /* @TODO: Update after these entities are created */
  principalId: joi.any(),
});
