import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import {
  GeneratorService,
  REPLACEMENT_PLACEHOLDER,
} from 'src/generator/generator.service';
import { IDENTIFIER_PREFIX, Space } from './space.entity';
import { spaceSchema } from './spaces.validators';

@Injectable()
export class SpacesService {
  private readonly logger = new Logger(SpacesService.name);

  constructor(
    @InjectRepository(Space)
    private readonly spacesRepository: Repository<Space>,
    private readonly generatorService: GeneratorService,
  ) {}

  async createOne(spaceDTO: Partial<Record<Exclude<keyof Space, 'id'>, any>>) {
    const id = this.generatorService.generateID(
      `${IDENTIFIER_PREFIX}${REPLACEMENT_PLACEHOLDER}`,
    );
    const validated = await spaceSchema.validateAsync({ id, ...spaceDTO });
    return this.spacesRepository.create(validated);
  }

  async save(spaces: Space[]) {
    if (!spaces.every((entry) => entry instanceof Space)) {
      throw new Error(
        `All entries should be instances of Space. Use the "createOne" method first.`,
      );
    }

    return await this.spacesRepository.save<Space>(spaces);
  }
}
