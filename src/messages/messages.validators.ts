import * as joi from 'joi';

import { IDENTIFIER_PREFIX as USER_IDENTIFIER_PREFIX } from 'src/users/user.entity';
import {
  IDENTIFIER_PREFIX,
  Message,
  MessagePriorities,
  MessageTypes,
} from './message.entity';

const { Urgent, High, Medium, Low } = MessagePriorities;
const { System: SystemType, User: UserType } = MessageTypes;

export const messageSchema = joi.object<Message>({
  id: joi
    .string()
    .trim()
    .pattern(new RegExp(`^${IDENTIFIER_PREFIX}[a-z0-9]+$`))
    .max(64)
    .required(),
  title: joi.string().trim().max(128).required(),
  bodyMarkdown: joi.string().trim().required(),
  receiver: joi
    .object({
      id: joi
        .string()
        .trim()
        .pattern(new RegExp(`^${USER_IDENTIFIER_PREFIX}[a-z0-9]+$`))
        .max(64)
        .required(),
    })
    .required(),
  type: joi.string().trim().valid(SystemType, UserType).required(),
  priority: joi.string().trim().valid(Urgent, High, Medium, Low).required(),
  tags: joi.array().items(joi.string().min(1)),
  createdAt: joi.date(),
  readAt: joi.date(),
});
