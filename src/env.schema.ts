import * as joi from 'joi';

export const environmentSchema = joi
  .object({
    NODE_ENV: joi
      .string()
      .valid('production', 'development', 'test', 'demo')
      .required(),
    APPLICATION_PORT: joi.number().min(0).max(65535).required(),
    CACHE_TTL: joi.number().min(0).default(20),
    THROTTLE_TTL: joi.number().min(0).default(60),
    THROTTLE_LIMIT: joi.number().min(0).default(10),
  })
  .unknown(false);
