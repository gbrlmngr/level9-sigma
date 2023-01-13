import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import {
  GeneratorService,
  REPLACEMENT_PLACEHOLDER,
} from 'src/generator/generator.service';
import { IDENTIFIER_PREFIX, Message } from './message.entity';
import { messageSchema } from './messages.validators';

@Injectable()
export class MessagesService {
  private readonly logger = new Logger(MessagesService.name);

  constructor(
    @InjectRepository(Message)
    private readonly messagesRepository: Repository<Message>,
    private readonly generatorService: GeneratorService,
  ) {}

  async createOne(
    messageDTO: Partial<Record<Exclude<keyof Message, 'id'>, any>>,
  ) {
    const id = this.generatorService.generateID(
      `${IDENTIFIER_PREFIX}${REPLACEMENT_PLACEHOLDER}`,
    );
    const validated = await messageSchema.validateAsync({
      id,
      ...messageDTO,
    });
    return this.messagesRepository.create(validated);
  }

  async save(messages: Message[]) {
    if (!messages.every((entry) => entry instanceof Message)) {
      throw new Error(
        `All entries should be instances of Message. Use the "createOne" method first.`,
      );
    }

    return await this.messagesRepository.save<Message>(messages);
  }
}
