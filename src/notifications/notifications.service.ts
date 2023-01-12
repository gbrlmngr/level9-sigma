import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import {
  GeneratorService,
  REPLACEMENT_PLACEHOLDER,
} from 'src/generator/generator.service';
import { IDENTIFIER_PREFIX, Notification } from './notification.entity';
import { notificationSchema } from './notifications.validators';

@Injectable()
export class NotificationsService {
  private readonly logger = new Logger(NotificationsService.name);

  constructor(
    @InjectRepository(Notification)
    private readonly notificationsRepository: Repository<Notification>,
    private readonly generatorService: GeneratorService,
  ) {}

  async createOne(
    notificationDTO: Partial<Record<Exclude<keyof Notification, 'id'>, any>>,
  ) {
    const id = this.generatorService.generateID(
      `${IDENTIFIER_PREFIX}${REPLACEMENT_PLACEHOLDER}`,
    );
    const validated = await notificationSchema.validateAsync({
      id,
      ...notificationDTO,
    });
    return this.notificationsRepository.create(validated);
  }

  async save(spaces: Notification[]) {
    if (!spaces.every((entry) => entry instanceof Notification)) {
      throw new Error(
        `All entries should be instances of Notification. Use the "createOne" method first.`,
      );
    }

    return await this.notificationsRepository.save<Notification>(spaces);
  }
}
