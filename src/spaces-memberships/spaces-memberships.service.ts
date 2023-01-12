import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import {
  GeneratorService,
  REPLACEMENT_PLACEHOLDER,
} from 'src/generator/generator.service';
import {
  IDENTIFIER_PREFIX,
  SpacesMembership,
} from './spaces-membership.entity';
import { spacesMembershipSchema } from './spaces-memberships.validators';

@Injectable()
export class SpacesMembershipsService {
  private readonly logger = new Logger(SpacesMembershipsService.name);

  constructor(
    @InjectRepository(SpacesMembership)
    private readonly spacesMembershipRepository: Repository<SpacesMembership>,
    private readonly generatorService: GeneratorService,
  ) {}

  async createOne(
    spacesMembershipDTO: Partial<
      Record<Exclude<keyof SpacesMembership, 'id'>, any>
    >,
  ) {
    const id = this.generatorService.generateID(
      `${IDENTIFIER_PREFIX}${REPLACEMENT_PLACEHOLDER}`,
    );
    const validated = await spacesMembershipSchema.validateAsync({
      id,
      ...spacesMembershipDTO,
    });
    return this.spacesMembershipRepository.create(validated);
  }

  async save(spacesMemberships: SpacesMembership[]) {
    if (
      !spacesMemberships.every((entry) => entry instanceof SpacesMembership)
    ) {
      throw new Error(
        `All entries should be instances of SpacesMembership. Use the "createOne" method first.`,
      );
    }

    return await this.spacesMembershipRepository.save<SpacesMembership>(
      spacesMemberships,
    );
  }
}
