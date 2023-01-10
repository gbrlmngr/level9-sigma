import * as joi from 'joi';
import { IDENTIFIER_PREFIX, Space, SpaceAccessibility } from './space.entity';

const { Open, Restricted, Closed } = SpaceAccessibility;

export const spaceSchema = joi.object<Space>({
  id: joi
    .string()
    .trim()
    .pattern(new RegExp(`^${IDENTIFIER_PREFIX}[a-z0-9]+$`))
    .max(64)
    .required(),
  displayName: joi.string().trim().max(64).required(),
  profileImageURL: joi
    .string()
    .allow(null)
    .trim()
    .uri({ scheme: 'https' })
    .max(512),
  handle: joi
    .string()
    .trim()
    .pattern(/^[a-z0-9\-]+$/)
    .max(64)
    .required(),
  flags: joi.string().trim().pattern(/^\d+$/).max(53).required(),
  accessibility: joi.string().trim().valid(Open, Restricted, Closed).required(),
  createdAt: joi.date(),
  updatedAt: joi.date(),

  /* @TODO: Update after these entities are created */
  owner: joi.any(),
  disabledBy: joi.any(),
});
