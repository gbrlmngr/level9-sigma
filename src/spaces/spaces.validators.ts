import * as joi from 'joi';
import { IDENTIFIER_PREFIX, Space, SpaceVisibility } from './space.entity';

export const spaceSchema = joi.object<Space>({
  id: joi
    .string()
    .trim()
    .pattern(new RegExp(`${IDENTIFIER_PREFIX}[a-z0-9]+`))
    .max(64)
    .required(),
  displayName: joi.string().trim().max(64).required(),
  profileImageURL: joi.string().trim().uri({ scheme: 'https' }).max(512),
  handle: joi.string().trim().alphanum().max(64).required(),
  flags: joi.string().trim().pattern(/\d+/).max(53).required(),
  visibility: joi
    .string()
    .trim()
    .valid(SpaceVisibility.Open, SpaceVisibility.Restricted)
    .required(),
  apiKey: joi.string().trim().max(64).required(),
  createdAt: joi.date(),
  updatedAt: joi.date(),

  /* @TODO: Update after these entities are created */
  ownerId: joi.any(),
  disabledBy: joi.any(),
});
