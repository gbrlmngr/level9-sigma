import * as joi from 'joi';

import { User } from 'src/users/user.entity';
import {
  IDENTIFIER_PREFIX,
  Notification,
  NotificationPriorities,
} from './notification.entity';

const { Urgent, High, Medium, Low } = NotificationPriorities;

export const notificationSchema = joi.object<Notification>({
  id: joi
    .string()
    .trim()
    .pattern(new RegExp(`^${IDENTIFIER_PREFIX}[a-z0-9]+$`))
    .max(64)
    .required(),
  title: joi.string().trim().max(128).required(),
  bodyMarkdown: joi.string().trim().required(),
  receiver: joi.object<User>(/* @TODO: UsersSchema */).required(),
  priority: joi.string().trim().valid(Urgent, High, Medium, Low).required(),
  tags: joi.array().items(joi.string().min(1)),
  createdAt: joi.date(),
  readAt: joi.date(),
});
