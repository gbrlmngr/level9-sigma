import * as joi from 'joi';

export const environmentSchema = joi
  .object({
    NODE_ENV: joi
      .string()
      .valid('production', 'development', 'test', 'demo')
      .required(),
    APPLICATION_PORT: joi.number().port().required(),
    CACHE_TTL: joi.number().min(0).default(20),
    THROTTLE_TTL: joi.number().min(0).default(60),
    THROTTLE_LIMIT: joi.number().min(0).default(10),

    DATABASE_MYSQL_URL: joi.string().uri().required(),
    DATABASE_MYSQL_CA: joi.string().required(),

    JWT_SECRET: joi.string().required(),

    SMTP_ACCOUNT_USERNAME: joi.string().required(),
    SMTP_ACCOUNT_PASSWORD: joi.string().required(),
  })
  .unknown(false);
